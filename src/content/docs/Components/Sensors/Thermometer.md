---
tags:
  - component
  - sensors
aliases:
  - thermometer
title: "Thermometer"
---

Always-working surface temperature probe: no calibration needed. Reads the planet's current surface temperature in °C directly.

**Access:** `get_component("thermometer")` · Like every component, exposes `.id` and `.name`.

## Methods

### .get_value()
Current surface temperature in °C as a number. Safe to call from any script; no repair step needed. This is the display °C; for the heat-units progression metric that research thresholds compare against, read `get_component("atmosphere").get_heat()`.

**Returns:** Number (°C)

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): identical on every scriptable machine, see [[Script Commands]].

## Example

```python
component = get_component("thermometer")
value = component.get_value()
print(value)
```

## See also

- [[Atmosphere]]: `get_temperature()` and `get_heat()`
- [[Heat Generator]]: the machine that raises it
