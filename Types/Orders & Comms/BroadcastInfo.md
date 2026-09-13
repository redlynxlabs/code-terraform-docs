---
tags:
  - type
  - orders-comms
aliases:
  - BroadcastInfo
---
# BroadcastInfo

Snapshot of a Signal Bus broadcast. **Returned by:** `comms.latest_info(channel)`; `comms.wait_broadcast(channel).broadcast` after `status == "ok"`.

| Member | Returns | Meaning |
| --- | --- | --- |
| `.value` | any | A copy of the broadcast's value, **including `None` if that was the published value**. From `latest_info()`: the latest value; from `wait_broadcast()`: the first publication captured by that wait |
| `.sender` | string or `None` | Who published it (`None` when saved sender information is missing) |
| `.age_seconds` | number or `None` | Simulation seconds since the broadcast, sampled at read/resume. Same time base as `sleep()` and `clock.elapsed_seconds()`; pausing the simulation freezes the age. `None` = missing or invalid timestamp |

## See also

- [[Signal Bus]] and [[Signal Bus Guide]]
