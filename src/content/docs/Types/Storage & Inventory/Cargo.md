---
tags:
  - type
  - storage-inventory
aliases:
  - Cargo
title: "Cargo"
---

Vehicle cargo view. **Returned by:** `self.cargo` on [[Rover]] (integrated hold) and [[Pioneer]] (Cargo Racks).

### .count() / .capacity() / .full()
Total units carried; total units the hold or installed racks can carry; `True` when the hold or every installed bin is full. **A Pioneer without installed bins is also full.**

**Returns:** number / number / boolean

### .stacks()
Snapshot of every property-distinct [[ItemStack]]. Use to distinguish variants sharing an item id.

**Returns:** list of `ItemStack`

### .racks()
Every mounted Cargo Rack as [[Rack]] objects. Empty on the Rover.

**Returns:** list of `Rack`

### .compact()
Pioneer only: consolidate equal item ids into the fewest installed Portable Bins that can hold them. Property-distinct variants stay intact; the planner preserves the fullest compatible bins to minimize movement. Requires Auto Feeders, waits proportional to units repositioned, and holds the Pioneer stationary as a material endpoint. **Does not change which bin `send()` drains first.**

**Returns:** [[TransferResult]] (payload `.requested`, `.moved`) · Outcomes: `"ok"` / `"already_compact"` (success) / `"research_required"` / `"busy"` (transient) / `"source_changed"` (transient) / `"target_full"`

### .discard(rack_index)
**Permanently jettison** everything in the zero-based rack (0 = the Rover's integrated hold). Already-empty finishes immediately; destroying cargo takes 1 hour and pauses the script. This is the vehicle cargo destruction API.

**Returns:** [[DiscardResult]] (payload `.requested`, `.discarded`) · Outcomes: `"ok"` / `"empty"` (success) / `"busy"` (transient) / `"invalid_rack"`
