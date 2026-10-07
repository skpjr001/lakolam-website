---
title: "Circle Theorems"
blurb: "Circle theorems — angles at the centre, in the same segment and a semicircle, cyclic quadrilaterals, tangents and the alternate segment, every angle proven deducible"
category: maths
version: "1.0.0"
---
Angles at the centre, in a semicircle, in cyclic quadrilaterals and at
tangents — find the marked angles, and say why.

## What it is

A worksheet of four to eight questions, each with a circle diagram drawn
to scale. Points on the circle are lettered; O marks the centre. One or two
angles are given, and one or two are marked with a letter to find. The
figures use every circle theorem met at school: the angle at the centre,
angles in the same segment, the angle in a semicircle, cyclic
quadrilaterals, a tangent and a radius, two tangents from a point, and the
alternate segment theorem — linked by the triangle, isosceles,
straight-line and angles-at-a-point facts. Some angles are written in
algebra, such as (2x + 10)°. On one-step questions the page asks for the
reason too. The answer key fills in every angle and reason.

## How to play

Work each angle out from the facts — do not measure, even though the
diagrams are accurate.

- **Angle at the centre:** the angle at the centre is twice the angle at
  the circumference standing on the same arc.
- **Angles in the same segment** (standing on the same arc, on the same
  side of the chord) are equal.
- **Angle in a semicircle:** an angle standing on a diameter is 90°.
- **Cyclic quadrilateral:** opposite angles of a four-sided shape with all
  its corners on the circle add up to 180°.
- **Tangent and radius:** a tangent meets the radius at its point of
  contact at 90°.
- **Two tangents** from the same point are equal in length, so they make an
  isosceles triangle with the chord between their points of contact.
- **Alternate segment theorem:** the angle between a tangent and a chord
  equals the angle in the alternate segment (on the other side of the chord).
- **Isosceles triangles:** two radii make an isosceles triangle, so its
  base angles are equal; with the third angle they add up to 180°.
- Also: angles in a triangle add up to 180°, on a straight line to 180°,
  around a point to 360°, and in a quadrilateral to 360°.
- **Angles in algebra:** use a fact to write an equation in x, solve it,
  then find the angle asked for.
- You may need to find an unmarked angle first on the way.

US pages call the theorems the inscribed angle theorem, inscribed angles
on one arc, an inscribed quadrilateral and the tangent-chord angle.

## Purpose

Circle theorems are a core topic of GCSE Higher mathematics in England,
of Common Core geometry in the US (G-C.2: inscribed angles, the angle in a
semicircle, the radius and tangent), and of class 9-10 mathematics in
India. They are a pupil's first sustained practice in chaining facts into a
proof and justifying each step, and exam questions routinely ask for the
reasons.

## History

Most of these facts are in Euclid's *Elements* (about 300 BCE), Book III:
the angle at the centre is double the angle at the circumference (III.20),
angles in the same segment are equal (III.21), opposite angles of a cyclic
quadrilateral make two right angles (III.22), the angle in a semicircle is
right (III.31, also credited to Thales), a tangent is perpendicular to the
radius (III.18) and the alternate segment theorem (III.32).

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `angles` — centre,
  same segment and semicircle; `cyclic`; `tangents`); `locale` (the theorems'
  names, as above); `reasons` (ask for the reason on one-step questions,
  default on); `count` (4-8); page `width`, `height` and `line`. Clamped
  values are reported as `requested_*`.
- **Generation:** nine figure templates — angle at the centre (and its
  reflex form), angles in the same segment, a semicircle with a radius, a
  cyclic quadrilateral with an extended side, a cyclic quadrilateral with
  radii, a tangent with radii, two tangents, and the alternate segment —
  have their points placed on the circle at random whole even-degree
  positions, so every angle in the figure is a whole number, and angles
  under 16° are rejected. One or two angles are printed and one or two
  asked; at Expert the slots of one fact are written in x.
- **Solving:** a rule engine works from the printed angles alone, in rounds
  — each round uses only what earlier rounds knew: the one unknown angle in
  a fact (any fact of the form "these angles, with these multiples, add up
  to so much"), or a linear equation in x. Questions are rated by steps:
  the rounds the deepest asked angle needs, plus one for each further angle
  asked, one if a reflex angle is involved and one for algebra. Easy is one
  step (one theorem, with its reason), Medium two, Hard three, Expert four
  or more — and every question with angles in x is Expert. Kids is
  served as Easy (meta records `requested_difficulty`).
- **Guarantees:** `unique` and `answers_checked` — every asked angle (and
  x) comes out of the engine as a number, which proves it is determined by
  the printed angles, and it must equal the figure's true angle; a reason is
  the one fact that gives the angle straight from the printed ones. Tests
  confirm independently, by solving all the facts as one linear system over
  the fractions, that each asked angle is pinned down to the same value;
  measure every angle back from the points (and from the drawn page) to
  confirm each theorem holds in the figure; and check labels never overlap,
  every level keeps its steps, the key writes in red where the page is
  blank, and every printed character is in the font.
