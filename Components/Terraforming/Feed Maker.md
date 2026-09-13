---
tags:
  - component
  - terraforming
  - biosphere
aliases:
  - feed_maker_1
---
# Feed Maker

Crafts the creature feeds that [[Habitat]] colonies eat, working like the [[Fabricator]] from a recipe you choose. Each creature's recipe unlocks through a Biolab order, so it only makes what you've unlocked.

**Stats:** Power in variable · Output buffer 50 · Stockpile 200 (mixed) · Recipes 16 available

**How to obtain:** Requires the **Wildlife** research (Plants 2,250,000). Buy from the Shop for 50,000 cr.

**Access:** `self` / `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Methods

### .outpost
The outpost where this building is deployed, as an [[OutpostRef]].

### .list_recipes()
Lists the feed recipes unlocked through Bio Lab orders, one [[Recipe]] per creature whose feed you can craft. Locked recipes do not appear. Each recipe includes its tier, id, name, inputs, output, duration, and power draw.

**Returns:** List of unlocked `Recipe` objects

### .find_recipe(recipe_id)
Find one unlocked feed recipe by id without looping through `list_recipes()`. Returns its `Recipe` object, or `None` when the id is unknown, locked, or belongs to another machine.

**Returns:** `Recipe` or `None`

### .set_recipe(recipe_or_id) `SELF ONLY`
Pick which creature feed to craft by id or by passing a Recipe from `list_recipes()`, e.g. `self.set_recipe("craft_feed_salt_tortoise")`. Once set, the machine crafts automatically whenever the stockpile holds the inputs and the output bin has room.

**Returns:** [[ActionResult]] · Outcomes: `"ok"` / `"unknown_recipe"` / `"offline"` (transient) / `"recipe_locked"` / `"busy"` (transient) / `"material_mismatch"`

### .clear_recipe() `SELF ONLY`
Unset the selected feed recipe and leave the Feed Maker idle. The input stockpile stays loaded.

**Returns:** ActionResult · Outcomes: `"ok"` / `"busy"` / `"material_present"`

### .get_recipe()
Returns the current recipe id, or `""` when none is set (or the set recipe is no longer unlocked). Recipe ids follow the pattern `"craft_feed_<creature>"`, one per creature (e.g. `"craft_feed_salt_tortoise"`, `"craft_feed_glacial_wyrm"`).

**Returns:** String

### .get_recipe_inputs()
Dict mapping each input `item_id` → units consumed per craft for the current recipe (empty dict if no recipe set). Iterate it to know what to stock: `for item, qty in self.get_recipe_inputs().items(): self.input.take(item, qty * 5)`.

**Returns:** Dict

### .get_stockpile()
Dict mapping each `item_id` currently in the input stockpile → its unit count.

**Returns:** Dict

### .get_stockpile_used() / .get_stockpile_capacity()
Total units across every material in the input stockpile, and the combined shared cap.

**Returns:** Number

### .is_running()
`True` while a craft is actively advancing this tick (recipe set, inputs present, output has room). `False` when starved, output-full, idle, or powered off. Poll to detect a stalled line.

**Returns:** Boolean

### .get_progress()
Fraction 0-1 through the current craft. Resets to 0 each time a craft completes and starts again if inputs remain.

**Returns:** Number (0-1)

### .get_output_count()
Completed feed units waiting in the output bin for pickup. Push them onward with `self.output.send(...)` before the bin fills (a full output bin stalls crafting).

**Returns:** Number

### .input
Loads forage and life forms into the Feed Maker: `self.input.connect("Forage Bin")` then `self.input.take("forage", 8)`. This is a multi-material stockpile; use `eject(...)` to recover a staged material while the machine is idle. See [[InputSlot]].

### .output
Sends finished feed to a bin or Habitat supply chain: `self.output.connect("Feed Bin")` then `self.output.send("feed_salt_tortoise", 10)`. See [[OutputSlot]].

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].

## See also

- [[Wildlife Creature Profiles]]: Forage as the calorie base
- [[Feed Maker Recipes]]: the full recipe table
