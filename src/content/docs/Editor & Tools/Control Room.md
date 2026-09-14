---
tags:
  - guide
  - editor
aliases:
  - Custom Panels
  - Cards
title: "Control Room"
---

The Control Room is a top-level page for **cards**: script-driven panels that draw live dashboards and can issue commands through shared game APIs. Open the Control Room page, click **+ New Card**, and a fresh panel script is bound to a canvas.

A panel script runs every game tick. The pattern is always the same:

```python
while True:
  panel.clear()
  # ... call panel.draw_X(...) and panel.widget(...) here ...
```

Your script controls the layout, colors, data shown, and update cadence. The same read APIs you use from machine scripts work here too: `get_component(...)`, `clock.get_elevation()`, `orders.list_orders()`. Panels can read component state; they change the base only through **shared authorities** such as `power_control`, `shop`, `comms`, `inventory`, or `atmosphere`.

## Common uses

Panels can read any component exposed to scripts. Common uses include:

- **Atmospheric history**: three progress bars for O₂ / N₂ / pressure with a 50-tick spark line below
- **Fleet status board**: one row per vehicle with a status dot, name, current activity, and battery bar
- **Sun-tracker monitor**: three gauges for sun elevation, panel tilt, and solar efficiency
- **Tank levels**: a bar chart showing every fluid buffer at the base, with net flow text below
- **Active order briefing**: wrapped text of the contractor's brief plus an iron-ingot icon and progress bar
- **Storage inventory**: every storage bin's icon, name, fill percent, and count

The data comes from existing APIs; panels provide a canvas and widgets for displaying it.

## The widget set

**Fifteen named widgets** for common patterns:

- **Layout:** `card`, `divider`, `label`
- **Indicators:** `status_dot`, `toggle`, `pill`, `counter`
- **Bars:** `progress_bar`, `vertical_bar`, `bar_chart`
- **Curves:** `gauge`, `spark_line`
- **Interactive** (the player clicks them): `button`, `switch`, `slider`. Read them each tick to act on the player's input.

**Ten primitives** for everything the named widgets don't cover:

- `draw_text` (with optional `wrap`), `draw_icon`
- `draw_rect` / `fill_rect`, `draw_circle` / `fill_circle`, `draw_line`
- `clear`, `width`, `height`

Every widget that takes a `color` parameter accepts theme tokens: `"accent"`, `"success"`, `"warning"`, `"error"`, `"text-bright"`, `"text-secondary"`, `"text-muted"`, `"text-value"`. Cards can also paint with surface tokens: `bg-base`, `bg-surface`, `bg-panel`, `border`, `border-dim`. Wrap a `card(x, y, w, h, title)` for the bordered and titled frame, fill zones with `fill_rect(x, y, w, h, "bg-surface")`, and a manage-style row is `status_dot` (green) + `draw_text` (name) + `button` (play/manage). Theme tokens resolve from the active theme whenever the script redraws the card.

See [[Panel API]] for the full method list.

## A complete working example

A fleet status panel:

```python
rover = get_component("rover_1")
pioneer = get_component("pioneer_1")

while True:
  panel.clear()
  panel.label(12, 22, "FLEET", "caption")

  panel.status_dot(20, 50, 5, "running")
  panel.draw_text(38, 50, rover.name(), 13)
  panel.progress_bar(360, 44, 110, 10, rover.battery.level(), "success")

  panel.status_dot(20, 80, 5, "running")
  panel.draw_text(38, 80, pioneer.name(), 13)
  panel.progress_bar(360, 74, 110, 10, pioneer.battery.level(), "success")
```

No `sleep()` needed: the interpreter paces the loop automatically. The panel repaints every game tick.

## Watch for...

> [!warning] Cards command only through shared authorities
> A card has no `self` over a machine, so a machine's own actions (`set_throttle`, `set_recipe`, `move_to`, `mine`) don't work from a card. It can still call shared authorities such as `power_control` (breakers), `shop` (buy/sell), `comms` (Signal Bus), `inventory`, and `atmosphere`. Treat cards as trusted automation because they can change base state.

> [!warning] The canvas does not auto-clear
> Always call `panel.clear()` at the top of every loop iteration, or old paint will pile up under new paint and the panel will look smeared.

Coordinates are in logical pixels. A 1×1 card is 500×200; two-column cards are 1000 pixels wide and two-row cards are 400 pixels high. CSS scales the visual to the screen, so use `panel.width()` / `panel.height()` when the script must adapt to the card's span.

## Limits

- **50 cards per save**, max. Past that, **+ New Card** is grayed out. Delete one to make room.
- **Board density**: choose 2-6 columns from the selector above the board. The untouched default uses 2 for ordinary workspaces, 4 for 4K-class workspaces, and 6 for sufficiently wide ultrawides. A manual choice persists.
- **Four card sizes**: 1×1, 2×1 (wide), 1×2 (tall), and 2×2 (big), selected directly from the card-size menu. The logical canvas scales with the span, so draw relative to `width()` / `height()` and your card reflows at any size.
- **One script per card.** Want separate concerns? Make multiple cards.
