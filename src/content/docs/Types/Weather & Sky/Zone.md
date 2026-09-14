---
tags:
  - type
  - weather-sky
aliases:
  - Zone
title: "Zone"
---

A geometric region. **Returned by:** `WeatherReport.coverage()` and `WeatherEventForecast.corridor()`

| Method | Returns | Meaning |
| --- | --- | --- |
| `.intersect(other)` | Zone | Geometry shared by both zones |
| `.union(other)` | Zone | Everything covered by either |
| `.subtract(other)` | Zone | Remove the other zone's geometry from this one |
| `.diff(other)` | Zone | Geometry present in exactly one of the two |
| `.center()` | [x, y] or `None` | Centroid in meters (`None` for an empty zone). **Describes visible storm geometry, not the hidden aftermath** |
| `.area()` | number | Covered area in m² |
| `.contains(x, y)` | boolean | Point inside the zone |
| `.is_empty()` | boolean | Zone covers nothing |

## See also

- [[Weather System]]: corridor-intersection tactics
