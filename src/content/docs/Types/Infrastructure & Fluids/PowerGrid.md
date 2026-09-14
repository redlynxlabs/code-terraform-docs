---
tags:
  - type
  - infrastructure-fluids
aliases:
  - PowerGrid
title: "PowerGrid"
---

Snapshot of one independent power grid from the latest completed allocation. **Returned by:** `power_control.grids()` / `power_control.grid(target_id)`

| Member | Returns | Meaning |
| --- | --- | --- |
| `.anchor_id` | string | Deterministic entity id identifying this connected grid right now; pass to `power.grid(...)`. **Merging or splitting a grid can change its anchor**, so re-discover after rewiring |
| `.outpost_ids` | list of strings | Connected outposts, sorted (empty for a field-only grid) |
| `.machine_ids` | list of strings | Building and field power-structure ids on this grid, sorted. Mobile units and ship equipment are excluded |
| `.members` | list of [[PowerGridMember]] | Power details per machine |
| `.generated` / `.consumed` | number | W supplied by active generators / drawn by active consumers at snapshot time |
| `.net` | number | Generation minus consumption in W; **negative means the load is drawing stored energy** |
| `.stored` / `.capacity` | number | Conventional battery Wh held / total capacity |
| `.reserve_stored` / `.reserve_capacity` | number | Lightning Rod reserve Wh held / capacity. The reserve is spent **only after** conventional batteries and never absorbs ordinary generation surplus |
| `.has_generator` | boolean | `True` when the grid contains a generator, even at 0 W output |

## See also

- [[Power Control]] and [[Power Networks]]
