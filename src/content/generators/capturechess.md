---
title: "Capture Chess"
blurb: "Capture Chess — every move a capture; finish with one piece (ranger, solo, melee rules)"
category: puzzle
version: "1.0.0"
---
A handful of chess pieces and one rule: every move must capture. Keep
capturing until only one piece is left.

## What it is

A one-player chess puzzle. A few chess pieces stand on a small board — 4×4
for beginners, up to 7×7 for the longest puzzles — all on the same side.
There is no opponent and no check or checkmate: each move is a capture, one
piece taking another exactly as it would in chess, and the puzzle is solved
when a single piece remains. Three rule sets change what is allowed: in
**Ranger** any piece may capture any other and there is exactly one way to
finish; in **Solo** each piece may capture only twice and the king can
never be taken; in **Melee** anything goes and there may be several ways.

## How to play

1. Every move is a capture: move one piece onto a square holding another
   piece and take that piece off the board. A move that does not capture is
   not allowed.
2. Pieces capture as they move in chess. A rook goes any distance up, down,
   left or right; a bishop any distance diagonally; a queen either way; a
   king one square in any direction; a knight in an L — two squares one way
   and one to the side, jumping over anything.
3. Only the knight jumps. A rook, bishop or queen captures the first piece
   it meets along a line and cannot pass through a piece to reach one
   behind it.
4. A pawn captures one square diagonally up the page (toward the top rank),
   never sideways or backwards, and it never turns into another piece.
5. Keep capturing until one piece is left. The page says how many captures
   that takes (always one fewer than the number of pieces).
6. Read the rule line on the page:
   - **Ranger:** any piece may capture any piece, as often as it can.
     There is exactly one sequence of captures that works.
   - **Solo:** each piece may capture **at most twice**. The king can never
     be captured, so when there is a king it must be the last piece
     standing.
   - **Melee:** any piece may capture any piece, as often as it can; more
     than one sequence may work.
7. Write your captures on the numbered lines, for example "R B1×B4" for the
   rook on B1 taking the piece on B4.

Tip: look for the pieces that can never be captured or can never capture —
a pawn on the top rank, a piece nobody can reach — and plan around them
first. They decide the order of everything else.

## Purpose

It teaches how each chess piece moves and captures without the burden of a
full game: no opponent, no check, just geometry. Beginners learn the moves
by using them; stronger players get a planning workout, because the order
of captures matters — take the wrong piece first and the last two pieces
end up out of each other's reach. Ranger puzzles reward careful,
step-by-step elimination; Solo adds a budget to track.

## History

Capture-only solitaire chess became widely known in the 2000s as a boxed
puzzle game: a 4×4 board, a set of chess pieces and challenge cards from
beginner to expert, each with exactly one solution. Online puzzle sites
later added daily versions, including one in which every piece may capture
only twice and the king must survive to the end. "Capture Chess", "Ranger",
"Solo" and "Melee" are our own generic labels for those rule sets.

## This implementation

- **Spec knobs:** `difficulty` (Kids 4–5 pieces, Easy 6–7, Medium 8–9,
  Hard 10–11, Expert 12–13; under Solo and Melee also a solution limit —
  Medium at most 64 capture sequences, Hard 16, Expert 4), `rules`
  (`ranger` — the default, one solution; `solo`; `melee`), `pieces` (0 =
  the band's; otherwise 4–13, at most three quarters of the board; the band
  is then rated from it), `size` (0 = by piece count: 4×4 up to 7 pieces,
  5×5 up to 9, 6×6 up to 11, 7×7 for 12–13; otherwise 4–8), `mix` (`set` —
  at most the men of one chess set: one king, one queen, two rooks, two
  bishops, two knights, eight pawns; `no_pawns` — one king, two queens and
  four each of rooks, bishops and knights), `coordinates`, `width`,
  `height`, `line`.
- **Generation:** backwards from a single piece (never a pawn). Each step
  undoes a capture: a piece on square *b* steps back to a square *a* from
  which it could have captured onto *b* (along its own line, path clear; a
  pawn from diagonally below), and a piece drawn from the remaining set
  reappears on *b*. Candidate steps are dealt round-robin by piece, with
  the piece that just stepped back last, so lines change hands rather than
  being one long chain. Pawns are drawn a third as often as other men and
  never stand on the first or last rank; under Solo no piece is given a
  third capture and a king can only be the last piece. Every intermediate
  board is itself a start position, so after each step the forward count
  is re-run and the step kept only if the board stays within the band's
  solution limit (exactly one for Ranger). The walk is a depth-first
  search with backtracking (at most 2000 forward counts per walk, 16,000
  and 12 million positions per board, up to 200 walks); the largest board
  reached is served.
- **Solving:** a memoised depth-first count of capture sequences (two
  sequences differ if any capture or the order differs), stopped at a cap
  (2 for Ranger) and a node budget. A count that runs out of budget is
  unknown — the step is rejected, never read as unique. For the app, a
  depth-first search with dead positions remembered finds a line from any
  position or proves there is none.
- **Guarantees:** Ranger boards have exactly one solution sequence
  (`unique: true`); Solo and Melee boards are solvable (`solvable: true`)
  with the exact number of sequences in `solutions` (`solutions_capped`
  when the count stopped at 100,000). Tests re-count the solutions with an
  independent solver written from the rules alone (letters on a grid, no
  memo), replay the printed line under those rules, and check legality:
  pawns off the first and last ranks, no more men than the mix allows, at
  most one king, and under Solo no piece capturing more than twice with a
  king last. Rated by piece count, then one band easier while the
  solution count is over the band's limit (`rating_basis:
  pieces_and_solutions`). When the hardest requests (Expert under Solo, or
  many pieces on a small board) run out of search before reaching their
  piece count, the largest board found is served at its own band with
  `requested_difficulty` (and `requested_pieces` / `requested_size` for
  explicit counts that were clamped or not reached).
