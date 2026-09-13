---
tags:
  - type
  - terraforming
  - result
aliases:
  - WasteDumpResult
---
# WasteDumpResult

Result of dumping the waste chamber. **Returned by:** `oxygen_generator.dump_waste()`

| Field | Returns | Meaning |
| --- | --- | --- |
| `.status` | string | Always `"ok"` after the chamber is dumped |
| `.message` | string | Explanation of the dump and its efficiency penalty |
| `.penalty` | number | Efficiency penalty applied by this dump, 0-1 |

## See also

- [[Oxygen Generator]]: the waste mechanic
