---
tags:
  - component
  - core-systems
aliases:
  - nocturna
title: "Nocturna"
---

Provides stable planet-wide data for Nocturna through `get_component("nocturna")`, including map bounds, biomes, terraforming progress, and permanent map contacts. Hidden weather aftermaths are deliberately absent; their coordinates exist only in the storm packets your station network captures. Sonar discoveries and surveys are stored separately in the [[Journal]].

**Access:** `get_component("nocturna")` · Like every component, exposes `.id` and `.name`.

## Methods

### .get_name()
Display name of this planet: returns `"Nocturna"`. Safe to hardcode, but querying future-proofs scripts against rename or multi-planet expansion.

**Returns:** String

### .get_bounds()
Surface coordinate bounds as a [[Bounds]] object with `.min_x`, `.max_x`, `.min_y`, `.max_y`, all in meters from base. Use to clamp nav targets inside the operational surface, or to generate random valid coordinates: `import random; b = planet.get_bounds(); x = random.randint(b.min_x, b.max_x); y = random.randint(b.min_y, b.max_y)`.

**Returns:** `Bounds` object (meters)

### .contains(x, y)
`True` if the point `(x, y)` is inside Nocturna's surface bounds. Use as a safety check before `nav.set_target()`: `if nocturna.contains(x, y): self.nav.set_target(x, y)`. Targeting outside the bounds returns immediately with no drive.

**Returns:** Boolean

### .biome_at(x, y)
Biome id at the world coordinate `(x, y)`. Returns one of `"frozen"`, `"coastal"`, `"geothermal"`, `"volcanic"`, `"deep"`. Pure geography: same answer for the same coordinate forever. Use to script biome-aware behavior anywhere on the planet.

**Returns:** String biome id

### .life_form_biome(item_id)
Find the native biome for a life-form item: `"frozen"`, `"coastal"`, `"geothermal"`, `"volcanic"`, or `"deep"`. Returns `None` for other items. A species always belongs to the same biome, regardless of where the specimen was found. [[Essence Liquifier|Essence Liquifiers]] accept only life forms native to their outpost, so a drone can test `nocturna.life_form_biome(item) == self.outpost.biome` before unloading.

**Returns:** Native biome id, or `None` for a non-life-form item

### .biomes()
Lists every biome id on the planet. Use it for planet-wide loops: `for biome in nocturna.biomes(): print(biome)`. The set never changes during play.

**Returns:** List of biome ids

### .terraform_progress()
Terraform Index progress on a 0-100% scale: 0 is untouched; 100 means 1,000,000 TP and all six pillars are complete. Atmosphere owns 70% of the Index; biomass, plants, and wildlife each own a separate 10% that cannot substitute for another pillar. Gate progress logic with it: `if nocturna.terraform_progress() >= 50: ...`. For the raw TP value, use `total_tp()`.

**Returns:** Number (percent, 0-100)

### .total_tp()
The finite Terraform Index in TP, in the 0-1,000,000 range. Temperature, oxygen, and pressure together own 700,000 TP; biomass, plants, and wildlife each own a non-substitutable 100,000 TP. Raw metrics may keep growing after their final phase, but a completed pillar contributes no additional Index. The value gates cross-system research.

**Returns:** Number (TP, 0-1,000,000)

### .points_of_interest()
Lists every permanent "?" contact on the Planet Map so scripts can route to real sites. Each [[PointOfInterest]] has whole-number coordinates, a `scanned` flag, and a `kind`. The kind stays `"unknown"` until a scanner reaches the contact; scanning then reveals mineral, biomass, thermal, water, oil, exotic, or inert. Filter for `not point.scanned`, travel to its coordinates, and scan with Rover or Pioneer sonar or a drone Bio Scanner.

**Returns:** List of `PointOfInterest` records

## See also

- [[Journal]]: your explored-sites record
- [[Biosphere Biomass Tier]]: using `points_of_interest()` to find biosites
