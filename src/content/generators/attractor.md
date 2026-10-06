---
title: "Strange Attractors"
blurb: "Strange attractors — Lorenz, Aizawa, Thomas, Halvorsen and Rössler flows through a seeded camera, and de Jong and Clifford flow fields, as plotter strokes"
category: design
version: "1.0.0"
---
The shape of chaos: the Lorenz butterfly and its cousins, drawn as one long
unbroken line, or as swirling flow fields from two famous maps.

## What it is

A strange attractor is the shape a chaotic system settles onto. Follow a
point through the Lorenz equations, a simple model of air rolling in a
heated layer, and it never repeats and never escapes: it loops around one
wing of a butterfly, then the other, forever, tracing a figure of endless
fine layers. Five such systems are drawn here as a single path seen through
a camera turned a little differently for every page:

- **Lorenz** - the butterfly.
- **Aizawa** - a sphere pierced by a twisting tube, like an apple core.
- **Thomas** - a looping, three-way symmetric labyrinth.
- **Halvorsen** - three folded lobes, like a propeller.
- **Rossler** - a flat spiral band with one fold.

Each can also be drawn as hundreds of short strokes that start all around
the attractor and sweep in toward it, like comet trails.

Two more come from simple step-by-step rules on the plane, named for Peter
de Jong and Clifford Pickover. Every point of the page is sent somewhere
else by the rule, and the direction it is sent becomes a current. The page
shows that current as evenly spaced flowing lines, with whirlpools and
long sweeping streams.

## How to use it

These are prints for the wall and drawings for a pen plotter. Every page is
made of long, smooth strokes and nothing else, so a plotter draws it in one
calm pass, and the black ink version prints crisply on any printer. Try a
gel pen on dark paper, or a fine brush pen for the flow fields. The colour
versions shade each part of a flow by its distance from the eye, near parts
dark and far parts pale, so the shape reads as solid. Pin several pages of
one system side by side and the series shows the same shape from different
angles. These pages are not meant for colouring in.

## Purpose

Strange attractors are among the best-loved images of mathematics, and
popular plotter art. Done badly they become a cloud of a hundred thousand
dots, too heavy for a printer and impossible for a plotter. Here they are
exact strokes, simplified to a fixed tolerance and held to a fixed point
budget, so every page is light, sharp at any size and drawable.

## History

Edward Lorenz found his system in 1963 while simplifying a weather model,
and noticed that tiny changes in the starting point grew into completely
different weather: the butterfly effect. Otto Rossler designed his simpler
attractor in 1976. Rene Thomas proposed his cyclically symmetric system in
1999, Arne Halvorsen's appears in Sprott's catalogues, and Yoji Aizawa's
torus-like flow became a favourite of digital artists. Peter de Jong's and
Clifford Pickover's maps were popularised in Scientific American and in
Pickover's books in the 1980s and 1990s. Evenly spaced streamlines follow
the method of Bruno Jobard and Wilfrid Lefer (1997).

## This implementation

- **Spec knobs:** `system` (`lorenz` default, `aizawa`, `thomas`,
  `halvorsen`, `rossler`, `de_jong`, `clifford`), `trace` (`line` default:
  one long trajectory; `traces`: many short ones, flows only), `palette`
  (`ocean` default, `ember`, `violet`, `ink` for black only), `detail`
  (0.05-1, default 0.6: integration length, trace count or streamline
  density), `line` (stroke width), `frame`, `width`, `height`, `margin`.
- **Generation:** flows are integrated with classical fourth-order
  Runge-Kutta at a fixed step per system (Lorenz s=10, r=28, b=8/3; Aizawa
  a=0.95, b=0.7, c=0.6, d=3.5, e=0.25, f=0.1; Thomas b=0.18; Halvorsen
  a=1.4; Rossler a=b=0.2, c=5.7) from a seeded start near the attractor,
  after a discarded transient. Short traces start uniformly in the
  attractor's bounding box grown by a fifth, and are cut off if they leave
  it by more than half again. A seeded camera turns away from each system's
  classic view (yaw within 0.6 rad, pitch within 0.35 rad, roll within 0.25
  rad) with mild perspective, and the projection is fitted to the frame.
  Long trajectories are cut into pieces of 120 steps, painted far to near
  and shaded by mean depth. Maps: the de Jong or Clifford image `T(p)` of
  each point of a box of half-height pi is read as the velocity at `p`, and
  streamlines are laid Jobard-Lefer style: candidate seeds on a jittered
  grid in seeded order, a line starting only a full separation from all
  others and stopping at half of it, at a fold, or at the frame; stubs
  shorter than two separations are dropped. Lines are shaded by heading.
  Every stroke is simplified by Ramer-Douglas-Peucker at 0.12 pt.
- **Solving:** nothing to solve. This is a design.
- **Guarantees (tested):** deterministic per seed, and seeds differ. RK4
  converges at fourth order on every flow (halving the step cuts the error
  10-24 times). The Lorenz field vanishes at its three equilibria. Every
  flow stays bounded and keeps moving over its whole budget. Every drawn
  point lies inside the frame, flows are fitted to touch two opposite sides,
  and every page stays within 60,000 path points (`point_budget`; farthest
  strokes are dropped first if ever needed). Streamlines keep at least half
  their separation from one another, checked by brute force. Simplification
  stays within its tolerance. The ink palette is black strokes only. Every
  system at full detail generates in well under a second. Meta reports the
  integrator, step, camera, map parameters, stroke and point counts, and ink
  length in metres; `colorable` is false, as these pages are line drawings,
  not colouring pages.
