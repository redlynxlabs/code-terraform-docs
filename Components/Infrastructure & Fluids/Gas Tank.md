---
tags:
  - component
  - infrastructure-fluids
aliases:
  - gas_tank_1
---
# Gas Tank

A passive buffer that **latches onto the first gas piped in** (steam, ammonia, swamp gas...) and holds only that until it drains. Sitting between a source and its consumer, it smooths out gaps in supply.

**Stats:** Type Fluids · Storage: any gas, 5,000 t

**How to obtain:** Requires the **Gas Tank** research (Pressure 2.75). Buy from the Shop for 1,200 cr.

**Access:** `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Latching model

The tank commits to the first gas it receives and holds only that until it drains to 0, then re-latches. At 0 it can accept a different gas next.

## Methods

### .outpost
The outpost where this building is deployed, as an [[OutpostRef]].

### .fluid()
The latched gas id, or `""` while empty. Possible values: `""`, `"steam"`, `"ammonia"`, `"swamp_gas"`, `"raw_sulfur_gas"`, `"sulfur_gas"`, `"raw_chlorine"`, `"chlorine"`.

**Returns:** String

### .level()
Current gas stored in tons (0 to `capacity()`). Near 0 means downstream is about to starve; near capacity means upstream is backpressured.

**Returns:** Number (tons)

### .capacity()
Maximum tons this tank holds. Queryable rather than hardcoded so tank tuning doesn't break scripts.

**Returns:** Number (tons)

### .fill_pct()
Fill fraction (0-1), shortcut for `level() / capacity()`. Threshold checks: `if self.fill_pct() < 0.2: # boost throttle upstream`.

**Returns:** Number (0-1)

### .inflow_rate()
Gas arriving in t/h. 0 means no upstream flow: dormant source, unavailable relationship, incomplete remote route, or full tank.

**Returns:** Number (t/h)

### .outflow_rate()
Gas leaving in t/h. 0 means the downstream consumer is saturated or the pipe is disconnected.

**Returns:** Number (t/h)

### .is_full()
`True` when `level() == capacity()`: upstream backpressure is kicking in, and a Cap may start venting. Detects when destinations cannot absorb current production.

**Returns:** Boolean

### .is_empty()
`True` when `level() == 0`: the tank is unlatched and nothing can be sent downstream. If the source is still active, inspect the source and its pipe connection.

**Returns:** Boolean

### .gas_in / .gas_out
Generic [[FluidPort]] input and output. Neutral while empty; the first exact gas delivered latches the tank, and the output then provides that latched gas to connected consumers.

### .steam_in / .steam_out
[[FluidPort]] input/output for the exact latched gas. **These properties exist only while `fluid()` is `"steam"`** (the pattern generalizes: exact-fluid ports appear for the latched fluid).

## See also

- [[Flow Networks & Fluids]]: how latching and flow ticks work
- [[Liquid Tank]] / [[Large Liquid Tank]]: the liquid equivalents
- [[Steam Turbine]]: a common steam consumer
