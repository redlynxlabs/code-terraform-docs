---
tags:
  - component
  - power
aliases:
  - battery_1
title: "Battery"
---

Base-station energy storage. It fills on its own when generation runs a surplus and drains when the grid falls short. If it empties, machines shut off and their scripts pause.

**Stats:** Energy 500 Wh · Buy from the Shop for 300 cr.

**Access:** `get_component(id)` · Like every component, exposes `.id` and `.name`.

> [!info] Not the vehicle battery
> This is the base machine. The vehicle battery pool at `self.battery` is a different API: see [[Battery (Vehicle)]].

## Methods

### .outpost
The outpost where this building is deployed. The returned [[OutpostRef]] includes its stable id, display name, biome, position, capacity, and `buildings()` query. Read the property again when you need current values.

**Returns:** `OutpostRef`

### .get_level()
Current stored energy in watt-hours (Wh). Drops when consumption exceeds generation, rises when generation exceeds consumption, and stays level when they are equal. Approaching 0 is a red flag: the grid is about to brown out.

**Returns:** Number (Wh)

### .get_capacity()
Total battery capacity in watt-hours (Wh). Queryable rather than hardcoded so future upgrades don't break scripts. Use with `get_level()` for charge percent.

**Returns:** Number (Wh)

## See also

- [[Power Networks]]: how batteries pool per subnet
- [[Power Control]]: shed load before the battery hits zero
- [[Lightning Rod]]: the separate emergency reserve
