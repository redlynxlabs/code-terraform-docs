---
tags:
  - component
  - power
aliases:
  - lightning_rod
---
# Lightning Rod

A **4,000 Wh emergency reserve** that catches lightning within 600 m and discharges behind batteries. Condition falls 0.05 per day, reducing capture to zero unless a running script repairs it with 1 Storm Glass.

**Stats:** Energy 4,000 Wh · Input buffer 5 units

**How to obtain:** The recipe unlocks with the **Lightning Rods** research (Temperature 8,000). Fabricate on a [[Fabricator]]: 1× Machine Frame, 4× Battery Cell, 2× Circuit Panel. Deploy from Inventory.

**Access:** `self` / `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Methods

### .outpost
The outpost where this building is deployed, as an [[OutpostRef]].

**Returns:** `OutpostRef`

### .bank()
Wh currently banked, 0 up to `capacity()`. Rises only when a strike lands within catch range of this rod; falls automatically when its grid is short and the batteries are empty. It **never charges from grid surplus**.

**Returns:** Number (Wh banked)

### .capacity()
Bank capacity in Wh, several times a base battery. Query this instead of hardcoding the number.

**Returns:** Number (Wh)

### .last_strike()
Hour timestamp of the last strike from which this rod accepted energy, or -1 if none. A strike that adds no energy, for example when the bank is full or integrity is zero, does not update this record. Compare with the clock's current time to see how long it has been since energy was last captured.

**Returns:** Number (hour timestamp, or -1)

### .input
The rod's material slot. Feed it Storm Glass with your ordinary logistics, then spend one with `repair()` to restore full condition.

**Returns:** [[InputSlot]] holding the Storm Glass

### .integrity()
This rod's condition from 0 to 1, which is also its capture efficiency. Continuous corrosion lowers it by 0.05 per day; strikes do not cause separate damage. A rod at 0.5 banks half of every strike it catches, and one at 0 banks nothing while still standing and still repairable.

**Returns:** Number (0-1)

### .repair() `SELF ONLY`
Restore this rod to full condition. If it is worn, one call consumes 1 Storm Glass from its input and sets condition to 1. At full condition, no material is consumed. Without Storm Glass in the input, condition does not change.

**Returns:** [[ActionResult]] · Outcomes: `"ok"` / `"no_op"` (already at full condition; nothing consumed) / `"no_material"` (no Storm Glass in the input)

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].

## See also

- [[Weather System]]: where Storm Glass comes from
- [[Power Networks]]: how the Lightning reserve discharges behind batteries
