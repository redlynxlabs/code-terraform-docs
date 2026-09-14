---
tags:
  - component
  - logistics-orders
aliases:
  - drone_service_station_1
title: "Drone Service Station"
---

Charges electric drones in the field and recovers heli drones for queued refueling. Grid-tied, with an oil buffer for heli refuels and a recovery vehicle for rescues.

**Stats:** Power in variable (draws from grid) · Consumes Oil, buffer 100 t

**How to obtain:** The recipe unlocks when you complete **Spire, Drone Power Trial**. Requires the **Basic Drone Operations** research (Terraform Index 180,000). Fabricate a Drone Service Station Kit on a Fabricator: 2× Machine Frame, 1× Control Unit, 2× Circuit Panel, 1× Battery Cell, 1× Liquid Pipe Segment. Deploy from Inventory.

**Access:** `self` / `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Queue model

Electric charge and heli refuel jobs share **one FIFO and the same service bays**. An oil-blocked heli keeps its queue position but does not occupy a bay, so ready electric work may bypass it.

## Methods

### .outpost
The outpost where this building is deployed, as an [[OutpostRef]].

### .get_docked()
List of all drone ids (electric and heli) currently parked at this station. Read each drone via `get_component(id)`.

**Returns:** List of strings

### .charge(drone_id, target_level=1.0) `SELF ONLY`
Queue a parked **electric** drone to charge until its battery reaches `target_level` (greater than 0, at most 1). Example: `self.charge("drone_small_1", 0.8)`.

**Returns:** [[ActionResult]] · Outcomes: `"charging"` (success, job active) / `"queued"` (success) / `"target_reached"` / `"not_docked"` / `"station_offline"` (transient) / `"invalid"`

### .refuel(drone_id, target_level=1.0) `SELF ONLY`
Queue a parked **heli** drone to refuel until its oil tank reaches `target_level`. Draws oil from `self.oil_in`.

**Returns:** ActionResult · Outcomes: `"refueling"` / `"queued"` / `"target_reached"` / `"not_docked"` / `"station_offline"` (transient) / `"no_oil"` / `"invalid"`

### .dispatch_rescue(drone_name, target_level=1.0) `SELF ONLY`
Send the recovery vehicle to a field drone chosen by your script; there is **no hidden fuel threshold**. Electric drones are charged in the field to `target_level` and resume their route. Heli drones are carried home, then join the normal refueling queue. Scrambled drones are also carried home so docking can reset their electronics. Launch requires station power, but the mission can finish through a later outage.

**Returns:** ActionResult · Outcomes: `"ok"` / `"already_dispatched"` / `"station_offline"` (transient) / `"not_found"` / `"not_stranded"` / `"invalid"`

### .cancel_rescue() `SELF ONLY`
Abort the in-flight rescue. The drone is released at its current position (keeping any charge already delivered) and the service vehicle flies home.

**Returns:** ActionResult · Outcomes: `"ok"` / `"no_rescue"`

### .is_rescuing()
`True` while the service vehicle is on a rescue mission.

**Returns:** Boolean

### .get_rescue_target()
Mission target's display name while the service vehicle is outbound, servicing, carrying, or returning; empty string when idle.

**Returns:** String

### .stop(drone_id) `SELF ONLY`
Cancel one active or queued job (charge or refuel). The drone keeps any energy or oil already delivered.

**Returns:** ActionResult · Outcomes: `"ok"` / `"not_found"` / `"invalid"`

### .clear_queue() `SELF ONLY`
Clear every active or queued charge and refuel job. Docked drones stay parked and keep their current battery and oil.

**Returns:** [[CountResult]] (payload `.count`) · Outcomes: `"ok"` / `"no_op"`

### .get_active()
Drone ids currently occupying active service bays (charging or refueling). An oil-blocked heli is waiting, not active.

**Returns:** List of strings

### .get_queue()
The single FIFO list of queued drone ids across electric charging and heli refueling.

**Returns:** List of strings

### .status(drone_id)
Detailed status for one drone's service job. Electric: dict with `state`, `target_level`, `battery_wh`, `capacity_wh`, `rate_w`, `bay_index`, `queue_index`. Heli: `state`, `target_level`, `oil_tons`, `capacity_tons`, `rate_tons_per_hour`, `bay_index`, `queue_index`.

**Returns:** Dict

### .get_bay_count()
Number of simultaneous service bays.

**Returns:** Number

### .get_charge_rate(drone_id)
Wh/h currently being pushed into the named electric drone (0 if not in an active bay).

**Returns:** Number

### .get_refuel_rate(drone_id)
Oil t/h currently being pushed into the named heli drone (0 if not in an active bay or the station has no oil).

**Returns:** Number

### .oil_in
Oil [[FluidPort]] for heli refueling supply. `connect(...)` with an [[Oil Pump]] or oil tank's stable machine id or display name; a remote source also needs a completed conflict-free Liquid Pipe route.

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].

## See also

- [[Drones]]: system guide
- [[Drone]]: exposure clearing happens here (10/hour while docked and powered)
- [[Vehicle Charging Station]]: the ground-vehicle equivalent
