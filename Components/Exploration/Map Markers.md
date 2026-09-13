---
tags:
  - component
  - exploration
aliases:
  - markers
---
# Map Markers

Annotates the Planet Map from your scripts. Get it with `get_component("markers")` after **Cartography** unlocks, then `markers.place("survey.rover_1.empty:120:-40", 120, -40, "No contact", "x")` to drop a marker anywhere in the world, instantly, with no vehicle and no materials. Markers are notes, not blueprints: to actually build somewhere, pass the coordinates to `construction_blueprint.plan_structure(...)`. Store structured data in the [[Data Archive]] under the same id.

**Access:** `get_component("markers")` · Like every component, exposes `.id` and `.name`.

## Methods

### .place(id, x, y, label="", icon="pin", color="accent", note="")
Create or **rewrite** one marker. Reusing an id moves and restyles that marker instead of adding a second one, so a script that restarts after a save does not fill the map with duplicates. Coordinates are world meters and keep their fractions. Organize families of markers by id prefix, and include the controlling machine in the prefix, as in `"survey.rover_1."`, so two scripts cannot overwrite each other.

**Returns:** [[ActionResult]]

| Status | Kind | Meaning |
| --- | --- | --- |
| `"ok"` | success | Marker placed or rewritten |
| `"invalid_key"` | rejection | The supplied key is invalid |
| `"invalid_coords"` | rejection | The supplied coordinates are invalid |
| `"out_of_bounds"` | rejection | Position lies outside the valid world bounds |
| `"invalid_icon"` | rejection | Not one of the available glyphs |
| `"invalid_color"` | rejection | Not one of the available colors |
| `"invalid_text"` | rejection | Text longer than the field allows |
| `"limit_reached"` | rejection | The collection already holds its maximum number of entries |

### .get(id)
Read one marker by id.

**Returns:** The [[Marker]] with that id, or `None`. **Raises:** `ValueError` for a malformed id.

### .list(prefix="")
Read markers as a list sorted by id. Pass a prefix such as `"build."` to read one family. Loop the result to route a vehicle: `for m in markers.list("build."): self.nav.set_target(m.x, m.y)`.

**Returns:** List of `Marker` values sorted by id. **Raises:** `ValueError` for a malformed prefix.

### .remove(id)
Delete one marker by id.

**Returns:** ActionResult · Outcomes: `"ok"` / `"not_found"` / `"invalid_key"`

### .clear(prefix)
Delete a whole family of markers by id prefix, then place the current ones again to keep a family in step with what your script now believes. The prefix is required: `markers.clear("")` deletes **every** marker on the planet, including the ones you placed by hand, and nothing records who placed what.

**Returns:** [[CountResult]] · Outcomes: `"ok"` (affected `.count` entries) / `"no_op"` / `"invalid_key"`

## Limits

A planet holds up to **256 markers**. Ids are 1-64 characters using letters, numbers, `_`, `.`, `:`, or `-`. Labels are up to 48 characters and notes up to 240.

## See also

- [[Map Markers Guide]]: patterns and habits
- [[Marker]]: the marker object type
