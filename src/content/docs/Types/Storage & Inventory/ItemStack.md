---
tags:
  - type
  - storage-inventory
aliases:
  - ItemStack
title: "ItemStack"
---

One property-distinct stack of items. **Returned by:** `stacks()` on [[InputSlot]], [[VehicleInputSlot]], [[OutputSlot]], [[PickupOutputSlot]], [[Cargo]], [[Bin]], Storage Bin, and Warehouse.

| Member | Returns | Meaning |
| --- | --- | --- |
| `.id` | string | Stable item id shared by every unit in this stack |
| `.count` | number | Whole-number units with this **exact** property identity |
| `.properties` | dict or `None` | Exact property dict, or `None` for an ordinary commodity |

**Items with different properties form separate stacks and never merge.** Property-aware transfers select stacks with the `properties` + `property_match` (`"any"` / `"subset"` / `"exact"`) arguments; see [[Input & Output]].
