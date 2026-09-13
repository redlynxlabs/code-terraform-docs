---
tags:
  - type
  - contracts
aliases:
  - TheLoomContract
  - Loom
---
# The Loom

Contract `the_loom`. Extends [[Contract]] with:

| Member | Returns | Meaning |
| --- | --- | --- |
| `.loom` | `Loom` | The recovered alien loom, your probe tool |
| `.record` | string | A 42-character woven record made from two equal-length 21-character threads; **one thread is the message** |

## Loom

### .weave(a, b)
Braid two strings into one and return it. Each character is one token. **Deterministic: the same inputs always weave the same way, so probe it freely.** The loom only weaves forward; build the reverse yourself.

**Returns:** string · **Raises:** `TypeError` (non-strings), `ValueError` (either input over 30 characters)

**Approach:** weave known probe strings to learn the interleaving rule, invert it to un-weave `.record` into its two threads, and transmit the message thread.
