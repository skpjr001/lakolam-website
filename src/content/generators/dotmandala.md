---
title: "Dot Mandala"
blurb: "Dot mandala templates — rings of dots at true dotting-tool sizes, with a tool and colour key; no two dots touch"
category: design
version: "1.0.0"
---
Dot-painting mandalas: rings of dots at the real sizes of numbered dotting
tools, with a key, as finished colour art or a template to paint over.

## What it is

A mandala built entirely from dots. A large layered dot sits at the centre,
and rings of dots spread outward: plain rings, rings that alternate big and
small dots, dot-in-dot rings with a smaller dot painted on top of each,
paired swooshes of dots that shrink as they curl away, and petals outlined
in small dots. Every dot is drawn at the size a real dotting tool makes, and
the key under the mandala shows each tool at true size with its number,
the colours by letter, and a table saying which tool and colour each ring
uses.

## How to use it

Print the template at 100% (no "fit to page"), so the dots come out at
their true sizes. Work from the centre outward, one ring at a time: check
the ring in the table, load the tool with that number, and touch it to the
centre of each circle. Dot-in-dot rings: let the first dot dry, then add
the smaller dot on top. Swooshes: start with the big dot and go down the
tool sizes, or reload less paint for each dot so they shrink by themselves.
Letters inside the bigger dots give the colour; choose your own paints for
A, B, C and so on. The colour page is a finished example to follow, or to
use as wall art as it is. The template also works on paper with markers or
paint pens.

## Purpose

Dot mandalas are a hugely popular relaxing craft on stones, canvases and
paper, but the hard part for beginners is the layout: even spacing, rings
that close neatly, dots that do not run into each other. These templates do
the layout — every ring closes evenly round the circle and no two dots touch
— so the painter can enjoy the dotting.

## History

Mandalas, circular designs with radial symmetry, come from Hindu and
Buddhist traditions and are found in many cultures. Dot painting as a
modern craft — dot mandalas on rocks and canvases with ball styluses and
acrylic rods — grew in the 2010s from nail art and decorative painting and
spread through social media. It is distinct from the dot paintings of
Aboriginal Australian artists, which are a living art tradition with its
own stories and rules; these pages are mandalas, not Aboriginal designs.

## This implementation

- **Spec knobs:** `width`, `height`, `margin`; `folds` (how many times the
  pattern repeats round the centre, 4–24); `rings` (1–30, fewer if the page
  fills first); `min_tool`, `max_tool` (tool numbers 1–10 = 1.5, 2, 2.5, 3,
  4, 5, 6, 8, 10 and 12 mm); `gap_mm` (clear space between dots, 0.5–4);
  `stacked`, `swooshes`, `petals` (which ring kinds may appear); `colours`
  (2–6); `palette` (rainbow, sunset, ocean, earth, pastel); `legend`;
  `line_art` (the template); `stroke`.
- **Generation:** dots are laid out in millimetres at print size. The centre
  is the largest tool that fits, with up to two smaller dots stacked on it.
  Each ring starts one gap beyond the previous ring's outer edge. A plain
  ring of tool d at radius r holds the largest multiple of `folds` dots
  whose chord spacing is at least d plus the gap (pushed outward when not
  even `folds` fit), offset by half a step or not. Alternating rings put a
  big and a two-sizes-smaller dot in turn (a multiple of twice `folds`,
  spaced by their mean size plus the gap), with a big or a small dot on the
  axis so the mirror maps big to big. Stacked rings add a dot of at most 55%
  of the base's size on each dot. Swooshes are paired trails of four to six
  dots, stepping down the tool sizes along a curling path, each dot placed
  where it first clears the last, on both sides of every spoke. Petals are
  lenses outlined in the smallest tool with a larger dot inside, on or
  between the spokes. A swoosh or petal ring that would not fit falls back
  to a plain ring. Rings stop when the next would leave the page. The colour
  page paints the dots on a dark ground; the template draws each dot as a
  black outline with a pale tint and letters the dots of 6 mm and over.
- **Solving:** nothing to solve — a design.
- **Guarantees:** no two dots touch: every pair of dots is checked, all of
  them, to be at least `gap_mm` apart edge to edge, and every stacked dot to
  lie inside its base (`verification: no_two_dots_touch_exhaustive`,
  `min_clearance_mm`); a page that failed would not be returned. Dots are
  drawn at their tools' true diameters and every dot lies inside the room
  on the page. Tested: an independent brute-force pair check over many seeds
  and gaps (and a nudged dot is caught); every dot's image under a turn of
  one fold and under the mirror is present with the same tool, colour and
  ring, while half a fold is not a symmetry; every ring kind appears and
  each can be switched off; the template passes the adult colourability
  check in black and grey.
