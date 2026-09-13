---
tags:
  - database
  - recipes
---
# Smelter Recipes

The [[Smelter]] refines raw ore into stock: **one ore in, one refined unit out**. Select a blueprint with `smelter.set_recipe` and keep the input buffer fed. Every blueprint is listed from day one, unlocked or not. All are **Production tier T0**.

| Recipe | Id | Inputs → Output | Time | Power | Unlock |
| --- | --- | --- | --- | --- | --- |
| Iron Ore → Iron Ingot | `smelt_iron_ingot` | 1× Iron Ore → 1× Iron Ingot | 0.08 h | 20 W | Available from the start |
| Silicon → Glass | `smelt_glass` | 1× Silicon → 1× Glass | 0.08 h | 20 W | Order: Spire, Silicon Bootstrap |
| Titanium → Titanium Ingot | `smelt_titanium_ingot` | 1× Titanium → 1× Titanium Ingot | 0.1 h | 28 W | Order: Helios, Iron Bootstrap |
| Cobalt → Cobalt Ingot | `smelt_cobalt_ingot` | 1× Cobalt → 1× Cobalt Ingot | 0.1 h | 28 W | Order: Spire, Avionics Run |
| Rare Earth → Rare Earth Core | `smelt_rare_earth_core` | 1× Rare Earth → 1× Rare Earth Core | 0.14 h | 35 W | Order: Spire, Control Run |
| Neutronium → Neutronium Bar | `smelt_neutronium_bar` | 1× Neutronium → 1× Neutronium Bar | 0.2 h | 45 W | Order: Spire, Polymer Optics Run |
| Lead Ore → Lead Ingot | `smelt_lead_ingot` | 1× Lead Ore → 1× Lead Ingot | 0.1 h | 22 W | Order: Helios, Lead Survey Stock |

## See also

- [[Smelter]]: the machine API
- [[Fabricator Recipes]]: what the ingots feed into
- [[Production Tiers]]: how tiers stack
