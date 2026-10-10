---
title: "Halftone"
blurb: "A picture (an upload or a built-in one) as a print halftone: round, square, elliptical, cross or line dots, in black or separated into CMYK at the classic screen angles"
category: design
version: "1.0.0"
---
Your picture as a printer sees it: a screen of dots that grow in the shadows
and shrink in the light, in black or in the four process inks.

## What it is

A page that redraws a picture the way newspapers, magazines and comic books
have printed photographs for over a century. Upload a photo or drawing (or
use one of the built-in pictures, lit from the upper left so it has shading)
and it becomes a regular grid of dots. Every dot sits in its own small cell,
and the share of the cell it covers is the darkness of the picture there:
a pale area gets pinpricks, a mid-grey area dots that just touch, a shadow
dots so big that only small white holes are left.

Choose the dot:

- **Round** — the classic dot, merging into a field of white holes in the
  shadows.
- **Square** — squares that meet corner to corner in a checkerboard at half
  tone.
- **Ellipse** — the chain dot: ovals that join into chains along the screen
  before they close up across it, which smooths the jump in the middle
  tones.
- **Line** — a line screen: parallel lines that swell where the picture is
  dark and thin to a hair where it is light.
- **Cross** — plus signs that grow into a lattice.

And choose the inks:

- **Mono** — one black screen, tilted 45 degrees as black screens
  traditionally are.
- **Colour** — the picture split into cyan, magenta, yellow and black, each
  printed as its own screen at its own angle (cyan 15, magenta 75, yellow 0,
  black 45 degrees). Where the dots of two inks overlap they mix as ink
  does on paper: cyan over magenta prints blue, cyan over yellow green,
  magenta over yellow red. Up close the four screens form little flower
  shapes called rosettes; from across the room they melt back into the
  picture.

A halftone is made of dots, not outlines, so it is a picture to print and
hang, not a page to colour in.

## How to use it

Pick a picture with a clear subject and a good range of light and dark: a
face lit from one side, a bright flower, a cat on a plain wall. Coarse
screens (few cells across) give the bold pop-art look of old comic books
and look best from a distance; fine screens hold more detail and look like
a newspaper photo. Try every dot shape: round for the classic look, the line
screen for an engraved feel, crosses for something unusual. In colour, a
little grey-component replacement keeps the darks crisp. Print it large,
step back, and watch the dots turn into the picture. Then look closely with
a magnifying glass to find the rosettes.

## Purpose

To show how printing fools the eye. A press can lay down ink or leave paper
bare, nothing in between, yet a printed photograph seems to have every shade
of grey; the trick is dots too small to see one by one, whose size the eye
averages into tone. In colour, four inks at four angles make every colour
the eye sees in a magazine. The page makes that machinery big enough to see,
and it makes a striking poster of a favourite photo.

## History

William Henry Fox Talbot proposed photographic "screens or veils" — a fine
gauze laid over the plate to break a picture into dots — in his 1852 patent
for photographic engraving. On 4 March 1880 the New York *Daily Graphic*
printed "A Scene in Shantytown", often called the first newspaper picture
with a full range of tones, from a crude halftone screen. Georg Meisenbach
patented his autotype process in 1882, using a ruled line screen turned
during the exposure to make a cross-line pattern. Frederic Ives worked on
halftone methods through the 1880s, and with Louis and Max Levy produced
precisely ruled glass cross-line screens; by the 1890s Max Levy had made
such screens practical to manufacture, and halftones replaced hand-cut
wood engravings in the press.

Benjamin Day's shading dots (1879), applied by hand from patterned sheets,
gave comic books their flat dotted tints, which Roy Lichtenstein blew up to
gallery size in his pop-art paintings of the 1960s.

Colour printing puts each ink on its own screen at its own angle. Screens at
nearly the same angle beat against each other in a coarse moire, so the
three strong inks are set 30 degrees apart and the faint yellow goes in the
remaining 15-degree gap. The usual set in American printing is cyan 15,
magenta 75, yellow 0 and black 45 degrees; the small regular pattern that
remains is the rosette. Elliptical "chain" dots were introduced to soften
the sudden jump in the middle tones where round dots touch all at once. Grey
component replacement, printing the grey shared by cyan, magenta and yellow
in black instead, came with electronic colour scanners in the 1980s and
saves ink and keeps shadows neutral.

## This implementation

- **Spec knobs:** `image` (a PNG or JPEG as a data URL or base64; empty uses
  a built-in picture chosen by the seed), `style` (colour, mono), `dot`
  (round, square, ellipse, line, cross), `ruling` (cells across the
  picture, 20-200), `angle` (the black screen's angle, 0-180 degrees; in
  colour the other inks keep their offsets C -30, M +30, Y -45), `gcr`
  (colour only, 0-1), `width`, `height`, `margin` in points. Out-of-range
  numbers are clamped and the request is recorded as `requested_<field>`.
- **Generation:** the picture is read in colour at 256 pixels on its longer
  side and fitted inside the margins, centred, keeping its aspect. A
  built-in picture is lit from the upper left (ink scaled from 0.3x to
  1.15x by distance from the light) and softened by a 3x3 blur, so its flat
  colours become gradients. Mono screens the darkness (1 minus Rec. 709
  luma). Colour separates each pixel: C' = 1 - R, M' = 1 - G, Y' = 1 - B,
  K = gcr x min(C', M', Y'), C = (C' - K) / (1 - K) and likewise M and Y.
  Each ink is screened on a square lattice of cells turned to its angle
  about the picture's centre, the cell side being the picture's width over
  the ruling. A cell's tone is its ink plane averaged at 4x4 points across
  it. The dot (circle, 0.6 ellipse, square or plus) is grown by one
  parameter and clipped to its cell, and the parameter is found by
  bisection on the exact area (circle segments, rectangle sums), so the
  dot covers the tone to machine precision; tones under 0.4% get no dot.
  A line screen draws one band per lattice row whose thickness at each
  cell edge is the mean of the two tones beside it and at each cell centre
  2 x tone minus the mean of its edges, so each cell's two trapezoids cover
  its tone wherever the neighbours allow. Each ink is one filled path. In
  colour the inks are drawn alone, then each overlap (C+M, C+Y, M+Y,
  C+M+Y) is painted in the product of its inks' colours inside a clip to
  the other ink's dots, and black last; the whole is clipped to the
  picture's frame. The seed only picks the built-in picture.
- **Solving:** nothing to solve: a design to display.
- **Guarantees:** deterministic; every dot covers its cell's tone within
  0.4% (line screens within a few percent where a sharp edge forces a
  neighbour, exact on average), reported per ink as `mean_tone`,
  `mean_coverage` and `worst_cell_error`, and checked in tests both from
  the geometry and by rasterising the page; all ink inside the margins; the
  separation prints back to the picture's colour exactly under ideal inks.
  Meta records the source picture, ruling, cell size and lines per inch,
  each screen's ink and angle, and the formulas. `colorable: false` — a
  halftone has no outlined regions to colour.
