---
title: "Truss Bridge"
blurb: "Truss bridge plans for craft sticks or straws — true-size templates and exact member forces, determinacy and rigidity checked"
category: design
version: "1.0.0"
---
Plans for a craft-stick or straw truss bridge: true-size templates, a stick count, and the exact force in every member.

## What it is

A build plan for a model bridge made of two matching side trusses joined
by cross ties. You can choose a Pratt, Howe, Warren or K truss, with 2 to
12 panels, made from craft sticks, jumbo craft sticks or drinking straws.

The first page shows the side view, coloured by how a load at the joints
travels through it. Blue members are pulled (tension), red members are
pushed (compression), and grey members carry nothing. A thicker line
means a bigger force. A table lists every member with its cut length,
how many sticks it uses, and its force.

The worksheet page asks you to find those forces yourself, and an answer
key follows it. The last pages are true-size templates to build on.

## How to use it

Print the template pages at 100%, with no "fit to page". Check the scale
bar on the first one with a ruler; it must measure exactly 2 inches. Tape
the strips together, laying each strip's grey band under the strip before
it, so the joint dots line up. Cover the template with baking paper or
cling film. Then glue the sticks along the outlines: first the bottom
chord, then the top chord, then the posts and diagonals. Each member is
one stick, cut to the length in the table. Chords are as many layers
thick as the plan says, so glue the extra layers on top with the joins
staggered.

Build a second side the same way. When both are dry, stand them up and
glue a cross tie at every top and bottom joint. Test the bridge by
hanging a load from the middle of the bottom chord. Add weight slowly,
over a soft landing.

**The worksheet.** The load P hangs where the arrow shows. First find
the two support reactions: the reactions add up to the load, and the
turning effects about one support balance. Then go joint by joint. At
each joint, the pulls and pushes of the members, the load and any
support add up to nothing, across and up-down. A diagonal of a 3-4-5
triangle carries 3/5 of its force across and 4/5 of it up. Start at a
joint with only two unknown members. Write each force as a fraction of
P: + for a pull, - for a push.

## Purpose

A model bridge is a classic science-fair and technology project. The
plan explains why trusses work: triangles cannot change shape, so the
load is carried as pure pulls and pushes along the members. It also
shows how the patterns differ. In a Pratt truss the diagonals hang in
tension. In a Howe truss they push. A Warren truss has no verticals at
all. The worksheet is the method of joints from school physics and
engineering, with numbers that come out as exact fractions.

## History

Trusses carried the railways across North America in the 1800s. William
Howe patented his timber-and-iron truss in 1840. Thomas and Caleb Pratt
patented the reverse arrangement in 1844, which suited all-iron bridges.
James Warren and Willoughby Monzani patented the equilateral Warren
truss in 1848. The K truss, with each vertical split by a pair of short
diagonals, came later for long, deep spans. Craft-stick bridge contests
have been a staple of school and university engineering for decades.

## This implementation

- **Spec knobs:** `kind` (`pratt`, `howe`, `warren`, `k`); `panels`
  (2-12, even; K needs at least 4); `material` (`popsicle` 4.5 × 3/8 in,
  `jumbo` 6 × 3/4 in, `straw` 7.75 × 1/4 in); `load` (`centre`, `spread`
  for a load at every inner bottom joint, or `point` for a load at a
  seeded bottom joint); `chord_layers` (1-4); `worksheet` (add the
  worksheet and its answer key); `page`; `margin` (inches, 0.1-1). Out of
  range or odd values are moved into range and recorded as `requested_*`.
- **Generation:** joints sit on whole-number coordinates. Panel shapes
  come from a Pythagorean triple chosen by the seed, from 3-4-5 to 48-55-73.
  The K truss pairs a triple for its half-panels with another for its
  end panels (8-6-10 with 9-12-15, for example). This makes every member
  length a whole number of units, and every direction cosine an exact
  fraction. The reactions come from overall equilibrium. Member forces
  come from the method of joints in exact rational arithmetic: the
  generator repeatedly takes a joint with at most two unknown members and
  solves its two equations. The scale is set so the longest member is 95%
  of one stick. Templates are drawn at true size, split into strips that
  overlap by half an inch, and stacked on as few pages as fit. The seed
  also picks the colour theme.
- **Solving:** the worksheet's answers are the solved forces. The answer
  key is the worksheet with every force filled in and coloured.
- **Guarantees:** `statics_checked`. Maxwell's count m + r = 2j holds.
  The square equilibrium matrix has full rank, computed exactly modulo
  the prime 2^61 − 1, so the truss is rigid and statically determinate
  and the forces are unique. Every joint balances exactly. Every vertical
  section between joints balances in x, y and moment (the method of
  sections). Every member is cut from one stick.

  Tests solve the whole system again by floating-point Gaussian
  elimination and agree to 1e-9. They also check a hand-worked Warren
  truss, and that removing any single member makes the truss a mechanism.
  Under a deck load they check that chords and diagonals take the signs
  engineers expect (Pratt diagonals in tension, Howe in compression) and
  that the forces are mirror-symmetric.

  Forces are given per unit load. The plan never claims a breaking load:
  that depends on the glue, the sticks and buckling, which a statics
  model cannot see.
