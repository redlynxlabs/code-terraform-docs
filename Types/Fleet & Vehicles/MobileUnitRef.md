---
tags:
  - type
  - fleet-vehicles
aliases:
  - MobileUnitRef
---
# MobileUnitRef

Unified read-only snapshot of any mobile unit. **Returned by:** `fleet.mobile_units()`

| Member | Returns | Meaning |
| --- | --- | --- |
| `.category` | string | `"vehicle"` or `"drone"`: branch on this |
| `.id` | string | Stable component id |
| `.name` | string | Display name at snapshot time |
| `.kind` | string | `"rover"`, `"pioneer"`, or a drone chassis id |
| `.status` | string | Union of the vehicle and drone status sets |
| `.x` / `.y` / `.position()` | number / [[Position]] | Coordinates at snapshot time |
| `.is_docked` | boolean | Parked at a service point/station |
| `.is_being_rescued` | boolean | A rescue/recovery mission owned this unit |
| `.rescue_status` | string | `"none"` / `"outbound"` / `"charging"` / `"carrying"` / `"returning"` |

For engine or battery specifics, use [[VehicleRef]] / [[DroneRef]] from the dedicated lists.
