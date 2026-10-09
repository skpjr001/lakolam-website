---
title: "Heraldry"
blurb: "Heraldry — fictional coats of arms with their blazons, in colour, Petra Sancta hatching or to colour; the rule of tincture checked on the drawing and every blazon read back to the same arms"
category: design
version: "1.0.0"
---
Coats of arms with their blazons: a shield, its colours and its shapes,
and the old one-line language that describes them exactly.

## What it is

A page of made-up coats of arms, each drawn on a shield with its blazon
written underneath. A coat of arms is built in layers. The **field** is
the background, in one tincture or divided into two: per pale (down the
middle), per fess (across), per bend (diagonally), per bend sinister, per
chevron, per saltire, quarterly or gyronny (eight wedges). On it may lie
an **ordinary**, a bold band or shape: a chief across the top, a fess
across the middle, a pale down it, a bend, a chevron, a cross, a saltire,
a pile (a wedge from the top) or a bordure (a border). Edges can be
straight, wavy, embattled (like battlements), indented (zigzag) or
engrailed (scalloped). Smaller **charges** stand on the field or on the
ordinary: roundels, mullets (stars), lozenges, billets (oblongs),
annulets (rings) and crescents.

There are seven **tinctures**: two metals, or (gold) and argent (silver),
and five colours, gules (red), azure (blue), vert (green), purpure
(purple) and sable (black).

Pages come in four looks: **colour**; **hatched**, in the black-and-white
lines heralds use; **tricked**, outlines with each tincture's letter
written in; and **colouring**, outlines to colour from the blazon. There
are also two worksheets: **read the blazon** (blank shields under their
blazons, with the arms on the answer page) and **design your own** (blank
shields with a faint suggested layout to colour as you like, and a line
to write your blazon). The
shield can be the classic heater, French, a lozenge or a roundel.

These are invented arms, not any family's arms.

## How to use it

Read a blazon from left to right. It names the field first, then the
ordinary, then the charges, each followed by its tincture: "AZURE, A
CHEVRON OR BETWEEN THREE MULLETS ARGENT" is a blue shield with a gold
chevron and three silver stars around it. A few rules help:

- **Dexter and sinister** are the left and right of the person holding
  the shield, so dexter is on your left as you look at it.
- In a divided field the first tincture named is the dexter or upper
  part. In quarterly and per saltire it takes the first quarter (top
  left) and the one opposite. In gyronny it takes the wedge just left of
  the top of the centre line, and every other wedge round.
- If a shape has no tincture of its own, it takes the next tincture
  named: "A FESS BETWEEN THREE MULLETS GULES" has a red fess.
- **Counterchanged** means a shape takes the opposite tincture of
  whatever lies under each part of it.
- Roundels have their own names by tincture: a bezant is gold, a plate
  silver, a torteau red, a hurt blue, a pomme green, a golpe purple and a
  pellet black.
- Three charges stand two above one unless the blazon says otherwise.
  Four stand two and two, five in saltire (four corners and the
  middle), and six three, two and one.

The **rule of tincture** says never put metal on metal or colour on
colour, so arms can be seen from far away. Every shield here keeps it.

In the **hatched** look each tincture has its own pattern: or is dotted,
argent left plain, gules has upright lines, azure level lines, vert
diagonal lines falling from top left, purpure diagonal lines falling
from top right, and sable crossed lines. In the **tricked** look the
letters are O for or, A for argent, G for gules, B for azure, V for
vert, P for purpure and S for sable.

For a class: give out the read-the-blazon sheet and let pupils draw and
colour the arms, then check against the answer page. Or show a finished
coat of arms and ask them to write its blazon, then design their own and
swap blazons with a partner to draw.

## Purpose

Heraldry is a favourite part of studying castles and the Middle Ages,
and "design your own coat of arms" is a classic classroom activity. The
blazon makes it more than colouring: it is a tiny, exact language, and
reading it is a puzzle in careful reading and drawing. Generated arms
give endless fresh examples that always keep the rules.

## History

Coats of arms appeared on the battlefields and tournaments of
twelfth-century Europe, when knights in helmets needed to be told apart.
Heralds, who announced the knights at tournaments, became the experts,
and the designs became hereditary marks of families, towns and
institutions. Blazon grew out of the Anglo-Norman French the heralds
spoke, which is why the colours are gules, azure and vert. Tricking,
writing the tincture names into a sketch, was how heralds recorded arms
for centuries. In 1638 the Jesuit Silvester Petra Sancta published the
system of hatching that let arms be printed in black and white, and it
is still used today.

## This implementation

- **Spec knobs:** `kind` (`arms` default, `read_the_blazon`,
  `design_your_own`), `look` (`colour` default, `hatched`, `tricked`,
  `colouring`), `shape` (`heater` default, `french`, `lozenge`,
  `roundel`), `shields` (1-12, default 1), `complexity` (`simple`,
  `varied` default, `elaborate`; a design-your-own guide layout is one
  step richer), `key`
  (the tincture key at the foot, default on), `page` (letter, A4, A5,
  6×9, 7×10), `margin` (0.25-1 in), `line` (0.3-3 pt). Out-of-range
  numbers are clamped and reported as `requested_shields`,
  `requested_margin` and `requested_line`.
- **Generation:** each shield draws a field, an ordinary and charges with
  tinctures chosen to keep the rule: on a plain field everything on it
  contrasts with it and charges on an ordinary contrast with the
  ordinary; a divided field is always one metal and one colour, and
  everything on it is counterchanged. Lines of partition go on the
  divisions per pale, fess, bend, bend sinister and chevron and on the
  chief, fess, pale, bend and chevron; the cross, saltire, pile and
  bordure are straight. Chiefs and piles are not put on lozenges or
  roundels. Charges use fixed standard layouts for each count, ordinary
  and placement, drawn in towards the centre on the narrower shields. The
  geometry lives in a 100 × 120 frame: bands are built long and cut to
  the convex shield outline exactly, and engrailed scallops point
  outwards. A draw that fails either check is redrawn (up to 80 draws, in
  practice a few), and arms already on the sheet are not repeated.
  A design-your-own page draws the same kind of arms as faint outlines
  with no tinctures.
- **Solving:** nothing to solve; read-the-blazon answers are the drawn
  arms.
- **Guarantees (tested):** the rule of tincture holds on the drawing:
  the shield is sampled every half unit (cut row by row into exact
  intervals), each sample classified into the region the eye sees there (charges by their exact shapes, then the
  ordinary, then the field), and every two regions within one unit of
  each other pair a metal with a colour. The only exemptions are
  heraldic: field pieces of one tincture meeting at a point, and a
  counterchanged shape meeting the field of its own tincture along the
  division line. The same rule is re-checked from the parsed blazon
  alone. Every blazon is parsed back by an independent reader of the
  grammar to exactly the same arms (thousands of random arms in tests),
  and malformed blazons are refused. The charges seen on the drawing
  match the blazon's count and arrangement, sit wholly inside the shield
  and clear of each other, and every point of the shield lies in a
  field piece. The hatched, tricked and colouring looks are black ink
  only. Deterministic per seed; seeds differ.
- **Caveats:** the grammar is a documented subset of English blazon:
  geometric charges only (no beasts or devotional crosses), one ordinary
  and one group of charges per shield, and no marshalling of several
  coats. Lines of partition are not combined with counterchanging.
