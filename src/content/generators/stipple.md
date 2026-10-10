---
title: "Stipple Portrait"
blurb: "A picture (an upload or a built-in one) as a weighted Voronoi stippling: thousands of dots placed by Lloyd relaxation, black or in the picture's colours, or a mosaic of its Voronoi cells to colour"
category: design
version: "1.0.0"
---
Any picture redrawn as thousands of dots that crowd together in the shadows and thin out in the light, or as a mosaic of cells to colour.

## What it is

Stippling builds a picture from dots alone: no lines, no shading, only how
close together the dots sit and how large they are. This generator takes a
picture you upload (or a built-in one) and places every dot by weighted
Voronoi stippling, the method artists' software uses to imitate a careful pen:
dots are scattered where the picture is dark, then nudged again and again
until each sits at the balance point of the patch of picture nearest to it.
The result is evenly spaced, never clumped, and dense exactly where the
picture is dark.

The same cells can be drawn instead of the dots: a mosaic of closed shapes,
small where the picture is dark and large where it is light, to colour in or
filled with the picture's own colours like stained glass.

## How to use it

Display the dot page as it is: from arm's length the dots blend into the
picture, close up they come apart into a pattern. In colour, each dot takes
the colour of the picture under it, so the page reads like a pointillist
painting.

The mosaic page is for colouring. Every shape is closed. Colour each cell
freely, or follow the picture: the small cells crowd where the picture is
dark, so shading them darker brings the picture back out of the pattern. A
few colours in light and dark versions work well; leave the large outer
cells pale.

## Purpose

- Turn a photo, a pet, a drawing or a logo into display art for framing, a
  card or a poster, in black ink or in its own colours.
- A colouring page made from any picture, where the picture hides in the
  cell sizes and appears as you colour.
- Show how an even spread of points can still carry tone: the same idea as
  halftone printing, without a screen.

## History

Stippling is old: engravers in eighteenth-century France worked plates with
dots and roulettes in the crayon manner, and in the 1770s Francesco Bartolozzi
and William Wynne Ryland made stipple engraving fashionable in London. Pen and
ink stippling remains a standard technique of scientific illustration, and
Georges Seurat's pointillism in the 1880s built colour from dots in the same
spirit.

The geometry comes from elsewhere. Peter Gustav Lejeune Dirichlet (1850) and
Georgy Voronoi (1908) studied the cells a set of points divides the plane
into. Stuart Lloyd, at Bell Labs in 1957 (published 1982, "Least squares
quantization in PCM"), described the iteration this generator runs: move
each point to the centroid of its cell, recompute the cells, repeat. Its
fixed points are centroidal Voronoi tessellations (Du, Faber and Gunzburger,
SIAM Review, 1999).

Oliver Deussen, Stefan Hiller, Kees van Overveld and Thomas Strothotte used
Lloyd's relaxation to place stipples ("Floating Points", Eurographics 2000),
and Adrian Secord made it automatic by weighting each cell's centroid with the
picture's darkness ("Weighted Voronoi Stippling", NPAR 2002) — the method
here. Michael Balzer, Thomas Schlömer and Oliver Deussen later gave every
cell an equal share of ink ("Capacity-Constrained Point Distributions",
SIGGRAPH 2009) to avoid the slight regularity Lloyd's method can leave; this
generator does not use that variant. Craig Kaplan and Robert Bosch threaded
such stipples into one line ("TSP Art", Bridges 2005), which Lakolam's tspart
generator does for built-in subjects.

## This implementation

**Spec knobs.**
- `image` — a PNG or JPEG (data URL or base64). Empty picks one of the
  built-in pictures by the seed. The picture keeps its aspect and is fitted
  inside the margins.
- `mode` — `dots` (default) or `voronoi`, the cell mosaic.
- `style` — `line`: black dots, or black cell outlines to colour; `colour`:
  dots or cells in colour.
- `palette` (colour style) — `picture` (default: each dot or cell takes the
  picture's own colour), or `sunset`, `ocean`, `forest`, `berry`, `rainbow`,
  `ink_blue`, chosen by tone from light to dark.
- `points` (dots, 1000-40000, default 9000), `cells` (voronoi, 50-3000,
  default 250).
- `iterations` (0-100, default 40) — Lloyd passes; 0 keeps the first
  scatter.
- `sizing` (dots) — `darkness` (dots grow with tone, from 0.3 to 1 of full
  size) or `constant`. `dot_size` (0.1-1.5, default 0.75) — the dot width at
  full tone, as a fraction of the dot spacing there.
- `gamma` (0.3-3, default 1) — density follows tone to this power.
  `invert` — place by lightness instead (a negative).
- `width`, `height` (144-2000 pt), `margin` (0-144 pt), `stroke` (voronoi
  outline weight, 0.3-4 pt, default 0.9).
Numbers out of range are clamped and the request is kept in meta as
`requested_<field>`.

**Generation.** The picture is read at 600 px (longest side) in colour; tone
is darkness (1 − Rec. 709 luma), except in colour style with the `picture`
palette, where it is ink (1 − the lightest of red, green and blue) so pale but
vivid colours still get dots (ink is scaled so the most is 1, never
stretched at its light end; darkness is stretched to the full range). Tone is raised to
`gamma` and resampled onto a Lloyd grid sized to about 32 grid pixels per
point over the inked area (160,000 to 2,400,000 pixels). In voronoi mode the
density is 0.25 + 0.75 × tone so light areas still get (larger) cells. The
starting points are drawn by stratified sampling along a Hilbert curve
through the grid — the running total of density is cut into equal strata and
one point is placed at random in each — so the start is already even and
Lloyd's method has no clumps to undo. Each pass assigns every grid pixel to
its nearest point (exactly every eighth pass through a bucket grid, otherwise
among the old owner and its neighbours) and moves each point to the centroid
of its pixels weighted by density squared: a centroidal Voronoi tessellation
places points at a density proportional to the square root of the weight, so
dot density follows tone. Passes stop early when no point moves a hundredth
of a pixel. Dot spacing at full tone is taken from the area each point
covers there (hexagonal packing). Mosaic cells are exact Voronoi polygons of
the final points, clipped to the picture's frame by perpendicular bisectors,
nearest neighbours first; their fill colour is the mean picture colour over
the cell. The seed chooses the built-in picture and the random part of the
starting points; nothing else is random.

**Solving.** Nothing to solve: a design to display or colour.

**Guarantees.**
- The same picture, spec and seed give the same page; six seeds give
  different pages (and different built-in pictures).
- Every dot, with its radius, and every cell lies inside the margins.
- Exactly `points` dots are drawn; mosaic cells tile the frame exactly, and
  every point of a cell is nearer its own site than any other (tested).
- Dot density follows tone: on a white-to-black ramp the dark half holds
  more than twice the dots of the light half (tested).
- Meta records the picture source (built-in subject, or the upload's size and
  hash), grid size, passes run, the last move, the density formula, dot
  spacing and sizes or cell areas.
- The default mosaic (250 cells, line style) is a colouring page: closed
  cells, 0.9 pt outlines, and every cell at least 40 square mm (the adult
  floor), checked per cell; meta's `colorable` says so for each page, and
  says false with a note when more cells make some too small. The dot page
  is display art: it has no regions to colour and says so
  (`colorable: false`).
