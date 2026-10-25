---
title: "Neurons"
blurb: "Nerve cells in the manner of Cajal's drawings — pyramidal, Purkinje, ganglion and stellate cells grown as optimal-wiring trees, alone or in a slice of tissue"
category: design
version: "1.0.0"
---
Nerve cells drawn the way Santiago Ramón y Cajal drew them — every
dendrite grown, tapered and studded with spines, alone or in a slice of
brain.

## What it is

A nerve cell gathers signals through its dendrites, a branching tree that
fills a shape typical of its kind, and sends its answer down a single long
axon. Each page grows one or many such cells. A **pyramidal** cell of the
cerebral cortex has a skirt of short dendrites round its body, one long
apical dendrite climbing toward the surface and a tuft at its top. A
**Purkinje** cell of the cerebellum spreads a flat fan, the densest tree in
the brain. A **ganglion** cell of the retina, seen flat, fills a disc. A
**stellate** cell is a small star.

The slice view shows the tissue each cell lives in: the six layers of the
cortex with pyramids reaching up to the surface; the cerebellum's row of
Purkinje cells above the granule cells, whose axons climb and split into
long parallel fibres; or a retina laid flat, its ganglion cells tiling the
field and sending their axons toward the optic disc.

## How to use it

- **Frame it.** The cream page is made in the spirit of a nineteenth
  century drawing; the dark page glows like a modern fluorescence
  micrograph, each cell in its own colour.
- **Trace a signal.** Start at a fine tip, follow the dendrite to the cell
  body, then follow the axon away. How many branch points did you pass?
- **Spot the parts.** Find the cell body, the apical dendrite and its tuft,
  the little spines on the thin branches, and the side branches of the
  axon that leave it at right angles.
- **Compare the cells.** Put a pyramidal page beside a Purkinje page: why
  might one cell need a tall column and the other a flat fan?
- **Colour it.** The black-and-white version has paler cells behind the
  main one; colour by depth or by cell.

## Purpose

Neurons are among the most beautiful shapes in biology, and drawing them
true to their kind makes a lesson in how the brain is wired: each cell
type fills its own territory, branches thin toward the tips, and every
branch is part of one tree.

## History

Camillo Golgi's silver stain (1873) blackens a few nerve cells completely
and leaves the rest clear, so whole cells can be seen. Santiago Ramón y
Cajal used it from 1887 to argue that the nervous system is made of
separate cells — the neuron doctrine, which shared the 1906 Nobel Prize —
and drew thousands of cells in ink, including the cortical pyramids, the
cerebellar Purkinje cells and the retina. The way the trees are grown here
follows Hermann Cuntz, Friedrich Forstner, Alexander Borst and Michael
Häusser ("One rule to grow them all", PLoS Computational Biology, 2010):
a dendrite is close to a minimum spanning tree over points filling its
territory, with a balancing factor that trades wire for short paths to
the cell body. Retinal ganglion cells tile the retina, as Wässle and
colleagues showed in the 1980s. The fluorescent colours recall the
Brainbow technique (Livet and colleagues, 2007).

## This implementation

- **Spec knobs:** `cell` (`pyramidal` default, `purkinje`, `ganglion`,
  `stellate`, `auto`), `mode` (`single` default, `slice`), `style`
  (`cajal` default, `line`, `colour`), `points` (carrier points of the
  main cell, 40-2000; Purkinje cells get 1.8 times as many), `balance`
  (balancing factor 0-1), `neurons` (cells in a slice, 3-40), `spines`,
  `axon`, `context` (faint neighbours behind a single cell), `line`
  (finest dendrite in points), `width`, `height`, `margin`.
- **Generation:** carrier points are a Poisson-disk sample (dart throwing
  on a grid) over the cell type's territory, given as regions in the
  cell's own frame: for a pyramidal cell a basal skirt, a single-file
  column up the apical dendrite, oblique branches beside it and a flat
  tuft; a fan (single Purkinje cell) or an upright cup (in a slice); a
  disc for a ganglion cell; a lobed star for a stellate cell. The tree is
  the Cuntz optimal-wiring tree from the soma over every point (cost of a
  join: wire length plus `balance` times the path back to the soma). Each
  primary dendrite tapers quadratically toward its tips from a trunk
  width that grows with its reach. Branches are smoothed (Chaikin) for
  drawing. Spines sit along the thin distal segments of spiny types. The
  axon is a persistent random walk away from the cell, with collaterals
  leaving at right angles on alternating sides and curling back. Slices
  place cells by layer (pyramidal tufts in layer I, layer VI tufts in
  layer IV, stellates in layer IV; Purkinje cells in a row with granule
  cells below whose axons rise and split into parallel fibres; ganglion
  cells on a jittered hexagonal mosaic with axons bound for an optic disc
  off the page). Cells deeper in the section are drawn paler and first.
- **Solving:** Nothing to solve.
- **Guarantees:** every dendritic tree is connected and spans every
  carrier point exactly once (`|E| = |V| − 1`, no point unreached);
  widths never grow toward a tip; a higher balancing factor gives more
  wire and shorter paths; deterministic per seed; all ink inside the
  page. `verification: tree_spans_every_carrier_point`. Clamped `points`,
  `neurons`, `balance` and `line` are reported as `requested_*`.
