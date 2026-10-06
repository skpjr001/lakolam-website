---
title: "Straight-Line Graphs"
blurb: "Straight-line graphs worksheet — plot y = mx + c, read gradients, solve simultaneous equations and shade inequalities"
category: maths
version: "1.0.0"
---
Plot lines from a table, read their gradients, solve equations where lines
cross, and shade the regions inequalities describe.

## What it is

A worksheet of two to six graphing questions, each with its own square
coordinate grid. Some give an equation such as y = 2x - 1 and a table of x
values to complete and plot. Some show a drawn line and ask for its
gradient (slope), its y-intercept and its equation. Some draw two lines and
ask for the solution of the pair of equations, and some ask for a region to
be shaded. The answer key fills in every table, draws every line, rings
every crossing point, and shades every region.

## How to play

Every straight line can be written y = mx + c. The number c is the
**y-intercept**: where the line crosses the y-axis. The number m is the
**gradient** (in the US, the **slope**): how far the line goes up for every
one square it goes across. A line going down from left to right has a
negative gradient.

- **Plotting:** for each x in the table, multiply by m and add c to get y.
  Mark each point (x, y) on the grid, then rule a line through them right
  across the grid. If the points do not lie in a straight line, check your
  arithmetic.
- **Reading a line:** find two points where the line crosses grid corners
  exactly. The gradient is the change in y divided by the change in x
  between them. Read c where the line meets the y-axis, then write
  y = mx + c. A gradient can be a fraction, such as 1/2 (up one for every
  two across).
- **Solving two equations:** the solution is the point that lies on both
  lines - where they cross. Read off its x and y, and check them in both
  equations.
- **Shading inequalities:** draw the boundary line first. Use a dashed line
  for "less than" or "greater than" (points on the line do not count), and
  a solid line for "less than or equal to" or "greater than or equal to".
  Then test a point not on the line, such as (0, 0): if it makes the
  inequality true, shade its side. With several inequalities, shade only
  where all of them are true.

## Purpose

Linear graphs are the bridge between algebra and geometry, and a core
topic in grades 7-9 (Common Core 8.EE, 8.F, HSA-REI) and KS3-GCSE. Plotting
from a table builds the link between an equation and its picture; reading a
gradient and intercept back reverses it; graphical simultaneous equations
show what a "solution" means; and shading inequalities prepares for linear
programming. Because every line passes through grid corners, the reading is
exact rather than a guess.

## History

Rene Descartes' *La Geometrie* (1637) and Pierre de Fermat's
contemporaneous work joined algebra to geometry by describing curves with
equations in two coordinates; Fermat already noted that an equation of the
first degree describes a straight line. The letters y = mx + c (y = mx + b
in the US) became the school form in the nineteenth and twentieth
centuries. Graphical solution of inequalities grew with linear programming,
developed by Leonid Kantorovich (1939) and George Dantzig (1947).

## This implementation

- **Spec knobs:** `difficulty`; `mode` (`mixed`, `plot`, `read`,
  `simultaneous`, `inequality`); `locale` (`us` says "slope" and "system";
  `uk` and `in` say "gradient" and "simultaneous equations"); `count`
  (2-6; four to a page by default, and five or six put the table and the
  answer lines beside a smaller grid); `width`, `height`, `line`.
- **Generation:** gradients are exact fractions and intercepts whole
  numbers. Kids uses gradients 1, 2 and 3 with intercepts 0-4 on a 0-10
  grid (plot and read only). Easy adds negative gradients on a -6 to 6
  grid, simultaneous pairs and one inequality; Medium adds gradients of a
  half; Hard adds thirds and three halves, and two inequalities (one
  horizontal or vertical boundary); Expert leans on fractional gradients and
  sets three inequalities. Tables use x values that are multiples of the
  gradient's denominator, so every y is whole and on the grid. Simultaneous
  pairs are built from a lattice crossing point and two different gradients.
  No question repeats on a page. Simultaneous and inequality pages asked for
  at Kids are served at Easy, and say so in meta (`requested_difficulty`).
- **Solving:** the key fills the table, draws the line through the plotted
  points, rings the crossing point and writes its coordinates, and draws
  each boundary (dashed when strict) with the feasible region shaded - the
  grid square clipped by each half-plane in turn.
- **Guarantees:** every line crosses the drawn window through at least two
  lattice points at least three squares apart, so it can be read exactly;
  every table value is a whole number inside the window; every crossing is
  a lattice point strictly inside the window; every shaded region holds at
  least eight lattice points strictly inside it. The tests read the answers
  back from the drawing itself: each drawn line's end points are mapped back
  through the grid's logged position and must give the exact gradient and
  intercept; the two drawn lines of a simultaneous pair are intersected and
  must meet at the answer; each boundary must be dashed exactly when strict;
  and every lattice point off the boundaries must lie inside the shaded
  polygon exactly when it satisfies all the inequalities (checked with
  exact fractions). Meta reports `answers_checked` and each question's
  equations and answers.
