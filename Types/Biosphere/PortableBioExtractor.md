---
tags:
  - type
  - biosphere
aliases:
  - PortableBioExtractor
---
# PortableBioExtractor

Drone bio-extractor module. **Returned by:** `self.bio_extractor` on drones.

### .extract()
**Yielding** harvest at the discovered permanent biosite under a hovering drone. The drone stays occupied until completion, **including across a script stop and restart**. The module has a 25 t chamber for one life-form type; Cargo Pods add capacity. Partial depletion persists, and cooldown starts only when the site is empty.

**Returns:** [[BioExtractionResult]] (payload `.extracted`) · Outcomes: `"ok"` / `"not_mounted"` / `"scrambled"` (transient) / `"busy"` (transient) / `"not_at_location"` / `"not_scanned"` / `"cooling"` (transient) / `"no_cargo_space"`

## See also

- [[DroneCargo]]: where the material lands
- [[Essence Liquifier]]: where it goes next
