---
title: "Himmeli"
blurb: "Himmeli straw ornaments — a cut list and one threading route through every straw, the shortest possible thread"
category: design
version: "1.0.0"
---
Straw ornaments threaded on a single thread: a cut list, and one route through every straw that uses the least thread.

## What it is

A himmeli is a hanging ornament made of straws, threaded together on one
long thread and knotted where the straws meet. This page plans one himmeli.
You can choose a diamond, an octahedron, a bicone, a pyramid, a triple
diamond, an icosahedron, a cuboctahedron lantern, or a chain of two
diamonds. The page has:

- a large drawing with every knot lettered and every straw numbered
- a cut list
- a plan for cutting the pieces from whole straws
- how much thread to buy
- a row of step pictures
- the threading route, one straw at a time

## How to use it

Cut the straws to the lengths in the cut list. The cutting plan shows how
to get the pieces from whole straws with the least waste. Thread a long
needle with the length of thread shown. Leave a tail at knot A, the top.

Follow the route in order. Each line names the two knots the straw joins
and the straw's number. Where the route says TIE, pull the thread tight
so the straws close into a triangle. Then knot it round the joint once
or twice, and carry on. Where it says AGAIN, pass the needle through a
straw that is already threaded. Some shapes need this so the thread can
reach every straw and still finish back at the top. The route uses the
fewest repeats possible. The step pictures show the shape growing: the
straws threaded in each group are red, and the ones not threaded yet are
pale.

The route ends back at A. Tie off there, and make a loop with the tail
to hang the himmeli. Paper straws, natural rye straw, and drinking straws
all work. Wet natural straw first so it does not split.

## Purpose

Making a himmeli is a calm, absorbing craft. It is also a hands-on
lesson in solid geometry: a shape made only of triangles holds firm,
and you can feel the difference. The route itself is a classic puzzle.
Can you trace every edge of a shape in one go? If not, which edges must
you go over twice? Euler answered this for the bridges of Königsberg,
and it is still the best way to plan the thread.

## History

Himmeli are traditional Finnish decorations. Their name comes from the
Swedish *himmel*, meaning sky or heaven. They were made from rye straw
after the harvest and hung above the table at Christmas and midsummer.
Similar straw mobiles were made across the Baltic and Eastern Europe. In
the 1900s, Finnish designers brought the himmeli back. Today it is a
popular modern ornament, made from brass tubes, paper straws and
drinking straws.

## This implementation

- **Spec knobs:** `model` (`diamond`, `octahedron`, `bicone`, `pyramid`,
  `tripyramid`, `icosahedron`, `lantern`, `chain`); `longest_cm` (the
  longest cut straw, 2-40, never more than a whole straw); `straw_cm`
  (whole straw length, 5-60); `tail_cm` (thread for the tail, knots and
  loop, 0-200); `look` (`colour`, `outline`); `page`; `margin` (inches,
  0.1-1). Out-of-range values are clamped and recorded as `requested_*`.
- **Generation:** the model's edge graph is built in model units. Where
  the proportions are free, the seed picks them: for example, apex height
  over ring radius for the diamond, bicone, pyramids and chain. Every
  model has at most three straw lengths. The graph is scaled so the
  longest straw is `longest_cm`. The straws to thread twice are a
  minimum-length T-join of the odd-degree knots (the Chinese postman
  problem). It is found from shortest paths (Floyd–Warshall) and an exact
  bitmask DP matching; no model has more than 12 odd knots. The route is
  an Euler circuit from the top knot over the graph with those straws
  doubled (Hierholzer's algorithm, with neighbours in seeded order).
  Straws are numbered in the order they are first threaded. Pieces are
  packed into whole straws by first-fit decreasing. The seed also picks
  the viewing angle and the straw colours.
- **Solving:** nothing to solve.
- **Guarantees:** `route_checked`. The route is a closed walk from the
  top knot along straws of the model, and every straw is threaded at
  least once. The straws threaded twice correct the parity of exactly the
  odd knots. Their total length equals the cheapest pairing of odd knots
  by shortest paths, recomputed by an independent recursive pairing over
  Bellman–Ford distances. The cut list and cutting plan make every straw
  exactly once, and no pattern overfills a straw. The thread length is
  the walk plus `tail_cm`. Tests check the minimum against a brute-force
  search over every subset of straws for the smaller models. They also
  simulate the needle along the route, and confirm that the Eulerian
  models need no repeats and the icosahedron exactly six. The thread
  figure does not include what the knots take up; that is what the tail
  allowance is for.
