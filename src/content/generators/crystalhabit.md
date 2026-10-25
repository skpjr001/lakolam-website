---
title: "Crystal Forms"
blurb: "Crystal forms: a plate of mineral crystals drawn from their symmetry, in the manner of Goldschmidt's atlas, with cut-out nets"
category: design
version: "1.0.0"
---
A plate of crystal drawings, each one grown from its symmetry — six real
minerals and a few invented ones — with nets to cut out and fold.

## What it is

A page in the manner of Victor Goldschmidt's great *Atlas der
Krystallformen*: a grid of crystals drawn in the classical clinographic
projection, each with its name, crystal system, symmetry class and the forms
that make it. Every face is labelled with its Miller indices — the three (or,
for hexagonal and trigonal crystals, four) numbers that say how the face
cuts the crystal's axes, a bar over a number meaning it is negative. The
plate opens with pyrite, garnet, fluorite, quartz, calcite and zircon; the
rest are crystals invented from the same rules, as nature might have grown
them. A second page unfolds several of the crystals into nets with glue tabs.

## How to use it

Look at a crystal and find the faces that belong together: all the faces of
one form have the same shape and the same numbers in a different order or
with different signs. Count them — a cube has 6 faces, an octahedron 8, a
garnet's dodecahedron 12. The dashed lines are the edges at the back. To
build a crystal, glue the net page to thin card, cut along the solid lines,
crease every dashed line, fold the faces up and glue each grey tab inside the
face it meets. The black-and-white style can be coloured in: give each form
its own colour to see the symmetry.

## Purpose

Crystals are geometry made by nature, and their faces are not arbitrary:
each one is a plane of the atomic lattice, repeated by the crystal's
symmetry. The plate is a gentle introduction to Miller indices, symmetry and
the crystal systems, and the nets turn it into a hands-on model.

## History

René Just Haüy (1784) showed that crystal faces follow from stacking small
building blocks; William Hallowes Miller's *Treatise on Crystallography*
(1839) gave the indices still used today, and Auguste Bravais (1850) and
others the lattices and symmetry classes. Victor Goldschmidt (1853–1933)
drew some 23,000 crystals in his nine-volume *Atlas der Krystallformen*
(Heidelberg, 1913–1923), largely in the clinographic projection, the
standard for crystal drawings since the nineteenth century. Cell constants
here are the usual mineralogical values (e.g. Klein & Dutrow, *Manual of
Mineral Science*, 23rd ed.).

## This implementation

- **Spec knobs:** `count` (6–12 crystals); `minerals` (open with the six real
  minerals, or invent every crystal); `hidden_edges` (dashed back edges);
  `labels` (Miller indices on the faces); `nets` (the cut-out page);
  `palette` (mineral — each in its mineral's colour —, pastel — each form
  its own tint —, atlas, ink, or auto); `page`; `margin_mm`.
- **Generation:** each crystal has a cell (a, b, c, α, β, γ) and a point group
  (m3̄m, m3̄, 4̄3m, 4/mmm, 6/mmm, 3̄m, 32, mmm, 2/m or 1̄) whose operations are
  the closure of its generators as Cartesian matrices (c along z, a along x).
  A form's normal is h·a* + k·b* + l·c* from the reciprocal lattice; the
  group turns it into the form's other faces, each a half-space at the
  form's central distance; the crystal is their intersection. Each face's
  indices are read back exactly from its normal (n·a = h). The drawing is
  the clinographic projection: parallel rays, the crystal turned 18°26′
  (tan 1/3) about its vertical axis and the eye raised 9°28′ (tan 1/6). Front
  faces are shaded by a soft light; edges between two back faces are dashed.
  Inventions pick a class, cell and two to four forms with the seed, keep
  only the forms that show, and retry until at least two do. Nets unfold the
  simplest crystals along a spanning tree of faces (tried from each root
  until the layout is overlap-free); one glue tab per glued edge pair is put
  on whichever side covers no face and no other tab. The seed varies the
  inventions, the plate number and (with `auto`) the palette.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic; `verification:
  faces_match_multiplicity_and_euler` — every form on every crystal shows
  exactly its multiplicity of faces (pyrite 12 + 6 + 8, garnet 12 + 24,
  calcite 12 + 6 + 6 …), the face count is the sum of the multiplicities,
  V − E + F = 2, and inter-face angles are the true ones (garnet's (110) to
  (101) is 60°; quartz's r face meets c at 51.8°). Every net printed is
  overlap-free and its area equals the crystal's surface. All ink lies
  inside the margins on every page size; the ink palette is grey only;
  clamped knobs are reported (`requested_<field>`). Quartz is drawn with its
  prism and the two rhombohedra r and z (class 32's trapezohedral faces,
  rarely large, are left out).
