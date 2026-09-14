---
tags:
  - type
  - weather-sky
aliases:
  - WeatherStrike
title: "WeatherStrike"
---

One observed lightning strike. **Returned by:** `weather_station.strikes()` (oldest first; only strikes this station physically observed)

| Member | Returns | Meaning |
| --- | --- | --- |
| `.id` | string | Stable observed-strike id |
| `.event_id` | string | Thunderstorm event id |
| `.observed_at_gh` | number | World-clock hour when the strike landed |
| `.energy_wh` | number | Electrical energy carried, in Wh |
| `.caught` | boolean | Whether an eligible [[Lightning Rod]] banked it |

Exact strike positions and Storm Glass eligibility are not included.

## See also

- [[Weather Station]] · [[Lightning Rod]]
