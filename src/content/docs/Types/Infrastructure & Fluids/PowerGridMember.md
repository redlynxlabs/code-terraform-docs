---
tags:
  - type
  - infrastructure-fluids
aliases:
  - PowerGridMember
title: "PowerGridMember"
---

Power details for one machine on a grid. **Returned by:** `PowerGrid.members`

| Member | Returns | Meaning |
| --- | --- | --- |
| `.id` | string | Stable machine instance id; pass to `get_component(...)`, `power.grid(...)`, or breaker APIs |
| `.name` | string | Display name at snapshot time |
| `.type_id` | string | Stable machine type id (`"solar_generator"`, `"battery"`, `"smelter"`...) |
| `.outpost_id` | string | Owning outpost id, or empty for an independently placed field structure |
| `.powered` | boolean | Power state at snapshot time |
| `.roles` | list of strings | Any combination of `"generator"`, `"consumer"`, `"storage"`, `"reserve"`; empty = no direct electrical role but installed at a connected outpost |
| `.generated` | number | W currently supplied (a generator may read 0: off, idle, unfueled, no sunlight) |
| `.consumed` | number | W currently drawn (off and idle machines read 0) |
| `.stored` / `.capacity` | number | Conventional battery Wh held / capacity (0 for other roles) |
| `.reserve_stored` / `.reserve_capacity` | number | Lightning reserve Wh held / capacity (0 for other roles) |

## See also

- [[PowerGrid]] · [[Power Control]]
