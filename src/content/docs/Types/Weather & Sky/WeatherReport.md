---
tags:
  - type
  - weather-sky
aliases:
  - WeatherReport
title: "WeatherReport"
---

One immutable local observation. **Returned by:** `weather_station.observe()` / `weather_station.last_report()`

| Member | Returns | Meaning |
| --- | --- | --- |
| `.id` | string | Stable report id for provenance and logging |
| `.source_id` | string | The station that made this report |
| `.observed_at_gh` | number | World-clock timestamp when measured |
| `.age_gh()` | number | **Live** age of this immutable report in world-clock hours |
| `.coverage()` | [[Zone]] | The station's local coverage frozen at observation time |
| `.active()` | list of [[Storm]] | Active storm snapshots inside coverage at observation time |
| `.forecast()` | list of [[WeatherEventForecast]] | Events expected to enter coverage within 8 world-clock hours (24 after Weather Forecasting research) |

The report never contains an aftermath coordinate; those come from validated [[SignalTransmission]] packets.

## See also

- [[Weather Station]] · [[Weather System]]
