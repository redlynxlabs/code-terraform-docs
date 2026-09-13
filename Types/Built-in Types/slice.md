---
tags:
  - type
  - built-in
aliases:
  - slice
---
# slice

Created by `slice(stop)` or `slice(start, stop, step)`; usable wherever `seq[start:stop:step]` indexing works.

| Member | Returns | Meaning |
| --- | --- | --- |
| `.start` | any | Start bound, or `None` when omitted (`slice(stop)` leaves `.start` as `None`) |
| `.stop` | any | Stop bound, or `None` |
| `.step` | any | Step, or `None`. **Sequence indexing rejects a step of 0** |

## See also

- [[Built-in Functions]]: `slice()` entry
