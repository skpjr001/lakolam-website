---
title: "Similarity and Congruence"
blurb: "Similarity and congruence — similar triangles (turned, nested, bow-tie, proportionality), length, area and volume scale factors, and congruence conditions, every answer checked by an independent construction"
category: maths
version: "1.0.0"
---
Similar triangles, scale factors for length, area and volume, and the congruence conditions — every answer checked by building the figure.

## What it is

A worksheet of four to ten questions on similar and congruent shapes.
Decide whether two triangles are similar and give the scale factor; find
missing sides of similar triangles drawn turned round or flipped over,
with angle marks to show which corners match; find lengths in a triangle
cut by a line parallel to one side, in a "bow-tie" of two triangles
between parallel lines, and with the basic proportionality theorem. Use
length, area and volume scale factors — area from a length scale
factor, a length from two areas, a volume from two surface areas. Name
the condition (SSS, SAS, ASA, AAS or RHS) that the marks on two
triangles show, or say the marks are not enough. The answer key writes
every answer in red.

## How to play

- **Similar shapes** have the same angles, and every length is
  multiplied by the same scale factor k. Match the sides by the matching
  angles (marked alike), not by where they sit on the page.
- **Scale factor:** divide a length on the second shape by the matching
  length on the first. Multiply by k to go from the first to the second;
  divide by k to go back.
- **Are they similar?** Put both sets of sides in order and divide each
  by its partner. Similar triangles give the same answer every time.
- **Parallel lines:** a line parallel to one side of a triangle cuts off a
  smaller similar triangle. Use the whole side (AD + DB) for the large
  triangle. In a bow-tie the two triangles are similar, turned round.
- **Proportionality theorem:** a line parallel to one side divides the
  other two sides in the same ratio: AD / DB = AE / EC.
- **Areas and volumes:** if lengths are multiplied by k, areas are
  multiplied by k squared and volumes by k cubed. To go back from areas
  to lengths take the square root; from volumes, the cube root.
- **Congruent triangles** are exactly the same shape and size. Three
  facts prove it: three sides (SSS); two sides and the angle between
  them (SAS); two angles and the side between them (ASA); two angles and
  a side not between them (AAS); a right angle, the hypotenuse and one
  other side (RHS, called HL in the US). Three angles are not enough (the
  triangles may be different sizes), and nor are two sides with an angle
  that is not between them.

## Purpose

Similarity and congruence are GCSE Mathematics geometry content in
England, Common Core 8.G.A.4 and high-school HSG-SRT (similarity) and
HSG-CO.B (congruence) in the US, and NCERT class 10 chapter 6 (Triangles,
with the basic proportionality theorem) and class 9 chapter 7 in India.
They underpin trigonometry, scale drawings and map work.

## History

Thales of Miletus (about 600 BCE) is said to have measured the height of
an Egyptian pyramid from its shadow by similar triangles, and the
theorem that a parallel line divides two sides proportionally is often
named after him. Euclid's *Elements* (about 300 BCE) proves the
congruence conditions SAS (Book I, proposition 4), SSS (I.8) and ASA and
AAS (I.26), and the theory of similar figures in Book VI.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `similar`,
  `scale_factors`, `congruence`); `locale` (`us` names the right-angle
  condition HL and says "dilation"; `uk` and `in` say RHS and
  "enlargement" and print the same page); `count` (4-10); `width`
  (300-2000 Pt) and `height` (300-3000 Pt). Out-of-range values are
  clamped and reported in meta as `requested_*`; Kids is served as Easy
  with `requested_difficulty`.
- **Generation:** triangles have distinct whole sides and every angle at
  least 25°, so the shape and the matching are clear. Easy: whole-number
  scale factors with triangles the same way round, area from a length
  scale factor, SSS, SAS and RHS. Medium: fractional scale factors with
  the second triangle turned or flipped, "are they similar?" (a near miss
  changes one side by 1), area from two matching lengths, ASA and AAS.
  Hard: nested triangles (find DE, DB or BC), lengths from areas, volumes
  of similar cuboids from lengths, three angles (not enough). Expert:
  bow-ties and the proportionality theorem with fractional answers,
  volume from surface areas, and the ambiguous case — two triangles
  built with two equal sides and an equal angle not between them.
- **Solving:** lengths by the scale factor, areas and volumes by k² and
  k³, the condition from the pattern of the marks.
- **Guarantees:** each answer is checked a different way: "similar?" by
  all three sorted side ratios (exact) and by comparing the angles from
  the law of cosines; missing sides by completing both triangles and
  checking every side ratio and matched angle; nested, bow-tie and
  proportionality answers by building the figure in coordinates and
  measuring the parallel line and the lengths; scale-factor answers by
  measuring concrete similar rectangles and cuboids; congruence by
  counting the triangles that fit the marked parts (exactly one when a
  condition holds, and then the name must match; two or infinitely many
  when not, with the second triangle on the page sharing every marked
  part). Meta: `answers_checked`, `unique`, `difficulty`, `rating_basis`
  (`question_forms_by_level`), `checked_by`.
