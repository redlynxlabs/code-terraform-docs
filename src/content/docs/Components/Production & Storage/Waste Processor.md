---
tags:
  - component
  - production-storage
aliases:
  - waste_processor_1
title: "Waste Processor"
---

Permanently destroys one script-selected waste stream: **items, liquids, or gases**. Use the item input for unwanted stock, `liquid_in` for surplus water or other liquids, and `gas_in` for gases. It has no output and recovers no value.

**Stats:** Power in variable · Stockpile 200 (mixed)

**How to obtain:** The recipe unlocks with the **Waste Processing** research (Oxygen 1,400). Fabricate a Waste Processor Kit on a Fabricator: 2× Machine Frame, 4× Iron Ingot, 1× Circuit Panel. Deploy from Inventory.

**Access:** `self` / `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Methods

### .outpost
The outpost where this building is deployed, as an [[OutpostRef]].

### .set_enabled(enabled) `SELF ONLY`
Arm or pause destruction in the selected mode. **Stopping the owning script resets this setpoint to off.** Staged items and fluids remain intact.

**Returns:** [[ActionResult]] · Outcomes: `"ok"`

### .is_enabled()
Read whether the owning script has armed the processor.

**Returns:** Boolean

### .set_mode(mode) `SELF ONLY`
Select exactly one destruction stream: `"items"`, `"liquid"`, or `"gas"`. Changing modes pauses the other buffers without deleting them. The selected fluid port accepts flow only while enabled.

**Returns:** ActionResult · Outcomes: `"ok"`. **Raises:** `ValueError` for an invalid mode.

### .mode()
Read the selected waste stream: `"items"`, `"liquid"`, or `"gas"`.

**Returns:** String

### .status()
Read the exact live state: `"disabled"`, `"no_power"`, `"idle"`, or `"processing"`.

**Returns:** String

### .throughput() / .item_throughput() / .liquid_throughput() / .gas_throughput()
The selected mode's last destruction rate (`throughput()`), or the per-stream reads. Item mode reports units/h; liquid and gas modes report t/h. At 100% outpost efficiency, the liquid and gas maximum is **120 t/h**. 0 when nothing was destroyed.

**Returns:** Number

### .is_running()
`True` when the selected mode destroyed material on the last processing tick.

**Returns:** Boolean

### .input
Stage unwanted items for permanent destruction: `self.input.connect(name)` then `self.input.take(item_id, count)`. Item transfers are explicit, so they may be staged while another mode is selected; only enabled `"items"` mode destroys them. **Disable destruction before recovering a mistaken load with `eject(...)`.** See [[InputSlot]].

### .liquid_in / .gas_in
Generic **120 t** [[FluidPort]] input buffers for any liquid / any gas. They accept flow only while the processor is enabled in the matching mode. A non-empty buffer remains latched to one exact fluid until it drains.

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].

## See also

- [[Power & Terraforming Machines]]: incinerating items returns CO2 to the atmosphere
- [[Wildlife Supply]]: tar surplus disposal
