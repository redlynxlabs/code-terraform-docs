---
tags:
  - type
  - world-sites
aliases:
  - OutpostRef
---
# OutpostRef

Read-only outpost snapshot. **Returned by:** `outpost_network.outposts()` / `.home()` / `.nearest()`, and building `.outpost` properties.

| Member | Returns | Meaning |
| --- | --- | --- |
| `.id` | string | Immutable outpost id (`"outpost_home"`, `"outpost_1"`); use with `get_component(id)` |
| `.name` | string | Display name at snapshot time |
| `.x` / `.y` | number | World coordinates of the footprint's **top-left anchor**, meters from base |
| `.position()` | [[Position]] | The anchor as a Position snapshot |
| `.coords()` | [x, y] | The anchor as a list |
| `.is_home` | boolean | `True` for the home outpost |
| `.biome` | string | `"frozen"` / `"coastal"` / `"geothermal"` / `"volcanic"` / `"deep"`; a building reads its own via `self.outpost.biome` |
| `.buildings_used` | number | Buildings deployed at snapshot time |
| `.buildings_capacity` | number | Soft threshold; buildings above it reduce throughput |
| `.is_full` | boolean | Threshold reached or exceeded at snapshot time |
| `.buildings(type_id?)` | list of [[BuildingRef]] | Buildings here, optionally filtered by type id |
| `.harvesting_machines(type_id?)` | list of [[HarvestingMachineRef]] | Fixed field machines (`"grow_lamp"` / `"sprinkler"` / `"dispenser"` / `"crop_automator"`); only Nocturna Base has the field |

**For an at-building action, route to that building's `BuildingRef.position`, not the outpost anchor.** Re-query for fresh counts and names.

## See also

- [[Outpost]] and [[Outpost Network]]: the live components
