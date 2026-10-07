---
title: "Mirror Maze"
blurb: "Mirror maze — tilt the dotted mirrors so the torch's beam reaches the target, or trace the beam to its exit"
category: maze
version: "1.0.0"
---
A torch, a grid of mirrors and one beam of light: tilt the missing mirrors so
the beam reaches the target — or follow it to see where it comes out.

## What it is

A maze for a beam of light. The torch at the edge shines in; the beam runs in
a straight line and turns a quarter turn whenever it meets a mirror. Black
blocks stop it dead. In the **rotate** form some squares are dotted: each
holds a mirror whose tilt you choose, and exactly one choice of tilts sends
the beam to the target. In the **trace** form every mirror is drawn and the
question is simply where the beam leaves the grid.

## How to play

1. Start at the torch and follow the beam into the grid in a straight line.
2. When it meets a mirror it turns a quarter turn. A mirror like / sends a
   beam travelling right upward, and a beam travelling left downward; a
   mirror like \ sends a beam travelling right downward. Mirrors are shiny
   on both sides.
3. A black block stops the beam.
4. **Rotate:** draw a mirror in every dotted square, tilted / or \, so that
   the beam ends at the target outside the grid. Only one way works.
   **Trace:** follow the beam until it leaves the grid and write down the
   number of that exit.

Tip for rotate: work from both ends. Follow the beam from the torch until it
reaches its first dotted square, and trace backwards from the target too —
the two paths must meet.

## Purpose

It teaches the law of reflection in the most hands-on way: every mirror turns
the beam by a right angle, and which way depends on the tilt. Tracing builds
careful, step-by-step attention; the rotate form adds planning and trial and
error with a definite answer, the same thinking as the popular laser
puzzles used in science and engineering classrooms.

## History

Mirror and laser puzzles appear in children's science activity books and in
puzzle magazines, and became a bestselling physical puzzle in ThinkFun's
*Laser Maze* (2013), where you place mirrors on a grid to guide a laser to
its target. The trace form is the older "where does the light come out?"
exercise found in many STEM workbooks.

## This implementation

- **Spec knobs:** `difficulty` (rotate: 6×6 with 2 mirrors to tilt, 7×7
  with 3, 8×8 with 4, 9×9 with 6, 10×10 with 8; trace: the same grids with
  2–4, 5–7, 8–11, 12–16 and 17 or more reflections), `mode` (`rotate` — the
  default — or `trace`), `size` (0 = the level's; otherwise 5–12), `choices`
  (rotate: 0 = the level's; otherwise 1–12), `blocks` (scatter a few black
  blocks, on by default), `width`, `height`, `line`.
- **Generation:** a random board of mirrors (and blocks) and a torch on a
  random edge square are improved by local search until the beam escapes
  with a reflection count in the band. In rotate mode *k* mirrors the beam
  turns at — each met only once — become the dotted squares, and the exit
  becomes the target. Then only squares the planted beam never touches are
  changed (so the planted answer stays an answer) until no other tilt of
  the dotted squares reaches the target.
- **Solving:** the beam is deterministic: from an edge it can never loop,
  because every step can be run backwards. Rotate mode counts, over all
  2^*k* tilts of the dotted squares, the ones whose beam reaches the target.
- **Guarantees:** trace — the beam is fully determined by the drawn mirrors
  and leaves by exactly one numbered exit (the torch's edge square carries
  no number); rotate — exactly one tilt of the dotted mirrors sends the beam
  to the target (`unique: true`), counted over every tilt by the generator
  and re-proved in tests by an independent search that decides each tilt
  only when the beam first meets its square. A tilt square the beam never
  reaches would make two answers, so every dotted square is used. Rated by
  reflections (trace, `rating_basis: reflections_on_the_beam`) or by the
  number of mirrors to tilt (rotate, `rating_basis: mirrors_to_tilt`). If
  the beam has too few single turns to hold the requested number of dotted
  squares, fewer are used and `requested_choices` records the request. The
  key draws the beam in red, with the tilted mirrors (rotate) or the exit
  number (trace) marked.
