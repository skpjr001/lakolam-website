---
title: "Bauhaus"
blurb: "Bauhaus geometric wall art: pattern grids, balanced compositions and posters"
category: design
version: "1.0.0"
---
Geometric wall art in the Bauhaus and Swiss-modernist manner — pattern
grids, balanced compositions and posters in flat primary colours.

## What it is

Pictures built from the simplest shapes there are: circles and half
circles, quarter circles swinging out of corners, arches, bars, stripes,
triangles and rings, in a handful of flat colours on paper. Three kinds of
page:

- **Grid** — the frame cut into equal squares, each holding one shape: the
  popular "Bauhaus pattern" print. No two neighbouring squares repeat the
  same shape in the same colour.
- **Composition** — a few large shapes placed on the thirds of the frame:
  one dominant shape, a smaller one balancing it on the opposite diagonal, a
  bar cutting across, and a small accent, arranged so the picture feels
  balanced without being symmetrical.
- **Poster** — a composition with a title: a big word in bold capitals,
  either set under the picture or running up its side, and a smaller
  caption line.

Palettes: the classic red, yellow, blue and black on cream; brighter
primaries; mid-century mustard and teal; terracotta and sage; Nordic navy
and blush; and greys.

## How to use it

Print it as wall art: grids suit a square or 8 by 10 frame and make good
sets, since pages from one palette hang well together. Posters take a title
of your own — a name, a place, a date — and turn it into a print for a
room, a gift or an event. Choose the line-art version to colour it
yourself: every shape is a closed outline, so you can fill each one with a
flat colour, keep to three or four colours for the true Bauhaus look, and
leave some shapes the colour of the paper.

## Purpose

Mid-century and Bauhaus geometric art is one of the steadiest sellers in
printable wall art, and it is almost pure rule: a limited vocabulary of
shapes, a strict palette, a grid or a balance of weights. That makes it a
natural fit for exact vector generation — every page crisp at any size,
every colour exactly from its palette.

## History

The Bauhaus school (Weimar 1919, Dessau 1925, Berlin 1932 to 1933) taught
form and colour from first principles: Kandinsky tied the triangle, square
and circle to yellow, red and blue, and Itten, Albers and Moholy-Nagy
drilled students in flat colour and geometric construction. Herbert Bayer
and Joost Schmidt carried it into typography and posters. After the war the
Swiss International Style (Josef Müller-Brockmann, Max Bill) made the grid
and asymmetric balance the language of modern graphic design, and the
mid-century palette of mustard, teal and orange followed it into homes.

## This implementation

- **Spec knobs:** `style` (grid / composition / poster), `width`,
  `height`, `margin`, `cols`, `rows`, `palette` (bauhaus, primary,
  midcentury, terracotta, nordic, mono), `paper` (`#rrggbb`, empty for the
  palette's own), `border`, `line_art`, `stroke`, `title`, `subtitle`
  (empty picks seeded words; text is set in the stroke font's capitals).
- **Generation:** grid cells are the largest square cells that fit
  `cols` by `rows` inside the margins; each takes one of 15 motifs (weighted
  toward quarter and half circles) at one of four quarter-turn rotations,
  with ground, figure and accent colours; a cell is redrawn until it differs
  in motif-and-colour from the cells left of and above it (and, softly, in
  ground colour). Compositions place the dominant shape on a thirds point
  and the counterweight on the opposite one, add an optional ground block
  on a thirds line, an optional corner quarter disc, a dark bar along a
  thirds line or a diagonal, and an accent; a candidate is kept only when
  its visual-weight centroid (area times darkness) sits between 1% and 14%
  of the frame from centre. Posters fit the title to the full width (or the
  full height, rotated) and draw it as heavy strokes.
- **Solving:** nothing to solve — a design.
- **Guarantees:** deterministic per seed. Tested: grid cells are square and
  tile the frame exactly (shared edges, frame edges, areas summing to the
  frame); every grid shape lies inside its cell at every rotation;
  neighbouring cells never repeat motif and colour; composition shapes are
  drawn only inside an explicit clip to the frame; the title block stays
  inside the margins and clear of the art; every paint on the page is one
  of the palette's inks or the paper; line art is black outlines only and
  reports the colourability check; every composition lands in the balance
  band with its anchors on thirds points. Under 5 ms per page.
