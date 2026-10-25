---
title: "Jellyfish"
blurb: "Jellyfish in the manner of Haeckel's plates — translucent bells in perspective with canals, gonads, lappets, frilled oral arms and tentacles drifting in a current"
category: design
version: "1.0.0"
---
Translucent jellyfish in the manner of Ernst Haeckel's great plates —
bell, canals, gonads, frilled arms and a curtain of tentacles drifting in
the current.

## What it is

A jellyfish (a medusa) is a bell of jelly with a mouth hanging beneath it.
Through the clear bell you can see its plumbing: canals running out from
the stomach like the spokes of a wheel to a ring canal round the margin,
and the gonads, often four of them, glowing in colour. Round the margin
hang tentacles; from the centre hang the frilled oral arms. The body is
built on four: four gonads, four (or eight) arms, canals in multiples of
four.

Each page draws a medusa in perspective. A **moon jelly** has four
horseshoe-shaped gonads and a fringe of short tentacles; a **compass
jelly** has brown V marks like a compass rose and long tentacles and arms;
a **lion's mane** trails eight great clusters of tentacles from a lobed
bell; a **rhizostome** has no tentacles, only eight thick frilly arms. A
**plate** shows three different medusae together, one seen from above.

## How to use it

- **Frame it.** The deep-blue version glows like an aquarium at night; the
  cream version is made in the spirit of a nineteenth-century plate.
- **Count by fours.** Count the gonads, the arms and the canals. Look at
  the jellyfish from above: turn it a quarter turn and nothing changes.
- **Follow the current.** All the tentacles drift the same way and ripple
  together. Which way is the water flowing?
- **Colour it.** The black-and-white version is a colouring page; colour
  the gonads first, then the arms.

## Purpose

Jellyfish are among the oldest animals and the most beautiful; drawing them
true to their four-fold body plan turns a decoration into a small lesson in
how they are built.

## History

Ernst Haeckel described and drew hundreds of medusae in *Das System der
Medusen* (1879–1881) and in *Kunstformen der Natur* (1899–1904), whose plate
of discomedusae — with *Desmonema*, named after his late wife — is among
the most famous scientific illustrations ever made. The radial canals,
ring canal and four-part symmetry of scyphozoan jellyfish (moon jelly
*Aurelia*, compass jelly *Chrysaora*, lion's mane *Cyanea*, rhizostomes
such as *Rhizostoma*) are standard zoology. This page is not a copy of any
plate: the construction is ours.

## This implementation

- **Spec knobs:** `kind` (`compass` default, `moon`, `lions_mane`,
  `rhizostome`, `plate`, `auto`), `view` (`side` default, `top`; a plate
  always shows one from above), `canals` (radial canals per quarter, 1-16),
  `tentacles` (relative to the kind's usual number, 0-3), `current` (0-1),
  `palette` (`abyss` default, `haeckel`, `ink`), `line`, `width`, `height`,
  `margin`.
- **Generation:** the bell is a surface of revolution whose profile is a
  superellipse quadrant (`r = cos φ^(2/n)`, `z = H·sin φ^(2/n)`), its margin
  cut into lappets that reach out and hang down; it is meshed and painted
  far to near with a perspective camera (seeded azimuth, a little above
  the bell, fitted to the page), each face tinted thinly over the ground
  by its lighting so what lies inside shows through. Canals (dichotomously
  branched for the moon and lion's mane, a three-level network for the
  rhizostome, straight for the compass jelly), four horseshoe gonads and
  the compass jelly's sixteen V marks are laid out in the top view for one
  quarter and turned by 90° three times, then lifted onto the bell by
  bisection on its profile. Oral arms are twisting ribbons from the
  manubrium, their edges rippled by a sine. Tentacles leave the margin
  (the lion's mane's in eight clusters under the lobes) and sink steadily,
  pulled sideways by one seeded current that grows with depth and rippled
  by a travelling wave they share, each a little out of phase. Tentacles
  behind the bell are drawn first and dimmer; the rim and the outline
  (edges between faces turned toward and away from the viewer) last.
- **Solving:** Nothing to solve.
- **Guarantees:** canals, gonads and marks are exactly four-fold in the top
  view (every point turned a quarter lands on another); four gonads and
  four times `canals` radial canals; every tentacle sinks all the way and
  stays below the bell's lowest margin, so it never crosses the bell;
  deterministic per seed; all ink inside the page.
  `verification: tentacles_below_the_bell`. Clamped `canals`, `tentacles`,
  `current` and `line` are reported as `requested_*`.
