---
title: "Layered papercut"
blurb: "Layered shadow-box papercuts — a mandala, heart, tunnel or landscape in three to eight nested card layers, each proven one piece with bridges at least the minimum width and visible in the stack"
category: design
version: "1.0.0"
---
A shadow-box picture in three to eight layers of cut card — a mandala, a
heart, a tunnel or a hilly landscape — that builds up in depth.

## What it is

Each layer is a square of card with an opening cut in it, bigger than the
opening in the layer behind. Stacked with small foam pads between them,
the layers frame each other and the picture gains depth, like a stage set.
The mandala opens in rings of scallops, points and waves; the heart in
nested hearts; the tunnel in polygons twisting into the distance; the
landscape in ranges of hills, nearer ranges lower, with pine trees
standing on them. Small cut-outs in the visible band of a layer let the
colour behind show through.

The first page shows the finished stack in colour; the following pages
are the cutting sheets, one per layer, at full size.

## How to use it

1. Print every page at 100 % ("actual size") and check the 1 cm box.
2. Pick card in a run of colours, one sheet per layer. Layer 1 is the back
   and is not cut at all; the last layer is the front frame.
3. Lay each sheet on its card and cut along every line with a sharp craft
   knife on a cutting mat (or trace the shape into a cutting machine).
   Cut the small holes first and the big opening last.
4. Stack the layers in order, 1 at the back, with foam pads or strips of
   card between them, lining up the corners.
5. Frame the stack in a shadow box, or glue it to a stiff backing.

## Purpose

Layered papercuts are a favourite cutting-machine and craft-knife
project. A design can look fine on screen and still fail on the table: a
strip of card too thin tears, a piece that is not joined to the rest falls
out, and a layer hidden completely by the one in front is wasted work.
Every layer here is checked for all three.

## History

Paper cutting is centuries old in China, Poland, Germany and Mexico.
Layering cut paper for depth goes back to the peepshows and "tunnel
books" of the 18th and 19th centuries; the modern shadow-box papercut,
cut by hand or on a home cutting machine, became popular in the 2010s.

## This implementation

- **Spec knobs:** `theme` (`mandala`, `heart`, `tunnel`, `landscape`);
  `layers` (3–8); `size_cm` (8–25, the card's side); `min_bridge_mm`
  (1–5, the narrowest strip of card); `look` (`colour`, `outline`);
  `index` (0 the preview, then the layers); `page`; `margin` (inches).
- **Generation:** ring themes give each layer above the back one central
  opening as a radius at every angle — a mean radius growing outwards
  layer by layer plus a seeded wave (scallop, point or sine) with D_n
  symmetry, a heart curve, or a regular polygon twisted a little more
  than the one inside it — with every opening at least 1.6 bridges inside
  the next. Small holes are set round the visible band, sized so each
  keeps 1.15 bridges from the layer's own opening and from its
  neighbours. The landscape gives each layer a skyline of three seeded
  sine waves, ranges at least 1.6 bridges apart, and pine trees on the
  nearer ranges whose trunks and tier notches are at least the bridge
  wide; the sky above is the hole. Every layout is checked before it is
  used; if none passes at the size and bridge asked, fewer layers are
  used, then a narrower bridge, each recorded as `requested_layers` or
  `requested_min_bridge_mm`. A card larger than the page is shrunk and
  recorded as `requested_size_cm`. The seed picks the colour ramp and
  every layout choice.
- **Solving:** nothing to solve.
- **Guarantees:** `layers_checked`. On the cut outlines: every two
  different cuts of a layer (its holes and the card's edge) are at least
  the minimum bridge apart. On a 0.4 mm raster of each layer: it is one
  piece of card, and still one piece after eroding it by half the minimum
  bridge (an exact distance transform), so nothing hangs by a thinner
  neck. On the composited stack: every layer is on top over at least 1 %
  of the card. The tests re-check visibility by sampling points directly
  against the outlines, and bridges by brute-force distances.
