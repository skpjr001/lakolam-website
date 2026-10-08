---
title: "Black Box"
blurb: "Black Box — find the hidden atoms from the hits, reflections and detours of rays fired into the box"
category: puzzle
version: "1.0.0"
---
Rays of light go into a sealed box. Work out where the atoms hiding inside are from where the rays come out.

## What it is

A square box hides a stated number of atoms, at most one in each cell.
Around the edge, each port shows what happened to a ray fired in there: **H**
if an atom absorbed it, **R** if it came back out of the port it went in, and
a number if it came out somewhere else. The same number marks the port where
it left. Exactly one set of atoms gives every result.

## How to play

Mark the cells that hold an atom. A ray travels in a straight line, cell by
cell, and obeys three rules:

- **Hit:** if the next cell straight ahead holds an atom, the ray stops there
  (H).
- **Turn:** if an atom sits diagonally ahead, to one side of the next cell,
  the ray turns 90 degrees away from it before moving on. If atoms sit
  diagonally ahead on *both* sides, the ray turns right round and heads back
  the way it came.
- **Edge reflection:** if an atom sits on the edge of the box diagonally
  beside the cell a ray enters through, the ray bounces straight back (R)
  without going in.

A ray can turn many times. If it ends up leaving through the port it came
in by, the result is R. Numbers come in pairs: a ray fired in at either end
of a pair comes out of the other end.

Look first at rays that come out directly opposite where they went in. If
such a ray ran straight, its own line and the lines beside it hold no atoms.
An H often means an atom on the ray's first line, unless something turned the
ray first. An edge reflection points to an atom in one of the two edge cells
beside the entry. On harder pages some ports are grey and give no result.

## Purpose

A deduction page unlike the grid-filling genres: the clues are *experiments*
and the solver reasons backwards from their results to hidden causes. It
rewards careful tracing more than pattern spotting, and the rule set is small
enough to print on one line under the box.

## History

Black Box was invented by Eric Solomon. It was published as a board game in
the late 1970s by Waddingtons in Britain and Parker Brothers in the United
States. Players took turns firing rays at the box an opponent had filled.
The solitaire version shows every ray's result at once. It lives on in Simon
Tatham's puzzle collection, in GNU Emacs (`M-x blackbox`), and in Andrea
Gilbert's clickmazes.

## This implementation

- **Spec knobs:** `difficulty` (sets the box and atom count when they are
  null: kids 6×6 with 2 atoms, easy 8×8 with 3, medium 8×8 with 4, hard 8×8
  with 5, expert 10×10 with 6), `size` (5–10), `atoms` (1–8), `thin` (print
  only the ray results uniqueness needs), `cell`, `line`.
- **Generation:** atoms are placed at random and every port's ray is
  traced. The set is kept only when an exhaustive count finds no other set of
  that many atoms giving the same results. With `thin`, whole rays (both
  ends of a pair together) are hidden in random order while the count stays
  at one. When a box cannot hold the requested atoms uniquely, the count is
  lowered one at a time and the request is reported.
- **Solving:** the count is driven by the rays. Each printed ray is traced
  through the decided cells until it looks at an undecided cell. The search
  branches on that cell, and a finished ray with the wrong result ends the
  branch. When every printed ray has finished, the atoms left over can sit in
  any cell no ray looked at, so those completions are counted with a
  binomial. The count is capped at 2, and a search that spends its node budget
  counts as ambiguous, never unique.
- **Guarantees:** deterministic per seed. Every printed result is the
  traced outcome of the answer's atoms, and the answer is the only set of
  that many atoms that gives them all. Tests check the tracer against a second
  tracer written independently. They also check uniqueness by brute force
  over every atom set on boxes up to 8×8 with 4 atoms, thinned ones included.
  The page is rated by atom count (`rating_basis: atoms_and_rays_shown`). A
  6×6 or smaller box with 4 or more atoms counts one band harder, and so
  does a thinned page. Every band is reachable from the defaults.
