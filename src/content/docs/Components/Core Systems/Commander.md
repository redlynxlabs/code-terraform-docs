---
tags:
  - component
  - core-systems
aliases:
  - commander
  - me
title: "Commander"
---

Read the player's name and current credits with `get_component("me")` or `get_component("commander")`. Scripts cannot change either value.

**Access:** `get_component("commander")` or `get_component("me")` · Like every component, exposes `.id` and `.name`.

## Methods

### .get_name()
Your commander name as a string. Set during initial character creation (or default). Use for personalized dashboard messages.

**Returns:** String

### .get_credits()
Current credit balance. Changes when `shop.buy()` / `shop.sell()` run, [[Bio Exchange|Bio Exchanges]] pay out, contract transmissions succeed, and Orders complete. Use as a gate before expensive `shop.buy()` calls.

**Returns:** Number

## See also

- [[Shop]]: buying and selling
- [[Contracts]] and [[Earth Orders Guide]]: the big credit sources
