---
tags:
  - component
  - infrastructure-fluids
aliases:
  - liquid_tank_1
---
# Liquid Tank

Passive buffer that holds any **one** liquid: water, oil, or a biome essence. It commits to the first liquid piped in.

**Stats:** Type Fluids · Storage: any liquid, 100 t

**How to obtain:** Requires the **Liquid Tank** research (Oxygen 400). Buy from the Shop for 900 cr.

**Access:** `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Methods

### .outpost
The outpost where this building is deployed, as an [[OutpostRef]].

### .fluid()
The latched liquid id, or `""` while empty/unlatched. Possible values: `""`, `"water"`, `"oil"`, `"frozen_essence"`, `"coastal_essence"`, `"geothermal_essence"`, `"volcanic_essence"`, `"deep_essence"`, `"brine"`, `"raw_cryofluid"`, `"cryofluid"`, `"raw_quicksilver"`, `"quicksilver"`. The tank commits to the first liquid it receives and holds only that until it drains to 0, then re-latches.

**Returns:** String

### .level()
Current liquid stored in tons (0 to `capacity()`). At 0 the tank unlatches and can accept a different liquid next.

**Returns:** Number (tons)

### .capacity()
Maximum tons this tank holds. Queryable rather than hardcoded.

**Returns:** Number (tons)

### .fill_pct()
Fill fraction (0-1), shortcut for `level() / capacity()`. Common threshold in supply-control scripts.

**Returns:** Number (0-1)

### .inflow_rate() / .outflow_rate()
Liquid arriving / leaving in t/h. 0 inflow = no upstream flow; 0 outflow = no downstream consumer drawing.

**Returns:** Number (t/h)

### .is_full() / .is_empty()
Full: `level() == capacity()`, upstream source backpressured. Empty: `level() == 0`, unlatched, downstream starved.

**Returns:** Boolean

### .liquid_in / .liquid_out
Generic [[FluidPort]] input and output. Neutral while empty: `connect(...)` with the provider's stable machine id or display name, and the first exact liquid delivered latches the tank. The output provides the latched liquid to connected consumers.

### .water_in / .water_out
Exact-fluid [[FluidPort]] properties that **exist only while `fluid()` is `"water"`** (the pattern generalizes to the latched fluid).

## See also

- [[Large Liquid Tank]]: 1,000 t version
- [[Oil Pump]] / [[Water Pump]]: cyclic sources worth buffering
- [[Flow Networks & Fluids]]: latching and flow rules
