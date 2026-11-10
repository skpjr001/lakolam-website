---
title: "Juggling Patterns"
blurb: "Juggling patterns: siteswaps drawn as ladder, arc and state diagrams, each ball in its own colour"
category: design
version: "1.0.0"
---
Siteswaps, the juggler's notation for patterns, drawn as ladder, orbit and
state diagrams with every ball in its own colour.

## What it is

A poster of one juggling pattern. Jugglers write patterns as *siteswaps*: a
string of numbers, one per beat, each saying how high the ball thrown on
that beat goes — how many beats until it is caught. `3` is the three-ball
cascade, `531` sends one ball high, one medium and one straight across, and
`441` throws two balls to the same hand and passes the third. Patterns with
both hands throwing together are written in pairs, `(4,2x)` with `x` for a
throw that crosses; several balls thrown from one hand at once go in
brackets, `[43]23`.

The page draws the pattern three ways:

- **Ladder** — the left and right hands as two rails, time running down the
  page, every throw an arc from the hand that throws it to the hand that
  catches it. Each ball keeps its own colour all the way down.
- **Orbits** — one cycle of the pattern round a ring, every throw a curved
  arrow to the beat it lands on. Throws that the same balls take turns
  making share a colour: these are the pattern's orbits.
- **States** — before each throw, which of the coming beats already have a
  ball on its way down, ball by ball, and the throw that leads to the next
  state.

## How to use it

Read the ladder from the top: follow one colour and you are following one
ball through the pattern. Every dot is a throw; a throw of 1 goes straight
across, a 2 is held for a moment, odd throws cross between the hands and
even throws come back to the same hand (in two-handed patterns the `x`
decides). On the ring, the number of balls in an orbit is how many times
its arrows go round. On the state chart each row of cells is the next few
beats: the throw fills the cell its number counts to, and everything shifts
one place on. Try a pattern from the page with real balls (start slowly,
say the numbers aloud), or pick a pattern you can already juggle and work
out its diagrams first. The pages print well as posters for a juggling club
or a maths classroom.

## Purpose

To make the mathematics of juggling visible: why `531` works and `532`
does not, why the average of the numbers is always the number of balls, and
how a pattern's balls share out among its orbits.

## History

Siteswap notation was devised independently around 1985 by Paul Klimek in
Santa Cruz, by Bruce "Boppo" Tiemann and Bengt Magnusson at Caltech, and by
Mike Day, Colin Wright and Adam Chalcraft in Cambridge. Claude Shannon had
earlier stated his juggling theorem relating flight, dwell and vacant time
to the number of balls and hands. The counting of patterns was put on a
firm footing by Joe Buhler, David Eisenbud, Ron Graham and Colin Wright in
"Juggling Drops and Descents" (*American Mathematical Monthly*, 1994),
which shows there are `(b+1)ⁿ − bⁿ` patterns of exactly `b` balls and
period `n` (counting rotations as different). Ladder and state diagrams
became the standard pictures through juggling software such as Jack
Boyce's Juggling Lab, and Burkard Polster's *The Mathematics of Juggling*
(2003) collects the theory.

## This implementation

- **Spec knobs:** `width`, `height` (points); `pattern` (siteswap text,
  default empty: chosen by `source`); `source` (`famous` — one of 26
  well-known patterns chosen by the seed — or `random`); `balls` (0-9;
  0 = any famous pattern, 3 for random; a ball count with no famous pattern
  falls back to a random one); `period` (1-9, default 5) and `max_throw`
  (2-15, default 7) for random patterns; `diagram` (`poster`, `ladder`,
  `arc`, `state`); `palette` (`auto`, `circus`, `jewel`, `pastel`, `night`;
  auto picks per seed); `labels`; `stroke` (0.2-4).
- **Generation:** patterns are parsed as asynchronous (`531`, letters
  `a`-`z` for 10-35), multiplex (`[43]23`) or synchronous (`(6x,4)(4,6x)`,
  `*` repeats the pairs with hands swapped). A random pattern takes a
  seeded permutation σ of the beats, sets `tᵢ = (σ(i) − i) mod p` (so every
  beat is caught once), adds whole periods to random throws until the
  average is the ball count without passing `max_throw`, keeps only
  patterns that do not repeat within the period, and rotates to the
  largest rotation. Each throw's ball makes a definite next throw (balls
  landing on a beat are matched to its throws longest first); the cycles of
  that map are the orbits, and unrolling it down time numbers every ball
  for the ladder and the states.
- **Guarantees:** every drawn pattern is valid — every beat (and, for sync,
  every hand) catches exactly as many balls as it throws, the permutation
  test for vanilla patterns — and an invalid `pattern` is refused with the
  reason. Tested independently by simulation: juggling each pattern from an
  empty schedule for many cycles, every beat catches what it throws and the
  balls in the air equal the average. The orbits partition the throws and
  their ball counts add up to the total; every unrolled ball's next throw
  is at its landing time and hand. Random patterns have exactly the asked
  ball count, period and ceiling (tested across 1-7 balls and periods
  1-7). `verification: siteswap_valid_catches_match_orbits_partition`.
  Clamped knobs are reported as `requested_<field>`, as is a period or
  ceiling a random pattern could not meet.
