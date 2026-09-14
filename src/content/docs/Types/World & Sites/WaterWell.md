---
tags:
  - type
  - world-sites
aliases:
  - WaterWell
title: "WaterWell"
---

Extends [[Site]] (shared members and the pre-survey snapshot rule there). Any Site-returning API where `kind() == "water"`, e.g. `water_pump.well()`. **Wells reveal fully on basic survey.**

### .yield_tier()
`"standard"` (1×) / `"rich"` (2×) / `"pure"` (3×). `None` until surveyed.

**Returns:** string or `None`

### .flow_rate()
Tons of water per hour: **10 / 20 / 30** for standard / rich / pure. `None` until surveyed; reads live afterwards.

**Returns:** number or `None`

### .has_pump() / .pump_id()
Whether a [[Water Pump]] is deployed on this well, and its machine id (empty string when none). Pre-survey sonar results always report `False` / empty.

**Returns:** boolean / string

## See also

- [[Water & Oil Wells]]: the system guide
