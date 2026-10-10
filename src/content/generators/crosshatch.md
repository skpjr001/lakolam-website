---
title: "Cross-Hatching"
blurb: "A picture (an upload or a built-in silhouette) drawn in pen and ink: layered cross-hatching, swelling engraved lines that bend with the form, or contour lines of its darkness"
category: design
version: "1.0.0"
---
Your picture drawn in pen and ink: layers of crossing strokes, engraved lines
that swell into shadow, or the contour lines of a map.

## What it is

A page that draws a picture the way an illustrator or an engraver would,
with nothing but lines. Upload a photo or drawing (or use one of the
built-in silhouettes, which are shaded as if lit from the upper left) and
choose how the tone is built:

- **Layers** — classic cross-hatching. The lightest tones get one set of
  parallel strokes; darker tones add a second set crossing the first, then a
  third and a fourth at the angles between, so the shadows are a dense mesh
  and the highlights bare paper.
- **Engraving** — the look of a copperplate print. Long lines run across the
  picture, bending gently over its form, and swell from hairlines in the
  light to thick ribbons in the shadows, with crossing lines in the darkest
  parts.
- **Contour** — lines of equal darkness, like the contour lines on a
  walking map, with the darker levels drawn heavier, so the picture becomes
  a landscape of hills and hollows.

Each comes in black ink or in one coloured ink: sepia, indigo, sanguine,
viridian, Prussian blue or violet.

## How to use it

Choose a picture with clear light and shadow: a face lit from one side, a
pet in sunshine, a building against the sky. Flat, evenly lit photos give
flat, even hatching. Hold the page at arm's length and the lines merge into
greys; come close and every stroke shows.

Wider spacing and a heavier line give a bold, woodcut feel; close spacing
and a fine line give a delicate etching. Fewer layers keep the drawing
light and open. If you draw with a pen plotter, the layers style with
joined strokes keeps the pen down for long zigzags.

This is a drawing to frame or display, not a colouring page: the tone is
made of open strokes, not closed shapes to fill.

## Purpose

To show how a picture's tone can be carried by lines alone, the problem
every pen-and-ink artist, engraver and pen plotter has to solve. Laying the
layers one at a time makes the method visible: each family of strokes adds
a step of darkness. It also turns a photo into a print that looks drawn by
hand.

## History

Hatching and cross-hatching are as old as engraving itself: the copper
engravings of Albrecht Dürer, such as *Melencolia I* (1514), build every
tone from crossing lines, and Hendrick Goltzius in the 1580s and 1590s made
the swelling line, thick in shadow and thin in light, the signature of the
engraver's burin. Claude Mellan's *Sudarium of Saint Veronica* (1649) drew a
whole face with a single spiralling line that swells and thins. Line
engraving carried pictures in books, newspapers and on banknotes until
photographic halftones replaced it at the end of the nineteenth century.
Contour lines come from mapmaking: Edmond Halley joined points of equal
magnetic variation in 1701, Philippe Buache drew depth contours of the
English Channel in 1752, and Charles Hutton used lines of equal height to
survey Schiehallion in 1774.

Computers took up pen and ink in the 1990s. Georges Winkenbach and David
Salesin ("Computer-Generated Pen-and-Ink Illustration", SIGGRAPH 1994)
introduced prioritised stroke textures, in which strokes are added in order
of priority until a tone is reached; the layers here are the simplest such
texture. Michael Salisbury and colleagues built interactive and image-based
pen-and-ink systems (SIGGRAPH 1994 and "Orientable Textures for Image-Based
Pen-and-Ink Illustration", SIGGRAPH 1997). Yachin Pnueli and Alfred
Bruckstein's DigiDurer (1994) and Victor Ostromoukhov's "Digital Facial
Engraving" (SIGGRAPH 1999) imitated the engraver's swelling, bending lines;
Oliver Deussen and Thomas Strothotte drew trees in pen and ink (SIGGRAPH
2000). Long joined strokes became important again with the hobby pen
plotters of the 2010s, where every lift of the pen costs time.

## This implementation

- **Spec knobs:** `image` (a PNG or JPEG as a data URL or base64; empty uses
  a built-in silhouette chosen by the seed), `mode` (layers, engraving,
  contour), `style` (line, colour), `ink` (sepia, indigo, sanguine,
  viridian, prussian, violet; colour style only), `width` and `height`
  (144-2000 pt), `margin` (0-144 pt, at most a third of the shorter side),
  `stroke` (0.2-3 pt; in engraving the finest hairline), `outline` (draw the
  picture's half-darkness edge at 1.5 times the stroke). Layers and
  engraving: `spacing` (1.5-20 pt between lines of one family), `angle`
  (0-180 degrees, the first family), `cross_angle` (10-90 degrees: the
  families sit at angle + 0, 90, 45, 135, 22.5, 112.5 degrees scaled by
  cross_angle / 90), `layers` (1-6 families). Layers: `connect`. Contour:
  `levels` (3-40). Engraving: `bend` (0-1), `waviness` (0-1). Out-of-range
  numbers are clamped and reported as `requested_<field>`.
- **Generation:** the picture is decoded at most 320 px on its longer side
  and stretched so its lightest pixel is paper and its darkest full ink. A
  built-in silhouette is shaded as a lit relief: a chamfer distance
  transform gives each inside pixel its distance from the edge, the height
  rises along a quarter circle over a rim of 7% of the picture or 60% of the
  deepest distance (whichever is wider), and Lambert light from the upper
  left turns slopes into tone (lit 0.16, facing away 1). The picture keeps
  its aspect, fitted inside the margins less the stroke. *Layers:* layer i
  of n is a family of parallel lines `spacing` apart, offset by a seeded
  phase, inked where the darkness exceeds 0.08 + 0.84 i / n (sampled every
  0.75 pt, crossings interpolated, gaps under half a spacing bridged, runs
  under half a spacing or 1 pt dropped). Runs are ordered greedily for the pen
  (the next run is the one with an end nearest the pen, found through a
  bucket grid, drawn from that end), and with `connect` each is joined to the next by a pen-down connector when
  it starts within 1.5 spacings, or within 2.5 spacings with the connector
  staying in the layer's tone. In colour style the lighter families are the
  ink thinned up to 30% toward white.
  *Engraving:* each line point q moves along the lines' normal by
  A sin(2 pi (q . u) / L + phi) + B h(q), where h is the picture's height
  (the relief for a silhouette, a blurred darkness for an upload),
  L = 0.4 of the shorter frame side, A = 0.035 x
  `waviness` of that side and B = `bend` times the largest bend that keeps
  neighbouring lines at least 0.3 spacing apart (capped at 8% of the side).
  The width is 0.85 x local spacing x c, c = (d - t) / (1 - t) for the
  family's threshold t (0.03 for the first family, 0.4-0.8 for crossing
  ones), at least the stroke, and no ink where it would be under half the
  stroke; ribbons are filled outlines simplified to 0.05 pt. *Contour:* the
  darkness, lightly blurred, is cut at levels j / (levels + 1) by marching
  squares at one sample per picture pixel; a line's weight is
  stroke x (0.5 + 1.5 level); on a silhouette the lines keep about two
  pixels inside its edge so they do not pile up there. The seed picks the
  silhouette and the phases of the families.
- **Solving:** nothing to solve — a design to display.
- **Guarantees:** deterministic per picture, spec and seed; meta records the
  source (`upload` with its pixel size and an FNV-1a hash, or the silhouette
  id and its shading), each family's angle, phase and threshold, the
  formula, and for layers the strokes, runs, drawn length and pen-up travel.
  Tested: on flat greys from white to black the rasterised ink coverage
  never falls and white stays white (layers and engraving); layer i appears
  exactly once the darkness passes its threshold; joining strokes keeps
  every run, cuts the stroke count by more than three times and pen-up
  travel by at least 30%; engraving ribbons are wider over the dark end of a
  ramp and the bend never brings neighbouring lines closer than 0.3 spacing;
  contour weights rise with level; all ink lies inside the margins.
  **Not a colouring page:** hatching and engraving make tone from open
  strokes, so meta says `colorable: false` with a note; contour line art is
  run through the adult colourability check and meta reports its verdict
  (usually a fail: level lines crowd into slivers). A picture that is not a
  PNG or JPEG, or too large, is refused with a clear message, as is a flat
  picture in contour mode, which has no level lines.
