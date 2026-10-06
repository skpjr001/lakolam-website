---
title: "Cosmati"
blurb: "Cosmatesque pavements: tessellated roundels, guilloche bands and opus sectile panels"
category: design
version: "1.0.0"
---
Cosmatesque pavements: great stone roundels ringed with tiny triangles,
tied together by white marble bands, set in fields of geometric inlay.

## What it is

A page in the manner of the inlaid marble floors of medieval Rome. Discs of
red porphyry or green serpentine sit at the centre of roundels, each ringed
with bands of small triangles, diamonds or checks that wrap round the
circle and grow toward its rim. White ribbons frame every roundel and run
along the tangents from one roundel to the next, the way the bands of a
quincunx link a central wheel to four smaller ones. Around them, squares of
inlay — diamonds in squares, triangles, checks and triangles divided again
and again — fill the floor. Layouts: a quincunx, one great wheel, a chain of
roundels, or framed panels.

## How to use it

Print it in colour as a decorative panel, a tile design or a book cover. As
a colouring page, choose three or four stone colours — a deep red, a green,
a gold and white — and keep each band to two of them, alternating round the
ring; colour the ribbons white or cream so they read as one continuous
band. The bands' pieces grow larger toward the outside of each ring, so
start colouring from the outer edge.

## Purpose

The rings of a Cosmati roundel are a beautiful piece of mathematics: a
straight strip of triangles wrapped round a circle so that every piece keeps
its shape and the ring closes without a seam. Generating them exactly —
and choosing piece counts so even the smallest tessera stays large enough
to print or colour — makes pavements that are both faithful to the craft and
practical on paper.

## History

The Cosmati were families of marble workers in Rome, active from the twelfth
to the fourteenth century; several signed their work with the name Cosmas,
which gave the style its name. They cut porphyry, serpentine and coloured
marble salvaged from ancient Roman buildings into small geometric pieces and
laid them in white marble frames, in the floors of churches such as Santa
Maria in Cosmedin and San Clemente in Rome and, by the hands of Roman
craftsmen, in the Great Pavement of Westminster Abbey (1268). The roundels
called rotae and the five-roundel quincunx are their signature
compositions. Ron Pomerantz described, at the Bridges conference in 2023,
how the bands of a rota can be read as a strip tiling mapped round the
circle by the exponential map, which is the construction used here.

## This implementation

- **Spec knobs:** `width`, `height`, `margin`, `layout` (auto, quincunx,
  rota, chain, panels), `palette` (marble, faded), `line_art`, `stroke`.
- **Generation:** a band from radius r_in to r_out is a strip of
  triangles, diamonds or checks on x from ln r_in to ln r_out, periodic in
  y with period 2π/n, mapped by (x, y) → (eˣ cos y, eˣ sin y). The map is
  conformal, so tiles keep their angles, and because n periods make exactly
  2π the band closes with no seam. Rows are tried from three down to one,
  and n is the multiple of four nearest to near-regular tiles, coarsened
  until the smallest tessera (at the inner rim, where areas scale by r_in²)
  clears the floor — 18 pt² in colour, the adult colouring floor in line
  art; a band too narrow even for eight tiles in one row is laid as a plain
  stone ring. Links between roundels are ribbons along the outer common
  tangents, with diamonds on the link's axis and triangles either side.
  Opus sectile cells (square in square, four triangles, three-by-three
  checks, Sierpinski triangles subdivided while the pieces clear the floor)
  are bookmatched across the page's centre line. In line art, background
  pieces that would pass under a roundel or a link are left out, since an
  outline cannot hide what lies beneath it.
- **Solving:** nothing to solve — a design.
- **Guarantees:** deterministic per seed. Tested: every band's tiles sum to
  the annulus area (within 0.2%), lie within it, and close the ring; n is a
  multiple of four; every layout is mirror-symmetric about the page's
  centre line, mark for mark; every tessera clears the floor in colour and
  in line art (`tesserae_clear_floor` in the metadata); line art passes the
  adult colourability check; only palette inks are used.
