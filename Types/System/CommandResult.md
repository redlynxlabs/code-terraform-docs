---
tags:
  - type
  - system
  - result
aliases:
  - CommandResult
---
# CommandResult

Result of dequeuing a mailbox command. **Returned by:** `Component.next_command()`

| Field | Returns | Meaning |
| --- | --- | --- |
| `.status` | string | `"ok"` (a command was consumed) or `"empty"` |
| `.message` | string | Player-readable explanation |
| `.command` | [[ScriptCommand]] or `None` | The consumed command when `"ok"` |

## See also

- [[Script Commands]]: the mailbox guide
