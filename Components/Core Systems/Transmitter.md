---
tags:
  - component
  - core-systems
aliases:
  - transmitter
---
# Transmitter

Sends data to other planets. Use it to report sensor readings to Earth or submit contract answers. Call `connect()` to choose a planet, then `transmit(key, value)` to send data; `disconnect()` clears the connection. A connection lasts only for the current script run, so each transmitting script must connect first. Save `get_component("transmitter")` to a variable and reuse it for both calls.

**Access:** `get_component("transmitter")` · Like every component, exposes `.id` and `.name`.

## Methods

### .list_planets()
Every available transmission destination as a list of [[Planet]] objects (each with `.id`, `.name`, etc.). Call once at script start to see what is available; pass a returned `.id` to `connect(id)`.

**Returns:** List of Planet objects

### .connect(planet)
Open a channel to the planet with the given id: `result = transmitter.connect("earth")`. The id must be lowercase (from `list_planets()`). Read `transmitter.get_info().target` after success. Connection lasts only for the current script run; if your script restarts, `connect()` again before `transmit()`.

**Returns:** [[ActionResult]] · Outcomes: `"ok"` / `"not_found"`

### .disconnect()
Close the current script-run channel. This does not affect contracts or any other script; it only clears this Transmitter object's active target so later `transmit()` calls must `connect()` again.

**Returns:** ActionResult · Outcomes: `"ok"`

### .get_info()
Current connection status. Returns an object with `.connected` (boolean) and `.target` (connected planet id, or `"none"`). Use as a guard before `transmit()`.

**Returns:** [[TransmitterInfo]] `{ connected, target }`

### .transmit(key, value)
Send a named value to the connected planet with `transmitter.transmit(key, value)`. Opening sensor telemetry is unavailable until the power and sensor onboarding steps are complete and the uplink step is active. For sensor readings, use the name requested by Earth, such as `"current_temperature"`. For contract answers, use `self.contract.id`. The data arrives in the same tick.

**Returns:** [[ActionResult]]

| Status | Kind | Meaning |
| --- | --- | --- |
| `"correct"` | success | The submitted value is correct |
| `"incorrect"` | rejection | The submitted value is incorrect |
| `"already_completed_correct"` | success | The contract is already completed; the value submitted now is correct |
| `"already_completed_incorrect"` | rejection | The contract is already completed; the value submitted now is incorrect |
| `"accepted"` | success | The submitted value was accepted |
| `"rejected"` | rejection | The submitted value or request was rejected |
| `"not_connected"` | rejection | The component has no active connection |
| `"wrong_planet"` | rejection | The operation targets a different planet |
| `"wrong_contract"` | rejection | The supplied contract is not active for this operation |
| `"locked"` | rejection | The required feature, recipe, or operation is locked |
| `"unknown_contract"` | rejection | The supplied contract identifier does not exist |
| `"key_is_planet"` | rejection | The supplied key names a planet rather than a telemetry or contract key |
| `"unknown_key"` | rejection | The supplied telemetry or contract key does not exist |

## See also

- [[Contracts]]: the transmit workflow in context
