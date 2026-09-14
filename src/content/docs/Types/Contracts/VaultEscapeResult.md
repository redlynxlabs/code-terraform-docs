---
tags:
  - type
  - contracts
  - result
aliases:
  - VaultEscapeResult
title: "VaultEscapeResult"
---

Result of opening the vault. **Returned by:** `Vault.escape()`

| Field | Returns | Meaning |
| --- | --- | --- |
| `.status` | string | `"ok"` (the vault opened and released its key) or `"not_at_exit"` |
| `.message` | string | Player-readable explanation |
| `.key` | string or `None` | Vault key when `"ok"`; otherwise `None` |

See [[Sealed Vault]] for the puzzle.
