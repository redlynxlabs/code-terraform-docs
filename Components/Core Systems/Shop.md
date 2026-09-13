---
tags:
  - component
  - core-systems
aliases:
  - shop
---
# Shop

Buys from and sells to Earth. Use `get_component("shop")` to automate surplus sales or purchases when a threshold is reached. The same catalogue and prices are used by the Shop UI.

**Access:** `get_component("shop")` · Like every component, exposes `.id` and `.name`.

## Methods

### .sell(item_id, quantity=1)
Sell a positive whole-number `quantity` of `item_id`, defaulting to 1. The complete quantity is removed from the lowest-indexed matching Inventory slots in one transaction; if Inventory contains fewer units, nothing is sold. Battery products refund their charge percentage, with a 50% minimum; fully charged batteries refund their full normal value. Use the Inventory page when you need to choose one exact battery instance.

**Returns:** [[SaleResult]] (`.status`, `.message`; payload `.item_id`, `.units`, `.credits`)

| Status | Kind | Meaning |
| --- | --- | --- |
| `"ok"` | success | Sale completed: `.item_id` × `.units`; received `.credits` cr |
| `"not_sellable"` | rejection | The requested item cannot be sold |
| `"no_stock"` | rejection | Inventory does not contain the requested quantity |

**Raises:** `TypeError` (quantity must be a finite whole number), `ValueError` (quantity must be greater than zero), `OverflowError` (quantity outside the supported range)

### .sell_all(item_id)
Sell every unit of `item_id` currently in Inventory in one transaction. There is no per-unit cooldown. Each battery product is valued from its own retained charge, with a 50% minimum and full normal value at full charge.

**Returns:** [[SaleResult]] · Outcomes: `"ok"` / `"not_sellable"` / `"no_stock"`

### .buy(item_id, quantity=1)
Buy a positive whole-number `quantity` of `item_id`, defaulting to 1. The complete quantity must be affordable and fit in base Inventory; otherwise nothing is charged or delivered. Purchases are placed in **base Inventory**, not delivered directly to a machine or remote outpost.

**Returns:** [[ActionResult]]

| Status | Kind | Meaning |
| --- | --- | --- |
| `"ok"` | success | Purchase completed |
| `"not_found"` | rejection | No such catalogue item |
| `"locked"` | rejection | The required feature, recipe, or operation is locked |
| `"insufficient_credits"` | rejection | Available credits are below the total cost |
| `"inventory_full"` | rejection | Inventory has no capacity for the result |

**Raises:** `TypeError` / `ValueError` / `OverflowError` for malformed quantities

### .get_catalogue()
Every available catalogue entry as a list of `{id, name, cost}` objects. Use to pick a target dynamically or to show a filtered picker in a script. The Earth shop never runs out of catalogue items; entries hidden by tech gates don't appear.

**Returns:** List of [[ShopItem]] `{id, name, cost}`

## See also

- [[Commander]]: check credits before buying
- [[Inventory]]: where purchases land
