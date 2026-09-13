---
tags:
  - component
  - vehicles-modules
  - module
aliases:
  - SonarModule
  - sonar
---
# Sonar Module

Finds and surveys world sites through `self.sonar`. A scan checks the area around the vehicle; **driving alone does not scan**. Use `get_component("nocturna").points_of_interest()` to find unscanned "?" markers, travel near one, then call `scan()` and `survey(site)`. Research unlocks thermal vents, wells, and exotic deposits. Results are saved in the [[Journal]]. Local Harvester sectors, biological sites, and radiation fields use different scanners.

**Access:** `self.sonar` (on a vehicle with the module mounted) · This page also covers the `SonarModule` API type.

## Variants

| Variant | Range | Hardness limit | Survey tier |
| --- | --- | --- | --- |
| Basic | 50 m | 1 | `"basic"` |
| Wide | 180 m | 3 | `"wide"` |
| Deep | 280 m | 4 | `"deep"` (required for oil-well discovery) |

## Methods

All methods raise `ReferenceError` on a stale captured module reference (module no longer mounted); read `self.sonar` again after mounting a sonar.

### .scan() `SELF ONLY`
Sweep for compatible [[Site]]s within range of the vehicle's current position. Contact types include [[MiningSite]], [[ThermalVent]], [[WaterWell]], [[OilWell]], [[ExoticDeposit]], and [[GeologicalAnomaly]]. A completed sweep updates the Journal with newly classified contacts.

**Returns:** [[SonarScanResult]] (payload `.sites`)

| Status | Kind | Meaning |
| --- | --- | --- |
| `"ok"` | success | Sweep completed; `result.sites` has every compatible contact (empty list = none in range) |
| `"too_hard"` | partial | Sweep detected a nearby unresolved contact above the mounted sonar's hardness limit |
| `"tier_too_low"` | partial | Detected a contact this sonar tier cannot classify |
| `"research_required"` | partial | Detected a contact whose classification research is locked |
| `"wrong_scanner"` | partial | Detected a contact that vehicle sonar cannot classify |
| `"busy"` | transient | Another field action occupies the vehicle |
| `"no_power"` | rejection | Not enough battery for a sweep |

### .survey(site) `SELF ONLY`
Reveal the details available for a productive Site. Pass a site id string, a `Site` from `scan().sites`, or a dictionary/class instance with a string `id` field. A repeat survey is free and instant unless a better sonar tier can reveal more. Inert `GeologicalAnomaly` contacts are already resolved by scanning.

**Returns:** [[SurveyResult]] (payload `.site`) · Outcomes: `"ok"` / `"busy"` (transient) / `"not_discovered"` / `"research_required"` / `"tier_too_low"` / `"out_of_range"` / `"too_hard"` / `"no_power"` · **Raises:** `ValueError` for an empty site argument

### .range()
Current sonar range in meters: 50 basic, 180 Wide, 280 Deep.

**Returns:** Number (meters)

### .hardness_limit()
Maximum mineral hardness this sonar can identify: 1 basic, 3 Wide, 4 Deep.

**Returns:** Number

### .tier()
Survey-depth tier granted by this sonar: `"basic"` / `"wide"` / `"deep"`. Controls how much of a thermal vent or exotic deposit `survey()` reveals; `"deep"` is also required for oil-well discovery.

**Returns:** String

## See also

- [[Nocturna]]: `points_of_interest()` for "?" markers
- [[First Harvesting Route]]: scan and survey in practice
- [[Scanner]]: the base-station alternative
