---
title: "Traditional Game Boards"
blurb: "Traditional game boards — morris, fox and geese, alquerque, Chinese checkers, halma, Go, hex, mancala, draughts and chess — with rules and cut-out counters, every board graph checked against the standard counts"
category: design
version: "1.0.0"
---
Print-and-play boards for the old games — morris, fox and geese, alquerque, Chinese checkers, halma, Go, hex, mancala, draughts and chess — each with its rules and a sheet of counters to cut out.

## What it is

A full-page board for one of eighteen traditional games, with a how-to-play
panel underneath and a second page of counters: exactly as many as the rules
call for, each sized to sit on one point, square or hole of the board. The
boards come in a wooden colourway or in black ink for printing at home.

The games: three, six, nine and twelve men's morris; fox and geese (the
33-point cross); alquerque; Chinese checkers (the 121-hole star); halma
(16 × 16 with corner camps); Go on 9, 13 and 19 lines; hex on 11, 13 and 19;
Kalah and oware; English draughts; and chess, with lettered tokens for the
pieces.

## How to use it

Print the board page and, if you want playing pieces, the counter page. Cut
out the counters along their outlines (card stock lasts longer), or use
coins, buttons or beads instead. Each board's rules are printed under it; in
short:

- **Morris (three, six, nine, twelve men's):** take turns to place your men
  on empty points, then to slide them along the lines. Three in a row along
  a line is a mill, and each new mill takes one enemy man off the board (in
  three men's morris a row of three simply wins). Bring your opponent down to
  two men, or leave them unable to move, to win.
- **Fox and geese:** one fox against thirteen geese. Both move one step along
  a line; the fox captures by jumping a goose. The geese win by trapping the
  fox; the fox wins by taking so many geese that they cannot.
- **Alquerque:** twelve pieces each, moving along the lines and capturing by
  jumping, like draughts. Capturing is compulsory and pieces never move
  backwards.
- **Chinese checkers and halma:** race all your pieces from your home corner
  to the opposite one, stepping to a neighbouring space or jumping over any
  piece, as many jumps as you like in one turn. Nothing is captured.
- **Go:** place stones on the crossings; a group with no empty crossing next
  to it is captured. Surround more of the board than your opponent.
- **Hex:** place stones on the hexes; the first to join their two edges with
  an unbroken chain wins. There are no draws.
- **Kalah and oware:** sow seeds one by one round the board anticlockwise and
  capture by where your last seed lands. Most seeds wins.
- **Draughts and chess:** the familiar games, on an 8 × 8 board with a light
  square at each player's right hand.

In black ink, counters for the two sides are white and black; in Chinese
checkers and halma they are numbered to match the numbered home corners.

## Purpose

A games-night or activity-club pack that costs a sheet of paper: a family
evening, a classroom history lesson on games older than chess, a care-home
games table, or a travel set. The rules panel means nobody needs to look them
up, and the counter sheet means nothing else is needed.

## History

Morris boards are scratched into roofing slabs at Kurna in Egypt (perhaps the oldest) and
into medieval church benches across Europe; the game was so common in England
that Shakespeare mentions "the nine men's morris" filled up with mud.
Alquerque appears in the tenth-century Kitab al-Aghani and in Alfonso X's
Libro de los juegos (1283), and is the ancestor of draughts. Fox and geese
games go back to the Norse halatafl; Queen Victoria was a keen player. Go was
played in China more than two and a half thousand years ago. Mancala games of
the Kalah and oware kind are played across Africa and the Caribbean; Kalah
itself is a 1950s American boxed version. Halma was invented by George
Howard Monks around 1883, and Chinese checkers — neither Chinese nor
checkers — was its star-shaped German offshoot, Stern-Halma (1892). Hex was
invented by Piet Hein in 1942 and again by John Nash in 1948.

## This implementation

- **Spec knobs:** `game` (one of `three_mens_morris`, `six_mens_morris`,
  `nine_mens_morris`, `twelve_mens_morris`, `fox_and_geese`, `alquerque`,
  `chinese_checkers`, `halma`, `go_9`, `go_13`, `go_19`, `hex_11`, `hex_13`,
  `hex_19`, `kalah`, `oware`, `draughts`, `chess`); `style` (`colour` — a
  wooden colourway picked by the seed — or `ink`); `rules` (print the
  how-to-play panel; without it the board fills the page); `counters` (add
  the cut-out counter page); `page` (`letter`, `a4`).
- **Generation:** each board is built as a graph from its construction —
  concentric squares for morris, a lattice with alternating diagonals for
  fox and geese and alquerque, cube coordinates for the Chinese-checkers
  star (the union of two side-13 triangles), axial coordinates for the hex
  rhombus, grids for Go, halma, draughts and chess, and a sowing ring for
  mancala — then fitted to the page above the rules panel, whose text shrinks
  only if it would otherwise take more than 42% of the page. The seed picks
  one of eight colourways and draws the wood grain behind the board. The
  counter page lays out every counter the rules need, grouped by side, at the
  board's point spacing (shrunk only if they would not fit on the page).
  Go and hex get 181 and 180 stones on 19 × 19 (one for every point), chess
  gets K, Q, R, R, B, B, N, N and eight P tokens a side, mancala 48 seeds.
- **Solving:** nothing to solve.
- **Guarantees:** `board_checked`, re-checked by a second route that uses
  only the point positions. Neighbours are re-derived by distance and the
  game's line rule and must equal the built graph; lines never cross between
  points or pass through a point; the morris mills must be exactly the
  straight three-point runs; Go's star points must be symmetric under all
  eight turns and flips and sit on the third line (9 × 9) or fourth line,
  with the centre point; the mancala ring must run anticlockwise round the
  board exactly once, through the sower's own store but never the
  opponent's; draughts and chess boards must have a dark square at each
  player's near left. The counts match the published figures: nine men's
  morris 24 points, 32 lines, 16 mills (twelve men's: 40 lines, 20 mills);
  fox and geese 33 points and 72 lines; alquerque 25 and 56; Chinese
  checkers 121 holes, 61 in the centre hexagon and 10 in each point, each
  point opposite its partner; halma 256 squares with camps of 19 and 13;
  Go n × n points and 5 or 9 star points; hex n × n cells, with 6, 4, 3 or 2
  neighbours; mancala 12 houses and 48 seeds. The counter sheet holds
  exactly the counters the rules call for (re-counted from the drawn
  sheet in the tests), and `counter_fits` says each counter is no wider than
  the gap between neighbouring points.
