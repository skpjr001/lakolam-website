---
title: "Space-Filling Curves"
blurb: "Space-filling and fractal curves as one continuous line (Hilbert, Moore, Peano, Gosper, Sierpinski, Z-order, dragon, Levy C, Koch), with rounded Truchet turns, colour gradients, and a fill mode where a picture sets the curve's depth"
category: design
version: "1.0.0"
---
One unbroken line that wanders into every corner of the page: Hilbert,
Moore, Peano, the Gosper flowsnake, Sierpinski's curves, the dragon, the
Levy C and the Koch snowflake, drawn sharp or with rounded turns, in black
or in colour, or bent to the shape of a picture.

## What it is

A space-filling curve is a line folded so tightly, step after step, that in
the limit it passes through every point of a square. Each step of the
recipe replaces every piece of the line with a smaller, folded copy of the
whole; after a few steps the line already covers the page in an even maze of
turns, and it never crosses itself. Its fractal cousins — the dragon, the
Levy C, the Koch snowflake, the Sierpinski arrowhead — are made the same way
but grow into famous shapes instead of filling a square.

The page shows one such curve, as a single line from start to finish:

- **Hilbert**, **Peano** and **Z-order** fill a square from one corner;
  **Moore** joins four Hilbert curves into a loop, and the **Sierpinski
  curve** is a loop through ever-smaller triangles;
- **Gosper's flowsnake** fills a ragged hexagonal island;
- the **arrowhead** traces Sierpinski's triangle, the **dragon** and the
  **Levy C** fold into their crinkled shapes, and the **Koch snowflake** and
  **anti-snowflake** are closed loops with bumps out or in.

Turns can be rounded into arcs that meet in the middle of each step, so the
square curves become flowing chains of quarter circles, like Truchet tiles.
In fill mode a picture decides how finely the curve folds: it crowds tightly
where the picture is dark and opens into wide loops where it is light, so the
picture appears in one continuous line.

## How to use it

Display it, trace it, or colour it. To trace, put a finger on one end and
follow the line all the way to the other without lifting: it never crosses
itself. The closed loops (Moore, the Sierpinski curve and both snowflakes)
divide the page into an inside and an outside; colour the inside one shade
and the outside another and the fractal edge between them stands out. Try
the colour style for a print that changes hue from the start of the line to
its end, and fill mode with a photo of a face, a pet or a logo: step back
from the page and the picture appears.

## Purpose

To make a famous idea visible. A line has no width, yet these curves come
as close as you like to covering a whole square; the page shows the first
few steps, which is where the idea becomes believable. The same orderings
are used every day by computers to keep nearby points of a map or an image
close together in memory. The pages are also striking line art, and in fill
mode a family photo or a logo becomes a one-line portrait.

## History

Giuseppe Peano published the first curve that fills a square in 1890 ("Sur
une courbe, qui remplit toute une aire plane", *Mathematische Annalen* 36),
as an analytic formula with no picture. David Hilbert gave the simpler,
geometric construction by repeated quartering, with the first drawings, the
next year ("Über die stetige Abbildung einer Linie auf ein Flächenstück",
*Mathematische Annalen* 38, 1891). E. H. Moore studied variants, among them
the closed version now named after him, in "On certain crinkly curves"
(*Transactions of the American Mathematical Society* 1, 1900). Waclaw
Sierpinski gave his closed curve in 1912 and the triangle traced by the
arrowhead curve in 1915.

Helge von Koch's snowflake (1904, *Arkiv för Matematik*) was built as a curve
with no tangent anywhere. Ernesto Cesàro (1906) and Paul Lévy (1938, *Journal
de l'École Polytechnique*) studied the C curve that bears Lévy's name. The
dragon was found by NASA physicists John Heighway, Bruce Banks and William
Harter, and made famous by Martin Gardner's *Scientific American* column in
1967; Bill Gosper's flowsnake reached Gardner's column in December 1976.
Benoit Mandelbrot's *The Fractal Geometry of Nature* (1982) gathered them all
as fractals.

Z-order is Guy Morton's 1966 IBM ordering for a geodetic database, the
"Morton code" of databases and graphics. Drawing these curves with a turtle
from rewriting rules follows Aristid Lindenmayer's L-systems (1968) as
applied to drawing by Przemyslaw Prusinkiewicz (1986). The rounded turns echo
the tiles of Sébastien Truchet (1704) in the quarter-circle form Cyril
Stanley Smith popularised in *Leonardo* (1987), and letting a picture set the
curve's depth follows Luiz Velho and Jonas Gomes, "Digital halftoning with
space filling curves" (SIGGRAPH 1991).

## This implementation

- **Spec knobs:** `curve` (auto — the seed picks — hilbert, moore, peano,
  gosper, sierpinski, arrowhead, z_order, dragon, levy, koch, anti_koch),
  `order` (0-16; 0 picks the curve's best order; each curve has its own
  ceiling, from 5 for Peano and Gosper to 16 for the dragon and Levy C, and a
  larger value is clamped and reported as `requested_order`), `rounded`,
  `fill`, `image` (a PNG or JPEG data URL or base64; empty uses a built-in
  silhouette chosen by the seed; an upload switches fill on), `style` (line,
  colour), `palette` (sunset, ocean, forest, berry, rainbow, ink_blue; colour
  style only), `width`, `height` (144-2000 pt), `margin` (0-144 pt),
  `stroke` (0.3-4 pt). Out-of-range numbers are clamped and reported as
  `requested_<field>`.
- **Generation:** Hilbert, Moore, Peano, Z-order and the Sierpinski curve are
  built by recursive subdivision of a square (or of its two triangles) into
  oriented blocks; the line joins the centres of the leaf blocks in traversal
  order. The other six are L-systems rewritten `order` times and walked by a
  turtle with unit steps. The seed picks the curve (when `auto`) and one of
  the eight symmetries of the square; the curve's bounding box is fitted,
  centred, into the page less its margins and half the stroke. Rounded turns
  cut back half the shorter neighbouring step and draw a circular arc. In fill
  mode a block splits while some child's mean darkness asks for a deeper
  level, from three levels (two for Peano) below `order` on white paper to
  `order` itself on full ink; the curves that cannot follow a picture are
  drawn as Hilbert and say so (`requested_curve`). Colour style cuts the path
  into 128 runs coloured along the palette from start to end.
- **Solving:** nothing to solve; a design to colour, trace or display.
- **Guarantees:** deterministic for a spec and seed; one continuous path;
  the uniform Hilbert curve of order n visits each of the 4^n cells exactly
  once in unit steps (tested against the classical index-to-cell map), Moore
  and Peano visit every cell once stepping to an edge neighbour, the closed
  curves close with an ordinary step, and in fill mode consecutive leaves are
  neighbours. All ink lies inside the margins. Meta records the curve, its
  order, construction rule, symmetry, fit and fill levels — enough to rebuild
  the page — with `colorable` true only for the closed curves in line style
  that pass the adult colouring check (stroke at least 0.75 pt, ink coverage
  under 55%); the open curves are honestly marked not colourable (one line
  with no enclosed region). `rating_basis` is "none: a design to colour or
  display".
