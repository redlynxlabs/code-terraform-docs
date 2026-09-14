---
tags:
  - type
  - world-sites
aliases:
  - Site
title: "Site"
---

**Abstract** base for every world site. **Returned by:** `SonarModule.scan().sites`, `SonarModule.survey().site`, journal and site-bound machine queries.

**Concrete subtypes:** [[MiningSite]] · [[ThermalVent]] · [[WaterWell]] · [[OilWell]] · [[ExoticDeposit]] · [[GeologicalAnomaly]]

## Shared members

| Member | Returns | Meaning |
| --- | --- | --- |
| `.id` | string | Unique site identifier |
| `.name` | string | Display name |
| `.x` / `.y` | number | Coordinates in meters from base |
| `.position()` | [[Position]] | Coordinate snapshot |
| `.kind()` | string | `"mineral"` / `"thermal"` / `"water"` / `"oil"` / `"exotic"` / `"inert"`; narrow with `if site.kind() == "mineral":` to surface subtype fields. `"inert"` = a resolved formation with no extractable signal |
| `.surveyed` | boolean | Survey flag **captured when the object was returned** (resolved inert contacts also report `True`); it never updates |

## Snapshot vs live

Mining-site fields are snapshots. Well, vent, and exotic-deposit **methods read live**, except on pre-survey sonar results: those keep their hidden values, so **obtain a new object after surveying**.
