---
tags:
  - type
  - contracts
aliases:
  - CrosstalkContract
---
# Crosstalk

Contract `crosstalk`. Extends [[Contract]] with:

| Member | Returns | Meaning |
| --- | --- | --- |
| `.input_x` | string | First intercepted signal: letters with 0s and 1s scattered through; **some bits are decoys** |
| `.input_y` | string | Second intercepted signal, same shape |
| `.min_length` | number | Minimum palindrome length for a bit to count: a bit qualifies only if the letters mirror to this span **centred on it** |

**Approach:** in each signal, keep only bits sitting at the center of a letter palindrome of at least `min_length`; combine the two recovered bitstreams per the briefing and transmit.
