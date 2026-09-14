---
tags:
  - component
  - power
aliases:
  - turbine_1
title: "Steam Turbine"
---

Produces up to **108 W** from **90 t/h** Steam. Its script-owned throttle scales both consumption and output.

**Stats:** Power out +108 W · Consumes Steam, up to 90 t/h, buffer 100 t

**How to obtain:** Requires the **Steam Turbine** research (Pressure 3). Buy from the Shop for 7,500 cr.

**Access:** `self` / `get_component(id)` · Like every component, exposes `.id` and `.name`.

> [!info] No water side
> In this build the turbine is a pure steam-to-power machine. Water for Mk III machines comes from wells and the [[Steam Condenser]], not from the turbine.

## Methods

### .outpost
The outpost where this building is deployed, as an [[OutpostRef]].

**Returns:** `OutpostRef`

### .power_output()
Watts fed to the grid on the last power tick. Scales with `throttle()` and the steam actually available. 0 when idle or steam-starved. Updates once per power tick; a fresh `set_throttle(...)` is reflected on the next tick, not the same one. Use for live dashboards or to compare against Oxygen / Heat consumption to balance the power budget.

**Returns:** Number (watts)

### .efficiency()
Fraction of the throttle's desired steam actually drawn on the last power tick (0.0-1.0). 1.0 = the turbine got all the steam its throttle asked for. Below 1 means steam-starved (vent dormant, or upstream can't keep up). Use to detect whether the turbine is being fed enough.

**Returns:** Number (0-1)

### .is_stalled()
`True` when the throttle is up but no steam is arriving (the vent is dormant or the steam line is disconnected). Check `self.steam_in.level()` (upstream) and the feeding Cap's vent phase to diagnose. There is no water side to back up anymore.

**Returns:** Boolean

### .throttle()
Current throttle setting (0.0-1.0). 0 = off: the turbine consumes no steam and produces nothing (the default; idle until `set_throttle()` is called). Higher values draw more steam and produce more power, up to the peak at 1.0. Read-only view of what `set_throttle()` last committed.

**Returns:** Number (0-1)

### .set_throttle(t) `SELF ONLY`
Set the turbine throttle (0.0-1.0, clamped). 0 switches the turbine off (no steam consumed, no power). 1.0 draws full steam for peak watts. `self.set_throttle(1.0)` runs it flat out; ease down when the steam buffer runs dry so it isn't spinning on empty, e.g. `if self.steam_in.level() < 5: self.set_throttle(0.3)`. **This script-owned setpoint resets to 0 when the script stops, ends, or errors.**

**Returns:** [[ActionResult]] · Outcomes: `"ok"`

### .steam_in
Input flow port accepting steam from a [[Thermal Cap]] or [[Gas Tank]]. Call `self.steam_in.connect(...)` with the source's stable machine id or display name. A local source transfers directly; a remote source also needs a completed conflict-free Gas Pipe route between both locations. `self.steam_in.level()` shows the buffer: low = about to run dry; full = source is backpressured. See [[FluidPort]].

**Returns:** `FluidPort`

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].

## See also

- [[Thermal Vents]]: the steam source
- [[Tier 3 Progression]]: turbines compete with Heat Mk III and the Steam Condenser for steam
