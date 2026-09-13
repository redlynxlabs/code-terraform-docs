---
tags:
  - component
  - logistics-orders
aliases:
  - drone_depot_1
---
# Drone Depot

Logistics endpoint at an outpost: docking bays for drones plus a small transfer stockpile for cargo I/O. Grid-tied.

**Stats:** Power in -2 W (draws from grid) · Stockpile 50 units (mixed)

**How to obtain:** The recipe unlocks when you complete **Helios, Frame Order**. Requires the **Basic Drone Operations** research (Terraform Index 180,000). Fabricate a Drone Depot Kit on a Fabricator: 2× Machine Frame, 1× Control Unit, 2× Gas Pipe Segment, 2× Liquid Pipe Segment, and 3 t Water. Deploy from Inventory.

**Access:** `self` / `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Methods

### .outpost
The outpost where this building is deployed, as an [[OutpostRef]] (stable id, display name, biome, position, capacity, `buildings()` query). Read again for current values.

### .input
[[InputSlot]] for this station's **local** stockpile. Connect `"inventory"` or a machine or storage source at the same outpost, then `self.input.take(item_id, count)`. `self.input.flush()` discards the station stockpile. Stock at another Drone Depot is not visible here.

### .output
[[OutputSlot]] for this station's local stockpile. Connect `"inventory"` or a machine or storage target at the same outpost, then `self.output.send(item_id, count)`. Move cargo **between** outposts with a drone; stations do not share stock.

### .get_docked()
List of drone ids currently docked at this Depot, in stable id order. Read each drone's state with `get_component(id)`.

**Returns:** List of strings

### .bay_count()
Total bays at this station: 1 (basic) / 2 (medium) / 4 (large).

**Returns:** Number

### .bays_occupied()
Bays currently occupied by docked drones. When equal to `bay_count()`, arriving drones queue in airspace (`"waiting_bay"`).

**Returns:** Number

### .slots_used()
How many **distinct materials** the stockpile currently holds. One material is one slot no matter how many units are stored.

**Returns:** Number

### .slot_capacity()
How many distinct materials this depot can hold at once: 3 / 4 / 6 depending on tier. A depot is a **transfer proxy, not a warehouse**: when every slot is taken, a `cargo.unload()` of a new material moves 0 units and reports no free slot, even while units remain free. Drain a material out to release its slot.

**Returns:** Number

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].

## See also

- [[Drones]]: system guide (routes, docking, hot cargo)
- [[Drone]]: `go_to_station()` targets this
- [[Drone Service Station]]: charging and refueling instead of cargo
