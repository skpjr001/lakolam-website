---
title: "Mandala"
blurb: "Circular, square and polygonal rosettes from a symmetric fundamental domain"
category: design
version: "1.1.0"
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
and larger regions. For crayons, markers, young children or tired eyes,
choose the Bold & Easy version: a few layers of big petals in thick lines,
with every space large enough to fill in a few strokes.

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
  `ring_lines`, `hollow_center`, `bold`.
- **Bold & Easy (`bold: true`):** a different composition, not the fine page
  with thicker lines. At most three layers of big petals (round, pointed or
  onion-dome, chosen from the requested `motifs`), each layer peeking out
  between the petals of the one inside it, drawn as a polar envelope so every
  line ends exactly on the line it meets; 4 to 10 petals from the rotation
  order (a dihedral mirror adds nothing to a symmetric petal; frieze and
  wallpaper groups fall back to a 6-fold rosette, since tiling a small motif
  is the opposite of bold); one stroke weight, 3 x `stroke` (4.8 pt by
  default, never under 4); optional echo lines or bubbles inside petals only
  where they leave crayon-sized room. Gated by the bold check: lako-validate's
  **kids** profile (200 mm² regions, 1.5 pt strokes, 40% ink) plus every
  stroke >= 3 pt plus a flood fill of the rendered page (144 dpi) that
  measures every enclosed paper region — the areas *between* strokes that the
  per-subpath validator cannot see — against the same 200 mm² floor (pixel
  crumbs under 1 mm² in acute joins are counted as `specks_under_1mm2`,
  not regions).
  Retries drop to two layers, then to the fullest shapes. Meta carries
  `bold: true`, `colorable` and a `validation` block (profile, floors,
  region count, smallest and median region). Measured on the default spec
  over 40 seeds: all pass, 33-57 regions, smallest region 200-503 mm²,
  typical median ~690 mm² — against the fine page's smallest 1-96 mm² and
  median ~120 mm² by the same flood fill.
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
