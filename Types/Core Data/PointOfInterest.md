---
tags:
  - type
  - core-data
aliases:
  - PointOfInterest
---
# PointOfInterest

An unresolved or resolved "?" contact on the map. **Returned by:** `nocturna.points_of_interest()`

### .x / .y
Whole-number coordinates (meters from base). Pass straight to `self.nav.set_target(p.x, p.y)` or a drone's `self.go_to(p.x, p.y)`.

**Returns:** number

### .scanned
`True` once resolved: a Rover/Pioneer sonar survey for a productive non-biomass site, a drone bio-scan that logged life at a biomass site, or a sonar scan that discovered an inert contact. **`False` is your work list**: filter `if not p.scanned:` to find sites left to visit.

**Returns:** boolean

### .kind
`"unknown"` until `.scanned` is `True`; then `"mineral"`, `"biomass"`, `"thermal"`, `"water"`, `"oil"`, `"exotic"`, or `"inert"`. You can't tell an ore deposit from a biosite from orbit; scanning reveals the type.

**Returns:** string

## See also

- [[Nocturna]]: the component that returns these
- [[Sonar Module]]: resolving contacts
