---
tags:
  - component
  - biosphere
aliases:
  - plant_terraformer_1
---
# Plant Terraformer

The **sole converter from harvested physical Forage to permanent Plants km²**. Load its input through ordinary timed item transfers; its high-capacity feeder handles 16 items per step at Mk I and 80 at Mk II. Each phase adds Water, Salt, Fertilizer, then Growth Accelerant. **Mk I stops at the Fields threshold; Mk II carries the final two phases.**

**Stats:** Type Biosphere · Power in variable (draws from grid) · Consumes Water, buffer 60 t (330 t at Mk II) · Stockpile 1,243 units (mixed) · Tiers: Mk II

**How to obtain:** The recipe unlocks with the **Plant Terraformer** research (Biomass 2,000). Fabricate a Plant Terraformer Kit on a Fabricator: 5× Machine Frame, 3× Control Unit, 5× Circuit Panel, 4× Liquid Pipe Segment, 10 t Water. Deploy from Inventory.

**Access:** `self` · Like every component, exposes `.id` and `.name`.

## Methods

### .outpost
The outpost where this building is deployed, as an [[OutpostRef]].

### .set_enabled(enabled) `SELF ONLY`
Enable or pause conversion. `True` starts a cycle whenever the onboard holders and Water can supply at least one proportional Forage unit. A cycle runs **3 hours** at full outpost efficiency. Stopping the script resets the setpoint to `False`; an in-flight batch remains loaded.

**Returns:** [[ActionResult]] · Outcomes: `"ok"`

### .is_enabled() / .is_running()
Enabled: script has commanded conversion on. Running: a cycle is in progress (an unpowered or disabled machine keeps its batch but reads `False` until resume).

**Returns:** Boolean

### .tier()
Permanently installed tier (1-2). Mk II raises batch throughput and enables the late Plants recipes.

**Returns:** Number

### .status()
Exact live state: `"complete"`, `"disabled"`, `"no_power"`, `"needs_mk2"`, `"no_forage"`, `"no_water"`, `"no_salt"`, `"no_fertilizer"`, `"no_accelerant"`, or `"running"`.

**Returns:** String

### .get_progress()
Completion of the current cycle (0-1). Overcrowding slows progress proportionally; 0 when no batch is loaded.

**Returns:** Number (0-1)

### .batch_size()
Whole Forage items in the running cycle, or the batch that can load now. Full batch: **1,200 at Mk I, 6,600 at Mk II**. Limited materials or a nearby phase boundary load less; 0 while stalled, disabled, or complete.

**Returns:** Number

### .km2_rate()
Current permanent Plants output in km²/h, combining the loaded batch, the 3-hour cycle, the pinned phase exchange rate (**20 km² per Forage early, down to 1 km² per 3 Forage late**), and outpost efficiency. 0 while blocked, disabled, or complete.

**Returns:** Number (km²/h)

### .phase()
Current global Plants phase number (1-6).

**Returns:** Number

### .recipe_tier()
Derived production tier of the current cumulative conversion recipe; `None` after Continental completion.

**Returns:** Number or `None`

### .next_threshold() / .remaining()
Permanent Plants km² required for the next phase (the 5,000,000 km² ceiling at completion), and km² still needed (0 when Continental is complete).

**Returns:** Number

### .required_inputs()
Current cumulative material ids: starts with `forage`, then adds `water`, `salt`, the fertilizer category, and `growth_accelerant` across the five conversions.

**Returns:** List of strings

### .batch_requirements()
Exact amounts for the largest next batch allowed by this tier and phase, as a dict using `forage`, `water`, `salt`, `fertilizer_potency`, `growth_accelerant`. Salt and Accelerant are whole-item counts rounded up per batch; fertilizer is whole potency. It does not shrink when onboard stock is short.

**Returns:** Dict

### .fertilizer_potency(item_id)
One Fertilizer item's whole potency: **10 Mk I, 30 Mk II, 50 Mk III**.

**Returns:** Number · **Raises:** `ValueError` for any other item id

### .input
Standard timed [[InputSlot]] for Forage, Salt, Fertilizer, and Growth Accelerant. Connect Inventory, a local Storage Bin or Warehouse, or a local machine output such as a [[Crop Automator]] (after Auto Feeders research). Feeder quantum: 16 items per step at Mk I, 80 at Mk II. Holders fit one full Forage batch plus Salt and up to 10 of each support item.

### .water_in
Water [[FluidPort]] sized for one full cycle: 60 t Mk I, 330 t Mk II. Water is required from the Seedlings phase onward. Remote sources need a completed conflict-free Liquid Pipe route.

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].

## See also

- [[Plant Terraformer Guide]]: phase-by-phase strategy and supply chains
- [[Harvester]] and [[Crop Automator]]: Forage producers
