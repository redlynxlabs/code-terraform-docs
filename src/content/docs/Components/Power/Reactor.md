---
tags:
  - component
  - power
aliases:
  - reactor
title: "Reactor"
---

Generates up to **5,000 W** from Fuel Rods and cooling water. One rod lasts 72 hours at heat 1.0; fuel use follows commanded heat even while the core is warming or outside its efficient band.

**Stats:** Power out +5,000 W · Consumes Water, buffer 3 t · Input buffer 3 units

**How to obtain:** Requires the **Nuclear Program** research (Terraform Index 650,000). Buy from the Shop for 750,000 cr.

**Access:** `self` / `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Methods

### .outpost
The outpost where this building is deployed, as an [[OutpostRef]].

**Returns:** `OutpostRef`

### .set_heat(value) `SELF ONLY`
Set reactor heat from 0-1. Values outside the range are clamped. The setting returns to 0 when the owning script stops.

**Returns:** [[ActionResult]] · Outcomes: `"ok"`

### .heat()
Current heat setting from 0-1.

**Returns:** Number (0-1)

### .temperature()
Current temperature in °C. Output begins at 300, peaks at 900, then falls back to zero across the 900-950 red band. **950 triggers an automatic overheat shutdown.**

**Returns:** Number (°C)

### .fuel_level()
Active Fuel Rod life from 0-1. One full rod lasts 72 hours at heat 1.0; lower heat extends it proportionally. The next rod is taken automatically from `input`.

**Returns:** Number (0-1)

### .power_output()
Watts on the grid this tick.

**Returns:** Number (0-5,000)

### .status()
Current operating state: `"running"`, `"overheated"`, `"no_fuel"`, or `"no_coolant"`. Shutdowns recover automatically after cooling or supplies return.

**Returns:** String

### .water_in
Automatic cooling-water input. The reactor consumes 0.5-1 t/h while heating and pauses safely if the supply runs dry.

**Returns:** [[FluidPort]]

### .input
Normal Fuel Rod input. Rods arrive from a [[Lead Cask]], and the reactor takes the next one automatically when needed. Fuel Rod recovery must target a compatible local Lead Cask.

**Returns:** [[InputSlot]]

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].

## See also

- [[Fuel Assembler]]: making Fuel Rods
- [[Lead Cask]]: rod storage and recovery
- [[Waste Processor]]: what happens to spent material
