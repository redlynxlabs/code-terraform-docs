---
tags:
  - component
  - production-storage
aliases:
  - large_warehouse_1
---
# Large Warehouse

High-bay multi-material depot: **15 material-locked slots, 2,000 each (30,000 total)**. Broad enough to stage a full biological catalogue.

**How to obtain:** Requires the **Large Warehouse** research (Biomass 30,000). Buy from the Shop for 60,000 cr.

**Access:** `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Methods

The Large Warehouse exposes exactly the same API as the [[Warehouse]]:

- `.outpost`: the owning [[OutpostRef]]
- `.count(item_id)`: units of that item across all slots
- `.total()`: total units across every slot
- `.capacity()`: total capacity (30,000 here; 10,000 for a standard Warehouse). Query instead of hardcoding a tier.
- `.fill_percent()`: `total() / capacity()`, 0-1
- `.is_empty()`: `True` if every slot is empty
- `.materials()`: list of item ids currently stored
- `.stacks()`: property-distinct [[ItemStack]] snapshots across all physical slots
- `.space_for(item_id, properties=None)`: units of one exact variant that fit right now
- `.has_space(item_id, amount, properties=None)`: `True` if at least `amount` more units of that exact variant fit
- `.slots()`: every physical slot as a [[WarehouseSlot]] record
- `.compact()`: consolidate every exact item variant into the fewest slots (Auto Feeders required; returns [[TransferResult]] with `"ok"` / `"already_compact"` and the shared transfer statuses)
- `.transfer_to(target, item_id, count, properties=None, property_match=None)`: move cargo to another same-outpost storage endpoint (returns [[TransferResult]]; see that page for the full shared outcome table)

## See also

- [[Warehouse]]: the standard 5-slot version with full method descriptions
- [[Input & Output]]: property variants and matching modes
