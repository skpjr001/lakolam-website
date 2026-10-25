---
title: "Reptile and Fish Scales"
blurb: "Reptile and fish skins scale by scale — snake, lizard, crocodile, pangolin, koi — patterned by a lizard-scale automaton, reaction-diffusion, diamonds, rings or blotches"
category: design
version: "1.0.0"
---
Snake, lizard, crocodile, pangolin and koi skins drawn scale by scale,
each scale one colour of the animal's pattern.

## What it is

Scales grow in rows from small bumps in the embryo's skin, packed like
hexagons and stretched along the body, so they follow its curves and shrink
toward the tail. Each page lays such a lattice over a body. A **snake**
crosses the page, its overlapping keeled scales in an odd number of rows so
that one row runs straight down the middle of its back. A **lizard** shows
small bead-like scales, a **crocodile** square ridged plates in rows, a
**pangolin** big pointed shields like an artichoke, and a **fish** round
scales overlapping like roof tiles.

Every scale is coloured as a whole, the way real scale patterns work: the
black-and-green labyrinth of the ocellated lizard, blotches like a
python's, a rattlesnake's diamonds, a coral snake's rings, a crocodile's
crossbands, or a koi's orange, white and black patches.

## How to use it

- **Frame it.** The default snake is made to hang; try the koi or the
  lizard for a bold all-over pattern.
- **Count the rows.** Count the scales across the snake's back: is the
  number odd? Find the single row down the middle.
- **Follow the overlap.** On the snake, pangolin and fish, which way do the
  free edges of the scales point — toward the head or the tail? Why might
  that help an animal moving forward?
- **Colour it.** The black-and-white version is a colouring page; the black
  scales are already filled, so the pattern shows while you colour the rest.

## Purpose

Skin patterns are one of nature's great puzzles: how does each scale know
its colour? The page shows the answer biologists have found — every scale
takes one colour, chosen by talking to its neighbours — and makes a
striking design from it.

## History

Alan Turing (1952) proposed that animal patterns arise from chemicals that
react and spread, and Hans Meinhardt and others developed such
reaction–diffusion models from the 1970s. Liana Manukyan, Michel
Milinkovitch and colleagues (Nature, 2017) showed that the ocellated
lizard's labyrinth is laid down scale by scale, each scale flipping between
green and black according to its neighbours, like a cellular automaton.
Snake scale rows are counted at mid-body by herpetologists and are usually
odd; overlapping (imbricate) scales and the cycloid scales of carp and koi
are described in standard zoology texts.

## This implementation

- **Spec knobs:** `animal` (`snake` default, `lizard`, `crocodile`,
  `pangolin`, `fish`, `auto`), `pattern` (`auto` default — the animal's
  own, varied by the seed — `labyrinth`, `reaction`, `diamonds`, `bands`,
  `blotches`, `plain`), `rows` (scale rows across a snake's back, odd 9-41,
  an even count is raised by one; across the page for other animals, 6-60),
  `keels` (keels, grooves or growth rings; lizard granules are smooth),
  `style` (`colour` default, `ink`), `line`, `width`, `height`, `margin`.
- **Generation:** a body is a centre line with a width tapering from head
  to tail: for the snake a sinusoid across the page whose wave fades at the
  ends, its amplitude reduced until no bend is tighter than 0.55 of the
  body's width (so the inner side never folds), drawn whole on the ground
  with a shadow; for the other animals a gently curving body wider than the
  page, seen as a swatch. Scales sit at `rows` positions across and columns
  along whose spacing is proportional to the local width, alternate columns
  offset half a row (square rows for crocodile scutes). Each scale's local
  outline — rounded rhombus, rounded hexagon, rounded square, pointed
  shield or circle — is mapped through the body coordinates, so it bends
  and tapers with the body. Colours: the labyrinth runs the stochastic
  scale automaton on the scale graph; `reaction` runs an
  activator–inhibitor model on the same graph and thresholds it; diamonds,
  rings, crossbands and koi blotches (soft blobs in page units) are
  computed per scale centre. Overlapping scales are drawn tail first,
  each as one filled, outlined shape; scales are lit as a rounded body.
- **Solving:** Nothing to solve.
- **Guarantees:** one colour per scale (one filled shape per overlapping
  scale); a snake always has an odd row count with a vertebral row down the
  middle; overlapping scales overlap only their lattice neighbours, the
  later-drawn always nearer the head; the snake never bends tighter than
  half its width; the labyrinth's black fraction stays between 0.35 and
  0.65; deterministic per seed; all ink inside the page.
  `verification: one_colour_per_scale`. Clamped `rows` and `line` are
  reported as `requested_*`.
