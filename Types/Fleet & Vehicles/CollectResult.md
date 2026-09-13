---
tags:
  - type
  - fleet-vehicles
  - result
aliases:
  - CollectResult
---
# CollectResult

Result of a drone weather-aftermath collection. **Returned by:** `drone.collect()`

| Field | Returns | Meaning |
| --- | --- | --- |
| `.status` | string | `"ok"`, `"moving"` (transient), `"busy"` (transient), `"nothing_here"`, `"no_cargo_space"`, `"scrambled"` (transient) |
| `.message` | string | Player-readable explanation |
| `.item_id` | string or `None` | Collected material id; `None` when nothing was collected |
| `.collected` | number | Units committed to drone cargo by this call |

See [[Drone]] `collect()` for exposure rules and [[Weather System]] for aftermath sites.
