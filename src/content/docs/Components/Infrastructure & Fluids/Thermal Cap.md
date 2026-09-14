---
tags:
  - component
  - infrastructure-fluids
aliases:
  - thermal_cap_1
title: "Thermal Cap"
---

Captures Steam from a thermal vent. **If its chamber reaches 100%, every stored ton blows into the atmosphere**; a script must release, route, or relieve pressure.

**Stats:** Type Fluids · Built on thermal vents · Power in -3 W (draws from grid) · Produces Steam, buffer 1,000 t

**How to obtain:** The recipe unlocks with the **Thermal Cap** research (Pressure 2.5). Fabricate a Thermal Cap Kit on a Fabricator: 2× Titanium Ingot, 2× Gas Pipe Segment. Build it on a surveyed thermal vent with a Pioneer's Constructor.

**Access:** `self` / `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Methods

### .vent()
The [[ThermalVent]] this cap sits on. Field availability follows the sonar tier that last surveyed it: basic reveals phase, wide adds steam rates, deep adds cycle timing.

**Returns:** `ThermalVent`

### .phase()
`"active"` while the vent produces steam (chamber fills) or `"dormant"` while it rests (chamber only drains). `None` until the vent is surveyed. Drive your release loop off this: open the throttle when active, ease it when dormant so downstream doesn't run dry.

**Returns:** String or `None`

### .next_phase_in()
Game-minutes until the vent flips phase, to open up before a surge or ease off before a dry spell. **`None` unless the vent was Deep-surveyed**: a predictive loop is the payoff for deep sonar.

**Returns:** Number or `None`

### .pressure()
Chamber fill, 0.0-1.0. Climbs while capturing, drops as you release through `steam_out`. **At 1.0 the cap overpressurizes: the whole chamber blows off to atmosphere and rebuilds from empty.** Poll every tick and open the throttle as it rises.

**Returns:** Number (0-1)

### .capture_rate()
Steam captured from the vent last tick, in t/h. 0 while dormant, up to the vent's current output while active. Already factors in the vent's phase.

**Returns:** Number (t/h)

### .is_overpressured()
`True` the tick the chamber tops out and blows its contents to atmosphere. Everything banked is gone; the chamber refills from empty. Seeing this means you released too slowly.

**Returns:** Boolean

### .is_stalled()
`True` if the powered cap had an open throttle and chamber steam to release but could transfer none across its connected routes. An empty chamber, closed throttle, or lack of power does not report a stall.

**Returns:** Boolean

### .throttle() / .set_throttle(t) `SELF ONLY`
Release valve, 0.0 (sealed, chamber fills) to 1.0 (wide open). **Your primary knob against overpressure: call it every tick against `pressure()`.** Resets to 0 when the script stops, ends, or errors. If no destination can accept enough and pressure still climbs, use `set_relief(...)`.

**Returns:** Number / [[ActionResult]] (`"ok"`)

### .relief() / .set_relief(t) `SELF ONLY` / .relief_rate()
Relief valve 0-1: **dumps excess chamber steam into the atmosphere** (wasted) when consumers cannot keep up and `pressure()` still climbs. 0 keeps all steam for consumers. `relief_rate()` reports the waste in t/h this tick.

**Returns:** Number / ActionResult (`"ok"`) / Number (t/h)

### .steam_out
[[FluidPort]] for chamber steam. May declare one destination (`self.steam_out.connect("bio_caster_1")`); additional consumers connect their own `steam_in` ports. Every destination needs a completed Gas Pipe route to this field Cap. `connected_to()` reports only this port's declaration; `flow_rate()` reports total live release.

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].

## See also

- [[Thermal Vents]]: vent phases and survey tiers
- [[Steam Turbine]] and [[Steam Condenser]]: the two big steam consumers
- [[Gas Tank]]: buffer between cap and consumer
