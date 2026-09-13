---
tags:
  - type
  - world-sites
aliases:
  - ThermalVent
---
# ThermalVent

Extends [[Site]] (shared members and the pre-survey snapshot rule there). Any Site-returning API where `kind() == "thermal"`, e.g. `thermal_cap.vent()`.

Detail is gated by survey tier: **basic reveals phase, wide adds steam rates, deep adds cycle timing.**

| Method | Returns | Needs | Meaning |
| --- | --- | --- | --- |
| `.survey_level()` | string or `None` | any survey | Highest tier achieved: `"basic"` / `"wide"` / `"deep"`. Reads live; a deeper re-survey upgrades held objects |
| `.current_phase()` | string or `None` | basic | `"active"` or `"dormant"`, live |
| `.base_steam_rate()` | number or `None` | wide | Peak steam t/h during active phase |
| `.current_steam_rate()` | number or `None` | wide | Steam t/h right now (0 dormant), live |
| `.cycle_active_minutes()` / `.cycle_dormant_minutes()` | number or `None` | deep | Phase durations |
| `.next_phase_in()` | number or `None` | deep | Game-minutes until the next flip; poll to act before dormancy |
| `.has_cap()` / `.cap_id()` | boolean / string | live | Whether a [[Thermal Cap]] is deployed, and its machine id (empty when none) |

## See also

- [[Thermal Vents]]: the system guide
