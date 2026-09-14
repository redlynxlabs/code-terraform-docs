---
tags:
  - type
  - weather-sky
aliases:
  - WeatherSignalBoardStatus
title: "WeatherSignalBoardStatus"
---

Board publication metadata. **Returned by:** `weather_station.signal_board.status()`

| Member | Returns | Meaning |
| --- | --- | --- |
| `.has_input` | boolean | Whether this station has published a Signal Board value |
| `.published_at_gh` | number or `None` | Publication timestamp |
| `.freshness` | string | `"no_input"`, `"fresh"`, or `"stale"` (**a publication becomes stale after 2 world-clock hours**) |
| `.event_id` | string | Event shown on this station's board, or empty |
