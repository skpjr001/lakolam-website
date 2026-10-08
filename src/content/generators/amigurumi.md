---
title: "Amigurumi Shapes"
blurb: "Amigurumi shape patterns — balls, eggs, capsules, cylinders, cones and bowls sized from gauge, written round by round in US or UK terms with staggered increases and a scale profile; every printed round read back and recounted"
category: design
version: "1.0.0"
---
Round-by-round crochet patterns for the basic amigurumi shapes, sized from
your gauge, with staggered increases so the shapes come out round.

## What it is

A written single-crochet pattern for one of six basic shapes: a ball, an
egg, a capsule (a tube with round ends), a cylinder with flat ends, a cone
worked from its tip, or an open bowl. Every round is listed in standard
shorthand, such as `RND 6: SC 2, INC, (SC 3, INC) ×5, SC 1 [30]`, with the
stitch count after it. Runs of plain rounds are merged, as in
`RND 12-15: SC 48 [48]`. Beside the notes on gauge, abbreviations, stuffing
and finishing is a profile of the shape drawn to scale, with a line for
every round and the finished width and height. Patterns can be written in
US terms (single crochet, SC) or UK terms (double crochet, DC).

These are the building blocks of most amigurumi: heads and bodies are
balls and eggs, arms and legs are capsules, hats and noses are cones, and
cups and ears are bowls.

## How to use it

Check your gauge first: crochet a small flat piece in single crochet with
the yarn and hook you plan to use, and count the stitches and rows in an
inch. The pattern is sized for the gauge printed at the top. More stitches
to the inch makes a smaller shape.

Start with a magic ring and work the first round into it. Then work in a
continuous spiral without joining. Put a stitch marker in the first stitch
of each round and move it up as you go. Each round lists what to do across
the stitches of the round below. SC 3 means one stitch in each of the next
three. INC means two stitches in the next stitch. DEC means crochet the
next two stitches together. A group in brackets followed by ×5 is worked
five times. The number in square brackets is the count you should have at
the end of the round. BLO means work that round in the back loops only,
which turns a sharp edge for a flat base or top.

Stuff the shape firmly at the round the notes give, before the opening gets
small. For a closed shape, fasten off after the last round, thread the tail
through the front loops of the last round, and pull it closed.

## Purpose

Two things make an amigurumi pattern hard to trust: arithmetic and shape.
A round that says [30] must really make thirty stitches from the round
below, and use every stitch of that round exactly once. Increases worked in
the same place round after round stack into ridges, which turn a ball into
a hexagon. Every pattern here is read back from the exact text printed on
the page. Each repeat is expanded, and each round's stitches are recounted
against the round below. The increase and decrease positions are found
again from the text and checked: none sits directly above one in the round
below, except where a round changes so many stitches that there is no room
to move. The counts are also checked against the shape's real
circumference at every round, and the rounds must cover the profile from
one end to the other.

## History

Amigurumi, from the Japanese ami (crocheted or knitted) and nuigurumi
(stuffed doll), grew from Japanese craft books of the 1970s and 1980s and
spread worldwide in the 2000s through blogs, Etsy and pattern books. Its
technique is simple and consistent: tight single crochet worked in a
continuous spiral from a magic ring, so no stuffing shows through. The
crocheter's rule of six increases per round for a flat circle and a sphere
is standard teaching. Staggering those increases, by moving each round's
first increase along, is the well-known fix for the hexagonal look of
balls made by naive patterns.

## This implementation

- **Spec knobs:** `shape` (auto, ball, egg, capsule, cylinder, cone,
  bowl), `terms` (us, uk), `diameter` (1–8 in), `tall` (1–12 in; ignored
  by a ball, at least the diameter for a capsule, at most the diameter for
  a bowl), `stitches_per_inch` (3–8), `rounds_per_inch` (3–8, and kept
  between 0.8 and 1.6 times the stitches per inch), `width`, `height`
  (page, 144–3000 pt). Clamped values are reported as `requested_*`.
- **Generation:** the shape is a profile (radius against height) from the
  starting pole. The magic ring of six sits where the circumference holds
  six stitches. Further rounds are laid one round height apart along the
  surface, not straight up, to the closing pole (or the open rim), and the
  spacing is adjusted slightly so the last round lands exactly. Each
  round's count is 2πr divided by the stitch width, rounded to a multiple
  of six, and never more than double or less than half the round below.
  Changes are spread evenly. Every turn of the spread is scored by its
  distance from the changes of the last round of the same kind, and the
  seed picks among the best. A round whose stretch of profile contains a
  corner of 45° or more is worked in back loops.
- **Solving:** nothing to solve; it is a design.
- **Guarantees:** deterministic per seed. `verification:
  printed_rounds_parsed_and_recounted_stagger_and_profile_checked`. Every
  printed line is parsed back, and the rounds must run 1, 2, 3… with none
  missing. Each round must use every stitch below exactly once (DEC takes
  two, INC and SC one) and make its printed count (INC makes two). No
  change may sit within half a stitch of a change of the same kind in the
  previous changing round, unless either round changes two thirds or more
  of the stitches it works into. Every count must be within three stitches
  of 2πr / stitch width, or held at the most a round can grow or shrink.
  The number of rounds must match the profile's length within half a
  round. Tests recount every printed round with a second, independent
  reader that expands repeats by text substitution. They check the ball's
  classic 6, 12, 18… 48 and its symmetry, the cylinder's two back-loop
  corners and the open bowl, that the first increase moves between rounds,
  that a stacked pattern is refused, and that hand-broken text, a wrong
  gauge or a wrong round height are caught. They also show that every
  option changes the page and sweep every boundary for a finite page
  inside its bounds.
