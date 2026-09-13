---
tags:
  - type
  - storage-inventory
aliases:
  - VehicleInputSlot
---
# VehicleInputSlot

Cargo input port on ground vehicles. **Returned by:** `self.input` on [[Rover]] and [[Pioneer]].

### .connect(name)
Set a compatible cargo source by stable id or display name. A Rover or Pioneer must be parked inside a stationary source's service area. Field Mining Drill and Water Pump stockpiles support carrier pickup. Vehicle handoffs require both vehicles stopped and nearby. `"inventory"` only while parked at Nocturna Base; remote outposts use local stores.

**Returns:** [[ActionResult]] · Outcomes: `"ok"` / `"not_found"` / `"same_endpoint"` / `"unsupported_source"` / `"source_is_vehicle"` (drones)

### .disconnect() / .connected_to() / .connected_id()
Clear the source connection (cargo stays); read the connected source's display name / stable id.

**Returns:** ActionResult / string / string

### .take(item_id, count, properties=None, property_match=None)
Load up to `count` units into vehicle cargo from the connected source. Standard property selection (`"any"` / `"subset"` / `"exact"`); exact source properties retained. Waits proportional to units moved; requires Auto Feeders.

**Returns:** [[TransferResult]] (payload `.requested`, `.moved`) with the shared outcome set

### .count() / .capacity() / .stacks()
Units carried, cargo capacity, and property-distinct [[ItemStack]] snapshots (same id can appear twice with different properties).

**Returns:** number / number / list of `ItemStack`

## See also

- [[Input & Output]] and [[Vehicle Proximity & Service]]: range and endpoint rules
