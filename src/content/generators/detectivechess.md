---
title: "Detective Chess"
blurb: "Detective Chess — place the given pieces so every number counts the pieces attacking its square"
category: puzzle
version: "1.0.0"
---
Find where each chess piece stands. The numbers show how many pieces attack each square.

## What it is

The chess pieces shown under the board all stand somewhere on it. A number
in a circle tells you how many of those pieces attack that square. Number
squares never hold a piece. On the easier boards a cross marks every square
that holds a piece, so the question is which piece goes where. On the harder
boards there are no crosses, and any square without a number might hold a
piece. Exactly one placement fits.

## How to play

Draw each piece on its square. A piece attacks the way it moves in chess:

- the **king** attacks the eight squares around it;
- the **rook** attacks along its row and column;
- the **bishop** attacks along its diagonals;
- the **queen** attacks like a rook and a bishop together;
- the **knight** attacks the squares an L-shaped jump away (two squares one
  way, then one to the side), and jumps over anything in between.

A rook, bishop or queen stops at the first piece in its way. It attacks
that piece's square but nothing beyond it. Numbers never block, because
number squares are empty. All the pieces count the same, whatever their
colour.

Begin with the zeros. Nothing can attack a 0 square, so no rook can share its
row or column without something blocking, no knight can be a jump away, and
so on. Then look for a number that only one of the marked squares could
possibly reach.

## Purpose

A logic puzzle for people who know chess and a gentle way into it for people
who don't. It needs counting but no arithmetic, and it pairs naturally with
the chess maze. The marked boards make a short, friendly puzzle. The unmarked
ones are a real search.

## History

Puzzles that ask where pieces stand, given how many attack each square, go
back to the chess-puzzle tradition of Martin Gardner's columns. As a genre,
"Detective Chess" is credited to the Argentine puzzle maker Jaime Poniachik.
Otto Janko's archive holds about 240 of them under the German name
*Detektivschach*. Most use the marked form, where crosses show the piece
squares.

## This implementation

- **Spec knobs:** `difficulty` (sets the board, pieces and marking for any
  of those left null: kids is 5×5 with king, rook and knight, marked; easy is
  6×6 with five pieces, marked; medium is 8×8 with eight pieces, marked; hard
  is 6×6 with five pieces, unmarked; expert is 8×8 with six pieces,
  unmarked), `size` (5–8), `pieces` (2–8, taken in the order king, rook,
  knight, queen, bishop, rook, bishop, knight), `marked`, `cell`, `line`.
- **Generation:** the pieces are put on random squares and every other
  square is numbered with its attack count. If those numbers already allow a
  second placement, the board is redrawn. Numbers are then removed in random
  order as long as the placement stays unique, so every number left is
  needed.
- **Solving:** an exhaustive count, capped at 2, over the candidate squares
  in a fixed order. Each square is either left empty or given a piece type
  that still has to be placed, so equal pieces are never told apart and no
  arrangement is counted twice. At every node each number is checked against
  two bounds. The lower bound counts attacks that nothing still undecided can
  block. The upper bound adds attacks that a later piece might still block,
  plus every piece still to come that could reach the square from an
  undecided square. A count that spends its node budget counts as ambiguous,
  never unique.
- **Guarantees:** deterministic per seed. Every number is its square's attack
  count, found by walking each piece's moves on the finished board. No number
  stands on a piece, and the placement is the only one. Tests check
  uniqueness again by brute force over every placement on the marked boards
  and on small unmarked ones, and check that every number is needed. Rated by
  board size, piece count and marking (`rating_basis:
  board_pieces_and_marking`): five or more pieces, then eight pieces or an
  8×8 board, each add a band, and unmarked squares add two. Every band is
  reached by its own plan.
