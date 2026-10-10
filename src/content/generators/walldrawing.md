---
title: "Wall Drawing"
blurb: "Instruction-based line drawings in the spirit of Sol LeWitt: the seed writes the instruction, the page executes it and prints it as the caption"
category: design
version: "1.0.0"
---
A written instruction and the drawing that carries it out: conceptual line art in the spirit of Sol LeWitt.

## What it is

Every page starts as a sentence, such as "ARCS FROM THE CORNERS AND SIDES,
ONE CENTRE PER SQUARE, IN TURN, IN A 4×4 GRID", and then draws exactly
what that sentence says. The sentence is printed under the drawing. The
vocabulary is small: straight lines in four directions (vertical,
horizontal, diagonal right and diagonal left) laid over each other in
combinations, arcs drawn from a square's corners or from the middles of
its sides, wavy "not-straight" lines, straight lines that do not touch,
broken lines, and concentric bands of squares or circles. Each instruction
uses a few of these words and places one mark in each square of a grid.
Each new page gets a new instruction.

## How to use it

Read the caption first, then find each part of it in the drawing: which
squares have lines going one way, which have two kinds crossing, and where
the arcs are centred. The black-line version is a colouring page. Every
square is a closed shape, and the spaces between lines, arcs and bands are
wide enough to fill. You can follow the classic rule of one colour for each
direction of line, colour the arc bands in turn with four colours, or write
your own instruction and colour by that. The colour version is a finished
print. Pages hung in a row look like a set of studies.

## Purpose

The pages show the main idea of conceptual art: the instruction is the
work, and the drawing is one way of carrying it out. A rule as plain as
"lines in four directions, every combination" leads to a picture with a
rhythm you could not easily invent. Comparing the words with the lines also
trains careful looking. Children can try writing an instruction and then
drawing it themselves.

## History

Sol LeWitt (1928-2007) helped found conceptual art. In "Paragraphs on
Conceptual Art" (Artforum, June 1967) he wrote that "the idea becomes a
machine that makes the art". In 1968 he made his first wall drawing
directly on the wall of the Paula Cooper Gallery in New York. After that
he mostly wrote the instructions and other people, assistants and
draughtsmen, drew them on the walls of each venue, so the same work could
be drawn again in a new place. His early wall drawings used four basic
kinds of straight line: vertical, horizontal, 45° diagonal right and 45°
diagonal left. They were laid over each other in a grid of squares, as in
Wall Drawing 11 (1969), and he also drew them in four colours of pencil.
In the early 1970s his vocabulary grew to arcs from corners and sides,
"not-straight" lines, broken lines and lines that do not touch. Wall
Drawing 122 (1972) draws all combinations of two lines crossing, chosen
from arcs from corners and sides and from straight, not-straight and broken
lines. Later he moved to ink washes and bright flat acrylic bands. By the
time he died there were more than a thousand wall drawings, and many are
on long-term view at MASS MoCA. These pages are original instructions
written from the same kind of grammar, made in the spirit of his work.
They do not reproduce or stand in for any of his wall drawings.

## This implementation

- **Spec knobs:** `width`, `height`, `margin`; `family` (auto, directions,
  arcs, not_straight, not_touching, broken, bands, mixed — auto lets the
  seed choose); `grid` (0 for the instruction's own grid, otherwise an n×n
  grid, 1-8); `spacing` (0 for the instruction's own, otherwise 3-72 pt);
  `style` (line, colour); `palette` (primary, gouache, earth, pastel,
  ink_blue — colour style only); `stroke` (0.75-4 pt); `caption`.
- **Generation:** a seeded grammar writes the instruction. *Directions*
  chooses two to four of the four directions and either places every
  non-empty combination once, fewest lines first, with one blank square
  placed by chance (2×2, 2×4 or 4×4), cycles the combinations in turn, or
  picks them by chance. *Arcs* takes corners, side midpoints or both, in
  turn or by chance. *Not-straight* lines run horizontal, vertical or
  alternating. *Not touching*, *broken* and *bands* (squares, circles or
  alternating) work the same way. *Mixed* names two or three kinds and
  places them on a chequerboard or in turn. Straight and broken lines run on
  an exact lattice of the square (spacing = side / m), with diagonals
  through its points. Arcs are clipped to the square, and their ends are
  refined to the edge by bisection. A not-straight line is a sum of three
  sines with whole-number frequencies, with its slope held to at most 1.1,
  and the lines in a square are copies of each other moved by the spacing,
  so they can never meet. Not-touching lines are placed by dart throwing,
  and each one keeps an exact segment-to-segment distance from the others.
  The caption is wrapped to the frame and shrinks on small pages. Colour
  style colours lines by direction and fills arc bands, wave strips and
  concentric bands in turn from a four-colour palette.
- **Solving:** nothing to solve; this is a design.
- **Guarantees:** deterministic per seed. `caption_matches_drawing`: every
  square is classified only from its drawn polylines and must equal the
  planned mark. The checks are endpoints on the edge (straight lines,
  direction from the slope), one shared direction with ends inside the
  square (broken lines), a common centre at a corner or side midpoint
  (arcs), and closed loops about the centre (bands). The kinds named by the
  caption's words must equal the kinds drawn, and the grid it names must
  equal the grid drawn. Tests also check that the directions named are
  exactly the directions drawn, that "all combinations" draws each one
  exactly once, that not-touching lines keep their gap, and that a
  tampered caption or cell is caught. Line art keeps every region at least
  10% above the 40 mm² adult floor: on the lattice the smallest face is
  s²/4 when both diagonals cross, s²/2 with one diagonal and s² for a
  square grid. Arcs and bands that would leave a sliver are dropped.
  `smallest_region_pt2` reports the smallest region, and `colorable` needs
  both that and the adult colourability check. Broken and not-touching
  lines close no regions, so those squares colour as one shape each (noted
  in meta). A spacing tighter than the colourable minimum is raised in
  line art and reported as `requested_spacing`.
