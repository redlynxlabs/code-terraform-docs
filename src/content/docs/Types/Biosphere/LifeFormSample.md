---
tags:
  - type
  - biosphere
aliases:
  - LifeFormSample
title: "LifeFormSample"
---

One life form at a scanned tile. **Returned by:** `LifeFormScanResult.life_forms[i]`

| Member | Returns | Meaning |
| --- | --- | --- |
| `.type` | string | Life-form item id (any of the 30 in [[Life Forms]], e.g. `"ice_algae"`) |
| `.tons` | number | Tons available at scan time (**peak value, not current state**) |
| `.remaining_tons` | number | Tons currently available; partial harvests reduce it, and it returns to `.tons` after the coordinate's cooldown |
| `.rarity` | string | `"common"` / `"uncommon"` / `"rare"`: sets essence per ton at the [[Essence Liquifier]] **and** the post-extraction cooldown |
| `.biome` | string | Native biome (`"frozen"` ... `"deep"`), **fixed per species** (never the terrain it grows on); exactly the biome whose Liquifier consumes it. Same as `nocturna.life_form_biome(sample.type)` |
