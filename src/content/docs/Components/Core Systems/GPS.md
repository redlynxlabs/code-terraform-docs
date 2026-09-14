---
tags:
  - component
  - core-systems
aliases:
  - gps
title: "GPS"
---

A ship sensor that reports which outpost you're viewing, its name and coordinates, and how many buildings are deployed there. Switching outposts on the dashboard retargets it.

**Access:** `get_component("gps")` · Like every component, exposes `.id` and `.name`.

## Methods

### .planet()
Returns the current planet **component**. Use `gps.planet().id` for stable ids such as `"nocturna"` when calling [[Journal]] APIs, and `gps.planet().get_name()` for the display name `"Nocturna"`.

**Returns:** [[Nocturna]] planet component

### .site_name()
Returns the current outpost's display name. `"Nocturna Base"` for the home outpost (default, players can rename); `"Outpost 1"`, `"Outpost 2"`, ... for player-founded outposts.

**Returns:** String (current outpost name)

### .coords()
Returns the current outpost's world coordinates as a 2-element list `[x, y]`. The home outpost sits at `[0, 0]`; founded outposts carry the position the player chose in Plan mode.

**Returns:** List `[x, y]`

### .buildings_used()
Returns the number of buildings deployed at the current outpost. Sensors, mobile units, structural hubs, and POI extraction machines don't count; only shop-purchased deployable buildings.

**Returns:** Number

### .buildings_capacity()
Returns the **soft building threshold** at the current outpost. Each counted building above it reduces productive and service throughput. Nocturna Base has a few extra starter slots; founded outposts use the standard threshold.

**Returns:** Number (soft building threshold)

### .is_full()
Returns `True` when the current outpost has reached or exceeded its soft building threshold. The threshold itself does not block ordinary deployment.

**Returns:** Boolean

### .is_home()
Returns `True` when the current outpost is the home outpost (the one the player started at, default name `"Nocturna Base"`). Useful for branching on whether you're managing the spawn site versus a remote outpost.

**Returns:** Boolean

## See also

- [[Outpost]] and [[Outpost Network]]: outpost components proper
