---
title: "Sorting Networks"
blurb: "Sorting networks — trace numbers through a comparator network, or decide whether it sorts every list (proven by the 0-1 principle)"
category: maths
version: "1.0.0"
---
Trace numbers through a network of links, or decide whether it sorts every list — the CS Unplugged classic, proven by the 0-1 principle.

## What it is

A page of sorting networks: three to seven horizontal lines with vertical
links between pairs of them. Numbers start on the left and travel right;
at each link the two numbers compare and swap if needed. Tracing questions
give the starting numbers and leave boxes for the numbers that come out.
Deciding questions show a network with no numbers and ask whether it sorts
every possible list. The answer key fills the boxes, writes the numbers on
the lines after every column of links, circles YES or NO, and for a network
that does not sort shows a list it gets wrong.

## How to play

Move the numbers from left to right. When two numbers reach the ends of a
link, the smaller one goes to the upper line and the larger one to the
lower line (if they are already that way round, nothing changes). Links in
the same column can be done in any order. Write the numbers that come out
on the right.

To decide whether a network sorts every list, try some lists — a list in
reverse order is a good start. One list that comes out in the wrong order
is enough to say NO. To be sure of YES, a useful trick: it is enough to
check every list made only of 0s and 1s.

## Purpose

Sorting networks are a favourite CS Unplugged activity (often played on a
network chalked on the playground, with children as the numbers). They
teach comparison, parallel computation — links in the same column happen at
once — and what it means for an algorithm to be correct for every input,
not just the ones tried. Tracing is also careful arithmetic practice with
ordering numbers.

## History

Comparator networks were studied from the 1950s; Kenneth Batcher's 1968
bitonic and odd-even merge sorts made them practical for parallel
hardware, and they still sort data inside graphics processors and network
switches. The 0-1 principle — a network sorts every input exactly when it
sorts every input of 0s and 1s — is in Knuth's The Art of Computer
Programming, volume 3 (§5.3.4). Tim Bell, Ian Witten and Mike Fellows put
sorting networks into Computer Science Unplugged in the 1990s.

## This implementation

- **Spec knobs:** `difficulty` (Kids: 3 lines, numbers 1-9; Easy: 4 lines,
  numbers to 20; Medium: 5 lines, two-digit numbers; Hard: 6 lines and some
  networks that do not sort; Expert: 7 lines, three-digit numbers); `task`
  (`trace`, `does_it_sort`, `mixed`); `count` (2-6); page `width`,
  `height` and `line`.
- **Generation:** random links (mostly between neighbouring lines) are added
  until the network sorts, then links are removed in random order — repeated
  until no link can go — so every remaining link is necessary, and networks
  over a size cap are redrawn. A network that does not sort is a sorting
  network with one link removed. Links are packed into columns, each after
  every earlier link touching its span, so links in a column never overlap
  and the order on each line is kept. Tracing a broken network uses a list
  it gets wrong; deciding pages always mix YES and NO.
- **Solving:** traces by running the columns; the verdict by the 0-1
  principle over the 2^n zero-one lists.
- **Guarantees:** traces are re-run link by link and the verdict re-checked
  over every permutation of the lines (`answers_checked`, `proof:
  zero_one_principle`); counterexamples are checked to come out unsorted.
