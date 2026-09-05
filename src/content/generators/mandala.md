---
title: "Mandala"
blurb: "Circular, square and polygonal rosettes from a symmetric fundamental domain"
category: design
version: "1.0.0"
---
Circular, square and polygonal rosettes built from a symmetric fundamental
domain — colouring pages with mathematical bones.

## What it is

A radially symmetric line-art design: rings of parametric motifs (petals,
arcs, leaves, scallops, dots, chevrons) repeated around a centre under a
rotation group (Cₙ) or a dihedral group (Dₙ, adding mirror symmetry).
Rectangular "mandalas" use the same machinery as border bands, which also
yields ornamental page frames.

## How to use

These are colouring pages: every region is closed, so any region can take a
flat colour without bleeding. Colourists typically work ring by ring,
alternating palettes; the symmetry means one decision per ring, repeated.
Adult profiles allow fine detail; the kids profile enforces fatter strokes
and larger regions.

## Purpose

The flagship of the design lane and the first proof of the workspace's
motif-and-symmetry architecture: motifs are parametric bezier builders (not
clipart), so twelve families × parameter ranges × symmetry groups gives
effectively unlimited non-repeating pages. Colourability is a *gate* — pages
failing region size, stroke width or ink coverage are regenerated with fewer
elements, never shipped with a note.

## History

*Maṇḍala* is Sanskrit for "circle": in Hindu and Buddhist practice, a
diagram of the cosmos used in ritual and meditation — Tibetan sand mandalas
being the famous ephemeral form. Carl Jung brought the word into Western
psychology as an archetype of wholeness; the 2010s adult-colouring boom made
the rosette form a publishing staple.

## This implementation

- **Spec knobs:** `size`, `frame` (circular/rect/polygon), `symmetry`
  (Cn/Dn/mirror/frieze/wallpaper), `rings`, `motifs`, `density`, `stroke`,
  `ring_lines`, `hollow_center`.
- **Generation:** one fundamental domain (a wedge of 2π/n, half-wedge for
  Dₙ) is populated with collision-checked motifs, then instanced by affine
  transforms — the symmetry service in `lako-geom` shared by every design
  crate.
- **Guarantees:** deterministic per seed; colourability-gated with
  escalation (density backs off before a page ships unfixable; tiling pages
  also grow their cell and thin their stroke, floored at the print minimum).
- **Frieze and wallpaper:** real tiling symmetries, not rosette aliases — the
  domain is sized to one lattice cell and stamped by the group, with all 17
  wallpaper groups and 7 frieze groups pinned colourable by a full-matrix
  test. The lattice cell is a spec value inside the symmetry, clamped to a
  fifth-to-half of the page.
