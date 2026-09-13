---
tags:
  - component
  - logistics-orders
aliases:
  - orders
---
# Earth Orders

Lists Earth's current supply-chain demands. [[Supply Dock]] scripts use campaign and Weekly Orders to decide what to ship; dashboards can show progress. **Scripts cannot create or cancel Earth Orders.** Bio Orders come from a [[Bio Exchange]] instead.

**Access:** `get_component("orders")` · Like every component, exposes `.id` and `.name`.

## Methods

### .list_orders()
Current contractor campaign Orders as a stable list of [[Order]] objects. These never expire and disappear from the list when fully shipped. Empty means no contractor shipment is currently available.

**Returns:** List of `Order`

### .list_weekly_orders()
The current **five Weekly Earth Orders**, including offers already fulfilled this cycle. Empty until an eligible production chain is available. Weekly objects have `.kind == "weekly"`, `.expires_day`, no contractor, credits-only rewards, and `.status` of `"active"` or `"completed"`. The whole list is replaced every seven days.

**Returns:** List of `Order`

### .get_order(order_id)
Look up a specific Earth Order by id: a current campaign or Weekly order, or a completed campaign order. Expired weekly ids return `None`; weekly completions remain visible only until their board refreshes. Bio Order ids are read from a Bio Exchange, not here.

**Returns:** `Order` or `None`

### .completed_orders()
Permanent contractor campaign history, ordered by completion time (oldest first). Weekly completions stay on the current Weekly board and are intentionally excluded from this ledger.

**Returns:** List of `Order`

## See also

- [[Earth Orders Guide]]: how campaign and Weekly Orders work, rewards, strategy
- [[Supply Dock]]: `set_order(id)` consumes these ids
- [[Contracts]]: contractor campaigns that spawn these orders
