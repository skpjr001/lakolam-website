---
title: "Angle Facts"
blurb: "Angle facts — parallel lines and transversals, triangles between parallels, polygons and algebraic angles, every angle proven deducible"
category: maths
version: "1.1.0"
---
Parallel lines, transversals and polygons — find the marked angles, and say why.

## What it is

A worksheet of four to eight angle questions, most with a diagram drawn to
scale. Two parallel lines (marked with arrows) are cut by a transversal,
with one angle given and one or two marked with a letter to find; a
triangle sits between two parallel lines; a polygon shows all but one of
its interior angles, sometimes with a side extended to make an exterior
angle; and some angles are written in algebra, such as (3x + 10)°, so x
must be found first. Text questions ask about regular polygons: the sum of
the interior angles, each interior or exterior angle, or the number of
sides. On one-step questions the page can ask for the reason too. The
answer key fills in every angle and reason.

## How to play

Work each angle out from the facts — do not measure, even though the
diagrams are accurate.

- **Angles on a straight line** add up to 180°. Angles around a point add
  up to 360°.
- **Vertically opposite angles** (where two lines cross) are equal.
- **Corresponding angles** (in matching positions at the two crossings,
  an F shape) are equal.
- **Alternate angles** (between the parallel lines, on opposite sides of
  the transversal, a Z shape) are equal.
- **Co-interior angles** (between the parallel lines, on the same side, a
  C or U shape) add up to 180°.
- **Angles in a triangle** add up to 180°.
- **Angles in a polygon:** the interior angles of a polygon with n sides
  add up to (n – 2) × 180°. The exterior angles (one at each corner) add
  up to 360°, and an interior and exterior angle at the same corner make
  180°.
- **Regular polygons:** every exterior angle is 360° ÷ n, and every
  interior angle is 180° minus that. So a polygon whose exterior angle is
  24° has 360 ÷ 24 = 15 sides.
- **Angles in algebra:** use a fact to write an equation — equal angles
  give 3x + 10 = 5x – 30; angles making 180° give (2x + 10) + (3x – 5) =
  180 — solve it for x, then work out the angles.
- Sometimes you need to find an unmarked angle first, on the way to the
  one you are asked for.

The names used: US pages say vertical angles, linear pair, alternate
interior and same-side interior angles; UK pages say vertically opposite,
angles on a straight line, alternate and co-interior angles.

## Purpose

Angle facts are the first place most students meet geometric reasoning —
working from given facts to a conclusion and justifying each step. They
are Common Core 8.G.5 (angles formed by parallel lines cut by a
transversal, the angle sum of a triangle), a core GCSE Foundation topic in
England (angles in parallel lines and in polygons, with reasons), and
chapter "Lines and Angles" of India's NCERT class 7 and class 9 books.
Measuring and drawing angles, and single missing angles on a line, at a
point or in one triangle, live on the angles worksheet; this page is about
the parallel-line facts, polygons and chains of reasoning.

## History

Euclid's *Elements* (about 300 BCE) proves these facts in Book I: that
vertically opposite angles are equal (I.15), that a transversal across
parallel lines makes equal alternate angles and co-interior angles summing
to two right angles (I.29, which depends on the famous parallel
postulate), and that the angles of a triangle sum to two right angles
(I.32). The rule for polygons follows by cutting the polygon into
triangles. Asking pupils to give the reason with each angle is a long
tradition of school geometry, kept today in GCSE mark schemes.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `parallel`, `polygons`,
  `algebra`); `locale` (the names of the facts, as above; `in` uses
  "linear pair", "alternate interior" and "co-interior"); `reasons` (ask
  for the reason on one-step questions, default on); `count` (4-8);
  `width`, `height`, `line` (clamped to sensible page sizes).
- **Since 1.1.0:** `line` scales every rule and diagram stroke on the
  page and its key (it was accepted but changed nothing before); a
  `count` outside its range is clamped and recorded as `requested_count`.
- **Generation:** every figure is built from exact whole-degree angles —
  a transversal at 40-140° (avoiding near-right angles), a triangle
  between parallels with base angles 35-80°, a convex polygon from
  exterior turns of 15-120° whose last two sides are solved so it closes
  — and drawn to scale, sized with the type. Easy asks one angle one fact
  away from the given angle, with its reason (mostly a parallel-line fact
  across the two crossings). Medium asks angles two facts away, the angle
  sum of quadrilaterals and pentagons, and regular polygons. Hard adds
  triangles between parallel lines, interior and exterior angles together,
  sides from an angle, and transversal angles in algebra. Expert asks for
  three-step chains and polygons whose angles are written in x. Labels are
  placed in their angle's wedge; a question is kept only if every label
  sits clear of the others and of every line. The polygons topic starts at
  Medium and the algebra topic at Hard (lower requests are served there,
  and meta records `requested_difficulty`); Kids is served as Easy.
- **Solving:** a rule engine works from the printed angles alone, in
  rounds — each round may use only what earlier rounds knew: an angle
  equal to a known one by a named fact, the last unknown angle of a sum
  (straight line, triangle, polygon), or a linear equation in x when every
  angle in a fact is known in terms of x. The chain length (the round in
  which the asked angle became a number) rates the question.
- **Guarantees:** `unique` and `answers_checked` — every asked angle (and
  x) comes out of the engine as a number, which proves it is determined by
  the printed angles and that no other value is possible, and it must
  equal the figure's true angle; a reason is the one fact that joins the
  given and the asked angle. The tests confirm independently, by solving
  all the facts as one linear system over the fractions, that every asked
  angle is pinned down to the same value; they measure every angle back
  from the drawn diagram, check that labels never overlap, that each level
  keeps its chain lengths, that the key writes in red where the page is
  blank, and that every printed character is in the font.
