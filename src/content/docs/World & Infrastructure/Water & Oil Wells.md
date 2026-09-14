---
tags:
  - guide
  - world-infrastructure
title: "Water & Oil Wells"
---

## Overview

The planet has deterministic **water wells** and **oil wells**. Water is steady; **oil pulses** between active and dormant phases.

Water wells produce **10 / 20 / 30 t/h** by yield tier. Active oil wells produce **8 / 16 / 24 t/h** and 0 while dormant.

## Reading wells in scripts

```python
scan = self.sonar.scan()
if scan.status == "ok":
  for contact in scan.sites:
    if contact.kind() == "water" or contact.kind() == "oil":
      survey = self.sonar.survey(contact)
      if survey.status == "ok":
        site = survey.site
        print(site.id, site.kind(), site.yield_tier(), site.flow_rate())
      else:
        print(survey.message)
else:
  print(scan.message)
```

`scan()` returns a [[SonarScanResult]]; `survey()` returns a [[SurveyResult]]. Their payload fields are available only for the appropriate `.status`.

A deployed Pump starts at throttle 0. Connect its output port, check the connection [[ActionResult]], then set throttle. Local targets transfer directly; remote targets use a completed Liquid Pipe route. A Pump exposes its bound well through the read-only `well()` query.

## Cross-references

- [[Water Pump]] and [[Oil Pump]]: the pump APIs
- [[Flow Networks & Fluids]]: the system pumps feed into
- [[WaterWell]] and [[OilWell]]: the site types
