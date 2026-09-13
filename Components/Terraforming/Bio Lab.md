---
tags:
  - component
  - terraforming
  - biology
aliases:
  - bio_lab_1
---
# Bio Lab

Automates the Analyze and Extract steps of the biology loop, studying a specimen and pulling a usable sample from it. It stays idle until a script drives it.

**Stats:** Power in -5 W · Input buffer 30 · Stockpile 30 (mixed) · Buy from the Shop for 5,000 cr.

**Access:** `self` / `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Methods

### .outpost
The outpost where this building is deployed, as an [[OutpostRef]].

### self.take_from(collector) `SELF ONLY`
Pull the specimen out of a [[Bio Collector]]'s cargo into this lab's specimen chamber. The source Collector must be at the same outpost as this Lab; pass an explicit collector reference: `self.take_from(get_component("bio_collector_1"))`.

**Returns:** [[ActionResult]]

| Status | Kind | Meaning |
| --- | --- | --- |
| `"ok"` | success | Specimen transferred into the chamber |
| `"busy"` | transient | The Bio Lab is currently analyzing or extracting |
| `"input_occupied"` | rejection | The chamber already contains a specimen |
| `"not_found"` | rejection | The supplied component reference does not exist |
| `"source_empty"` | rejection | The Collector's cargo contains no specimen |
| `"source_busy"` | transient | The Collector is still completing a collection trip |
| `"wrong_outpost"` | rejection | The Collector belongs to a different outpost |
| `"invalid_source"` | rejection | Not a valid Bio Collector |

### self.analyze() `SELF ONLY`
Identify the lab's current fragment and reveal its extraction recipe. Analysis takes ~0.1 h in every biome; the script pauses until it finishes. A successful analysis adds the fragment to `journal.cataloged_fragments(planet_id)`. Creature identity stays hidden until all five fragments are cataloged, then the creature appears in `journal.cataloged_creatures(planet_id)`.

**Returns:** [[AnalyzeResult]] (payload `.info`) · Outcomes: `"ok"` / `"busy"` (transient) / `"input_empty"` / `"invalid_specimen"`

### self.load(reagent_id, qty, properties=None, property_match=None) `SELF ONLY`
Stage a whole-number reagent quantity for the next `extract()` by consuming it from `self.input`. `self.load("alkaline_buffer", 4)`. Reagents are sold by the [[Shop]]; both UI purchases and `shop.buy(reagent_id)` place them in base Inventory. Optional `properties` and `property_match` use the standard any/subset/exact convention. Fractional or negative quantities raise an argument error. **Calling `extract()` with a mismatched recipe destroys the loaded reagents.**

**Returns:** ActionResult · Outcomes: `"ok"` / `"busy"` / `"invalid_reagent"` / `"invalid_qty"` / `"invalid_properties"` / `"invalid_property_match"` / `"insufficient_input"`

### self.unload_reagents() `SELF ONLY`
Stage all loaded reagents in `self.output` without touching the specimen. Use this when you staged the wrong recipe.

**Returns:** ActionResult · Outcomes: `"ok"` / `"empty"` / `"busy"` / `"output_full"` (reagents remain loaded)

### self.extract() `SELF ONLY`
Consume `loaded_reagents` and place 1 sample of the analyzed specimen in `self.output`, preserving its exact properties. Extraction takes ~0.1 + 0.05 × units h in every biome; the script pauses until it finishes.

**Returns:** ActionResult

| Status | Kind | Meaning |
| --- | --- | --- |
| `"ok"` | success | Reagents consumed; one sample staged in the output |
| `"output_full"` | rejection | The completed extraction is preserved because the output has no capacity |
| `"recipe_mismatch"` | rejection | Loaded reagents don't match the recipe; **reagents destroyed**, specimen preserved |
| `"busy"` | transient | Taking, analyzing, or extracting |
| `"input_empty"` | rejection | No specimen to extract |
| `"not_analyzed"` | rejection | The loaded specimen has not been analyzed |
| `"invalid_specimen"` | rejection | No recognizable fragment identity |

### self.discard() `SELF ONLY`
Drop the current specimen and stage any loaded reagents in `self.output`. Use it after `analyze()` reveals a fragment you do not need.

**Returns:** ActionResult · Outcomes: `"ok"` / `"input_empty"` / `"busy"` / `"output_full"`

### self.specimen
The [[Specimen]] in the lab chamber right now, or `None`. Read `self.specimen.stage` to distinguish `"collected"` from `"analyzed"`. Before analysis its identifying fields are hidden; after analysis its `fragment_id`, `rarity`, and `recipe` are populated.

### self.loaded_reagents
Dict `{reagent_id: qty}` of reagents staged for the next `extract()`. Iterate `.items()` to inspect.

### self.input
The [[InputSlot]] for scripted reagent routing. It holds **one reagent item id at a time** and stays latched to that id until `load()` consumes the remaining units or `flush()` discards them. `stacks()` lists property-distinct variants and does not mean the port accepts multiple reagent types. Connect Inventory only at Nocturna Base; at another outpost connect a same-outpost Storage Bin/Warehouse. Call `take(...)` before `load(...)`.

### self.output
The [[OutputSlot]] for extracted property-bearing samples and unloaded reagents. Connect any eligible local item store and drain it with `send(...)`.

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].

## See also

- [[Long-Running Scripts]]: the restart-safe Bio Lab loop
- [[Bio Collector]] (step 1) and [[Bio Exchange]] (delivery)
