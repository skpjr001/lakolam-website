---
title: "Whodunit?"
blurb: "Whodunit — who, where and with what, from evidence, a floor plan and statements where only the culprit lies"
category: puzzle
version: "1.0.0"
---
Who took it, where were they, and what did they carry? Only the culprit lies.

## What it is

A short mystery case for families. Something has gone missing — a
birthday cake, a museum crown, a school trophy, a pearl necklace. Three to
five suspects were each in a different room of a small floor plan, each
carrying a different object. You get a list of evidence, all of it true,
and one statement from each suspect. The culprit's statement is a lie;
everyone else tells the truth. A logic grid on the page helps you keep
track.

## How to play

Read the evidence and mark the grid: a cross where something is
impossible, a dot where it must be true. Each suspect was in exactly one
room and had exactly one object, and no two shared either. Some evidence
uses the floor plan ("in a room next to the Hall" means the rooms share
a wall) or the suspects' descriptions ("the suspect with the teapot is
left-handed"). Then test the statements: try each suspect as the liar —
their statement must be false and all the others true. Only one suspect
makes everything fit. Write down who did it, where they were, and what
they carried.

## Purpose

A gentle, story-flavoured deduction puzzle: the logic-grid habit of
crossing off possibilities, plus a map and a liar to reason about. It
suits older children, families solving together and adults who like
detective stories but not abstract grids. Nobody gets hurt: the crimes are
missing cakes and crowns.

## History

Logic-grid puzzles have filled puzzle magazines for decades; murder
mysteries told as logic puzzles, with a map of the scene and a liar among
the suspects, became a bestselling book genre in the 2020s. This is an
original, family-friendly take with invented suspects and settings.

## This implementation

- **Spec knobs:** `difficulty` (number of suspects and kinds of evidence),
  `setting` (auto, party, museum, school, train), `width`, `height`,
  `margin`.
- **Generation:** a random solution (rooms, objects, culprit) and random
  descriptions (tall or short, left- or right-handed); each suspect gets
  one statement with the right truth value (often about themselves). Every
  true fact of the band's kinds goes in a pool — plain facts, map facts,
  description facts — with indirect and negative facts before direct ones.
  Facts are added until the answer is the only one, then each is removed
  again if it stays the only one, keeping at least one map and one
  description fact when the band promises them.
- **Solving:** grid elimination, map reasoning, and trying each suspect
  as the liar; the key marks the grid, the lie, the room and the answer.
- **Guarantees:** deterministic per seed; every piece of evidence is true;
  exactly the culprit's statement is false; and **exactly one** (rooms,
  objects, culprit) triple fits, found by enumerating every assignment
  (n! × n! × n, at most 72,000 for five suspects). The tests re-count with
  a separate brute-force odometer (culprit first, then every room and
  object assignment), and check that no plain clue is spare. Rated by
  suspects and evidence kinds: two points per suspect beyond three, one
  for map facts, one for description facts — 0 Kids, 1–2 Easy, 3 Medium,
  4–5 Hard, 6 Expert (`rating_basis` `suspects_and_clue_families`); a band
  the case does not reach is reported as `requested_difficulty`.
