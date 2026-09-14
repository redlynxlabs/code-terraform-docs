---
tags:
  - type
  - infrastructure-fluids
  - result
aliases:
  - BlueprintPlanResult
title: "BlueprintPlanResult"
---

Result of a planning command. **Returned by:** [[Construction Blueprint]] planning methods.

| Field | Returns | Meaning |
| --- | --- | --- |
| `.status` | string | `"ok"`, `"locked"`, `"invalid_kind"`, `"invalid_rotation"`, `"invalid_medium"`, `"invalid_axis"`, `"invalid_layer"`, `"out_of_bounds"`, `"wrong_target"`, `"unsurveyed_target"`, `"too_hard"`, `"target_claimed"`, `"occupied"`, `"clearance"`, `"invalid_route"`, `"blocked"`, `"already_exists"` (success), `"already_queued"` (success), `"ambiguous_target"`, `"nothing_here"` |
| `.message` | string | Player-readable explanation |
| `.blueprint_ids` | list of strings | Newly created blueprint ids; **empty for every outcome except `"ok"`** |

Branch on `.status` before reading `.blueprint_ids`.
