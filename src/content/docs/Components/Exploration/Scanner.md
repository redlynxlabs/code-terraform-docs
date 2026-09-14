---
tags:
  - component
  - exploration
aliases:
  - scanner_1
title: "Scanner"
---

Reveals the sectors of the harvester grid around base so the [[Harvester]] knows where to collect. It maps the **home grid only**; exploring the wider planet is a job for a vehicle's sonar.

**Access:** `get_component("scanner_1")` · Like every component, exposes `.id` and `.name`.

## Methods

### .scan(sector) `SELF ONLY`
Scan one local sector with `self.scan("E14")`. The scan takes a few ticks and pauses the script. Malformed or out-of-bounds sector ids raise `ValueError`. This local-grid scanner finds surface items, not planetary [[Site]] contacts.

**Returns:** [[ScanResult]] (`.status`, `.message`; payload `.id`, `.name`, `.value`)

| Status | Kind | Meaning |
| --- | --- | --- |
| `"ok"` | success | The sector scan found `item_id` |
| `"empty"` | success | The sector scan completed and found no item |

**Raises:** `ValueError` for an invalid sector id

### .get_scanned()
Every previously scanned sector as a **fresh** dict `{sector_id: ScanResult}`. Iterate with `.keys()` / `.values()` / `.items()`, or index by sector id: `self.get_scanned()["E14"]`. A sector only needs to be physically scanned once, and that history persists across script runs. Each `get_scanned()` call reflects the current contents of those sectors, including items collected or dropped since the last call. A dict or ScanResult already saved in your script does not update itself, so call `get_scanned()` again before choosing another target. Returns an empty dict if nothing has been scanned yet.

**Returns:** Dict (sector ID → ScanResult)

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].

## See also

- [[Harvester]]: reads the scan map to decide where to sweep
- [[Sonar Module]]: the vehicle-mounted equivalent for world sites
