---
title: "Matyó-Style Embroidery"
blurb: "Matyó-style embroidery: satin-stitch Matyó roses, tulips and buds packed in mirror-symmetric bouquets and borders"
category: design
version: "1.0.0"
---
Dense, vivid satin-stitch roses, tulips and buds packed into a mirror-symmetric
bouquet, in the manner of the Matyó embroidery of Mezőkövesd, Hungary.

## What it is

An embroidered panel: a bouquet rising from a striped vase between two border
bands, or a stack of borders like the edge of an apron or a sleeve. Its flowers
are those of Matyó work — above all the Matyó rose, a round flower of two to
four concentric rings of scalloped petals round a contrasting centre — with
pointed peonies, three-petalled tulips, rosebuds held by green sepals, leaves
stitched in a herringbone, small five-petalled flowers and curling tendrils.
They are packed as tightly as they will go, the big roses first and smaller
flowers in every gap, and the whole picture is mirror-symmetric. Every petal is
filled with satin stitch: close parallel stitches laid along the petal, so the
thread catches the light.

Styles: bright threads on black cloth, on white linen, or line art for
colouring; and two palettes, the many-coloured later style (red, pink,
purple, yellow, green and blue) or red and blue alone.

## How to use it

Frame or print it as a picture, or use it as a pattern: Matyó embroiderers
draw the design onto the cloth and fill each shape with satin stitch, keeping
the stitches parallel within a petal and turning them to follow the next one.
On the line-art page, colour each ring of a rose in one colour and change
colour from ring to ring — red, pink and yellow, or purple and pink round a
blue centre — and give leaves and stems two greens. Keep both halves alike:
a flower and its mirror twin always match.

## Purpose

Matyó embroidery is a feast of colour held together by strict order: symmetry,
a few flower types and an urge to leave no ground uncovered. These pages
generate new compositions by those rules, with exact symmetry and no two
flowers touching, as finished pictures, colouring pages or starting points
for stitching.

## History

The Matyó are a Roman Catholic Hungarian community of Mezőkövesd and the
neighbouring villages of Tard and Szentistván in north-eastern Hungary, at the
foot of the Bükk hills. Their embroidery decorated shirts, aprons, pillow
ends, sheets and the famous wide sleeves of men's shirts. Older pieces were
worked mainly in red and blue; from the late nineteenth century the designs
grew larger and denser, the colours multiplied, and work on black cloth
became characteristic, with the rose as the leading motif. Designers known as
*írók* ("writers") drew the patterns for others to stitch; the best known,
Bori Kisjankó (1876–1954), is remembered for her inventive designs. In 2012
UNESCO inscribed "Folk art of the Matyó, embroidery of a traditional
community" on the Representative List of the Intangible Cultural Heritage of
Humanity. The Matyó Museum in Mezőkövesd keeps the tradition's history, and
the craft is practised by the community today. The compositions on these
pages are original arrangements in the manner of Matyó work and copy no
particular piece or designer.

## This implementation

- **Spec knobs:** `width`, `height` (points, 200-3000); `layout` (`bouquet` —
  default — or `bands`); `style` (`on_black` — default — `on_white`,
  `line_art`); `palette` (`vivid` — default — `red_blue`); `rings` (petal
  rings of the largest roses, 2-4, default 3); `fill` (fill the remaining
  gaps with buds, leaves, small flowers and tendrils); `border` (border bands
  above and below the bouquet); `stitch` (satin-stitch spacing on a 600 pt
  page, 0.5-3, default 1.4, scaled with the page).
- **Generation:** the page is built relative to its vertical axis. Every
  flower is made upright in its own circle and exactly symmetric: petals on
  its axis are a right half plus its exact negation, the rest are right-hand
  petals with mirrored twins. The rose has a centre disc and rings of
  scalloped (peony: pointed) petals, alternate rings offset by half a petal.
  The bouquet is a greedy packing of the right half of an ellipse above the
  vase: on a grid of candidates the free radius is the smallest distance to
  the ellipse, the vase, every placed flower and every placed flower's
  mirror image, so an off-axis flower stays clear of its own twin; the
  roomiest candidate takes a flower of that size (rose, then tulip or small
  rose, bud, leaf, small flower, tendril) turned away from the vase, until
  no gap is big enough. Flowers on the axis stay upright. A few stems run
  from the vase mouth under the nearest flowers. Border bands repeat roses,
  tulips, buds or small flowers along a wavy stem (an even function of x),
  with leaves where they fit. Every area is then hatched with parallel
  stitches at its own angle and clipped exactly to its outline; an area
  that straddles the axis is hatched, cut at the axis and its right half
  mirrored. The left half of the page is the right half with x negated.
- **Guarantees:** deterministic per seed. Tested: the page is exactly
  mirror-symmetric — the multiset of all areas (outline and stitches) and
  lines equals its reflection bit for bit; no two flower circles meet, none
  meets the vase, and every petal lies inside its flower's circle, so
  flowers never overlap; every stitch lies inside its petal; all ink is on
  the page; the line-art page passes the adult colourability check.
  `verification: mirror_exact_blooms_disjoint_stitches_inside`. Clamped knobs
  are reported as `requested_<field>`.
