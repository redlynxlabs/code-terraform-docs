---
tags:
  - component
  - vehicles-modules
  - vehicle
aliases:
  - pioneer_1
title: "Pioneer"
---

A modular long-range vehicle for driving, scanning, mining, and building in the field. The bare chassis does nothing; everything comes from the modules, batteries, and cargo you mount in its **eight universal slots**.

**Stats:** Stockpile 0 units (mixed; capacity comes from Cargo Racks)

**How to obtain:** Requires the **Pioneer Chassis** research (Terraform Index 100,000). Buy from the Shop for 5,000 cr.

**Access:** `self` / `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Status and power

### .status()
Current physical activity, read fresh on each call (including through `get_component(...)`). An idle Pioneer may still have a script running or a job assigned.

**Returns:** One of `"idle"` / `"moving"` / `"stranded"` / `"scanning"` / `"surveying"` / `"drilling"` / `"discarding"` / `"constructing"` / `"transferring"` / `"charging"` / `"queued"` / `"being_rescued"`

### .battery
Aggregated battery pool across **every Portable Battery in every mounted Battery Holder**. `level()` returns a 0-1 fraction, `wh()` raw watt-hours, `capacity()` the summed max. For per-holder detail, `holders()` returns each Holder with its `.batteries` list; the aggregate view covers most scripts. **With zero Portable Batteries installed, the Pioneer can't move.** See [[Battery (Vehicle)]].

### .is_being_rescued()
`True` while a [[Vehicle Charging Station]] rescue drone is actively recovering this Pioneer. Pause movement, mining, or construction scripts even if the battery has started rising above zero.

**Returns:** Boolean

### .rescue_status()
Rescue mission phase: `"none"`, `"outbound"`, `"charging"`, or `"returning"` (`"returning"` means the rescue drone is going home and the Pioneer is free again).

**Returns:** String

## Capability modules

### .nav
Drives the Pioneer: `self.nav.set_target(x, y)` returns immediately and the Pioneer keeps driving while the script runs. A distance tolerance means close enough, not stopped, so call `self.nav.brake()` before mining, constructing, or transferring cargo. The Pioneer stops and clears its route if the script stops, ends, or errors. Requires a [[Nav Module]] in a universal slot.

### .sonar
Finds useful sites: `self.sonar.scan()` then `self.sonar.survey(site)` to reveal details such as mineral hardness, purity, or vent output. Scanning and new surveys take time and use battery; the script pauses while the sonar works. Requires a mounted [[Sonar Module]].

### .drill
Extracts one mineral unit from the surveyed site under the Pioneer with `self.drill.mine()`. The vehicle must be stationary with enough cargo space and power. Requires a mounted [[Drill Module]].

### .constructor
Builds or removes Planet Map blueprints from Plan Mode or scripts. Read pending work from `get_component("construction_blueprint")`, drive near `construction.position`, then call `self.constructor.execute(construction.id)`. Building consumes kits or segments from cargo; **removal returns reclaimed parts to cargo, so leave room**. Requires a mounted [[Constructor Module]].

## Cargo and freight

### .cargo
Combines the Portable Bins in the Pioneer's Cargo Racks. `count()`, `capacity()`, `full()` for totals; `racks()` inspects the physical layout. Each bin holds one item type; `take()` and `send()` handle bins independently. `compact()` consolidates matching cargo into fewer bins without changing `send()` order. `discard(rack_index)` permanently empties one rack and takes 1 hour when cargo is present (an empty rack finishes immediately). See [[Cargo]].

### .input
Loads cargo from Inventory at home, local storage at outposts, field-extractor stockpiles, or a nearby stopped cargo vehicle. Field and vehicle transfers require service range; both vehicles must be stopped. Never destroys cargo (use `self.cargo.discard(rack_index)` to jettison a rack). Requires Auto Feeders. See [[VehicleInputSlot]].

### .output
Unloads cargo to Inventory, a [[Storage Bin]], a [[Warehouse]], or a nearby stopped cargo vehicle. Inventory freight is physically available only while parked at home; remote outposts use their local stores. Vehicle-to-vehicle handoffs need both vehicles stopped within ~2 m. Requires Auto Feeders research. See [[OutputSlot]].

## Hardware service

All four service calls require the Pioneer to be **inside a founded outpost service area**. This dedicated-hardware exception does not make Inventory a freight endpoint there.

### .modules()
Inspect every slot on the chassis: a list of eight [[MountSlot]] entries. Each has `.index` (pass to mount/unmount), `.type` (always `"universal"` on Pioneer), `.module_id` (mounted id or `None`), `.internal_count` (non-zero for Battery Holders / Cargo Racks), `.internal_items` (installed portable item ids). Call before `mount(...)` or `install(...)` to find an empty target.

**Returns:** List of `MountSlot`

### .mount(slot_index, item_id) `SELF ONLY`
Request a hardware service order from Inventory into whole-number `slot_index`: `self.mount(0, "nav_module")`. Biological field modules are drone-only.

**Returns:** [[ActionResult]] · Outcomes: `"ok"` / `"not_at_service_point"` / `"locked"` / `"item_not_in_inventory"` / `"unknown_module"` / `"slot_not_compatible"` / `"slot_occupied"` / `"invalid_slot"` / `"capability_already_mounted"`

### .unmount(slot_index) `SELF ONLY`
Return the module at `slot_index` to Inventory: `self.unmount(0)`. Empty every internal bay before removing a holder or rack.

**Returns:** ActionResult · Outcomes: `"ok"` / `"not_at_service_point"` / `"slot_empty"` / `"invalid_slot"` / `"holder_not_empty"` / `"inventory_full"`

### .install(slot_index, internal_index, item_id) `SELF ONLY`
Install a Portable Battery or empty Portable Storage Bin from Inventory into a container's internal slot: `self.install(0, 1, "portable_battery")` uses bay 1 of the Battery Holder at chassis slot 0; `self.install(4, 0, "portable_bin")` uses bay 0 of the Cargo Rack at slot 4.

**Returns:** ActionResult · Outcomes: `"ok"` / `"not_at_service_point"` / `"locked"` / `"invalid_slot"` / `"invalid_internal_slot"` / `"slot_empty"` / `"not_container"` / `"item_not_accepted"` / `"internal_slot_occupied"` / `"item_not_in_inventory"`

### .uninstall(slot_index, internal_index) `SELF ONLY`
Return the portable item in a container's internal slot to Inventory: `self.uninstall(0, 1)`. Portable Storage Bins must be empty.

**Returns:** ActionResult · Outcomes: `"ok"` / `"not_at_service_point"` / `"invalid_slot"` / `"invalid_internal_slot"` / `"slot_empty"` / `"not_container"` / `"internal_slot_empty"` / `"inventory_full"` / `"container_not_empty"`

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].

## See also

- [[First Pioneer]]: tutorial for your first modular build
- [[Rover]]: the fixed-slot starter vehicle
- [[First Outpost]]: founding the service areas that mount/install require
