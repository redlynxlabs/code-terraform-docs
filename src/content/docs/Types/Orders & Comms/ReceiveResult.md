---
tags:
  - type
  - orders-comms
  - result
aliases:
  - ReceiveResult
title: "ReceiveResult"
---

Result of consuming a queued message. **Returned by:** `comms.receive()`, `comms.wait()`

| Field | Returns | Meaning |
| --- | --- | --- |
| `.status` | string | `"ok"` (a message was consumed), `"empty"` (no id requested, queue empty; nothing consumed), `"not_found"` (requested id absent), `"invalid_channel"` |
| `.message` | string | Player-readable explanation |
| `.packet` | [[CommsMessage]] or `None` | The consumed message when `"ok"`; when an id was requested, the packet has exactly that id |

## See also

- [[Signal Bus]]
