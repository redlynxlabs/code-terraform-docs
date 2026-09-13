---
tags:
  - type
  - infrastructure-fluids
aliases:
  - PowerSummary
---
# PowerSummary

Planet-wide power snapshot across every independent grid. **Returned by:** `power_control.total()`

| Member | Returns | Meaning |
| --- | --- | --- |
| `.grid_count` | number | Independent completed grids in this snapshot |
| `.generated` / `.consumed` | number | W supplied / drawn across every grid |
| `.net` | number | Planet-wide generation minus consumption in W |
| `.stored` / `.capacity` | number | Conventional battery Wh held / total capacity |
| `.reserve_stored` / `.reserve_capacity` | number | Lightning Rod reserve Wh held / total capacity |

Battery storage and Lightning reserve stay separate so automation can see which supply it relies on.

## See also

- [[Power Control]] · [[PowerGrid]]
