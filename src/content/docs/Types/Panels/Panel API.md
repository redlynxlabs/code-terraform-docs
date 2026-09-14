---
tags:
  - type
  - panels
aliases:
  - Panel
title: "Panel API"
---

The `panel` object available in **panel scripts only**. Create a card on the [[Control Room]] page. Draw calls return [[ActionResult]] (`"ok"`); input widgets return their live value. Coordinates are pixels on the card canvas.

## Canvas

| Call | Returns | Meaning |
| --- | --- | --- |
| `clear()` | ActionResult | Wipe the canvas. **Call at the top of every `while True:` iteration** so old paint doesn't ghost |
| `width()` / `height()` | number | Logical canvas size: 500 wide (one-column) or 1,000 (two-column); 200 tall (one-row) or 400 (two-row) |

## Layout and dashboard widgets

| Call | Meaning |
| --- | --- |
| `card(x, y, w, h, title?)` | Bordered subsection with optional title bar |
| `divider(x1, y1, x2, y2)` | Separator line in the muted border color |
| `label(x, y, text, style?)` | Semantic text: `"title"` (default, bright bold), `"caption"` (muted uppercase), `"muted"`, `"value"` (numeric readout) |
| `status_dot(x, y, r, status)` | Colored disc with glow: `"running"` green, `"paused"` warning, `"error"` red, `"idle"` muted |
| `toggle(x, y, on, label?)` | **Display-only** power-toggle pill showing the `on` value you pass; use `switch(...)` for a clickable control |
| `pill(x, y, text, color?)` | Rounded badge; color takes theme tokens (`"accent"`, `"success"`, `"warning"`, `"error"`, `"text-muted"`) or any CSS color |
| `counter(x, y, value, label?, size?)` | Big-number stat block (default size 24) |
| `progress_bar(x, y, w, h, fraction, color?)` | Horizontal fill bar; fraction clamps 0-1; default `"accent"` |
| `vertical_bar(x, y, w, h, fraction, color?)` | Vertical fill bar, fills bottom-up |
| `bar_chart(x, y, w, h, values, max?, labels?)` | Multi-bar comparison; omit `max` to auto-scale |
| `gauge(x, y, radius, fraction, label?)` | Three-quarter-circle dial sweeping 270°; optional center label |
| `spark_line(x, y, w, h, values)` | Compact trend line normalized to the series min/max; empty or single-value series no-op |

## Input widgets

State persists in the card across reloads.

### button(key, x, y, w?, h?, label?)
Clickable button. Returns `True` **the single tick it's pressed** (momentary): `if panel.button("shed", 10, 12): power.set_powered(...)`. Defaults 90×26.

**Returns:** boolean

### switch(key, x, y, default_on?, label?)
Clickable on/off switch; `default_on` seeds the first run. Returns the current boolean every tick; flips persist.

**Returns:** boolean

### slider(key, x, y, w, default?, label?)
Horizontal slider the player clicks to set a value; returns the current 0-1 number every tick, persisted. For live-tuned thresholds, buy triggers, throttle targets.

**Returns:** number

## Drawing primitives

| Call | Meaning |
| --- | --- |
| `draw_text(x, y, text, size?, color?, wrap?)` | Monospace text; `wrap` (px) enables greedy word-wrapping for logs and briefings |
| `draw_icon(x, y, item_id, size?)` | Any icon from the game catalog (default 32 px): items, fluids, creatures, machine art. Unknown ids no-op silently |
| `icon_ids()` | Sorted list of every id `draw_icon` can render |
| `draw_rect(x, y, w, h, color?)` / `fill_rect(...)` | Outlined (default `"border"`) / filled (default `"accent"`) rectangle |
| `draw_circle(x, y, r, color?)` / `fill_circle(...)` | Outlined / filled circle |
| `draw_line(x1, y1, x2, y2, color?)` | Single straight line |

## See also

- [[Control Room]]: creating cards, sizes, run model
- [[Signal Bus Guide]]: feeding cards live fleet data
