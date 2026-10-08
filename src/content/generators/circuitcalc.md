---
title: "Electric Circuits"
blurb: "Electric circuits — series and parallel rules, Ohm's law, total resistance, power, energy and cost on drawn circuit diagrams, every answer checked by nodal analysis"
category: maths
version: "1.0.0"
---
Series and parallel circuits, Ohm's law, power and the cost of electricity — on drawn circuit diagrams, every answer exact.

## What it is

A worksheet of four to eight electricity questions. Most come with a
circuit diagram drawn in the standard symbols — a cell, resistors, lamps,
ammeters and voltmeters — where some values are printed and the ones to
find are marked with a question mark. The easiest pages ask what the
meters read using the rules for series and parallel circuits; later pages
use Ohm's law, add resistances in series and in parallel, and work out
power, energy, charge and the cost of running an appliance. Each question
ends with answer lines such as CURRENT = ____ A, and the answer key fills
in every line and every question mark on the diagrams.

## How to play

The symbols: the cell is a long and a short line (the long line is the
positive side); a resistor is a small rectangle; a lamp is a circle with a
cross; an ammeter is a circle with A and measures current in amps (A); a
voltmeter is a circle with V and measures potential difference (p.d., or
voltage) in volts (V). Resistance is measured in ohms (the sign that looks
like a horseshoe). The meters are ideal: an ammeter does not change the
current and a voltmeter takes none.

- **Series (one loop):** the current is the same everywhere in the loop,
  and the p.d.s across the parts add up to the cell's p.d. Total
  resistance = R1 + R2 + R3.
- **Parallel (branches):** each branch has the same p.d. as the cell (or
  the block of branches), and the branch currents add up to the current
  in the main wire. Total resistance: 1 ÷ R = 1 ÷ R1 + 1 ÷ R2 (for two
  branches, R = R1 × R2 ÷ (R1 + R2)). The total is always less than the
  smallest branch.
- **A resistor in series with a parallel pair:** work out the pair's
  resistance first, then add the series resistor.
- **Ohm's law:** V = I × R, so I = V ÷ R and R = V ÷ I.
- **Power:** P = I × V, or P = I × I × R, in watts (W).
- **Energy:** E = P × t in joules (J), with t in seconds. In
  kilowatt-hours: kWh = kilowatts × hours, and cost = kWh × the price of
  one kWh (a "unit").
- **Charge:** Q = I × t in coulombs (C), with t in seconds.

Remember to change minutes to seconds (× 60) for joules and coulombs, and
watts to kilowatts (÷ 1000) and minutes to hours (÷ 60) for kWh. Every
answer comes out exactly, so there is no rounding.

## Purpose

Circuit calculations are a required part of school physics: the series and
parallel rules in England's Key Stage 3, Ohm's law, resistors in series
and parallel, power, energy and charge in GCSE Physics (where these
calculations are examined directly), the Electricity chapter of India's
CBSE class 10 science (resistors in series and parallel, power, the
kilowatt-hour as the "commercial unit"), and US middle- and high-school
physical science. Reading values off a diagram is part of the skill, so
most questions put their data on the drawing rather than in the words.

## History

Georg Ohm published the law that bears his name in 1827, after measuring
how current depended on the length of wire in a circuit driven by a
thermocouple; it was greeted coldly at first and only later earned him the
Royal Society's Copley Medal. Gustav Kirchhoff stated his rules for
currents meeting at a junction and voltages around a loop in 1845, while
still a student. The watt was named after James Watt in 1882, and the
kilowatt-hour became the unit on electricity bills as public supply spread
at the end of the nineteenth century. Standard circuit symbols were
settled by international agreement in the twentieth century (IEC 60617);
the rectangle for a resistor used here is the IEC symbol, while American
books often draw a zigzag.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `rules`, `resistance`,
  `power`); `locale` (`us` cents, `uk` pence, `in` rupees "per unit", with
  lakh digit grouping — it only matters where a question costs money);
  `count` (4-8, clamped and reported as `requested_count`); `width`,
  `height`, `line` (scales every wire, symbol and rule).
- **Generation:** Kids asks series and parallel meter readings with whole
  numbers and two lamps; Easy adds Ohm's law with whole numbers; Medium
  uses decimals, three lamps, resistors in series, P = I × V, charge and
  the cost of electricity; Hard adds two resistors in parallel, P = I × I
  × R and joules; Expert adds three branches, a resistor in series with a
  parallel pair, and appliance ratings in watts and minutes. Single-topic
  pages are served honestly: `rules` from Kids to Medium, `resistance`
  from Easy, `power` from Medium (meta records `requested_difficulty`
  when a request is moved). Values are drawn until every answer is a
  terminating decimal with at most one place (Kids, Easy), two (Medium,
  Hard) or three (Expert) — and cents and pence whole — so nothing is
  rounded. No question repeats on a page.
- **Solving:** answers are worked the way a student works them: series
  resistances added, parallel ones by adding reciprocals, then V = IR on
  each part, P = IV, E = Pt, Q = It, cost = kWh × price.
- **Guarantees:** `answers_checked` — every circuit is turned into a
  netlist (nodes and resistors, the cell fixing two node voltages) and its
  node voltages are solved by Gaussian elimination over exact fractions;
  every answer and every meter reading printed on a diagram must equal the
  value read off that solution. Questions without a diagram are recomputed
  from their numbers. The tests go further and re-solve every question
  from only what the page prints (diagram values and prompt numbers, never
  the hidden ones), check that the key writes every answer and fills every
  question mark in red, that every printed character is in the font, and
  that every diagram fits its slot and every mark lies on the page.
