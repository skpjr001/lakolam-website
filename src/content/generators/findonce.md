---
title: "Find It Once"
blurb: "Find It Once — a grid made only of one word's own letters (or digits, or shapes) hiding it exactly once among near-misses"
category: word
version: "1.1.0"
---
One word, hidden once, in a grid made of nothing but its own letters.

## What it is

A short target — a word such as TRAP, a number such as 5846, or a row of
shapes — is printed at the top of the page. Below it is a big square of
symbols, and every symbol in it is one of the target's own. The target
appears exactly once in a straight line. Everywhere else the grid is full of
traps: lines that start right and go wrong, lines that are one symbol away.

A second layout, the **spider web**, puts the symbols in circles joined by
lines. The target is traced once along the lines, from circle to circle.

## How to play

Look at the target at the top of the page. Every symbol in the grid is one
of its symbols, so you cannot spot it by a stray letter — you must read.

- **Grid:** find the one place where the target is spelled in a straight
  line, and circle it. The line under the target says which directions it
  can run: across or down on the easiest pages; across, down or diagonally
  forwards on easy pages; on harder pages any of the eight directions,
  forwards or backwards.
- **Spider web:** trace the target along the lines, one circle to the next,
  never using a circle twice.

There is only one answer. Many lines get all but one symbol right: when you
think you have found it, check every symbol.

## Purpose

The viral "find the word in a grid of its own letters" teaser, and the
classroom "hidden word" spider-web puzzles teachers give early finishers,
made provable. A screen version of the idea fills the grid at random and
repairs it a few times, so it can leave a second copy of the word, or slip
in letters that are not in the word at all. Here both rules are guaranteed.
Big print with one target suits seniors' brain-training packs; the shapes
kind works for children who do not read yet.

## History

Word-search grids made from the target's own letters circulate as
"can you find LOVE in this grid?" brainteasers, and the deliberately cruel
daily web game form of the same idea grows its grid level by level. The
spider-web layout follows the hidden-word puzzles shared by maths teachers
for the first week of school. A book of pages stepped one size up per page
recreates the "increasingly hard" ladder on paper.

## This implementation

- **Spec knobs:** `difficulty`, `kind` (letters, digits, shapes), `layout`
  (grid, web), `size` (grid side 5–30, or 8–40 circles; 0 uses the band's),
  `target` (your own word or number; empty picks one), `width`, `height`,
  `margin`.
- **Generation:** letter targets are everyday family-friendly words (the
  hard bands prefer words with a repeated letter, such as TEETH, so fewer
  different letters are in play); digit and shape targets use three or four
  different symbols. The target is planted (Kids: across or down; Easy:
  four forward directions; Medium and up: any of eight), the other cells are
  filled from a perfectly balanced shuffle of its symbols, and a
  min-conflicts local search breaks every extra occurrence. A second phase
  moves the number of **near-misses** — windows one symbol away from the
  target, in either reading — towards the band's goal without creating a
  new occurrence. Each symbol stays between 0.6× and 1.6× its fair share, so
  a grid never collapses into one letter. The web is a jittered grid of
  circles with one diagonal per square, thinned at random while it stays
  connected. A typed target that cannot be used (too short, a palindrome,
  not a word for the kind, or impossible to hide once — ODD cannot be kept
  out of a balanced grid) is replaced by a picked one and reported.
- **Solving:** the reader scans; there is no deduction beyond checking each
  candidate line symbol by symbol.
- **Guarantees:** deterministic per seed; every symbol on the page belongs
  to the target; the target is never a palindrome (it would read twice);
  and it occurs **exactly once**, proven by an exhaustive count of every
  cell × eight directions (grid) or every simple path (web). The tests
  re-check that with a different method: each full row, column and
  diagonal is read as a string forwards and backwards and searched, and
  every simple path of the web is enumerated without pruning. The
  difficulty is measured, not asserted: size points (side ≤ 8, ≤ 11, ≤ 14,
  ≤ 18, more), direction points (2, 4 or 8 directions) and near-miss points
  (the near-miss count ÷ what a random fill would give: below 1.15, below
  1.4, or more) are summed into the band (`rating_basis`
  `size_directions_and_decoys`; the web counts twice its size points plus
  near-miss points). A size you choose is rated honestly, and a band that
  differs from the request is reported as `requested_difficulty`. Meta
  records the target, the alphabet, the exact near-miss count and ratio,
  and where the one occurrence is.
- **Version 1.1:** the shared family-friendly word filter now refuses more words (an audit of the everyday dictionary tiers: crude, sexual, drug, drink and violent words and inflections of words already refused), so some pages draw different words.
