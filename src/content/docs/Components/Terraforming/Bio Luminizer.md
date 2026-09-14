---
tags:
  - component
  - terraforming
  - biology
aliases:
  - bio_luminizer_1
title: "Bio Luminizer"
---

Tints a **coastal fragment's glow** to a target color using three built-in colored lamps. The lamps bleed into each other, so a script solves the brightness mix that lands on the exact target.

**Stats:** Power in -12 W · Input buffer 10 · Output buffer 10

**How to obtain:** Requires the **Bioluminescent Infusion** research (Temperature 90). Buy from the Shop for 60,000 cr.

**Access:** `self` / `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Methods

### .outpost
The outpost where this building is deployed, as an [[OutpostRef]].

### self.load(fragment_id, properties=None, property_match=None) `SELF ONLY`
Pull a raw glowing coastal sample of `fragment_id` from `self.input` into the chamber, e.g. `self.load("gw_caudal_fin")`. Optional `properties` and `property_match` use the standard any/subset/exact convention. Read its start color with `self.chamber.glow`.

**Returns:** [[ActionResult]] · Outcomes: `"ok"` / `"chamber_occupied"` / `"not_in_input"` / `"invalid_fragment"` / `"invalid_properties"` / `"invalid_property_match"` / `"busy"` (transient)

### self.chamber
The [[ChamberSample]] loaded right now, or `None`. Read `.glow` for its starting color and `.fragment_id` for its item id.

### self.lamp_signature(channel)
The RGB-per-unit `[r,g,b]` a lamp adds per brightness step: its impurity. `self.lamp_signature("red")` is roughly `[6, 1, 1]`: mostly red, but it bleeds a little into green and blue. Read all three (`"red"`, `"green"`, `"blue"`) to build the 3×3 you invert. Fixed hardware: read once and reuse. `None` for an unknown channel.

**Returns:** `[r,g,b]` or `None`

### self.glow()
The chamber's current resulting glow `[r,g,b]` given the lamps set right now. It reflects `set_lamps(...)` immediately, so use it to verify your solve before committing: `if self.glow() == target: self.infuse()`. `None` when the chamber is empty.

**Returns:** `[r,g,b]` or `None`

### self.set_lamps(r, g, b) `SELF ONLY`
Set the three lamp brightnesses, e.g. `self.set_lamps(7, 13, 4)`. Each is a whole number 0-40; the exact answer is always an integer, so `round()` your computed values. Fractional or out-of-range values raise an argument error (not silently floored). Re-idles to 0 when the script stops.

**Returns:** ActionResult · Outcomes: `"ok"` / `"busy"` (transient)

### self.infuse() `SELF ONLY`
Produce a **Luminous** sample at the current glow in `self.output`, preserving every existing property and adding the tuned glow.

**Returns:** ActionResult · Outcomes: `"ok"` / `"output_full"` / `"empty"` / `"busy"` (transient)

### self.discard() `SELF ONLY`
Stage the unchanged chamber sample in `self.output`.

**Returns:** ActionResult · Outcomes: `"ok"` / `"empty"` / `"busy"` / `"output_full"`

### self.input
The [[InputSlot]] for raw coastal samples. Inventory is a source only at Nocturna Base; remote Luminizers use a same-outpost Storage Bin/Warehouse.

### self.output
The [[OutputSlot]] for Luminous or ejected samples. Exact sample properties are preserved.

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].

## See also

- [[Bio Exchange]]: `target_glow` on Bio Orders is what this machine hits
