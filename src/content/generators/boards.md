---
title: "Traditional Game Boards"
blurb: "Traditional game boards — morris, fox and geese, alquerque, Chinese checkers, halma, Go, hex, mancala, draughts and chess — with rules and cut-out counters, every board graph checked against the standard counts"
category: design
version: "1.0.0"
---
Print-and-play boards for the old games — morris, fox and geese, alquerque, Chinese checkers, halma, Go, hex, mancala, draughts and chess, backgammon, reversi, gomoku, the game of the goose and more — each with its rules and a sheet of counters to cut out.

## What it is

A full-page board for one of thirty traditional games, with a how-to-play
panel underneath and a second page of counters: exactly as many as the rules
call for, each sized to sit on one point, square or hole of the board. The
boards come in a wooden colourway or in black ink for printing at home.

The games: three, six, nine and twelve men's morris; fox and geese (the
33-point cross); alquerque; Chinese checkers (the 121-hole star); halma
(16 × 16 with corner camps); Go on 9, 13 and 19 lines; hex on 11, 13 and 19;
Kalah and oware; English draughts; and chess, with lettered tokens for the
pieces. Then backgammon; reversi; international (10 × 10), Canadian
(12 × 12), Russian, Brazilian and Turkish draughts; gomoku on 15 × 15
lines; hex marble push on a hexagon of 61 holes; sixteen soldiers, the
Indian board with a triangle at each end; dots and triangles, a pencil game
on a triangle of dots; and the game of the goose, a 63-square spiral race.
These later boards also print their starting position, so setting up is a
matter of covering the pieces drawn on the board.

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
- **Backgammon:** fifteen checkers each, set out as drawn. Roll two dice and
  move toward your home board; a double is played four times. Hitting a
  lone enemy checker sends it to the bar. Bear all fifteen off to win.
- **Reversi:** start with the four discs drawn in the middle. Place a disc
  so that it traps a straight line of enemy discs between it and one of
  yours, and turn the trapped discs to your colour (swap them). Most discs
  at the end wins.
- **International, Canadian, Russian and Brazilian draughts:** men move
  forward but capture backward too; kings fly any distance along a
  diagonal. International (10 × 10, 20 men), Canadian (12 × 12, 30 men) and
  Brazilian (8 × 8, 12 men) make you take the most pieces you can; Russian
  lets you choose, and a man crowned mid-capture carries on as a king.
- **Turkish draughts:** sixteen men each on the second and third rows. Men
  move and capture straight forward or sideways, never diagonally; kings
  move any distance in a straight line.
- **Gomoku:** take turns placing stones; the first to make five in a row
  across, down or diagonally wins.
- **Hex marble push:** move one, two or three marbles in a line one hole
  at a time. Two can push one and three can push one or two enemy marbles;
  push six off the edge to win.
- **Sixteen soldiers:** move along the lines and capture by jumping, as in
  alquerque; take all your opponent's soldiers to win.
- **Dots and triangles:** take turns to join two neighbouring dots. Close a
  small triangle to claim it and draw again. Most triangles wins.
- **The game of the goose:** roll two dice and race to square 63. A goose
  doubles your move; the bridge, inn, well, maze, prison and death squares
  help or hinder, as the rules under the board say. You must land on 63
  exactly.

In black ink, counters for the two sides are white and black; in Chinese
checkers and halma they are numbered to match the numbered home corners,
and the goose tokens are numbered one to six.

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
invented by Piet Hein in 1942 and again by John Nash in 1948. Backgammon's
table goes back to the Roman tabula and beyond. Reversi was played in
London in the 1880s. The 10 × 10 draughts board became standard in France
and the Low Countries in the 1700s, and its rules spread to Canada, Russia
and Brazil with local board sizes; Turkish draughts (dama) moves straight
instead of diagonally. Gomoku comes from Japan, where it was played on the
Go board. Sixteen soldiers (sholo guti) is played across Bangladesh and
eastern India on boards drawn in the dust. The game of the goose was
printed in Italy in the 1500s and became the model for the race games that
followed; its geese every nine squares and its well, maze, prison and
death are the traditional hazards.

## This implementation

- **Spec knobs:** `game` (one of `three_mens_morris`, `six_mens_morris`,
  `nine_mens_morris`, `twelve_mens_morris`, `fox_and_geese`, `alquerque`,
  `chinese_checkers`, `halma`, `go_9`, `go_13`, `go_19`, `hex_11`, `hex_13`,
  `hex_19`, `kalah`, `oware`, `draughts`, `chess`, `backgammon`, `reversi`,
  `draughts_international`, `draughts_canadian`, `draughts_russian`,
  `draughts_brazilian`, `draughts_turkish`, `gomoku_15`, `hex_marble_push`,
  `sixteen_soldiers`, `dots_and_triangles`, `game_of_the_goose`); `style`
  (`colour` — a
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
  The later boards: backgammon's 24 points in four quarters with the bar and
  a bear-off tray, numbered from the near player; reversi on plain green
  squares with its four marker dots and coordinates (64 discs of each colour,
  since a flipped disc is swapped); draughts on n × n with the near left
  corner dark (Turkish on plain squares); gomoku on the Go grid with five
  star points; hex marble push in axial coordinates |q|, |r|, |q + r| ≤ 4;
  sixteen soldiers as the alquerque lattice plus a six-point triangle beyond
  the middle of each end; dots and triangles as a triangle of ten rows; the
  goose track as a 7 × 9 spiral (63 squares exactly) from the bottom left
  corner inward, with our own icons for the goose, bridge, inn, well, maze,
  prison, death and finish squares. These boards draw their starting
  position (meta `start_pieces`). Dots and triangles has no counter page.
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
  the gap between neighbouring points. The later boards are counted the same
  way: international draughts 100 squares and 81 dark diagonal steps,
  Canadian 144 and 121, Russian and Brazilian 64 and 49, Turkish 64 squares
  and 112 straight steps; reversi 64; gomoku 225 points, 420 lines and 5
  star points; hex marble push 61 holes and 156 neighbouring pairs (6
  corners of 3 neighbours, 18 edge holes of 4, 37 inner holes of 6);
  sixteen soldiers 37 points and 76 lines (the lattice rule inside the
  square, the apex rays and cross rows in the triangles); dots and
  triangles 55 dots, 135 lines and 81 small triangles (so two players never
  tie); backgammon 24 points, six a quarter, colours alternating; the goose
  track 63 squares side by side filling the spiral, with geese on every
  square of 9 and 5 mod 9 and the hazards on 6, 19, 31, 42, 52 and 58. The
  starting position is re-derived too (`start_checked`): each side sets out
  exactly its counters, the position is the same for both sides turned half
  round, draughts men stand on every dark square of the near rows, Turkish
  men fill the second and third rows, reversi's four discs are alike on
  each diagonal, the marbles stand in rows of 5, 6 and 3, sixteen soldiers
  leaves only the middle row empty, and backgammon's 2, 5, 3 and 5 make a
  pip count of 167 a side.
