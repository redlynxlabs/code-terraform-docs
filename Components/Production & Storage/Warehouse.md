---
tags:
  - component
  - production-storage
aliases:
  - warehouse_1
---
# Warehouse

Multi-material bulk depot: **5 material-locked slots, 2,000 each (10,000 total)**. Drone-scale haulage absorption.

**How to obtain:** Requires the **Warehouse** research (Oxygen 150). Buy from the Shop for 3,000 cr.

**Access:** `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Methods

### .outpost
The outpost where this building is deployed, as an [[OutpostRef]].

### .count(item_id)
Units of `item_id` held across every slot. Returns 0 if no slot holds it. `wh.count("iron_ore")`.

**Returns:** Number

### .total()
Total units across all slots (every material combined). For one material use `count(item_id)`.

**Returns:** Number

### .capacity()
Total capacity across all physical slots. A Warehouse returns 10,000 (5 × 2,000); a [[Large Warehouse]] returns 30,000 (15 × 2,000). Query this value instead of hardcoding a tier.

**Returns:** Number

### .fill_percent()
Fraction full across the whole warehouse: `total() / capacity()`, in the range 0-1.

**Returns:** Number (0-1)

### .is_empty()
`True` if every slot is empty.

**Returns:** Boolean

### .materials()
List of item ids currently stored (one entry per material with units in a slot).

**Returns:** List of item ids

### .stacks()
Lists the item variants stored across all physical slots as [[ItemStack]] values. Items with the same id but different properties occupy separate slots.

**Returns:** List of `ItemStack` snapshots

### .space_for(item_id, properties=None)
How many more units of one exact item variant fit right now, using room in matching-identity slots plus every empty slot. This never counts room belonging to a different property variant.

**Returns:** Number

### .has_space(item_id, amount, properties=None)
`True` if at least whole-number `amount` more units of that exact item variant fit. Use before a transfer to avoid partial moves.

**Returns:** Boolean

### .slots()
Every physical slot as a [[WarehouseSlot]] record with `.index`, `.item`, `.count`, `.capacity`, and `.properties`. Property-distinct variants use distinct slots.

**Returns:** List of `WarehouseSlot` records

### .compact()
Requires **Auto Feeders** research. Consolidate every exact item variant into the fewest Warehouse slots that can hold it. The smallest redundant stacks move into larger compatible stacks, minimizing physical handling; equal item ids with different properties always remain separate. The call waits for time proportional to the units repositioned and locks this Warehouse as a material endpoint for the cycle. Port transfers and manual Biology actions using this Warehouse wait until that cycle finishes.

**Returns:** [[TransferResult]] · Outcomes: `"ok"` (compacted `.moved` units) / `"already_compact"` / `"research_required"` / `"busy"` / `"source_under_construction"` / `"source_changed"` / `"slots_full"` / `"target_full"`

### .transfer_to(target, item_id, count, properties=None, property_match=None)
Requires **Auto Feeders** research. Move up to `count` units of `item_id` from this storage endpoint to another Storage Bin, Warehouse, Large Warehouse, Lead Cask, or Inventory at the same outpost. Inventory participates only at Nocturna Base. Exact item properties are preserved; optional `properties` and `property_match` select a variant.

**Returns:** [[TransferResult]]; see that page for the full shared outcome table.

## See also

- [[Large Warehouse]]: the 15-slot version
- [[First Biology Loop]]: Warehouses as remote manual stockrooms
