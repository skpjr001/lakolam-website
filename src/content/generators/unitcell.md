---
title: "Crystal Unit Cells"
blurb: "Crystal structures as ball-and-stick plates: rock salt, diamond, graphite, perovskite and friends"
category: design
version: "1.0.0"
---
Crystal structures as ball-and-stick plates: rock salt, diamond, graphite,
perovskite and friends, built from their real atomic positions.

## What it is

A crystal is one small arrangement of atoms — the unit cell — repeated in
three directions. This page draws a block of those cells the way a
chemistry textbook plate does: every atom a shaded ball in its traditional
colour, the bonds or nearest contacts as sticks, the outline of the block
as a thin box, and underneath it the structure's name, its formula, its
space group, the cell's edge lengths and a key to the atoms with the number
of neighbours each one has. Thirteen structures are on offer: rock salt
(NaCl), caesium chloride, diamond, zinc blende and wurtzite (two forms of
ZnS), graphite, cubic perovskite (SrTiO₃), fluorite (CaF₂), rutile (TiO₂),
body-centred cubic iron, face-centred cubic copper, hexagonal close-packed
magnesium and ordinary ice. A second mode replaces some atoms with their
coordination polyhedra — the octahedra of perovskite and rutile, the
tetrahedra of diamond and zinc blende — the way mineralogists draw them.

## How to use it

Pin it up as a print, or use it to study: count the neighbours of an atom
in the middle of the block and check the number in the key, find the
octahedron of six chloride ions round each sodium, or follow the six-sided
rings through ice and graphite. Atoms on the faces, edges and corners of
the box are shared with the next block, which is why a cell of rock salt
shows 14 sodium and 13 chloride ions but holds exactly four of each. The
line-art version is a colouring sheet: colour each kind of atom its own
colour and the pattern of the structure appears. One unit cell is clearest
for learning; three or four cells per edge show the pattern repeating.

## Purpose

To show the classic crystal structures exactly as they are, at the right
proportions and with the right neighbours, in a form handsome enough to
hang on a wall.

## History

René-Just Haüy (1784) explained crystal shapes as stacks of tiny identical
building blocks. The 230 space groups that classify every possible
arrangement were enumerated independently by Evgraf Fedorov and Arthur
Schoenflies in 1891. Max von Laue's X-ray diffraction experiment of 1912
made atoms visible to measurement, and in 1913 William Henry and William
Lawrence Bragg solved the first structures — rock salt and then diamond.
John Desmond Bernal worked out graphite's stacking (1924); William Barnes
located the oxygens of ice (1929), Bernal and Ralph Fowler stated its "ice
rules" for the hydrogens (1933), and Linus Pauling explained ice's leftover
disorder (1935). Ball-and-stick models go back to August Wilhelm von
Hofmann's 1865 lecture models; the familiar atom colours come from the
space-filling models of Robert Corey and Linus Pauling (1953), improved by
Walter Koltun (1965) — the CPK colours. Perovskite is named after the
Russian mineralogist Lev Perovski; Gustav Rose described the mineral in
1839. Ionic radii are those tabulated by Robert D. Shannon (1976).

## This implementation

- **Spec knobs:** `width`, `height` (points, 200-3000); `structure`
  (`auto` — picked by the seed — or one of `rock_salt`,
  `caesium_chloride`, `diamond`, `zinc_blende`, `wurtzite`, `graphite`,
  `perovskite`, `fluorite`, `rutile`, `bcc`, `fcc`, `hcp`, `ice_ih`;
  default `rock_salt`); `cells` per edge (1-4, default 2); `mode`
  (`ball_and_stick`, `polyhedra`); `style` (`colour`, `lines`); `palette`
  (`plate`, `white`, `night`); `projection` (`perspective`,
  `orthographic`); `atom_scale` (0.2-1, default 0.6: the fraction of the
  largest ball size at which no two atoms touch); `cell_box`, `labels`,
  `depth_cue`; `stroke` (0.2-4).
- **Generation:** each structure is its conventional cell: lattice
  (cubic, tetragonal or hexagonal with γ = 120°), measured lattice parameters
  (near room temperature; ice near its melting point), and every site in fractional coordinates from the space
  group's Wyckoff positions (wurtzite u = 3/8, rutile u = 0.3048, ice
  z = 1/16). The block takes every site plus every lattice translation
  that lands in the closed block, so boundary atoms appear on each face,
  edge and corner. Bonds join chosen species pairs within 12 % of their
  nearest periodic distance (ice draws the O–O hydrogen-bond network: its
  hydrogens are disordered and not drawn; perovskite draws the Ti–O bonds
  and leaves strontium in its cage). Ball radii are ionic, covalent or
  metallic radii scaled so no two spheres touch. Polyhedral mode takes one
  sublattice's atoms whose whole first shell lies in the block and draws
  the convex hull of that shell (for the metals, the single most central
  one). The camera is a seeded three-quarter view of the block. Drawing is
  a painter's sort of balls, half-bonds (each coloured as its own atom),
  box segments and polyhedron faces; balls are keyed by `|C − E|² − r²`,
  the power of the eye with respect to the sphere (centre depth in
  orthographic view), which orders disjoint spheres exactly as a ray meets
  them; half-bonds are keyed relative to their own atom so a bond leaving
  towards the viewer lies over its atom. Labels use the stroke font's
  mixed-case face, so formulas carry real subscripts and charges.
- **Guarantees:** deterministic per seed; every site matches a
  hand-entered table written from the textbook descriptions (tested); each
  drawn atom is a lattice translation of a site, and every translation in
  the block is drawn (tested); coordination numbers equal the known values
  — NaCl 6, CsCl 8, diamond and ZnS 4, graphite 3, perovskite Ti 6 and
  Sr 12, fluorite Ca 8 and F 4, rutile Ti 6 and O 3, bcc 8, fcc and hcp
  12, ice 4 — by brute-force shell counts, and interior atoms draw exactly
  that many bonds (tested); the face/edge/corner-weighted atom count of the
  block equals cells³ × Z × the formula (tested, and `stoichiometry_ok` in
  meta); no two balls touch, and a sampled ray test confirms that wherever
  balls overlap on the page the one drawn on top is the one the eye's ray
  meets first, in both projections (tested); polyhedra have the right
  vertex and face counts and satisfy Euler's formula (tested); all ink stays
  inside the page. `verification:
  wyckoff_positions_coordination_stoichiometry_ray_depth`. The line-art
  page records the colourability check in `colorable`. Clamped knobs are
  reported as `requested_<field>`.
