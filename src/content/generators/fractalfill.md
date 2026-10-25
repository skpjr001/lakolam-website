---
title: "Statistical Geometry"
blurb: "Statistical geometry: shapes whose areas fall by a power law, dropped at random without overlap until they fill a page, circle or heart"
category: design
version: "1.0.0"
---
One large shape, then two smaller ones, then hundreds of smaller still, each
dropped at random into the gaps left by the others, until the page is a
random fractal of hearts, stars or circles.

## What it is

A fill made by a simple law. Every shape is a little smaller than the one
before, by an exact power law, and each is placed at a random spot where it
touches nothing already down. Sizes chosen this way have a remarkable
property: the shapes never run out of room, and taken all the way to the
smallest they would cover the whole region. The page stops when the shapes
become specks, leaving a texture where a few giants are surrounded by
crowds of ever smaller copies: circles, squares, hexagons, five-pointed
stars, hearts, or a mixture, filling the page, a circle or a big heart.

## How to use it

Hang it as a print, or colour it in. In colour the page is finished art; in
line art every shape is a closed outline, and the big ones leave room for
patterns of your own inside them. Try colouring by size — the giants in one
colour, the middling shapes in another, the specks in a third — or by kind
on a mixed page. Counting how many shapes of each size you can find is a
gentle way into the idea of a power law.

## Purpose

A beautiful page that is also a piece of real mathematics: a random fractal
built with nothing more than a list of sizes and a coin for where each one
goes. It shows how order (a law for the sizes) and chance (where they land)
work together.

## History

The algorithm is John Shier's "statistical geometry", developed with the
visualisation scientist Paul Bourke from about 2011 (Shier and Bourke, "An
Algorithm for Random Fractal Filling of Space", Computer Graphics Forum,
2013; John Shier, "Fractalize That!", World Scientific, 2018). Shier found
that with areas falling as (N + i)^(−c), divided by the Hurwitz zeta
function so that they sum to the region's area, random placement fills the
space without ever jamming, giving a fractal of dimension 2/c. The Hurwitz
zeta function is Adolf Hurwitz's 1882 generalisation of Riemann's.

## This implementation

- **Spec knobs:** `shape` (auto, circle, square, star, heart, hexagon,
  mixed), `region` (page, circle, heart), `exponent` c (1.1–1.5), `offset`
  N (1–100), `count` (most shapes, 10–3000), `min_size` (1–40 pt, as the
  side of an equal-area square), `gap` (0–20 pt; small shapes keep at most
  18% of their size), `tries` (random positions per shape, 10–20000),
  `rotate`, `palette` (auto, confetti, ocean, ember, night, line_art),
  `stroke`, `width`, `height`, `margin`.
- **Generation:** shape i has area A·(N + i)^(−c)/ζ(c, N), A the region's
  area; ζ is summed directly for 64 terms plus an Euler–Maclaurin tail.
  Each shape (unit-area outline about its centroid, scaled, turned at
  random) tries uniformly random positions. To save time, positions are drawn
  from a raster of cells with every cell that certainly cannot hold a centre
  struck out (inside a placed shape, or outside the region) — this only
  removes positions that would be rejected, so the accepted positions are
  distributed exactly as in Shier's plain rejection sampling. Each candidate
  is tested exactly: circle–circle by centre distance, circle–polygon by the
  centre's distance to the polygon's edges, polygon–polygon by segment
  distances and containment, with a bounding-box grid for candidates.
  A shape that finds no room in its tries is skipped and counted; twenty in
  a row stop the page. Over-range knobs are clamped and recorded as
  `requested_<field>`.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; `verification:
  no_overlap_and_power_law_areas`. Tested: no two shapes overlap or come
  closer than their gap (checked again by dense boundary sampling); every
  shape lies inside its region; every placed shape's drawn area equals its
  law area; ζ matches known values and the whole law sums to the region.
  Meta reports `placed`, `skipped`, `stopped_by`, `fill_fraction`,
  `fractal_dimension`. All ink stays inside the page.
