---
tags:
  - component
  - infrastructure-fluids
aliases:
  - large_liquid_tank_1
---
# Large Liquid Tank

A big passive tank holding **1,000 t** of one liquid. Like a [[Liquid Tank]] it sticks to the first fluid piped in and only lets go once it has drained completely.

**Stats:** Type Fluids · Storage: any liquid, 1,000 t

**How to obtain:** Requires the **Large Liquid Tank** research (Plants 900,000). Buy from the Shop for 15,000 cr.

**Access:** `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Methods

Identical API to [[Liquid Tank]], at 10× the capacity.

### .outpost
The outpost where this building is deployed, as an [[OutpostRef]].

### .fluid()
The latched liquid id, or `""` while empty. Possible values: `""`, `"water"`, `"oil"`, `"frozen_essence"`, `"coastal_essence"`, `"geothermal_essence"`, `"volcanic_essence"`, `"deep_essence"`, `"brine"`, `"raw_cryofluid"`, `"cryofluid"`, `"raw_quicksilver"`, `"quicksilver"`.

**Returns:** String

### .level() / .capacity() / .fill_pct()
Current tons stored (0 to capacity; at 0 the tank unlatches), maximum tons, and the 0-1 fill fraction shortcut.

**Returns:** Number

### .inflow_rate() / .outflow_rate()
Liquid arriving / leaving in t/h. 0 inflow = no upstream flow; 0 outflow = no downstream consumer drawing.

**Returns:** Number (t/h)

### .is_full() / .is_empty()
Full: upstream source is backpressured. Empty: unlatched, downstream consumers starved.

**Returns:** Boolean

### .liquid_in / .liquid_out
Generic [[FluidPort]] input and output; neutral while empty, latched to the reservoir's exact liquid once filled.

### .water_in / .water_out
Exact-fluid [[FluidPort]] properties that **exist only while `fluid()` is `"water"`** (the pattern generalizes to the latched fluid).

## See also

- [[Liquid Tank]]: the 100 t starter version
- [[Flow Networks & Fluids]]: latching and flow rules
