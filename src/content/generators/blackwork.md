---
title: "Blackwork"
blurb: "Blackwork fillings — symmetric double-running-stitch patterns on the thread grid, as a sampler or graded shading over a silhouette"
category: design
version: "1.0.0"
---
Holbein-stitch fillings: small symmetric lattices of straight stitches,
worked out and back in one dark thread. Stitch them as a sampler, or let
them shade a shape from light to dark.

## What it is

Blackwork is counted embroidery in a single dark thread on evenweave linen.
Every stitch is a straight line over two threads of the fabric, running
along the weave or on its 45° diagonal, and the stitches join into
*fillings*: little repeating lattices of crosses, diamonds, octagons, stars
and chains that fill the shapes of a design like a texture. Worked in
double running (Holbein) stitch, each line is stitched out along its path
taking every other step, then back again filling the gaps, so the line is
the same on both faces of the cloth.

This page gives you fillings in two ways:

- **A sampler** — six to twelve different fillings, each in its own box, with
  the box outlines stitched too.
- **Shading** — one filling laid over a silhouette (a heart, circle, pear,
  leaf, egg or a plain panel) in graded densities. The lightest areas show
  only the filling's open framework; each darker zone adds another element
  of the same pattern, so the shading deepens without the pattern breaking.

## How to use it

- **Work it as a chart.** Each square of the faint grid is one stitch — two
  threads of evenweave (or one block of Aida). On 28-count linen a box of the
  sampler is about 10 cm across. Start anywhere on a line and follow the
  pattern outward, stitching every other step; when a branch ends, turn and
  come back filling the gaps. Every filling and outline on the page is one
  connected piece, so a single thread can work the whole of it out and back,
  and the back will look like the front.
- **Use the labels.** Each sampler box is numbered and names its symmetry
  (P4M mirrored every way, PMM mirrored across rows and columns, CMM mirrored
  on the diagonals) and the size of its repeat, so you can lift any filling
  into your own design.
- **Choose the thread.** Black is traditional; scarlet (redwork), blue, green
  and gold are options.
- **Colour or trace it.** Turn the grid off for a clean line drawing to
  colour, or to transfer.

## Purpose

Fillings are the vocabulary of blackwork, and stitchers collect them: a
sampler of fresh, correct fillings is both a practice piece and a pattern
book. Designing a filling by hand means checking it repeats cleanly, is
symmetric, and can be worked in one continuous double-running path — the
generator guarantees all three, and draws the shading version, which is
tedious to chart by hand.

## History

Counted black-on-white embroidery was fashionable in Tudor England, where it
decorated the collars, cuffs and coifs seen in portraits of the period; the
double running stitch is often called Holbein stitch after the painter, whose
portraits record it in detail. The work is usually linked to Spanish
embroidery traditions, though its exact origins are debated. Geometric
fillings inside outlined shapes became a hallmark of the style, and
blackwork enjoyed revivals in the 20th century, including modern "shading"
pieces in which fillings of graded density model light and shadow.

## This implementation

- **Spec knobs:** `output` (`sampler`, `shading`), `group` (`auto`, `p4m`,
  `pmm`, `cmm`), `repeat` (repeat unit in stitches, even 4-10; 0 = seeded),
  `fillings` (6-12 on a sampler), `silhouette` (`auto`, `heart`, `circle`,
  `pear`, `leaf`, `egg`, `panel`), `levels` (shading densities, 3-5),
  `units` (shading canvas width in stitches, 32-120), `thread` (`black`,
  `red`, `blue`, `green`, `gold`), `grid`, `labels`, page `width`/`height`,
  `stroke`.
- **Generation:** a filling lives on an `n × n` torus of holes; an edge is
  one stitch along a row, a column or a diagonal. It starts from a *spine* —
  a lattice that already tiles connectedly (diamond chains, octagon nets,
  stepped diamonds, linked squares, long-hexagon chains for pmm, diagonal
  hexagons for cmm…) — and adds one to three *ornaments* from a curated
  vocabulary (crosses, saltires, squares, diamonds, octagons, stars,
  arrow tips, fleur barbs, leaves, links, bars, long hexagons, tilted
  rectangles) at the unit's symmetry points. Each stroke is replaced by its
  orbit under the group, so the motif is symmetric by construction; a
  stroke is only accepted if it touches the existing motif, adds enough to
  show, keeps density under a ceiling (30% of possible edges on a sampler),
  leaves no hole with more than six stitches meeting, and keeps the tiling
  connected. The finished motif must have exactly the requested group's
  symmetry (not more), and no more than 45% of its stitches may lie on
  unbroken rails, which otherwise read as graph paper. Sampler fillings are
  distinct; with `auto` the groups are mixed. A sampler box is centred on a
  motif origin, so each box is symmetric; the filling is clipped to the box
  and the box outline is stitched.
- **Shading:** the filling is grown in cumulative levels (spine at most 20%
  dense, then each ornament adding at least 30% more stitches). The
  silhouette is sampled at the holes, opened by one step to remove spurs,
  and outlined on the stitch lattice with 45° steps; zones are bands of
  distance from a highlight at upper left, read at the centre of each
  repeat so whole motifs change density together.
- **Solving:** nothing to solve — the route is the proof. The stitched graph
  of each box (filling plus outline) and of the silhouette is built and its
  double-running route computed by a depth-first walk that goes out along
  every unused stitch and back when done.
- **Guarantees:** every repeat unit tiles into one connected graph (checked
  on a 3 × 3 patch; overlapping patches then cover the plane); each motif is
  invariant under exactly its labelled group (`symmetric`); every box and
  silhouette is one connected piece; and its route crosses each stitch
  exactly twice, once each way, on steps of opposite parity — so stitching
  alternate steps on the front works every stitch once on each face
  (`double_running_route_verified`). In a sampler box nothing is dropped:
  any path out of the box crosses its outline at a hole, so every clipped
  fragment is joined to the outline. In shading, fragments a zone boundary
  cuts off are dropped and counted (`dropped_fragment_stitches`; tests
  require under 5%). Tests also break the checks on purpose (parallel rails,
  a truncated route, two pieces) to show they fail.
