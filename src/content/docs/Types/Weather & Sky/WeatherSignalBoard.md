---
tags:
  - type
  - weather-sky
aliases:
  - WeatherSignalBoard
title: "WeatherSignalBoard"
---

A station's programmable Weather display. **Returned by:** `weather_station.signal_board`. The board displays what your script supplies **without interpreting it** (shape and bounds are checked, not meaning or checksum validity).

### .reveal(transmission)
Publish one transmission into its declared numbered slot. A different event replaces this station's current board; an already-published slot for the same event is left unchanged. Accepts a [[SignalTransmission]], a saved dictionary such as `vars(signal)`, or a class instance with the same fields (string `event_id`, `channel`, `data`; whole-number `number`, `total`; optional `source_station_id` defaults to this station).

**Returns:** [[ActionResult]] · Outcomes: `"ok"` / `"no_power"` (transient) / `"duplicate"` (already present, nothing changed) / `"invalid_type"`

### .reject(transmission)
Add one to the supplied event's refusal count **without opening a slot** (same validation as `reveal`).

**Returns:** ActionResult · Outcomes: `"ok"` / `"no_power"` (transient) / `"invalid_type"`

### .resolve(event_id, info)
Publish up to **6 labelled rows** for an event (string-keyed dictionary of labels and display values). A different event replaces the current board.

**Returns:** ActionResult · Outcomes: `"ok"` / `"no_power"` (transient) / `"invalid_type"`

### .clear()
Clear the board, its rejection count, and any published conclusion.

**Returns:** ActionResult · Outcomes: `"ok"` / `"no_power"` (transient)

### .status()
Current board publication metadata.

**Returns:** [[WeatherSignalBoardStatus]]

## See also

- [[Weather Station]] · [[Weather System]]
