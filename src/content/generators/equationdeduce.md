---
title: "Equation Deduce"
blurb: "Equation Deduce — find the hidden equation from guesses shaded right spot / wrong spot / absent"
category: maths
version: "1.1.0"
---
Find the hidden equation from a few shaded guesses.

## What it is

A deduction puzzle with arithmetic. Each puzzle hides an equation of six,
seven or eight tiles, such as 12+35=47 or 9×8-6=66. Above the empty answer
row are guesses that have already been tried. Each tile of a guess is
shaded: solid dark if that symbol is in the right spot, striped if it is in
the equation but in a different spot, plain if it is not in the equation at
all. Exactly one equation fits every guess.

## How to play

- Every tile holds one digit, one of + - × ÷, or the = sign.
- The hidden equation has exactly one = sign. On its left is a calculation;
  on its right is a single whole number.
- Work × and ÷ before + and -, left to right. Every division comes out
  exact, and the calculation must really equal the number on the right.
- No number starts with 0, and a 0 standing alone can only be the answer on
  the right.
- **Dark tile:** the right symbol in the right spot.
- **Striped tile:** the symbol is in the equation, but somewhere else.
- **Plain tile:** the symbol is not in the equation - or, if the same symbol
  is dark or striped elsewhere in that guess, the equation has no more
  copies of it than those.
- Write the hidden equation in the empty row.

Start with the dark tiles, then strike every plain symbol from your
options. Where does the = sign go? That tells you how long the answer is.
Then try numbers that use the striped symbols in new spots, and check the
arithmetic - the arithmetic rules out most of what the shading allows.

## Purpose

Arithmetic fluency and logical deduction together: order of operations,
place value and estimation are the tools for ruling out candidates. A
printable alternative to the online daily equation games for classrooms,
puzzle books and anyone who enjoys them.

## History

Wordle, by Josh Wardle, became a worldwide daily habit in early 2022, and
equation versions followed within weeks; Nerdle, created by Richard
Mann with his family, is the best known. Its scoring goes back to the
much older code-breaking games: Bulls and Cows, played with pencil and
paper for generations, and Mordecai Meirowitz's Mastermind (1970).

## This implementation

**Spec knobs:** `difficulty`; `length` (6, 7 or 8 tiles; other values are
clamped to the nearest, since v1.1.0 — they used to be rejected); `count` (1-4,
clamped; one column for one or two, two columns for more); page
`width`/`height`; `line`.

**Generation:** every valid equation of the length is enumerated once
(206 of six tiles, 6,567 of seven, 17,447 of eight) by building the left
side number by number with exact precedence-aware evaluation, keeping it
only when its value has the right number of digits for the right side.
A secret is drawn; guesses are valid equations, the first at random, later
ones chosen among sixteen proposals (half drawn from the equations still
possible, as a player would guess) that each rule out at least one more
candidate. Easier levels prefer the most informative guess with the most
right-spot tiles; harder levels prefer guesses with few right-spot tiles.
Once one equation is left, every guess the answer does not need is removed,
so each printed guess is necessary. At most six guesses are printed.

**Solving:** uniqueness is exhaustive - every valid equation is scored
against every guess and exactly one survives. Difficulty is rated by the
letter sheet a solver keeps: a dark tile fixes its spot, a striped or plain
tile strikes its symbol from its own spot, and a symbol with no dark or
striped tile in a guess is struck from every spot not yet fixed. The number
of valid equations still allowed by the sheet is what the solver must
search with arithmetic and the symbol counts: 1-4 Kids, 5-12 Easy, 13-40
Medium, 41-150 Hard, more Expert. The page reports its hardest puzzle;
meta keeps each puzzle's equation, guesses, marks and sheet count
(`rating_basis`: `equations_left_after_letter_sheet`). Six-tile puzzles
have too few equations to reach Expert (and rarely Hard): those requests get
the nearest band, labelled as such with `requested_difficulty` in meta.
Expert is rare at every length; when the attempt budget runs out the
nearest band is printed and labelled.

**Guarantees:** deterministic per seed; every secret and guess is a valid
equation; every puzzle has exactly one answer among all valid equations of
its length, re-proven in tests by an independent string evaluator and
scorer; the six-tile enumeration is re-proven complete by checking every
string of six symbols; every printed guess is necessary; ratings are
recomputed from the guesses alone.
