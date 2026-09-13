---
tags:
  - component
  - infrastructure-fluids
aliases:
  - exotic_gas_cap_1
---
# Exotic Gas Cap

Captures gas from a **cyclic exotic deposit** during its active phase. Connect `self.gas_out` to a consumer, build a completed Gas Pipe route from the field Cap to that destination, then set a 0-1 release rate with `self.set_throttle(value)`. A full buffer pauses collection **without losing gas**.

**Stats:** Type Fluids · Built on exotic deposits · Power in -30 W (draws from grid)

**How to obtain:** The recipe unlocks with the **Exotic Husbandry** research (Wildlife 1,000). Fabricate an Exotic Gas Cap Kit on a Fabricator: 2× Titanium Ingot, 2× Gas Pipe Segment. Build it on a surveyed exotic deposit with a Pioneer's Constructor.

**Access:** `self` / `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Methods

### .deposit()
The [[ExoticDeposit]] this cap is bolted to: `.id`, `position()`, `fluid()`, `current_phase()`, cycle timing. Field availability is gated by the **sonar tier that last surveyed the deposit**: basic reveals phase only, wide adds rates, deep adds cycle timing. `None` if not on a deposit. Its methods read live state on each call; the `.surveyed` property remains a creation-time snapshot.

**Returns:** `ExoticDeposit` or `None`

### .capture_rate()
Exotic gas captured on the last flow tick in t/h. 0 during the dormant phase or when the buffer is full and holding. Already factors in phase and buffer headroom; read it instead of computing from the deposit's rate.

**Returns:** Number (t/h)

### .is_venting()
`True` if active gas production exceeded the capture buffer's available space on the last flow tick. **The excess is held upstream without losing gas.** Dormancy returns `False` even with a full buffer, as does loss of power. This is a capture-space limit; `is_stalled()` reports a blocked release. Open `set_throttle(...)` toward a tank with room.

**Returns:** Boolean

### .is_stalled()
`True` if, on the last flow tick, the powered cap had an open throttle and buffered gas to release but could transfer none across its connected routes. An empty buffer, closed throttle, or lack of power does not report a stall.

**Returns:** Boolean

### .throttle()
Current release-valve setting, 0.0 (holding) to 1.0 (wide open).

**Returns:** Number (0-1)

### .set_throttle(t) `SELF ONLY`
Open the release valve (0-1, clamped). 0 holds the buffer; 1.0 releases across reachable destinations as fast as supply, headroom, and throughput allow. **This script-owned setpoint resets to 0 when the script stops, ends, or errors.**

**Returns:** [[ActionResult]] · Outcomes: `"ok"`

### .gas_out
[[FluidPort]] for the buffered gas. May declare one destination (`self.gas_out.connect("Chlorine Tank")`); additional consumers may connect their own compatible inputs to this Cap. As a field structure, every destination needs a completed Gas Pipe route. `connected_to()` reports only this port's own declaration; `flow_rate()` reports total live release.

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].

## See also

- [[Exotic Spring Tap]]: the liquid twin
- [[Gas Tank]]: buffer the cyclic output
- [[Tier 3 Progression]]: where exotics fit
