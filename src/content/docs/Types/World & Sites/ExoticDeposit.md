---
tags:
  - type
  - world-sites
aliases:
  - ExoticDeposit
title: "ExoticDeposit"
---

Extends [[Site]] (shared members and the pre-survey snapshot rule there). Any Site-returning API where `kind() == "exotic"`, e.g. `exotic_gas_cap.deposit()`, `exotic_spring_tap.deposit()`.

Detail is gated by survey tier: **basic reveals phase, wide adds rates, deep adds cycle timing.**

| Method | Returns | Needs | Meaning |
| --- | --- | --- | --- |
| `.fluid()` | string or `None` | survey | Emitted fluid id: `"ammonia"`, `"swamp_gas"`, `"raw_sulfur_gas"`, `"raw_chlorine"`, `"brine"`, `"raw_cryofluid"`, `"raw_quicksilver"` |
| `.medium()` | string or `None` | survey | `"gas"` (tap with [[Exotic Gas Cap]]) or `"liquid"` ([[Exotic Spring Tap]]) |
| `.rarity()` | string or `None` | survey | `"common"` (usable direct) / `"uncommon"` / `"rare"` (raw feedstock for the [[Refiner]]). Rarer deposits are sparser and stay dormant longer |
| `.survey_level()` | string or `None` | any | `"basic"` / `"wide"` / `"deep"`, live; a deeper re-survey upgrades held objects |
| `.current_phase()` | string or `None` | basic | `"active"` (emitting) or `"dormant"`, live |
| `.base_rate()` | number or `None` | wide | Peak output t/h during active phase |
| `.current_rate()` | number or `None` | wide | Output t/h right now (0 dormant), live |
| `.cycle_active_minutes()` / `.cycle_dormant_minutes()` | number or `None` | deep | Phase durations (rare deposits stay dormant longest) |
| `.next_phase_in()` | number or `None` | deep | Game-minutes until the next flip, live |
| `.has_cap()` / `.cap_id()` | boolean / string | live | Whether a cap/tap is deployed, and its machine id |

## See also

- [[Fluids]]: what each exotic is for
