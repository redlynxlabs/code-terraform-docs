---
tags:
  - component
  - terraforming
  - biosphere
aliases:
  - refiner_1
---
# Refiner

Refines **raw exotic feedstock** into creature-grade gas or liquid, using **tar** as a reagent. Only uncommon and rare exotics need refining; commons are used directly. Recipes unlock through Biolab orders.

**Stats:** Power in variable · Input buffer 50 · Recipes 4 available

**How to obtain:** Requires the **Exotic Husbandry** research (Wildlife 1,000). Buy from the Shop for 80,000 cr.

**Access:** `self` / `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Methods

### .outpost
The outpost where this building is deployed, as an [[OutpostRef]].

### .list_recipes()
Lists the refining recipes unlocked through Bio Lab orders, one [[Recipe]] per exotic fluid. Locked recipes do not appear. Each recipe includes `.tier`, names its exact raw feedstock in `.input_fluid`, gives port tons consumed per run in `.fluid_inputs`, lists tar in `.inputs`, and identifies the refined product and output port through `.output_fluid` / `.fluid_outputs`.

**Returns:** List of unlocked `Recipe` objects

### .find_recipe(recipe_id)
Find one unlocked refining recipe by id. Returns its `Recipe` object, or `None` when the id is unknown, locked, or belongs to another machine.

**Returns:** `Recipe` or `None`

### .set_recipe(recipe_or_id) `SELF ONLY`
Pick which exotic to refine, e.g. `self.set_recipe("refine_chlorine")`. Once set, the refiner crafts automatically whenever the raw feedstock plus tar are present and the out port has room.

**Returns:** [[ActionResult]] · Outcomes: `"ok"` / `"unknown_recipe"` / `"offline"` (transient) / `"recipe_locked"` / `"busy"` (transient) / `"output_busy"` (incompatible fluid remains in the output)

### .clear_recipe() `SELF ONLY`
Unset the selected refine recipe and leave the Refiner idle. Tar and raw feedstock inputs are preserved because they are staged supply.

**Returns:** ActionResult · Outcomes: `"ok"` / `"busy"` / `"material_present"`

### .purge_input() `SELF ONLY`
Vents whatever raw feedstock is sitting in `gas_in` and `liquid_in`, releasing the port so it can accept a different fluid. The feedstock ports take the first fluid that reaches them and then only accept that one, so a port wired to the wrong Cap holds a fluid the recipe cannot use. Purge it, rewire, and carry on: `self.purge_input()` then `self.gas_in.connect("Raw Sulfur Cap")`. The vented fluid is destroyed, and tar in the input bin is untouched.

**Returns:** ActionResult · Outcomes: `"ok"` / `"empty"` / `"busy"` (transient)

### .get_recipe()
Returns the current recipe id, or `""` when none is set. Recipe ids: `"refine_sulfur_gas"`, `"refine_cryofluid"`, `"refine_chlorine"`, `"refine_quicksilver"`.

**Returns:** String

### .get_recipe_inputs()
Dict mapping each input `item_id` → units consumed per craft. For the Refiner this is the **tar cost**, e.g. `{"tar": 5}` for a rare exotic. Empty dict if no recipe is set. (The raw-feedstock fluid amount is metered on the input ports, not listed here.)

**Returns:** Dict

### .is_running()
`True` while a refine craft is actively advancing this tick (recipe set and unlocked, raw feedstock plus tar present, out port has room). `False` when stalled, idle, or powered off.

**Returns:** Boolean

### .is_stalled()
`True` when the refiner is powered and a recipe is set but the craft can't advance, for example because raw feedstock is missing (check `self.gas_in.level()` / `self.liquid_in.level()`), tar has run out (refill the input bin), or the refined-fluid out port is full (downstream backpressure; drain the out tank). `False` when unpowered, running, or no recipe is set. Poll to diagnose a stuck line.

**Returns:** Boolean

### .get_rate()
Refined exotic produced this tick in t/h. 0 when stalled or idle. Use to confirm throughput while balancing feedstock against demand.

**Returns:** Number (t/h)

### .get_progress()
Fraction 0-1 through the current refine craft. Resets to 0 each time a craft completes and starts again if the feedstock plus tar remain.

**Returns:** Number (0-1)

## Ports

### .gas_in / .liquid_in
Receives raw exotic gas / liquid. Connect a tank holding the raw fluid, e.g. `self.gas_in.connect("Raw Chlorine Tank")`. See [[FluidPort]].

### .gas_out / .liquid_out
Sends refined gas (Sulfur Gas / Chlorine) or refined liquid (Cryofluid / Quicksilver) onward to a destination tank. See [[FluidPort]].

### .input
Loads the **tar** consumed during refining: `self.input.connect("Tar Bin")` then `self.input.take("tar", 20)`. This slot holds only tar; use `eject(...)` to recover staged tar while the machine is idle. See [[InputSlot]].

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].

## See also

- [[Wildlife Supply]]: the prospect → capture → refine → meter chain
- [[Exotic Gas Cap]] and [[Exotic Spring Tap]]: raw feedstock sources
