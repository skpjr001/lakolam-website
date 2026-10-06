---
title: "Matchstick Equations"
blurb: "Matchstick Equations — move, add or take away one match to make the equation true"
category: maths
version: "1.0.0"
---
Each equation made of matches is wrong - move one match to put it right.

## What it is

A classic party and puzzle-book teaser. Every equation on the page is laid
out in matches: digits in the seven-stroke shapes of a digital clock, a plus
sign of two matches crossed, a minus sign of one, an equals sign of two. As
laid out, each equation is false. Change one match and it becomes true -
and there is only one way to do it.

## How to play

- Look at the equation and find the single match to move.
- A match can move to any empty place in any digit, or become the upright
  of a plus sign (turning a minus into a plus). Taking the upright from a
  plus sign turns it into a minus.
- The equals sign stays exactly as it is.
- After the move every digit must still be a proper digit, in the shapes
  used on the page. The 6 and the 9 have their tails, and the 7 has three
  matches.
- A number may not start with 0.
- Some pages ask you to add one match from the box, or to take one away,
  instead of moving one. Each puzzle tells you which.
- Draw the true equation on the line underneath.

Try each digit in turn: which digits can it become by gaining, losing or
moving a match? A 9 becomes 8 by gaining a match, 3 by losing one and 6
by moving one; a minus becomes a plus by gaining one.

## Purpose

Number sense with a twist of lateral thinking: recognising digit shapes,
checking sums quickly, and searching systematically through small changes.
Good for warm-ups, brain-training books and classroom challenges.

## History

Matchstick puzzles were popular parlour amusements in the nineteenth and
early twentieth centuries, when every household had a box of matches;
puzzle writers such as Sam Loyd and Henry Dudeney published geometric
matchstick problems. Equations made in seven-stroke digits followed the
spread of digital clocks and calculators, and they remain a favourite of
puzzle books, party games and online brain teasers.

## This implementation

**Spec knobs:** `difficulty`; `change` (`move`, `add`, `remove`, or `mixed`,
which cycles the three and labels each puzzle); `count` (1-8 puzzles, one
per row); page `width`/`height`; `line`.

**Generation:** a true equation of the band's shape is drawn - Kids two
one-digit numbers with a one-digit answer; Easy the same with answers up
to 18; Medium one two-digit number; Hard two two-digit numbers; Expert two
two-digit numbers or three one-digit numbers - always with + or -, never a
negative answer. The inverse change (a move, or taking away a match for an
"add" puzzle) is applied at random to give a well-formed false equation,
which is kept only when exactly one change of the puzzle's kind makes it
true. No page repeats a start or an answer.

**Solving:** every single-match change is enumerated: each lit place to
each empty place (the seven strokes of every digit and the upright of the
operator) for a move, each empty place for an add, each lit place for a
take-away. A result is well-formed when every digit slot shows a digit, no
number starts with 0, and the operator is + or -; it is a fix when it is
also true. Difficulty is rated by how many well-formed changes there are to
check - the search a careful solver makes: for a move up to 6 Kids, 12 Easy,
20 Medium, 32 Hard, more Expert; for adding or taking away one match (far
fewer options) up to 2, 4, 6, 8 and more (`rating_basis`:
`well_formed_single_match_changes`). The shape steers the band, but the
band printed is the rating. Expert is rarest for "add" and "take away"
puzzles; when the attempt budget runs out the nearest band is printed and
labelled, with `requested_difficulty` in meta.

**Guarantees:** deterministic per seed; every start is a well-formed false
equation with exactly one fix of its kind, proven by full enumeration in the
generator and re-proven in tests by an independent model that names each
stroke and rewrites the equation as text; the key shows the fixed equation
with the moved match highlighted and the place it came from outlined.
