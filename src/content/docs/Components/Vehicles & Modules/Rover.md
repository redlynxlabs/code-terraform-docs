---
tags:
  - component
  - vehicles-modules
  - vehicle
aliases:
  - rover_1
title: "Rover"
---

Your starter expedition vehicle for driving, scanning, and mining. The bare chassis does nothing on its own; every ability comes from the modules mounted in its **three fixed slots** (Nav, Sonar, and Drill function modules only, never containers).

**Stats:** Energy 100 Wh (sealed, integrated) · Stockpile 10 units (mixed, integrated hold)

**How to obtain:** Requires the **Rover Chassis** research (Pressure 0.11). Buy from the Shop for 2,000 cr.

**Access:** `self` / `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Status and power

### .status()
Current physical activity, read fresh on each call. An idle Rover may still have a script running or a job assigned.

**Returns:** One of `"idle"` / `"moving"` / `"stranded"` / `"scanning"` / `"surveying"` / `"drilling"` / `"discarding"` / `"constructing"` / `"transferring"` / `"charging"` / `"queued"` / `"being_rescued"`

### .battery
Charge remaining: `level()` 0-1 fraction, `wh()` raw watt-hours, `capacity()` the 100 Wh max. **Below 0.1 you are close to getting stranded**; `charging_station.dispatch_rescue()` can fetch you, but it is slow. `holders()` returns an empty list (sealed rig). See [[Battery (Vehicle)]].

### .is_being_rescued()
`True` while a [[Vehicle Charging Station]] rescue drone is actively recovering this Rover. Pause movement or mining scripts even if the battery has started rising.

**Returns:** Boolean

### .rescue_status()
Rescue mission phase: `"none"`, `"outbound"`, `"charging"`, or `"returning"`.

**Returns:** String

## Capability modules

### .nav
Drives the Rover: `self.nav.set_target(x, y)` returns immediately and the Rover keeps driving while the script runs. Call `self.nav.brake()` before mining, scanning, surveying, or transferring cargo. The Rover stops and clears its route if the script stops, ends, or errors. Requires a mounted [[Nav Module]].

### .sonar
`self.sonar.scan()` finds nearby sites; `self.sonar.survey(site)` reveals details such as mineral hardness, purity, or vent output. The script pauses while the sonar works. Requires a mounted [[Sonar Module]].

### .drill
`self.drill.mine()` extracts one mineral unit from the surveyed site under the Rover. The vehicle must be stationary with enough cargo space and power. Requires a mounted [[Drill Module]].

## Cargo and freight

### .cargo
The integrated hold: `count()` total units across every item and property variant, `capacity()` is 10, `full()` is `True` at capacity (check before loading or drilling). `racks()` is empty because the hold is integrated. `self.cargo.discard(0)` permanently jettisons the **whole hold** and takes 1 hour when cargo is present. See [[Cargo]].

### .input
Loads cargo from Inventory at home, local storage at outposts, field-extractor stockpiles, or a nearby stopped cargo vehicle (both stopped, in service range). Requires Auto Feeders. See [[VehicleInputSlot]].

### .output
Unloads cargo to Inventory, a [[Storage Bin]], a [[Warehouse]], or a nearby stopped cargo vehicle (both stopped within ~2 m). Inventory freight is physically available only while parked at home. Requires Auto Feeders research. See [[OutputSlot]].

## Hardware service

### .modules()
List of [[MountSlot]], one per chassis slot. Each has `.index`, `.type` (which modules fit), `.module_id` (mounted id or `None`), `.internal_items` (empty on the Rover's function slots). Call before `mount(...)` to find an empty slot and verify the slot type accepts the module.

**Returns:** List of `MountSlot`

### .mount(slot_index, item_id) `SELF ONLY`
Request a hardware service order from Inventory: `self.mount(0, "nav_module")`. The Rover must be inside a founded outpost service area. Biological field modules are drone-only.

**Returns:** [[ActionResult]] · Outcomes: `"ok"` / `"not_at_service_point"` / `"locked"` / `"item_not_in_inventory"` / `"unknown_module"` / `"slot_not_compatible"` / `"slot_occupied"` / `"invalid_slot"` / `"capability_already_mounted"`

### .unmount(slot_index) `SELF ONLY`
Return the module at `slot_index` to Inventory. Requires a founded outpost service area; container modules must be empty.

**Returns:** ActionResult · Outcomes: `"ok"` / `"not_at_service_point"` / `"slot_empty"` / `"invalid_slot"` / `"holder_not_empty"` / `"inventory_full"`

### .install(...) / .uninstall(...) `SELF ONLY`
Present in the API but **not used on the Rover**: its fixed slots only accept Nav, Sonar, and Drill function modules, never containers. See [[Pioneer]] for the modular version. Calling them returns the same ActionResult outcome sets as on Pioneer (rejections such as `"not_container"`).

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].

## See also

- [[First Harvesting Route]]: your first Rover mining loop
- [[Pioneer]]: the 8-slot upgrade
