---
tags:
  - component
  - power
aliases:
  - solar_1
---
# Solar Generator

Turns sunlight into up to **50 W** for the grid when a script tracks the Sun. Poor tilt reduces daytime output, and night produces 0 W.

**Stats:** Power out +50 W · Buy from the Shop for 500 cr.

**Access:** `self` / `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Methods

### .outpost
The outpost where this building is deployed, as an [[OutpostRef]].

**Returns:** `OutpostRef`

### .set_tilt(degrees) `SELF ONLY`
Set the panel tilt angle in degrees. Range is 0° (flat) to 90° (vertical); values outside are clamped. A well-tuned tracker holds output near its maximum throughout the day; a fixed tilt wastes a large fraction.

**Returns:** [[ActionResult]] · Outcomes: `"ok"`

### .tilt()
Current panel tilt setpoint in degrees (0-90). Returns the value the script last wrote via `self.set_tilt(...)`, or the default rest angle for an idle panel. Use to verify your sweep loop or to step a tilt search against the previous value.

**Returns:** Number (degrees, 0-90)

### .get_output()
Current power output in watts for this specific generator. Returns 0 if powered off. Computed live from sun elevation vs panel tilt: use it to verify the tracker is holding peak (compare current output against the panel's rated max).

**Returns:** Number (watts)

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].

## Tracker pattern

The classic first script: read the sun with [[Clock]] `get_elevation()`, set tilt so the two angles sum to 90°, verify with `get_output()`.

## See also

- [[Power & Terraforming Machines]]: power comes first
- [[Battery]]: where surplus power goes
