---
tags:
  - component
  - biosphere
aliases:
  - crop_automator_1
---
# Crop Automator

Queues harvest, plant, and treatment jobs across up to **24 other cells in a centered 5 by 5 service area**, then executes one job at a time with a short pause between them.

**Stats:** Type Biosphere · Power in -60 W (draws from grid) · Output buffer 50,000 units · Stockpile 400 units (mixed)

**How to obtain:** Requires the **Field Automation** research (Plants 620,000). Buy from the Shop for 30,000 cr. Deploy the kit on an empty field cell with a [[Harvester]]'s `deploy()`.

**Access:** `self` · Like every component, exposes `.id` and `.name`.

## Job submission

All three return a [[JobReceipt]] (payload `.job_id`, `.queue_position`). Submission is immediate; the serial executor works the 50-job FIFO one at a time (valid field work takes 0.1 hours per job).

### .harvest(sector) `SELF ONLY`
Submit one harvest job for a covered sector. Missing output space pauses this FIFO head without bypassing it; a target mismatch is terminal, takes no work time, and advances the queue.

**Outcomes:** `"queued"` / `"queue_full"` (transient) / `"not_placed"` / `"out_of_range"` · **Raises:** `ValueError` for an invalid sector id

### .plant(sector, seed_id) `SELF ONLY`
Submit one planting job with a species seed. The seed need not be loaded yet: the executor **pauses at this FIFO head until the seed is present**, then spends 0.1 hours and rechecks the target before committing.

**Outcomes:** `"queued"` / `"queue_full"` (transient) / `"not_placed"` / `"out_of_range"` / `"invalid_seed"` · **Raises:** `ValueError`

### .apply(sector, item_id) `SELF ONLY`
Submit one Fertilizer Mk I/II/III or Growth Accelerant job. Same pause-until-material behavior as `plant()`.

**Outcomes:** `"queued"` / `"queue_full"` (transient) / `"not_placed"` / `"out_of_range"` / `"invalid_material"` · **Raises:** `ValueError`

## Field reads

### .position()
The automator's own grid sector. Jobs can target up to 24 other cells in its centered 5 by 5 service area.

**Returns:** String

### .cell(sector)
One sector in the service area as a [[Cell]] snapshot: plant, status, growth, conditions, remaining treatment hours. The addressable set is exactly what `harvest()`/`plant()`/`apply()` accept; `None` means outside the service area or not a valid sector.

**Returns:** `Cell` or `None`

### .cells()
Every served sector as `Cell` snapshots, for sweeping the whole area in one pass. Unscanned natural ground reports status `"unknown"`.

**Returns:** List of `Cell`

## Executor state

### .status()
Exact executor state: `"not_placed"`, `"no_power"`, `"working"`, `"no_seed"`, `"no_material"`, `"output_full"`, `"results_full"`, or `"idle"`.

**Returns:** String

### .current_job()
Active FIFO head as a [[CropJob]] (action, target, progress, blocker), or `None` while idle.

**Returns:** `CropJob` or `None`

### .get_queue() / .queue_count()
Snapshot of pending `CropJob` values in exact FIFO order (active job reported separately), and the total unfinished count including the active job (max 50).

**Returns:** List of `CropJob` / Number

## Results

### .result_count()
Completed terminal results waiting in the inbox. **At 50, execution pauses until results are consumed.**

**Returns:** Number

### .next_result() `SELF ONLY`
Consume the oldest terminal result as a [[CropJobResult]] (payload `.job_id`, `.action`, `.sector`, `.item_id`, `.collected`, `.discarded`).

**Outcomes:** `"ok"` / `"partial"` (harvested but output only had room for `.collected`; `.discarded` lost, cell cleared) / `"empty"` (success, nothing waiting) / `"out_of_range"` / `"no_plant"` / `"not_mature"` / `"no_forage"` / `"not_empty"` / `"base_sector"` / `"already_mature"` / `"tier_conflict"` / `"invalid_seed"` / `"invalid_material"`

### .cancel_job(job_id) `SELF ONLY`
Cancel one active or pending job. Canceling active work discards only its progress; inputs and field state stay unchanged.

**Returns:** [[ActionResult]] · Outcomes: `"ok"` / `"not_found"`

### .move_job(job_id, position) `SELF ONLY`
Move one unfinished job to a one-based execution position (1 = first, `queue_count()` = last). Reordering only pending work preserves active progress; displacing the active job preempts it (keeps id and request, loses progress, no terminal result).

**Returns:** ActionResult · Outcomes: `"ok"` / `"not_found"` / `"invalid"`

### .clear_queue() `SELF ONLY`
Cancel the active job and every pending job. Completed results remain in the inbox.

**Returns:** [[CountResult]] (payload `.count`) · Outcomes: `"ok"` / `"no_op"`

## Slots

### .input
Standard multi-material [[InputSlot]] accepting species seeds, Fertilizer Mk I/II/III, and Growth Accelerant.

### .output
Standard [[OutputSlot]] containing collected Forage. Send to a local destination, or let a local [[Plant Terraformer]] pull from it. Every route uses normal timed transfers.

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].

## See also

- [[Harvester]]: the mobile alternative and deployment tool
- [[Biosphere Plants]]: crop conditions and growth model
