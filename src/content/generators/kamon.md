---
title: "Kamon"
blurb: "Kamon - Japanese family crests with exact rotational symmetry, as silhouettes or colouring outlines"
category: design
version: "1.0.0"
---
Japanese family crests — blossoms, leaves, swirling tomoe, waves, feathers
and diamonds, drawn with the exact symmetry of the real thing.

## What it is

A mon is a Japanese family emblem: one motif, usually repeated around a
centre, often held in a ring. The generator draws them from traditional
elements:

- **Flowers** — sakura (cherry blossom), kikyo (bellflower), ume (plum
  blossom) and kiku, the chrysanthemum, with sixteen petals over sixteen.
- **Leaves** — three oak leaves (mitsu-gashiwa), three hollyhock leaves
  (mitsu-aoi), bamboo leaves (sasa).
- **Tomoe** — comma-shaped swirls, one to four (mitsu-domoe has three).
- **Waves, feathers and figures** — seigaiha waves, two crossed hawk
  feathers (chigai-takanoha), four diamonds (yotsu-bishi), the well frame
  (igeta) and the ox-cart wheel (genji-guruma).
- **Rings** — a circle (maru), a double circle, the tortoise-shell hexagon
  (kikko), a square with cut corners, a diamond, or none.

Each crest carries its traditional-style name, such as MARU NI MITSU-AOI,
"three hollyhock leaves in a circle".

## How to use it

The classic style is a solid black silhouette on white, with fine white
lines between the parts, ready to print, cut as a stencil, carve as a
stamp or use as a sticker. The outline style draws the same crest as clean
black lines for colouring: fill the petals and leaves, and leave the ring
or colour it to frame the design. A sheet shows nine different crests with
their names, good for choosing a favourite, for a collection page or for
stamps and labels; single pages give one crest large, best for colouring.

## Purpose

Mon are among the most elegant emblems ever designed — a few shapes, strict
symmetry, perfect balance — and are sought after for tattoos, crafts,
Japanese-themed prints and colouring books. Their appeal depends on
exactness: a crest that is not quite symmetric looks wrong at once. Built
from one motif turned by exact rotations, every crest here is as regular as
the originals.

## History

Mon began in the Heian period (794 to 1185) as marks on court carriages and
clothing, and spread to the samurai as banners and armour badges in the
wars of the twelfth century. By the Edo period (1603 to 1868) merchants,
temples, theatres and ordinary families had them too, and thousands are
recorded. The sixteen-petal chrysanthemum is the imperial seal; the three
hollyhock leaves belonged to the Tokugawa shoguns; the tomoe is linked to
the war god Hachiman. Mon are still worn on formal kimono.

## This implementation

- **Spec knobs:** `motif` (auto, sakura, kikyo, ume, kiku, kashiwa, aoi,
  sasa, tomoe, seigaiha, takanoha, hishi, igeta, wheel), `ring` (auto, none,
  maru, double, kikko, square, lozenge), `count` (tomoe 1 to 4, kiku petals
  8 to 24, bamboo leaves 3 to 8, wheel spokes 6 to 16; 0 = seeded), `style`
  (silhouette, outline), `layout` (single, sheet), `columns`, `label`,
  `stroke`, `width`, `height`.
- **Generation:** each motif is authored once — one petal, leaf or comma as
  curves in a local frame — and placed by exact rotations about the
  centre. Tomoe generalise the yin-yang: a round head resting on the rim, a
  tail running along the rim, and an inner edge that is one circular arc
  tangent to the head (with two commas and no gap it is the yin-yang
  exactly). Seigaiha keeps only fans that lie wholly inside the disc,
  symmetric about the vertical axis. The ring leaves a disc of room and the
  motif is scaled so its furthest point lands on that disc. Silhouettes are
  painted black with thin white separations and white cut-outs; outlines
  are the same shapes as black lines, with thin veins and stamens drawn
  solid. A sheet deals its motifs from a seeded shuffle, so none repeats
  until all have appeared.
- **Solving:** nothing to solve — a design.
- **Guarantees:** deterministic per seed. Tested: every crest is exactly
  invariant under its reported rotational order (the motif's order, reduced
  to the common divisor with a polygonal ring's) and, where claimed, under
  reflection in the vertical axis — checked by turning the flattened
  geometry and matching every shape to one of the same kind within 1e-3 —
  and a half-step turn is not a symmetry; tomoe commas never touch; every
  motif point lies inside the ring's room, which lies inside the ring's
  inner edge; every path on the page is closed; single outline pages pass
  the adult colouring preflight for every motif and ring (sheets are
  smaller and report their result). Meta carries each crest's name, order
  and mirror flag, the measured symmetry error on single pages, and the
  containment and closed-path results. Milliseconds per page.
