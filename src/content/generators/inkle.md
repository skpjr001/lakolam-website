---
title: "Inkle Weaving"
blurb: "Inkle-loom drafts — heddled and open warping drafts for plain-weave bars, stripes, spots and log cabin, and two-colour pick-up bands, the band re-woven by simulating both sheds and every pick-up, with floats kept within a limit"
category: design
version: "1.0.0"
---
Inkle-loom drafts for warp-faced bands: plain-weave bars, stripes, spots and
log cabin, and two-colour pick-up motifs, each woven out pick by pick.

## What it is

A complete draft for a band woven on an inkle loom. The warping draft shows
every warp end in order across the band, in two staggered rows: the top row
(H) is the ends that go through a heddle, the bottom row (O) the open ends
between them, as inkle weavers write their drafts. A key gives each colour
and how many heddled and open ends to wind in it. The drawdown beside or
below shows the finished band, every warp end drawn as a float of its colour
where it lies on top, heddled and open ends interlocking as they do in a
warp-faced weave.

The plain-weave patterns come from the warp alone: horizontal bars (a
ladder) where heddled and open ends differ, lengthwise stripes where they
match, rows of spots from single contrasting ends, log cabin blocks whose
bars swap colour, and seeded mirrored warps. The pick-up patterns add a
chart: diamonds, zigzags and lattices, crosses and stars, and seeded motifs,
worked in pairs of pattern ends on a light ground. A second view draws a
long stretch of the band across the page.

## How to use it

Wind the warp in the order shown, from left to right, putting each end in
the top row through a heddle and leaving each end in the bottom row open.
The band starts and ends with a heddled end. Weave by changing between the
two sheds: for the first, push the open ends down so the heddled ends are on
top; for the second, lift the open ends above them. Pass the weft and beat
after every change, and keep the weft tension even so the warp packs
together and hides it.

For a pick-up band, the ends marked with a dot are the pattern ends, in pairs
of one heddled and one open end. Each row of the chart is one pick and each
column one pair, starting from the first pick. After opening the shed, work
across the row: in a filled square, pick up the pattern end of the pair that
lies underneath so both show; in an empty square, push the pattern end that
lies on top down so neither shows; in a square with a dot, leave the pair as
the shed has it. Then pass the weft. When you reach the end of the chart,
start again from the first row. The foot of the page gives the longest float
the band makes, so you know none will catch.

## Purpose

An inkle draft has to get three things to agree: the warp, the sheds and
the picture. Wind one end in the wrong row and a bar turns into a stripe;
pick up a pattern end for too many picks running and it floats loose on the
face or the back, where it snags. Every band here is woven twice. The second
time a model of the loom opens each shed, moves every pattern end the chart
asks for, and the result must match the drawdown end for end and pick for
pick. Every float on both faces is measured over the whole repeat, so the
band can be woven to any length, and none may pass the chosen limit.

## History

The inkle loom is a small, simple frame loom for narrow warp-faced bands:
belts, straps, garters, trims and guitar straps. Inkle was the old name for
linen tape, and the loom is named in English sources from the sixteenth
century on. Narrow bands woven with string heddles are far older and are
found from Scandinavia and the Baltic to the Andes. The inkle loom came back
into use in the 1930s through the work of Mary Meigs Atwater, and its
patterns have been gathered since in books such as Anne Dixon's *The
Weaver's Inkle Pattern Directory*, with its 400 warp-faced designs. Baltic
pick-up, in which pattern ends are lifted and lowered by hand to draw
motifs, is the traditional band technique of Latvia and Lithuania, taught
widely today by weavers such as Susan J. Foulkes.

## This implementation

- **Spec knobs:** `pattern` (auto, bars, stripes, spots, log_cabin,
  mirrored, pickup_diamonds, pickup_zigzag, pickup_crosses, pickup_random),
  `ends` (13–121, made odd so both rows mirror), `border` (0–16 ends each
  side, lowered to keep at least 7 centre ends or 4 pick-up pairs),
  `colours` (2–4), `max_float` (3–15 picks), `picks` (8–240), `view`
  (draft, band), `palette` (auto, madder, forest, royal, earth, mono),
  `width`, `height` (144–3000 pt). Out-of-range values are clamped and
  reported as `requested_*`.
- **Generation:** ends alternate heddled and open, starting and ending with
  a heddled end. The border is solid (a bar with four colours). A plain
  centre is built per mirrored position and per layer from the seeded
  pattern rules. A pick-up centre is a background end, then repeats of a
  pattern pair and a background end, with an even number of pairs so the
  warp mirrors exactly; the chart is drawn from the motif rules, then any
  run of the same choice that would float a pattern end past `max_float` is
  broken by weaving the middle forced cell (and its mirror) plain, until
  every float is within the limit (`cells_woven_plain`).
- **Solving:** nothing to solve; it is a design.
- **Guarantees:** deterministic per seed. The band is re-woven by a model
  of the loom (`verification:
  band_rewoven_by_simulating_sheds_and_pickup_floats_bounded`): shed 1 puts
  the heddled ends on top, shed 2 the open ends, then each chart cell moves
  exactly one pattern end of its pair between the layers. Every end of every
  pick must agree with the drawdown; every float on the face and the back,
  measured cyclically over the repeat, must be at most `max_float` (plain
  weave floats one pick); the ends must alternate heddled and open; the
  per-colour heddled and open counts printed on the page must add up to the
  warp; and the warp must mirror about its centre. Tests re-weave every
  pattern with an independent layer rule, check the textbook sheds and a
  three-pick pick-up float directly, refuse hand-broken bands and an
  endlessly floating column, show every option changes the page, and sweep
  every boundary for a finite page inside its bounds.
