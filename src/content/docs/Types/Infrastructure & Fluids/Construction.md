---
tags:
  - type
  - infrastructure-fluids
aliases:
  - Construction
title: "Construction"
---

One planned build or removal job. **Returned by:** `pending_constructions()` / `active_constructions()` / `paused_constructions()` on [[Construction Blueprint]].

| Member | Returns | Meaning |
| --- | --- | --- |
| `.id` | string | Unique blueprint id; pass to `self.constructor.execute(id)` |
| `.kind` | string | `"pipe"`, `"power_line"`, `"gas_bridge"`, `"liquid_bridge"`, `"power_bridge"`, `"deconstruct"`, `"outpost"`, `"thermal_cap"`, `"water_pump"`, `"oil_pump"`, `"exotic_gas_cap"`, `"exotic_spring_tap"`, `"mining_drill"`, `"mining_drill_industrial"`, `"mining_drill_heavy"` |
| `.medium` | string or `None` | Utility layer: `"gas"` / `"liquid"` / `"power"`; `None` for point structures. Pipe jobs keep `.kind == "pipe"`, so use this to tell Gas from Liquid Pipe; deconstruction reports the target's layer |
| `.position` | [[Position]] | Tile-aligned coordinates; the Pioneer drives here to start or resume |
| `.progress` | number | Build completion 0-1 at snapshot time; sort paused work by progress to resume the most-completed first |
| `.required_item` | string or `None` | Item the Pioneer must carry before executing; `None` for deconstruction and paused jobs already started. **Never infer material from `.kind`** |
| `.required_count` | number | Units of `.required_item` needed (most single-piece jobs 1; deconstruction 0) |

## See also

- [[Constructor Module]]: `execute()` semantics and outcomes
