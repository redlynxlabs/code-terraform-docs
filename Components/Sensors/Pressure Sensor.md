---
tags:
  - component
  - sensors
aliases:
  - pressure_sensor
---
# Pressure Sensor

An atmospheric pressure probe that landed broken. Its readings come out scrambled until a script stabilizes the repair signal, after which it reads pressure directly.

**Access:** `get_component("pressure_sensor")` · Like every component, exposes `.id` and `.name`.

## Methods

### .get_value()
Current unstable repair reading as an integer. If the value is odd, add 1; if it is even, use it unchanged. After repair, this method returns real atmospheric pressure in kPa.

**Returns:** Number (unstable repair reading; kPa after repair)

### .stabilize(value)
Start the black-box stabilization suite with the corrected even reading: `result = self.stabilize(corrected_value)`. The suite then checks the whole script against several readings. A fully correct suite repairs the sensor; failed test cases remain visible in the console.

**Returns:** [[ActionResult]]

| Status | Kind | Meaning |
| --- | --- | --- |
| `"started"` | success | The operation started |
| `"already_repaired"` | success | The target is already repaired |
| `"no_source"` | rejection | No source is configured or available |
| `"already_testing"` | transient | The requested test is already running |

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): identical on every scriptable machine, see [[Script Commands]].

## Example

```python
component = get_component("pressure_sensor")
value = component.get_value()
print(value)
```

## See also

- [[Atmosphere]]: `get_pressure()` requires this sensor repaired
- [[First Steps]]: repairing Pressure opens Harvesting and Contracts
