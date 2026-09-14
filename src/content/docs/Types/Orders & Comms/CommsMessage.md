---
tags:
  - type
  - orders-comms
aliases:
  - CommsMessage
title: "CommsMessage"
---

One queued Signal Bus message. **Returned by:** `comms.pending(channel)` entries; `.packet` of `receive()`, `wait()`, or `wait_any()` after `status == "ok"`.

| Member | Returns | Meaning |
| --- | --- | --- |
| `.id` | number | Monotonic message id assigned by the Signal Bus |
| `.sender` | string | Script owner id that sent it |
| `.tick` | number | Game tick when sent |
| `.value` | any | JSON-safe value: `None`, boolean, number, string, list, or dict with string keys |

## See also

- [[Signal Bus]]: send, receive, cancel, update
