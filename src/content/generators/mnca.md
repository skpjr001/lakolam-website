---
title: "Ring Automaton"
blurb: "Multiple-neighbourhood cellular automaton: ring-neighbourhood rules grow membranes, urchins, coral and mazes from noise, traced as smooth outlines with offset rings"
category: design
version: "1.0.0"
---
Coin flips on a grid, a handful of rules about rings of neighbours, and out
grow urchins, coral, walled bubbles and winding mazes — drawn as soft
outlines with ripples round them.

## What it is

A cellular automaton with several neighbourhoods at once. Every cell of a
large grid is alive or dead, and starts as a coin flip. Each step, every
cell looks at a few rings around it — a near ring and a far one, say — and
asks what share of each ring is alive; a short list of rules then says
whether it lives or dies. Near rings that feed growth and far rings that
starve it work against each other, and after a few dozen steps the noise has
organised itself into a texture: spiny urchins on open water, coral full of
holes, foam-like membranes, dotted islands, a fingerprint's whorls. The
finished pattern is traced as smooth outlines, with offset rings around the
shapes like ripples or the lines of a map.

## How to use it

Frame it, or colour it in. In colour the page is finished; in line art every
shape and ring is a closed region, so you can colour the shapes in one
colour and the ripples in fading shades of another, or fill alternate rings
for a contour-map look. The bubble, reef and island pages also make good
backgrounds for lettering, and the maze and whorl pages are calm to trace
with a fine pen.

## Purpose

A page grown rather than drawn: it shows how very simple local rules,
repeated, produce shapes that look alive — the idea behind much of
artificial life — and gives a colourist intricate, organic regions that no
two pages share.

## History

Cellular automata go back to John von Neumann and Stanisław Ulam in the
1940s and became famous with John Conway's Game of Life (1970). Continuous
and larger-than-life variants followed (Kellie Evans's "Larger than Life",
Stephan Rafler's SmoothLife, 2011, and Bert Chan's Lenia, 2018). The
multiple-neighbourhood cellular automaton, which tests several rings at
once against ordered threshold intervals, was developed and popularised by
the generative artist Slackermanz (from about 2017), whose rules grow
strikingly lifelike textures. The nine rules here are our own, found by a
seeded search over random ring sets and thresholds and kept for their
looks.

## This implementation

- **Spec knobs:** `pattern` (auto, membranes, honeycomb, urchins, amoeba,
  islands, reef, anemone, maze, whorl), `steps` (40–150), `resolution`
  (cells across the long side, 64–320), `jitter` (0–0.03), `style` (auto,
  filled, contours, bands), `rings` (0–12), `ring_gap` (1.5–40 pt),
  `palette` (auto, coral, lagoon, moss, ink, line_art), `stroke`, `width`,
  `height`, `margin`.
- **Generation:** a toroidal grid starts half alive at random. Rings are
  digital annuli (cells within outer + ½ of the centre but not within
  inner + ½); each disc is a few rectangles of equal row width, summed from
  one summed-area table, so a step costs a few lookups per cell whatever the
  radii. Each cell takes the live share of every ring, then the rule's
  intervals in order: each match sets alive or dead, the last match wins.
  Steps are synchronous and stop early at a fixed point. The rule's bounds
  are nudged by a seeded jitter; a result outside 2–98% live is retried with
  half the jitter and a fresh start, then with none. The grid becomes a
  signed chamfer distance (positive inside live regions), blurred twice and
  traced by marching squares at 0 (outlines) and at multiples of the ring
  gap (contours outside, bands both sides), held far below every level
  beyond the plate so every loop closes. Regions are painted largest first.
  Over-range knobs are clamped and recorded as `requested_<field>`.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; `verification:
  neither_empty_nor_full`. Tested: every curated rule, unjittered, from
  three random starts, is between 5% and 95% live after 40 and after 150
  steps; every page, at the largest jitter, is between 2% and 98% live and
  has outlines; ring sums equal a direct count, wrapping on the torus; the
  early stop at a fixed point gives exactly the full run's grid; cells deep
  inside a traced live outline are alive and those outside are dead. All
  ink stays inside the page.
