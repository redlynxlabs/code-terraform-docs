---
tags:
  - type
  - weather-sky
aliases:
  - Storm
title: "Storm"
---

One active storm snapshot. **Returned by:** `WeatherReport.active()`

| Member | Returns | Meaning |
| --- | --- | --- |
| `.id` | string | Stable storm id |
| `.x` / `.y` | number | Cell-center coordinates at the report's observation time |
| `.kind()` | string | `"dust"` (transmits a Raw Uranium aftermath message) or `"thunder"` (charges eligible Lightning Rods, may produce a Storm Glass message) |
| `.radius_m()` | number | Cell radius. **A heli drone on a straight route holds once inside the cell** (it does not route around); electric drones fly through |
| `.speed()` | number | Travel speed in m/h |
| `.heading()` | [dx, dy] | Unit travel direction |
| `.intensity()` | number | Observed strength 0-1 at report time |
| `.expires_in()` | number | Live hours before this observed cell dissipates |
| `.eta_to(x, y)` | number or `None` | Hours until the cell's edge reaches the point (0 = already inside; `None` = the track never gets there before dissipating) |

## See also

- [[Weather System]] · [[WeatherReport]]
