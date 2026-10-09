---
title: "Comic Panels"
blurb: "Comic page templates — classic, nine-panel, splash, four-koma, webtoon and manga layouts with trim guides"
category: paper
version: "1.0.0"
---
Comic and manga page templates — classic six-panel, nine-panel, splash,
four-koma, webtoon and manga layouts, with print guides for a real comic
page.

## What it is

A page of empty panel borders ready to draw a comic in. Choose a layout:

- **Classic six:** three rows of two, the everyday comic page.
- **Nine-panel grid:** three rows of three, for tight, steady storytelling.
- **Four-panel grid** and **two tiers** of wide panels.
- **Splash:** one panel filling the page, and **splash plus three**: a big
  opening panel over a row of three.
- **Three tiers with a wide panel:** two panels, one wide panel, two panels.
- **Four-koma:** two strips of four panels, the Japanese "yonkoma" comic
  strip; the right-hand strip is read first.
- **Webtoon:** three tall full-width panels with wide gaps, the way a
  scrolling web comic is laid out.
- **Manga:** slanted dividers above and below a wide middle panel.

The gaps between panels, the gutters, are narrower between panels side by
side (4 mm) than between rows (6 mm), so the eye reads across before it
reads down.

By default the panels sit on a US comic book page drawn in light
"non-photo" blue: the solid line is the trim (6.625 × 10.25 inches, the
standard comic size), the dashed line outside it the bleed (an eighth of an
inch more, for art that runs off the page), and the dashed line inside it
the safe area (a quarter inch in) that the panels fill. The page is scaled
to fit the sheet: about print size on Letter or A4, and about one and a
half times print size on Tabloid or A3 — the traditional 11 × 17 inch art
board size comic artists draw at.

## How to use it

Print at actual size. Sketch each panel lightly in pencil, add speech
balloons and captions early so they have room, then ink over the top. Read
the panels left to right and top to bottom (right to left for manga and
four-koma).

Keep words and faces inside the panels and away from the edges. Art that
should run off the page can be drawn out to the dashed bleed line: anything
beyond the solid trim line is cut off when a comic is printed. The light
blue guides were traditionally chosen because they vanish when a page is
scanned or copied in black and white. To make your own layout, ink over
two panels and the gutter between them to merge them, or draw a panel
breaking out of its border for impact.

## Purpose

For comic artists, cartoonists, students and young storytellers: planning
and drawing comic pages, manga, four-panel gag strips and webtoon
episodes; thumbnailing a page before drawing it larger; and comic-writing
projects in class. In a book, these pages make a comic sketchbook.

## History

Comic books took their size from newspaper comic supplements folded in
half: the first American comic books of the 1930s were reprints of
newspaper strips. The modern US comic page settled at about 6.625 × 10.25
inches, and artists have long drawn originals on 11 × 17 inch board at
about one and a half times that size, ruled in non-photo blue. The
nine-panel grid is closely associated with *Watchmen* (1986–87). Japanese
four-panel yonkoma strips have run in newspapers and magazines for about a
century, and webtoons — vertical-scrolling comics read on phones — grew
up in South Korea in the 2000s.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `layout` (classic_six,
  nine_grid, four_grid, splash, splash_plus_three, two_tier,
  three_tier_wide, four_koma, webtoon, manga); `frame` (comic — the US
  comic page — or sheet: panels fill the printed area); `guides` (bleed,
  trim and safe lines; comic page only); `gutter_mm` (0–20, default 4,
  between panels side by side; the slanted manga gutters are measured
  square to the divider); `tier_gutter_mm` (0–20, default 6, between rows;
  webtoon gaps are three times this); `ink` (default black) and `weight`
  (0.25–4 pt, default 1.5) for the borders; `guide_ink` (default light
  blue).
- **Generation:** on the comic page the bleed box (6.875 × 10.5 in) is
  scaled to the largest size that fits the content box and centred; trim
  and safe area sit 0.125 in and a further 0.25 in inside it at the same
  scale (recorded as `scale`, 1.0 = print size). The panels fill the safe
  area (or the whole content box on the sheet frame): rows are split by
  height weights and each row by width weights, gutters subtracted. A
  gutter wider than an eighth of the panel area's width (or a row gap
  wider than a twelfth of its height) is reduced and the request recorded.
- **Solving:** nothing to solve — a page to draw on. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** each layout has its panel count; the panels together
  span the panel area exactly and stay inside it; no two panels are closer
  than the narrower gutter; the trim has exactly the 6.625 : 10.25 shape
  with bleed and safe lines at their exact scaled insets; and all ink stays
  inside the margins, checked on every page size, orientation, layout,
  frame and gutter setting. A knob outside its range is clamped and
  recorded as `requested_<field>`.
