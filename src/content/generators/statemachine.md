---
title: "State Machines"
blurb: "Finite-state machines and regular expressions — trace a drawn state diagram, accept or reject inputs, complete its transition table, Mealy machine outputs, and which strings match a(b|c)*d, every answer re-run on the drawing"
category: maths
version: "1.0.0"
---
Trace a drawn finite-state machine and test strings against regular expressions — every answer re-run on the drawing.

## What it is

A computing worksheet built around a state-transition diagram: three to
five states in a row, an arrow marking the start state, accepting states
drawn as double circles, and labelled arrows, arcs and loops for every
transition. Questions ask whether the machine accepts an input, which
state it ends in, which inputs from a list it accepts, and for the
missing cells of its transition table. A Mealy-machine page labels every
arrow input/output and asks what the machine outputs. Regular-expression
questions ask you to circle the strings that match an expression such as
`a(b|c)*d`, or to pick which of four expressions matches a string. Inputs
use 0 and 1, or letters. The answer key writes every answer, fills the
table and rings each matching string.

## How to play

1. Start in S0, where the start arrow points.
2. Read the input one symbol at a time, left to right. From the state you
   are in, follow the arrow labelled with that symbol to the next state
   (an arrow labelled 0,1 is taken on either symbol; a loop keeps you
   where you are).
3. When the input runs out, the machine accepts if you are on a double
   circle, and rejects otherwise.
4. A transition table lists, for each state and each input symbol, the
   state the arrow leads to.
5. On a Mealy machine each arrow reads input/output: write down the
   output of every arrow you follow, in order, to get the output string.
6. In a regular expression, `x*` means zero or more x, `x+` one or more,
   `x?` x or nothing, `x|y` either x or y, and brackets group. A string
   matches only if the whole string fits the expression, from first
   letter to last.

## Purpose

Finite-state machines and regular languages are specified content of
AQA A-level Computer Science (4.4.1 and 4.4.2) and OCR A-level, and the
first chapter of every theory-of-computation course. Tracing a machine by
hand builds the precise, symbol-by-symbol reading that compilers, network
protocols, text search and user-interface logic all rely on, and
matching strings against an expression is the everyday skill behind
search-and-replace and input validation.

## History

Warren McCulloch and Walter Pitts modelled neurons as finite automata in
1943. Stephen Kleene introduced regular expressions in 1951 to describe
what such networks can recognise, and proved that the two describe
exactly the same languages. George Mealy (1955) and Edward Moore (1956)
defined machines that produce output, and Michael Rabin and Dana Scott's
1959 paper on nondeterministic automata won the Turing Award. Ken
Thompson put regular expressions into the QED and ed text editors in
1968, with the NFA construction that bears his name, and from there into
grep and almost every programming language.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `fsm`, `regex` — no
  machine is drawn — and `mealy`); `alphabet` (`binary`: machines read 0
  and 1, expressions use 0 and 1; `letters`: machines read a and b,
  expressions use a, b, c and d); `count` (3-8, clamped and recorded as
  `requested_count`); `width`, `height`, `line`.
- **Generation:** a random complete deterministic machine is drawn —
  3 states at Easy, 4 at Medium and Hard, 5 at Expert (one fewer for
  Mealy machines) — and kept only if every state is reachable from S0,
  at most one state is a dead end that loops on both symbols, between a
  fifth and four fifths of the inputs up to five symbols long are
  accepted (a Mealy machine must output both 0 and 1), and its drawing is
  clear: no label touches a state, another label or another arrow, and no
  arrow passes through a state it does not join. Arrows to the right arc
  above the row, arrows to the left below it, and a loop sits on the less
  busy side. Inputs are 3-4 symbols long at Easy, 4-5 at Medium, 5-6 at
  Hard and 6-8 at Expert; accept/reject answers are balanced between yes
  and no. Tables blank 2 cells at Easy up to 5 at Expert. Expressions
  come from shapes by level: one operator at Easy (`ab*c`, `a+b`,
  `a(b|c)`), a starred or repeated group at Medium (`a(b|c)*d`, `(ab)+c`),
  two operators at Hard and nested groups at Expert. Lists to circle have
  five strings, two or three matching, the rest near misses (one letter
  changed, added or removed). "Which expression" options are the right
  one and three one-change variants that do not match the string.
  "Circle the accepted inputs" and "which expression" start at Medium.
  Kids is served as Easy.
- **Solving:** machine answers are recomputed by a second simulator that
  reads the drawn arrows' labels back into transitions (which also proves
  the drawing has exactly one arrow per state and symbol); the generator
  uses the transition table. Expression answers are recomputed by a
  Thompson NFA compiled from the printed text, independent of the
  generator's tree matcher; tests also compare the two on every string up
  to seven symbols.
- **Guarantees:** every printed answer is correct for the drawn machine
  or printed expression (meta `answers_checked`); in a "which expression"
  question exactly one of the four distinct expressions matches the
  string; every circling list has at least one string to circle and one
  to leave; questions on a page are all different.
