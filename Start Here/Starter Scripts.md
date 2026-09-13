---
tags:
  - guide
  - start-here
aliases:
  - Copy-Paste Scripts
---
# Starter Scripts

Copy-paste scripts for every early system, in the order the [[Beginner Roadmap]] hits them. Each one says **which machine it runs on**: open that machine's card, open its script editor, paste, press Run. Change anything in `CAPITALS` or quoted ids to match your base (a machine's exact id is under the ⓘ on its card).

## Python in 60 seconds

You only need six ideas to read everything below:

```python
x = 5                      # a variable: a name for a value
x = x + 1                  # now it is 6

if x > 3:                  # do the indented lines only when true
    print("big")           # indentation (spaces) is how Python groups lines

while True:                # repeat the indented lines forever
    sleep(1)               # wait 1 tick of game time, then go around again

result = self.collect()    # commands hand back a result object
if result.status == "ok":  # always branch on .status, never .message
    print(f"got {result.name}")   # f"..." pastes values into text with {curly braces}
```

`self` is the machine the script runs on. `get_component("id")` reaches any other machine. Anything after `#` is a comment for humans; the game ignores it. Full model: [[Command Results]] and [[Self & Components]].

## Phase 1: Solar tracker

Runs on the **Solar Generator**. The panel makes near-zero power at a fixed tilt; this holds it on the sun all day. ([[Solar Generator]])

```python
clock = get_component("clock")

while True:
    sun = clock.get_elevation()     # sun height above the horizon, in degrees
    self.set_tilt(90 - sun)         # panel faces the sun when tilt + elevation = 90
    sleep(1)
```

## Phase 1: Oxygen Generator keeper

Runs on the **Oxygen Generator**. Peak efficiency is intake at exactly 1/10th of ambient CO2, and waste dumped in the 50-60 window is penalty-free. ([[Oxygen Generator]])

```python
atmo = get_component("atmosphere")

while True:
    self.set_intake(atmo.get_co2() / 10)   # the sweet spot moves as CO2 falls, so re-set it every loop
    w = self.waste()
    if 50 <= w <= 60:
        self.dump_waste()                  # clean dump, no efficiency penalty
    sleep(1)
```

## Phase 1: Heat Generator keeper (self-calibrating)

Runs on the **Heat Generator**. Its best `set_power()` value (1-10) depends on the day's `thermal_state()`, and the four optimal values are yours to discover: efficiency is 100% only at the exact setting and falls off a cliff around it. This script discovers them by scanning once per state, remembers the answer, then holds it. ([[Heat Generator]])

```python
best = {}                            # remembered optimal per state, e.g. {"clear": 7}

while True:
    state = self.thermal_state()     # stable all day: "clear", "dust_storm", "heat_bleed", or "dust_veil"
    if state not in best:
        # calibration sweep: try every power step, keep the most efficient
        top_p, top_e = 1, 0
        for p in range(1, 11):       # 1 through 10
            self.set_power(p)
            sleep(1)                 # let the reading settle
            e = self.efficiency()
            if e > top_e:
                top_p, top_e = p, e
        best[state] = top_p
        print(f"{state}: best power is {top_p} ({top_e}%)")
    self.set_power(best[state])
    sleep(5)
```

The memory lives only while the script runs, so a restart re-scans each state once. That costs a few seconds per day type and keeps the script simple; stash `best` in the [[Data Archive]] later if you want it permanent.

## Phase 1: Pressure Generator sync

Runs on the **Pressure Generator**. Its gauge sweeps 0-100 and wraps; hitting `sync()` while the gauge is inside the current window gives +25% efficiency, missing a sweep costs -10%. The whole job is showing up on time. ([[Pressure Generator]])

```python
while True:
    g = self.gauge()
    if self.next_window_low() <= g <= self.next_window_high():
        self.sync()                  # first sync per sweep counts; extra calls do nothing
    sleep(1)                         # check every tick so the window is never missed
```

## Phase 1: Harvester sweep and sell

Runs on the **Harvester**, after the Pressure Sensor repair. Needs the [[Scanner]]'s own script mapping the grid first. Walks to known items one adjacent step at a time (that is the only legal move), collects, stores, sells. ([[Harvester]], [[Shop]])

```python
scanner = get_component("scanner_1")
shop = get_component("shop")

def parse(s):                        # "E13" -> row 4, column 13
    return ord(s[0]) - 65, int(s[1:])

def step_towards(dest):
    r, c = parse(self.get_position())
    dr, dc = parse(dest)
    if dr != r:                      # move vertically first, then horizontally
        nxt = chr(65 + r + (1 if dr > r else -1)) + str(c)
    else:
        nxt = chr(65 + r) + str(c + (1 if dc > c else -1))
    while self.get_heat() > 90:      # heat 100 stalls the harvester; cool below 90 first
        sleep(1)
    self.move(nxt)                   # the script pauses here until the move finishes

while True:
    targets = []
    for s, res in scanner.get_scanned().items():
        if res.status == "ok":       # "ok" means the sector currently holds an item
            targets.append(s)
    if not targets:
        sleep(60)                    # nothing known yet; let the scanner keep working
        continue

    dest = targets[0]
    while self.get_position() != dest:
        step_towards(dest)

    if self.get_held() != "":
        self.store()                 # free the held slot before collecting
    pickup = self.collect()
    if pickup.status == "ok":
        self.store()                 # held slot -> Inventory
        shop.sell_all(pickup.id)     # straight into credits, Inventory never clogs
        print(f"sold {pickup.name} (~{pickup.value} cr)")
```

## Phase 1+: Automated biology trio (advanced)

Three scripts, one per machine, that pick and fill Bio Orders end to end after Auto Feeders unlock. **The [[Bio Exchange]] is the brain**: it selects the order (always one matching its own outpost's biome), and the other two read its choice via `get_component("bio_exchange_1").active_order()`. The [[Bio Collector]] fetches the nearest *needed known* fragment, else identifies the nearest unknown dot; the [[Bio Lab]] analyzes everything (which catalogs it), extracts what the order wants with auto-bought reagents, and discards the rest. Assumes all three sit at Nocturna Base with Inventory as the hub; at a remote outpost, swap `"inventory"` for a local Storage Bin, and note that coastal/geothermal/volcanic/deep orders need their biome machine between lab and exchange.

**Bio Exchange:**

```python
self.input.connect("inventory")
self.output.connect("inventory")
my_biome = self.outpost.biome

def outstanding(o, fid):
    return o.requires.get(fid, 0) - o.delivered.get(fid, 0) - o.in_transit.get(fid, 0)

def remaining_total(o):
    total = 0
    for fid in o.requires.keys():
        n = outstanding(o, fid)
        if n > 0:
            total += n
    return total

while True:
    ao = self.active_order()

    if ao is None or ao.status == "complete" or remaining_total(ao) == 0:
        best = None
        best_left = 0
        for o in self.orders():
            if o.status != "available" or o.biome != my_biome:
                continue
            left = remaining_total(o)
            if left <= 0:
                continue
            if best is None or left < best_left or (left == best_left and o.reward > best.reward):
                best, best_left = o, left      # closest-to-done first, richest on ties
        if best is None:
            sleep(60)
            continue
        if ao is not None:
            self.clear_order()
        self.set_order(best.id)
        print(f"order set: {best.name} ({best_left} to go, {best.reward} cr)")
        ao = self.active_order()

    for fid in ao.requires.keys():             # stage what Inventory already holds
        n = outstanding(ao, fid)
        if n > 0:
            self.input.take(fid, n)

    r = self.deliver()                         # one sample per call
    if r.status == "complete":
        print(f"ORDER COMPLETE: {ao.name}")
    elif r.status == "no_input":
        sleep(20)
    elif r.status == "busy":
        sleep(2)

    for s in self.output.stacks():             # refunded surplus back to Inventory
        self.output.send(s.id, s.count)
```

**Bio Collector:**

```python
exchange = get_component("bio_exchange_1")

def needed():
    o = exchange.active_order()
    need = {}
    if o is None:
        return need
    for fid, req in o.requires.items():
        left = req - o.delivered.get(fid, 0) - o.in_transit.get(fid, 0)
        if left > 0:
            need[fid] = left
    return need

while True:
    if self.cargo is not None:
        sleep(5)                               # holding a specimen; the Lab will take it
        continue

    want = needed()
    locs = self.scan()                         # this outpost's biome only, nearest first
    target = None
    for loc in locs:                           # 1st: a known fragment the order needs
        if loc.cataloged and loc.fragment_id in want:
            target = loc
            break
    if target is None:
        for loc in locs:                       # 2nd: identify an unknown dot
            if not loc.cataloged:
                target = loc
                break
    if target is None:
        sleep(60)
        continue

    r = self.collect(target.coords)            # pauses during the trip
    if r.status not in ("ok", "busy"):
        print(f"collect: {r.status}")
        sleep(5)
```

**Bio Lab:**

```python
collector = get_component("bio_collector_1")
exchange = get_component("bio_exchange_1")
shop = get_component("shop")

self.input.connect("inventory")                # reagent line (home base)
self.output.connect("inventory")               # finished samples land here

def is_needed(fid):
    o = exchange.active_order()
    if o is None:
        return False
    return o.requires.get(fid, 0) - o.delivered.get(fid, 0) - o.in_transit.get(fid, 0) > 0

def drain_output():
    for s in self.output.stacks():
        self.output.send(s.id, s.count)

def stage(rid, qty):
    # exactly qty of one reagent: Shop/Inventory -> input port -> loaded for extract
    for s in self.input.stacks():
        if s.id != rid:
            self.input.eject("inventory", s.id, s.count)   # unlatch the one-reagent port
    while True:
        self.input.take(rid, qty)
        short = qty - self.input.count()
        if short > 0:
            b = shop.buy(rid, short)           # restock the shortfall from Earth
            if b.status != "ok":
                print(f"buy {rid}: {b.status}")
                sleep(30)
            continue
        r = self.load(rid, qty)                # load EXACTLY the recipe amount
        if r.status == "ok":
            return
        print(f"load {rid}: {r.status}")
        sleep(5)

while True:
    if self.specimen is None:
        if self.take_from(collector).status != "ok":
            sleep(5)                           # collector empty or mid-trip
            continue

    if self.specimen.stage == "collected":
        a = self.analyze()                     # cataloging happens here, even for rejects
        if a.status != "ok":
            sleep(5)
            continue
        print(f"analyzed: {a.info.name} ({a.info.rarity})")

    fid = self.specimen.fragment_id
    if not is_needed(fid):
        if self.discard().status == "output_full":
            drain_output()
        continue                               # cataloged, not wanted: next specimen

    for rid, qty in self.specimen.recipe.items():
        stage(rid, qty)                        # a mismatched load is DESTROYED by extract()
    e = self.extract()
    drain_output()
    if e.status == "ok":
        print(f"sample ready: {fid}")
    elif e.status not in ("busy", "output_full"):
        print(f"extract: {e.status}")
        sleep(5)
```

Known quirk: the trio can overproduce one sample per fragment (Inventory stock is not counted as `in_transit`), which is harmless surplus for the next order.

## Phase 2: Charging Station attendant

Runs on the **Vehicle Charging Station**. Tops up whatever parks on it, and dispatches the rescue drone to anyone stranded in the field. Pairs with the self-sufficient miner below. ([[Vehicle Charging Station]], [[Fleet]])

```python
fleet = get_component("fleet")

while True:
    # 1) charge whoever is parked and below target
    for vid in self.get_docked():
        if self.status(vid)["state"] == "docked":   # parked, no job, below target
            self.charge(vid)

    # 2) one rescue at a time for anyone dead in the field
    if not self.is_rescuing():
        for v in fleet.vehicles():
            if v.is_being_rescued or v.is_docked:
                continue
            if v.status == "stranded" or v.battery_level < 0.08:
                r = self.dispatch_rescue(v.id, 0.4)   # field-charge to 40%: enough to drive home
                print(f"rescue -> {v.name}: {r.status}")
                break
    sleep(10)
```

Field trickle-charging is slow, so the `0.4` target hands the rover just enough to limp home where the bays finish the job fast.

## Phase 2: Rover mining trip

Runs on the **Rover**, with Nav, Sonar, and Drill modules mounted and Auto Feeders researched. One full trip: find an unscanned "?", drive there, scan, survey, mine until the hold is full, drive home, bank the ore. Run it again for the next trip. ([[Rover]], [[Nav Module]], [[Sonar Module]], [[Drill Module]])

```python
HOME = (0, 0)                        # Nocturna Base sits at 0, 0

def drive_to(x, y):
    self.nav.set_target(x, y)                    # returns immediately, the rover drives in the background
    while self.nav.get_distance_to(x, y) > 2:    # so wait until we are close (never expect exactly 0)
        sleep(1)
    self.nav.brake()                             # close is not stopped; stop before field work

self.nav.set_throttle(0.6)           # 1.0 is faster but burns more battery per meter

# 1) pick the nearest unresolved "?" marker
poi = None
for p in get_component("nocturna").points_of_interest():
    if not p.scanned:
        poi = p
        break

if poi is None:
    print("no unscanned markers left; drive farther out or mine a known site")
else:
    drive_to(poi.x, poi.y)

    # 2) scan the area, then survey everything the sweep found
    found = self.sonar.scan()        # pauses the script while the sonar works
    for site in found.sites:
        self.sonar.survey(site)

    # 3) park on the first mineral site and mine until full
    for site in found.sites:
        if site.kind() == "mineral":
            drive_to(site.x, site.y)
            while not self.cargo.full():
                r = self.drill.mine()            # pauses while drilling one unit
                if r.status != "ok":
                    print(f"mining stopped: {r.status}")
                    break
            break

    # 4) haul it home and unload into Inventory
    drive_to(HOME[0], HOME[1])
    self.output.connect("inventory")             # Inventory freight works while parked at home
    for stack in self.cargo.stacks():
        self.output.send(stack.id, stack.count)
    print("trip done, cargo banked")
```

> [!warning] Keep the script running while driving
> If a vehicle script stops, errors, or finishes, the vehicle **stops and clears its route**. That is why everything above lives in one script that only ends after the rover is parked. [[Long-Running Scripts]]

## Phase 2: Self-sufficient miner (advanced)

The one-trip script above, grown up: loops forever, remembers its mining site, aborts on low battery, limps home cheaply, survives being rescued, and unloads into Inventory each lap. Runs on the **Rover**; expects the Charging Station attendant above to be running (the rover never charges itself, it just parks and waits).

```python
# MINER ROVER: explore -> survey -> mine -> haul home -> charge -> repeat.
HOME = (0, 0)          # Nocturna Base anchor
CRUISE = 0.6           # lower throttle burns fewer Wh per meter
LOW_BATT = 0.35        # abort field work below this; raise it if your site is far
CHARGED = 0.95         # leave home only above this

WANT = None            # ore to hunt, e.g. "iron_ore"; None takes any minable site
site_pos = None        # remembered mining spot, kept while the script runs

def battery():
    return self.battery.level()

def drive_to(x, y):
    # Self-healing drive: re-issues the route after any interruption (like a rescue).
    while True:
        self.nav.set_throttle(0.3 if battery() < 0.25 else CRUISE)   # limp mode when low
        self.nav.set_target(x, y)
        while self.nav.get_distance_to(x, y) > 2:
            if self.is_being_rescued():
                break                          # the rescue drone owns the rover now
            sleep(1)
        if self.is_being_rescued():
            print("rescue has control, standing by")
            while self.is_being_rescued():
                sleep(5)
            continue                           # rescue done: re-issue the route
        self.nav.brake()                       # close is not stopped
        return

def find_site(want):
    # Known mineral markers first (re-surveying is free), then unresolved "?" markers.
    # The rover picks a SITE; the site's item_id decides the ore.
    pois = get_component("nocturna").points_of_interest()
    known = [p for p in pois if p.scanned and p.kind == "mineral"]
    unknown = [p for p in pois if not p.scanned]
    rank = {"standard": 1, "rich": 2, "pure": 3}   # purity divides mining time

    for p in known + unknown:
        drive_to(p.x, p.y)
        found = self.sonar.scan()              # pauses while the sonar sweeps
        best = None
        for s in found.sites:
            sv = self.sonar.survey(s)
            if sv.status != "ok":
                continue
            site = sv.site                     # the surveyed copy has the revealed fields
            if site.kind() != "mineral":
                continue
            if want is not None and site.item_id != want:
                continue
            if site.hardness > self.drill.hardness_limit():
                continue
            if best is None or rank[site.purity] > rank[best.purity]:
                best = site                    # richest matching site at this stop
        if best is not None:
            print(f"{best.item_id} site ({best.purity}) at {best.x}, {best.y}")
            return (best.x, best.y)
    return None

def mine_here():
    while not self.cargo.full() and battery() > LOW_BATT:
        r = self.drill.mine()                  # pauses while drilling one unit
        if r.status in ("busy", "no_power"):
            sleep(2)
        elif r.status != "ok":
            print(f"drill: {r.status}")
            return r.status
    return "ok"

while True:
    # 1) home: unload, then wait while the station charges us
    drive_to(HOME[0], HOME[1])
    self.output.connect("inventory")           # Inventory accepts freight while parked at home
    for stack in self.cargo.stacks():
        self.output.send(stack.id, stack.count)
    if battery() < CHARGED:
        print(f"charging at base ({round(battery() * 100)}%)")
        while battery() < CHARGED:
            sleep(10)                          # the station script does the actual charging

    # 2) make sure we have a spot to mine
    if site_pos is None:
        site_pos = find_site(WANT)
        if site_pos is None:
            print("no minable site found; need a better sonar/drill tier or new markers")
            sleep(120)
            continue
        print(f"mining site locked in at {site_pos}")

    # 3) work it until the hold is full or the battery says go home
    drive_to(site_pos[0], site_pos[1])
    verdict = mine_here()
    if verdict in ("not_at_site", "not_surveyed", "too_hard"):
        site_pos = None                        # this spot went bad; find another next trip
    print(f"trip done: {self.cargo.count()} units aboard, battery {round(battery() * 100)}%")
```

Freight model to remember: **the rover never feeds machines directly, buffers are the hubs.** At home that hub is Inventory (this script unloads there; the Smelter feeder pulls from it). At an outpost it is a local [[Storage Bin]] or [[Warehouse]]. See [[Input & Output]].

## Phase 2: Smelter feeder

Runs on the **Smelter** at home. Feeds ore from Inventory in, sends ingots back out. ([[Smelter]])

```python
self.set_recipe("smelt_iron_ingot")
self.input.connect("inventory")      # remote smelters must use a local Storage Bin instead
self.output.connect("inventory")

while True:
    if self.get_input_count() < 10:
        self.input.take("iron_ore", 20)          # partial results are fine, it takes what exists
    out = self.get_output_count()
    if out > 0:
        self.output.send("iron_ingot", out)
    sleep(5)
```

## Phase 3: Thermal Cap keeper

Runs on the **Thermal Cap**. The one job: never let `pressure()` hit 1.0, because a full chamber blows every stored ton into the sky. ([[Thermal Cap]])

```python
self.steam_out.connect("turbine_1")  # or your Gas Tank's id; needs a completed Gas Pipe route

while True:
    p = self.pressure()              # chamber fill, 0 to 1
    self.set_throttle(p)             # release harder as it fills
    if p > 0.9:
        self.set_relief(1.0)         # last resort: vent surplus to atmosphere instead of blowing
    else:
        self.set_relief(0.0)
    sleep(1)
```

## Phase 3: Steam Turbine throttle

Runs on the **Steam Turbine**. Eases off when the buffer runs dry so it is not spinning on empty during the vent's dormant phase. ([[Steam Turbine]])

```python
self.steam_in.connect("thermal_cap_1")   # or the Gas Tank sitting between you

while True:
    if self.steam_in.level() < 5:
        self.set_throttle(0.3)
    else:
        self.set_throttle(1.0)
    sleep(1)
```

## Phase 3: Supply Dock loader

Runs on the **Supply Dock**. Grabs the first open contractor order, keeps it fed from Inventory, and moves to the next when it completes. ([[Supply Dock]], [[Earth Orders Guide]])

```python
orders = get_component("orders")
self.input.connect("inventory")

while True:
    if self.current_order() is None:         # nothing assigned (or the last one completed)
        available = orders.list_orders()
        if not available:
            sleep(60)
            continue
        self.set_order(available[0].id)
        self.set_enabled(True)               # dispatch auto-stops on completion, so re-enable
        print(f"now shipping: {available[0].name}")
    o = self.current_order()
    if o is not None:
        for item_id in o.requires.keys():
            self.input.take(item_id, 50)     # the order-aware port only accepts what is still needed
    sleep(30)
```

## Phase 3-4: Drone shuttle

Runs on a **Drone** with a thruster and a Cargo Pod mounted. Hauls one item between two depots forever. ([[Drone]], [[Drone Depot]])

```python
A = "drone_depot_1"                  # load here
B = "drone_depot_2"                  # unload here
ITEM = "iron_ingot"

self.set_throttle(1.0)               # throttle starts at 0 after every script start

while True:
    self.go_to_station(A)
    while self.current_station() != A:   # the official arrival check is station id equality
        sleep(1)
    self.cargo.load(ITEM, 100)

    self.go_to_station(B)
    while self.current_station() != B:
        sleep(1)
    self.cargo.unload(ITEM, 100)
```

## When something misbehaves

1. Print the result: `r = self.whatever(); print(r.status, r.message)`. The status is the machine telling you exactly why. [[Command Results]]
2. Red text in the console is an error with a line number. [[Reading Errors and Console Output]]
3. A knob mysteriously at 0 usually means the script that owned it stopped. [[Long-Running Scripts]]

Every snippet here is a floor, not a ceiling: the tutorial pages (starting at [[How This Game Works]]) build these same loops up with explanations, and each machine's page lists every method these scripts could also use. When you want to *watch* all of this run, [[Dashboard Cards]] has a ready-made Control Room suite for these exact scripts.
