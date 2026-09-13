---
tags:
  - type
  - contracts
aliases:
  - ThreeEchoesContract
  - ThreeEchoesBroadcast
---
# Three Echoes

Contract `three_echoes`. Extends [[Contract]] with:

### .broadcast
The intercepted broadcast: three frequency fragments.

**Returns:** `ThreeEchoesBroadcast`

## ThreeEchoesBroadcast

| Member | Returns | Meaning |
| --- | --- | --- |
| `.freq_a` | string | The 1st, 4th, 7th... (every third) characters of the original signal, in order |
| `.freq_b` | string | The 2nd, 5th, 8th... characters |
| `.freq_c` | string | The 3rd, 6th, 9th... characters |

**Approach:** re-interleave the three fragments round-robin (a, b, c, a, b, c...) to rebuild the original signal, then transmit it.
