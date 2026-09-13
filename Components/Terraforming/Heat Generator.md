---
tags:
  - component
  - terraforming
aliases:
  - heater_1
---
# Heat Generator

Warms the planet surface by producing heat. The best power setting shifts with the day's weather, so a script reads the conditions and holds the heater at the right level.

**Stats:** Power in variable · Produces up to 0.252 heat/day at peak efficiency · Input buffer 4 · Tiers Mk II, Mk III, Mk IV · Buy from the Shop for 800 cr.

**Access:** `self` / `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Methods

### .outpost
The outpost where this building is deployed, as an [[OutpostRef]].

### .input
Fuel Rod magazine for the **Mk IV** tier. Connect a [[Lead Cask]] to keep spare rods staged here; the generator swallows one whole rod at a time and burns it down internally. Empty and unused below Mk IV, and a Mk IV with no rod stops producing rather than degrading.

**Returns:** [[InputSlot]]

### .steam_in
Steam supply port installed by the **Mk III** pack. Call `connect(...)` with a compatible steam provider, then inspect `level()`, `capacity()`, `flow_rate()`, or `connected_to()`. Mk IV uses Fuel Rods instead, but the installed port remains available.

**Returns:** [[FluidPort]]

### .set_power(watts) `SELF ONLY`
Set base heater power from 0-10; values outside that range are clamped. `0` turns heating off. The best positive setting depends on the current `thermal_state()`, so update it with `self.set_power(value)` as conditions change. Higher Mk tiers multiply grid draw without changing the best base setting. A poor setting wastes energy and reduces heat output.

**Returns:** [[ActionResult]] · Outcomes: `"ok"`

### .thermal_state()
Current daily heater thermal state: one of `"clear"`, `"dust_storm"`, `"heat_bleed"`, `"dust_veil"`. Each state has its own optimal positive `set_power()` value. The state is stable throughout the current day and changes only on a new day, so read it at the start of each iteration and branch when the string changes. Your job is figuring out the four optimal values.

**Returns:** String

### .efficiency()
Current heating efficiency (0-100%). Hits 100% only when `set_power()` exactly matches the current `thermal_state()`'s optimal, and **falls off steeply** around it (not linearly): about 31% one step away, then a 10% floor for any setting two or more steps off. Reads 0% only when power is `0`. Scan positive power values and take the setting that reads 100% as each state's optimal.

**Returns:** Number (0-100%)

### .output()
Current heat-unit production rate per hour at the current settings. Heat accumulates to raise surface temperature over many days; the sensor rate display projects per-day totals. Reflects `efficiency() × tier multiplier`. Reads `0` if unpowered or no script running. Recomputed live on every read: a fresh `set_power(...)` is reflected immediately.

**Returns:** Number (heat units/h)

### .tier()
Permanently installed Mk tier as an integer (1-4). Upgrade packs raise this value; temporary Mk III steam starvation does not. Compare with `effective_tier()` when diagnosing a supplied or degraded heater.

**Returns:** Integer (1-4)

### .is_degraded()
`True` when a Mk III pack is starved of its required fluid input and the machine has fallen back to the previous tier multiplier for this tick. If `True`, your tier-3 heater is temporarily running as Mk II; look at `self.steam_in.level()` and the upstream [[Thermal Cap]].

**Returns:** Boolean

### .effective_tier()
The tier actually in effect this tick: `tier()` normally, previous tier while `is_degraded()` is `True`.

**Returns:** Integer

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].

## See also

- [[Tier 3 Progression]]: the Heat Mk III steam requirement (12 t/h)
- [[Atmosphere]]: `get_heat()` is the metric this machine advances
