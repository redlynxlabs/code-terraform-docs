---
tags:
  - type
  - storage-inventory
aliases:
  - Slot
---
# Slot

One base Inventory slot. **Returned by:** `inventory.get_slots()`

| Member | Returns | Meaning |
| --- | --- | --- |
| `.slot` | number | Slot index |
| `.id` | string | Item id (empty string if the slot is empty) |
| `.name` | string | Display name |
| `.value` | number | Credit value per item |
| `.count` | number | Stack count in this slot |
| `.properties` | dict or `None` | Exact property dict for this stack; pass to property-aware transfer and capacity methods |
| `.genes` | list of strings | Genes a held **geothermal fragment** carries (e.g. `["cold_tolerance", "pressure_tolerance"]`), readable without loading the [[DNA Sequencer]]. Empty for non-geothermal items |
| `.glow` | [r, g, b] or `None` | Per-instance bioluminescent glow (0-255) for a held **coastal fragment**; `None` otherwise |
| `.spliced` | boolean | `True` for an engineered geothermal fragment: **a further DNA Sequencer alter would destroy it** |

## See also

- [[Inventory]]: the component
