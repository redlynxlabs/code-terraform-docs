---
tags:
  - component
  - terraforming
aliases:
  - pressure_1
title: "Pressure Generator"
---

Compresses the thin atmosphere to raise surface pressure. It runs best when a script catches each sync window as its gauge sweeps; missed windows cost efficiency.

**Stats:** Power in -7 W · Produces up to 0.012 kPa/day at peak efficiency · Input buffer 4 · Tiers Mk II, Mk III, Mk IV · Buy from the Shop for 900 cr.

**Access:** `self` / `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Methods

### .outpost
The outpost where this building is deployed, as an [[OutpostRef]].

### .input
Fuel Rod magazine for the **Mk IV** tier. Connect a [[Lead Cask]] to keep spare rods staged here. Empty and unused below Mk IV, and a Mk IV with no rod stops producing rather than degrading.

**Returns:** [[InputSlot]]

### .water_in
Water supply port installed by the **Mk III** pack. Call `connect(...)` with a compatible water provider. Mk IV uses Fuel Rods instead, but the installed port remains available.

**Returns:** [[FluidPort]]

### .gauge()
Current value on the resonance sweep (0-100). Rises each tick and wraps at 100. Compare it to `next_window_low()` and `next_window_high()`; when the gauge is inside that range, call `sync()`.

**Returns:** Number (0-100)

### .next_window_low() / .next_window_high()
Lower / upper edge of the current sweep's sync window. Use with `gauge()`; call `sync()` when the gauge is inside the range. The values change when the sweep wraps to the next cycle.

**Returns:** Number

### .sync() `SELF ONLY`
Try to sync this sweep. First call per sweep counts; later calls before the gauge wraps do nothing. Hit (gauge in window) gives +25% efficiency. Miss (outside window, or no sync before the sweep ends) gives -10%.

**Returns:** [[ActionResult]] · Outcomes: `"ok"`

### .efficiency()
Current compression efficiency (0-100%). Climbs with hits, drops with misses, floored at 0. A well-tuned script holds this at or near 100% by hitting every cycle's window.

**Returns:** Number (0-100%)

### .output()
Current kPa/h production rate at the current `efficiency()`. Proportional to `efficiency() × tier multiplier`. The resonance gauge advances slowly, so pressure progress is best judged from `efficiency()` and the per-day projection on the sensor display rather than from a single `output()` read.

**Returns:** Number (kPa/h)

### .tier()
Permanently installed Mk tier as an integer (1-4).

**Returns:** Integer (1-4)

### .is_degraded()
`True` when a Mk III pack is starved of its required fluid input and the machine has fallen back to the previous tier multiplier for this tick. If `True`, investigate `self.water_in.level()` and the upstream supply.

**Returns:** Boolean

### .effective_tier()
The tier actually in effect this tick: `tier()` normally, previous tier while `is_degraded()` is `True`.

**Returns:** Integer

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].

## See also

- [[Atmosphere]]: `get_pressure()` to watch progress (needs the [[Pressure Sensor]] repaired)
- [[Tier 3 Progression]]: the Pressure Mk III water requirement (5 t/h)
