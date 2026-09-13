---
tags:
  - type
  - biosphere
  - result
aliases:
  - SeedResult
---
# SeedResult

Result of a combine trial. **Returned by:** `seed_maker.combine()`

| Field | Returns | Meaning |
| --- | --- | --- |
| `.status` | string | `"seed_found"` (success), `"sludge"` (success: valid blend, no seed), `"locked"`, `"busy"` (transient), `"missing_life_forms"`, `"output_full"` |
| `.message` | string | Player-readable explanation |
| `.seed_id` | string or `None` | The deposited seed item id (`"seed_sunpetal"`...) when found |
| `.species` | string or `None` | The discovered flora species id when found |

## See also

- [[Seed Maker]]: the sweep pattern
