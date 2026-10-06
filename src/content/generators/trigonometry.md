---
title: "Trigonometry"
blurb: "Trigonometry worksheet — SOH CAH TOA sides and angles, exact values, sine and cosine rules"
category: maths
version: "1.0.0"
---
Name the sides, then use sine, cosine and tangent to find missing sides and
angles — up to the sine and cosine rules.

## What it is

A worksheet of four to eight trigonometry questions. Right triangles are
drawn to scale with the right angle marked, an angle marked, and two sides
or a side and an angle labelled; one side is X or the angle is θ. The
gentlest pages ask only which side is the hypotenuse, the opposite and the
adjacent. Harder pages add a table of exact values to complete and exact
expressions to work out, and the hardest use triangles without a right
angle, with the sine and cosine rules. The answer key shows the ratio or rule
chosen and the answer.

## How to play

**Name the sides from the marked angle, theta.** The hypotenuse (HYP) is
the longest side, opposite the right angle. The opposite side (OPP) is
across from theta. The adjacent side (ADJ) is the one next to theta that is
not the hypotenuse.

**Choose the ratio — SOH CAH TOA.** Sin theta = opposite ÷ hypotenuse,
cos theta = adjacent ÷ hypotenuse, tan theta = opposite ÷ adjacent. Pick the one that
uses the side you know and the side you want.

- **Finding a side:** write the ratio as an equation. If X is on top, as in
  tan 35° = X/12, multiply: X = 12 × tan 35°. If X is underneath, as in
  sin 35° = 12/X, divide: X = 12 ÷ sin 35°.
- **Finding an angle:** work out the ratio from the two sides, then use the
  inverse button: if tan theta = 7/12, then theta = tan^-1(7/12).
- **Exact values:** learn the table for 0°, 30°, 45° and 60° — sin 30° = 1/2,
  sin 45° = (root 2)/2, sin 60° = (root 3)/2, and cos runs the same values
  backwards. Two half-squares and a half-equilateral triangle give them all.
- **Triangles without a right angle:** the sine rule says each side divided
  by the sine of the angle opposite it gives the same number; use it when
  you know a side and its opposite angle. The cosine rule says the square of
  the side opposite an angle is the sum of the squares of the other two
  sides, minus twice their product times the cosine of the angle; use it to
  find the third side from two sides and the angle between them, or an
  angle from all three sides.

Make sure your calculator is in degrees, and round only at the end.

## Purpose

Right-triangle trigonometry is a core topic of high-school geometry and
GCSE (Foundation and Higher), and the sine and cosine rules finish the
Higher course. The page climbs the way the topic is taught: naming sides
before using them, multiplying before dividing, sides before angles, then
exact values and non-right triangles. The key's working line shows the
ratio chosen, which is where most mistakes happen.

## History

Hipparchus of Nicaea (2nd century BC) built the first table of chords; the
Indian astronomers of the *Sūrya Siddhānta* and Āryabhaṭa (AD 499) replaced
chords with half-chords — the sine — and al-Battānī, Abū al-Wafā' and
al-Bīrūnī developed the tangent and the sine rule. Regiomontanus's *De
triangulis omnimodis* (1464) brought trigonometry to Europe as a subject of
its own; the cosine rule generalises Euclid's Book II, Propositions 12–13.

## This implementation

- **Spec knobs:** `difficulty`; `mode` (`mixed`, `label`, `find_side`,
  `find_angle`, `exact_values`, `sine_cosine`); `locale` (`us`: inches,
  "law of sines", "nearest tenth", tan 30° = √3/3; `uk` and `in`:
  centimetres, "sine rule", "1 decimal place", tan 30° = 1/√3); `count`
  (4–8; the exact-values table counts as two); `width`, `height`, `line`.
- **Generation:** angles are whole degrees (15°–75° for right triangles) and
  lengths whole numbers, or one-decimal lengths from Hard up. Kids: name the
  sides. Easy: find a side by multiplying (the unknown is the ratio's
  numerator), with some naming. Medium: sides by dividing too, and angles
  (12°–78°). Hard: decimal lengths, the exact-values table (nine of fifteen
  cells hidden) and exact expressions (products, sums of like surds and
  squares of special values, carried exactly as a fraction times √1, √2, √3
  or √6). Expert: the sine rule (a side; an angle only when the side
  opposite it is the shorter, so there is no ambiguous case) and the cosine
  rule (a side; an angle, never within 3° of 90°), every angle at least 25°,
  with right-triangle angles and divisions. Figures are drawn true to their
  sides and angles, turned and mirrored for variety (a quarter turn more
  when that draws a thin triangle larger).
- **Solving:** the key prints the ratio or rule used — "TAN 35° = X/12, SO
  X = 12 × TAN 35°", "SIN θ = 7/12, SO θ = SIN⁻¹(7/12)",
  "X/SIN 48° = 12/SIN 61°" — and the answer to one decimal place.
- **Guarantees:** answers are worked in floating point, and any value within
  1e-6 of a rounding boundary (where the tenths digit would depend on noise)
  is refused, so every printed rounding is the true one. The tests re-derive
  every answer a second way from the printed numbers alone — sides by
  coordinates along the hypotenuse's ray, angles by atan2, sine-rule sides
  by intersecting two rays, sine-rule angles from a quadratic, cosine-rule
  angles by Heron's formula and the inradius — and check exact values and
  the table against floating-point sines. They also read every figure back:
  labelled sides in proportion, labelled angles equal to the drawn angles,
  and each named side really facing the right angle or θ.
- **Honest bands:** each kind of question has a band (naming Kids, multiply
  Easy, divide and angles Medium, decimals and exact values Hard, sine and
  cosine rules Expert), and the page's difficulty is the hardest question
  on it. A mixed page serves the band asked for; a single-kind mode serves
  its own band — `find_angle` at Kids or Easy is labelled Medium,
  `sine_cosine` is always Expert, `label` is always Kids — and meta reports
  both `difficulty` and `requested_difficulty`.
