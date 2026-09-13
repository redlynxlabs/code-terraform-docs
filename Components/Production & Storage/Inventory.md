---
tags:
  - component
  - production-storage
aliases:
  - inventory
---
# Inventory

Inventory is the physical storeroom at Nocturna Base. Its page and read-only script methods are visible planet-wide, but ordinary freight to machines or vehicles reaches it **only at the home outpost**; remote sites use local storage and vehicles. Purchases land here.

Deploy, undeploy, decommission, upgrade, and empty-rig hardware controls are explicit commissioning or service orders, not freight routes. Manual Biology uses Inventory at home and a selected same-outpost Warehouse elsewhere; Habitat reagents are staged locally.

**Access:** `get_component("inventory")` · Like every component, exposes `.id` and `.name`.

## Methods

### .stacks()
Lists every occupied item stack as an [[ItemStack]] with `.id`, `.count`, and exact `.properties`. Items with the same id but different properties appear separately. Storage Bins and Warehouses use the same format, so routing scripts can inspect all three in one way and pass exact properties to transfer methods.

**Returns:** List of `ItemStack` snapshots

### .get_slots()
Lists every current Inventory slot. Inventory starts with **36 slots**, and Cargo Expansion can increase it to **60**. Stackable items hold 10 units per slot, or 20 after **Bigger Stacks**. Each [[Slot]] has a zero-based index from `0` through `get_size() - 1`, plus its item id, name, value, count, and properties. Properties are an exact identity dict, or `None` for ordinary items.

**Returns:** List of `Slot` snapshots

### .count(item_id)
How many units of `item_id` are currently stored across all slots. Returns 0 if no slot holds that item. Storage Bins, Warehouses, and Lead Casks expose the same `count(item_id)` query, so one helper can search every store.

**Returns:** Number

### .has_space(item_id=None, properties=None)
Check whether Inventory has room. With no argument, `has_space()` is `True` when any slot is free. Passing an item id and properties checks that exact variant: a partial stack counts only when both match, while an empty slot accepts it.

**Returns:** Boolean

### .space_for(item_id, properties=None)
How many units of one exact item identity fit right now: remaining room in partial stacks with the same id and properties, plus empty slots times the current stack size. Bigger Stacks raises that size from 10 to 20 for stackable items.

**Returns:** Number

### .transfer_to(target, item_id, count, properties=None, property_match=None)
Requires **Auto Feeders** research. Move up to whole-number `count` units of `item_id` from this storage endpoint to another Storage Bin, Warehouse, Large Warehouse, Lead Cask, or Inventory. Pass a storage building's display name or instance id, or `"inventory"`. Inventory participates only at Nocturna Base. The call waits for the physical store's feeder cycle to finish, and every participating storage building remains busy during that cycle. Exact item properties are preserved; optional `properties` and `property_match` select a variant. The calling script may run anywhere, but cargo never crosses outpost boundaries through this method.

**Returns:** [[TransferResult]] (`.requested`, `.moved`); see that page for the full shared outcome table (`"ok"` / `"partial"` / `"no_op"` plus rejection and transient statuses).

### .drop(slot)
Remove 1 unit from a specific slot by its zero-based index. Valid indexes run from `0` through `get_size() - 1`, including slots added by Cargo Expansion. Dropped items are deleted, not returned to the world; use `shop.sell(item_id)` if you want credits.

**Returns:** [[ItemResult]] · Outcomes: `"ok"` / `"empty"` / `"invalid_slot"`

### .drop_all(item_id)
Remove every unit of `item_id` from inventory. For credits, use `shop.sell_all(item_id)`.

**Returns:** [[CountResult]] · Outcomes: `"ok"` (affected `.count` units) / `"no_op"`

### .get_size()
Current number of Inventory slots. Starts at 36; Cargo Expansion can increase it one slot at a time to 60. Use this value instead of hardcoding a slot count.

**Returns:** Number

### .get_used()
Number of occupied slots. `get_used() == get_size()` means inventory is full.

**Returns:** Number

## See also

- [[Input & Output]]: freight locality and property-bearing items
- [[Warehouse]] / [[Large Warehouse]]: remote-outpost storage
