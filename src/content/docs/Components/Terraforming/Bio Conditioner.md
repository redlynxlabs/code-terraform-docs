---
tags:
  - component
  - terraforming
  - biology
aliases:
  - bio_conditioner_1
title: "Bio Conditioner"
---

Inspects a **deep-biome fragment** against a fixed rulebook, quizzing your script on its properties one at a time. Judge each one correctly to pass the fragment; **a single wrong call burns the whole specimen**.

**Stats:** Power in -25 W · Input buffer 10 · Output buffer 10

**How to obtain:** Requires the **Deep-Sea Conditioning** research (Temperature 1,200). Buy from the Shop for 225,000 cr.

**Access:** `self` / `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Methods

### .outpost
The outpost where this building is deployed, as an [[OutpostRef]].

### self.report()
The loaded fragment's full condition report as `{property: value}` for all 10 properties (`glow`, `brightness`, `smell`, `gunk`, `cracks`, `feel`, `twitch`, `bugs`, `weight`, `sound`). Read the whole thing: the combo rules need siblings (brightness reads glow, weight reads gunk, sound reads cracks). Word properties are strings, numbers are numbers. `{}` if nothing is loaded.

**Returns:** Dict of all ten condition properties

### self.properties()
Lists the ten property ids in their fixed inspection order, from `"glow"` through `"sound"`. The order is the same for every Deep fragment, making it suitable for a general inspection loop.

**Returns:** List of the 10 property ids

### self.fragment()
The raw deep fragment id loaded in the chamber, or `None` if empty.

**Returns:** Fragment id or `None`

### self.stage()
The current QC stage: 1-5 while a run is live, or 0 when none is active (nothing loaded, or the run just resolved). Each stage quizzes one property.

**Returns:** Number (0-5)

### self.current()
The property this stage is quizzing: one of the 10 ids (look its value up in `report()`, apply its rule, then `accept()` / `reject()`), or `None` if no run is active. You can't predict which 5 of the 10 come up, so encode every rule.

**Returns:** Property id or `None`

### self.lights()
The 5 stage results so far: a list of `"green"` (correct call), `"red"` (a miss, run over), and `"pending"` (not reached). They light one at a time as you answer.

**Returns:** List of 5 stage results

### self.is_running()
`True` while a 5-stage run is live (a fragment is loaded with stages left). Drive the gauntlet with `while cond.is_running(): prop = cond.current(); ...`. Goes `False` when the run finishes, burns, or nothing is loaded.

**Returns:** Boolean

### self.load(fragment_id, properties=None, property_match=None) `SELF ONLY`
Pull one raw deep sample from `self.input` into the chamber and start a fresh 5-stage run. Optional `properties` and `property_match` use the standard any/subset/exact convention.

**Returns:** [[ActionResult]] · Outcomes: `"ok"` / `"chamber_occupied"` / `"not_in_input"` / `"invalid_fragment"` / `"invalid_properties"` / `"invalid_property_match"` / `"busy"` (transient)

### self.eject() `SELF ONLY`
Stage the unchanged chamber sample in `self.output` and end the run.

**Returns:** ActionResult · Outcomes: `"ok"` / `"empty"` / `"busy"` / `"output_full"`

### self.accept() `SELF ONLY`
Stamp the current property as **passing**.

**Returns:** ActionResult · Outcomes: `"ok"` / `"conditioned"` (specimen completed conditioning) / `"burned"` (an incorrect decision burned the specimen and emptied the chamber) / `"no_run"` / `"busy"` / `"output_full"`

### self.reject() `SELF ONLY`
Stamp the current property as **damaged**.

**Returns:** ActionResult · same outcomes as `accept()`

### self.input
The [[InputSlot]] for raw deep samples. Inventory is a source only at Nocturna Base; remote Conditioners use a same-outpost Storage Bin/Warehouse. Recover a mistaken property variant with `eject(...)` before loading it into the chamber.

### self.output
The [[OutputSlot]] for Conditioned or ejected samples. Exact sample properties are preserved.

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].
