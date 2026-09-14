---
tags:
  - type
  - exploration
aliases:
  - Marker
title: "Marker"
---

One map annotation. **Returned by:** `markers.get()` / `markers.list()`

| Member | Returns | Meaning |
| --- | --- | --- |
| `.id` | string | The stable identity passed to `markers.place(...)`; pass back to `get` / `remove`, and use prefixes to group families |
| `.x` / `.y` | number | World coordinates in meters. Feed straight to `self.nav.set_target(m.x, m.y)`, a drone `self.go_to(m.x, m.y)`, or `construction_blueprint.plan_structure(kind, m.x, m.y)` |
| `.label` | string | Display text on the map (empty = the map shows the id) |
| `.note` | string | Longer hover note (empty when none) |
| `.icon` | string | Pin glyph: `"pin"`, `"x"`, `"check"`, `"circle"`, `"flag"`, `"crosshair"`, `"warning"`, `"hammer"`, `"resource"`, `"power"`, `"fluid"`, `"star"` |
| `.color` | string | `"neutral"`, `"accent"`, `"success"`, `"warning"`, `"error"`, `"violet"` |

## See also

- [[Map Markers]] and [[Map Markers Guide]]
