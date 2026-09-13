---
tags:
  - component
  - terraforming
  - biology
aliases:
  - bio_collector_1
---
# Bio Collector

Automates the Collect step of the biology loop, fetching a field specimen into its cargo slot on its own. It does nothing until a script tells it where to collect.

**Stats:** Power in -5 W · Buy from the Shop for 3,000 cr.

**Access:** `self` / `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Methods

### .outpost
The outpost where this building is deployed, as an [[OutpostRef]].

**Returns:** `OutpostRef`

### self.scan()
Lists fragment locations in this outpost's biome, nearest first. Each [[FragmentLocation]] includes `coords`, distance, and whether it has been **cataloged**. Cataloged locations also reveal their fragment id, name, and rarity; unknown locations leave those details as `None`. To identify an unknown location, collect it with `bio_collector.collect(location.coords)` and analyze it at a [[Bio Lab]]. Recipes and creature identity are not revealed here. Analyzed fragments also appear in `journal.cataloged_fragments(...)`.

**Returns:** List of `FragmentLocation`, sorted nearest-first

### self.collect(coords) `SELF ONLY`
Retrieve the fragment at `coords` from `scan()` and place it in the collector's cargo slot. The trip takes ~0.1-0.3 h in every biome, depending on distance; the script pauses until collection finishes.

**Returns:** [[ActionResult]] · Outcomes: `"ok"` / `"busy"` (transient) / `"cargo_occupied"` / `"invalid_coords"` / `"no_fragment"`

### self.discard() `SELF ONLY`
Discard the specimen currently held in collector cargo. Use this when the collector picked up a specimen you do not want to send to a Bio Lab.

**Returns:** ActionResult · Outcomes: `"ok"` / `"empty"` / `"busy"` (transient)

### self.cargo
The collected [[Specimen]] waiting for transfer, or `None` if the slot is empty. Pre-analyze, `cargo.fragment_id` / `cargo.rarity` / `cargo.recipe` are `None`; `cargo.coords` and `cargo.distance` are always available. Cleared when a Bio Lab takes it with `self.take_from(collector)`.

**Returns:** `Specimen` or `None`

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].

## The biology loop

1. **Bio Collector** `scan()` and `collect(coords)` (this machine)
2. [[Bio Lab]] `take_from()`, `analyze()`, `load()`, `extract()`
3. [[Bio Exchange]] `set_order()` and `deliver()` for credits

## See also

- [[First Biology Loop]]: the tutorial
- [[Journal]]: `cataloged_fragments()` for known fragment coords
