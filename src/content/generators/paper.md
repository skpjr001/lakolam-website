---
title: "Paper"
blurb: "Specialty paper — lined, graph, dot, isometric, hex, polar, music, handwriting, calligraphy, Cornell, engineering, perspective"
category: design
version: "1.0.0"
---
Specialty printable paper, ruled to the exact spacing you ask for — lined,
graph, dot grid, isometric, hex, polar, music staff, handwriting,
calligraphy, Cornell notes, engineering and perspective.

## What it is

A blank page with a pattern to write, draw or plan on. Thirteen rulings:

- **Lined** — college (9/32 in), wide (11/32 in) or narrow (1/4 in) ruled,
  with an optional margin line.
- **Graph** — a square grid with a heavier line every few squares.
- **Dot grid** — dots at the corners of a square grid, for bullet journals
  and sketching.
- **Isometric** and **isometric dot** — a triangle grid (vertical lines and
  lines at 30 degrees) for 3D sketches, or just its dots.
- **Hex** — a honeycomb, for maps, games and chemistry.
- **Polar** — concentric circles and spokes, for radial designs and plots.
- **Music** — five-line staves, with bar lines at each end.
- **Handwriting** — primary ruling: a top line, a dashed midline and a
  baseline, with space for descenders.
- **Calligraphy** — ascender, waist, base and descender lines, with slanted
  guides at the angle you choose.
- **Cornell notes** — a header for topic and date, a cue column, a notes
  column and a summary box, all ruled.
- **Engineering** — a fine grid under a header strip of three boxes.
- **Perspective** — a horizon line, a vanishing point, rays to the edges and
  a faint grid.

## How to use it

Print the page at actual size (turn off "fit to page" in the print dialog)
and the spacing is exactly what it says: five-millimetre dots are five
millimetres apart. Lined, handwriting and Cornell pages are for writing;
graph, dot and engineering pages for charts, plans and bullet journals;
isometric and perspective pages for drawing in three dimensions; hex and
polar pages for maps, games and circular designs; music pages for writing
melodies. The lines are a light grey, so your own marks stand out, and many
pages can be bound into a notebook or journal.

## Purpose

The paper people actually buy in pads and notebooks, as a printable page.
Graph, dot and lined notebooks are among the best-selling low-content books,
and teachers print handwriting, Cornell and music paper by the ream. In a
book, paper sections turn the builder into a notebook and journal maker —
alone, or mixed with puzzle sections.

## History

Ruled writing paper goes back to the scribes' dry-point ruling of
manuscripts; machine-ruled paper arrived in the 18th century. Graph paper
appeared in the 1790s, when engineers and statisticians began plotting
data; the Cornell note-taking system was devised by Walter Pauk at Cornell
University in the 1950s; the dot grid was popularised by the Bullet Journal
in the 2010s. Music staff paper has been printed since the 16th century.

## This implementation

- **Spec knobs:** `kind` (lined, graph, dot, isometric, isometric_dot, hex,
  polar, music, handwriting, calligraphy, cornell, engineering, perspective),
  `page` (letter, legal, a4, a5, six_by_nine, seven_by_ten, square) and
  `landscape`, or an explicit `page_width` / `page_height` in points; `unit`
  (in, mm, pt) for `spacing` (0 picks the kind's standard) and `margin`;
  `ruling` (college, wide, narrow) for lined and Cornell paper; line `weight`
  in points; `shade` (0 black to 240 very light grey); `major` (heavier line
  every n squares or rings, 0 none); and per kind `margin_line`, `staves`
  (0 fits as many as the page holds), `spokes`, `slant` (degrees from
  horizontal) and `horizon` (fraction of the page from the top). Spacing
  means the gap between lines, the dot pitch, the triangle or hexagon side,
  the ring step, the gap between staff lines, the handwriting line gap and
  the calligraphy x-height.
- **Generation:** each lattice is `origin + k * spacing`, never stretched to
  fill the page: as many whole steps as fit, centred in the content area.
  Graph and engineering grids are cut to whole blocks of `major` squares so
  the heavy lines frame the page. Lines of one weight and shade are drawn as
  one path, so a full page of dots stays small.
- **Solving:** nothing to solve — a page for writing and drawing. The seed is
  unused; every seed gives the same sheet.
- **Guarantees:** deterministic; the spacing is exact (tests measure every
  line, dot, ring and staff gap against the request, in every unit); all
  ink, stroke widths and dot radii included, stays inside the margins on
  every page size, portrait and landscape; isometric neighbours and hexagon
  sides are exactly one spacing long.
