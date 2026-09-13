---
tags:
  - component
  - production-storage
aliases:
  - storage_bin_1
---
# Storage Bin

A passive base container that holds **one material at a time**. The first deposit sets what it stores, and the lock clears only once it drains empty. Other scripts can read and move its contents.

**Stats:** Storage 500 units

**How to obtain:** Requires the **Storage Bins** research (Temperature 5). Buy from the Shop for 120 cr.

**Access:** `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Methods

### .outpost
The outpost where this building is deployed, as an [[OutpostRef]].

### .count(item_id)
Units of `item_id` currently stored. Returns 0 when the bin is empty or latched to another item. Inventory, Warehouses, and Lead Casks expose the same `count(item_id)` query.

**Returns:** Number

### .get_capacity()
Maximum units the bin holds: 500 by default. Queryable rather than hardcoded.

**Returns:** Number

### .get_material()
Currently latched material id, or the empty string if the bin is empty (and therefore accepts any material on the next deposit). Use to check a bin's material before routing transfers: `if bin.get_material() in ("", "iron_ore"): # safe to deposit iron`.

**Returns:** String

### .stacks()
Lists the item variants stored in this bin as [[ItemStack]] values. Items with the same id but different properties remain separate.

**Returns:** List of `ItemStack` snapshots

### .is_empty()
`True` if the bin holds nothing. An empty bin has no material lock. Different from `has_space(0)` which is always `True`.

**Returns:** Boolean

### .has_space(amount)
`True` if the bin has room for whole-number `amount` more units. Use before a transfer to avoid partial moves.

**Returns:** Boolean

### .space()
Free units of capacity remaining. Sizes a transfer in one call: `n = bin.space()`, then move up to `n`.

**Returns:** Number

### .fill_percent()
Fraction full in the range 0-1. Common threshold for rebalance scripts.

**Returns:** Number (0-1)

### .transfer_from_inventory(item_id, count, properties=None, property_match=None)
Requires **Auto Feeders** research and a Storage Bin at the **home outpost**. Move up to `count` units of `item_id` from Inventory into the bin, preserving exact properties. The call waits for the feeder cycle to finish, and the bin cannot start another transfer during that cycle. A property dict selects a subset by default; pass `"exact"` for a full identity.

**Returns:** [[TransferResult]] · Key statuses: `"ok"` / `"partial"` / `"no_op"` / `"research_required"` / `"busy"` / `"inventory_not_local"` / `"source_empty"` / `"target_wrong_material"` / `"hot_cargo_requires_cask"` / `"target_full"` (see [[TransferResult]] for the full table)

### .transfer_to_inventory(count, properties=None, property_match=None)
Requires **Auto Feeders** research and a Storage Bin at the home outpost. Move up to `count` units back to Inventory, preserving exact properties. If the bin drains completely, its item-id latch clears.

**Returns:** [[TransferResult]] with the same status family

### .transfer_to(target, item_id, count, properties=None, property_match=None)
Requires **Auto Feeders** research. Move cargo to another Storage Bin, Warehouse, Large Warehouse, Lead Cask, or Inventory at the same outpost. Cargo never crosses outpost boundaries through this method.

**Returns:** [[TransferResult]]; see that page for the full shared outcome table.

## See also

- [[Refinement & Storage]]: naming and pipeline conventions
- [[Warehouse]]: the multi-material depot
- [[Portable Storage Bin]]: the vehicle-mounted version
