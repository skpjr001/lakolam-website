---
title: "Masyu"
blurb: "One closed loop turning at black circles and running straight through white"
category: puzzle
version: "1.0.0"
---
Draw one closed loop through the circles: turn on every black pearl, run
straight through every white one.

## What it is

A grid scattered with white and black circles. A single closed loop must pass
through every circle (and may pass through empty cells), moving between cell
centres horizontally and vertically, never crossing itself. At a **white**
circle the loop goes straight through but must turn in at least one of the two
neighbouring cells. At a **black** circle the loop turns 90° and must run
straight for at least one cell on both sides of the turn.

## How to play

Black circles near an edge are the entry point: a black pearl on the border
has only one way to satisfy "straight on both sides". Chain the local rules —
a white pearl on the edge runs along it; two adjacent black pearls force their
turns apart. The single-loop rule finishes the job: any move that would close
a small loop early is forbidden.

## Purpose

The most elegant of the loop puzzles — two rules, no numbers, and boards that
read as ornament. It contributes the workspace's Hamiltonian-cycle machinery:
the answer loop is built by merging 2×2 block cycles along a spanning tree,
which is also how the kolam crate thinks about its weave.

## History

Nikoli, 2000. First published as *Shiroshinju Kuroshinju* ("white pearls and
black pearls"); the name **Masyu** ("evil influence") arose when Nikoli's
president misread the kanji for *shinju* (pearl) — and the misreading stuck.

## This implementation

- **Spec knobs:** `rows`, `cols`, `circle_share`, `difficulty`.
- **Generation:** answer first — a Hamiltonian cycle is constructed by merging
  block four-cycles along a random spanning tree, circles are read off the
  loop's own geometry (turns flanked by straights become black, straights
  flanked by turns become white), then circles are thinned until each one is
  load-bearing.
- **Guarantees:** `count_loops(2) == 1` over the printed circles, and every
  circle re-checked against the loop it was read from.
- **Difficulty:** circle density, honestly labelled as a proxy
  (`rating_basis`), with raw `search_nodes` reported beside it — an
  effort-based rating was tried, cost 15×, and did not normalise across board
  sizes, so it was reverted and the attempt recorded.
