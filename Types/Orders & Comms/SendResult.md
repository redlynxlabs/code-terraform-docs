---
tags:
  - type
  - orders-comms
  - result
aliases:
  - SendResult
---
# SendResult

Result of queueing a message. **Returned by:** `comms.send()`

| Field | Returns | Meaning |
| --- | --- | --- |
| `.status` | string | `"ok"` (queued); `"invalid_channel"`, `"channel_limit"`, `"queue_full"`, `"id_exhausted"`, `"invalid_value"` all mean **no message was sent** |
| `.message` | string | Player-readable explanation |
| `.message_id` | number or `None` | The queued message's positive integer id when `"ok"`. Matches `.id` in `pending()` and `receive().packet`; use with `receive()`, `cancel()`, or `update()` to target that exact request |

## See also

- [[Signal Bus]]
