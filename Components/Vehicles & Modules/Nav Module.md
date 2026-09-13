---
tags:
  - component
  - vehicles-modules
  - module
aliases:
  - NavModule
  - nav
---
# Nav Module

Lets a vehicle drive through `self.nav`. A **basic** module provides 1.0× top speed. One **Sport Nav** on the same rig provides 2× top speed with 2.6× movement power draw (about 1.3× battery per meter at full throttle); further Sport Navs add 1.0× base top speed each and raise draw faster. Fits a `nav` or `universal` slot. **Keep the script running until arrival:** the vehicle stops and clears its route if the script stops, ends, or errors.

**Access:** `self.nav` (on a vehicle with the module mounted) · This page also covers the `NavModule` API type.

## Methods

### .set_target(x, y) `SELF ONLY`
Set target coordinates in meters from base. Returns immediately; the vehicle drives asynchronously over subsequent ticks while the script stays active. Poll `get_distance_to(x, y)` or `get_position()` in a wait loop with a tolerance, normally `while self.nav.get_distance_to(x, y) > 2:`, never exact zero, then call `brake()` before `drill.mine()` or another stationary action. For an at-building action, target that building's `BuildingRef.position`, not the outpost footprint anchor.

**Returns:** [[ActionResult]] · Outcomes: `"ok"` / `"not_mounted"` / `"invalid"` (argument outside accepted domain) / `"out_of_bounds"` (position outside valid world bounds) / `"busy"` (transient)

### .set_throttle(power) `SELF ONLY`
Set throttle (0.0-1.0, clamped). `0.5` cruises; `1.0` sprints but burns more battery per meter. Trade speed for range on long runs. **Stop, completion, error, and `brake()` reset throttle to 0.**

**Returns:** ActionResult · Outcomes: `"ok"` / `"not_mounted"`

### .throttle()
Current throttle setpoint (0.0-1.0): the value the script last wrote, or 0 after Stop, completion, error, or `brake()`. `throttle()` is your intent; `get_speed()` is what the vehicle actually moved last tick.

**Returns:** Number (0.0-1.0)

### .brake() `SELF ONLY`
Stop the vehicle immediately: throttle and speed go to 0 and the current target is cleared to the vehicle's current position. Use to abort a drive mid-route (e.g. re-pathing to a closer site). Cheaper battery-wise than driving to the destination.

**Returns:** ActionResult · Outcomes: `"ok"` / `"not_mounted"`

### .get_position()
Current position as a [[Position]] (`.x`, `.y` in meters from base). Read each loop iteration to detect arrival, plan the next hop, or log the path.

**Returns:** `Position {x, y}`

### .get_speed()
Speed in meters per hour as recorded on the **last drive tick**. 0 while idle or braked; up to the Nav's top speed at throttle 1.0. If it reads 0 when you expected drive, there is a power or target issue. A fresh `set_throttle(...)` won't show here until the next drive tick.

**Returns:** Number (m/h)

### .get_distance_to(x, y)
Euclidean distance in meters from the vehicle's current position to the given point. Use inside an intentional wait loop with an arrival tolerance such as `> 2`. Reaching the tolerance does not stop the vehicle; call `brake()` before a stationary at-site action. Pure straight-line distance, no obstacle accounting.

**Returns:** Number (meters)

### .speed_multiplier()
Current top-speed multiplier: 1.0 with Basic Nav (no Sport Nav), or 1 + mounted Sport Nav count on [[Pioneer]]. Use to plan trip times and scout builds. Speed only; range still depends on battery, throttle, cargo load, and movement draw.

**Returns:** Number

## See also

- [[Rover]] and [[Pioneer]]: the vehicles that mount this
- [[Long-Running Scripts]]: why the drive cancels when the script ends
