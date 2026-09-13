---
tags:
  - type
  - weather-sky
aliases:
  - WeatherEventForecast
---
# WeatherEventForecast

One forecast entry. **Returned by:** `WeatherReport.forecast()`

| Member | Returns | Meaning |
| --- | --- | --- |
| `.id` | string | Stable event id shared with the active [[Storm]] and later signal transmissions |
| `.kind()` | string | `"dust"` or `"thunder"` |
| `.arrival_window()` | [earliest, latest] | Hours after the report's observation time when the cell should enter coverage |
| `.corridor()` | [[Zone]] | Coarse predicted travel corridor: **storm information, never the hidden aftermath path** |
| `.intensity_range()` | [low, high] | Observed forecast range, each 0-1 |

## See also

- [[WeatherReport]] · [[Weather System]]
