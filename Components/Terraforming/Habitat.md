---
tags:
  - component
  - terraforming
  - biosphere
  - wildlife
aliases:
  - habitat_1
---
# Habitat

Revives one species from Biology reagents staged in this Habitat's dedicated local input, then breeds it into a colony. **One living colony is allowed per species.** Established colonies keep their progress when moved between Habitats.

**Stats:** Power in variable · Input buffer 50 · Stockpile 25 (mixed) · Tiers Mk II

**How to obtain:** Requires the **Wildlife** research (Plants 2,250,000). Buy from the Shop for 100,000 cr.

**Access:** `self` / `get_component(id)` · Like every component, exposes `.id` and `.name`. See [[Wildlife Husbandry]] for the working patterns.

## Revival and housing

### .outpost
The outpost where this building is deployed, as an [[OutpostRef]].

### .set_revival_target(creature_id) `SELF ONLY`
Select which cataloged creature this Habitat is preparing, e.g. `self.set_revival_target("salt_tortoise")`. The validated target persists when the script stops and after a failed setup check or rearing attempt, so the Habitat card can show the creature and its live preparation requirements before a colony exists. Selecting another valid creature replaces the target without consuming materials.

**Returns:** [[ActionResult]] · Outcomes: `"ok"` / `"occupied"` / `"species_exists"` / `"unknown_creature"` / `"not_cataloged"`

### .revive() `SELF ONLY`
Bring this Habitat's selected revival target to life. Stock at least 2 of its feed first: revival spends one and one must remain for rearing. Stage the exact rarity-scaled Bio Lab reagents shown by the Habitat or `journal.cataloged_creatures(...)`. Creature bonuses do not change this one-time recipe. Failed checks spend nothing and keep the selected target.

**Returns:** ActionResult · Outcomes: `"ok"` / `"occupied"` / `"no_target"` / `"species_exists"` / `"not_cataloged"` / `"wrong_feed"` / `"insufficient_feed"` / `"insufficient_reagents"`

### .rehouse(creature_id) `SELF ONLY`
Attach an established species colony to this Habitat. The destination must be empty and its current capacity must fit the entire colony. The same call moves a colony directly from another Habitat or restores one after its former Habitat was undeployed. Population, life stage, brood progress, Insight history, and purchased bonuses are preserved. Growth and active Wildlife contribution pause while a colony is unhoused.

**Returns:** ActionResult · Outcomes: `"ok"` / `"occupied"` / `"no_colony"` / `"not_established"` / `"insufficient_capacity"` / `"unknown_creature"`

## Life support controls

### .set_gas_intake(rate) `SELF ONLY`
Set the gas inflow rate in t/h, pulled from the connected [[Gas Tank]] (wire it with `self.gas_in.connect("gas_tank_1")`) into the enclosure's gas reserve. This is the regulator actuator: read `gas_level()`, compare it with `gas_band()`, and raise intake below the band or lower it above the band. Idle at 0. Clamps to >= 0.

**Returns:** ActionResult · Outcomes: `"ok"`

### .set_liquid_intake(rate) `SELF ONLY`
Set the liquid inflow rate in t/h, pulled from the connected [[Liquid Tank]] into the enclosure's liquid reserve. Meter it to hold `liquid_band()`. Idle at 0. Clamps to >= 0.

**Returns:** ActionResult · Outcomes: `"ok"`

### .purge_intake(port=None) `SELF ONLY`
Vents a feedstock **inlet** so it can accept a different fluid. Pass `"gas_in"` or `"liquid_in"` to vent one, or omit to vent both; venting only what is actually blocked leaves a healthy buffer alone. The inlets take the first fluid that reaches them and then refuse any other, so an enclosure supplied the wrong gas ends up holding one it cannot use with no way to take the right one. Purge, rewire, and the next correct delivery replaces the enclosure air. The vented fluid is destroyed; feed and colony progress are untouched.

**Returns:** ActionResult · Outcomes: `"ok"` / `"empty"`

### .purge_reserve(medium) `SELF ONLY`
Empties the selected enclosure **reserve** immediately: `self.purge_reserve("gas")` or `self.purge_reserve("liquid")`. The fluid is destroyed. The other reserve, inlet buffers, connections, intake settings, feed, and colony progress stay intact. The reserve can refill on later ticks if intake remains open.

**Returns:** ActionResult · Outcomes: `"ok"` / `"empty"` (already empty). **Raises:** `ValueError` if medium is not "gas" or "liquid".

## Development

### .unlock_bonus(node_id) `SELF ONLY`
Permanently purchase one node from this creature's tree. Pass a node id from `get_bonus_tree().nodes`. The 1 Insight **Adaptation** affects this species only. The 4 Insight **Breakthrough** affects every species and also requires this source colony to reach 10,000 population. A rejected purchase spends nothing.

**Returns:** ActionResult · Outcomes: `"ok"` / `"unknown_node"` / `"already_purchased"` / `"population_locked"` / `"insufficient_insight"`

### .get_insight()
Read the shared Wildlife Insight balance and this colony's current and lifetime contribution. Insight accrues directly from positive population change. Static population and elapsed time alone produce nothing.

**Returns:** [[HabitatInsight]]

### .get_bonus_tree()
Read this creature's species-only Adaptation and all-species Breakthrough, including each node's `.scope`, `.source_species`, permanent purchase state, current effect activity, Insight cost, and unmet requirements. The tree appears after selecting a revival target and its nodes remain visible while locked.

**Returns:** [[HabitatBonusTree]]

### .get_active_bonuses()
Read every purchased node currently affecting this Habitat, including global Breakthroughs earned from other species. Each result exposes `.scope` and `.source_species`. A conditional node disappears while its local condition is unmet; use its source Habitat's `get_bonus_tree()` to inspect permanent ownership.

**Returns:** List of purchased [[HabitatBonusNode]] objects

## Colony state

### .tier()
Permanently installed Habitat tier as an integer (1-2). Mk II doubles carrying capacity only; breeding speed and biological costs come from adaptations.

### .population()
Current colony head count (individuals). Reads 0 for an empty Habitat OR one still in the Founded rearing window; a colony only counts (here and on the [[Wildlife Sensor]]) once it's established. Breeds up toward `carrying_capacity()` and never falls.

### .species()
The housed creature id (e.g. `"glacial_wyrm"`), or `""` when the Habitat is empty. The 16 creatures: salt_tortoise, magmatic_annelid, mycelial_husk, mantle_strider, glasswing_mantis, veil_mantle, vault_crab, tidal_cephalopod, bone_walker, vent_drifter, hive_sentinel, hollow_choir, ferric_sea_lily, crustal_echo, glacial_wyrm, spire_drake.

### .revival_target()
The creature id explicitly selected with `set_revival_target(...)`, or `""` before selection and after establishment. Failed setup checks and rearing attempts retain this value, while `species()` remains empty until revival actually starts.

### .life_stage()
The colony's stage as a string: `"empty"`, `"founded"`, `"first_breeding"`, `"self_sustaining"`, `"thriving"`, or `"abundant"`. The colony climbs as its own population crosses each stage threshold; each climb opens a harder requirement and raises the ceiling.

### .is_established()
`True` once the colony cleared the Founded rearing window and is counting on the sensor; `False` during rearing or when empty.

### .rearing_progress()
Fraction 0-1 of the Founded rearing window held in-band. Climbs only while every active band is satisfied; reaches 1.0 to establish. Reads 0 when empty/established, and resets to 0 if a band is lost (rearing fails).

### .rearing_failed()
`True` after a rearing attempt lost its bands and reverted the Habitat to preparation. The genome and selected target are kept: fix your regulator and call `revive()` again. Clears when a target is selected or revival restarts.

### .brood_size()
Whole individuals produced by the next completed breeding cycle. Normally 1; brood bonuses build toward a guaranteed extra individual and periodically make it 2. Reads 0 without an established colony or carrying-capacity space.

### .breeding_rate()
Expected individuals/h at the current population, remaining capacity (headroom), life support, rarity, adaptation effects, and available local inputs. Population adds less and less extra speed above 10 individuals, while brood yield and purchased speed effects stay within their overall limits. This is the rate readout; `breeding_efficiency()` is only the life-support factor.

### .breeding_efficiency()
Current life-support multiplier from 0-100%, **not the population growth rate**. The weakest active input sets it; 100% means every input is ready. Growth also scales with population momentum, rarity, and bonuses. Capacity stops growth only when full and never slows breeding beforehand. Poor conditions never reduce population.

## Supply state

### .feed_level()
Usable feed units remaining after partial consumption. Feed is consumed automatically only when individuals are born. Top it up with `self.input.take(...)`; over-stocking is harmless.

### .feed_ok()
`True` when the feed named by `required_feed()` is stocked. `False` means the bin is empty or contains the wrong feed. Missing feed stalls breeding but does not reduce the established population.

### .gas_level() / .liquid_level()
Current gas / liquid held in the enclosure, in tons. Compare with the band and meter the intake setters to hold the window.

### .gas_band() / .liquid_band()
Safe inventory range `[low, high]` in tons for the colony's current stage. Breeding receives full support inside the range; too little starves the colony and too much is toxic. Returns an empty list before that input is required. Read each loop because the range tightens as the colony grows.

### .gas_ok() / .liquid_ok()
`True` when that input's requirements are met or it is not required yet. `False` means EITHER the level is outside the band (adjust the intake) OR the enclosure holds the wrong fluid (compare `gas_fluid()` with `required_gas()`, or the liquid equivalents). Check both.

### .gas_fluid() / .liquid_fluid()
The exotic fluid currently **held** in the enclosure, or `""` when empty. It must equal the required fluid for the band to count. Gas values include steam, ammonia, swamp_gas, raw/refined sulfur_gas and chlorine; liquid values include water, oil, essences, brine, raw/refined cryofluid and quicksilver.

### .required_feed()
The exact feed item id required by the selected revival target or housed creature (`"feed_<creature>"`), or `""` when neither exists.

### .required_gas() / .required_liquid()
The exotic gas/liquid required at the colony's **current** stage (gas: `"swamp_gas"`, `"ammonia"`, `"sulfur_gas"`, `"chlorine"`; liquid: `"brine"`, `"cryofluid"`, `"quicksilver"`), or `""` before it is needed. Requirements escalate at later stages; a purchased Adaptation may retain the base fluid instead.

### .next_required_gas() / .next_required_liquid()
The fluid required **after the next life-stage transition**, or `""` if the next stage needs none or there is no next stage. Pair with the next-band queries to prepare before crossing.

### .next_gas_band() / .next_liquid_band()
The next life stage's exact window as `[low, high]` in tons. Returns `[]` if that stage needs none or the colony is already Abundant.

## Capacity and transitions

### .carrying_capacity()
The colony's ceiling at its current life stage. Population breeds toward it and plateaus there; a maxed colony consumes nothing. Life-stage advancement raises the base ceiling, and Habitat Mk II doubles it. Adaptations never change capacity. Reads 0 when empty.

### .headroom()
Individuals still breedable before the current ceiling (`carrying_capacity() - population()`, floored at 0). 0 means this colony is capped and idling.

### .next_stage_population()
Exact population that opens the next life stage: 250, 2,500, 25,000, or 175,001. Returns 0 when the Habitat is empty or already Abundant. Mk I stops at 175,000, so entering Abundant requires Mk II.

### .next_requirement()
What changes at the colony's next stage: `"capacity"`, `"gas"`, `"liquid"`, `"switch_gas"`, `"switch_liquid"`, `"tighter_bands"`, or `"none"` at Abundant. Pair it with `next_stage_population()`.

## Ports

### .gas_in / .liquid_in
Supply the Habitat with gas / liquid. Connect a [[Gas Tank]] / [[Liquid Tank]], then use the intake setters to meter fluid from the port into the enclosure. See [[FluidPort]].

### .input
Stores feed for the colony: `self.input.connect("Feed Bin")` then `self.input.take("feed_salt_tortoise", 20)`. Compare `self.input.stacks()` with `required_feed()` after revival; only the colony's own feed item is useful. See [[InputSlot]].

### .reagents
Dedicated local [[InputSlot]] for revival reagents. Select a revival target, then connect a Storage Bin or Warehouse at this Habitat's outpost and stage all five Bio Lab reagents shown on the card before `revive()`. A Habitat at Nocturna Base may connect Base Inventory; a remote Habitat cannot.

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].

## See also

- [[Wildlife Husbandry]]: the complete regulator pattern
- [[Habitat Development]]: Insight and the bonus economy
- [[Wildlife Progression]]: stage thresholds and breeding rates
