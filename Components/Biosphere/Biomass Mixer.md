---
tags:
  - component
  - biosphere
aliases:
  - biomass_mixer_1
---
# Biomass Mixer

Blends biome essences into **biomass**. The global Biomass phase sets the minimum essence diversity, while every additional well-balanced essence can raise output. **Mk II raises output 4.5× while essence demand rises only 2.4×** (87.5% more biomass per ton of essence), at five times the power draw.

**Stats:** Type Biosphere · Power in variable (draws from grid) · Consumes all five biome essences (Frozen, Coastal, Geothermal, Volcanic, Deep), buffer 30 t each · Tiers: Mk II

**How to obtain:** Requires the **Biosphere** research (Terraform Index 210,000). Buy from the Shop for 60,000 cr.

**Access:** `self` / `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Methods

### .outpost
The outpost where this building is deployed, as an [[OutpostRef]].

### .biomass_rate()
Biomass tons produced last tick, in t/h. Sum across every Mixer on the planet = total biomass production rate.

**Returns:** Number (t/h)

### .active_essences()
Number of essence input buffers currently carrying supply (0-5). The current phase decides the minimum via `required_essences()`; extra balanced essence types can increase output.

**Returns:** Number

### .mixing_essences()
Number of supplied essence types selected for the **strongest balanced mix** on the last tick (0-5). The Mixer evaluates every diversity level from the phase minimum upward, so **a weak extra feed can never reduce output**.

**Returns:** Number

### .tier()
Installed tier: 1 (Mk I) or 2 (Mk II).

**Returns:** Number

### .is_stalled()
`True` if the mixer is powered and fewer input buffers contain usable essence than the current Biomass phase requires. Buffered essence counts even without new inflow. Connect each missing essence input and complete remote Liquid Pipe routes where needed. Biomass phases only advance, never drop.

**Returns:** Boolean

### .phase()
The global Biomass phase (1-6), derived from cumulative biomass tons (same thresholds as the Sensors phase badge). Sets the minimum essence diversity; does not directly multiply output.

**Returns:** Number (1-6)

### .required_essences()
Distinct biome essences that must be supplied this phase (1-5, equal to the phase, capped at 5). Below this the Mixer stalls; more can raise output when the larger mix is balanced.

**Returns:** Number (1-5)

### Essence input ports
`.frozen_essence_in` · `.coastal_essence_in` · `.geothermal_essence_in` · `.volcanic_essence_in` · `.deep_essence_in`: one [[FluidPort]] per biome essence. Wire with `self.<port>.connect(...)`.

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].

## See also

- [[Biosphere Biomass Tier]]: the phase system and essence logistics
- [[Essence Liquifier]]: where essences come from
- [[Bio Caster]]: the big biomass consumer
