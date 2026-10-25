---
title: "Orb Webs"
blurb: "An orb web built in the spider's own order — frame, radii, hub, capture spiral with turnbacks — with dew, stabilimentum and twigs"
category: design
version: "1.0.0"
---
A garden spider's web, built thread by thread in the order the spider
builds it, hung between twigs and beaded with dew.

## What it is

An orb web is the wheel-shaped web of garden spiders. It is built in a
fixed order every time: a bridge line across the gap, a Y-shaped thread
whose centre becomes the hub, a frame of straight threads all round, then
the spokes (radii), a few tight turns at the hub to lock them, and last the
sticky capture spiral, laid from the outside inward. The hub of a real web
sits above the middle, so the lower half is bigger; to fill it, the spider
swings back and forth in loops called turnbacks before it can go all the
way round. Each page draws a different web with all of these parts, as
straight lines between the points the spider actually touches.

Options add the zig-zag silk bands (stabilimenta) that *Argiope* spiders
weave at the hub, dew drops strung along the sticky spiral, a torn sector,
the spider herself, and a faint scaffold spiral the spider lays first and
later removes.

## How to use it

- **Frame it.** The night-blue and orange versions are made to hang - the
  orange one is ready for Halloween.
- **Plot it or ink it.** Every thread is a straight line, so a pen plotter
  draws it exactly; the black version also suits fine-liner tracing.
- **Find the building order.** Look for the frame, the spokes, the tight
  hub spiral, the clear ring around it (the free zone, where the spider
  slips from one side to the other), and the capture spiral. Where do the
  turnbacks reverse? Why are there more rows below the hub?
- **Count.** How many spokes? How many frame threads? Does every spoke
  reach the frame?

## Purpose

Spider webs are among the finest structures any animal builds, and they
hide a clear sequence of steps. Showing a web as it is really built makes a
nature lesson out of a decoration, and makes a plotter drawing that is true
to the animal.

## History

The construction sequence of orb webs was described in detail by
naturalists from the 19th century on and studied closely in the 20th: Hans
Peters filmed garden spiders building in the 1930s, and Peter Witt's work
from the 1950s (including the famous drugged-spider experiments) made web
geometry a measurable behaviour. Fritz Vollrath and others have since
studied the hub's position, the turnbacks of the lower web and the
capture spiral's spacing. The beads of glue and dew on the spiral form
because a thin film of liquid on a thread is unstable and breaks into
drops, as Joseph Plateau and Lord Rayleigh explained in the 19th century.

## This implementation

- **Spec knobs:** `radii` (8-64), `turns` (capture rows along the longest
  radius, 8-80), `asymmetry` (0-1, how far above the frame's centre the hub
  sits), `frame_sides` (3-8, 0 = picked by the seed), `temporary_spiral`,
  `stabilimentum` (`none` default, `linear`, `cross`), `dew` (on by
  default), `torn`, `spider`, `twigs` (`branch` default, `frame`, `none`,
  `auto`), `palette` (`midnight` default, `dawn`, `pumpkin`, `ink`),
  `line`, `width`, `height`, `margin`.
- **Generation:** twigs are tapered cubic ribbons across the top and down
  one or both sides, a grass stem from below and leafy side shoots (or
  laths for `frame`), all clipped to the picture. The frame is the convex
  hull of seeded corners round the centre, stretched to the page's shape;
  its top edge is the bridge. The hub rises from the frame's centroid by
  `asymmetry × 0.45` of the way to the bridge. The first three radii are the
  arms of the Y (two up toward the bridge, one down); each further radius
  bisects the widest angular gap (with a little jitter). A radius that would
  meet the frame at under 25 degrees makes the spider cut the nearest
  corner with a secondary frame thread first (up to eight times). Each
  frame corner is moored to the nearest twig point outside the frame's
  interior angle, or straight out to the picture's edge. The hub spiral
  makes 3-5 turns; the free zone follows; the capture spiral starts on the
  longest radius just inside the frame and steps radius to radius, each
  step a chord, its distance shrinking by `spacing(d) × gap / 2π` with
  spacing narrowing toward the hub; when the next radius is too short it
  turns back one row in; when neither neighbour can hold the row it walks
  inward along the radius and starts a new piece. Dew beads alternate big
  drops and small satellites along each chord. A torn sector breaks a run
  of radii and drops their capture chords.
- **Solving:** Nothing to solve.
- **Guarantees:** every capture segment joins two adjacent radii, stays
  inside the frame and crosses no radius; the frame is convex and contains
  the hub; every radius is laid before the capture spiral, and the
  construction log in meta is in the spider's order (anchors, bridge,
  proto-hub, frame, secondary frames, radii, hub spiral, temporary spiral,
  capture spiral, free zone); with any asymmetry the hub is above the
  frame's centroid and there are turnbacks; deterministic per seed; ink
  inside the page. `verification: capture_chords_join_adjacent_radii`.
  Clamped `radii`, `turns`, `frame_sides` and `asymmetry` are reported as
  `requested_*`.
