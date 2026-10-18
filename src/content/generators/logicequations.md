---
title: "Logic Equations"
blurb: "Logic Equations — letters stand for 1..n; equations and conditionals pin each one"
category: puzzle
version: "1.0.0"
---
Every letter hides a different number — a handful of sums, differences and
"if … then …" clues tell you which.

## What it is

The letters A, B, C … each stand for a different whole number from 1 up to
the number of letters (four to nine letters, so 1–4 up to 1–9, each number
used exactly once). A short list of clues — equations like A + B = 7,
inequalities like C < D, and conditionals like IF A < B THEN C = 4 — pins
down exactly one assignment.

## How to play

Read every clue and find the number behind each letter. Each letter is a
different number, and every number from 1 up to the number of letters is
used once.

- A clue like `A + B = 3` with four letters means A and B are 1 and 2 in some
  order; `A × B = 12` allows only a few pairs.
- `A < B` means A is smaller than B. `A IS EVEN` and `A IS ODD` say what
  they say.
- `IF A < B THEN C = 4` only tells you something when A really is smaller
  than B; if A is bigger, the clue is true whatever C is.
- Use the grid: cross out a number in a letter's row when a clue rules it
  out, circle it when it is the only one left. When a number can only belong
  to one letter, it is that letter's.
- On harder puzzles, try a number for a letter and follow the clues: if they
  contradict each other, cross that number out.

Write the answers in the boxes at the bottom.

## Purpose

A compact algebra-and-logic puzzle: arithmetic facts and plain logic in one
small grid, suitable from upper primary (four letters, sums and
differences) to adults (nine letters with products and conditionals).

## History

Letter-for-number puzzles go back to the cryptarithms of the early twentieth
century; the form here — a permutation of 1 to n pinned by a list of
equations, inequalities and conditionals — is a staple of online logic-puzzle
collections and puzzle magazines.

## This implementation

- **Spec knobs:** `letters` (4–9; null picks by band: Kids 4, Easy 5,
  Medium 6, Hard 7, Expert 8), `difficulty`, `cell` (grid cell size; the
  clue text scales with it), `line`.
- **Generation:** a random permutation is drawn and true clues of the band's
  families are added while each still rules out at least one of the n!
  permutations (all of them are filtered, up to 9! = 362,880), until only
  the answer is left. The list is then trimmed to an irreducible set: a clue
  is dropped when every wrong permutation still breaks another clue.
  Families: Kids — parity, less-than, sum, difference; Easy adds "A = 2 × B"
  and three-letter sums; Medium adds "A + B = C" and products; Hard and
  Expert add the two conditionals. Up to 40 boards are tried for the band;
  a board harder than asked is eased by revealing values (`A = 3`).
- **Solving:** a sound ladder over candidate numbers per letter: (1) single
  clue — a number with no support in one clue goes, a letter with one number
  takes it, a number with one letter goes there; (2) subset — k letters
  sharing exactly k numbers; (3) trial — assume a number and follow rungs
  1–2 to a contradiction; (4) deep trial (a trial inside a trial; never
  needed by the boards made so far).
- **Rating** (`rating_basis: "hardest_rung_and_letters"`): Kids = single clue
  on 4 letters; Easy = single clue on 5+; Medium = subset; Hard = trial on
  up to 7 letters; Expert = trial on 8 or 9. Measured: minimal clue sets
  almost always need a trial, so Kids, Easy and Medium come from eased boards
  (revealed values); Expert is reached only at 8–9 letters and Kids only at
  4 — other combinations are served as the nearest band with
  `requested_difficulty`. Meta: `hardest_rung`, `rung_steps`, `clues`,
  `clue_kinds`, `answer`, `letters`.
- **Guarantees:** deterministic per seed; the answer is a permutation and
  makes every clue true; an exhaustive depth-first count over permutations
  (cap 2) proves exactly one assignment; the ladder settles every letter.
  Tests re-count with Heap's algorithm over every permutation and walk the
  app hints to the answer.
- **Play API** (`play`): `puzzle(band, seed)` / `puzzle_with(letters, band,
  seed)` → `Board` (clues, texts, answer, band, rung); marks on the letter ×
  number grid (`0` open, `1` yes, `2` no); `check` → wrong marks, broken
  clues, repeats, solved; `hint` → a mistake first, else the next sound step
  from the current marks (`only_value_left`, `only_letter_left`, `taken`,
  `clue`, `subset`, `trial`, `deep_trial`) with the cells to mark.
