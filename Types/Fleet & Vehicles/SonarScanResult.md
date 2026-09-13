---
tags:
  - type
  - fleet-vehicles
  - result
aliases:
  - SonarScanResult
---
# SonarScanResult

Result of a sonar sweep. **Returned by:** `SonarModule.scan()`

| Field | Returns | Meaning |
| --- | --- | --- |
| `.status` | string | `"ok"`, `"too_hard"`, `"tier_too_low"`, `"research_required"`, `"wrong_scanner"` (all partial: sweep completed but a nearby contact could not be classified), `"busy"` (transient), `"no_power"` |
| `.message` | string | Player-readable explanation |
| `.sites` | list of [[Site]] | Sites resolved by this completed sweep; **empty with `"ok"` means a completed sweep found no compatible contacts** |

See [[Sonar Module]] for the method and [[Command Results]] for the result model.
