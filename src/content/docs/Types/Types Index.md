---
tags:
  - index
title: "Types Index"
---

Every API object type, grouped as in the official docs. Result objects follow the shared model in [[Command Results]].

## Core Data

[[Bounds]] · [[Component (Type)]] · [[PointOfInterest]] · [[Position]] · [[ScriptCommand]]

## World & Sites

[[OutpostRef]] · [[BuildingRef]] · [[HarvestingMachineRef]] · [[Planet]] · [[ScanResult]]

**Sites:** [[Site]] (abstract) · [[MiningSite]] · [[ThermalVent]] · [[WaterWell]] · [[OilWell]] · [[ExoticDeposit]] · [[GeologicalAnomaly]]

## Storage & Inventory

[[Battery (Vehicle)]] · [[Holder]] · [[PortableBattery]] · [[Cargo]] · [[Rack]] · [[Bin]] · [[Slot]] · [[ItemStack]] · [[ItemInfo]] · [[Recipe]] · [[ShopItem]] · [[WarehouseSlot]]

**Ports:** [[InputSlot]] · [[OutputSlot]] · [[PickupOutputSlot]] · [[VehicleInputSlot]]

**Results:** [[TransferResult]] · [[DiscardResult]] · [[ItemResult]] · [[SaleResult]]

## Fleet & Vehicles

[[VehicleRef]] · [[DroneRef]] · [[MobileUnitRef]] · [[MountSlot]] · [[DroneBattery]] · [[DroneOilTank]] · [[DroneCargo]]

**Results:** [[SonarScanResult]] · [[SurveyResult]] · [[CollectResult]]

Module APIs ([[Nav Module]], [[Sonar Module]], [[Drill Module]], [[Constructor Module]], [[Fleet]]) are documented on their component pages.

## Infrastructure & Fluids

[[Construction]] · [[FluidPort]] · [[FluidConnection]] · [[Pipe]] · [[PowerGrid]] · [[PowerGridMember]] · [[PowerSummary]] · [[BlueprintPlanResult]]

## Orders & Comms

[[Order]] · [[DockSlot]] · [[CommsMessage]] · [[BroadcastInfo]] · [[TransmitterInfo]]

**Results:** [[SendResult]] · [[ReceiveResult]] · [[WaitAnyResult]] · [[WaitBroadcastResult]]

## Panels

[[Panel API]]: the full Control Room card toolkit (widgets, inputs, drawing)

## Contracts

[[Contract]] (base) · [[ContractScript]]

**The 15 puzzles:** [[Relay Hack]] · [[Xenogenetics]] · [[Corrupted Archive]] · [[Sealed Vault]] · [[Data Tablet]] · [[Terminal Breach]] · [[Drifting Signal]] · [[Cold Boot]] · [[Three Echoes]] · [[Buried Five]] · [[The Loom]] · [[Crosstalk]] · [[Beat the System]] · [[Core Sample]] · [[Lattice]]

**Results:** [[LatticeProbeResult]] · [[VaultEscapeResult]]

## Built-in Types

[[str]] · [[list]] · [[dict]] · [[set]] · [[tuple]] · [[generator]] · [[slice]] · [[Match]]

## Biosphere

[[Cell]] · [[SeedRecipe]] · [[PlantRequirement]] · [[LifeFormScanResult]] · [[LifeFormSample]] · [[PortableBioScanner]] · [[PortableBioExtractor]]

**Results:** [[SeedResult]] · [[AnalyzeResult]] · [[BioScanResult]] · [[BioExtractionResult]]

## Exploration

[[Marker]] · [[CatalogedFragment]] · [[CatalogedCreature]]

## System results

[[ActionResult]] · [[CommandResult]] · [[CountResult]] · [[CropJob]] · [[CropJobResult]] · [[JobReceipt]]

## Terraforming

[[AnalyzeInfo]] · [[Specimen]] · [[FragmentLocation]] · [[BioOrder]] · [[BioCasterRecipe]] · [[ChamberFragment]] · [[ChamberSample]] · [[HabitatBonusNode]] · [[HabitatBonusTree]] · [[HabitatInsight]] · [[WasteDumpResult]]

## Weather & Sky

[[WeatherReport]] · [[Storm]] · [[WeatherEventForecast]] · [[Zone]] · [[SignalReceiver]] · [[SignalTransmission]] · [[WeatherSignalBoard]] · [[WeatherSignalBoardStatus]] · [[WeatherStrike]]
