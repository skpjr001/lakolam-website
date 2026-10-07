---
title: "Flexagons"
blurb: "Flexagons — printable hexahexaflexagons and trihexaflexagons, every face proven by a folding simulation"
category: design
version: "1.0.0"
---
A folded paper hexagon that turns itself inside out: pinch it, open it,
and a face that was hidden appears — six faces from one strip, every one
checked by simulation.

## What it is

A printable hexaflexagon. The **hexahexaflexagon** folds from a strip of 18
triangles into a hexagon with six faces, three of them hidden at first;
the **trihexaflexagon** folds from 9 triangles and has three faces. Each
face carries its own rosette, printed in six slices on six different
triangles that only come together when that face is showing. The page has
the two-sided strip (front and back printed side by side, to fold
together), the six faces as they will look, and step-by-step folding
instructions. A colouring version prints the rosettes in outline.

## How to use it

1. Cut round the outside line. Fold the strip in half along the long
   dashed line, printed sides outward, and glue the halves flat together.
   Let it dry.
2. Crease every short dashed line firmly, both ways.
3. Lay the strip front up — the side with the circled letters and
   numbers — and keep the first triangle (the one without the tab) still
   while you fold the rest.
4. For the hexahexaflexagon, roll the strip first: fold it over at 1,
   under at 2, over at 3, and so on up to 9, so it becomes half as long.
5. Fold the rest of the strip over at A, then over at B, tucking the end
   under the first triangle so the triangles lie in a hexagon.
6. Fold the grey tab over and glue it to the first triangle.

To flex: pinch two neighbouring triangles together so the hexagon folds
into a three-pointed star, then push the centre open from the other side.
A new face blooms out of the middle. If it will not open, turn to the next
corner and try again. On the hexahexaflexagon, faces 1, 2 and 3 come round
easily; to find 4, 5 and 6 you must sometimes flex from a different
corner.

## Purpose

Flexagons are a hands-on puzzle with real mathematics inside: which faces
can you reach, in what order, and why do the pictures sometimes come back
rearranged? They are a classroom favourite for geometry and symmetry, a
gift that rewards fiddling, and a canvas for designs that only appear
whole at one moment of the flex.

## History

Arthur H. Stone, a British graduate student at Princeton, discovered the
trihexaflexagon in 1939 while folding strips cut from American letter
paper that was too wide for his English binders. With fellow students
Bryant Tuckerman, Richard Feynman and John Tukey he formed a "flexagon
committee"; Tuckerman found the simple rule for visiting every face (keep
flexing at the same corner until it will not open, then move one corner
on — the Tuckerman traverse), and Feynman worked out a complete theory.
Their work was set aside by the war; Martin Gardner's first "Mathematical
Games" column in *Scientific American* (December 1956) was about
hexaflexagons and made them famous.

## This implementation

- **Spec knobs:** `width`, `height`, `margin`; `kind`
  (`hexahexaflexagon`, `trihexaflexagon`); `style` (`rosettes`,
  `colouring`); `numbers` (each face's number, small, in every slice);
  `labels` (title, face previews, instructions); `line` (cut-line weight).
- **Generation:** the folding is simulated. The strip's triangles are
  folded with real coordinates exactly as the instructions say (for the
  hexahexaflexagon: a roll at every other hinge, then two folds at A and
  B, the second tucked under the first triangle; for the
  trihexaflexagon: the two folds alone), each stack kept as the tree of
  folds that made it. The folded hexagon is then described by which
  triangle lies in which sector, with which corner at the centre, in
  which layer. Every state reachable by pinch flexing — from either side,
  at any corner, in either hand — is found by search: a pinch splits
  alternate stacks at their top fold, turning the upper half over and
  closing the lower half over its neighbour. Sides that show together
  form a face (the hexahexaflexagon has 9 states and 6 faces; the
  trihexaflexagon 3 and 3). Each face's rosette — a seeded six-fold
  design of petals, a star or hexagon, dots and a centre — is printed
  slice by slice: the slice for the sector a side fills when its face
  first shows whole, mapped onto that triangle of the strip so its centre
  corner lands at the hexagon's centre. The seed picks each face's colour
  and design. The page lays the strip lengthwise or across, whichever
  prints it larger.
- **Solving:** nothing to solve — a toy to fold and flex.
- **Guarantees:** every page passes `faces_verified`: the simulation is
  re-run from the instructions against the printed slices; every state
  is checked physically possible (hinged edges meet, every fold turns the
  paper over and every open hinge does not, folds along one edge nest,
  no sheet passes through a fold or crosses another); every view shows
  one face only; and every face has a view where its six slices sit in
  order round the centre with their centre corners in the middle — the
  design whole. Tests confirm the classic counts (3 states and 3 faces,
  9 states and 6 faces), that wrong foldings (closing over instead of
  tucking under, accordion-folding instead of rolling) lose faces or
  cannot flex, that impossible states and misprinted slices are rejected,
  and that the printed art maps back onto each face exactly. In other
  states a face can show its slices rearranged — part of a flexagon's
  charm, and true of any printed flexagon.
