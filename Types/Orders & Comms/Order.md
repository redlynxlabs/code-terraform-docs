---
tags:
  - type
  - orders-comms
aliases:
  - Order
---
# Order

One Earth Order. **Returned by:** `orders.list_orders()` / `list_weekly_orders()` / `get_order()` / `completed_orders()`.

| Member | Returns | Meaning |
| --- | --- | --- |
| `.id` | string | Immutable order id; Supply Dock scripts pass it to `set_order()` |
| `.name` | string | Pre-translated display name |
| `.requires` | dict | `{item_id: count}` Earth is demanding (`order.requires["iron_ore"]`) |
| `.shipped` | dict | `{item_id: count}` already landed; read safely with `.get(item_id, 0)` |
| `.reward_credits` | number | Credit payout on completion |
| `.reward_kind` | string or `None` | Variable reward: `"recipe"` / `"tech"`, or `None` for credits-only |
| `.reward_label` | string or `None` | Pre-translated description of the variable reward |
| `.status` | string | `"active"` while unfulfilled, `"completed"` once delivered |
| `.kind` | string | `"campaign"` or `"weekly"` |
| `.expires_day` | number or `None` | Expiry day for Weekly orders; `None` for campaign |
| `.contractor_id` | string or `None` | `"helios_orbital"` / `"spire_research"` / `"vestibule_logistics"`; `None` for Weekly |
| `.contractor_name` | string or `None` | Pre-translated contractor name; `None` for Weekly |

## See also

- [[Earth Orders]] and [[Earth Orders Guide]]
- [[Supply Dock]]: shipping the order
