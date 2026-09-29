---
title: "Abacus"
blurb: "Abacus practice — soroban, suanpan and school abacus: read, draw, add and subtract"
category: maths
version: "1.0.0"
---
Abacus-class practice sheets: read the beads, shade the beads, and the
classic columns of numbers to add and subtract on a soroban, a Chinese
suanpan or a school spike abacus.

## What it is

An abacus shows a number with beads on rods, one rod for each place: ones
on the right, then tens, hundreds and so on to the left. On the Japanese
**soroban** each rod has one upper bead worth five and four lower beads worth
one each; a bead counts when it is pushed against the middle bar (the beam).
The Chinese **suanpan** has two upper beads and five lower beads per rod,
used the same way. A **school abacus** has bare spikes labelled O, T, H, TH
and TTH, with up to nine beads stacked on each.

A page mixes up to four kinds of practice:

- **Read the abacus.** The beads are set; write the number.
- **Shade the beads.** A number is given; shade the beads that show it (on
  a school abacus, draw the beads on the spikes).
- **Add and subtract.** The practice sheet of abacus classes: columns of
  three to ten numbers, some with a minus sign, to work down the column and
  write the answer in the box.
- **Anzan.** The same drills written across the page, to work in your head
  while picturing the beads.

Sheets follow the ladder abacus classes teach: direct moves first, then
"small friends", then "big friends", then both together.

## How to play

**Reading.** Start at the right-hand rod: that is the ones. On a soroban,
an upper bead touching the beam is worth 5 and each lower bead touching the
beam is worth 1, so an upper bead and two lower beads make 7. Do the same on
each rod to the left for the tens, hundreds and thousands, and write the
digits in order. A rod with no beads at the beam is a 0. The white dots on
the beam mark the ones rod and every third rod after it, like the commas in
a big number.

**Shading.** Beads start away from the beam. For each digit of the number,
shade the upper bead if the digit is 5 or more, and shade as many lower
beads (the ones nearest the beam) as the digit has over 0 or over 5. For 7:
the upper bead and two lower beads.

**Adding and subtracting.** Set the first number on your abacus, then add
or take away each number below it in turn, working from its biggest place to
its ones, and write what the abacus shows at the end. A number with a minus
sign is taken away.

When a rod has no room, use a friend:

- **Small friends** (partners of 5): to add 4 when there are not four free
  lower beads, add 5 and take away 1. The pairs are 1 and 4, 2 and 3. To
  take away 3 when there are not three lower beads, take away 5 and add 2.
- **Big friends** (partners of 10): to add 7 when the rod would pass 9, take
  away 3 on that rod and add 1 on the rod to its left. The pairs are 1 and
  9, 2 and 8, 3 and 7, 4 and 6, 5 and 5. To take away 8 from a rod that has
  less than 8, add 2 on that rod and take away 1 on the rod to its left.
- **Mixed friends:** sometimes the "take away 3" or "add 2" of a big friend
  needs a small friend of its own. Do both steps in turn.

**Anzan.** Picture the abacus and move the beads in your mind, number by
number, then write the answer.

## Purpose

Abacus classes (UCMAS, Aloha, SIP and many local academies) are hugely
popular across India, East and Southeast Asia and beyond, for children from
about four to fourteen. Their heart is the practice sheet: pages of bead
reading, bead drawing and columns of sums graded by exactly which moves they
need. These pages give teachers and parents an endless supply of such
sheets at every level, with answer keys, and give schools the spike-abacus
pages used to teach place value.

## History

Counting boards with pebbles go back to ancient Mesopotamia, Greece and
Rome. The Chinese suanpan, with two upper and five lower beads, is recorded
from about the 14th century and was the everyday calculator of Chinese
merchants for centuries. It reached Japan in the 16th century and became
the soroban; Japan later dropped one upper bead (late 19th century) and one
lower bead (1930s), giving the one-and-four form used today.
Japanese abacus schools (soroban juku) developed the graded exercises and
mental "anzan" training that modern abacus programmes such as UCMAS,
founded in Malaysia in 1993, carried to classrooms worldwide.

## This implementation

- **Spec knobs:** `difficulty`; `style` (`soroban`, `suanpan`, `school`);
  `mode` (`mixed`: a row to read, a row to shade and one strip of sums;
  `read`, `draw`, `sums`, `flash`); `rods` (1-13 per abacus, school 1-5;
  0 = one more than the digits; when set it also caps the running totals of
  the sums); `digits` (0 = from the difficulty); `rows` (numbers per sum,
  2-10); `moves` (`auto`, `direct`, `small_friends`, `big_friends`,
  `mixed`, `any`); `subtract`; `problems` (single-mode pages; 0 fills the
  page); `width`, `height` (Pt, default US letter), `line`.
- **Generation:** difficulty maps to the usual abacus-class levels. Kids:
  direct moves only, one-digit sums of three numbers, two-digit numbers to
  read. Easy: small friends (every sum needs at least one 5-complement move
  and none needs a 10-complement), four numbers. Medium: big friends (at
  least one 10-complement, no 5-complement anywhere), five numbers,
  three-digit abacus numbers. Hard: mixed friends (both kinds in every sum)
  with two-digit numbers, four-digit abacus numbers. Expert: mixed friends
  with six three-digit numbers, five-digit abacus numbers. Sums are grown one
  number at a time: each candidate number is entered on a simulated soroban
  and kept only if its moves are allowed; a candidate that supplies a move
  the sum still needs is preferred; sums that end without the required move,
  at zero, or below zero at any point are discarded. Numbers and sums never
  repeat on a page.
- **Solving:** each sum is simulated bead by bead on a 13-rod soroban (or
  the `rods` given), numbers entered from their biggest digit to their ones,
  as classes teach. Each digit is one rod move, classified as direct, a
  5-complement or a 10-complement (whose on-rod part may itself be a
  5-complement, and whose carry or borrow is a further move that can
  ripple). The tallies are stored with each sum.
- **Guarantees:** deterministic per seed. Every abacus picture is reported
  bead by bead as it is drawn and reads back to its number in canonical form
  (upper bead 0-1, lower beads 0-4), on the page and in the key; blank
  abaci read zero; every drawing stays inside its cell (tested for every
  style and level). Every sum's total is exact and never negative on the
  way; its move tags are re-derived in the tests by an independent
  bead-state simulation and must match, and meet the requested rule exactly
  (`moves_simulated`, `answers_checked`). Rating basis: digits, numbers per
  sum and the complement moves required. Every difficulty is reachable with
  every style and mode.
