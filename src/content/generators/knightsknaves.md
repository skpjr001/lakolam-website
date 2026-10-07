---
title: "Knights and Knaves"
blurb: "Knights and Knaves — truth-tellers and liars; work out who is which from what they say"
category: puzzle
version: "1.0.0"
---
Knights always tell the truth, knaves always lie — work out who is who from
what they say.

## What it is

On a strange island every inhabitant is either a knight or a knave. Knights
only ever say true things; knaves only ever say false things. You meet a
few islanders, and each one makes a single statement about the others —
or about the whole group. Exactly one way of sorting them into knights and
knaves fits everything that was said.

## How to play

1. Every islander is a knight (always tells the truth) or a knave (always
   lies).
2. Read each statement. If the speaker is a knight, it is true; if the
   speaker is a knave, it is false.
3. Mark each islander as a knight or a knave so that every statement works
   out. "Us" means everyone on the page, the speaker included.

Try a statement both ways: suppose the speaker is a knight and see what
follows, then suppose a knave. Some statements settle things on their own
— if Ben says "Ada is a different kind from me", then whatever Ben is, Ada
must be a knave. On harder puzzles, suppose one islander is a knight and
follow the consequences until something contradicts; then that islander
must be a knave.

## Purpose

A pure reasoning puzzle with no grid at all: it trains careful reading,
"what if" thinking and the logic of *and*, *or*, *if… then* and counting,
the same ideas taught in a first logic course. It fills a gap in the
catalogue beside the logic-grid puzzles as the one genre made only of
words.

## History

Raymond Smullyan introduced the island of knights and knaves in *What Is
the Name of This Book?* (1978), building on far older truth-teller and liar
riddles; the idea runs through his later books and through the famous
"hardest logic puzzle ever". Puzzles of this kind are now a fixture of
logic courses, brain-teaser books and puzzle magazines.

## This implementation

- **Spec knobs:** `difficulty`; `speakers` (2–8, 0 = picked from the
  difficulty: 3 Kids, 4 Easy, 5 Medium, 6 Hard, 8 Expert); `width` (page
  width in points); `text` (body text size). The statements a band may use
  grow with it: Kids hears "X is a knight/knave" and "same/different kind";
  Easy adds "both" and "at least one of"; Medium adds counts ("exactly two
  of us are knights"); Hard and Expert add "if… then".
- **Generation:** answer first. A random line-up (with both kinds present
  from three islanders up) and, for each islander, a random statement from
  the band's grammar that is true exactly when the speaker is a knight.
  Local search then swaps one statement at a time — the best of six
  candidates — towards exactly one fitting line-up and the requested rung.
- **Solving:** a yes/no engine with one variable per islander. Rungs: *one
  statement* (what a single statement forces, whatever its speaker is) and
  *case split* (suppose one islander's kind, follow single-statement
  reasoning, and strike the supposition on a contradiction; one level deep,
  never a search). Puzzles that need more than one case split are not
  used.
- **Guarantees:** deterministic per seed; uniqueness is proven by checking
  every one of the `2^n` line-ups (at most 256). Every speaker's statement
  is true exactly when the speaker is a knight (tested), and tests read
  every printed sentence back with a separate parser and confirm it means
  the statement checked. All text is in the stroke font. Rated by the
  hardest rung and the number of islanders: one-statement reasoning is
  Kids up to 3, Easy at 4 and Medium above; a case split is Medium up to 4,
  Hard up to 6 and Expert above. A count that cannot reach the requested
  band is rated honestly at the nearest, with `requested_difficulty` in
  meta.
