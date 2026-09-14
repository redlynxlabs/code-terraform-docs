---
tags:
  - type
  - system
aliases:
  - CropJob
title: "CropJob"
---

One queued or active automator job. **Returned by:** [[Crop Automator]] `current_job()` and `get_queue()`.

| Member | Returns | Meaning |
| --- | --- | --- |
| `.id` | number | Stable whole-number job id |
| `.action` | string | `"harvest"` / `"plant"` / `"apply"` |
| `.sector` | string | Target field sector |
| `.item_id` | string or `None` | Requested seed or treatment item; `None` for harvest jobs |
| `.state` | string | `"working"` / `"blocked"` / `"queued"` |
| `.progress` | number | 0-1 completed fraction (pending jobs read 0) |
| `.blocker` | string or `None` | Exact physical blocker while blocked: `"not_placed"`, `"no_power"`, `"no_seed"`, `"no_material"`, `"output_full"`, `"results_full"` |
