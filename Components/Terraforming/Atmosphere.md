---
tags:
  - component
  - terraforming
aliases:
  - atmosphere
---
# Atmosphere

Planetary atmosphere: read gas composition, pressure, temperature, and the planet's heat-units progression metric (`get_heat()`). Oxygen and pressure reads require their sensors to be repaired.

**Access:** `get_component("atmosphere")` · Like every component, exposes `.id` and `.name`.

## Methods

### .get_co2()
Current CO2 level in parts per thousand (ppt). Oxygen generation consumes CO2 1:1, so this value falls as oxygen rises. CO2 is returned to the atmosphere by burning oil ([[Oil Generator]]), incinerating items ([[Waste Processor]]), and, at scale, by wildlife respiration (established colonies exhale CO2). A small volcanic outgassing trickle replenishes CO2 when reserves are low.

**Returns:** Number (ppt)

### .get_o2()
Current oxygen level in parts per thousand (ppt). Requires the [[Oxygen Sensor]] to be repaired.

**Returns:** Number (ppt)

### .get_n2()
Current nitrogen level in parts per thousand (ppt).

**Returns:** Number (ppt)

### .get_pressure()
Current atmospheric pressure in kPa. Requires the [[Pressure Sensor]] to be repaired.

**Returns:** Number (kPa)

### .get_temperature()
Current surface temperature in °C. This is a **display value**, a non-linear transform of the heat-units metric. For terraforming progress or heat cutoffs, use `get_heat()`, not this.

**Returns:** Number (°C)

### .get_heat()
Current accumulated **heat units**: the temperature pillar's progression metric, the exact value temperature research and phase thresholds compare against (the Research page shows the current targets). Gate heat cutoffs on this, the way `get_o2()` / `get_pressure()` work for those pillars. Unlike `get_temperature()` (surface °C, a non-linear display value), a difference in heat units IS terraforming progress. Starts at 0.

**Returns:** Number (heat units)

## See also

- [[Oxygen Generator]] · [[Pressure Generator]] · [[Heat Generator]]: the machines that move these numbers
- [[Power & Terraforming Machines]]: the carbon cycle
