---
tags:
  - type
  - orders-comms
aliases:
  - TransmitterInfo
title: "TransmitterInfo"
---

Transmitter connection state. **Returned by:** `transmitter.get_info()`

| Member | Returns | Meaning |
| --- | --- | --- |
| `.connected` | boolean | `True` if connected to a target |
| `.target` | string | Connected planet id, or `"none"` when disconnected |

## See also

- [[Transmitter]]: connect and transmit
