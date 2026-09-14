---
tags:
  - type
  - terraforming
aliases:
  - BioOrder
title: "BioOrder"
---

One biology order. **Returned by:** `bio_exchange.orders()` / `bio_exchange.active_order()`

| Member | Returns | Meaning |
| --- | --- | --- |
| `.id` | string | Stable id (e.g. `"bio_order_03"`); pass to `bio_exchange.set_order(id)` |
| `.name` | string | Display name (e.g. `"Cryophyte Spore Panel"`) |
| `.biome` | string | Biome the required fragments belong to; orders for biomes without an outpost can't be filled yet |
| `.requires` | dict | Fragment shopping list `{fragment_id: count}` |
| `.reward` | number | Credits paid when complete. **Paid once: orders are one-time** |
| `.status` | string | `"available"` (not selected here) / `"active"` (selected at this Exchange) / `"complete"` (globally). An available order may already have delivery progress |
| `.delivered` | dict | Per-fragment progress, **shared across every Bio Exchange serving this order** |
| `.in_transit` | dict | Samples committed to delivery (staged in an Exchange input + timed deliveries underway); leaves after completion or refund staging. `.percent` counts completed deliveries only |
| `.percent` | number | 0-100 overall completion |
| `.target_glow` | [r, g, b] or `None` | **Coastal infusion orders only:** the exact glow the fragment must be tuned to via the [[Bio Luminizer]]; `deliver()` only matches an equal glow |
| `.required_genes` | dict or `None` | **Geothermal orders only:** `{fragment_id: [attribute_id, ...]}`. Each fragment must carry **exactly** its listed 1-3 genes ([[DNA Sequencer]]); raw or extra-gene fragments are rejected |

## See also

- [[Bio Exchange]]: selection and delivery
