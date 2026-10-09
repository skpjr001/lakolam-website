---
title: "Dots and Boxes"
blurb: "Dots and boxes — one to six game fields of evenly spaced dots, with score boxes for two players"
category: paper
version: "1.0.0"
---
Game sheets for dots and boxes — one to six fields of evenly spaced dots to a
page, each with score boxes for two players.

## What it is

Dots and boxes is a pencil-and-paper game for two players played on a
rectangle of dots. Each sheet here holds one, two, four or six games, every
one a field of 3 × 3 up to 12 × 12 dots (a field of 6 × 6 dots makes a game
of 5 × 5 boxes). Each game sits in a light frame headed GAME 1, GAME 2 …,
with two score boxes, PLAYER 1 and PLAYER 2, underneath. All the dots on a
page are the same distance apart, across and down.

The field can start blank (the usual "American" board), with its whole
border already drawn (a "Swedish" board) or with only the left and bottom
edges drawn (an "Icelandic" board).

## How to use it

Write your names in the score boxes. Take turns joining two dots that sit
next to each other, across or down, with one short line. Whoever draws the
fourth side of a box writes their initial inside it, scores one point and
must draw another line straight away. When every line has been drawn, the
player with more boxes wins. Keep a tally in your score box as you go.

On a Swedish or Icelandic board the printed border lines count as already
drawn. A small field (3 × 3 dots) is good for learning; 6 × 6 dots
(5 × 5 boxes) is long enough to be challenging and short enough for a quick
game. A good tip: try not to draw the third side of a box, because your
opponent will take it — and the player who first has to open a long chain
of boxes usually loses.

## Purpose

A quiet game for two that needs nothing but a pencil — for classrooms, wet
playtimes, travel, restaurants and waiting rooms, and a gentle way into
strategy and counting. Teachers use it to talk about planning ahead, and the
game rewards real mathematical thinking: chains, parity and the
"double-cross" sacrifice. In a book, a few pages of dots and boxes make a
travel or activity book section.

## History

The French mathematician Édouard Lucas described the game in the late
19th century as "la pipopipette", crediting students of the École
Polytechnique with its invention. It has since gone by many names — boxes,
dots and dashes, pigs in a pen. Elwyn Berlekamp, John Conway and Richard Guy
analysed it in *Winning Ways for your Mathematical Plays* (1982), and
Berlekamp's *The Dots-and-Boxes Game: Sophisticated Child's Play* (2000)
recommends the 5 × 5-box board as big enough to be challenging yet short
enough to finish. The names "Swedish", "American" and "Icelandic" board for
which edges start drawn come from this literature.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `games` (one, two, four,
  six; default four); `dots_across` and `dots_down` (3–12, default 6);
  `spacing_mm` (0–30; 0, the default, picks the largest whole tenth of a
  millimetre that fits, up to 20 mm); `dot_mm` (dot diameter, 0.5–4,
  default 1.6); `board` (american, swedish, icelandic); `scores` (score
  boxes on or off); `ink` (default charcoal); `weight` (0.25–3 pt, for
  drawn edges and score boxes).
- **Generation:** the content box is split into equal cells — one column
  for one or two games, two by two for four, two by three for six, turned
  on its side when the sheet is landscape — with a 6 mm gutter. Each cell
  has a light frame, a heading and, centred inside, the dot field and its
  score boxes. One spacing serves every game on the page; a requested
  spacing too big to fit is reduced to the largest that does, and the
  request recorded.
- **Solving:** nothing to solve — a page to play on. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** every game has exactly the asked number of dots, on a
  square lattice whose gaps all equal the spacing (to 1e-9 pt); dots are at
  most 40 % of the gap (a bigger dot is shrunk and the request recorded), so
  lines can always be drawn between them; games never overlap; labels sit
  inside their score boxes; and all ink — stroke widths included — stays
  inside the margins, checked on every page size, orientation, game count
  and field size. A knob outside its range is clamped and the request
  recorded as `requested_<field>` in the meta.
