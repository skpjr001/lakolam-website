---
title: "Trail Walk"
blurb: "Trail walk — join 1-A-2-B-3-C… in order; the trail never crosses itself"
category: puzzle
version: "1.0.0"
---
Join the circles in order — 1, A, 2, B, 3, C — with one unbroken line.

## What it is

Circles are scattered over the page, each with a number or a letter. Join
them in order with a single line. In the alternating trail, numbers and
letters take turns: 1 to A, A to 2, 2 to B, and so on. Simpler trails use
numbers only or letters only. The trail never has to cross itself, and it
never needs to pass through another circle.

## How to play

Find the circle with the double ring and the first label in it — 1 or A.
Draw a line from it to the next label in the order, then the next, without
lifting your pencil, until you reach the last circle (it has a double ring
too). On an alternating trail, keep two counts going at once: after 3 comes
C, and after C comes 4.

On some pages one circle has been left empty. Work out which label belongs
there and write it in.

## Purpose

Scanning a busy page for the next target, and holding a sequence in mind
while switching between two of them, are skills that grow through childhood
and stay worth exercising later in life. Large-print trails with fewer
circles suit young children and older adults; longer trails make a brisk
brain game. This page is a puzzle for practice and fun, not a test or a
measure of anything.

## History

Join-the-circles tasks go back to the alternating trails of the 1940s, and
the idea has long been a favourite of brain-game books for seniors and of
"connect the letters and numbers" pages for children.

## This implementation

- **Spec knobs:** `difficulty` (Kids 8 circles, Easy 12, Medium 16, Hard 20,
  Expert 25), `sequence` (`alternating`, `numbers`, `letters`), `count`
  (0 = the level's; otherwise 5–40, at most 26 for letters), `missing` (one
  circle in the middle third left empty), `large_print` (bigger circles and
  labels), `width`, `height`.
- **Generation:** a random walk places the circles one by one, each a few
  circle-widths from the last. A new circle is kept only if it sits at least
  three radii from every circle so far and clear of every stretch, and its
  new stretch crosses no earlier stretch and passes no earlier circle. A walk
  that boxes itself in starts again; after 300 failed walks a serpentine
  layout (rows left to right, then right to left) is used, which is clear by
  construction. The radius shrinks only when the page is too small for the
  serpentine to fit at the requested print size.
- **Solving:** the answer is the trail itself, drawn in the key, with the
  missing label filled in.
- **Guarantees:** the finished trail is re-checked over every pair: circles
  at least three radii apart; no two non-adjacent stretches meeting
  (orientation tests, touching and collinear overlap included); every
  stretch at least 1.6 radii from every circle it does not join. The tests
  check again by sampling points along each stretch. Meta carries
  `answers_checked` and the guarantee.
- **Rating:** by circle count (`rating_basis: circle_count`): up to 8 Kids,
  12 Easy, 16 Medium, 20 Hard, more Expert. A hand-set `count` sets the band,
  and the request is kept as `requested_difficulty`; clamps are reported as
  `requested_count`, `requested_width`, `requested_height`.
