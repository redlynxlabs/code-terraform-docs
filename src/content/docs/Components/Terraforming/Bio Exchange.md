---
tags:
  - component
  - terraforming
  - biology
aliases:
  - bio_exchange_1
title: "Bio Exchange"
---

Delivers biology samples to fulfill a **Bio Order**, the biology counterpart to the [[Supply Dock]]. A script assigns an order and delivers its required fragments until the reward pays out.

**Stats:** Power in -8 W · Input buffer 10 · Output buffer 10 · Buy from the Shop for 4,000 cr.

**Access:** `self` / `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Methods

### .outpost
The outpost where this building is deployed, as an [[OutpostRef]].

### self.orders()
Lists every [[BioOrder]], including orders you cannot fill yet. Each order includes its id, biome, requirements, reward, status, delivered samples, samples already `in_transit`, completion percent, and any required `target_glow`. **Progress is shared by every Bio Exchange serving that order.** Use `requires - delivered - in_transit` to avoid making samples that are already committed, then pass the chosen `order.id` to `set_order(...)`. From another script, call `get_component("bio_exchange_1").orders()`. `get_component("orders")` is for Earth Orders.

**Returns:** List of every `BioOrder`

### self.set_order(order_id) `SELF ONLY`
Pick the Bio Order this Exchange will fill: `self.set_order("bio_order_03")`. Several Exchanges may activate the same Bio Order; they cooperate on one shared delivery count, so big Bio Orders can be served from multiple outposts at once.

**Returns:** [[ActionResult]] · Outcomes: `"ok"` / `"unknown_order"` / `"completed"` (already completed; cannot be assigned again)

### self.clear_order() `SELF ONLY`
Clear this Exchange's active Bio Order assignment. Already delivered progress stays recorded on the Bio Order, completed Bio Orders stay completed, and no samples are moved.

**Returns:** ActionResult · Outcomes: `"ok"` / `"busy"` (transient)

### self.active_order()
A snapshot of the active [[BioOrder]] object: its `requires`, completed `delivered` progress, live `in_transit` commitments, `percent`, and `target_glow` (coastal infusion target) at the moment you call it, or `None` if no order is set. `in_transit` includes qualifying samples already staged in serving Exchange inputs plus active timed deliveries. Call `active_order()` again to read fresh progress.

**Returns:** `BioOrder` snapshot or `None`

### self.matches_order(item_id, properties=None)
Check whether one exact item matches this Exchange's active Bio Order without moving it. Pass the `id` and `properties` from an [[ItemStack]]. `True` means that variant satisfies the order's glow, genes, Forged, Conditioned, or plain-sample requirement. Use it with Inventory, Storage Bin, or Warehouse `stacks()` before an exact `self.input.take(...)`. Returns `False` when there is no active order, the order is complete, or the item does not qualify.

**Returns:** Boolean

### self.deliver() `SELF ONLY`
Deliver one matching sample from `self.input` toward the active Bio Order (a short timed action). Progress is shared across every Bio Exchange serving the Bio Order. Connect the ports to Inventory at Nocturna Base, or to a same-outpost Storage Bin/Warehouse elsewhere, then use `take(...)` and `send(...)` to route samples.

**Returns:** ActionResult · Outcomes: `"ok"` / `"complete"` (this delivery finished the order) / `"no_input"` / `"output_full"` / `"no_active"` / `"busy"` (transient)

### self.lifetime_credits()
Total credits this Exchange has earned across every completed Bio Order.

**Returns:** Number

### self.input
The [[InputSlot]] for samples submitted to `deliver()`. Connect a store at this outpost. Inventory is available only at home; remote Exchanges use a local Storage Bin or Warehouse. Exact sample properties are preserved. Recover an unused sample with `self.input.eject(destination, item_id, count, properties, "exact")`; the destination must be local, and an active delivery keeps its material reserved.

### self.output
The [[OutputSlot]] that safely receives a surplus in-transit sample when another Exchange completes the shared order first. Drain it with `send(...)`; exact sample properties are preserved.

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].

## See also

- [[Bio Collector]] and [[Bio Lab]]: the earlier steps of the biology loop
- [[First Biology Loop]]: manual vs scripted logistics
