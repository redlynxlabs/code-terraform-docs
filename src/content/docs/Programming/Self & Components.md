---
tags:
  - guide
  - programming
title: "Self & Components"
---

Most scripts in Code: Terraform run **inside a machine**. A Scanner script runs inside the [[Scanner]]; a Bio Lab script runs inside the [[Bio Lab|Lab]]. Inside that script, `self` means **this machine**.

```python
scan = self.scan("E14")
analysis = self.analyze()
if analysis.status == "ok":
  info = analysis.info
```

## Hardware actions are local

Actions that change physical state or spend game time are usually **SELF ONLY**. Store their result, branch on `.status`, and read `.message`; specialized results add payload fields. See [[Command Results]].

```python
move = self.move("E14")
if move.status == "ok":
  pickup = self.collect()
```

## Reading another component

Use `get_component(id)` for read-only coordination:

```python
scanner = get_component("scanner_1")
scanned = scanner.get_scanned()
```

Sometimes a local action accepts another component reference:

```python
collector = get_component("bio_collector_1")
taken = self.take_from(collector)
if taken.status != "ok":
  print(taken.message)
```

The action still belongs to the Bio Lab's `self`; it is not remote control of the Collector. Use shared state or [[Signal Bus Guide|Signal Bus]] messages to coordinate separate machine scripts.

Stable ids such as `"bio_collector_1"` are safest for long-running scripts. Display names are convenient but can change.

## Where to look next

Open [[Components Index|Components]] for the full reference list, and [[Components Overview]] for how component access works in depth.
