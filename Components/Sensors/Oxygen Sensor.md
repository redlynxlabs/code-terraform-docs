---
tags:
  - component
  - sensors
aliases:
  - oxygen_sensor
---
# Oxygen Sensor

An atmospheric oxygen probe that landed broken. It reports a raw voltage until a script works out the calibration and repairs it, after which it reads oxygen directly.

**Access:** `get_component("oxygen_sensor")` · Like every component, exposes `.id` and `.name`.

## Methods

### .get_value()
Before repair, read raw voltage from the uncalibrated probe as a small decimal value. This is not yet a ppt reading; compare it with a known reference to calculate the calibration factor. After repair, read the current atmospheric oxygen level in ppt directly.

**Returns:** Number (raw voltage before repair; ppt after repair)

### .calibrate(value)
Start the black-box calibration suite with the processed value: `result = self.calibrate(raw_value * factor)`. The suite then checks the whole script against several readings. A fully correct suite repairs the sensor; failed test cases remain visible in the console.

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
component = get_component("oxygen_sensor")
value = component.get_value()
print(value)
```

## See also

- [[Atmosphere]]: `get_o2()` requires this sensor repaired
- [[First Steps]]: repairing the sensors is one of the first tasks
