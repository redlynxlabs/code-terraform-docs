---
tags:
  - component
  - infrastructure-fluids
aliases:
  - oil_pump_1
title: "Oil Pump"
---

Extracts oil from a surveyed well at a throttle your script sets. Oil wells run in **active and dormant phases**, so buffer the output through a [[Liquid Tank]] to ride out the dry spells.

**Stats:** Type Fluids · Built on oil wells · Power in -5 W (draws from grid) · Produces Oil, buffer 10 t

**How to obtain:** The recipe unlocks with the **Petroleum Survey** research (Oxygen 1,500). Fabricate an Oil Pump on a Fabricator: 2× Iron Ingot, 1× Titanium Ingot, 1× Pressure Valve, 1× Circuit Panel. Build it on a surveyed oil well with a Pioneer's Constructor (oil wells need a `"deep"` tier sonar to discover).

**Access:** `self` / `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Methods

### .well()
The [[OilWell]] this pump is bolted to: `.id`, `position()`, `yield_tier()` (1×/2×/3×), `flow_rate()`. Same shape as [[WaterWell]].

**Returns:** `OilWell` snapshot

### .pump_rate()
Total oil delivered across every reachable connected destination this tick, in t/h. 0 when throttle is 0, the well is dormant, or no destination can accept flow.

**Returns:** Number (t/h)

### .well_active()
The well's pulse: `True` in its active phase (full rate); `False` dormant (no oil at any throttle, typically for several hours). Bank oil in a downstream tank and throttle down during the gap to save watts.

**Returns:** Boolean

### .is_stalled()
`True` if the powered pump had an open throttle and oil available from its active well but could transfer none across its connected routes. Dormancy, a closed throttle, or lack of power does not report a stall.

**Returns:** Boolean

### .throttle()
Current throttle setting (0-1). 0 by default.

**Returns:** Number

### .set_throttle(rate) `SELF ONLY`
Set the pump's total output rate (0-1) across reachable destinations. **This script-owned setpoint resets to 0 when the script stops, ends, or errors**, so keep the control loop running.

**Returns:** [[ActionResult]] · Outcomes: `"ok"`

### .oil_out
[[FluidPort]] routing oil to a connected target. May declare one destination (`self.oil_out.connect("Oil Reserve")`); additional consumers may connect their own `oil_in` ports to this Pump. As a field structure, every destination needs a completed Liquid Pipe route. The Pump stores nothing, so `level()` reads 0.

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].

## See also

- [[Water & Oil Wells]]: phases, yield tiers, discovery
- [[Oil Generator]] and [[Drone Service Station]]: major oil consumers
