---
tags:
  - component
  - vehicles-modules
aliases:
  - drone_1
---
# Drone

Small aerial cargo drone: 1 thruster plus 2 modules.

**How to obtain:** The recipe unlocks when you complete Helios, Rotor Run. Requires the **Basic Drone Operations** research (Terraform Index 180,000). Fabricate a Drone (Small) on a Fabricator: 1× Rare Earth Core, 1× Titanium Ingot, 1× Control Unit, 2 t Water. Deploy from Inventory.

**Access:** `self` / `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Movement

### .go_to_station(name) `SELF ONLY`
Queue a route to the named [[Drone Depot]] or [[Drone Service Station]] and **return immediately** without waiting for docking. An accepted powered route reports `"traveling"` immediately; position and docking advance after simulation advances. Stop, completion, or error cancels the flight and clears the route. Compare `current_station()` with the destination's stable id to confirm arrival. Moving between drone buildings inside the same outpost is a local transfer and costs no flight fuel. Drone Service Stations accept parked arrivals even while unpowered. A full Drone Depot keeps the drone undocked in `"waiting_bay"` until a physical bay opens.

**Returns:** [[ActionResult]] · Outcomes: `"ok"` / `"station_not_found"` / `"out_of_range"` / `"busy"` (transient) / `"scrambled"` (transient)

### .undock() `SELF ONLY`
Release the station berth without flying anywhere. The drone keeps its exact world position, cargo, modules, fuel, and exposure, clears any dormant route, resets throttle to 0, and becomes idle. An active rescue, or an active or queued Drone Service Station charge/refuel job, retains control until that station-owned work ends. Use `go_to_station(...)` when the drone should claim a berth again.

**Returns:** ActionResult · Outcomes: `"ok"` / `"not_docked"` / `"busy"` (transient)

### .go_to_drill(name) `SELF ONLY`
Fly to a named field [[Mining Drill]] for ore pickup. Hauling needs no field module. The drone flies in a straight line and hovers on arrival. Compare `current_drill()` with the destination's stable id to confirm that cargo loading is available. Stopping or completing the script, hitting an error, or calling `go_to_station()` cancels this route.

**Returns:** ActionResult · Outcomes: `"ok"` / `"drill_not_found"` / `"out_of_range"` / `"busy"` / `"scrambled"`

### .go_to(x, y) `SELF ONLY`
Fly to any world coordinate as a **base drone capability**; no field module is required. The drone flies in a straight line and hovers on arrival. For Weather, pass the exact x and y assembled from checksum-valid storm packets.

**Returns:** ActionResult · Outcomes: `"ok"` / `"invalid_target"` / `"out_of_bounds"` / `"out_of_range"` / `"busy"` / `"scrambled"`

### .current_station()
Stable station id where the drone is physically docked. Returns an empty string while flying to coordinates, traveling between stations, or waiting outside a full Drone Depot. Use equality with the destination id as the authoritative station-arrival check, even when `go_to_station()` was called with a display name.

**Returns:** String

### .current_drill()
Stable Mining Drill id where the drone can currently load cargo, or an empty string when no Drill is available. The drone must be within the Drill's loading area with no active route; merely passing over the Drill or holding a zero-throttle route does not count.

**Returns:** String

### .position()
World coordinates (`.x`, `.y`), interpolated each tick during transit, snapped to station coords on dock.

**Returns:** [[Position]]

### .get_distance_to(x, y)
Straight-line distance in meters from the drone's current position to the given world coordinate. It measures geometry only and does not select a destination or account for available fuel.

**Returns:** Number (meters)

## Power and fuel

### .battery
Reads power on **electric** drones: `level()` (Wh), `capacity()`, `percent()` (0-1). These calls raise `ReferenceError` on a heli drone. In mixed fleets, check `DroneRef.engine` from `fleet.drones()` first. See [[DroneBattery]].

### .oil_tank
Reads fuel on **heli** drones: `level()` (tons), `capacity()`, `percent()`. These calls raise `ReferenceError` on an electric drone. See [[DroneOilTank]].

### .range_remaining()
Estimated flight distance in meters at the current energy and throttle. Electric burn is 5 Wh/h at full throttle; Heli burn is 5 t/h Oil. Both scale with throttle squared, so slower routes stretch range.

**Returns:** Number (meters)

### .throttle()
Current throttle (0-1). Reads 0 after Stop, completion, or error.

**Returns:** Number (0-1)

### .set_throttle(rate) `SELF ONLY`
Set throttle (0-1). At full throttle, electric drones fly **300 m/h** using 5 Wh/h; Heli drones fly **900 m/h** using 5 t/h Oil. Lower throttle reduces burn quadratically. Stop, completion, or error resets throttle to 0.

**Returns:** ActionResult · Outcomes: `"ok"`

## Cargo and field work

### .cargo
Manages mounted Cargo Pods and the Bio Extractor's sealed chamber. Each pod holds one item type and unlatches when empty; the extractor chamber holds one life-form type and fills first. Use `count()`, `contents()`, `capacity()`, and `space_for(item_id)` to plan loads. `load()` and `unload()` work while docked at a Drone Depot; `load()` also works at a field Mining Drill or Lead Cask. Exact item properties are preserved. See [[DroneCargo]].

### .bio_scanner
[[PortableBioScanner]]. `scan()` requires the module, a completed route, and working electronics, and exposes the completed biological reading through `BioScanResult.scan`.

### .bio_extractor
[[PortableBioExtractor]]. `extract()` requires a hovering, non-scrambled drone and uses its integrated 25 t one-life-form chamber plus any Cargo Pods.

### .collect() `SELF ONLY`
Collect one weather aftermath batch at the drone's **exact** current coordinate. A successful batch transfers at most 5 Storm Glass or Raw Uranium. Raw Uranium collection adds 40 exposure without Shield Plating and 0 with it; the batch is retained even if it reaches the scramble threshold.

**Returns:** [[CollectResult]] (payload `.item_id`, `.collected`) · Outcomes: `"ok"` / `"moving"` (transient) / `"busy"` (transient, biological extraction) / `"nothing_here"` / `"no_cargo_space"` / `"scrambled"` (transient)

## Exposure

### .exposure()
Current extraction exposure, from 0 to `exposure_capacity()`. It changes only when collecting Raw Uranium or receiving Service Station care; simply flying across a hidden aftermath is inert. A working drone docked at a powered [[Drone Service Station]] clears **10 per hour**. At capacity the drone is scrambled and requires Service Station rescue.

**Returns:** Number

### .exposure_capacity()
The **100** exposure scramble threshold. An unplated drone can collect two 5-unit batches safely; the third batch is retained and then scrambles it.

**Returns:** Number

### .is_plated()
`True` with Shield Plating mounted. Plating reduces Raw Uranium extraction exposure to zero (and is required for hot-cargo loads from Lead Casks), halves each Cargo Pod's capacity, and raises fuel burn 1.5× because lead is heavy.

**Returns:** Boolean

## Hardware service

### .couple(slot_index, module_id) `SELF ONLY`
Request a hardware service order from Inventory into an explicit whole-number slot: `self.couple(0, "electric_thruster")` for the thruster slot, or `self.couple(1, "battery_pack")` for a module slot. The drone must be docked at an operational Drone Depot. This dedicated-hardware exception does not expose ordinary Inventory freight at that outpost.

**Returns:** ActionResult · Outcomes: `"ok"` / `"not_at_station"` / `"item_not_in_inventory"` / `"unknown_module"` / `"slot_not_compatible"` / `"slot_occupied"` / `"invalid_slot"` / `"locked"` / `"wrong_engine_for_module"` / `"cargo_capacity_exceeded"`

### .uncouple(slot_index) `SELF ONLY`
Request a hardware service order that returns the module in an explicit slot to Inventory: `self.uncouple(1)`. The drone must be docked at an operational Drone Depot. Cargo Pods must be empty before removal, and Shield Plating cannot be removed while Raw Uranium or Fuel Rod cargo remains aboard. Fuel-bearing modules preserve their contents.

**Returns:** ActionResult · Outcomes: `"ok"` / `"invalid_slot"` / `"module_not_mounted"` / `"not_at_station"` / `"cargo_capacity_exceeded"` / `"container_not_empty"` / `"hot_cargo_requires_plating"` / `"inventory_full"`

## Status

### .status()
Current operational activity for progress and blocker handling, **not an arrival test**. `"idle"` can mean docked, hovering at a field coordinate, or holding a queued route at zero throttle; charging or refueling can begin immediately after docking. `"waiting_bay"` means the drone reached a full Depot but is not docked, `"holding_weather"` is a temporary heli hold, and stalled or scrambled states need intervention. Use `current_station()` or `current_drill()` to confirm arrival.

**Returns:** One of `"idle"` / `"traveling"` / `"charging"` / `"refueling"` / `"waiting_service"` / `"waiting_oil"` / `"waiting_bay"` / `"being_rescued"` / `"holding_weather"` / `"scrambled"` / `"stalled_no_battery"` / `"stalled_no_oil"` / `"stalled_no_route"`

### .is_being_rescued()
`True` while a Drone Service Station is actively servicing or carrying this drone. Use this to pause route scripts while the rescue vehicle has control.

**Returns:** Boolean

### .rescue_status()
Current recovery mission phase: `"none"`, `"outbound"`, `"charging"`, `"carrying"`, or `"returning"`. `"returning"` means the recovery vehicle is heading home and the drone is no longer under rescue control.

**Returns:** String

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].

## See also

- [[Drones]]: the system guide (deployment, thrusters, hot cargo)
- [[Weather System]]: aftermath collection
- [[Biosphere Biomass Tier]]: bio scanning and extraction routes
