---
tags:
  - type
  - storage-inventory
aliases:
  - WarehouseSlot
---
# WarehouseSlot

One material-locked warehouse slot. **Returned by:** `warehouse.slots()`

| Member | Returns | Meaning |
| --- | --- | --- |
| `.index` | number | Slot index (0-based) |
| `.item` | string | Item id this slot holds (empty string when empty) |
| `.count` | number | Units currently in this slot |
| `.capacity` | number | This slot's capacity in units |
| `.properties` | dict or `None` | Exact property dict for the variant in this physical slot; `None` when empty or ordinary |

## See also

- [[Warehouse]] and [[Large Warehouse]]: the components
