---
tags:
  - type
  - core-data
aliases:
  - Bounds
title: "Bounds"
---

World coordinate limits. **Returned by:** `planet.get_bounds()`

| Field | Returns | Meaning |
| --- | --- | --- |
| `.min_x` / `.max_x` | number | Minimum / maximum X coordinate (meters) |
| `.min_y` / `.max_y` | number | Minimum / maximum Y coordinate (meters) |

Targets outside these bounds are rejected by [[Nav Module]] `set_target` (`"out_of_bounds"`) and [[Construction Blueprint]] planning.
