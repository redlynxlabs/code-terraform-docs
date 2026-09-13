---
tags:
  - type
  - orders-comms
  - result
aliases:
  - WaitAnyResult
---
# WaitAnyResult

Result of a multi-channel wait. **Returned by:** `comms.wait_any()`

| Field | Returns | Meaning |
| --- | --- | --- |
| `.status` | string | `"ok"` (one queued message consumed) or `"invalid_channel"` (some listed id invalid). **Valid empty queues keep waiting** rather than returning |
| `.message` | string | Player-readable explanation |
| `.channel` | string or `None` | The channel the consumed message came from |
| `.packet` | [[CommsMessage]] or `None` | The consumed message |

## See also

- [[Signal Bus]]: priority order semantics
