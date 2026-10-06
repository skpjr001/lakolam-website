---
title: "Bargello"
blurb: "Bargello flame stitch — mirrored line profiles in cycling bands of shade, as a preview, stitch chart or colouring page"
category: design
version: "1.0.0"
---
Florentine flame stitch: one zigzag line of upright stitches, repeated down
the canvas in bands of shaded colour until flames, waves or onion domes fill
it edge to edge.

## What it is

Bargello is needlepoint worked entirely in straight stitches. Every stitch
runs upright over the same number of canvas threads — usually four — and
each column's stitch starts a little higher or lower than its neighbour's.
That rise and fall, column by column, is the line's *profile*: steep steps
make tall, pointed flames; gentle ones make rolling waves; a bulb with a
pointed tip makes an onion dome. The profile is mirrored about its centre so
every peak is symmetric. Stitch one line, then the next directly beneath it
in the next shade, and keep going: the bands of colour follow the profile
all the way down, and the canvas fills completely, with shorter
"compensation" stitches only at the edges.

The four-way (Kaestner) variation works a square canvas divided on its
diagonals. The top and bottom quarters are stitched upright and the two side
quarters sideways, all with the same profile, so the lines run in rings
around the centre and the whole design has the eightfold symmetry of a
kaleidoscope.

## How to use it

- **As a preview.** The default page shows the finished piece in smooth
  bands of colour — shades of one hue, dark to light and back.
- **As a stitch chart.** The chart draws every stitch on the canvas grid,
  marked with a letter for its colour, with heavier guide lines every ten
  threads from the centre and a key giving each colour's stitch count. Work
  it on mono canvas in wool or stranded cotton: start one line across the
  middle following the letters, then stitch each following line directly
  above and below it.
- **As a colouring page.** The colouring version outlines every band as a
  closed shape. Colour it in shades of one colour for the classic look, or
  in any colours you like.

## Purpose

Bargello is the most graphic of the needle arts — a whole design from one
line and a handful of shades — and it is easy to stitch once the line is
charted, which is exactly what a generator can do: design a fresh line, fill
the canvas correctly to the edges, count the stitches, and show what the
finished piece will look like before a single thread is bought.

## History

The name comes from the Bargello palace in Florence, whose chairs are
upholstered in the zigzag stitch; the work is also called Florentine work,
flame stitch and Hungarian point. Tradition credits a Hungarian bride who
married into the Medici family with bringing it to Florence in the 15th
century, though the story is legend. Flame-stitch embroideries survive from
17th-century Italy and England, and the technique enjoyed a large revival in
the 1960s and 70s, when four-way designs — often credited to the
needlepoint author Dorothy Kaestner — showed how a single profile mirrored
on a square's diagonals makes a kaleidoscopic medallion.

## This implementation

- **Spec knobs:** `output` (`preview`, `chart`, `colouring`), `profile`
  (`auto`, `random`, `flame`, `medallion`, `ribbon`, `wave`),
  `stitch_length` (threads per stitch, 2-8), `step` (largest offset between
  neighbouring columns, at most stitch length − 1), `period` (columns per
  repeat, 0 = seeded), `palette` (`auto`, `garnet`, `ocean`, `forest`,
  `amethyst`, `saffron`, `ember`, `heather`), `bands` (shades in the cycle,
  2-10), `shading` (`mirror` dark→light→dark, `ramp` dark→light then
  restart), `four_way`, `width_threads` / `height_threads` (16-200; a
  straight canvas is made an odd number of threads wide so it mirrors about
  a centre column, a four-way canvas is a square of odd side), page
  `width`/`height`, `stroke`.
- **Generation:** a half profile is built from the valley to the peak and
  mirrored, so each repeat is symmetric about both its peak and its valley.
  Named profiles sample a shape (flame t^1.7, a cosine wave, an onion dome
  of bulb + shoulder + tip, a ribbon of level pairs and full steps), every
  step clamped to `step`; the random profile is a walk of runs of equal
  steps (as bargello lines are designed: three up one, two up three…) with
  the odd level or dip, redrawn if it barely rises. The profile is centred
  on the canvas at a peak. Each thread's band is ⌊(y + h(x) − max h) / L⌋
  on a straight canvas; on a four-way canvas, the thread's quarter gives its
  along-coordinate u and outward distance v, and the band is ⌊(v − h(u)) / L⌋
  so the peaks point outward (diagonal threads belong to the upright
  quarters). Stitches are the maximal runs of one band within one quarter,
  upright in the top and bottom quarters and sideways in the side ones. Band
  colours cycle through the shade list. The preview fills each band's
  traced outline; the chart draws stitches by colour, outlines, a letter
  per stitch and the key; the colouring page outlines each band region,
  merging any sliver cut off at the canvas edge that would fall under the
  adult 40 mm² floor into its longest-bordering neighbour.
- **Solving:** nothing to solve — a design.
- **Guarantees:** deterministic per seed. **Every canvas thread is covered
  by exactly one stitch, and every stitch is 1 to L threads long** —
  tested for every profile, several stitch lengths and steps, straight and
  four-way, and reported in meta (`covered_exactly_once`,
  `stitch_lengths_in_range`, with full-length and compensation stitch
  counts). On a straight canvas every stitch not touching the top or bottom
  edge is exactly L long. Profiles are tested mirror-symmetric with every
  step ≤ `step` < L, so neighbouring stitches of one line always overlap.
  The straight canvas mirrors left to right; the four-way canvas's colours
  are tested invariant under both mirrors and the diagonal flip (the full
  symmetry of the square), with side quarters stitched sideways. Adjacent
  bands never share a colour. Chart stitch counts sum to the stitch total.
  Colouring pages pass the adult colourability rules (tested over seeds,
  straight and four-way) and report region count and smallest region in
  threads and mm².
