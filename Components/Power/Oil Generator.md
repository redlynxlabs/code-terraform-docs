---
tags:
  - component
  - power
aliases:
  - oil_generator_1
---
# Oil Generator

Burns oil into strong buffered bridge power. Oil wells pulse between active and dormant phases, so bank their output in [[Liquid Tank|Liquid Tanks]] for continuous generation. Idle until a script runs it.

**Stats:** Power out +700 W · Consumes Oil, buffer 10 t

**How to obtain:** Requires the **Oil Generator** research (Temperature 1,500). Buy from the Shop for 2,000 cr.

**Access:** `self` / `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Methods

### .outpost
The outpost where this building is deployed, as an [[OutpostRef]].

**Returns:** `OutpostRef`

### .power_output()
Watts fed to the grid on the last power tick. 0 when throttled to 0 OR the `oil_in` buffer is starved. The generator scales output proportionally to available oil, so a partially-starved generator produces partial power. Updates once per power tick; a fresh `set_throttle(...)` is reflected on the next tick.

**Returns:** Number (watts)

### .oil_consumption()
Actual oil consumed on the last power tick, in t/h. With enough oil supplied, demand scales linearly with throttle from 0 t/h at 0 to **8 t/h** at 1. Partial or total oil starvation lowers the actual rate.

**Returns:** Number (t/h)

### .throttle()
Current throttle (0-1). 0 by default: the generator idles until scripted.

**Returns:** Number (0-1)

### .set_throttle(rate) `SELF ONLY`
Set the generator throttle (0-1). Power output and oil consumption scale linearly with the throttle. **This script-owned setpoint resets to 0 when the script stops, ends, or errors**, so keep the control loop running while the Generator should operate.

**Returns:** [[ActionResult]] · Outcomes: `"ok"`

### .oil_in
Input flow port for oil. Wire with `self.oil_in.connect("Liquid Tank 1")` (recommended) or directly to an [[Oil Pump]]. See [[FluidPort]].

**Returns:** `FluidPort`

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].

## See also

- [[Flow Networks & Fluids]]: the oil chain in context
- [[Power & Terraforming Machines]]: burning oil returns CO2 for oxygen production
