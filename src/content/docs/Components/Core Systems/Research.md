---
tags:
  - component
  - core-systems
aliases:
  - research
title: "Research"
---

Checks global research progress through `get_component("research")`. Use the public ids shown on the Research page, such as `"research_auto_feeders"`. Available from the beginning and read-only.

**Access:** `get_component("research")` · Like every component, exposes `.id` and `.name`.

## Methods

### .is_unlocked(research_id)
Return `True` only when `research_id` is known and unlocked. Known but locked research returns `False`. An unknown id also returns `False` without printing, so scripts can handle every lookup result themselves.

**Returns:** Boolean

### .unlocked()
Return a fresh list of public research ids that are unlocked and available in the current build. The list follows stable Research-page registry order, contains no internal capability ids, and can be modified without changing game state.

**Returns:** List of public research ids

## See also

- [[Research Database]]: the full research tree listing
