---
tags:
  - component
  - production-storage
  - biosphere
aliases:
  - harvester
---
# Harvester

A slow general-purpose surface vehicle that collects loose items, plants and tends crops, harvests Forage, and deploys fixed field machines. Movement and field work take time and build heat, so long routes need cooling pauses.

**Access:** `self` · Like every component, exposes `.id` and `.name`.

## Movement and collection

### .move(sector) `SELF ONLY`
Move one sector up, down, left, or right with `self.move("E14")`; diagonal moves are invalid. Travel takes 0.5 hours and pauses the script. `self.get_position()` shows the destination immediately, but physical actions stay locked until arrival. Moving into an item sector adds **1 heat**; moving into an empty one adds **7**, so scan first.

**Returns:** [[ActionResult]] · Outcomes: `"ok"` / `"invalid"` / `"too_far"` / `"already_here"` / `"overheated"` (transient) / `"moving"` (transient) / `"busy"` (transient)

### .collect() `SELF ONLY`
Pick up the item in the current sector into the Harvester's single held slot, not Inventory. Collection takes 0.25 hours and pauses the script. Empty sectors still take time and add **9 heat**.

**Returns:** [[ScanResult]] (payload `.id`, `.name`, `.value`) · Outcomes: `"ok"` / `"empty"` (success, nothing there) / `"holding"` / `"overheated"` / `"moving"` (transient) / `"busy"` (transient) / `"collecting"` (transient)

### .store() `SELF ONLY`
Move the harvester's held item into the first empty inventory slot, freeing the held slot for the next pickup. A full inventory leaves the item held; drop it or free space by selling.

**Returns:** [[ItemResult]] (payload `.item_id`) · Outcomes: `"ok"` / `"empty"` (already empty) / `"inventory_full"`

### .drop() `SELF ONLY`
Release the currently held item into the harvester's current sector: the cell becomes collectable again. Use it to stage items for later pickup or clear the held slot without storing.

**Returns:** ActionResult · Outcomes: `"dropped"` / `"empty"` / `"occupied"` / `"moving"` (transient) / `"busy"` (transient)

### .get_held()
Item id currently held by the harvester, or empty string if the held slot is empty. Essential first line of any collect loop.

**Returns:** String

### .get_position() / .position()
Current sector id as a string (e.g. `"E14"`). Movement is strictly to adjacent cells, so the script needs to know where it is to compute where it can go. `position()` is the same source exposed as a property-style read for grid scripts; the Plants verbs all act on this cell.

**Returns:** String (sector)

## Heat

### .get_heat()
Exact current heat level (0-100), including fractional cooling between whole heat costs. Every `move()` adds heat, and an empty-sector `collect()` attempt also adds heat; passive cooling runs continuously as game time passes, including during movement and collection. Read before moving: if you're close to 100 and your planned route crosses empty cells (+7 heat each), stop and cool.

**Returns:** Number (0-100)

### .get_max_heat()
Maximum heat capacity: always 100. Reaching this stalls all movement and collection until heat drops below the cap.

**Returns:** Number (100)

### .is_overheated()
`True` when `heat >= 100`. Use it as an early-exit guard when you intentionally want the harvester to cool: `if self.is_overheated(): sleep(1)`. The harvester cools passively whenever game time advances.

**Returns:** Boolean

## Water supply

### .water_level() / .water_capacity()
Onboard water in tons (including fractions) and the maximum (currently 5 t). Each watering uses 1 t. Compare to plan refills.

**Returns:** Number

### .refill_water() `SELF ONLY`
Refill the Harvester's onboard water supply from the home outpost's water tanks, from anywhere on the grid. Refilling takes 0.25 hours and pauses the script.

**Returns:** ActionResult · Outcomes: `"ok"` / `"locked"` / `"moving"` / `"overheated"` / `"tank_empty"` / `"already_full"` / `"busy"`

## Crops (Plants chain)

### .load_seed(seed) `SELF ONLY`
Transfer one species seed from home Inventory, from anywhere on the grid, into the Harvester's single held slot. Use the same seed id with `plant(seed)` after driving to an empty field cell. Loading fails while another item is held.

**Returns:** ActionResult · Outcomes: `"ok"` / `"locked"` / `"invalid_seed"` / `"no_seed"` / `"holding"` / `"overheated"` / `"moving"` / `"busy"`

### .plant(seed) `SELF ONLY`
Sow the physical seed currently in the Harvester's held slot into this empty cell. The argument must identify that held seed. The base sector is depot ground and refuses sowing. Sowing takes 0.5 hours, and the seed and new crop appear only after the action finishes.

**Returns:** ActionResult · Outcomes: `"ok"` / `"locked"` / `"invalid_seed"` / `"no_seed"` / `"not_empty"` / `"base_sector"` / `"overheated"` / `"moving"` / `"busy"`

### .light() `SELF ONLY`
Light the current plantable cell with the Harvester's work lamp, even if it is already lit or covered by a [[Grow Lamp]]. Each application resets the treatment to 24 hours when the work finishes, replacing any remaining time. Lighting takes 0.25 hours and pauses the script.

**Returns:** ActionResult · Outcomes: `"ok"` / `"locked"` / `"not_plantable"` / `"overheated"` / `"moving"` / `"busy"`

### .water() `SELF ONLY`
Water the current plantable cell from the Harvester's onboard supply, even if it is already watered or covered by a [[Sprinkler]]. Each watering uses 1 t and resets the treatment to 24 hours. Watering takes 0.25 hours and pauses the script.

**Returns:** ActionResult · Outcomes: `"ok"` / `"locked"` / `"insufficient_water"` / `"not_plantable"` / `"overheated"` / `"moving"` / `"busy"`

### .dispense_salt() `SELF ONLY`
Treat the current plantable cell with one unit of `salt` from Inventory, even if it is already salted or covered by a [[Dispenser]]. Resets the treatment to 24 hours. Dispensing takes 0.25 hours. Water Pumps produce salt as a byproduct.

**Returns:** ActionResult · Outcomes: `"ok"` / `"locked"` / `"no_salt"` / `"not_plantable"` / `"overheated"` / `"moving"` / `"busy"`

### .fertilize(item_id="fertilizer") `SELF ONLY`
Dose the current cell's growing plant with one Fertilizer Mk I, II, or III. Each unit boosts output for 8 hours. Additional units of the same tier extend it; wait for the active dose to drain before switching tiers. Dosing occupies the Harvester for 0.25 hours.

**Returns:** ActionResult · Outcomes: `"ok"` / `"invalid_input"` / `"locked"` / `"no_plant"` / `"already_mature"` / `"tier_conflict"` / `"no_dose"` / `"overheated"` / `"moving"` / `"busy"`

### .accelerate() `SELF ONLY`
Dose the current cell's growing plant with one `growth_accelerant` to double its growth rate for 8 hours. The dose cannot affect a crop that is already mature.

**Returns:** ActionResult · Outcomes: `"ok"` / `"locked"` / `"no_plant"` / `"already_mature"` / `"no_dose"` / `"overheated"` / `"moving"` / `"busy"`

### .amplify() `SELF ONLY`
Apply one `yield_amplifier`: the capstone **field-wide** Forage-output boost (no cell needed). The dose drains over about one game-day, so re-call to sustain.

**Returns:** ActionResult · Outcomes: `"ok"` / `"locked"` / `"no_dose"` / `"overheated"` / `"moving"` / `"busy"`

### .amplifier_remaining()
Hours remaining on the field-wide Yield Amplifier effect. Each applied unit adds 24 hours. Returns 0 when the field is not amplified.

**Returns:** Number (hours)

### .harvest() `SELF ONLY`
Harvest the ready crop in the current cell. The action takes 0.5 hours and transfers nothing until it finishes. On completion it moves as much of `cell.forage` as Inventory can hold: a crop larger than the free room leaves its remainder banked and the plant standing, so drain Inventory and harvest again to collect the rest. Only a fully collected crop is removed and frees the cell for another physical seed.

**Returns:** ActionResult · Outcomes: `"ok"` / `"partial"` / `"locked"` / `"no_plant"` / `"not_mature"` / `"no_forage"` / `"inventory_full"` / `"overheated"` / `"moving"` / `"busy"`

### .uproot() `SELF ONLY`
Remove the plant in the current cell and place one matching seed in Inventory. Uprooting takes 0.5 hours.

**Returns:** ActionResult · Outcomes: `"ok"` / `"no_plant"` / `"inventory_full"` / `"locked"` / `"overheated"` / `"moving"` / `"busy"`

## Field machines

### .deploy(kit) `SELF ONLY`
Place a supported field-machine kit in the current empty cell, consuming one kit from Inventory. Installation takes 0.25 hours. Call `deployables()` for the available kit ids. Seed Makers and other outpost buildings deploy through Inventory.

**Returns:** ActionResult · Outcomes: `"ok"` / `"locked"` / `"no_kit"` / `"not_empty"` / `"invalid_kit"` / `"overheated"` / `"moving"` / `"busy"`

### .deployables()
List of fixed field-machine kit ids unlocked by your current research. This is a capability list, not a live deployment check: `deploy(...)` still checks Inventory stock, the current cell, movement, heat, and whether the Harvester is busy. Empty until Grow Lamp research.

**Returns:** List of kit ids

### .undeploy() `SELF ONLY`
Remove the fixed field machine in the current cell and return its kit to Inventory. This is the **only removal path** for Grow Lamps, Sprinklers, Dispensers, and Crop Automators. Its stored items must be empty, the hardware refund must fit, and its attached script must not be running. Authored scripts remain available in Computer > Scripts without a host. Unfinished machine work and machine-only result history are discarded; queued Crop Automator jobs have not consumed their inputs. Removal takes 0.25 hours.

**Returns:** ActionResult · Outcomes: `"ok"` / `"nothing"` / `"not_empty"` / `"script_present"` / `"inventory_full"` / `"overheated"` / `"moving"` / `"busy"`

## Grid reads

### .cell(sector)
Read one grid sector as a [[Cell]] snapshot. Unscanned natural ground has status `"unknown"` until scanned; the depot and player-created plants or providers stay visible. The snapshot includes plant, growth, conditions, and remaining treatment hours. Returns `None` for an invalid sector.

**Returns:** `Cell` or `None`

### .cells()
Read every harvester-grid sector as a list of [[Cell]] snapshots. Unscanned natural ground reports status `"unknown"`; scan sectors before planning around occupancy. Use the list for field-wide planting, treatment-route scheduling, uprooting, undeploying, and harvesting policies.

**Returns:** List of `Cell`

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].

## Heat costs summary

| Action | Heat |
| --- | --- |
| Move into an item sector | +1 |
| Move into an empty sector | +7 |
| Empty-sector collect attempt | +9 |
| Passive cooling | continuous as game time passes |

## See also

- [[First Harvesting Route]]: the tutorial
- [[Biosphere Plants]]: the crop chain this vehicle tends
- [[Scanner]]: scan sectors before sweeping
