---
title: "Constellation Cards"
blurb: "Constellation cards: a sheet of star-chart, colouring or dot-to-dot cards, each with its best evening month and brightest star"
category: design
version: "1.0.0"
---
A sheet of cards, one constellation each — a star chart, a colouring card
or a dot-to-dot — with the month it is best seen and its brightest star.

## What it is

Each card shows one constellation's stick figure with its real stars, the
brighter ones drawn bigger, north at the top and east to the left as you see
it in the sky. Under the figure are the month when it stands highest in the
evening sky, around nine o'clock, and the name and brightness of its
brightest star. A sheet can hold the twelve constellations of the zodiac,
the best constellations of one season's evenings for the northern or
southern hemisphere, or a random handful of the 88.

The chart cards are deep blue with coloured stars — bluish-white for hot
stars, orange for cool ones. The colouring cards turn every star into a
five-pointed outline to fill in. The dot-to-dot cards hide the lines:
numbered stars to join in order.

## How to use it

Cut the cards apart on the dashed lines. On a clear evening in the month
printed on a card, look south (north in the southern hemisphere) at about
nine o'clock and the constellation will be near its highest. Hold the card
up against the sky and match its brightest stars first. For the
dot-to-dot cards, join the numbers in order with a ruler; a boxed number
means "lift your pencil and start a new line here". A star with two numbers
is visited twice. The answer sheet shows the finished figures.

Card games: deal the season's cards and race to find each constellation;
sort the zodiac cards into the order the Sun passes through them; match the
brightest-star names to their cards.

## Purpose

Learning a dozen constellations is the start of finding your way round the
night sky. Cards are easy to carry outside, the computed "best month" tells
you when to look, and drawing the figure yourself (colouring or joining the
dots) fixes its shape in memory better than looking at a chart.

## History

The 88 modern constellations were fixed by the International Astronomical
Union in 1922, with boundaries drawn by Eugène Delporte in 1930; most of
the northern ones descend from the 48 in Ptolemy's *Almagest* (2nd century)
and the southern ones from Dutch navigators and Lacaille in the 16th to
18th centuries. Star names are those approved by the IAU Working Group on
Star Names. Stars come from the Yale Bright Star Catalogue (5th ed.,
Hoffleit & Warren 1991, public domain); the stick figures from Olaf
Frohn's d3-celestial (BSD-3 licence).

## This implementation

- **Spec knobs:** `set` (zodiac, seasonal, random), `season` (auto, winter,
  spring, summer, autumn — in the chosen hemisphere), `hemisphere` (north,
  south), `variant` (chart, colouring, dot_to_dot), `card_size` (small:
  12 per sheet, medium: 6, large: 4), `palette` (auto, midnight, indigo,
  lagoon — the chart cards), `width`, `height`.
- **Generation:** each card projects its figure's stars stereographically
  about the figure's centre (the normalised mean of the stars' unit
  vectors), mirrored so east is to the left, and scales it to fill the card.
  Only the figure's own stars are drawn (Serpens's two parts are joined).
  The best evening month is the month of the day in 2026 when the centre's
  right ascension equals the local sidereal time at 21:00 local mean time,
  taken as the mean Sun's longitude + 135°. A seasonal sheet takes the
  figures best seen in that season's three months that rise at least 15°
  at mid-latitudes (centre declination above −35° in the north, below +35°
  in the south), the brightest half always and the rest drawn by the seed
  from the next tier; cards are sorted round the sky by right ascension. A
  zodiac sheet with fewer than twelve places starts at a seeded sign. The
  dot-to-dot numbers every visit along the figure's strokes (strokes that
  meet end to end are joined into one), boxes each stroke's first number,
  and places each label in the first of eight directions where it covers
  no dot and no other label.
- **Solving:** Nothing to solve; the dot-to-dot's answer key is the
  outlined figure.
- **Guarantees:** deterministic; every drawn star belongs to its figure and
  every segment of the figure is drawn exactly once (tested on all 88);
  Orion is best in January, Leo in April, Scorpius in July and Pegasus in
  October; every brightest star has a printable name; cards tile the page
  without overlapping and every star lands inside its card; the dot-to-dot
  ships its answer key with `answers_checked`.
