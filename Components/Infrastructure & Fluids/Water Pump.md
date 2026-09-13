---
tags:
  - component
  - infrastructure-fluids
aliases:
  - water_pump_1
---
# Water Pump

Extracts water from a surveyed well at a throttle your script sets. Its Planet Map blueprint can be placed in Plan Mode or by script; a Pioneer must still build it on the well.

**Stats:** Type Fluids · Built on water wells · Power in -4 W (draws from grid) · Produces Water, buffer 10 t · Output buffer 20 units (salt)

**How to obtain:** The recipe unlocks with the **Hydrology Survey** research (Pressure 30). Fabricate a Water Pump on a Fabricator: 2× Iron Ingot, 2× Glass, 4× Liquid Pipe Segment. Build it on a surveyed water well with a Pioneer's Constructor.

**Access:** `self` / `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Methods

### .well()
The [[WaterWell]] this pump is bolted to: `.id`, `position()`, `yield_tier()` (`"standard"` / `"rich"` / `"pure"` = 1×/2×/3×), `flow_rate()` per-hour output. Useful for prioritization scripts comparing yields.

**Returns:** `WaterWell` snapshot

### .pump_rate()
Total water delivered to connected destinations this tick, in t/h. 0 when throttle is 0 or no destination can accept flow. If a productive well still reports 0, check connections, completed pipe routes, conflicts, power, and destination capacity.

**Returns:** Number (t/h)

### .is_stalled()
`True` if the powered pump had an open throttle and water available but could transfer none across its connected routes. No available water, a closed throttle, or lack of power does not report a stall.

**Returns:** Boolean

### .throttle()
Current throttle (0-1). 0 by default; the pump idles until a script calls `set_throttle()`.

**Returns:** Number

### .set_throttle(rate) `SELF ONLY`
Set the pump's total output rate (0-1) across reachable destinations. **Resets to 0 when the script stops, ends, or errors**, so keep the control loop running.

**Returns:** [[ActionResult]] · Outcomes: `"ok"`

### .output
[[PickupOutputSlot]] holding **salt created as a water-pumping byproduct** (separate from `water_out`). Read `count()`, `capacity()`, `stacks()`. A physically present Rover or Pioneer connects its own input and pulls the salt; the Pump has no direct item-routing methods.

### .water_out
[[FluidPort]] routing water to a connected target (`self.water_out.connect("bio_caster_1")`); additional consumers may connect their own `water_in` ports. Every destination needs a completed Liquid Pipe route to this field Pump. The Pump stores nothing (`level()` reads 0).

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].

## See also

- [[Water & Oil Wells]]: well phases and yield tiers
- [[Liquid Tank]]: buffer the output
- [[Harvester]]: salt is also a crop input (dispense_salt)
