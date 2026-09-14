---
tags:
  - type
  - system
  - result
aliases:
  - JobReceipt
title: "JobReceipt"
---

Result of submitting an automator job. **Returned by:** [[Crop Automator]] `harvest()` / `plant()` / `apply()`.

| Field | Returns | Meaning |
| --- | --- | --- |
| `.status` | string | `"queued"` (entered the FIFO), or the exact rejection: `"queue_full"` (transient), `"not_placed"`, `"out_of_range"`, `"invalid_seed"`, `"invalid_material"` |
| `.message` | string | Player-readable explanation |
| `.job_id` | number or `None` | Stable job id when queued |
| `.queue_position` | number or `None` | One-based execution position at submission time, counting the active job |
