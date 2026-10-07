---
title: "Kin-Kon-Kan"
blurb: "Kin-Kon-Kan — one mirror per room; lettered beams bounce between their pairs"
category: puzzle
version: "1.0.0"
---
One mirror in every room — follow the light from letter to letter.

## What it is

A square grid divided into rooms by thick borders, with pairs of letters
around the outside. Each room hides exactly one diagonal mirror. Light
shone into the grid at a letter travels in a straight line, turns a right
angle at every mirror it meets, and leaves the grid at the other copy of
the same letter. The number beside a letter says how many mirrors the
light bounces off on its way.

## How to play

Draw one diagonal mirror, either / or \, in exactly one cell of every room.
Mirrors reflect on both sides. Shine a light in at a letter: it runs
straight along its row or column, turns a quarter turn at each mirror it
hits, and must come out at the other copy of the same letter after
bouncing off exactly as many mirrors as the number says. A 0 means the
light goes straight across without touching a mirror. Edge positions
without a letter tell you nothing.

Good places to start: a 0 or a 1 (the light can barely turn, so the cells
it crosses are mostly empty), a pair whose letters face each other across
the grid with a small number, and a small room, whose mirror has only a
few places to go. Once a room's mirror is placed, every other cell in that
room is empty, and light passes straight through it.

## Purpose

A puzzle about reflection and paths: every clue is a beam you trace in
your head, and the rooms tie the beams together. It rewards careful
bookkeeping — which cells a beam must cross, where it must turn — and
gives a hands-on feel for how mirrors fold a light path.

## History

Kin-Kon-Kan (キンコンカン) is a Nikoli genre, first published in the
magazine *Puzzle Communication Nikoli*. Its name imitates the sound of
light ringing off mirrors. It is one of the rarer Nikoli genres in print
and has been shown to be NP-complete in its general form.

## This implementation

- **Spec knobs:** `size` (4–10; 0 picks from the difficulty — 5, 6, 7, 7,
  8 from Kids to Expert), `difficulty`, `cell` (18–90 pt), `line`
  (0.2–4 pt).
- **Generation:** rooms of 2–5 cells are grown from cells in random order,
  and a random mirror is planted in each. Light is traced in from every
  point of the edge, giving every pair of edge points it joins and its
  bounce count. With every pair as a clue, a local search re-plants
  mirrors in rooms the ladder leaves open, keeping the change that leaves
  fewest open, until the ladder settles every room at the band's rung.
  Pairs are then removed in random order while it still does; the
  remaining pairs are lettered A, B, C… clockwise from the top-left
  corner.
- **Solving:** each room's open placements (cell and orientation). The
  *beam* rung enumerates, for one clue, every way its light could run
  from letter to letter with the right number of bounces through the
  placements still open, and removes every placement no such run allows
  (a run that grows past a fixed node budget deduces nothing). The *trial*
  rung assumes a placement, runs the beam rung, and removes it on a
  contradiction.
- **Guarantees:** deterministic per seed; exactly one placement of
  mirrors, proven because the sound ladder settles every room, confirmed
  by a capped exhaustive count, and re-proven in tests by an independent
  search that follows the light straight through the settled cells from
  both letters of every pair. Uniqueness forces every mirror to be hit by
  some lettered beam (an unlit mirror could be flipped). Rated by the
  hardest rung needed with size as the tie-break (beam: Kids up to 5×5,
  Easy at 6×6, else Medium; trial: Hard up to 7×7, else Expert). Every
  band is reached at its default size. With a custom `size` the label
  always states the band actually reached: boards of 7×7 and more cannot
  be Kids or Easy (served as Medium), Hard is out of reach from 8×8 up
  (served as Expert, or Medium), and boards under 6×6 rarely need the
  trial rung, so Medium, Hard and Expert there often come out as Kids.
