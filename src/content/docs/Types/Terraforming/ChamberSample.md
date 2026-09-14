---
tags:
  - type
  - terraforming
aliases:
  - ChamberSample
title: "ChamberSample"
---

The coastal fragment loaded in the luminizer chamber. **Returned by:** `bio_luminizer.chamber`

| Member | Returns | Meaning |
| --- | --- | --- |
| `.fragment_id` | string | The loaded coastal fragment (the 16 coastal-biome fragments, e.g. `"gw_caudal_fin"`, `"st_plastron_shard"`) |
| `.name` | string | Player-facing name |
| `.glow` | [r, g, b] | Current glow (0-255): the dim start color before tuning. Read it with the order's `target_glow` and `lamp_signature(...)` to solve the lamp settings |

## See also

- [[Bio Luminizer]]: the tuning machine
