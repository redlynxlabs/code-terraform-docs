---
tags:
  - type
  - fleet-vehicles
aliases:
  - DroneRef
---
# DroneRef

Read-only drone snapshot. **Returned by:** `fleet.drones()`

| Member | Returns | Meaning |
| --- | --- | --- |
| `.category` | string | Always `"drone"` |
| `.id` | string | Stable component id; use with `get_component(id)` and station/recovery APIs |
| `.name` | string | Display name at snapshot time |
| `.kind` | string | `"drone_small"` / `"drone_medium"` / `"drone_large"` |
| `.engine` | string | `"electric"`, `"heli"`, or `""` if no thruster mounted |
| `.status` | string | Same value set as [[Drone]] `.status()` at snapshot time |
| `.x` / `.y` / `.position()` | number / [[Position]] | Coordinates at snapshot time |
| `.current_station` | string | Station id, or empty string |
| `.is_docked` | boolean | Parked at a drone station at snapshot time |
| `.battery_level` / `.battery_wh` / `.battery_capacity` | number or `None` | Electric charge (fraction / Wh / max Wh); `None` for heli drones |
| `.oil_level` / `.oil_tons` / `.oil_capacity` | number or `None` | Heli oil (fraction / tons / max tons); `None` for electric drones |
| `.is_being_rescued` | boolean | Rescue active at snapshot time |
| `.rescue_status` | string | `"none"` / `"outbound"` / `"charging"` / `"carrying"` / `"returning"` |

Re-query `fleet.drones()` for fresh values, or `get_component(ref.id)` for the live drone API.
