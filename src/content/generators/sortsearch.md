---
title: "Searching and Sorting"
blurb: "Searching and sorting traces — bubble, insertion and merge sort pass by pass, linear and binary search, and which algorithm made these rows, every trace re-run independently"
category: maths
version: "1.0.0"
---
Trace bubble, insertion and merge sort, linear and binary search, box by box — and say which algorithm made the rows.

## What it is

A computer science worksheet of two to eight algorithm traces. A sorting
question gives a short list of numbers (or letters) and a table to fill
in: the list after every pass of bubble sort (with the number of swaps in
each pass at higher levels), after every insertion of insertion sort, or
after every merge stage of merge sort. A linear search question asks how
many items are checked and whether the target is found; a binary search
question asks for the low, high and middle positions and the item checked
at each step. "Which algorithm?" questions show the first rows of a sort
and ask whether bubble sort or insertion sort made them. A box at the top
states each algorithm exactly as it must be run. The answer key fills in
every box.

## How to play

1. Read the rule for the algorithm in the box at the top and follow it
   exactly — the answers depend on the details.
2. **Bubble sort:** in each pass, compare the first two items and swap
   them if they are in the wrong order, then the second and third, and so
   on to the end. Write the list after the pass and count the swaps. Keep
   going until a pass makes no swaps.
3. **Insertion sort:** the first item on its own is sorted. Take the
   second item and slide it left past every bigger item; write the list.
   Then do the same with the third item, and so on.
4. **Merge sort:** the list is split into single items. Merge neighbours
   into sorted pairs, then pairs into sorted fours, and so on until one
   sorted list is left. Write the list after each stage.
5. **Linear search:** check each item from the left until you find the
   target or reach the end. Count every item you check.
6. **Binary search:** positions start at 0. Work out mid = (low + high) ÷ 2,
   rounding down, and check the item there. If it is too small, the new
   low is mid + 1; if it is too big, the new high is mid − 1. Stop when you
   find it, or when low is bigger than high (it is not there).
7. **Which algorithm?** Bubble sort moves the biggest item to the end in
   the first pass; insertion sort keeps the start of the list sorted and
   leaves the end untouched.

## Purpose

Bubble sort, insertion sort, merge sort, linear search and binary search
are named in England's GCSE Computer Science specifications (AQA 8525,
OCR J277, Edexcel and WJEC), and exam papers ask pupils to trace them on
a given list, count passes and comparisons, and recognise an algorithm
from its working. Tracing by hand is how the difference between the
algorithms — and why merge sort and binary search are fast — becomes
real. Letters as well as numbers practise alphabetical ordering, as
exam questions do.

## History

Bubble sort ("sorting by exchange") was analysed in 1956 and named in the
early 1960s; Donald Knuth later wrote that it "seems to have nothing to
recommend it" except its catchy name. Insertion sort is how card players
order a hand. John von Neumann wrote a merge sort for the EDVAC in 1945,
one of the first programs for a stored-program computer. Binary search
was described by John Mauchly in 1946, but the first version correct for
every list length was not published until 1962, and a famous bug in the
midpoint calculation, (low + high) overflowing, survived in Java's
library until 2006.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `bubble`, `insertion`,
  `merge`, `searching`, `identify`); `items` (`numbers` 1-99 or capital
  `letters`); `count` (2-8, four fit a letter page comfortably; clamped
  and recorded as `requested_count`); `width`, `height`, `line`.
- **Generation:** lists are distinct items drawn at random (5 items at
  Easy, 6 at Medium, 7 at Hard, 8 at Expert; merge sort uses 4 or 8 so
  every split is even; linear search three more; binary search 7, 11 or 15
  sorted items). Easy asks for the first bubble pass and its swaps, the
  first two insertions, a four-item merge sort and searches that succeed.
  Medium runs whole sorts to the end and lets a linear search fail. Hard
  adds the swaps in every pass, binary searches that fail and "which
  algorithm?". Expert asks the total comparisons of a bubble sort (each
  pass compares every neighbouring pair) and shows three rows to
  identify. Bubble traces stop at the first pass with no swaps and are
  kept to seven passes. Kids is served at Easy (meta
  `requested_difficulty`). No question repeats on a page.
- **Solving:** the generator traces with ordinary loops; the checker
  re-derives every row from the algorithm's defining property — a bubble
  pass carries the largest item seen so far rightwards (counting each item
  it passes as a swap), insertion row k is the first k + 1 items sorted
  with the rest untouched, merge stage j is the list cut into sorted
  blocks of 2^j, binary search is re-run recursively — and every
  "which algorithm?" question must match the start of exactly one
  algorithm's trace.
- **Guarantees:** `answers_checked` and `unique` — every row and answer
  follows from the printed rules, with distinct items so no answer
  depends on how ties are broken. The tests check further invariants:
  each bubble swap removes exactly one inversion, after pass k the k
  largest items sit at the end in order, the last pass makes no swaps and
  the one before it does, every binary search step obeys the printed
  midpoint rule, a changed row or answer is caught, and every table stays
  inside its question with readable boxes.
