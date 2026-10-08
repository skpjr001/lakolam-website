---
title: "Lights Out"
blurb: "Lights Out — shade the presses that switch every lamp off; the press set proven unique by GF(2) elimination"
category: puzzle
version: "1.0.0"
---
Press the right lamps and every light on the board goes dark.

## What it is

A square board of lamps, some of them lit. Pressing a lamp switches it and
its neighbours: on becomes off, off becomes on. Find the set of lamps to press
so that every lamp ends up off. Some boards print a few marks — a black square
for a lamp that must be pressed, a cross for one that must not — and with
them there is exactly one answer.

## How to play

Shade every lamp you would press. Pressing a lamp switches it and the lamps
right next to it — above, below, left and right in the classic game. Pressing
the same lamp twice changes nothing, and the order of presses does not
matter, so each lamp is either pressed once or not at all. When you are done,
every lamp must have been switched an odd number of times if it started lit,
and an even number of times (or never) if it started dark.

A good way in: work down the board row by row. Once the top row's presses
are decided, each lit lamp in a row can only be switched off by pressing the
lamp directly below it — so the rows below follow one by one. Then check that
the bottom row comes out dark, and adjust the top row if it does not.

Some boards change the rule: a press may switch the four diagonal
neighbours instead, or all eight surrounding lamps, and on a wrapping board
the neighbours carry on across the edges to the far side.

## Purpose

A one-sentence rule with a satisfying "everything goes dark" finish, for
kids' packs (3×3) through to adult logic books (7×7 and the variants). It is
the catalogue's parity puzzle: the only page where doing something twice is
the same as not doing it.

## History

Lights Out was sold as a handheld electronic game by Tiger Electronics in
1995, a descendant of the XL25 (Vulcan, 1983) and Merlin's "Magic Square"
(Parker Brothers, 1978). Its mathematics — a linear system over the field of
two elements — was worked out by Anderson and Feil (*Turning Lights Out with
Linear Algebra*, 1998), who showed that the 5×5 board has a two-dimensional
space of "quiet" press patterns. Simon Tatham's puzzle collection carries it
as *Flip*.

## This implementation

- **Spec knobs:** `difficulty` (sizes the board when `size` is null),
  `size` (3–10), `rule` (`plus` classic, `cross` diagonals, `star` all eight),
  `wrap` (a torus board), `colour` (yellow lamps or grey for black-and-white
  printing), `cell`, `line`.
- **Generation:** a random press set of a third to a half of the board is
  chosen and the lit lamps are computed from it. The toggle matrix's null
  space (the press patterns that change nothing) is computed by Gaussian
  elimination over GF(2); when it is not trivial — 4×4 has dimension 4, 5×5
  has 2 — exactly that many cells are marked, each chosen so its column of
  null-vector bits is independent of the marks so far. The marks show the
  answer's value there, so they pin every quiet pattern and nothing more.
- **Solving:** elimination over GF(2) on the lamp equations plus one unit row
  per mark recovers the press set; full rank proves it is the only one.
- **Guarantees:** deterministic per seed; the press set, simulated press by
  press, switches every lamp off and agrees with every mark; the system has a
  left inverse, which `obeys()` checks by plain row sums (a certificate that
  shares nothing with the elimination); tests also count answers by a direct
  row-by-row search over the presses on boards up to 7×7, and check that every
  mark is needed. Rated by board size with one band added for a variant rule
  and one for wrapping (`rating_basis: board_size_and_rule`); the requested
  band picks the size, so every band is reachable with the classic rule. A
  wrapping `star` board starts at 4×4: on a 3×3 torus every star press
  switches all nine lamps.
