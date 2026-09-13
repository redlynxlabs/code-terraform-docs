---
tags:
  - component
  - infrastructure-fluids
aliases:
  - outpost_network
---
# Outpost Network

Read-only index of every owned outpost, including home. Use it for routing, deployment planning, capacity dashboards, and nearest-service decisions without hardcoding `outpost_1`, `outpost_2`, etc. An outpost's `.x` and `.y` identify its **footprint anchor**; for an at-building action, select that outpost's [[BuildingRef]] and route to `.position`. Construction planning belongs to Plan Mode and [[Construction Blueprint]]; physical work belongs to Constructor scripts.

**Access:** `get_component("outpost_network")` · Like every component, exposes `.id` and `.name`.

## Methods

### .outposts()
All owned outposts as [[OutpostRef]] snapshots. Each ref includes `.id`, `.name`, `.x`, `.y`, `.is_home`, `.buildings_used`, `.buildings_capacity`, `.is_full`. Coordinates are the top-left footprint anchor, not a building's docking point. Re-query for fresh names and counts.

**Returns:** List of `OutpostRef`

### .home()
The home outpost as an `OutpostRef`.

**Returns:** `OutpostRef`

### .nearest(x, y)
Nearest owned outpost to the given world coordinate. Useful before routing a vehicle home to recharge or choosing where a constructor should stage.

**Returns:** `OutpostRef`

## See also

- [[Outpost]]: the per-outpost live component
- [[First Outpost]]: founding new outposts
