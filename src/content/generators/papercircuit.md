---
title: "Paper Circuit Card"
blurb: "Paper-circuit light-up cards — copper-tape paths, a coin-cell fold, LEDs under cover windows; two nets that never touch, polarity checked"
category: design
version: "1.0.0"
---
A light-up card to make with copper tape, a coin cell and LEDs. The two sides of the circuit never touch, and every LED faces the right way.

## What it is

A one-page template for a light-up greeting card. The top half is the
cover: a star, heart, house, tree, robot or rocket, with a round window
over each light and an optional message. The bottom half is the circuit
page, which shows:

- where to stick the copper tape
- where to place the coin cell, with a tab that folds over it
- where each LED goes, with its + and − legs marked

In the switched version, a small tab on the left folds over a gap in the
tape. The lights come on when you press it.

## How to use it

You need copper tape (the width is printed on the page), one CR2032
3-volt coin cell, the LEDs listed, clear tape and scissors. All the LEDs
on one card are from the same family: warm (red, yellow, orange) or cool
(blue, white). Mixed families on one cell would leave the cool ones dim.

1. Cut out the circuit page, keeping its tabs. Cut out the cover.
2. Stick copper tape over every copper path. At a corner, do not cut the
   tape: fold it back on itself at a right angle and press it flat, so
   the path stays in one piece. Leave the gap marked GAP empty.
3. Bend each LED's legs flat, out to the sides. The longer leg is +.
   Lay the LED on its spot with the long leg on the + tape and the short
   leg on the - tape. Tape each leg down firmly with clear tape.
4. Put the coin cell on the - pad with its + side (the side with the
   writing) facing up. Fold the cell tab up over it so the copper on the
   tab presses on the top of the cell. Tape the tab down.
5. Press the switch tab over the gap. The lights should come on. If one
   stays dark, turn it round or press its legs down harder.
6. Pierce the cover's windows with a pencil point and lay the cover over
   the circuit, lining up the edges. The light shines through each
   window.

## Purpose

A paper circuit is the friendliest first electronics project. A circuit
needs a closed loop from the + side of the cell, through the LED, and
back to the − side. An LED only works one way round. A short circuit (+
touching −) does nothing useful. Here you can see and touch all of it.
The finished card is a real gift, and the template can be decorated and
coloured in.

## History

Paper circuits grew out of the "paper computing" research of the
2000s. Leah Buechley's group at the MIT Media Lab, and Jie Qi's
"circuit stickers" and pop-up circuit books in particular, showed that
conductive tape, coin cells and flat LEDs could turn paper craft into
electronics. Makerspaces, libraries and schools took up the copper-tape
light-up card as a classroom staple, with kits from electronics
suppliers.

## This implementation

- **Spec knobs:** `motif` (`star`, `heart`, `house`, `tree`, `robot`,
  `rocket`); `leds` (1-6); `circuit` (`switched`, `simple`); `tape_mm`
  (copper tape width, 3-8); `message` (up to 24 characters the font can
  draw); `look` (`colour`, `outline`); `page`; `margin` (inches, 0.1-1).
  Out-of-range values are clamped and recorded as `requested_*`. A
  message with characters the font cannot draw, or cut to 24 characters,
  is recorded as `requested_message`. If the picture has fewer wireable
  light places than requested, the most that fit are used and
  `requested_leds` is recorded.
- **Generation:** the circuit is a ladder.
  - A + rail along the top is fed by a riser on the left, which comes up
    from the cell tab below the card. The cell tab's + pad folds onto the
    top of the cell.
  - A − rail runs along the bottom from the − pad under the cell.
  - Each LED is a rung: a + strip down from the top rail and a − strip
    up from the bottom rail, ending 5 mm apart for the LED's legs.
  - The seed shuffles the picture's light places. Places are taken
    greedily (the best of 16 seeded orders), so rungs stand at least one tape width plus 4 mm apart, and
    both strips of every rung are long enough.
  - In the switched version the riser is broken by an 8 mm gap. A tab
    left of the card carries a pad that folds onto both ends.

  The cover is the same size as the card, with a window over each LED
  in the same position. The seed also picks the colours and whether the
  LEDs are a warm or a cool family.
- **Solving:** nothing to solve.
- **Guarantees:** `circuit_checked`, recomputed from the tape rectangles.
  - Every tape piece is a straight, axis-aligned strip.
  - Overlapping pieces, plus the folded switch pad when the switch is
    pressed, form exactly two nets.
  - No + piece comes within 3 mm of a − piece, either flat or with the
    tabs folded. The one exception is inside the cell's footprint, where
    the cell sits between them.
  - The − pad and the folded + pad both lie within the cell.
  - Every LED's + leg pad lies on the + net and its − leg pad on the −
    net.
  - With the switch open, every LED is cut off from the cell.
  - Every cover window sits exactly over its LED.

  Tests confirm the nets again by drawing the tape on a 0.25 mm grid and
  flood-filling it, and confirm polarity by a breadth-first search from
  each cell pad.

  The LEDs are wired in parallel on one 3 V cell, with no resistor. The
  coin cell's internal resistance limits the current, as in every
  coin-cell paper circuit. More LEDs share the same small current, so
  six are dimmer than one.
