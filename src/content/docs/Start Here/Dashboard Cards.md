---
tags:
  - guide
  - start-here
aliases:
  - Dashboard Suite
title: "Dashboard Cards"
sidebar:
  order: 3
  badge:
    text: Suite
    variant: note
---

A copy-paste suite for the [[Control Room]]. Create each with **+ New Card**, pick the size named in its header, paste, run. Three rules for every card: no `sleep()` needed (the interpreter repaints once per tick), always `panel.clear()` first, and cards have no `self`, so they read everything but command only through **shared authorities** (`power_control`, `shop`, `comms`, `inventory`, `atmosphere`). Full widget reference: [[Panel API]]. Edit the machine ids to match your base (the ⓘ on each machine card shows its id).

## Terraforming Pulse (1×1)

Pillars, CO2 fuel, credits, live heat trend. ([[Atmosphere]], [[Commander]])

```python
atmo = get_component("atmosphere")
me = get_component("me")
heat_hist = []

while True:
    panel.clear()
    panel.label(12, 22, "TERRAFORMING", "caption")
    panel.draw_text(360, 22, f"{round(me.get_credits())} cr", 13, "text-value")

    panel.counter(60, 60, round(atmo.get_o2(), 2), "O2 PPT")
    panel.counter(210, 60, round(atmo.get_heat(), 1), "HEAT UNITS")
    panel.counter(370, 60, round(atmo.get_pressure(), 3), "KPA")

    panel.draw_text(12, 118, f"CO2 fuel: {round(atmo.get_co2(), 2)} ppt", 12, "text-muted")

    heat_hist.append(atmo.get_heat())
    if len(heat_hist) > 120:
        heat_hist.pop(0)
    panel.label(12, 140, "heat trend", "caption")
    panel.spark_line(12, 150, 476, 40, heat_hist)
```

## Power Board (1×1)

Planet-wide generation vs load and battery reserve via [[Power Control]].

```python
power = get_component("power_control")

while True:
    panel.clear()
    t = power.total()
    panel.label(12, 22, "POWER", "caption")
    panel.pill(400, 14, f"net {round(t.net)} W", "success" if t.net >= 0 else "error")

    peak = max(t.generated, t.consumed, 1)
    panel.draw_text(12, 52, f"generated {round(t.generated)} W", 13)
    panel.progress_bar(180, 46, 300, 10, t.generated / peak, "success")
    panel.draw_text(12, 78, f"consumed {round(t.consumed)} W", 13)
    panel.progress_bar(180, 72, 300, 10, t.consumed / peak, "warning")

    frac = t.stored / t.capacity if t.capacity > 0 else 0
    panel.draw_text(12, 110, f"batteries {round(t.stored)} / {round(t.capacity)} Wh", 13)
    panel.progress_bar(180, 104, 300, 12, frac, "accent")

    if t.reserve_capacity > 0:
        panel.draw_text(12, 140, f"lightning {round(t.reserve_stored)} Wh", 13, "text-muted")
        panel.progress_bar(180, 134, 300, 8, t.reserve_stored / t.reserve_capacity, "warning")

    panel.draw_text(12, 178, f"{t.grid_count} grid(s)", 12, "text-muted")
```

## Fleet Board (1×1; use 1×2 past four vehicles)

One row per vehicle with battery traffic-lights and a rescue banner. ([[Fleet]], [[Vehicle Charging Station]])

```python
fleet = get_component("fleet")
station = get_component("charging_station_1")

while True:
    panel.clear()
    panel.label(12, 22, "FLEET", "caption")
    if station.is_rescuing():
        panel.pill(320, 14, f"RESCUE: {station.get_rescue_target()}", "error")

    y = 52
    for v in fleet.vehicles():
        dot = "running"
        if v.status == "stranded":
            dot = "error"
        elif v.is_being_rescued:
            dot = "paused"
        elif v.status == "idle":
            dot = "idle"
        panel.status_dot(20, y, 5, dot)
        panel.draw_text(36, y, f"{v.name}  ({v.status})", 12)
        b = v.battery_level
        color = "success" if b > 0.5 else ("warning" if b > 0.2 else "error")
        panel.progress_bar(330, y - 6, 115, 10, b, color)
        panel.draw_text(452, y, f"{round(b * 100)}%", 11, "text-muted")
        y += 32
```

## Biology Board (1×1)

The automated trio's active order, per-fragment `done+in_transit/required`, lifetime earnings. ([[Bio Exchange]])

```python
exchange = get_component("bio_exchange_1")

while True:
    panel.clear()
    panel.label(12, 22, "BIO ORDERS", "caption")
    panel.draw_text(320, 22, f"lifetime {round(exchange.lifetime_credits())} cr", 12, "text-muted")

    o = exchange.active_order()
    if o is None:
        panel.draw_text(12, 60, "no active order", 13, "text-muted")
    else:
        panel.draw_text(12, 50, o.name, 14, "text-bright")
        panel.pill(410, 42, f"{o.reward} cr", "accent")
        panel.progress_bar(12, 62, 476, 12, o.percent / 100, "accent")
        y = 100
        for fid, req in o.requires.items():
            done = o.delivered.get(fid, 0)
            moving = o.in_transit.get(fid, 0)
            panel.draw_text(12, y, fid, 12)
            panel.progress_bar(250, y - 6, 155, 8, done / req if req > 0 else 0, "success")
            panel.draw_text(412, y, f"{done}+{moving}/{req}", 11, "text-muted")
            y += 26
```

## Sun & Solar (1×1)

Three dials proving the tracker tracks. ([[Clock]], [[Solar Generator]])

```python
clock = get_component("clock")
solar = get_component("solar_1")

while True:
    panel.clear()
    panel.label(12, 22, "SUN TRACKER", "caption")
    panel.gauge(90, 120, 45, max(clock.get_elevation(), 0) / 90, "sun")
    panel.gauge(250, 120, 45, solar.tilt() / 90, "tilt")
    panel.gauge(410, 120, 45, solar.get_output() / 50, "output")
    panel.draw_text(12, 185, f"{round(solar.get_output())} W of 50 W", 12, "text-muted")
```

## Machine Room (1×2 tall, interactive)

Generator efficiency rows plus **working breaker switches** through [[Power Control]] (a shared authority, so this card changes real state). Switching a machine off pauses its script and preserves setpoints; switching on resumes it.

```python
MACHINES = [
    ("o2gen_1", "Oxygen Gen"),
    ("heater_1", "Heater"),
    ("pressure_1", "Pressure Gen"),
]                                   # add every generator you own
power = get_component("power_control")

while True:
    panel.clear()
    panel.label(12, 22, "MACHINE ROOM", "caption")

    y = 56
    for mid, name in MACHINES:
        on = power.is_powered(mid)
        panel.status_dot(20, y, 5, "running" if on else "idle")
        panel.draw_text(36, y, name, 13)

        e = get_component(mid).efficiency() if on else 0
        panel.progress_bar(160, y - 6, 160, 10, e / 100, "success" if e >= 90 else "warning")
        panel.draw_text(326, y, f"{round(e)}%", 11, "text-muted")

        want = panel.switch("pw_" + mid, 400, y - 10, on, "")
        if want != on and power.can_power_off(mid):
            power.set_powered(mid, want)
        y += 44
```

## See also

- [[Starter Scripts]]: the machine-side scripts these cards watch
- [[Control Room]]: card sizes, limits, theme tokens
- [[Signal Bus Guide]]: feeding cards custom telemetry from your own scripts
