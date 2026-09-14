---
tags:
  - type
  - fleet-vehicles
  - result
aliases:
  - SurveyResult
title: "SurveyResult"
---

Result of a site survey. **Returned by:** `SonarModule.survey()`

| Field | Returns | Meaning |
| --- | --- | --- |
| `.status` | string | `"ok"`, `"busy"` (transient), `"not_discovered"`, `"research_required"`, `"tier_too_low"`, `"out_of_range"`, `"too_hard"`, `"no_power"` |
| `.message` | string | Player-readable explanation |
| `.site` | [[Site]] or `None` | The surveyed concrete Site, or `None` when rejected |

See [[Sonar Module]] for the method.
