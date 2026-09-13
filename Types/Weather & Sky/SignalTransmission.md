---
tags:
  - type
  - weather-sky
aliases:
  - SignalTransmission
---
# SignalTransmission

One heard transmission copy. **Returned by:** `SignalReceiver.transmissions()`

| Member | Returns | Meaning |
| --- | --- | --- |
| `.event_id` | string | Shared by every packet and noise duplicate of the event |
| `.number` | number | Declared packet number; **different copies may declare the same number** |
| `.total` | number | Declared packet count for the event |
| `.channel` | string | `"broadcast"` (thunder) or a biome channel (`"frozen"` ... `"deep"`, dust) |
| `.data` | string | Encoded movement record `event_id\|number\|total\|dx\|dy`. Numbered records form a movement sequence beginning at (0, 0); the sequence endpoint is the event coordinate |
| `.checksum` | number | The **full sum of every character's ASCII code in `.data`, no modulo**: recompute and compare to reject noise copies |
| `.emitted_at_gh` | number | Storm-start world-clock timestamp shared by every copy |
| `.expires_at_gh` | number | When the event's live listening window closes |
| `.source_station_id` | string | The physical station hearing this copy |

## See also

- [[Weather System]]: assembling packets into an aftermath coordinate
- [[WeatherSignalBoard]]: publishing your solution
