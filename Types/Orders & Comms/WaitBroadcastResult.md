---
tags:
  - type
  - orders-comms
  - result
aliases:
  - WaitBroadcastResult
---
# WaitBroadcastResult

Result of waiting for the next broadcast. **Returned by:** `comms.wait_broadcast()`

| Field | Returns | Meaning |
| --- | --- | --- |
| `.status` | string | `"ok"` (a new broadcast was captured) or `"invalid_channel"`. A valid channel keeps waiting until a new broadcast arrives |
| `.message` | string | Player-readable explanation |
| `.broadcast` | [[BroadcastInfo]] or `None` | The captured publication: copied value, sender, and age at resume |

## See also

- [[Signal Bus]]
