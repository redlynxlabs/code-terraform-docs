---
tags:
  - index
---
# Components Index

Every machine and system API in the game, grouped as in the official docs. How the system works: [[Components Overview]]. Access is `self` (own machine), `get_component(id)`, or `get_component_by_name(name)`.

## Core Systems

[[Clock]] · [[Commander]] · [[Console]] · [[GPS]] · [[Nocturna]] · [[Research]] · [[Shop]] · [[Transmitter]]

## Sensors

[[Oxygen Sensor]] · [[Pressure Sensor]] · [[Thermometer]] · [[Biomass Sensor]] · [[Plants Sensor]] · [[Wildlife Sensor]]

## Exploration

[[Journal]] · [[Map Markers]] · [[Scanner]]

## Power

[[Battery]] · [[Lightning Rod]] · [[Oil Generator]] · [[Reactor]] · [[Solar Generator]] · [[Steam Turbine]] · [[Vehicle Charging Station]]

## Terraforming

[[Atmosphere]] · [[Heat Generator]] · [[Oxygen Generator]] · [[Pressure Generator]]

**Biology chain:** [[Bio Collector]] · [[Bio Lab]] · [[Bio Exchange]] · [[Bio Luminizer]] · [[DNA Sequencer]] · [[Bio Caster]] · [[Bio Conditioner]]

**Wildlife chain:** [[Habitat]] · [[Feed Maker]] · [[Refiner]]

## Production & Storage

[[Smelter]] · [[Fabricator]] · [[Fuel Assembler]] · [[Harvester]] · [[Inventory]] · [[Item Catalog]] · [[Storage Bin]] · [[Warehouse]] · [[Large Warehouse]] · [[Lead Cask]] · [[Mining Drill]] · [[Waste Processor]]

## Vehicles & Modules

[[Rover]] · [[Pioneer]] · [[Drone]] · [[Fleet]]

**Modules:** [[Nav Module]] · [[Sonar Module]] · [[Drill Module]] · [[Constructor Module]]

## Logistics & Orders

[[Data Archive]] · [[Drone Depot]] · [[Drone Service Station]] · [[Earth Orders]] · [[Signal Bus]] · [[Supply Dock]]

## Infrastructure & Fluids

[[Construction Blueprint]] · [[Outpost]] · [[Outpost Network]] · [[Power Control]] · [[Run Control]]

**Field extractors:** [[Thermal Cap]] · [[Water Pump]] · [[Oil Pump]] · [[Exotic Gas Cap]] · [[Exotic Spring Tap]]

**Tanks and conversion:** [[Gas Tank]] · [[Liquid Tank]] · [[Large Liquid Tank]] · [[Steam Condenser]]

## Biosphere

[[Biomass Mixer]] · [[Essence Liquifier]] · [[Seed Maker]] · [[Plant Terraformer]] · [[Crop Automator]] · [[Grow Lamp]] · [[Sprinkler]] · [[Dispenser]]

## Weather & Sky

[[Weather Station]]

## Shared machine features

- **Command mailbox** on every scriptable machine: `peek_command()` / `next_command()` / `command_count()` / `clear_commands()`, see [[Script Commands]]
- **Item ports**: [[InputSlot]] · [[OutputSlot]] · [[PickupOutputSlot]] · [[VehicleInputSlot]], see [[Input & Output]]
- **Fluid ports**: [[FluidPort]], see [[Flow Networks & Fluids]]
- **Results**: every world-changing command returns a `.status` / `.message` object, see [[Command Results]]
