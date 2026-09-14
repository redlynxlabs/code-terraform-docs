---
tags:
  - type
  - system
  - result
aliases:
  - CountResult
title: "CountResult"
---

Result of queue, discard, clear, and bulk-count commands.

| Field | Returns | Meaning |
| --- | --- | --- |
| `.status` | string | `"ok"` (one or more entries changed), `"no_op"` (nothing changed: also success), or a command-specific rejection such as `"invalid_channel"` / `"invalid_key"` |
| `.message` | string | Player-readable explanation |
| `.count` | number | Whole-number entries or units affected |

## See also

- [[Command Results]]
