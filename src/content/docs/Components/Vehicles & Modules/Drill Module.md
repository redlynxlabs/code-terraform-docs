---
tags:
  - component
  - vehicles-modules
  - module
aliases:
  - DrillModule
  - drill
title: "Drill Module"
---

Extracts minerals through `self.drill`. The **basic** drill handles hardness 1 at 1.0× speed using 10 W; **Industrial** handles hardness 3 at 0.75× using 20 W; **Heavy** handles hardness 4 at 0.6× using 30 W. Without a mounted Drill Module, the vehicle cannot mine.

**Access:** `self.drill` (on a vehicle with the module mounted) · This page also covers the `DrillModule` API type.

## Variants

| Variant | Hardness cap | Speed multiplier | Power draw |
| --- | --- | --- | --- |
| Basic | 1 | 1.0× | 10 W |
| Industrial | 3 | 0.75× | 20 W |
| Heavy | 4 | 0.6× | 30 W |

## Methods

### .mine() `SELF ONLY`
Extract 1 unit of the current site's mineral into vehicle cargo. Mining takes `mineral_base_minutes × drill.speed_multiplier() / site_purity` game-time, and the script pauses until it finishes.

**Returns:** [[ActionResult]] · Outcomes: `"ok"` / `"not_mounted"` / `"not_at_site"` / `"not_surveyed"` / `"too_hard"` / `"no_cargo_space"` / `"no_power"` (transient) / `"not_enough_power"` / `"busy"` (transient)

### .hardness_limit()
Maximum mineral hardness this drill can extract.

**Returns:** Number: 1 basic, 3 Industrial, 4 Heavy. **Raises:** `ReferenceError` on a stale captured module reference (module no longer mounted); read `self.drill` again after mounting a drill.

### .speed_multiplier()
Per-unit time multiplier (lower = faster).

**Returns:** Number: 1.0 basic, 0.75 Industrial, 0.6 Heavy. **Raises:** `ReferenceError` on a stale reference.

## See also

- [[MiningSite]]: hardness and purity fields
- [[Mining Drill]]: the static installed alternative
