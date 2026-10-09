---
title: "Herugolf"
blurb: "Herugolf — putt every ball into a hole, each shot one cell shorter, over water but never into it"
category: maze
version: "1.0.0"
---
A golf course on graph paper: putt every ball into a hole, each shot one
cell shorter than the last.

## What it is

A square grid with numbered balls, flagged holes and grey water. Each
ball is hit along a row or a column; the number is the length of its
first shot, and every later shot is one cell shorter. The ball may turn
between shots. There are exactly as many holes as balls, and every ball
must finish in a hole of its own.

## How to play

- The number on a ball is the length of its first shot, in cells, along
  a row or a column. Each further shot is one cell shorter: a 3 travels
  3, then 2, then 1 cells. The ball may change direction between shots.
- A ball stops for good when a shot ends on a hole. It does not have to
  use every shot: a 3 may drop into a hole after its first or second
  shot.
- A shot may fly over water, but it may never end on water.
- A ball can never pass over a hole, another ball, or any cell that a
  ball's path (its own included) has already crossed. Paths never touch
  or cross.
- Every hole takes exactly one ball. Draw each shot as an arrow.
- There is exactly one way to sink every ball.

Good places to start: a hole that only one ball can reach belongs to that
ball. A 1 must drop straight into a hole beside it. Shots that would end
on water or run off the course are never possible.

## Purpose

A maze in which the walls are arithmetic: the shrinking shot lengths
limit where each ball can go, and the balls get in each other's way. It
trains planning a few moves ahead and spotting which hole can only be
reached one way. Small courses with only a few balls suit children.

## History

Herugolf (from "hell golf") is a Nikoli genre and is on the publisher's
current list of puzzles; Otto Janko's online archive carries about a
hundred of them. Nikoli's rules forbid a path from crossing a hole,
another ball or another path; Janko's add that a shot may cross water but
not stop in it, and that the last shot need not be a 1.

## This implementation

- **Spec knobs:** `size` (4–10; 0 picks from the difficulty — 5, 6, 7, 8,
  9 from Kids to Expert), `difficulty`, `cell` (18–90 pt), `line`
  (0.2–4 pt). Out-of-range numbers are clamped and the requested value is
  reported in the metadata.
- **Generation:** answer first. Balls are placed one at a time, each with
  a random legal route over cells no earlier route used, and a hole goes
  where the route ends. While a second answer exists, a cell where that
  answer stops (and the real one does not) becomes water. Water the
  band's rung of the ladder does not need is then drained in a seeded
  order. For Medium and up a local search re-lays one ball at a time,
  keeping a change that leaves the course unique and no easier, until the
  ladder needs the band's rung. A few ponds are finally dropped where
  balls fly over, kept only if the rating is unchanged.
- **Solving:** every legal route of every ball is listed up front (a
  route ends at the first hole it lands on and never passes one), and a
  trajectory cover picks one route per ball: no shared cells, one ball
  per hole. The ladder: *single* (a route clashing with a settled one
  goes; a ball with one route left takes it), *area* (a hole only one
  ball can still reach takes it), *overlap* (cells every remaining route
  of a ball uses are its own), *trial* (assume a route, follow the rungs
  below, drop it on a contradiction).
- **Guarantees:** deterministic per seed; exactly one answer, proven by
  the sound ladder settling every ball and confirmed by an exhaustive
  count over the routes capped at two (a spent budget counts as
  ambiguous); tests re-prove it with an independent search that walks
  each ball shot by shot. Rated by the hardest rung the solve needs (meta
  `rating_basis`, `hardest_technique`): single is Easy (Kids on 5×5 or
  smaller), area Medium, overlap Hard, trial Expert. A requested band the
  course does not reach is served as the nearest one and labelled
  honestly beside `requested_difficulty`; small custom sizes tend to come
  out Kids.
