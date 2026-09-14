---
tags:
  - component
  - vehicles-modules
  - type
aliases:
  - fleet
title: "Fleet"
---

Read-only index of every owned mobile unit: ground vehicles and drones. Use it for dashboards, charging scripts, rescue thresholds, and dispatch decisions without hardcoding names. Fleet refs are snapshots; control still goes through the unit's own script or the relevant station API.

**Access:** `get_component("fleet")` · Like every component, exposes `.id` and `.name`. This page also covers the `Fleet` API type.

## Methods

### .vehicles()
All owned ground vehicles as [[VehicleRef]] snapshots. Each ref includes `.id`, `.name`, `.kind`, `.x`, `.y`, `.battery_level`, `.is_docked`, `.is_being_rescued`, and `.rescue_status`. Re-query for fresh positions/status, or use `get_component(ref.id)` for the live vehicle API.

**Returns:** List of `VehicleRef`

### .drones()
All owned drones as [[DroneRef]] snapshots. Each ref includes `.id`, `.name`, `.kind`, `.engine`, `.current_station`, `.battery_level` or `.oil_level`, `.is_docked`, `.is_being_rescued`, and `.rescue_status`.

**Returns:** List of `DroneRef`

### .mobile_units()
All owned ground vehicles and drones in one list. Use `.category` to branch between `"vehicle"` and `"drone"`. See [[MobileUnitRef]].

**Returns:** List of `MobileUnitRef`

## See also

- [[Vehicle Proximity & Service]]: what `.is_docked` means exactly
- [[Vehicle Charging Station]]: `dispatch_rescue()` takes fleet ids
