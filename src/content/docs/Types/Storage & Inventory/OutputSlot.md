---
tags:
  - type
  - storage-inventory
aliases:
  - OutputSlot
title: "OutputSlot"
---

Item output port on machines with an output buffer. **Returned by:** `self.output`

## Connection

### .connect(name)
Set a compatible item destination by stable id or display name. Two stationary endpoints must share an outpost; a Rover or Pioneer must be parked inside this machine's service area; a drone's cargo moves through its Drone Depot. `"inventory"` is a freight destination only at Nocturna Base.

**Returns:** [[ActionResult]] · Outcomes: `"ok"` / `"not_found"` / `"not_local"` / `"same_endpoint"` / `"unsupported_target"` / `"target_is_vehicle"` (drones)

### .disconnect() / .connected_to() / .connected_id()
Clear the target connection (buffered output stays); read the connected target's display name / stable id.

**Returns:** ActionResult / string / string

## Transfers

### .send(item_id, count, properties=None, property_match=None)
Send up to `count` units to the connected target. Property selection follows the standard `"any"` / `"subset"` / `"exact"` rules; exact source properties are preserved. Waits proportional to units moved; requires Auto Feeders.

**Returns:** [[TransferResult]] (payload `.requested`, `.moved`) with the shared outcome set (including `"mixed_materials"`: one transfer carries only one item id)

## Reads

### .count() / .capacity() / .stacks()
Total buffered units, buffer capacity, and property-distinct [[ItemStack]] snapshots (inspect `.properties` before `send()`).

**Returns:** number / number / list of `ItemStack`

## See also

- [[Input & Output]]: the system guide
