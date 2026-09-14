---
tags:
  - type
  - world-sites
aliases:
  - BuildingRef
title: "BuildingRef"
---

Read-only building snapshot. **Returned by:** `outpost.buildings()` and `OutpostRef.buildings()`.

| Member | Returns | Meaning |
| --- | --- | --- |
| `.id` | string | Stable component id; `get_component(id)` reaches the full machine API |
| `.name` | string | Display name at snapshot time (e.g. `"Iron Ore Bin"`) |
| `.type_id` | string | Machine type id (`"storage_bin"`, `"smelter"`, `"solar_generator"`...); stable forever, use for branching |
| `.outpost_id` | string | Id of the owning outpost |
| `.outpost` | [[OutpostRef]] or `None` | Snapshot back-reference to the owning outpost |
| `.powered` | boolean | Power toggle state at snapshot time |
| `.position` | [x, y] | World coordinates: the deploy anchor, and **the docking target for at-building vehicle actions** |

For live power, counts, recipes, or materials, call `get_component(ref.id)`.
