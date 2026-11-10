---
title: "Marble Slabs"
blurb: "Marble slabs: veins from a folded block — Carrara, Calacatta, Nero Marquina, Verde and Breccia, book-matched, quad-matched or tiled"
category: design
version: "1.0.0"
---
Polished marble with veins from folded stone — Carrara, Calacatta, Nero
Marquina, Verde and Breccia — single, book-matched, quad-matched or tiled.

## What it is

A slab of polished marble, face on. Marble is limestone that heat and
pressure deep in the earth recrystallised; as the rock softened and flowed,
its old layers and the cracks that minerals had filled were folded and
smeared into the veins we see. The page grows a block of such stone and
cuts it: thick main veins that swell, thin and break off, finer secondary
veins that branch from them, straight-ish crack-fill veins of white
calcite, and a gently clouded ground. Five stones are offered: white
*Carrara* with soft grey veins, bright *Calacatta* with bold grey veins
haloed in gold, black *Nero Marquina* with crisp white veins, deep green
*Verde* netted with white, and *Breccia*, rock that was shattered into
angular fragments and cemented together again. The stone is laid as one
slab, a book-matched pair, a four-way quad match, or a floor of tiles.

## How to use it

The colour pages are stone you can print: backgrounds, book endpapers,
cards, dolls'-house floors and model making. Book-matched and quad-matched
slabs are the luxury-wall look — two or four consecutive slices opened like
the pages of a book so the veins meet in mirror symmetry. The floor layout
shows how a slab is cut into tiles and laid back in order so the veins run
on from tile to tile. The line-art page is a colouring sheet: each vein is
a pair of outlines with a halo band around it; shade the halo softly and
the vein itself darker, or turn the clasts of a breccia into a mosaic.

## Purpose

To make stone that behaves like stone: veins that come from one folded
block rather than from scribbles, slabs that match because they really are
mirror images, and floors whose tiles really were cut from the same slab.

## History

The quarries of Carrara in the Apuan Alps have been worked since the Roman
colony of Luna in the first century BC; Calacatta is a rarer, whiter stone
from the same basin. Nero Marquina comes from Markina-Xemein in the Basque
Country, Spain; green "Verde" stones such as Verde Alpi from the Aosta
Valley are serpentinites, and in antiquity *verde antico* came from
Thessaly. Breccias such as Breccia Medicea, quarried near Seravezza under
the Medici in the sixteenth century, are rock broken and re-cemented. Book-
matched revetment is ancient: the marble walls of Justinian's Hagia Sophia
(537) are lined with slabs sawn in sequence and opened in mirrored pairs.
In computer graphics, Ken Perlin's "An Image Synthesizer" (SIGGRAPH 1985)
made marble the classic demonstration of noise, as `sin(x + turbulence)`;
domain warping — feeding noise through noise — was popularised by Iñigo
Quílez in the 2000s. Paper marbling, which floats inks on a bath, is a
different art with its own page (`marbling`).

## This implementation

- **Spec knobs:** `width`, `height` (points, 200-3000); `layout` (`single`,
  `book` — the default, `quad`, `floor`); `variety` (`auto` picks by seed,
  `carrara`, `calacatta`, `nero_marquina`, `verde`, `breccia`); `style`
  (`colour`, `lines`); `veining` (vein width multiplier, 0.3-3); `fold`
  (how hard the rock was folded, 0-2); `tiles` (tiles across the floor,
  2-10, floor only); `stroke` (0.2-4).
- **Generation:** a point of the slab face is a point of a 3D block at a
  seeded depth. Two rounds of domain warping by fractal 3D gradient noise
  fold it; the *fold field* `g` is fractal noise plus a sine of the bedding
  direction carried through that fold. A main vein is
  `V = w(p) − |g| / |∇g|` — the zero set of `g` widened to a half-width
  `w(p)` that wanders and can fall below zero, so veins swell, thin and
  break off; dividing by the gradient makes `|g|/|∇g|` a distance, so a
  vein is as wide as its width says. Halo bands sit just outside the vein
  and a darker core inside it. Secondary veins are a finer fold field of
  the same form; crack-fill veins are seeded fractures, roughened, swelling
  and tapering to points; the ground is clouded by a fifth noise field.
  Breccia clasts are seeded Voronoi cells on the folded face shrunk from
  their borders, `B = (d₂ − d₁)/2 − m`, with some cells left as matrix by
  flipping the sign (both sides equal `−m` on a border, so B stays
  continuous); each clast takes its cell's tone. Every field is sampled on
  a grid, traced by marching squares into closed loops and filled as
  stacked superlevel sets, holes winding backwards. Book and quad matches
  place the one traced slab reflected; the floor places it once per tile,
  clipped to the tile, shifted by the grout.
- **Guarantees:** deterministic per seed. Veins are level sets of a
  continuous field: every level line closes (no open or stray lines) and
  the outline points, evaluated afresh, sit on their level (median under a
  quarter of a grid cell, 95 % within one cell — the field has a kink along
  each vein's spine, which linear interpolation rounds; tested on four
  stones). Book-matched and quad-matched copies mirror exactly about the
  gaps between them (tested on every point). Floor tiles are consecutive
  cuts of one slab: their windows tile the slab with no gap or overlap and a
  point on a joint lands on both tiles' edges exactly one grout apart, so
  veins run on across every joint (tested). Each breccia clast lies in one
  Voronoi cell (tested). All ink is clipped to the slabs inside the page
  margin. The line-art page passes the adult colourability check (tested).
  `verification: level_sets_mirrored_tiles_continuous`. Clamped knobs are
  reported as `requested_<field>`.
