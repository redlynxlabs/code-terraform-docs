---
tags:
  - type
  - terraforming
aliases:
  - ChamberFragment
title: "ChamberFragment"
---

The geothermal fragment loaded in the sequencer chamber. **Returned by:** `dna_sequencer.chamber`

| Member | Returns | Meaning |
| --- | --- | --- |
| `.fragment_id` | string | The loaded geothermal fragment (the 16 geothermal-biome fragments, e.g. `"gw_cardiac_node"`, `"vc_antenna_cluster"`, `"st_limb_claw"`) |
| `.name` | string | Player-facing name |
| `.genes` | list of strings | Genes currently carried (e.g. `["cold_tolerance", "pressure_tolerance"]`); same as calling `genes()` |
| `.spliced` | boolean | `True` after the fragment has used its **one safe splice: calling `splice()` again destroys it** |

## See also

- [[DNA Sequencer]]: the machine and its splice rules
