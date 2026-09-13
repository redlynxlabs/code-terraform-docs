---
tags:
  - type
  - infrastructure-fluids
aliases:
  - FluidConnection
---
# FluidConnection

One effective peer relationship on a fluid port. **Returned by:** `FluidPort.connections()`

| Member | Returns | Meaning |
| --- | --- | --- |
| `.machine_id` | string | Stable id of the peer machine |
| `.machine_name` | string | Current display name of the peer |
| `.fluid` | string or `None` | Exact fluid established by this relationship (any id from [[Fluids]]); `None` while neutral or incompatible |
| `.declared_by` | string | Who owns the durable declaration: `"self"`, `"peer"`, or `"both"` (one side suffices for transport) |
| `.state` | string | `"local"` (direct same-outpost link) / `"ready"` (usable remote pipe network) / `"unreachable"` (no completed component assignable) / `"conflict"` (assigned component carries different fluid connections) / `"neutral"` (no fluid known yet) / `"incompatible"` (the two fluids disagree) |

## See also

- [[Flow Networks & Fluids]]: what each state means in practice
