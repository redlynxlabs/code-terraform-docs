---
tags:
  - index
aliases:
  - Start
  - Index
---
# Code: Terraform Wiki

Player documentation for **Code: Terraform** as an offline wiki. You are connected to a remote terminal on the frozen planet **Nocturna**; you terraform it by writing Python-like scripts that run inside machines.

> [!info] Source
> Built from the official player documentation PDF (Build 441ad76, 1,246 pages, rebuilt 2026-09-12). The PDF sits next to this vault as `Code_ Terraform.pdf`.

## The one mental model

Scripts run **inside machines**. `self` is the machine the script runs on; hardware actions (marked **SELF ONLY**) only work through `self`. Anything else is read via `get_component(id)`. Every world-changing command returns a result object: **branch on `result.status`, never on `result.message`**. Full explanation: [[Self & Components]], [[Components Overview]], and [[Command Results]].

## Getting started

- [[Beginner Roadmap]]: **the whole game on one page**, phase by phase
- [[Starter Scripts]]: **copy-paste scripts** for every early machine, commented for non-programmers
- [[Getting Started]]: the welcome page
- [[First Steps]]: what to do after the tutorial (sensors, solar, credits)
- [[How This Game Works]]: the full early-game arc
- [[Command Results]]: the `.status` / `.message` model every script uses
- [[Long-Running Scripts]]: why setpoints reset when scripts stop

## Tutorials

[[How This Game Works]] · [[Choosing Your First Credit Path]] · [[Power & Terraforming Machines]] · [[First Biology Loop]] · [[First Harvesting Route]] · [[Contracts Tutorial]] · [[Reading Errors and Console Output]] · [[First Pioneer]] · [[Using Plan Mode]] · [[First Outpost]] · [[Expanding Production]]

## Guide

### Programming
[[Variables]] · [[Print]] · [[Self & Components]] · [[Loops & Scripts]] · [[Operators]] · [[Numbers]] · [[Strings & F-Strings]] · [[Lists & Tuples]] · [[Dictionaries]] · [[Match & Case]] · [[Regular Expressions]] · [[Exceptions]] · [[Writing Classes]] · [[Docstrings]] · [[Imports & Libraries]] · [[Utility Helpers]] · [[Built-in Functions Overview]] · [[Conversion Functions]]

### Editor & Tools
[[Code Editor]] · [[Debug Mode]] · [[Vim Mode]] · [[Keyboard Shortcuts]] · [[Script Commands]] · [[Script Variants]] · [[Control Room]] · [[External Editor]]

### Automation Systems
[[Contracts]] · [[Earth Orders Guide]] · [[Signal Bus Guide]] · [[Data Archive Guide]] · [[Map Markers Guide]] · [[Drones]] · [[Vehicle Proximity & Service]]

### Production & Logistics
[[Batteries & Charging]] · [[Refinement & Storage]] · [[Input & Output]] · [[Battery Holder]] · [[Cargo Rack]] · [[Portable Battery]] · [[Portable Storage Bin]]

### World & Infrastructure
[[Flow Networks & Fluids]] · [[Infrastructure & Pipes]] · [[Power Networks]] · [[Thermal Vents]] · [[Water & Oil Wells]] · [[Tier 3 Progression]] · [[Weather System]]

### Biosphere & Wildlife
[[Biosphere Biomass Tier]] · [[Biosphere Plants]] · [[Plant Terraformer Guide]] · [[Wildlife Overview]] · [[Wildlife Supply]] · [[Wildlife Husbandry]] · [[Habitat Development]] · [[Wildlife Progression]] · [[Wildlife Creature Profiles]]

## Reference

- [[Components Overview]]: how the component system works
- [[Components Index]]: all 90+ machine and system APIs
- [[Types Index]]: all API object types, including the 15 contract puzzles
- [[Built-in Functions]]: every always-available function
- [[Language Reference]]: syntax, control flow, operators, functions
- [[System Commands]] · [[Infrastructure Commands]]: top-level game functions
- Built-in modules: [[random]] · [[functools]] · [[re]] · [[dataclasses]]

## Database

- [[Production Tiers]]: how recipe tiers stack
- Recipes: [[Smelter Recipes]] · [[Fabricator Recipes]] · [[Feed Maker Recipes]] · [[Refiner Recipes]] · [[Fuel Assembler Recipes]]
- Equipment: [[Power Equipment]] · [[Atmosphere Equipment]] · [[Biology Equipment]] · [[Biosphere Equipment]] · [[Mining Equipment]] · [[Logistics Equipment]] · [[Production Equipment]] · [[Modules & Vehicle Gear]] · [[Fluid Infrastructure]]
- Items: [[Minerals]] · [[Refined Materials]] · [[Fabricated Components]] · [[Agriculture & Feeds]] · [[Life Forms]] · [[Field Resources]] · [[Biology Samples]] · [[Lab Reagents]] · [[Fluids]]
- [[Research Database]]: the complete tech tree with thresholds

## Quick answers

| I want to... | Go to |
| --- | --- |
| See the whole game at a glance | [[Beginner Roadmap]] |
| Copy-paste a working script | [[Starter Scripts]] |
| Repair the starting sensors | [[Oxygen Sensor]] · [[Pressure Sensor]] |
| Write a solar tracker | [[Solar Generator]] + [[Clock]] |
| Earn my first credits | [[Choosing Your First Credit Path]] (biology: [[Bio Collector]] → [[Bio Lab]] → [[Bio Exchange]]) |
| Understand a weird `result.status` | [[Command Results]] + [[ActionResult]] |
| Sweep the sector grid | [[Scanner]] + [[Harvester]] |
| Set up smelting | [[Refinement & Storage]] + [[Smelter]] + [[Smelter Recipes]] |
| Drive somewhere | [[Nav Module]] on the [[Rover]] or [[Pioneer]] |
| Find sites in the field | [[Sonar Module]] + [[Journal]] + [[Nocturna]] `points_of_interest()` |
| Mine a surveyed site | [[Drill Module]] (vehicle) or [[Mining Drill]] (fixed) |
| Capture vent steam | [[Thermal Vents]] + [[Thermal Cap]] + [[Steam Turbine]] |
| Turn steam into water | [[Steam Condenser]] |
| Pump water or oil | [[Water & Oil Wells]] + [[Water Pump]] / [[Oil Pump]] |
| Build pipes and power lines | [[Infrastructure & Pipes]] + [[Construction Blueprint]] + [[Constructor Module]] |
| Found an outpost | [[First Outpost]] + [[Outpost Network]] |
| Ship materials to Earth | [[Earth Orders Guide]] + [[Supply Dock]] |
| Solve a contract | [[Contracts]] + [[Contract]] (all 15 in [[Types Index]]) |
| Coordinate my scripts | [[Signal Bus Guide]] (queues) or [[Data Archive Guide]] (durable state) |
| Build a dashboard | [[Dashboard Cards]] (ready-made suite) + [[Control Room]] + [[Panel API]] |
| Keep vehicles charged | [[Batteries & Charging]] + [[Vehicle Charging Station]] |
| Run a drone route | [[Drones]] + [[Drone]] + [[Drone Depot]] |
| Refuel or rescue drones | [[Drone Service Station]] |
| Check why a transfer failed | [[TransferResult]] (every outcome code explained) |
| Match items by properties | [[Input & Output]] + [[ItemStack]] |
| Move Raw Uranium safely | [[Drones]] hot cargo + [[Lead Cask]] + Shield Plating ([[Modules & Vehicle Gear]]) |
| Run the Reactor | [[Reactor]] + [[Fuel Assembler]] + [[Fuel Assembler Recipes]] |
| Catch lightning | [[Lightning Rod]] + [[Weather System]] |
| Chase a storm | [[Weather System]] + [[Weather Station]] + [[Drone]] `collect()` |
| Discover seeds | [[First Biology Loop]] + [[Seed Maker]] |
| Grow crops | [[Biosphere Plants]] + [[Harvester]] + [[Crop Automator]] |
| Boost crop yield | [[Agriculture & Feeds]] (fertilizer table) + [[Grow Lamp]] / [[Sprinkler]] / [[Dispenser]] |
| Convert Forage into Plants km² | [[Plant Terraformer Guide]] + [[Plant Terraformer]] |
| Make biomass | [[Biosphere Biomass Tier]] + [[Essence Liquifier]] + [[Biomass Mixer]] |
| Revive a creature | [[Wildlife Husbandry]] + [[Habitat]] + [[CatalogedCreature]] |
| Feed a colony | [[Wildlife Supply]] + [[Feed Maker]] + [[Feed Maker Recipes]] |
| Tap exotic fluids | [[Exotic Gas Cap]] / [[Exotic Spring Tap]] + [[Refiner]] |
| Toggle machines remotely | [[Power Control]] (breaker) or [[Run Control]] (run/stop) |
| Check my power grid | [[Power Networks]] + [[Power Control]] + [[PowerGrid]] |
| Annotate the map | [[Map Markers Guide]] + [[Map Markers]] |
| Plan research | [[Research Database]] + [[Research]] |
| Look up an item id | [[Item Catalog]] + the Database item pages |
| Not lose progress at Tier 3 | [[Tier 3 Progression]] |
