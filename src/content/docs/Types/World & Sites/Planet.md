---
tags:
  - type
  - world-sites
aliases:
  - Planet
title: "Planet"
---

A destination entry in the interplanetary listing. **Returned by:** `transmitter.list_planets()`

| Member | Returns | Meaning |
| --- | --- | --- |
| `.id` | string | Planet id; pass to `transmitter.connect()` |
| `.name` | string | Display name |
| `.description` | string | Short planet description |

## See also

- [[Transmitter]]: the component that lists these
