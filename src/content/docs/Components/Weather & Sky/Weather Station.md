---
tags:
  - component
  - weather-sky
aliases:
  - weather_station_1
title: "Weather Station"
---

A programmable local storm station and live receiver. It measures **immutable local reports**, hears event transmissions on broadcast and biome channels, and may publish to its Signal Board.

**Stats:** Type Sensors · Power in -50 W (draws from grid)

**How to obtain:** Requires the **Weather Program** research (Terraform Index 330,000). Buy from the Shop for 60,000 cr.

**Access:** `self` / `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Methods

### .outpost
The outpost where this building is deployed, as an [[OutpostRef]].

### .observe() `SELF ONLY`
Measure one immutable local report. The station refreshes **at most once per world-clock hour**; faster calls return the same report id. The report includes local coverage, active storm snapshots, and a local forecast reaching 8 world-clock hours ahead (24 once **Weather Forecasting** is researched). It never contains an aftermath coordinate.

**Returns:** [[WeatherReport]] · **Raises:** `RuntimeError` when the station is unfinished or unpowered

### .last_report()
The last measured report without taking a new observation, for startup recovery and stale-data handling. `None` means this station has never completed `observe()`. The snapshot stays readable while stale or unpowered.

**Returns:** `WeatherReport` or `None`

### .signal_board
This station's programmable Weather display. `reveal()` publishes a transmission into a numbered slot, `reject()` counts a refused copy, `resolve()` publishes labelled values. **The board displays what your script supplies without interpreting it.**

### .signal_receiver
Live receiver. `transmissions()` returns only the raw copies **audible to this powered station now** and stores no history. Dust reception uses local biome channels; thunder reception broadcasts planet-wide.

### .strikes()
This station's bounded strike history: each [[WeatherStrike]] includes its event id, observation time, energy, and whether a [[Lightning Rod]] banked it. Exact strike positions and Storm Glass eligibility are not included. Only strikes this station physically observed are returned, oldest first.

**Returns:** List of `WeatherStrike`

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].

## See also

- [[Weather System]]: storms, transmissions, aftermath collection
- [[Lightning Rod]]: banking strikes
- [[Drone]]: `collect()` for aftermath batches
