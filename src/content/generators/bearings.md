---
title: "Bearings"
blurb: "Bearings worksheet — three-figure bearings, measuring, back bearings, angles between bearings, maps with a scale bar and journeys"
category: maths
version: "1.0.0"
---
Three-figure bearings: read them, measure them, turn them round and use them on maps.

## What it is

A worksheet of four to eight bearings questions, each with a diagram. The
first pages read bearings off a compass rose and off diagrams where the
angle from north is marked, and measure them with a protractor. Later
pages turn a bearing round (the bearing of A from B, given the bearing of
B from A), find the angle between two legs of a route, read a bearing and
a distance off a map with a scale bar, and work out how far a boat is from
its start and which way it must sail to get back. Answer lines look like
BEARING OF B FROM A = ____° and DISTANCE = ____ KM. The answer key fills
them in and marks the angles and routes in red.

## How to play

- A **bearing** is an angle measured **clockwise from north**, written
  with **three figures**: east is 090°, south 180°, south-west 225°, and
  an angle of 40° is written 040°.
- "The bearing of B from A" means: stand at A, face north, and turn
  clockwise until you face B.
- **Marked angles:** if the angle is marked clockwise from north, that is
  the bearing. If it is marked anticlockwise from north, take it away from
  360°.
- **Measuring:** put the centre of the protractor on the point you are
  measuring *from*, with zero on the north line, and read the angle
  clockwise round to the other point. Over 180°, measure the other side
  and take it away from 360°.
- **Back bearings:** the bearing back the other way differs by 180°. Add
  180° if the bearing is less than 180°, otherwise take 180° away.
- **Angles between bearings:** north lines are parallel, so use
  co-interior angles (they add up to 180°) and angles at a point (they add
  up to 360°) to find the angle between two legs.
- **Maps:** measure the bearing with a protractor and the distance with a
  ruler, then compare the length with the scale bar to turn it into
  kilometres.
- **Journeys:** two legs at right angles make a right-angled triangle.
  Use Pythagoras for the distance from the start, and trigonometry (or an
  accurate scale drawing) for the angle; then turn it into the bearing back
  to the start, to the nearest degree.

## Purpose

Bearings join angle facts, measuring and scale drawing in one practical
skill used for navigation by map, ship and plane. They are taught in Key
Stage 3 and GCSE mathematics in England (three-figure bearings, scale
drawings, and bearings with Pythagoras and trigonometry), in many
Commonwealth syllabuses, and in mapwork in geography; in the US they
appear in geometry and trigonometry as navigation problems. The questions
climb from reading a compass rose to multi-step journey problems, and the
measuring questions train careful use of a protractor.

## History

The magnetic compass reached European and Arab sailors from China by the
12th century, and mariners first named directions by compass points — 32
of them, from north through north by east to north-northeast and so on —
which apprentices learned to "box". Measuring direction as an angle in
degrees clockwise from north came from land surveying and gunnery, and
became standard in the 20th century, when military and aviation practice
fixed the three-figure form (045°, not 45°) so that a bearing could never
be misheard over a radio.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `reading`,
  `back_bearings`, `maps`); `count` (4-8); `width`, `height`, `line`.
- **Generation:** Easy asks the bearing of an arrow on an eight-point
  compass rose, bearings marked clockwise from north (under 180°), and
  measuring to the nearest 10°; Medium adds any marked bearing, angles
  marked anticlockwise from north, measuring to the nearest 5°, and back
  bearings; Hard adds the angle between two legs given their bearings,
  maps (four places in a 12 km by 8 km area, the pair asked about a whole
  number of kilometres apart on a bearing that is a multiple of 5°, with a
  scale bar) and journeys due north, south, east or west; Expert uses
  journeys on any bearing that is a multiple of 10°, with legs from a
  Pythagorean triple so the distance is whole. Kids is served as Easy,
  back bearings start at Medium and maps at Hard (meta reports
  `requested_difficulty`). Bearings on the four compass axes are avoided
  where they would make a question trivial; no question repeats on a page.
- **Solving:** each diagram is built from coordinates (x east, y north),
  and the page is drawn from the same coordinates, so a measured bearing
  on the paper is the true one.
- **Guarantees:** `answers_checked` — every answer is read back from the
  diagram's geometry: the bearing of one drawn point from another, the
  angle between two drawn legs, the distance between two places on the map,
  and the distance and bearing from a journey's end back to its start; a
  rounded bearing must lie clear of a half-degree so it rounds one way only.
  Bearings are whole numbers from 000 to 359 and written with three figures.
  The tests also re-solve back bearings, angles between legs and journeys
  from the printed words alone with separate formulas, check that a changed
  answer is caught, that every printed character is in the font, and that
  every topic, level and count generates.
