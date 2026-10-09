---
title: "Paper Dice"
blurb: "Paper dice d4–d20 with balanced numbering, and non-transitive Efron, Grime and Miwin sets with exact win chances"
category: design
version: "1.0.0"
---
Cut, fold and glue your own dice: the six classic shapes from d4 to d20,
numbered the way good dice are, or a set of non-transitive dice where every
die has another that beats it.

## What it is

Nets of dice to print on card: the four-sided d4 (a tetrahedron), the d6
cube, the d8 octahedron, the ten-sided d10 (a pentagonal trapezohedron, made
of kites), the d12 dodecahedron and the d20 icosahedron. Print the whole set
on one page or one die as large as the page allows. Faces can show numbers,
dots (on cube dice) or nothing, for your own letters, words or pictures.

Three sets are famous puzzles in probability: **Efron's dice** (four cubes),
**Grime dice** (five) and **Miwin's dice** (three, numbered 1 to 9). Each set
goes round in a circle: A usually beats B, B usually beats C, and so on —
and the last usually beats the first. A table on the page gives the exact
chance for every pair.

## How to use it

Print on card (160–220 g/m²). Cut round the outside along the solid lines,
keeping the grey tabs. Crease every dashed line, folding away from the
printed side, then fold the die up and glue each tab under the edge it
meets. Glue the last few faces with the die held closed; a pencil tip pushed
through the last gap helps press the tabs.

- **d4:** each face shows three numbers, one by each corner. Roll it and
  read the number at the top corner: it is the same on all three faces you
  can see.
- **The other dice:** read the face on top. On the bigger dice the 6 and the
  9 are underlined so you can tell them apart.
- **Non-transitive dice:** two players each choose a die — the second player
  chooses after seeing the first player's choice — and both roll; the higher
  number wins. Whatever die the first player takes, the second can pick one
  that wins more often than it loses. Play ten rounds and see. The table
  shows each chance as a count out of 36, the number of ways two cubes can
  land.

## Purpose

Making dice turns nets into something useful, and a homemade set is cheap
for classroom games. Non-transitive dice are a memorable lesson in
probability: "better than" does not have to be transitive, and counting all
36 pairs of faces shows why. Comparing the dice before and after playing
also shows how long a run of games it takes for chance to even out.

## History

Dice are among the oldest gaming pieces: cubes thousands of years old have
been found across Asia and Europe, and twenty-sided dice survive from Roman
Egypt. Bradley Efron, a statistician at Stanford, devised his four
non-transitive dice, and Martin Gardner made them famous in Scientific
American in 1970. Michael Winkelmann designed Miwin's dice in
1975, and the mathematician James Grime designed his set around 2010, with
the extra twist that one of its two cycles turns round when each player
rolls two dice of a colour.

## This implementation

- **Spec knobs:** `set` (`polyhedral`, `single`, `efron`, `grime`,
  `miwin`); `sides` (`d4`, `d6`, `d8`, `d10`, `d12`, `d20`; single only);
  `faces` (`numbers`, `pips`, `blank`; pips need cube dice, elsewhere
  numbers are printed and `requested_faces` recorded); `look` (`colour`,
  `outline`); `page`; `margin` (inches, 0.1–1, clamped and recorded as
  `requested_margin`).
- **Generation:** each die is the convex hull of its corners (the d10's
  ring height makes its kites flat), all scaled to the same corner sphere.
  Nets come from a search over spanning trees of the faces — breadth- and
  depth-first from every face, two flowers where they cover the solid, and a
  fixed set of random trees — keeping the largest net with no overlapping
  faces and one glue tab per seam overlapping nothing; the nets are then
  shelf-packed at one common scale. Numbers: opposite faces sum to n + 1.
  The d8 and d12 try every such numbering and the seed picks among the most
  even; the d20 uses a local search until every corner sums to 52 or 53.
  The d4 numbers its corners, printed on each face by its corner. Set dice
  take their known faces in a seeded order. The seed also picks the
  colours.
- **Solving:** nothing to solve.
- **Guarantees:** `dice_checked`. Every net is folded back up in 3D, hinge
  by hinge, and must close into its solid — every edge met by exactly one
  other, convex, Euler characteristic 2, the solid's own volume — with
  exactly one glue tab per seam. On the folded die (corners and normals from
  the fold, not from the model) the numbers are 1 to n once each, faces
  with opposite normals sum to n + 1, and the d8, d12 and d20 corner sums
  are as even as possible: the least unevenness over every numbering with
  opposite sums n + 1, counted exhaustively for the d8 and d12 (a perfectly
  even d8 or d12 is impossible), and for the d20 the lower bound itself.
  The d4's three faces at each corner all print that corner's number. For
  the non-transitive sets every printed chance is an exact count over all
  36 pairs of faces, and every die beats the next one round each cycle
  (Efron 24/36 each; Miwin 17/36 against 16/36; Grime's two cycles).
