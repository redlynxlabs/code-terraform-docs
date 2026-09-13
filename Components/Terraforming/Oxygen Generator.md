---
tags:
  - component
  - terraforming
aliases:
  - o2gen_1
---
# Oxygen Generator

Draws CO2 from the atmosphere and turns it into breathable oxygen, one of the core steps toward a livable planet. It runs only when a script sets its intake.

**Stats:** Power in -8 W · Produces up to 0.240 ppt/day at peak efficiency · Input buffer 4 · Tiers Mk II, Mk III, Mk IV · Buy from the Shop for 1,000 cr.

**Access:** `self` / `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Methods

### .outpost
The outpost where this building is deployed, as an [[OutpostRef]].

### .input
Fuel Rod magazine for the **Mk IV** tier. Connect a [[Lead Cask]] to keep spare rods staged here; the generator swallows one whole rod at a time and burns it down internally. Empty and unused below Mk IV, and a Mk IV with no rod stops producing rather than degrading.

**Returns:** [[InputSlot]]

### .water_in
Water supply port installed by the **Mk III** pack. Call `connect(...)` with a compatible water provider. Mk IV uses Fuel Rods instead, but the installed port remains available.

**Returns:** [[FluidPort]]

### .set_intake(value) `SELF ONLY`
Set CO2 intake rate for this tick. Call `self.set_intake(atmosphere.get_co2() / 10)` each iteration: the chamber's peak-efficiency sweet spot is exactly 1/10th of ambient CO2. Values above or below that point reduce efficiency smoothly; there is no precision-sensitive cutoff.

**Returns:** [[ActionResult]] · Outcomes: `"ok"`

### .waste()
Current carbon waste level (0-100). Production runs clean below 60, drops linearly 60-100, and stalls (zero output) at 100. Check this each iteration before calling `dump_waste()`: dumping between 50-60 is penalty-free; dumping elsewhere costs efficiency.

**Returns:** Number (0-100)

### .dump_penalty()
Current efficiency penalty from the last `dump_waste()` call (0-1). `0` means no active waste-clearing penalty; `0.25` means output is reduced by 25%. A bad dump remains visible here until the next `dump_waste()` call.

**Returns:** Number (0-1)

### .dump_waste() `SELF ONLY`
Clear accumulated carbon waste. Call `result = self.dump_waste()` when `waste()` is in the 50-60 sweet spot for a clean dump. The penalty lingers until the next dump.

**Returns:** [[WasteDumpResult]] (payload `.penalty`) · Outcomes: `"ok"` (the waste chamber was emptied; this dump applied an efficiency penalty of `.penalty`)

### .efficiency()
Current conversion efficiency (0-100%). Hits 100% when intake matches CO2/10, CO2 is available, waste is at or below 60, and no dump penalty is active. Waste above 60 reduces efficiency; waste at 100 stalls production.

**Returns:** Number (0-100%)

### .output()
Current O2 production rate in ppt/h at the current settings. Reflects `efficiency() × tier multiplier`, capped by available CO2. Reads `0` if the machine is unpowered, no script is running, CO2 is exhausted, or waste has stalled production. Recomputed live on every read.

**Returns:** Number (ppt/h)

### .tier()
Permanently installed Mk tier as an integer (1-4). Upgrade packs raise this value; temporary Mk III fluid starvation does not.

**Returns:** Integer (1-4)

### .is_degraded()
`True` when a Mk III pack is starved of its required fluid input and the machine has fallen back to the previous tier multiplier for this tick. If `True`, check `self.water_in.level()` and the upstream pipe.

**Returns:** Boolean

### .effective_tier()
The tier actually in effect this tick: `tier()` normally, previous tier while `is_degraded()` is `True`.

**Returns:** Integer

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].

## See also

- [[Atmosphere]]: `get_co2()` for the intake calculation; the carbon cycle
- [[Tier 3 Progression]]: the Oxygen Mk III water requirement (8 t/h)
