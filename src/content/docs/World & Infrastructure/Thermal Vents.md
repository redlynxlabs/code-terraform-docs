---
tags:
  - guide
  - world-infrastructure
title: "Thermal Vents"
---

## Overview

A **thermal vent** is a fracture in the planet's crust where internal heat leaks through as steam. Vents are discovered by sonar and harvested by placing a [[Thermal Cap]] blueprint on them. Each vent cycles between **active** and **dormant** phases.

## Discovery

`self.sonar.scan()` returns a [[SonarScanResult]]. When `.status == "ok"`, iterate `.sites` and select contacts whose `kind() == "thermal"`; `.message` explains any rejected scan. Survey the selected contact with `self.sonar.survey(site)` and read the [[SurveyResult]] `.site` payload only after its status is `"ok"`. Basic Sonar reveals phase, Wide adds steam rates, and Deep adds cycle timing.

## Harvesting steam

Plan a Thermal Cap on the vent, carry its kit in the [[Pioneer]], and execute the queued blueprint with the Constructor. The completed cap captures steam into its chamber while powered.

## Routing after capture

Nothing leaves until the cap script calls `self.steam_out.connect(...)` with a compatible consumer's stable machine id or display name and opens it with `self.set_throttle(value)`, where `value` is 0-1. A local target transfers directly. A remote target uses completed gas topology between the cap and target locations automatically; scripts never select an individual pipe. The complete connection establishes steam identity even before flow starts and keeps it while idle, full, off, or throttled to zero.

> [!warning] Overpressure
> Under-release and the chamber climbs. At 100% it overpressurizes and **blows off the whole chamber**, then refills from empty. Read `pressure()`, `is_overpressured()`, and `is_stalled()` to control release, add storage, or restore physical reachability.

## Cross-references

- [[Flow Networks & Fluids]]: what happens after capture
- [[Infrastructure & Pipes]]: physical routing
- [[Construction Blueprint]]: queued build work
- [[ThermalVent]]: the site type
