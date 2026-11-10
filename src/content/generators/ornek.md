---
title: "Örnek Bouquet"
blurb: "Örnek-style ornament in the manner of Crimean Tatar embroidery: a mirrored vase or tree of life of tulips, roses, carnations, almond blossom and pomegranates"
category: design
version: "1.0.0"
---
A mirrored bouquet of tulips, roses, carnations, almond blossom and
pomegranates on smooth curling stems, in the manner of Crimean Tatar örnek
ornament.

## What it is

A design in the manner of *örnek*, the ornament of the Crimean Tatars. A
straight main stem rises from a vase (or, as a tree of life, from a small
hill) to a rose with a tulip inside it; branches curl away from the stem on
both sides, each ending in a flower, and short side shoots carry leaves,
buds and small blossoms. The whole composition is mirrored left to right.
Every flower is a stylised symbol drawn flat and symmetric. A geometric
border band of diamonds, with square-and-diamond stars at the corners,
frames the field. Three looks: coloured silk with gold-thread outlines on
dark velvet, as in embroidery; cobalt blue on white, as on painted
ceramics; and line art to colour.

## How to use it

Display it, or choose line art and colour it as an embroiderer would: give
every flower and its mirror image the same colours, use two shades of one
colour for a flower's outer and inner petals, keep all the stems and leaves
one green, and pick out the hearts of the flowers and the border's small
diamonds in gold. You can read the bouquet as örnek is commonly read — as
a picture of a family, its people standing for the flowers:

- **tulip** — a young man;
- **rose** — a woman;
- **tulip inside a rose** — love, the union of a man and a woman;
- **carnation** — older people, and wisdom;
- **almond blossom** — a girl;
- **pomegranate** — abundance;
- (in the wider tradition, the **poplar** or **cypress** stands for a man).

## Purpose

A rich, balanced page that shows how a symmetric floral composition is
built — main stem, branches, flowers, then leaves into the gaps — and an
introduction to an ornament whose flowers carry meanings.

## History

Örnek ("pattern", "example" in Crimean Tatar) is the traditional ornament
of the Crimean Tatars, the indigenous people of Crimea. It is used in
embroidery (often gold thread on velvet), weaving, jewellery and
filigree metalwork, woodcarving and ceramics, and is passed on in families
and workshops. Its motifs are mostly plants — tulips, roses, carnations,
almond, poplar and cypress, pomegranates — and geometric figures, combined
into compositions whose symbols speak of the people they were made for: a
bride's dowry towel or a man's sash could say who the maker was and what she
wished. The deportation of the Crimean Tatars by the Soviet state in May
1944 nearly broke the tradition; after the return to Crimea from the late
1980s, artists and teachers revived it. In 2021 UNESCO inscribed "Ornek, a
Crimean Tatar ornament and knowledge about it", nominated by Ukraine, on the
Representative List of the Intangible Cultural Heritage of Humanity
(decision 16.COM 8.B.45). The symbol meanings above are as commonly
described, including in the UNESCO nomination; makers and sources vary in
the details. This page is örnek-style: the compositions are invented by the
generator from the tradition's construction — mirrored stems, symbolic
flowers, geometric borders — and copy no piece. Sources: UNESCO Intangible
Cultural Heritage, "Ornek, a Crimean Tatar ornament and knowledge about it"
(ich.unesco.org, 2021) and the Intergovernmental Committee's decision
16.COM 8.B.45 (December 2021).

## This implementation

- **Spec knobs:** `layout` (vase — the default; tree, a tree of life on a
  hill), `style` (embroidery — the default; ceramic; line_art), `branches`
  (2–6 flowering branches per side, default 4), `buds` (0–40 side shoots
  with leaves and small flowers per side, default 16; as many as fit are
  placed, so past the page's room more changes nothing), `border` (the
  geometric band, default on), `width`, `height`.
- **Generation:** each symbol is drawn once in a unit frame — base at the
  origin, axis up, everything inside the unit disc above the base — and is
  symmetric about its axis. The top flower (a tulip in a rose) and, when
  it fits, a middle rose or pomegranate sit on the straight main stem. Each
  branch flower is chosen by a largest-empty-circle search over a lattice
  of candidate centres in the right half: a candidate's radius is its
  clearance from every placed disc, the field edge, the vase, the stems and
  the axis; candidates near the branch's target height score best. The
  branch is a cubic Bézier leaving the main stem along its tangent and
  arriving at the flower's base along the flower's axis, rejected if it
  would cross a flower or another stem. Side shoots leave a random point of
  a stem the same way and carry a leaf, an almond blossom, a small tulip or
  a carnation in the space found there. The left half is the mirror image.
  The border's diamonds are spaced evenly along each side.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; `verification:
  mirror_exact_blooms_disjoint_stems_g1`. Tested on every layout, style and
  border setting: every drawn path's mirror image is a path of the same
  style on the page (checked on the rendered scene, independently of how
  it was built); no two flower discs overlap and every control point of
  every flower lies inside its disc, so flowers never overlap; every branch
  leaves its parent along the parent's tangent and ends at its flower's
  base along the flower's axis (G1); all ink stays on the page; clamped
  values are reported as `requested_<field>`.
