---
title: "Colour Theory"
blurb: "Colour theory and swatch sheets — RYB colour wheels, harmony worksheets with keys, value scales, tint/tone/shade strips, paint mixing grids with every pair once, and numbered marker swatch charts"
category: design
version: "1.0.0"
---
Colour theory sheets for the art room and the craft table: colour wheels,
harmony worksheets, value scales, tint strips, paint mixing grids and
numbered swatch charts.

## What it is

A family of printable colour sheets:

- **Colour wheel:** the 12-part red-yellow-blue wheel as a ring, as round
  petals or as a rose window. Each part is marked P (primary), S
  (secondary) or T (tertiary) and named round the outside. It can be
  coloured in, or left blank to colour.
- **Colour harmonies:** a coloured wheel and six questions, such as the
  complement of red, two colours analogous to blue, or a triad with
  orange. Each question has boxes to colour and lines to name the answers.
  An answer page shows them filled in.
- **Value scale:** a strip of steps (5 to 11) from white to black, in greys
  or through a colour, to paint or shade.
- **Tints, tones and shades:** three colours, each with a tint strip
  (towards white), a tone strip (towards grey) and a shade strip (towards
  black).
- **Mixing grid:** a triangle of squares for 3 to 8 named paints. Each pure
  paint sits on the diagonal and every pair of paints meets in exactly one
  square. It can show a preview of each mix or be left blank to paint.
- **Swatch chart:** 24 to 168 numbered cells, each with a swatch box and a
  line for the colour's name or code, for a set of markers, pencils or
  paints.

## How to use it

**Colour wheel:** colour the three primaries first (red, yellow and blue,
marked P), then mix or choose the secondaries between them (S), then the
tertiaries (T), each a primary mixed with the secondary beside it.

**Harmonies:** use the wheel at the top. A complement is straight across
the wheel. Analogous colours are the neighbours on either side. A triad is
the two colours a third of the way round in each direction. A split
complement is the two colours either side of the complement. Colour each
box and write the colour's name on the line.

**Value scale and tint strips:** start at the light end and make each box
a little darker than the one before. Add a touch more black or pencil
pressure each time, or for tints a little more colour into white. The
middle steps are the hardest; squint at the strip to check the steps look
even.

**Mixing grid:** the numbers along the top and side match the paint key.
Paint the diagonal squares with each paint straight from the tube, then
fill each other square with an even mix of the two paints named for its row
and column. A coloured grid shows a preview of each mix to compare against.

**Swatch chart:** colour one marker or pencil in each box, in the order of
your set, and write its name or code on the line beneath. Keep the chart
with the set so you can choose colours by how they really look on paper.

## Purpose

Colour sheets are simple, but they go wrong in simple ways. A wheel can be
in the wrong order, a mixing grid can repeat a pair and leave another out,
a swatch chart can skip a number, and a value scale can have two steps that
look the same. Each sheet is checked after it is made. The wheel is
checked against the red-yellow-blue construction: each secondary halfway
between the two primaries it is mixed from, each tertiary between and named
for its two neighbours. The mixing grid is checked to hold every pair of
paints exactly once with the pure paints on the diagonal. Swatch cells are
counted, numbered 1 to n in reading order, and kept at least half an inch
wide. Every step of a value scale, tint or shade strip must be darker than
the last, measured as CIE lightness, and the harmony answers are worked out
again round the wheel.

## History

Isaac Newton bent the spectrum into a circle in his *Opticks* (1704), and
painters soon arranged their pigments the same way. The red-yellow-blue
wheel of primaries, secondaries and tertiaries comes from the colour
treatises of the eighteenth and nineteenth centuries, from Moses Harris's
*Natural System of Colours* to Goethe and Michel Eugène Chevreul's laws of
simultaneous contrast. It was fixed in art education by Johannes Itten's
teaching at the Bauhaus and his book *The Art of Color* (1961), whose
12-part wheel and colour contrasts are still the first lessons in colour
in schools today. Value scales, tint and shade exercises and mixing charts
are the painter's standard practice drills. Swatch charts became popular
with the alcohol-marker and coloured-pencil collectors of the 2010s, who
swatch every new set before using it.

## This implementation

- **Spec knobs:** `sheet` (auto, wheel, harmony, value_scale, tints,
  mixing_grid, swatches), `fill` (coloured, blank), `wheel_style` (auto,
  ring, petals, rose; wheel and harmony sheets only), `paints` (3–8;
  mixing grid only), `steps` (5–11; value scale and tints only), `cells`
  (24–168; swatches only, fewer if they would drop below the minimum cell
  size, reported as `requested_cells`), `harmony` (mixed, complementary,
  analogous, triad, split_complementary; harmony sheet only), `width`,
  `height` (page, 144–3000 pt). Out-of-range values are clamped and
  reported as `requested_*`.
- **Generation:** the wheel is a fixed table of the twelve RYB colours,
  with yellow at the top. The seed picks the wheel style when it is `auto`,
  the six harmony questions (each given colour different), the value
  scale's colour (or greys), the three tint colours, and the paints for a
  mixing grid from 18 named artists' colours. A value scale through a
  colour places the pure colour where its own lightness falls between
  white and black. Mix previews are the geometric mean of the two paints'
  reflectances, a simple subtractive model, and are labelled as a
  preview. Swatch cells use the column count that gives the squarest,
  roomiest cells on the page.
- **Solving:** nothing to solve; it is a design (the harmony sheet ships
  its answers as a key page).
- **Guarantees:** deterministic per seed. `verification:
  wheel_construction_pairs_swatches_values_and_answers_rederived`. The
  wheel follows the RYB construction and its names. A mixing grid holds
  every unordered pair once, with the pure paints on the diagonal and no
  paint twice. A swatch chart is numbered 1..n in order, every cell is at
  least 36 × 43.2 pt, and no cells overlap or leave the page. Step counts
  are exact, and lightness strictly falls along value scales, tints and
  shades. Harmony answers are worked out again from angles round the
  wheel. Tests check the traditional complement pairs and triads, measure
  lightness with an independent implementation of the CIE formula, count
  mixing-grid pairs with a hash map, check reading order and minimum cell
  sizes on several page sizes, check that the key names every answer,
  refuse hand-broken sheets, check that every option changes its sheet
  (and is ignored on the others), and sweep every boundary for a finite
  page inside its bounds.
