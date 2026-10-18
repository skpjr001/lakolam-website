---
title: "Tic-Tac-Toe"
blurb: "Tic-tac-toe sheets to play on (3x3, 4x4, 5x5, ultimate) and X-to-play-and-win puzzles with one minimax-proven winning move"
category: design
version: "1.1.0"
---
Sheets of boards for the game everyone knows, and puzzles where exactly one
move wins.

## What it is

Two kinds of page. A play sheet holds 1 to 20 blank boards to play on:
the classic 3×3, a 4×4 or 5×5 board where you need four in a row, or
ultimate tic-tac-toe (nine small boards inside a big one). It has a title,
a one-line rule and a score tally. A puzzle sheet holds positions from real
games — on the classic, 4×4, 5×5 or ultimate board — each with one side to
play and exactly one move that wins, with an answer key.

## How to play

Two players take turns. X goes first and draws an X in an empty square; O
then draws an O; and so on. On the 3×3 board the first player to get three
marks in a row (across, down or corner to corner) wins. On the 4×4 and 5×5
boards you need four in a row. If every square is filled and nobody has a
line, the game is a draw. Mark the winner on the tally under the board and
start the next one, letting the loser go first.

**Ultimate tic-tac-toe.** Each square of the big board is a small board. X
starts anywhere. After that, the square you play in, inside its small
board, sends your opponent to the matching small board of the big one:
play in the top-right square of a small board and your opponent must play
somewhere in the top-right small board. Win a small board with three in a
row and it is yours. If you are sent to a small board that is won or full,
you may play in any small board. Win three small boards in a row to win
the game.

**Puzzles.** Each puzzle says who is to play (X or O) and how many of your
moves the win takes. Find the one square that wins whatever the other
player does. "Win in 1" means you can complete a line now (look out: the
other player may also be one away). "Win in 2" means your move makes two
threats at once — a fork — so the other player can block only one, and
you win next move. "Win in 3" or more means your move starts a chain of
threats that ends in a win, however the other player replies. Columns are
lettered A, B, C… from the left and rows numbered from the top, so the
answer key names each winning square like B2.

**Ultimate puzzles.** The shaded small board is where the player to move
must play (when several are shaded, any of them will do). A small board
already won is closed and shown under a large faint mark; nobody plays in
it again. Remember that the square you choose sends your opponent to the
matching small board: the winning move often wins a small board *and*
sends the other player somewhere harmless. On the ultimate board the
columns run A to I and the rows 1 to 9 across the whole big board.

## Purpose

A rainy-day sheet for families and classrooms: a page of boards saves
drawing grids, and the tally keeps a match going. The puzzles teach the
two ideas that make the game interesting — take a win when you see one,
and make two threats at once — and the larger boards stretch older
players.

## History

Three-in-a-row games are very old: boards for them are scratched into
Roman roofing tiles and buildings, and the game was known in England as
noughts and crosses by the nineteenth century. In 1952 OXO, a tic-tac-toe
program for the EDSAC computer in Cambridge, became one of the first video
games. With perfect play the 3×3 game is a draw, which is why the puzzles
here come from positions where someone has already slipped. Ultimate
tic-tac-toe, with its "send your opponent" rule, became popular in the
2010s as a version even adults find hard.

## This implementation

- **Spec knobs:** `mode` (`play` default, or `puzzles`), `board`
  (`classic`, `four_by_four`, `five_by_five`, `ultimate`), `boards` (1-20;
  out-of-range counts are clamped and reported as `requested_boards`),
  `style` (`hand_drawn` default, a steady wobble that is the same on every
  page, or `clean`), `ink` (`colour`: navy lines, blue X, orange O; or
  `black`), `tally` (`per_board`, `per_page`, `none`; play mode), `rule`
  (print the one-line rule), `title` (empty uses the board's name), `page`
  (`letter`, `a4`), and for puzzles `difficulty` and `side` (`either`, `x`,
  `o`). Puzzles on the `ultimate` board are ultimate puzzles (since
  version 1.1.0; version 1.0 served them on the classic board with
  `requested_board` — the one change of output in 1.1.0; every other
  page is byte-identical). `difficulty` and `side` have no effect on a play sheet, and `tally`
  none on a puzzle sheet.
- **Generation:** a play sheet is a pure function of the spec: the seed is
  not used (the hand-drawn wobble comes from a fixed stream). Boards are
  laid out 1×1 to 4×5 inside 40 pt margins, each as its inner lines (the
  familiar `#`); ultimate draws four heavy lines and a small `#` inset in
  each of the nine regions. For puzzles, all 4,520 classic positions still
  in play (5,478 legal positions less the 958 finished games) are solved
  once; the sheet draws from those in its band, in seed order, preferring
  shapes that differ under rotation and reflection. The classic Hard band
  has only nine such shapes (four with X to play, five with O), so a sheet
  of more than that repeats a shape in a turned or mirrored form, never the
  same position. Ultimate: seeded random games are played to the end
  (taking a small board when one can be taken half the time, so games
  reach big-board tactics); from games someone won, the positions 1, 3, 5
  plies before the end with the eventual winner to move are proven, and
  kept when exactly one move wins at the least depth. On 4×4 and 5×5,
  random games are played (nobody completing
  a line) to a number of marks suited to the band, and each position is
  solved and kept when it has one winning move in the band; no two
  positions on a sheet share a shape.
- **Solving:** an exact AND/OR search over every reply — a side wins if
  some move completes a line or leaves the opponent with only losing
  replies — memoised by position, with one sound shortcut: a side that
  cannot win at once and faces a single threat must block it (two threats
  lose). Each search has a node budget (400,000); a position whose search
  runs out is ambiguous and never used. The winning move's depth is found by
  the same search bounded to 3, 5, 7… plies.
- **Difficulty:** rated by the solver's own moves the fastest forced win
  takes against best defence (`rating_basis`: plies to a forced win,
  minimax-proven): Kids — win in 1, the other side has no threat; Easy —
  win in 1 while the other side also threatens; Medium — win in 2 (a fork);
  Hard — win in 3; Expert — win in 4 or more. The 3×3 game holds no forced
  win longer than three moves, and on 4×4 a four-move win with a single
  winning move turned up in about one random eight-mark position in 1,500, too rare
  to fill a sheet, so on those boards Expert is served as Hard with
  `requested_difficulty`. The 5×5 board serves every band. Ultimate serves
  every band, Kids to Expert (win in 1 to 4).
  Ultimate meta carries `winning_moves: 1` and `rating_basis: "win_depth"`,
  and per puzzle the marks (`x`, `o` as 81-bit hex, cell = board × 9 +
  square), `next_board`, the move and the main line.
- **Ultimate rules and proof:** won and full small boards are closed;
  sent to a closed board, a player may play in any open one; three won
  boards in a row win; no move left is a draw. Each position is proven by
  `lako_gametree::prove_win_in` (an AND/OR search with a transposition
  table; 300,000 nodes per position, running out rejects it): exactly one
  first move wins in N own moves and none wins in fewer.
- **Guarantees:** every puzzle is legal (X has as many marks as O or one
  more, the right side is to play, no line is complete, so it is reachable
  in a real game) and has exactly one winning move, at the stated depth,
  in the stated band — ultimate puzzles are reachable (they come from
  played games) — re-checked in tests by an independent exact
  negamax with no shortcuts, for 3×3 by a table-free minimax over every
  position, and for ultimate by a plain AND/OR search with no table. Play sheets carry `boards_checked`: the tests check the board
  count, the line count per board (4, 6, 8 or 40), that the lines split
  each board into equal parts, that boards never overlap, and that all ink
  lies on the page for every combination of options. Deterministic per
  seed; puzzle sheets differ between seeds. The answer key marks each
  winning square and names it.
