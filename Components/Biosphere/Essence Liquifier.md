---
tags:
  - component
  - biosphere
aliases:
  - essence_liquifier_1
---
# Essence Liquifier

Renders native life-form samples down into their biome's **essence fluid**. It only accepts life forms from its own outpost's biome, and produces that biome's essence.

**Stats:** Type Biosphere · Power in variable (draws from grid) · Produces one biome-matched essence port (Frozen / Coastal / Geothermal / Volcanic / Deep), buffer 50 t · Input buffer 50 units

**How to obtain:** Requires the **Biosphere** research (Terraform Index 210,000). Buy from the Shop for 35,000 cr.

**Access:** `self` / `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Methods

### .outpost
The outpost where this building is deployed, as an [[OutpostRef]].

### .input
[[InputSlot]] for life-form samples **native to this outpost's biome**. Machine and storage sources must share the outpost; Inventory works only at home. A wrong-biome sample is rejected without being moved. `eject(...)` recovers staged samples to an explicit local destination.

### .essence_rate()
Current biome essence output in t/h. Base 1 t/h life-form intake at 100% outpost efficiency, times the loaded life form's rarity yield (common ×5, uncommon ×10, rare ×25). Reads 0 when the machine cannot run or buffer its next whole output.

**Returns:** Number (t/h)

### .yield_multiplier()
Unscaled essence tons per ton of the life form currently loaded: **5 common, 10 uncommon, 25 rare**; 0 when the input is empty.

**Returns:** Number

### .is_stalled()
`True` whenever `stall_reason()` is not `"ok"`.

**Returns:** Boolean

### .stall_reason()
Why the Liquifier is idle: `"no_biome"` (no valid host outpost), `"no_input"` (feed it native-biome life forms), `"output_full"` (next whole rarity-scaled yield cannot fit and a configured output cannot drain), `"unconnected"` (next yield cannot fit and the essence output has no effective peer relationship), or `"ok"`.

**Returns:** String

### .biome()
The host outpost's biome: `"frozen"`, `"coastal"`, `"geothermal"`, `"volcanic"`, or `"deep"`; `None` when the machine has no valid outpost. Determines which life-form items the input accepts.

**Returns:** String or `None`

### .frozen_essence_out (etc.)
This machine exposes **exactly one essence output, named for its outpost biome**: `frozen_essence_out`, `coastal_essence_out`, `geothermal_essence_out`, `volcanic_essence_out`, or `deep_essence_out`. It is a [[FluidPort]]: connect to a local Liquid Tank or matching [[Biomass Mixer]] input; a remote peer also needs a completed conflict-free Liquid Pipe route. Call `self.biome()` to confirm which port exists.

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].

## See also

- [[Biosphere Biomass Tier]]: the essence-to-biomass pipeline
- [[Drone]]: bio extraction fills the sample supply
