---
tags:
  - guide
  - production-logistics
---
# Input & Output

Machines process items, while I/O ports decide where those items come from and where they go.

## Connections

A routed machine port connects to the display name/id of a compatible machine or store **at the same outpost**. `"inventory"` is a freight endpoint only at home.

```python
self.input.connect("Raw Materials")
self.output.connect("inventory")
self.input.take("iron_ore", 10)
self.output.send("iron_ingot", self.output.count())
```

Connections persist. Transfers require **Auto Feeders**, take time proportional to units moved, and are **transactional**: rejected or blocked transfers leave the exact source items unchanged. **Fast Feeders** unlocks at 400,000 Terraform Points and halves the duration of newly started timed item transfers throughout the logistics system. Transfers already in progress keep the duration they started with.

A [[Plant Terraformer]]'s receiving feeder handles 16 items per handling step at Mk I and 80 at Mk II. The same capacity applies whether its input pulls from a source or another machine or store sends to it. Both physical endpoints remain occupied for the resulting transfer duration.

Field [[Mining Drill|Mining Drills]] and [[Water Pump|Water Pumps]] use a pickup-only [[PickupOutputSlot]] instead. It exposes `count()`, `capacity()`, and `stacks()` but no connection or send methods. A physically present carrier initiates the transfer through its own cargo API.

## Property-bearing items

The canonical value is an [[ItemStack]]: `.id`, whole-number `.count`, and opaque `.properties`. Properties belong to the item and survive Inventory, bins, warehouses, ports, and cargo. Equal ids merge only when their properties are deeply equal.

`stacks()` returns property-distinct snapshots:

```python
for stack in self.output.stacks():
  print(stack.id, stack.count, stack.properties)
```

Use the optional property dict on `take` or `send` to select stacks containing that subset:

```python
self.output.send(fragment_id, 1, {"forged": True})
```

The fourth argument controls matching. `"exact"` selects one full property identity, including `None` for ordinary propertyless items. `"subset"` selects dict subsets, and `"any"` ignores properties. When omitted, a dict uses subset matching and `None` uses any-variant matching.

```python
self.output.send(fragment_id, 1, stack.properties, "exact")
self.output.send(fragment_id, 1, None, "exact")
```

Without a selector, transfers are deterministic. Most sources take matching stacks in storage order. A Warehouse keeps property-variant groups in storage order, but within the selected exact variant it drains the smallest physical stack first so partially filled duplicate slots are released sooner. Different Warehouse property variants still occupy different physical slots. A Storage Bin latches to one item id but may hold several property-distinct stacks of that id.

## Port API

- `connect(name)` / `disconnect()` / `connected_to()` on routed ports
- `take(item_id, count)` on inputs, with optional property and matching arguments
- `send(item_id, count)` on routed outputs, with optional property and matching arguments
- `count()` / `capacity()`
- `stacks()`

Manual UI actions are separate from port automation. At Nocturna Base, manual Biology uses Inventory. At another outpost, its Manual Stockroom selector binds every card to one local Warehouse. Habitat revival reagents use their own local staging. Port automation follows freight locality like every other machine.

Vehicle handoffs additionally require both vehicles stopped within about 2 m. Inventory freight requires a vehicle at home; stationary-store transfers require it inside the target service area. If a target rejects a transfer, its result names the reason and nothing is lost.

## See also

- [[InputSlot]] · [[OutputSlot]] · [[VehicleInputSlot]] · [[PickupOutputSlot]]: full port type references
- [[TransferResult]]: what `take()` and `send()` return
- [[FluidPort]]: the continuous-flow equivalent
