---
tags:
  - guide
  - editor
---
# Script Variants

Variants are named script snapshots you can reuse across a fleet without copying code by hand.

## Main and named variants

Every script starts with **Main**. Main is this machine's own fallback code; it is not shared and cannot be renamed or deleted.

A machine can expose two named catalogs:

- **Exact type**: specialized for that precise machine model or tier.
- **Compatible family**: shared only by models that expose the same scripting contract. Small, Medium, and Large Drones share Drone family variants, for example. A Water Pump and Oil Pump do not share merely because both extract fluids.

The Variants tab always lists exact-type variants first and compatible-family variants below them. Machines without an explicitly compatible family show only the exact-type catalog. When you save a variant on a compatible machine, you choose which catalog owns it.

## Editing the active variant

The Code tab edits whichever variant is active. Changes to Main stay with this script. Changes to a named variant update its shared catalog entry, while other scripts keep their loaded copies until you explicitly update them. An older loaded copy is marked **outdated**; click **Update** to load the latest catalog version, or **Keep mine** to save that copy as a separate named variant.

Use **Duplicate Variant** or **Save Selection as Variant** to publish the current code as a new named catalog entry. Duplicate names across the visible catalogs are blocked so variant selection stays unambiguous.

## Use and Apply to all

**Use** loads a catalog variant into this machine's running code and makes it active here.

**Apply to all** respects the catalog that owns the variant. An exact-type variant targets that precise type. A family variant targets every explicitly compatible tier with the same script slot. If the selected named variant is active here and you edited it, Apply to all uses the updated catalog source.

When the applied source changes, a running target restarts automatically with the new code. A manually paused target stays paused, a power-paused target waits for power and then resumes, and a stopped target stays stopped. A target that already has the same source keeps its current evaluator without a restart.

Apply to all is a one-time copy, not a permanent shared link. Future edits to a named variant update its catalog entry but do not change other scripts' loaded copies. Use Apply to all again when you intentionally want those scripts to load the improved version. Changes to Main remain private to the script that owns it.

## Catalog changes

Renaming or deleting a named variant changes only its owning catalog. When a saved variant is deleted, scripts using it keep their current working code and lifecycle, then detach to Main. A running script keeps its evaluator, a paused script stays paused, and a stopped script stays stopped.

A top-of-file `"""docstring"""` or first-line `#` comment becomes the variant description shown in the list. Function docstrings are separate: they appear in hover and autocomplete, and [[Docstrings]] lists the supported formatting.

## Sharing real code

Compatible family sharing is explicit machine metadata, not a guess based on names or appearance. If different scripting contracts need common helper functions, put those helpers in a Library script and import them instead of forcing those machines into one variant family. See [[Imports & Libraries]].
