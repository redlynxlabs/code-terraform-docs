---
tags:
  - type
  - system
  - result
aliases:
  - CropJobResult
---
# CropJobResult

One consumed terminal result. **Returned by:** [[Crop Automator]] `next_result()`.

| Field | Returns | Meaning |
| --- | --- | --- |
| `.status` | string | Terminal outcome: `"ok"`, `"partial"` (harvest that could not fit everything), `"empty"` (nothing waiting), `"out_of_range"`, `"no_plant"`, `"not_mature"`, `"no_forage"`, `"not_empty"`, `"base_sector"`, `"already_mature"`, `"tier_conflict"`, `"invalid_seed"`, `"invalid_material"` |
| `.message` | string | Player-readable explanation |
| `.job_id` / `.action` / `.sector` | number / string / string, or `None` | The completed job's identity (`None` when `"empty"`) |
| `.item_id` | string or `None` | Requested seed or treatment; `None` for harvest and empty results |
| `.collected` | number | Whole Forage committed to the output bin by a harvest (0 otherwise) |
| `.discarded` | number | Forage a harvest could not fit and threw away. Non-zero only with `"partial"`; **the cell is cleared either way** |
