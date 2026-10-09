---
title: "Anamorphic Art"
blurb: "Anamorphic art — cylinder-mirror pictures, a drawing grid and 3D trick drawings, every mapping checked by tracing rays back"
category: design
version: "1.0.0"
---
Pictures that only look right from one place: a smudge round a circle that
turns into a smiling face in a mirrored tube, and drawings that seem to
stand up out of the paper.

## What it is

An anamorphosis is a deliberately distorted picture that comes right when
you look at it in a special way. **Cylinder mirror** pages bend a picture —
a smiling face, a heart, a star, a fish or a word — into a curved band round
a circle. Stand a mirrored cylinder on the circle and look into it, and the
picture appears in the mirror, upright and in proportion. **Grid** pages give
a square grid and its curved twin, cell for cell, so you can draw your own.
**3D trick drawings** show a box, a tower or a pit that looks flat and
stretched on the page, but seen with one eye from the marked spot it seems
to stand on the table or sink into it.

## How to use it

**Cylinder mirror:** you need a mirrored tube the size printed on the page —
mirror card or mirror film rolled round a tube, or a polished can. Stand it
on the grey circle. Sit at the bottom edge of the page, about as far away and
as high up as the page says, and look into the mirror, not at the paper.
The picture appears on the tube.

**Grid:** draw a simple picture in the small square grid. Then copy it onto
the curved grid one cell at a time: the cell in column C, row 4 of the
square grid goes into the cell marked C and 4 on the curved grid. Columns
run round the circle and rows run outwards, with row 1 farthest from the
mirror. Colour it in, stand the mirror on the circle and look.

**3D trick drawing:** lay the page on a table and sit at its bottom edge.
Close one eye and put your open eye at the height and distance the page
gives from the red cross (a ruler and a stack of books help). The drawing
stands up off the page. A photo taken from the same spot works too.

## Purpose

Anamorphosis is geometry you can see: light travels in straight lines and
bounces off a mirror at equal angles, and those two rules are enough to
work out every curve on the page. Drawing on the grid teaches mapping one
shape onto another, and the trick drawings show how perspective works — the
same principle used for 3D street art and for the words painted on roads,
which are stretched so drivers can read them.

## History

Anamorphic drawing began in the Renaissance: Leonardo da Vinci sketched
stretched faces around 1485, and Hans Holbein hid a stretched skull in his
painting *The Ambassadors* in 1533. Mirror anamorphoses, read in a polished
cylinder or cone, were fashionable curiosities in the 17th and 18th
centuries, and in recent decades pavement artists have made the oblique
kind famous with chalk drawings that seem to open holes in the street.

## This implementation

- **Spec knobs:** `kind` (`cylinder`, `grid`, `oblique`); `picture`
  (`smile`, `heart`, `star`, `fish`, `word`; cylinder only); `text` (the
  word, up to 8 characters the font can draw); `solid` (`cube`, `tower`,
  `hole`; oblique only); `mirror_diameter_cm` (2–12; cylinder and grid);
  `look` (`colour`, `outline`); `page`; `margin` (inches, 0.1–1).
  Out-of-range values are clamped and recorded as `requested_*`; characters
  the font cannot draw are dropped and listed in `dropped_characters`, and
  an empty word falls back to HELLO.
- **Generation:** cylinder pages place the eye at a distance and height set
  by the mirror's size, and map each picture point to a point on the
  cylinder (bearing and height), then reflect the eye's ray there off the
  cylinder's surface down to the page. The band the picture occupies is
  shrunk until the warped picture and the mirror's circle fit the page, and
  the picture is letterboxed to keep its proportions as seen. Outlines are
  subdivided finely before mapping so curves stay smooth. Oblique pages
  project the solid's corners from the eye onto the page, drop the faces
  turned away from the eye, turn the solid a seeded 20–40 degrees so two
  sides show, and clip a pit's inside to its opening. The seed picks the
  colours, the picture's details (a wink, the star's points, the fish's
  direction) and the solid's turn.
- **Solving:** nothing to solve.
- **Guarantees:** `mapping_checked`. Cylinder and grid: drawn points are
  traced back from the page by Fermat's principle — the point on the
  cylinder that makes the path from the eye to the mirror to that page point
  shortest, found by a grid search and golden-section searches, independent
  of the reflection formula used to draw — and must be the picture point
  that was drawn there, within 0.2 mm as seen on the mirror; nothing is
  drawn under the mirror. The tests also check the law of reflection at the
  mirror directly and that the picture is not mirrored left to right.
  Oblique: points along every drawn edge, traced as rays from the page back
  to the eye, pass through the solid's 3D edge (distance under 1e-6 cm,
  found by a separate search). `points_traced` and `worst_error_mm` are
  reported. The effect needs the eye in the stated place; the mirror size
  and the minimum mirror height are printed on the page.
