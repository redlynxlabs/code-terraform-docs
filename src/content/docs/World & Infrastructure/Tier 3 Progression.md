---
tags:
  - guide
  - world-infrastructure
title: "Tier 3 Progression"
---

## Overview

Tier 3 introduces **input-gated** upgrades. A supplied Mk III Oxygen or Pressure Generator runs at **200x** Mk I output, while a supplied Mk III Heat Generator runs at **208x**. Starved machines fall back to their Mk II base output, **5x** for Oxygen and Pressure or **4.7x** for Heat.

The gate is enforced per tick: every frame the machine checks its input buffer. If the required fluid is unavailable, `is_degraded()` reads `True` and `effective_tier()` falls back to the previous tier for that tick. The installed tier reported by `tier()` itself never changes.

## The three Mk III packs

Each pack adds a required fluid port and consumption rate:

| Pack | Port | Required rate |
| --- | --- | --- |
| Oxygen Mk III | `water_in` | 8 t/h |
| Heat Mk III | `steam_in` | 12 t/h (direct steam, not water) |
| Pressure Mk III | `water_in` | 5 t/h |

After applying a pack, the machine gains the corresponding port:

```python
oxy = get_component("o2gen_1")
oxy.water_in.connect("liquid_tank_1")
print(oxy.water_in.level(), "/", oxy.water_in.capacity())
```

## Degradation signals

- `machine.is_degraded()` returns `True`.
- `machine.effective_tier()` returns one less than `machine.tier()`: the tier actually in effect right now.
- `machine.tier()` itself never changes: the pack is permanent; degradation is runtime.

When the input buffer refills, all of the above flip back on the next tick.

## Contention

Early water comes from [[Water Pump|Water Pumps]] on wells (a well yields 10 / 20 / 30 t/h by tier). Your downstream consumers at full Mk III:

- 1 Oxygen Mk III at full rate consumes 8 t/h of water.
- 1 Pressure Mk III consumes 5 t/h of water.
- Combined at full rate: 13 t/h of water.

A single standard well (10 t/h) can't feed both at once. Your options:

1. Tap a richer well (rich / pure yield 20 / 30 t/h) or add a second well with its own pump.
2. Buffer with a [[Liquid Tank]] so short demand spikes draw from storage.
3. Allocate via script: prioritize whichever Mk III matters more right now, let the other degrade to Mk II temporarily.
4. After **Steam Condensation** unlocks at 1,000,000 Plants, route stored vent steam through a [[Steam Condenser]] for another **250 t/h** Water at full throttle.

## Allocation script

A water allocator runs forever and decides which Mk III gets fresh water based on terraforming progress:

```python
o2_tank = get_component("liquid_tank_1")
oxy = get_component("o2gen_1")
pres = get_component("pressure_1")
atmo = get_component("atmosphere")

while True:
  # Prioritize whichever pillar has the larger gap to next phase
  oxy_gap = ...  # compute from atmo.oxygen and next phase threshold
  pres_gap = ...
  if oxy_gap > pres_gap:
    # Favor oxygen, route the current water supply to its tank first
    ...
```

Choose the allocation rule that matches your current terraforming goal. Add `sleep()` only if you intentionally want a slower allocator cadence.

## Heat is different

Heat Mk III takes steam **directly**, not water. Captured steam can feed any combination of three sinks:

- A [[Steam Turbine]] for grid power.
- [[Heat Generator|Heat Gen]] Mk III for maximum heat output.
- A [[Steam Condenser]] for clean water used by Oxygen, Pressure, Plants, and other consumers.

One vent may supply several connected sinks when its average output and stored reserve can cover them. Reachable consumers share available flow; their throttle, demand, and buffer headroom determine what they accept. [[Gas Tank|Gas Tanks]] are the practical way to bank active-phase steam and carry every branch through dormancy. Condenser-fed Oxygen and Pressure therefore compete indirectly with turbines and Heat for the same captured steam.

## Graceful fallback

Degradation is a normal running state. The machine doesn't stop; output continues at the previous tier until the input buffer refills. Scripts can observe `is_degraded()`, inspect the input port, and correct the supply chain.

## Cross-references

- [[Flow Networks & Fluids]]: the input system Mk III uses
- [[Thermal Vents]]: steam capture, storage, power, and condensation
- [[Oxygen Generator]] · [[Pressure Generator]] · [[Heat Generator]]: the machines these packs upgrade
