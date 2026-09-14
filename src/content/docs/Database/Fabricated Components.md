---
tags:
  - database
  - items
title: "Fabricated Components"
---

[[Fabricator]] output: machined parts, infrastructure segments, deploy kits, and oil-derived polymers. Earth contractors order many of these. Recipes for everything here are in [[Fabricator Recipes]].

## Infrastructure

| Item | Id | Notes |
| --- | --- | --- |
| Gas / Liquid Pipe Segment, Power Line Segment | `gas_pipe_segment`, `liquid_pipe_segment`, `power_line_segment` | A 10 m run; a Pioneer's Constructor consumes one per planned segment. Sell 20 cr |
| Gas / Liquid Pipe Bridge, Power Line Bridge | `gas_pipe_bridge`, `liquid_pipe_bridge`, `power_line_bridge` | 3-tile overpasses that let one line cross another without joining networks |
| Thermal Cap Kit | `thermal_cap_kit` | Constructor-deployed kit for a surveyed thermal vent (sell 800 cr). See [[Thermal Cap]] |

## Machine parts

| Item | Id | Notes |
| --- | --- | --- |
| Pressure Valve | `pressure_valve` | Flow-control valve across pumps, tanks, atmospheric hardware |
| Machine Frame | `machine_frame` | Standard structural chassis for most mid-tier machines |
| Circuit Panel | `circuit_panel` | Printed control circuitry |
| Control Unit | `control_unit` | Sealed processing module for advanced machines and vehicles |
| Battery Cell | `battery_cell` | Cobalt-chemistry storage cell |
| Turbine Rotor | `turbine_rotor` | Precision-balanced titanium rotor |
| Tank Lining | `tank_lining` | Corrosion-proof lining for gas and liquid tanks |
| Coolant Loop | `coolant_loop` | Closed-circuit coolant for reactor-grade heat loads |
| Neutron Capacitor | `neutron_capacitor` | Neutronium storage device for extreme energy applications |

## Petrochemicals

| Item | Id | Notes |
| --- | --- | --- |
| Lubricant | `lubricant` | Keeps drives and rotors running smoothly |
| Plastic | `plastic` | Polymer stock for housings and insulation |
| Rubber | `rubber` | Flexible stock for gaskets and seals |
| Tar | `tar` | Heavy oil residue: fertilizer input, advanced components, the [[Refiner]] reagent. Byproduct of Lubricant/Plastic/Rubber; Heavy Oil Cracking makes it directly |
| Reinforced Biopolymer | `reinforced_biopolymer` | Structural composite (plastic + forage + water) for late Earth exports |
| Enrichment Compound | `enrichment_compound` | Concentrated biological material for late Earth exports |

## Crop chemicals

All field doses last 8 hours (Yield Amplifier: 24 hours, whole field). Same-tier doses extend duration; switch tiers after the active dose expires. Yield bonuses add to provider (lamp/sprinkler) bonuses.

| Item | Id | Field effect | Plant Terraformer potency |
| --- | --- | --- | --- |
| Fertilizer | `fertilizer` | 2× base Forage yield (+100%) | 10 |
| Fertilizer Mk II | `fertilizer_mk2` | 3× base yield (+200%) | 30 |
| Fertilizer Mk III | `fertilizer_mk3` | 5× base yield (+400%) | 50 |
| Growth Accelerant | `growth_accelerant` | 2× growth speed (same yield sooner); no potency tiers, whole-item input for the final conversion | n/a |
| Yield Amplifier | `yield_amplifier` | +200% base yield (3×) to growing crops **across the whole field** for 24 h | n/a |

Unused fertilizer potency stays in the Plant Terraformer for later batches.

## Upgrade packs (lamp/sprinkler yield tiers)

| Tier | Yield bonus | Draw | Sprinkler water |
| --- | --- | --- | --- |
| Mk I (base) | 1× | 5 W | 2 t/h |
| Mk II pack | 2× (+100%) | 25 W | 10 t/h |
| Mk III pack | 4× (+300%) | 100 W | 200 t/h |
| Mk IV pack | 8× (+700%) | 500 W | 1,000 t/h |

Bonus applies during growth to crops requiring that condition in the four orthogonally adjacent cells; **only the strongest covering provider counts**; coverage and growth speed stay the same.

## Nuclear

| Item | Id | Notes |
| --- | --- | --- |
| Lead Plate | `lead_plate` | Rolled shielding for casks, fuel rods, reactor internals |
| Raw Uranium | `raw_uranium` | Storm-dealt fissile ore. **Hot cargo**: Lead Casks only; each unplated drone batch adds 40 exposure (0 with Shield Plating) |
| Fuel Rod | `fuel_rod` | Pressed reactor fuel in a lead jacket. Hot cargo, cask-to-cask handling only |

## See also

- [[Fabricator Recipes]]: exact inputs, times, unlocks
- [[Drones]]: hot cargo rules
