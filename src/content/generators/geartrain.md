---
title: "Gear Trains"
blurb: "Gear trains — which way does it turn, how many turns, will it jam? Gears and belts drawn exactly, every answer checked"
category: puzzle
version: "1.0.0"
---
Which way does it turn, how many times, and will it turn at all?

## What it is

Machines of spur gears drawn meshing on the page, some with belts running
between pulleys on their axles. Gear A is turned the way its arrow shows;
the questions ask which way another gear turns, whether the whole machine
can turn or jams, and - when the teeth are counted - how many turns another
gear makes.

## How to play

- Gears turn each other only where their teeth touch. Two gears that touch
  turn opposite ways: if one turns clockwise, the other turns the other way.
- A belt joins two wheels. An open belt turns them the same way; a crossed
  belt (its two sides cross in the middle) turns them opposite ways. A
  pulley turns with the gear it sits on.
- A machine jams when the gears in a ring cannot all agree - follow the ring
  round and see whether you come back to where you started turning the same
  way.
- The numbers on gears are their teeth. For gears that touch, turns times
  teeth is the same for both: a 12-tooth gear turning 6 times drives a
  24-tooth gear 3 times. A gear in the middle of a chain does not change
  how fast the last gear turns, only which way.
- Circle the right answer, or write the number of turns in the box.

## Purpose

Mechanical reasoning as tested in aptitude and selection tests, and the
gear ratios of design and technology and physics lessons. Following a
direction round a machine is a gentle exercise in parity; spotting a jam
is the same idea round a loop; speeds practise ratio and fractions.

## History

Gear trains go back to Hellenistic devices such as the Antikythera
mechanism, and wheel-and-pinion arithmetic to the clockmakers. Diagram
questions about which way a gear turns became standard in mechanical
comprehension tests in the twentieth century, and the "three gears in a
triangle cannot turn" teaser is a puzzle-book staple.

## This implementation

**Spec knobs:** `kind` (`mixed`, `direction`, `jam`, `speed`);
`difficulty`; `questions` (1-8); `belts` (open and crossed belts in
direction and jam machines from Medium up; ignored for Kids and Easy and for
speed questions); `locale` (`us` COUNTERCLOCKWISE, `uk` ANTICLOCKWISE);
`name_line`; page `width`, `height`, `margin`. Clamped values are reported
as `requested_<field>`.

**Generation:** gears share one tooth size (module), so a gear with n teeth
has a pitch circle of radius n/2 and two gears mesh when their pitch circles
touch. A machine grows gear by gear: each new gear touches one earlier gear
(or hangs on a belt) and must stay a clear gap from every other gear.
Loops are closed either by a gear placed where it touches two gears at
once - kept only when its teeth fit both without overlapping - or by a
belt. Direction machines: Kids 3 gears in a chain, Easy 4-5 in a chain,
Medium 6-7 branching, Hard 8-9 with one loop that turns, Expert 10-11 with
two. Jam machines always hold a loop - half of them jam, half turn. Speed
questions use a chain of 2 (Kids) to 6 (Expert) gears; Medium and up also
ask the direction, and Hard and up allow fractional answers such as
2 1/3 turns.

**Solving:** the mesh graph is read back from the drawing itself - pitch
circles touching means meshing, anything else must be clearly apart, or the
machine is refused - with belts added as links that keep (open) or reverse
(crossed) the turn. Directions are a two-colouring of that graph from gear
A; a colouring conflict is an odd loop, and the machine jams (the key draws
the loop). Turns are exact fractions: turns times teeth is conserved along
every mesh. Difficulty is the number of gears per question type
(`rating_basis`); every band is reachable.

**Guarantees:** deterministic per seed; every pair of gears either meshes
exactly or keeps a clear gap, meshing teeth never overlap, and belts clear
every other gear; every answer is rechecked by an independent union-find
with parity and, for speeds, by multiplying tooth ratios along a path.
Meta: `unique`, `answers_checked`, `difficulty`, `rating_basis`, and every
question's gears, teeth, belts, target and answer.
