---
title: "Linear Programming"
blurb: "Linear programming — constraints and word problems solved by the corner-point method on a grid, unbounded regions at the top level, every corner and optimum re-derived by clipping the plane"
category: maths
version: "1.0.0"
---
Draw the constraints, shade the feasible region and test every corner — each optimum proved to be the only one.

## What it is

A worksheet of two to six linear programming problems, each with its own
grid. A problem gives an objective Z = px + qy to maximise or minimise,
subject to two to four inequalities such as x + 2y <= 12 and to x >= 0,
y >= 0; or it is a word problem — a workshop sharing out its machine
hours between two products for the most profit, or a diet mixing two
foods to supply enough of each nutrient at the least cost — to be turned
into inequalities first. The answers are the corner points of the
feasible region, the best value of Z and where it occurs and, for a
region that runs off to infinity, whether Z has a maximum at all. The
answer key shades the feasible region, marks its corners and writes the
answers (and a word problem's inequalities) in red.

## How to play

- **Formulate (word problems):** let x and y be the two amounts. Each
  limited resource gives an inequality: hours used <= hours available.
  Each nutrient gives an inequality: amount supplied >= amount needed.
  Amounts cannot be negative: x >= 0, y >= 0. Write Z, the profit or the
  cost, as px + qy.
- **Draw each line:** for ax + by = c, find where it meets the axes
  (x = c/a when y = 0, y = c/b when x = 0) and join them.
- **Shade the feasible region:** test a point such as (0, 0) in each
  inequality to see which side of its line is allowed. The feasible
  region is the part allowed by every inequality.
- **Corner points:** these are where the boundary lines cross. Read them
  from the graph, or solve the two lines' equations together.
- **Test every corner:** work out Z at each corner. The largest is the
  maximum and the smallest the minimum.
- **Unbounded regions:** when the region goes on for ever, the minimum
  (with positive p and q) is still at a corner, but Z can grow without
  limit, so there is no maximum.

## Purpose

Linear programming is a whole chapter of NCERT class 12 mathematics
(chapter 12: the corner-point method, manufacturing and diet problems),
appears in Edexcel Decision Mathematics, and is taught in many US
finite-mathematics and Algebra 2 courses. It joins graphing inequalities
to a real decision: the best way to use limited resources.

## History

Leonid Kantorovich formulated linear programming in 1939 to plan
production in Soviet plywood factories; George Dantzig independently
developed it, and the simplex method, in 1947 for US Air Force planning.
George Stigler's 1945 "diet problem" — the cheapest diet meeting
nutritional needs — became a classic test case. Kantorovich shared the
1975 Nobel Memorial Prize in Economics for the work.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed` alternates the two,
  `optimise`, `words`); `count` (2-6, each problem with a grid); `width`
  (300-2000 Pt) and `height` (300-3000 Pt). Out-of-range values are
  clamped and reported in meta as `requested_*`; Kids is served as Easy
  with `requested_difficulty`.
- **Generation:** each line ax + by = c has small positive whole a and b
  and passes through a lattice point. Easy: two <= constraints, a
  two-resource workshop, whole-number corners, maximise, the lines
  already drawn on the grid. Medium: three <= constraints (lines drawn),
  whole-number corners. Hard: two <= and one >= constraint, maximise or
  minimise, corners that may be fractions (denominators up to 6), a
  three-resource workshop, a blank grid. Expert: all >= constraints, so
  the region is unbounded: minimise and say there is no maximum; the
  diet problem. Every constraint must form an edge of the region (none is
  redundant), word problems have whole-number answers, and the optimum
  must be at exactly one corner.
- **Solving:** the corners are the feasible intersections of every pair
  of boundary lines (the axes included), in exact fractions; Z is
  evaluated at each.
- **Guarantees:** the answer is re-derived by a different method: a
  10 000 × 10 000 square is clipped by each half-plane in exact
  arithmetic (Sutherland–Hodgman), its vertices away from the square's
  far edges must be exactly the listed corners, and it is unbounded
  exactly when the clipped polygon reaches those far edges; the optimum
  must be strictly better than every other vertex of the clipped polygon
  (far vertices included), so the objective is never parallel to the
  edge where it is best and a minimum on an unbounded region really is a
  minimum. Tests also scan a fine grid of feasible points and find none
  better. Meta: `answers_checked`, `unique`, `difficulty`, `rating_basis`
  (`question_forms_by_level`), `checked_by` (`half_plane_clipping`).
