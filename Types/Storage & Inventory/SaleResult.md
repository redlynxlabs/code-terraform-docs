---
tags:
  - type
  - storage-inventory
  - result
aliases:
  - SaleResult
---
# SaleResult

Result of a Shop sale. **Returned by:** `shop.sell()`, `shop.sell_all()`

| Field | Returns | Meaning |
| --- | --- | --- |
| `.status` | string | `"ok"`, `"not_sellable"`, or `"no_stock"` |
| `.message` | string | Player-readable explanation |
| `.item_id` | string | Item id requested for sale |
| `.units` | number | Units removed from Inventory |
| `.credits` | number | Credits earned by this sale |

See [[Command Results]] for the shared result model and [[Shop]] for the component.
