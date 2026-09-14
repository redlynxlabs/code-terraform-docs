---
tags:
  - component
  - power
aliases:
  - Charging Station
  - charging_station_1
title: "Vehicle Charging Station"
---

Grid-powered fleet charging: **Mk I provides 1 bay / 30 W, Mk II 2 bays / 120 W, and Mk III 4 bays / 240 W**. Idle bays pool onto one vehicle; several vehicles share the budget. A script queues charging or dispatches rescue.

**How to obtain:** Requires the **Vehicle Charging Station** research (Oxygen 9). Buy from the Shop for 1,200 cr. Tiers Mk II and Mk III.

**Access:** `self` / `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Methods

### .outpost
The outpost where this building is deployed, as an [[OutpostRef]].

**Returns:** `OutpostRef`

### .get_docked()
List of vehicle instance ids parked inside the station's local service pad plus its ~2 m margin, or inside the owning Outpost's common service area. Returns ids, not vehicles; dereference each via `get_component(id)`. Empty list means no vehicles docked. Call each iteration; the list can change between ticks as vehicles drive in or out.

**Returns:** List of vehicle instance ids

### .charge(vehicle_id, target_level=1.0) `SELF ONLY`
Queue a docked rover or Pioneer to charge until its battery reaches `target_level` (greater than 0 and at most 1, defaults to 1.0). The station decides whether it starts immediately or waits behind another vehicle: Mk I charges one vehicle at a time, Mk II two, Mk III four. The fewer vehicles active, the faster each charges (idle bays pool). Example: `self.charge("pioneer_1", 0.8)`.

**Returns:** [[ActionResult]]

| Status | Kind | Meaning |
| --- | --- | --- |
| `"charging"` | success | A charging job is active |
| `"queued"` | success | Added to the queue |
| `"target_reached"` | rejection | The vehicle is already at or above the requested level |
| `"not_docked"` | rejection | The vehicle is not docked at this station |
| `"station_offline"` | transient | The station is offline |
| `"invalid"` | rejection | Arguments outside the accepted domain |

### .stop(vehicle_id) `SELF ONLY`
Remove a vehicle from this station's charge queue. It does not move the vehicle or change its current battery.

**Returns:** ActionResult · Outcomes: `"ok"` / `"not_found"` / `"invalid"`

### .clear_queue() `SELF ONLY`
Clear every queued charge job on this station. Rescue-drone missions are separate and are not cancelled by this.

**Returns:** [[CountResult]] · Outcomes: `"ok"` (affected `.count` entries) / `"no_op"`

### .get_active()
List of vehicle ids currently occupying active charging bays. Mk I returns at most one id, Mk II two, Mk III four. These are the vehicles sharing the station's pooled budget this tick.

**Returns:** List of vehicle ids

### .get_queue()
List of vehicle ids in charge-queue order. The first `get_bay_count()` entries are the ones that can be active right now, assuming they are still docked and below their target.

**Returns:** List of queued vehicle ids in order

### .status(vehicle_id)
Detailed status for one vehicle: a dict with `state` (`"charging"`, `"queued"`, `"docked"`, `"target_reached"`, `"not_docked"`, `"station_offline"`, or `"missing"`), `target_level`, `battery_wh`, `capacity_wh`, `rate_w` (the pooled watts this vehicle is actually receiving; rises as fewer vehicles share the bays), `bay_index`, and `queue_index`. Use this for dashboards or queue managers.

**Returns:** Dict

### .tier()
Permanently installed Charging Station tier as an integer (1-3). Mk II raises bay count and bay rate; Mk III raises bay count again.

**Returns:** Integer (1-3)

### .get_bay_count()
Number of simultaneous vehicle charging bays. Mk I is 1, Mk II 2, Mk III 4.

**Returns:** Number

### .get_bay_rate()
Watts pushed by a single bay (30 W Mk I, 60 W Mk II/III). With bay pooling a lone vehicle draws every idle bay, so its actual rate is up to `get_bay_count() × get_bay_rate()`; read `get_charge_rate(id)` for what a specific vehicle is really getting. The station's total grid draw is `get_bay_count() × get_bay_rate()` whenever any vehicle is charging, plus rescue-drone draw if a rescue is out.

**Returns:** Watts per bay

### .get_charge_rate(vehicle_id)
Actual watts being pushed into the specified vehicle right now: the station's total budget split evenly across every active vehicle. A lone vehicle gets the whole budget (Mk III: 240 W); the more vehicles charging, the lower each one's share. Returns 0 if the vehicle is not occupying an active bay.

**Returns:** Number (W)

### .dispatch_rescue(vehicle_name, target_level=1.0) `SELF ONLY`
Send a field-service drone to a Rover or Pioneer by display name or id. `target_level` is a battery fraction greater than 0 and at most 1 and defaults to 1.0. Dispatch stops the target vehicle so the drone can reach it. The station must be powered at launch, but the drone can finish its mission through a later outage. If the target reaches a powered Charging Station first, the remaining request joins that station's queue. Only one rescue can run at a time; call `cancel_rescue()` to recall it.

**Returns:** ActionResult · Outcomes: `"ok"` / `"already_dispatched"` (this station already has an active rescue, or the target is already assigned to one) / `"station_offline"` (transient) / `"not_found"` / `"invalid"`

### .cancel_rescue() `SELF ONLY`
Recall this station's active field-service drone. If the drone was outbound or trickle-charging, the target vehicle is released immediately and keeps any charge already delivered while the drone returns to the station.

**Returns:** ActionResult · Outcomes: `"ok"` / `"not_found"`

### .is_rescuing()
`True` while a rescue drone is deployed (out, at the target, or returning). A recalled drone still counts as rescuing until it reaches the station, but the target vehicle is released as soon as `cancel_rescue()` succeeds. Use before `dispatch_rescue()` to avoid the `"already_dispatched"` rejection. Exactly one drone at a time; queue rescues manually if you need more.

**Returns:** Boolean

### .get_rescue_target()
Display name of the vehicle currently being rescued, or empty string if the drone is idle.

**Returns:** String

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].

## See also

- [[Batteries & Charging]]: the guide with charging strategy
- [[Drone Service Station]]: the drone equivalent
