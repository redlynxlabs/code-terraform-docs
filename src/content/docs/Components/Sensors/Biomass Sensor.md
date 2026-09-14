---
tags:
  - component
  - sensors
aliases:
  - biomass_sensor
title: "Biomass Sensor"
---

Reports cultivated biomass on the planet, in tons. Updates live as [[Biomass Mixer|Biomass Mixers]] produce. Available after the Biosphere research lands; no calibration step.

**Access:** `get_component("biomass_sensor")` · Like every component, exposes `.id` and `.name`.

## Methods

### .get_value()
Returns total biomass tonnage on the planet as a number. `0` before any Biomass Mixer has produced.

**Returns:** Number (tons of biomass)

## Example

```python
component = get_component("biomass_sensor")
value = component.get_value()
print(value)
```

## See also

- [[Biosphere Biomass Tier]]: the system this measures
