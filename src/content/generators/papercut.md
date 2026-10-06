---
title: "Papercut"
blurb: "Folded papercuts — stars, snowflakes, banners and silhouette frames that unfold from one designed wedge, proven to stay one piece with bridges no thinner than a set width"
category: design
version: "1.0.0"
---
Folded papercuts in the folded-paper tradition: lace-like stars, snowflakes,
banners and silhouette frames, each unfolding from one small designed piece
and guaranteed to stay in one piece when you cut it.

## What it is

Fold a sheet of paper, cut shapes into the folded edges, open it out — and
every cut appears several times, mirrored at each fold, in a symmetric lace.
That is the whole trick behind paper snowflakes, the folk paper stars and
rosettes of Central and Eastern Europe, the fine-cut banners strung across
streets for fiestas, and the mirrored silhouettes of folk paper art. Only
one wedge of the design is ever cut; the folds make the rest.

This page offers four kinds:

- **Stars** — a circle folded into a narrow wedge, with rings of flowers,
  tulips, hearts, leaves, teardrops and birds, and a scalloped, petalled or
  pointed edge.
- **Snowflakes** — six-fold, with deep points and crisp geometric cuts.
- **Banners** — a sheet folded once down the middle, with a lace border, a
  central medallion and a plain strip at the top that folds over a string.
- **Frames** — an oval or arched silhouette folded once, with a window in the
  middle for a name, a photo or a drawing, flanked by facing birds and
  flowers.

## How to use it

- **As wall art.** The default page shows the finished papercut in one solid
  colour on white. Print it as it is, or print the cutting file on coloured
  paper and cut it.
- **With a craft knife or cutting machine.** The template shows the whole
  design in outline with the parts to cut away in grey. Lay it on thin paper
  on a cutting mat and cut out every grey shape, smallest first, then the
  outer edge. The shapes are one closed outline each, which also suits
  electronic cutting machines (use the SVG).
- **With scissors, the traditional way.** Choose the wedge-only template.
  Cut a circle of thin paper the size of the design, fold it in half, then
  fold it into the number of layers printed on the page (a 45°, 30° or 22.5°
  wedge). Trace or pin the wedge on top, cut away the grey shapes and the
  outer edge through every layer, and open it out. Thin paper — tissue,
  origami or gift paper — folds and cuts most cleanly.
- **Banners:** fold the top strip over a string along the dashed line and
  glue it, then hang a row of banners together.
- **The unfolding puzzle.** The puzzle page shows a folded piece of paper
  with shapes cut from it, and four opened-out papers. Which one is it? Think
  about how each cut is mirrored at every fold — a shape on a fold line
  becomes one whole shape, a shape between the folds becomes a mirrored
  pair. Then try it with real paper and scissors to check.

## Purpose

Papercutting is one of the most satisfying crafts for the cost of a sheet of
paper, and folding makes it look far harder than it is. A design still has
to work as paper, though: if two cuts come too close the strip between them
tears, and if a ring of cuts closes up, the middle simply falls out. The
generator designs the wedge, mirrors it exactly the way folding does, and
checks the result before you cut, so every page is a papercut that holds
together. The puzzle builds the spatial reasoning — reflection and rotation
— that folding teaches by hand.

## History

Paper cutting began in China soon after paper itself, where symmetric cuts
made by folding have been made for well over a thousand years. Folded
papercuts travelled with paper across Asia and into Europe, and grew into
distinct folk traditions: the bright rosettes and stars of Polish
*wycinanki*, Swiss and German *Scherenschnitte* with their mirrored
silhouettes of trees, birds and hearts, Jewish papercuts, and the perforated
tissue banners of Mexico. The paper snowflake became a schoolroom staple in
the nineteenth and twentieth centuries. These designs are generated in the
spirit of those traditions; they do not reproduce any particular historical
piece.

## This implementation

- **Spec knobs:** `output` (`preview`, `template`, `puzzle`), `style`
  (`star`, `snowflake`, `banner`, `frame`), `fold` for stars and snowflakes
  (`auto`, `four`, `six`, `eight` fold lines — a 45°, 30° or 22.5° wedge, 8,
  12 or 16 layers; snowflakes default to six; banners and frames are always
  folded once), `min_bridge` (narrowest strip of paper allowed between two
  cuts, mm, 1.5-6, default 2.5), `detail` (rings of motifs in a star, 2-6;
  0 = seeded), `colour` (`auto`, `red`, `cobalt`, `emerald`, `magenta`,
  `black`, `gold`, `teal`, `orange`; frames default to black),
  `wedge_only` (template of the wedge alone), page `width`/`height`,
  `stroke`.
- **Generation:** only the fundamental domain is designed — the wedge
  0 ≤ θ ≤ π/n of a D_n star, or the left half of a once-folded sheet — and
  the design is unfolded by the group (n rotations and n reflections, or the
  identity and one mirror). Star edges are polar profiles over the wedge
  (scallops, points, petals, teeth), so the outline is symmetric by
  construction; frames are an oval or an arch pushed out by arc-length
  scallops; banners have a scalloped or pointed foot. Cuts come from a
  curated vocabulary (circle, teardrop, lozenge, leaf, heart with an open
  cleft, tulip, crescent, flower, star, chevron, bird, oval window,
  rosettes); every shape but the bird is mirror-symmetric, so it may sit on
  a fold line and become one whole shape, while the bird sits only between
  folds and opens into facing pairs. Composition is in layers — a lace of
  small cuts following the edge, a central rosette, rings that alternate
  between the two fold lines and the middle of the wedge (banners: border
  lace, a medallion and corner motifs; frames: the window, a crest, a foot
  and side motifs) — and each group of cuts is *grown* by bisection to the
  largest size that keeps its clearance from the edge, from every placed
  cut, and from its own mirror images. A farthest-point fill then puts a cut
  at the emptiest spot, as large as fits, until no spot has room for the
  smallest cut — which is what gives the even, lacy density.
- **Solving:** nothing to solve, except the puzzle: its folded wedge always
  holds a cut on each fold line and one turned cut between them, so every
  wrong unfolding — turned without flipping, cuts swapped between the fold
  lines, folded half as many times, a cut missing — looks different. Options
  are kept only if they differ from the answer and from each other on more
  than 1% of the paper (compared on a raster); the answer key circles the
  right one.
- **Guarantees:** checked on the unfolded design by an independent raster
  proof, separate from the vector placement that tried to ensure them. The
  paper is rasterised at about a sixth of `min_bridge` per pixel; (1) the
  paper pixels form **one connected piece** (8-connected — the sharp tip of a
  paper tongue inside a heart's cleft can thin below a pixel); (2) **every
  bridge** — the paper between two *different* cuts, or between a cut and
  the edge — is at least `min_bridge` wide, measured by an exact Euclidean
  feature transform: where neighbouring pixels are nearest to different
  cuts they straddle a bridge of width d₁ + d₂ − 1 pixels, rounded down so
  the estimate never flatters. Placement keeps 5% plus 2.5 pixels of extra
  clearance; any group of cuts on a failing bridge would be removed and the
  proof re-run, so a shipped page always passes. Meta reports `one_piece`,
  `bridges_ok`, `narrowest_bridge_mm`, `vector_clearance_mm` and
  `repaired_groups`. Tests re-prove both properties at half the pixel size,
  show the same check failing on a control with grown cuts and on a sealed
  ring, and check the cut set and outline are closed under the fold group.
  Not covered: the paper *inside* one cut's notch (a tulip's petals, a
  heart's cleft) narrows to a point, as in any hand-cut design — those are
  tips, not bridges, and nothing hangs from them.
