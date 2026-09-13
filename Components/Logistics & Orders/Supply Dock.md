---
tags:
  - component
  - logistics-orders
aliases:
  - supply_dock_1
---
# Supply Dock

Ships finished goods to Earth at **25 units/h** before throughput research. A script assigns a contractor or Weekly Earth Order, loads what it needs, and enables dispatch; completion or expiry stops the dock until reassigned.

**Stats:** Type Logistics · Power in -15 W (draws from grid)

**How to obtain:** Requires the **Supply Logistics** research (Terraform Index 110,000). Buy from the Shop; price starts at 5,000 cr and rises as you own more.

**Access:** `self` / `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Methods

### .outpost
The outpost where this building is deployed, as an [[OutpostRef]].

### .capacity()
Total units still owed across every item of the active Order (the dock's remaining demand); 0 when no Order is assigned. Upper bound for how much you still need to load and ship.

**Returns:** Number

### .total()
Units currently loaded across every slot. Compare to `capacity()` to see how much more the dock needs; 0 means every slot is empty.

**Returns:** Number

### .count(item_id)
Units of `item_id` currently held. Check before loading to avoid redundant takes: `if self.count("iron_ore") < 20: self.input.take("iron_ore", 20)`.

**Returns:** Number

### .slots()
The dock's physical slots as a list of [[DockSlot]] objects (`.index`, `.item_id`, `.count`). Always 5 entries, indexed 0-4; slots not opened by the current Order have `.item_id == None` and `.count == 0`.

**Returns:** List of `DockSlot`

### .current_order()
This dock's active Earth [[Order]], or `None`. Flips to `None` automatically when the Order completes. Read `.requires` and `.shipped` before deciding what to load.

**Returns:** `Order` or `None`

### .set_order(order_id) `SELF ONLY`
Assign an Earth Order. Discover ids with `orders.list_orders()` or `orders.list_weekly_orders()`. Several docks may serve the same order and **share shipped progress**. Cargo is physical: drain this dock before switching orders.

**Returns:** [[ActionResult]] · Outcomes: `"ok"` / `"unknown_order"` / `"completed"` (success, already done, cannot reassign) / `"cargo_present"`

### .clear_order() `SELF ONLY`
Release the assignment and stop dispatch. Loaded cargo stays inside; recover it with `self.input.eject(destination, item_id, count)` or by connecting a local machine or vehicle input to this dock.

**Returns:** ActionResult · Outcomes: `"ok"`

### .set_enabled(on) `SELF ONLY`
Toggle the continuous dispatcher. Loading is unaffected either way. **Auto-flips off when the assigned order completes**; re-enable after the next `set_order` call.

**Returns:** ActionResult · Outcomes: `"ok"`

### .is_enabled()
`True` while the dispatcher is active. A **new dock starts enabled**, so assigning an Order while cargo is loaded begins shipping immediately.

**Returns:** Boolean

### .dispatch_rate()
Current effective throughput in units/h, already including throughput research and any outpost overcrowding penalty. Base 25 (one unit every 2.4 minutes); Bulk Logistics II ×4, Bulk Logistics III ×16. Multiply by hours elapsed to predict shipments.

**Returns:** Number

### .current_dispatch()
The `item_id` currently being emitted, or `None` when idle (no power, no Order, dispatcher paused, or nothing shippable loaded).

**Returns:** String or `None`

### .dispatch_progress()
Fraction 0-1 of the current unit's accumulator toward emission. Holds at 0 while nothing shippable is loaded. Drives the dock card's perimeter-clock animation; scripts can estimate "next launch in X hours."

**Returns:** Number (0-1)

### .input
**Order-aware** [[InputSlot]]: accepts only what the active Order still needs via `connect(...)` and `take(...)`, or push from a parked cargo vehicle. Excess stays at the source; active-order cargo stays reserved. After `clear_order()` or completion, `eject(destination, item_id, count)` recovers leftovers (to Inventory at Nocturna Base, local freight elsewhere); `flush()` **destroys** loaded cargo. Requires Auto Feeders research.

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].

## See also

- [[Earth Orders Guide]]: choosing which orders to serve
- [[Earth Orders]]: the component that lists order ids
- [[Expanding Production]]: scaling shipping chains
