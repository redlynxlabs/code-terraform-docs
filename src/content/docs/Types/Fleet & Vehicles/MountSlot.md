---
tags:
  - type
  - fleet-vehicles
aliases:
  - MountSlot
title: "MountSlot"
---

One chassis mount point. **Returned by:** `self.modules()` on [[Rover]] / [[Pioneer]] (and drones expose analogous slots).

| Member | Returns | Meaning |
| --- | --- | --- |
| `.index` | number | Slot position on the chassis, 0-indexed; pass to `mount` / `unmount` |
| `.type` | string | Which modules fit: `"nav"`, `"sonar_basic"`, `"drill_basic"`, `"universal"`, `"thruster"`, or `"drone_module"` |
| `.module_id` | string or `None` | Currently mounted module id, or `None` if empty |
| `.internal_count` | number | Internal slots this mounted module exposes (0 for non-containers) |
| `.internal_items` | list | Item ids installed in the module's internal slots; `None` entries mark empty bays |

Call before `mount(...)` / `install(...)` to find an empty compatible target.
