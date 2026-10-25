---
title: "Plant Tissue"
blurb: "Plant tissue grown cell by cell — divisions by Errera's shortest-wall rule, three-way junctions, clone sectors; meristem, epidermis, stomata and cell files"
category: design
version: "1.0.0"
---
A sheet of plant cells grown one division at a time, each founder's
descendants shaded as a sector.

## What it is

Plant cells cannot move or slide past one another: a tissue takes its shape
only from where its cells divide and how they grow. When a cell divides it
builds a new wall straight across its middle, and the new wall meets the old
ones in a T, so three walls meet at every corner. In 1888 Léo Errera noticed
that the new wall is usually the shortest one that cuts the cell in half,
like a soap film.

Each page grows a tissue from a few founder cells to several hundred, wall
by wall. It can be a **meristem** — the growing tip of a shoot seen from
above, a disc of small cells; a leaf **epidermis**, whose pavement cells
interlock like jigsaw pieces; the same skin with **stomata**, the breathing
pores, each a pair of guard cells; or a **strip** of cells laid down in
files as a root or stem grows in length.

## How to use it

- **Follow a family.** Every founder cell and all its descendants share a
  colour. Where are the borders between families? Are they straight or
  ragged?
- **Count corners.** Pick any point where walls meet inside the tissue: how
  many walls meet there? Try a few more.
- **Find the stomata.** On the stomata page, are two pores ever in touching
  cells? Real leaves space them out the same way.
- **Colour it.** The black-and-white version is a colouring page: shade one
  family at a time, or colour the guard cells green.
- **Frame it.** The dark version imitates a microscope picture with glowing
  walls.

## Purpose

The page shows a living process — growth and division — as a pattern, and
makes visible two rules plant biologists still study: walls meet in threes,
and cells divide along short walls. Clone sectors show how a tissue is built
from a few ancestors.

## History

Léo Errera (1888) proposed that a dividing plant cell places its new wall
like a weightless soap film: the least area that halves the cell. Julius
Sachs and Hofmeister had described other division rules before him. Sébastien
Besson and Jacques Dumais (PNAS, 2011) showed that real cells choose among
the possible halving walls at random, with shorter walls exponentially more
likely, which reproduces both Errera's rule and its exceptions. Clonal
sectors have been used to trace plant cell lineages since the mid-twentieth
century, and live imaging of shoot meristems with fluorescent cell walls
(Reddy and Meyerowitz, 2004, and others) inspired the dark style. The
one-cell spacing of stomata was described by Sachs and studied genetically
from the 1990s on.

## This implementation

- **Spec knobs:** `tissue` (`meristem` default, `epidermis`, `strip`,
  `stomata`, `auto`), `cells` (50-1500), `founders` (1-40), `selectivity`
  (β, 0-50), `clones` (shade sectors), `nuclei`, `jigsaw` (wavy epidermal
  walls), `style` (`colour` default, `confocal`, `ink`), `line`, `width`,
  `height`, `margin`.
- **Generation:** a conforming polygon mesh starts as one cell (a disc, a
  rectangle of the page's shape, or one row of a strip). The cell whose area
  most exceeds its own seeded size threshold divides next: the halving
  walls at 36 sampled angles are found by bisection, and one is chosen with
  probability proportional to `exp(−β·(L − L_min)/L̄)` (the strip uses 3β,
  so its files keep square walls). Each new wall's ends are inserted into
  the neighbouring cells' walls too, making T-junctions. Once there are as
  many cells as founders, each becomes its own clone; daughters inherit
  their mother's. After every division the tissue grows so the mean cell
  keeps the same area — evenly, or for a strip only in length once its
  cells are crowded — and every so often the junctions relax toward the
  mean of their neighbours (equal wall tension; never for the strip, never
  folding a cell). The mesh is then fitted to the page. Epidermal walls
  between two cells become sine waves of a few half-waves; stomata are
  picked at random among inner cells, about one in eleven, never in two
  cells that touch; each is drawn as two guard cells round a lens-shaped
  pore with a few chloroplasts. Nuclei sit near each cell's centroid.
- **Solving:** Nothing to solve.
- **Guarantees:** exactly `cells` cells; every interior junction joins
  exactly three walls; the number of distinct clones equals the number of
  founders; every cell has positive area; no two stomata share a corner;
  deterministic per seed; all ink inside the page.
  `verification: three_way_junctions`. Clamped `cells`, `founders`,
  `selectivity` and `line` are reported as `requested_*`.
