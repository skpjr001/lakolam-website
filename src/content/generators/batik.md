---
title: "Batik"
blurb: "Batik-inspired ceplok repeats: four-fold medallions with dotted and lined isen fills"
category: design
version: "1.0.0"
---
Batik-inspired ceplok repeats: four-fold medallions on a square grid,
filled with dots and fine lines and outlined with a double wax line.

## What it is

A page of square cells, each holding a medallion that looks the same from
all four sides and in a mirror: a circle, diamond, eight-pointed star or
square, with petals, leaves or lozenges radiating from a small hub. Two
medallion designs can alternate like a checkerboard, and a small four-petal
flower sits wherever four cells meet. The spaces are filled the way a batik
maker fills them: rings of tiny dots, short parallel lines across the
petals, and a dotted ground. Every outline is a double line — a dark line
split by a pale one — like the line a wax pen leaves.

## How to use it

Print it in colour as a patterned panel for a card, a book cover or a
frame, or print the line-art version to colour. Pick three or four colours
and keep each medallion's petals, base and hub to the same choice all over
the page, so the repeat stays calm; leave the dotted ground pale. The small
solid black shapes are already inked; colour round them.

## Purpose

Repeating square-grid medallions are one of the most adaptable pattern
families there is, and the ceplok idea — one cell, four-fold symmetry,
repeated — is a clean rule that produces rich pages. The fills and the
double line give the page a hand-drawn texture without breaking its
geometry.

## History

Batik is a wax-resist dyeing technique, practised in many places but most
famously on Java, where its craft, motifs and meanings were recognised by
UNESCO in 2009 as an Intangible Cultural Heritage of Humanity. The maker
draws hot wax onto cloth with a canting — a small copper reservoir with a
spout — or stamps it with a copper cap; dye cannot reach the waxed lines,
and layer by layer the design appears. Ceplok is the family of geometric
repeats built on a square grid; isen-isen are the small fillings (dots
called cecek, fine lines called sawut and many more). Some Javanese
patterns, such as parang and kawung, were historically reserved for the
royal courts — the batik larangan — and carry meanings tied to rank and
ceremony. Those patterns are deliberately not generated here: these pages
are original batik-inspired designs, not reproductions of any traditional
or regional pattern.

## This implementation

- **Spec knobs:** `width`, `height`, `margin`, `cols`, `rows`, `alternate`
  (two designs in a checkerboard), `dotted_ground`, `double_line`,
  `palette` (brown_indigo, indigo, coastal), `line_art`, `stroke`.
- **Generation:** cells are the largest squares that fit the grid inside the
  margins. A medallion design is drawn from a small grammar — base (circle,
  diamond, eight-pointed star, square), petals (eight lenses; four lenses
  with four leaves; four lozenges with diagonal dots), hub (dot ring,
  four-petal flower, eye) — with inks assigned so dots and lines contrast
  with what they sit on. With `alternate`, the second design differs from
  the first in both base and petals. Every part is placed as a full orbit
  under the square's rotations, and every part is itself mirror-symmetric,
  so each medallion has the full D4 symmetry. Connector flowers sit at the
  interior grid vertices, sized to the room the bases leave. The dotted
  ground is a lattice symmetric about every cell centre, kept where it
  clears the medallions and connectors. Colour pages outline every shape in
  a dark line with a pale line down its middle. Line art draws single black
  outlines, inks shapes too small to colour solid, and coarsens a grid
  whose cells would be under 160 points across (`grid_coarsened` in the
  metadata).
- **Solving:** nothing to solve — a design.
- **Guarantees:** deterministic per seed. Tested: every medallion, with its
  share of the dotted ground, is invariant mark for mark (same ink, same
  area centroid) under all eight symmetries of its square, and is not
  invariant under a 30-degree turn; connectors are D4 about their vertex;
  cells tile the frame and every medallion lies inside its cell; alternate
  designs checkerboard and differ; line art is black only and passes the
  adult colourability check. The vocabulary contains no kawung, parang or
  other court-restricted pattern (`restricted_patterns: false`).
