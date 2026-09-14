---
tags:
  - type
  - fleet-vehicles
aliases:
  - VehicleRef
title: "VehicleRef"
---

Read-only ground-vehicle snapshot. **Returned by:** `fleet.vehicles()`

| Member | Returns | Meaning |
| --- | --- | --- |
| `.category` | string | Always `"vehicle"` |
| `.id` | string | Stable component id; use with `get_component(id)` or `charging_station.dispatch_rescue(id)` |
| `.name` | string | Display name at snapshot time |
| `.kind` | string | `"rover"` or `"pioneer"` |
| `.status` | string | Same value set as [[Rover]]/[[Pioneer]] `.status()` at snapshot time |
| `.x` / `.y` / `.position()` | number / [[Position]] | Coordinates at snapshot time |
| `.battery_level` / `.battery_wh` / `.battery_capacity` | number | Charge fraction / Wh / max Wh |
| `.is_docked` | boolean | Parked inside an outpost's 2×2-tile footprint **including the ~2 m service margin**; a moving or merely stopped vehicle with an active route is not docked |
| `.docked_at` | string | Outpost id, or empty string |
| `.is_being_rescued` | boolean | A [[Vehicle Charging Station]] rescue was active |
| `.rescue_status` | string | `"none"` / `"outbound"` / `"charging"` / `"returning"` |

Re-query for fresh values, or `get_component(ref.id)` for the live vehicle API.
