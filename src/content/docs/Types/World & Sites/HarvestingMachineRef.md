---
tags:
  - type
  - world-sites
aliases:
  - HarvestingMachineRef
title: "HarvestingMachineRef"
---

Read-only snapshot of a fixed Harvesting-field machine. **Returned by:** `outpost.harvesting_machines()` (only Nocturna Base has the field).

| Member | Returns | Meaning |
| --- | --- | --- |
| `.id` | string | Stable component id; `get_component(id)` reaches the full machine API |
| `.name` | string | Display name at snapshot time |
| `.type_id` | string | `"grow_lamp"` / `"sprinkler"` / `"dispenser"` / `"crop_automator"` |
| `.powered` | boolean | Power toggle state at snapshot time |
| `.position` | string | Field sector occupied, such as `"B22"` |

These machines occupy field cells, don't use building capacity, and don't appear in `buildings()`.

## See also

- [[Grow Lamp]] · [[Sprinkler]] · [[Dispenser]] · [[Crop Automator]]
