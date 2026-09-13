---
tags:
  - type
  - storage-inventory
aliases:
  - InputSlot
---
# InputSlot

Item input port on stationary machines with an input buffer. **Returned by:** `self.input`

## Connection

### .connect(name)
Set a compatible item source by stable id or display name. Two stationary endpoints must share an outpost. A Rover or Pioneer is reachable only while parked inside this machine's service area. Field-extractor pickup outputs can be pulled only by a Rover or Pioneer. **A drone's cargo moves through its Drone Depot.** `"inventory"` is a freight source only while the endpoint is at Nocturna Base; remote ports use local Storage Bins, Warehouses, or machine buffers.

**Returns:** [[ActionResult]] · Outcomes: `"ok"` / `"not_found"` / `"not_local"` / `"same_endpoint"` / `"unsupported_source"` / `"source_is_vehicle"` (drones)

### .disconnect()
Clear the source connection. Does not move or discard buffered items; use `eject(...)` to recover them or `flush()` to destroy them.

**Returns:** ActionResult · Outcomes: `"ok"`

### .connected_to() / .connected_id()
Display name / stable id of the connected source (empty string when none). `connect()` accepts either, so compare against `connected_id()` when identity must survive renames.

**Returns:** string

## Transfers

All transfers wait automatically for time proportional to units moved and require **Auto Feeders** research. Property selection: a `properties` dict matches stacks containing that subset by default; `property_match` is `"any"` / `"subset"` / `"exact"` (with `None, "exact"` selecting only propertyless items). Exact source properties are always retained. Outcome codes are the shared [[TransferResult]] set.

### .take(item_id, count, properties=None, property_match=None)
Take up to `count` units from the connected source into this buffer.

**Returns:** [[TransferResult]] (payload `.requested`, `.moved`)

### .eject(destination, item_id, count, properties=None, property_match=None)
Recover up to `count` units **from this buffer** without changing its source connection. Destination: `"inventory"` at Nocturna Base, or a compatible same-outpost store, machine input, or parked ground vehicle. Active or reserved work rejects without moving anything; a successful ejection cancels fractional work attached to the staged input.

**Returns:** TransferResult

### .flush()
Permanently destroy the buffered contents (referenced across machine pages; the recovery-safe alternative is `eject`).

**Returns:** TransferResult

## Reads

### .count() / .capacity() / .stacks()
Total buffered units, buffer capacity, and property-distinct [[ItemStack]] snapshots.

**Returns:** number / number / list of `ItemStack`

## See also

- [[Input & Output]]: the system guide
- [[OutputSlot]] / [[VehicleInputSlot]] / [[PickupOutputSlot]]: the other port shapes
