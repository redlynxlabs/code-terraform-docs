---
tags:
  - component
  - terraforming
  - biology
aliases:
  - dna_sequencer_1
---
# DNA Sequencer

Splices **genes** into geothermal fragments so they carry what an order needs. You work at the gene level: load a fragment, read the genes it has and the genes it needs, splice the target set in; the machine composes the DNA for you. **One splice per fragment.**

**Stats:** Power in -20 W · Input buffer 10 · Output buffer 10

**How to obtain:** Requires the **Gene Sequencing** research (Pressure 120). Buy from the Shop for 100,000 cr.

**Access:** `self` / `get_component(id)` · Like every component, exposes `.id` and `.name`.

## Methods

### .outpost
The outpost where this building is deployed, as an [[OutpostRef]].

### self.load(fragment_id, properties=None, property_match=None) `SELF ONLY`
Pull a geothermal sample of `fragment_id` from `self.input` into the chamber, e.g. `self.load("gw_cardiac_node")`. Optional `properties` and `property_match` use the standard any/subset/exact convention.

**Returns:** [[ActionResult]] · Outcomes: `"ok"` / `"chamber_occupied"` / `"not_in_input"` / `"invalid_fragment"` / `"invalid_properties"` / `"invalid_property_match"` / `"busy"` (transient)

### self.chamber
The [[ChamberFragment]] loaded right now, or `None`. Read `.genes` and `.spliced`; **a second splice destroys an already-spliced sample**.

### self.genes()
Lists the genes currently carried by the chambered fragment, such as `["cold_tolerance", "pressure_tolerance"]`, or returns `None` when empty. `splice()` takes time. On completion, the fragment moves to output and the chamber becomes empty. If output is full, the spliced fragment stays in the chamber until space is available.

**Returns:** List of gene ids or `None`

### self.gene_catalog()
Every gene id the machine can splice: the full list (e.g. `["heat_resistance", "acid_resistance", "cold_tolerance", "pressure_tolerance", "toxin_resistance", "radiation_shield"]`), the valid values to pass to `splice()`.

**Returns:** List of gene ids

### self.splice(genes) `SELF ONLY`
Replace the chambered fragment's gene set with exactly `genes`, then place it in `self.output` while preserving every unrelated property. `genes` comes from `gene_catalog()` or an order's `required_genes[fragment_id]`.

**Returns:** ActionResult · Outcomes: `"ok"` / `"destroyed"` (a second splice destroyed the sample) / `"empty"` / `"unknown_gene"` / `"busy"` / `"output_full"`

### self.discard() `SELF ONLY`
Stage the chamber fragment in `self.output` without splicing.

**Returns:** ActionResult · Outcomes: `"ok"` / `"empty"` / `"busy"` / `"output_full"`

### self.input
The [[InputSlot]] for geothermal samples. Inventory is a source only at Nocturna Base; remote Sequencers use a same-outpost Storage Bin/Warehouse.

### self.output
The [[OutputSlot]] for spliced or ejected samples. Exact sample properties are preserved.

### Command mailbox
`peek_command()` · `next_command()` · `command_count()` · `clear_commands()` (SELF ONLY): see [[Script Commands]].

## See also

- [[Bio Exchange]]: `matches_order()` checks gene requirements
