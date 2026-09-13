---
tags:
  - type
  - contracts
aliases:
  - Contract
---
# Contract

Base shape of every programming-contract object. **Returned by:** `self.contract` in a contract's editor session.

| Member | Returns | Meaning |
| --- | --- | --- |
| `.id` | string | Contract id, used for transmitting answers: `"relay_hack"`, `"xenogenetics"`, `"corrupted_archive"`, `"sealed_vault"`, `"data_tablet"`, `"terminal_breach"`, `"drifting_signal"`, `"cold_boot"`, `"three_echoes"`, `"buried_five"`, `"the_loom"`, `"crosstalk"`, `"beat_the_system"`, `"core_sample"`, `"lattice"` |
| `.name` | string | Display name |
| `.reward` | number | Credit reward for completion |
| `.status` | string | `"available"` or `"completed"` |

Each concrete contract adds its own puzzle fields and device objects; see the per-contract pages in this folder.

## See also

- [[Contracts]]: the system guide
- [[Contracts Tutorial]]: solving your first one
