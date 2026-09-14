---
tags:
  - database
  - recipes
title: "Fabricator Recipes"
---

The [[Fabricator]] assembles components from refined stock, with several inputs per blueprint and some recipes producing **byproducts**. Select with `fabricator.set_recipe`. Most blueprints arrive as contractor order rewards; the Unlock column names the order or research.

## Infrastructure segments and bridges

| Recipe id | Inputs → Output | Time | Power | Tier | Unlock |
| --- | --- | --- | --- | --- | --- |
| `craft_gas_pipe_segment` | 2× Iron Ingot → 1× Gas Pipe Segment | 0.1 h | 25 W | T1 | Helios, Iron Production |
| `craft_liquid_pipe_segment` | 1× Iron Ingot, 1× Silicon → 1× Liquid Pipe Segment | 0.12 h | 25 W | T1 | Spire, Silicon Stock |
| `craft_power_line_segment` | 1× Iron Ingot, 1× Titanium Ingot → 1× Power Line Segment | 0.14 h | 25 W | T1 | Vestibule, Utility Conduit Stock |
| `craft_gas_pipe_bridge` | 2× Gas Pipe Segment, 1× Pressure Valve → 1× Gas Pipe Bridge | 0.18 h | 25 W | T2 | Helios, Iron Production |
| `craft_liquid_pipe_bridge` | 2× Liquid Pipe Segment, 1× Pressure Valve → 1× Liquid Pipe Bridge | 0.2 h | 25 W | T2 | Spire, Silicon Stock |
| `craft_power_line_bridge` | 2× Power Line Segment, 1× Circuit Panel → 1× Power Line Bridge | 0.22 h | 25 W | T2 | Vestibule, Utility Conduit Stock |

## Core components

| Recipe id | Inputs → Output | Time | Power | Tier | Unlock |
| --- | --- | --- | --- | --- | --- |
| `craft_pressure_valve` | 1× Iron Ingot, 1× Glass → 1× Pressure Valve | 0.12 h | 25 W | T1 | Spire, Cobalt Run |
| `craft_machine_frame` | 3× Iron Ingot, 1× Titanium Ingot, 2 t Water → 1× Machine Frame | 0.22 h | 35 W | T1 | Helios, Battery Order |
| `craft_circuit_panel` | 1× Iron Ingot, 2× Glass, 1 t Water → 1× Circuit Panel | 0.18 h | 30 W | T1 | Spire, Optical Glass |
| `craft_control_unit` | 1× Circuit Panel, 1× Titanium Ingot, 1× Glass, 2 t Water → 1× Control Unit | 0.3 h | 40 W | T2 | Spire, Circuit Order |
| `craft_battery_cell` | 1× Cobalt Ingot, 1× Iron Ingot, 1× Glass, 1 t Water → 1× Battery Cell | 0.22 h | 35 W | T1 | Helios, Titanium Run |
| `craft_turbine_rotor` | 2× Titanium Ingot, 1× Cobalt Ingot, 1× Rare Earth Core, 4 t Steam → 1× Turbine Rotor | 0.34 h | 42 W | T1 | Helios, Cap Kit Order |
| `craft_tank_lining` | 2× Iron Ingot, 1× Titanium Ingot, 1× Glass, 2 t Water → 1× Tank Lining | 0.22 h | 38 W | T1 | Helios, Bulk Iron Run |

## Petrochemicals (all yield Tar byproduct except craft_tar)

| Recipe id | Inputs → Output | Time | Power | Tier | Unlock |
| --- | --- | --- | --- | --- | --- |
| `craft_lubricant` | 1× Iron Ingot, 3 t Oil → 1× Lubricant + 1× Tar | 0.12 h | 30 W | T1 | Vestibule, Liquid Pipe Order |
| `craft_plastic` | 1× Glass, 4 t Oil → 1× Plastic + 1× Tar | 0.14 h | 32 W | T1 | Spire, Magnetic Stator Build |
| `craft_rubber` | 1× Cobalt Ingot, 2 t Oil → 1× Rubber + 1× Tar | 0.12 h | 28 W | T1 | Vestibule, Pipe Network Run |
| `craft_tar` | 5 t Oil → 2× Tar (heavy oil cracking) | 0.15 h | 32 W | T1 | Vestibule, Polymer Stockpile |
| `craft_reinforced_biopolymer` | 2× Plastic, 6× Plant Forage, 2 t Water → 4× Reinforced Biopolymer | 0.28 h | 40 W | T2 | Advanced Biopolymers research |
| `craft_enrichment_compound` | 1× Reinforced Biopolymer, 6× Plant Forage, 2 t Water → 4× Enrichment Compound | 0.32 h | 45 W | T3 | Enrichment Chemistry research |

## Field structure and machine kits

| Recipe id | Inputs → Output | Time | Power | Tier | Unlock |
| --- | --- | --- | --- | --- | --- |
| `craft_thermal_cap_kit` | 2× Titanium Ingot, 2× Gas Pipe Segment → 1× Thermal Cap Kit | 0.28 h | 38 W | T2 | Thermal Cap research |
| `craft_water_pump` | 2× Iron Ingot, 2× Glass, 4× Liquid Pipe Segment → 1× Water Pump | 0.3 h | 35 W | T2 | Hydrology Survey research |
| `craft_oil_pump` | 2× Iron Ingot, 1× Titanium Ingot, 1× Pressure Valve, 1× Circuit Panel → 1× Oil Pump | 0.38 h | 40 W | T2 | Petroleum Survey research |
| `craft_exotic_gas_cap_kit` | 2× Titanium Ingot, 2× Gas Pipe Segment → 1× Exotic Gas Cap Kit | 0.32 h | 40 W | T2 | Exotic Husbandry research |
| `craft_exotic_spring_tap_kit` | 2× Titanium Ingot, 2× Liquid Pipe Segment, 1× Pressure Valve → 1× Exotic Spring Tap Kit | 0.34 h | 42 W | T2 | Exotic Husbandry research |
| `craft_mining_drill_kit` | 3× Machine Frame, 1× Control Unit, 1× Circuit Panel, 2 t Water → 1× Mining Drill Kit | 0.45 h | 45 W | T3 | Helios, Cargo Pod Run |
| `craft_mining_drill_industrial_kit` | 5× Machine Frame, 2× Control Unit, 2× Circuit Panel, 1× Turbine Rotor, 3 t Water → 1× Industrial Mining Drill Kit | 0.65 h | 52 W | T3 | Helios, Heavy Drill Build |
| `craft_mining_drill_heavy_kit` | 8× Machine Frame, 3× Control Unit, 4× Circuit Panel, 2× Turbine Rotor, 4 t Water → 1× Heavy Mining Drill Kit | 0.85 h | 58 W | T3 | Helios, Tether Project |
| `craft_garbage_disposal_kit` | 2× Machine Frame, 4× Iron Ingot, 1× Circuit Panel → 1× Waste Processor Kit | 0.4 h | 40 W | T2 | Waste Processing research |
| `craft_lightning_rod_kit` | 1× Machine Frame, 4× Battery Cell, 2× Circuit Panel → 1× Lightning Rod | 1 h | 40 W | T2 | Lightning Rods research |

## Drone infrastructure

| Recipe id | Inputs → Output | Time | Power | Tier | Unlock |
| --- | --- | --- | --- | --- | --- |
| `craft_drone_station_kit` | 2× Machine Frame, 1× Control Unit, 2× Gas Pipe Segment, 2× Liquid Pipe Segment, 3 t Water → 1× Drone Depot Kit | 0.5 h | 45 W | T3 | Helios, Frame Order |
| `craft_drone_station_kit_medium` | 4× Machine Frame, 2× Control Unit, 2× Circuit Panel, 4 t Water → 1× Drone Depot Kit (Medium) | 0.65 h | 50 W | T3 | Helios, Mid-Cargo Order |
| `craft_drone_station_kit_large` | 8× Machine Frame, 3× Control Unit, 4× Circuit Panel, 6 t Water → 1× Drone Depot Kit (Large) | 0.85 h | 55 W | T3 | Helios, Drone Hub Stockpile |
| `craft_drone_service_station_kit` | 2× Machine Frame, 1× Control Unit, 2× Circuit Panel, 1× Battery Cell, 1× Liquid Pipe Segment → 1× Drone Service Station Kit | 0.5 h | 45 W | T3 | Spire, Drone Power Trial |

## Drones and drone gear

| Recipe id | Inputs → Output | Time | Power | Tier | Unlock |
| --- | --- | --- | --- | --- | --- |
| `craft_drone_small` | 1× Rare Earth Core, 1× Titanium Ingot, 1× Control Unit, 2 t Water → 1× Drone (Small) | 0.55 h | 45 W | T3 | Helios, Rotor Run |
| `craft_drone_medium` | 2× Rare Earth Core, 2× Titanium Ingot, 1× Control Unit, 3 t Water → 1× Drone (Medium) | 0.75 h | 50 W | T3 | Helios, Mid-Drone Build |
| `craft_drone_large` | 3× Rare Earth Core, 3× Titanium Ingot, 2× Control Unit, 4 t Water → 1× Drone (Large) | 1 h | 55 W | T3 | Helios, Heavy Drone Build |
| `craft_electric_thruster` | 2× Rare Earth Core, 1× Turbine Rotor, 2 t Steam → 1× Electric Thruster | 0.55 h | 45 W | T2 | Spire, Rare Earth Order |
| `craft_heli_thruster` | 2× Rare Earth Core, 1× Control Unit, 2× Lubricant, 1× Rubber, 2 t Water → 1× Heli Thruster | 0.65 h | 50 W | T3 | Vestibule, Refueling Pad Order |
| `craft_cargo_pod_small` | 1× Titanium Ingot, 1× Glass, 1 t Steam → 1× Cargo Pod (Small) | 0.2 h | 35 W | T1 | Helios, Drone Fleet Order |
| `craft_cargo_pod_medium` | 2× Titanium Ingot, 1× Glass, 1× Circuit Panel, 2 t Steam → 1× Cargo Pod (Medium) | 0.3 h | 40 W | T2 | Helios, Mid-Cargo Build |
| `craft_cargo_pod_large` | 3× Titanium Ingot, 2× Glass, 1× Circuit Panel, 3 t Steam → 1× Cargo Pod (Large) | 0.42 h | 45 W | T2 | Helios, Cargo Megaorder |
| `craft_battery_pack` | 1× Titanium Ingot, 1× Glass, 1× Battery Cell → 1× Battery Pack | 0.18 h | 32 W | T2 | Spire, Pressure Hardware |
| `craft_oil_tank_small` | 1× Titanium Ingot, 1× Lubricant, 1× Rubber, 1 t Water → 1× Oil Tank (Small) | 0.22 h | 35 W | T2 | Vestibule, Heli Thruster Order |
| `craft_oil_tank_medium` | 2× Titanium Ingot, 1× Lubricant, 1× Rubber, 1× Tank Lining, 2 t Water → 1× Oil Tank (Medium) | 0.32 h | 40 W | T2 | Vestibule, Oil Tank Order |
| `craft_oil_tank_large` | 3× Titanium Ingot, 2× Lubricant, 1× Rubber, 2× Tank Lining, 3 t Water → 1× Oil Tank (Large) | 0.45 h | 45 W | T2 | Vestibule, Mid Tank Order |

## Advanced electronics

| Recipe id | Inputs → Output | Time | Power | Tier | Unlock |
| --- | --- | --- | --- | --- | --- |
| `craft_coolant_loop` | 4× Liquid Pipe Segment, 2× Pressure Valve, 1× Rare Earth Core, 2× Titanium Ingot, 2× Tar, 4 t Water → 1× Coolant Loop | 0.75 h | 50 W | T2 | Spire, Neutronium Order |
| `craft_neutron_capacitor` | 1× Neutronium Bar, 2× Battery Cell, 2× Control Unit, 1× Rare Earth Core, 1× Tar, 4 t Water, 4 t Steam → 1× Neutron Capacitor | 1.2 h | 70 W | T3 | Spire, Cobalt Stockpile |

## Biosphere kits

| Recipe id | Inputs → Output | Time | Power | Tier | Unlock |
| --- | --- | --- | --- | --- | --- |
| `craft_seed_maker_kit` | 2× Machine Frame, 1× Control Unit, 2× Circuit Panel, 3 t Water → 1× Seed Maker Kit | 0.5 h | 45 W | T3 | Seed Maker research |
| `craft_plant_terraformer_kit` | 5× Machine Frame, 3× Control Unit, 5× Circuit Panel, 4× Liquid Pipe Segment, 10 t Water → 1× Plant Terraformer Kit | 1.25 h | 80 W | T3 | Plant Terraformer research |
| `craft_grow_lamp_kit` | 1× Machine Frame, 2× Circuit Panel, 2× Glass → 1× Grow Lamp Kit | 0.35 h | 35 W | T2 | Grow Lamp research |
| `craft_sprinkler_kit` | 1× Machine Frame, 2× Liquid Pipe Segment, 1× Pressure Valve, 2 t Water → 1× Sprinkler Kit | 0.38 h | 38 W | T2 | Sprinkler research |
| `craft_dispenser_kit` | 1× Machine Frame, 1× Control Unit, 1× Circuit Panel → 1× Dispenser Kit | 0.4 h | 40 W | T3 | Dispenser research |

## Crop chemicals

| Recipe id | Inputs → Output | Time | Power | Tier | Unlock |
| --- | --- | --- | --- | --- | --- |
| `craft_fertilizer` | 1× Tar, 1× Glass, 2 t Water → 2× Fertilizer | 0.18 h | 32 W | T2 | Bio Order: Soil Enrichment Assay |
| `craft_fertilizer_mk2` | 2× Tar, 2× Glass, 1× Circuit Panel, 3 t Water → 2× Fertilizer Mk II | 0.3 h | 40 W | T2 | Bio Order: Hydrothermal Fragment Manifest |
| `craft_fertilizer_mk3` | 3× Tar, 3× Glass, 1× Neutron Capacitor, 2× Rare Earth Core, 4 t Water → 2× Fertilizer Mk III | 0.55 h | 52 W | T4 | Bio Order: Deep-Trench Capstone |
| `craft_growth_accelerant` | 1× Plastic, 1× Rare Earth Core, 2 t Water → 2× Growth Accelerant | 0.28 h | 38 W | T2 | Bio Order: Volcanic Grand Compendium |
| `craft_yield_amplifier` | 1× Neutron Capacitor, 2× Control Unit, 2× Rare Earth Core, 1× Coolant Loop, 4 t Water → 1× Yield Amplifier | 1 h | 65 W | T4 | Spire, Neutron Capacitor Order |

## Upgrade packs

| Recipe id | Inputs → Output | Time | Power | Tier | Unlock |
| --- | --- | --- | --- | --- | --- |
| `craft_plant_terraformer_pack_mk2` | 4× Control Unit, 6× Circuit Panel, 3× Rare Earth Core, 4× Pressure Valve, 6 t Water → 1× Plant Terraformer Mk II Upgrade Pack | 1.5 h | 90 W | T3 | Plant Terraformer Mk II research |
| `craft_grow_lamp_pack_mk2` | 3× Circuit Panel, 4× Glass, 1× Rare Earth Core → 1× Grow Lamp Mk II Upgrade Pack | 0.45 h | 42 W | T2 | Spire, Optics Stockpile |
| `craft_grow_lamp_pack_mk3` | 1× Neutron Capacitor, 3× Rare Earth Core, 2× Control Unit, 3 t Water → 1× Grow Lamp Mk III Upgrade Pack | 0.75 h | 55 W | T4 | Spire, Capacitor Bulk Order |
| `craft_sprinkler_pack_mk2` | 4× Plastic, 1× Coolant Loop, 2× Pressure Valve → 1× Sprinkler Mk II Upgrade Pack | 0.5 h | 44 W | T3 | Spire, Polymer Megastock |
| `craft_sprinkler_pack_mk3` | 2× Control Unit, 4× Circuit Panel, 2× Coolant Loop, 4 t Water → 1× Sprinkler Mk III Upgrade Pack | 0.85 h | 58 W | T3 | Spire, Avionics Megastock |
| `craft_habitat_pack_mk2` | 2× Neutron Capacitor, 3× Rare Earth Core, 4× Control Unit, 3× Coolant Loop, 6 t Water → 1× Habitat Mk II Upgrade Pack | 1.4 h | 110 W | T4 | Habitat Engineering Mk II research |
| `craft_oxygen_upgrade_pack_mk4` | 4× Lead Plate, 2× Machine Frame, 3× Circuit Panel, 2× Cobalt Ingot → 1× Oxygen Upgrade Pack Mk IV | 2 h | 220 W | T2 | Oxygen Generator Mk IV research |
| `craft_heat_upgrade_pack_mk4` | 4× Lead Plate, 2× Machine Frame, 3× Circuit Panel, 2× Cobalt Ingot → 1× Heat Upgrade Pack Mk IV | 2 h | 220 W | T2 | Heat Generator Mk IV research |
| `craft_pressure_upgrade_pack_mk4` | 4× Lead Plate, 2× Machine Frame, 3× Circuit Panel, 2× Cobalt Ingot → 1× Pressure Upgrade Pack Mk IV | 2 h | 220 W | T2 | Pressure Generator Mk IV research |

## Lead and radiation gear

| Recipe id | Inputs → Output | Time | Power | Tier | Unlock |
| --- | --- | --- | --- | --- | --- |
| `craft_lead_plate` | 2× Lead Ingot → 1× Lead Plate | 0.2 h | 30 W | T1 | Helios, Lead Consignment |
| `craft_lead_cask` | 3× Lead Plate, 1× Machine Frame → 1× Lead Cask | 0.6 h | 36 W | T2 | Helios, Plate Order |
| `craft_shield_plating` | 4× Lead Plate, 1× Machine Frame → 1× Shield Plating | 0.8 h | 36 W | T2 | Vestibule, Shielded Transport Trial |

## See also

- [[Fabricator]]: the machine API
- [[Smelter Recipes]]: the T0 inputs
- [[Production Tiers]]: tier logic
