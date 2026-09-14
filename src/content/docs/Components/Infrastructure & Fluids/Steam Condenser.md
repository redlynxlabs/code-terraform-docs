---
tags:
  - component
  - infrastructure-fluids
aliases:
  - steam_condenser_1
title: "Steam Condenser"
---

Converts incoming steam into clean water at a **1:1 mass ratio**. Scripted throttle controls its 250 t/h peak and 150 W draw.

**Stats:** Type Fluids · Power in variable (draws from grid) · Consumes Steam, up to 250 t/h, buffer 250 t · Produces Water, up to 250 t/h, buffer 250 t

**How to obtain:** Requires the **Steam Condensation** research (Plants 1,000,000). Buy from the Shop for 50,000 cr.

**Access:** `self` / `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Methods

### .outpost
The outpost where this building is deployed, as an [[OutpostRef]].

### .condensation_rate()
Clean water produced on the last tick in t/h. Full throttle reaches 250 t/h when steam has supply, the water output has room, and the host outpost is not overcrowded.

**Returns:** Number (t/h)

### .efficiency()
Fraction of the throttle's requested condensation completed last tick (0-1). Low values mean the steam ran short or the water output filled mid-tick.

**Returns:** Number (0-1)

### .is_stalled()
`True` when throttle is above zero and the fluid state blocks condensation: `steam_in` empty or `water_out` full. Use `status()` to distinguish the blockers.

**Returns:** Boolean

### .status()
Live actionable state: `"idle"`, `"no_power"`, `"no_steam"`, `"output_full"`, or `"running"`. Throttle 0 reports `"idle"`; inspect port levels to decide when to reopen.

**Returns:** String

### .throttle()
Current condensation setpoint (0-1). Scales steam use, water output, and power draw linearly.

**Returns:** Number

### .set_throttle(t) `SELF ONLY`
Set condensation 0-1 (clamped). 1.0 requests 250 t/h and 150 W. **Draw follows the throttle even when steam is empty or the output is full, so set 0 to save power while blocked.** Resets to 0 when the script stops, ends, or errors.

**Returns:** [[ActionResult]] · Outcomes: `"ok"`

### .steam_in
[[FluidPort]] accepting steam from a [[Thermal Cap]] or a steam-latched [[Gas Tank]]. 250 t internal buffer.

### .water_out
Clean-water [[FluidPort]]. Connect a [[Liquid Tank]], [[Large Liquid Tank]], [[Plant Terraformer]], [[Sprinkler]], or other water consumer. Its 250 t buffer backpressures condensation when full.

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].

## See also

- [[Thermal Vents]]: the steam source chain
- [[Steam Turbine]]: the power-generation alternative for steam
