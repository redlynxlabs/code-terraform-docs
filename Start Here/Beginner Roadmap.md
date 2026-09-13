---
tags:
  - guide
  - start-here
aliases:
  - Roadmap
  - Quick Start
---
# Beginner Roadmap

The whole game on one page: what to do next, in order, with just enough to get each phase going. Every step links to the page that goes deep. The in-game First Contact tutorial (boot, power, sensors, uplink) covers phase 0; this picks up right after, when you have **2,500 credits** and the Shop unlocked.

> [!example] Don't want to write the code yourself?
> [[Starter Scripts]] has a working copy-paste script for every machine in phases 1-4, commented line by line for non-programmers.

> [!tip] The five rules that prevent most beginner pain
> 1. Scripts run **inside machines**: `self` is the machine, and `SELF ONLY` actions must run on that machine's own script. [[Self & Components]]
> 2. Branch on `result.status`, never on `result.message`. [[Command Results]]
> 3. Throttles and enabled flags **reset to 0/off when a script stops or errors**, so control loops must keep running. [[Long-Running Scripts]]
> 4. A driving vehicle stops and clears its route if its script ends. Keep the script alive until arrival.
> 5. Cyclic sources (vents, wells, exotics) go dormant. Put a tank between source and consumer. [[Flow Networks & Fluids]]

## Phase 1: life support and first credits

**Goal:** all three atmosphere pillars rising, a steady credit trickle.

1. Repair the [[Pressure Sensor]] (opens Harvesting and Contracts) and the [[Oxygen Sensor]] (opens Atmosphere). Either order.
2. Buy and deploy a [[Solar Generator]], a [[Battery]], and an [[Oxygen Generator]]; script the generators on. [[Power & Terraforming Machines]]
3. Earn credits your way: manual Biology clicks for the first payout, then either a [[Harvester]] grid sweep (with the [[Scanner]]) or [[Contracts]] puzzles. [[Choosing Your First Credit Path]]
4. Add a [[Heat Generator]] and [[Pressure Generator]] when credits allow. At **Oxygen 1**, Auto Feeders unlock item ports and the Biology chain can be automated. [[First Biology Loop]]

## Phase 2: wheels and ore

**Goal:** a mining loop feeding a smelter. Unlocks arrive fast off the Pressure and Oxygen pillars ([[Research Database]]).

1. Pressure 0.1-0.2 unlocks Mining, the [[Rover]], and its [[Nav Module]], [[Sonar Module]], [[Drill Module]]. Buy all four, mount the modules.
2. Drive to "?" markers from [[Nocturna]] `points_of_interest()`, `scan()`, `survey()`, then `mine()` iron and silicon. [[First Harvesting Route]]
3. Buy a [[Vehicle Charging Station]] (Oxygen 9) and [[Storage Bin]]s (Temperature 5); smelt ore at the [[Smelter]] (Oxygen 5). [[Refinement & Storage]]
4. Buy the Mk II generator upgrade packs as they appear (Oxygen 75, Temperature 80, Pressure 1.2).

## Phase 3: steam, water, and industry

**Goal:** free power from the planet and the Earth Orders engine turning.

1. Steam chain (Pressure 2-3): survey a vent, build a [[Thermal Cap]] with a Constructor-equipped Pioneer, buffer through a [[Gas Tank]], burn in a [[Steam Turbine]]. **Watch `pressure()`; a full cap blows its steam.** [[Thermal Vents]]
2. Water at Pressure 30 ([[Water Pump]]); Deep Sonar at Pressure 60; oil at Oxygen 1,500 ([[Oil Pump]] + [[Oil Generator]]).
3. Terraform Index gates the big toys: [[Pioneer]] (100k), Earth Orders + [[Supply Dock]] (110k), Outpost Kits (120k), [[Fabricator]] (130k), [[Control Room]] (150k), [[Drones]] (180k).
4. The engine: **contractor orders reward recipes → the Fabricator builds parts → Supply Docks ship them → more orders unlock.** [[Earth Orders Guide]] and [[Fabricator Recipes]]
5. Found your first outpost and lay pipes and power lines with [[Using Plan Mode]] and the [[Constructor Module]]. [[First Outpost]]
6. Set up [[Drone Depot]]s and a [[Drone Service Station]] for freight between outposts. Coordinate scripts with the [[Signal Bus Guide]].

## Phase 4: biomass (Tier 3 begins)

**Goal:** the Biomass pillar moving. Unlocked at Terraform Index 210,000. [[Tier 3 Progression]]

1. Mount a Portable Bio Scanner and Bio Extractor on a drone; scan biome tiles and extract life forms. [[Biosphere Biomass Tier]]
2. An [[Essence Liquifier]] only accepts life forms from **its own outpost's biome**, so found outposts across the five biomes.
3. Pipe all essences to a [[Biomass Mixer]]: more balanced essence types, more biomass. Upgrade to Mk II when it appears (Biomass 50,000).

## Phase 5: plants

**Goal:** Forage farms converting into permanent Plants km².

1. [[Seed Maker]] (Biomass 500): blend 3 life forms per trial; most are sludge, hits are kept forever.
2. Plant seeds on the Harvester field, meet each species' conditions (light, water, salt, neighbors), harvest Forage. [[Biosphere Plants]]
3. [[Plant Terraformer]] (Biomass 2,000) is the **only** converter from Forage to Plants km². Feed it and keep it enabled. [[Plant Terraformer Guide]]
4. Scale with providers as Plants rises: [[Sprinkler]] (100k), [[Dispenser]] (300k), [[Grow Lamp]] (500k), [[Crop Automator]] (620k). **Mk I Terraformers stop at the Fields threshold; the Mk II pack (Plants 1,250,000) carries the final phases.**

## Phase 6: wildlife

**Goal:** revived creatures breeding in Habitats. Unlocked at Plants 2,250,000. [[Wildlife Overview]]

1. Catalog creatures: collect fragments ([[Bio Collector]]), analyze at the [[Bio Lab]], and fill Bio Orders at the [[Bio Exchange]]. Coastal, geothermal, volcanic, and deep fragments need their biome machine first: [[Bio Luminizer]], [[DNA Sequencer]], [[Bio Caster]], [[Bio Conditioner]].
2. Bio Orders unlock feed recipes; press feed at the [[Feed Maker]] (100 Forage per batch). [[Feed Maker Recipes]]
3. Revive a cataloged creature in a [[Habitat]] with its feed plus reagents, then hold its feed, gas, and liquid bands so the colony breeds. [[Wildlife Husbandry]]
4. Exotic fluids for those bands: Exotic Husbandry (Wildlife 1,000) unlocks [[Exotic Gas Cap]], [[Exotic Spring Tap]], and the [[Refiner]]. [[Wildlife Supply]]
5. Colonies produce Insight; spend it on adaptations and breakthroughs. [[Habitat Development]]

## Phase 7: endgame scale

**Goal:** nuclear power and the Continental finish line.

1. Storm economy: [[Weather Station]] + [[Lightning Rod]]s, drones collecting Storm Glass and Raw Uranium. **Raw Uranium is hot cargo: [[Lead Cask]]s and Shield Plating only.** [[Weather System]]
2. [[Fuel Assembler]] (Temperature 10,000) presses Fuel Rods; the [[Reactor]] (Terraform Index 650,000) turns them into 5,000 W; Mk IV generator packs run on rod magazines.
3. Bulk Logistics II/III multiply Supply Dock throughput; Deep Exotics and Habitat Mk II finish the Wildlife tree.
4. The Plants pillar completes at **5,000,000 km²: Continental**. Everything before this was the tutorial.

## Where to go deeper

The Tutorials folder walks each phase hands-on, starting with [[How This Game Works]] and ending with [[Expanding Production]]. For any machine, its page in [[Components Index]] has the exact API; for any locked tech, [[Research Database]] has the threshold; for anything else, the Quick answers table on [[Home]] probably has a row.
