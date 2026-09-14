---
tags:
  - component
  - exploration
aliases:
  - journal
title: "Journal"
---

Stores sites found or surveyed by sonar and fragments cataloged by Bio Labs. Access it with `get_component("journal")` to plan trips and Bio Orders without scanning again. Records are separated by planet and survive script restarts, vehicle changes, and save/load.

**Access:** `get_component("journal")` · Like every component, exposes `.id` and `.name`.

## Site records

### .discovered_sites(planet_id)
Lists every site classified by sonar on `planet_id`. Call `journal.discovered_sites("nocturna")` for Nocturna. Each entry is a [[MiningSite]], [[ThermalVent]], [[WaterWell]], [[OilWell]], [[ExoticDeposit]], or [[GeologicalAnomaly]], according to `kind()`. Unsurveyed productive sites leave their detailed fields as `None`; inert formations are resolved by scanning. Duplicate scans do not add duplicate entries. Returns an empty list before any sites are found.

**Returns:** List of classified [[Site]] values

### .surveyed_sites(planet_id)
Every fully-resolved site on `planet_id` as a list of Sites: same shape as `discovered_sites()`, filtered to `surveyed == True`. This includes inert [[GeologicalAnomaly]] contacts because sonar resolves them without a second survey. Branch on `kind()` to access fields: MiningSite exposes `.item_id`, `.hardness`, `.purity`; ThermalVent exposes phase / rate / cycle timing (gated by sonar tier); WaterWell / OilWell expose `.yield_tier`, `.flow_rate`.

**Returns:** List of fully resolved `Site` snapshots

## Biology records

### .cataloged_fragments(planet_id)
Lists fragments analyzed at a [[Bio Lab]] on `planet_id`, newest first. Each [[CatalogedFragment]] includes its stable fragment id, display name, biome, coordinates, and rarity. Match `entry.fragment_id` against `BioOrder.requires`, and pass `entry.coords` to `bio_collector.collect(...)`. Unanalyzed fragments and creature identity remain hidden. After all five fragments are cataloged, the completed creature appears in `journal.cataloged_creatures(planet_id)`. Returns an empty list for a different planet.

**Returns:** List of `CatalogedFragment`, newest first

### .cataloged_creatures(planet_id)
Lists creatures whose five fragments have all been analyzed on `planet_id`, most recently completed first. Each [[CatalogedCreature]] provides the stable creature id, its five fragment ids, required feed item and Feed Maker recipe, minimum startup feed, and exact rarity-scaled revival reagents. Use `.creature_id` with `habitat.set_revival_target(...)`. Use `.feed_recipe_id` to find the matching unlocked [[Recipe]] in `feed_maker.list_recipes()`; recipe ingredients remain owned by that Recipe. Returns an empty list for a different planet.

**Returns:** List of `CatalogedCreature`, most recently completed first

## Biosite records

### .coord_info(x, y)
Read the saved [[LifeFormScanResult]] for a discovered permanent biosite coordinate. Returns `None` for untouched biosites and scanned coordinates that are not sites. The query returns immediately.

**Returns:** `LifeFormScanResult` or `None`

### .biomass_coords()
Lists every discovered permanent biosite as a [[LifeFormScanResult]]. This is the restart-safe route source for harvester drones: inspect `.coord`, each sample's `.remaining_tons`, and `is_ready(x, y)` before dispatching.

**Returns:** List of `LifeFormScanResult` snapshots

### .has_scanned(x, y)
`True` after the whole-number coordinate `(x, y)` has been scanned. Use it to skip biosites already visited by a route that resumes across script restarts.

**Returns:** Boolean

### .is_empty(x, y)
`True` only when this whole-number tile has been scanned and contained no life forms. Returns `False` for both occupied and untouched tiles, so pair it with `has_scanned()`.

**Returns:** Boolean

### .is_ready(x, y)
`True` when a discovered biosite can be extracted now. Returns `False` while another drone is extracting there, after depletion, or during its rarity-based cooldown. The query uses current site state and returns immediately.

**Returns:** Boolean

### .next_ready_at(x, y)
When the extraction cooldown ends, as an absolute hour. A depleted site's timestamp remains even after that hour passes, until extraction replenishes it. Returns `None` if the biosite is not recorded, still has material, or has never been extracted. Use `is_ready(x, y)` to check whether extraction can begin now.

**Returns:** Absolute hour, or `None`

## See also

- [[Sonar Module]]: what writes sites into the journal
- [[Biosphere Biomass Tier]]: scheduling harvest routes from `biomass_coords()`
- [[Nocturna]]: `points_of_interest()` for the raw "?" contacts
