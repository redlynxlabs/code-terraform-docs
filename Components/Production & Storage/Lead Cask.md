---
tags:
  - component
  - production-storage
aliases:
  - lead_cask_1
---
# Lead Cask

The **only safe stationary home for hot radioactive cargo**. Drones drop Raw Uranium into it, the [[Fuel Assembler]] draws from it and returns finished Fuel Rods, and the [[Reactor]] pulls its fuel from it.

**Stats:** Storage 100 units

**How to obtain:** The recipe unlocks when you complete Helios, Plate Order. Requires the **Shielded Logistics** research (Oxygen 3,000). Fabricate on a Fabricator: 3× Lead Plate, 1× Machine Frame. Deploy from Inventory.

**Access:** `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Methods

### .outpost
The outpost where this building is deployed, as an [[OutpostRef]].

### .count(item_id)
Units of `item_id` currently casked. Returns 0 when the cask is empty or latched to the other hot item. Inventory, Storage Bins, and Warehouses expose the same `count(item_id)` query.

**Returns:** Number

### .fill_percent()
Fill fraction 0-1: watch your strategic reserve.

**Returns:** Number (0-1)

### .capacity()
Maximum hot units (100).

**Returns:** Number

### .material()
What the cask is latched to: `"raw_uranium"`, `"fuel_rod"`, or empty when unassigned. One material per cask, like every stock bin. **Casks accept ONLY hot items; everything else refuses them.**

**Returns:** String

### .transfer_to(target, item_id, count, properties=None, property_match=None)
Requires **Auto Feeders** research. Move hot cargo to another same-outpost storage endpoint. Hot cargo must move through compatible Lead Casks (`"hot_cargo_requires_cask"` / `"cask_accepts_hot_only"` enforce this).

**Returns:** [[TransferResult]]; see that page for the full shared outcome table.

## See also

- [[Weather System]]: Raw Uranium from dust storm aftermaths
- [[Drones]]: hot cargo, exposure, and Shield Plating
