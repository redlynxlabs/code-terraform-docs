---
tags:
  - component
  - infrastructure-fluids
aliases:
  - exotic_spring_tap_1
title: "Exotic Spring Tap"
---

Captures liquid from a **cyclic exotic spring** during its active phase. Connect `self.liquid_out` to a consumer, build a completed Liquid Pipe route from the field Tap to that destination, then set a 0-1 release rate with `self.set_throttle(value)`. A full buffer pauses collection **without losing liquid**.

**Stats:** Type Fluids · Built on exotic deposits · Power in -35 W (draws from grid)

**How to obtain:** The recipe unlocks with the **Exotic Husbandry** research (Wildlife 1,000). Fabricate an Exotic Spring Tap Kit on a Fabricator: 2× Titanium Ingot, 2× Liquid Pipe Segment, 1× Pressure Valve. Build it on a surveyed exotic deposit with a Pioneer's Constructor.

**Access:** `self` / `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Methods

The API mirrors [[Exotic Gas Cap]] with liquid in place of gas.

### .deposit()
The [[ExoticDeposit]] this tap is bolted to (`.id`, `position()`, `fluid()`, `current_phase()`, cycle timing), or `None`. Detail is gated by the sonar tier that last surveyed the deposit (basic / wide / deep). Methods read live state; `.surveyed` stays a creation-time snapshot.

**Returns:** `ExoticDeposit` or `None`

### .capture_rate()
Exotic liquid captured on the last flow tick in t/h. 0 during dormancy or when the buffer is full and holding.

**Returns:** Number (t/h)

### .is_venting()
`True` if active production exceeded the capture buffer's space last tick (excess held upstream, not lost). `False` during dormancy or when unpowered. Open `set_throttle(...)` toward a tank with room.

**Returns:** Boolean

### .is_stalled()
`True` if the powered tap had an open throttle and buffered liquid to release but could transfer none across its connected routes.

**Returns:** Boolean

### .throttle()
Current release-valve setting (0-1).

**Returns:** Number

### .set_throttle(t) `SELF ONLY`
Open the release valve (0-1, clamped). **Resets to 0 when the script stops, ends, or errors.**

**Returns:** [[ActionResult]] · Outcomes: `"ok"`

### .liquid_out
[[FluidPort]] for the buffered liquid. May declare one destination (`self.liquid_out.connect("Cryofluid Tank")`); additional consumers may connect their own compatible inputs. Every destination needs a completed Liquid Pipe route to this field Tap.

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].

## See also

- [[Exotic Gas Cap]]: the gas twin
- [[Liquid Tank]] / [[Large Liquid Tank]]: buffer the cyclic output
