---
title: "Magic Lines"
blurb: "Magic lines: Claude Bragdon's ornament from the path 1, 2, 3 … through a proven magic square, as ribbons, interlace and rosettes"
category: design
version: "1.0.0"
---
Ornament from a magic square: join the numbers 1, 2, 3 … in order and the
path becomes a pattern, as Claude Bragdon drew it in 1915.

## What it is

A magic square holds the numbers 1 to n² so that every row, every column and
both long diagonals add up to the same total. Draw a line from the cell that
holds 1 to the cell that holds 2, then to 3, and on to the last number, and
you get the square's *magic line*. Because a magic square is so tightly
balanced, its line is never a scribble: it zig-zags in regular steps, jumps
across the square in long parallel strokes and folds back on itself in a
rhythm set by the way the square was built. Repeated four times — reflected
like a tile or turned round a centre — the line becomes a rosette, a
wallpaper or a border.

The page shows the line as a coloured ribbon that shades from the first
number to the last, as a two-tone strap that weaves over and under itself,
as a single black line, or over the numbered square it came from.

## How to use it

Use the ribbon and interlace pages as decorative prints, cards or pattern
sources: a rosette makes a tile, the border layout frames a page. The
numbered style is a maths display: follow the line with your finger from 1
upward, then check that every row, column and diagonal really does add up
to the total printed underneath. Try squares of different sizes: odd squares
make diagonal, lattice-like lines; squares whose side is a multiple of four
make crossed, mirror-symmetric ones; the 6 × 6, 10 × 10 and 14 × 14 squares
look different again. A closed line (back from the last number to 1) makes
a loop, which suits the woven style best.

## Purpose

To show that a purely numerical object has a shape. The magic line makes the
hidden structure of a magic square visible — its symmetry, the regular steps
of its construction — and turns it into ornament, which was exactly
Bragdon's aim: a source of pattern drawn from mathematics rather than
copied from nature or from historical styles.

## History

Magic squares are ancient. The 3 × 3 *Lo Shu* of Chinese tradition is
attested in texts of the Han period and later linked to the legend of a
turtle from the river Luo; 4 × 4 squares appear in Indian works such as
Nārāyaṇa Paṇḍita's *Gaṇita Kaumudī* (1356), and Albrecht Dürer set one in
his engraving *Melencolia I* (1514). Simon de la Loubère, French envoy to
Siam in 1687–88, brought back the "Siamese" method for odd squares and
published it in *Du Royaume de Siam* (1691). The LUX method for squares of
side 4m + 2 is John Horton Conway's; the complement method for sides
divisible by four is classical.

Claude Fayette Bragdon (1866–1946), architect of Rochester, New York, and
later stage designer, set out a new system of ornament in *Projective
Ornament* (Manas Press, Rochester, 1915). Beside projections of
four-dimensional figures he proposed the *magic line* — the path through a
magic square's numbers in order — as a source of designs, and showed lines
from squares of several orders repeated into borders, all-over patterns and
symmetrical panels. He used such ornament in his own buildings and designs.

## This implementation

- **Spec knobs:** `width`, `height` (points, 200-3000); `order` (3-16, the
  square's side, default 4); `construction` (`auto`, `classic`, `linear`);
  `permute` (scramble with a seeded symmetric row-and-column permutation,
  default on); `layout` (`single`, `mirror`, `rosette`, `wallpaper` — the
  default —, `border`); `style` (`ribbon` — the default —, `interlace`,
  `line`, `numbers`); `palette` (`bragdon`, `sunset`, `ocean`, `jade`,
  `ink`); `closed` (join n² back to 1, default on); `caption` (order and
  magic sum under the ornament); `stroke` (outline width, 0.2-4).
- **Generation:** classic squares are de la Loubère's Siamese march for odd
  orders, Conway's LUX method (over a Siamese square of half the order) for
  orders 6, 10, 14, and the complement method for orders divisible by four.
  For odd orders coprime to 3 (5, 7, 11, 13) the seed may instead pick a
  *linear* square `n·((a·r + b·c + s) mod n) + ((c′·r + d·c + t) mod n) + 1`,
  its coefficients chosen so that every row, column and diagonal is a
  permutation (`a, b, a ± b, c′, d, c′ ± d` and `a·d − b·c′` units mod n);
  `auto` chooses between classic and linear by seed where both exist, and a
  `linear` request for another order is served classic with
  `requested_construction` in meta. The seed then applies a rotation, a
  reflection, the complement `v → n² + 1 − v`, and (with `permute`) a
  symmetric pair permutation `p` with `p(n − 1 − i) = n − 1 − p(i)`, applied
  to rows and columns alike — all of which keep a square magic. The line
  joins the cell centres of 1 … n² with quadratic fillets at every corner.
  Ribbon style shades the band along a four-stop palette ramp (on a
  closed line it runs out and back, starting at a point the seed chooses);
  interlace
  finds every proper crossing of the straight runs, assigns over and under
  alternately along the line, and redraws the over strand across each
  crossing. Layouts place copies mirrored or turned into four-fold blocks,
  alternately reflected wallpaper tiles, or a ring of small copies round a
  large central one.
- **Guarantees:** deterministic per seed; every square drawn, in every copy,
  is magic — rows, columns and both diagonals sum to n(n² + 1)/2 and the
  cells are exactly 1 … n² — checked when built and re-checked in tests by
  an independent sum for every order 3-16, every construction and every
  transformation; the line visits every cell exactly once, in numerical
  order (tested by mapping each vertex back to its cell). The Lo Shu is
  reproduced exactly at order 3. Meta records the square, its
  construction, the transformations, whether it is associative, and the
  crossings woven. `verification: magic_rows_columns_diagonals;
  line_visits_every_cell_once`. Clamped knobs are reported as
  `requested_<field>`.
