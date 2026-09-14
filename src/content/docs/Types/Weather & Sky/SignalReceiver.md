---
tags:
  - type
  - weather-sky
aliases:
  - SignalReceiver
title: "SignalReceiver"
---

A station's live receiver. **Returned by:** `weather_station.signal_receiver`

### .transmissions()
Raw transmissions **audible to this powered station right now**. More than one event may be present. Ordering is stable, but copies sharing a packet number are not ordered by validity. **The receiver stores no history**: capture what you need each read.

**Returns:** list of [[SignalTransmission]]

## See also

- [[Weather System]]: the checksum-validation workflow
