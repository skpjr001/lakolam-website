---
title: "Stamped Cloth"
blurb: "Adinkra-style stamped cloth with invented stamps in comb-ruled squares, strips joined by woven bands"
category: design
version: "1.0.0"
---
A cloth ruled into squares with a comb and stamped square by square, in the manner of Asante adinkra cloth — with stamps invented for the page.

## What it is

Adinkra cloth from Ghana is printed by hand: the cloth is ruled into a grid with a
wooden comb dipped in dye, leaving bands of a few parallel lines that drift slightly
as the hand moves, and each square is then stamped over and over with one carved
calabash stamp. Strips of the cloth are often joined by narrow bands of brightly
coloured strip weave.

This page makes a cloth in that manner. **Its stamps are invented**: each one is a
new geometric mark made for this page from squares, bars, steps, diamonds, ladders and
meanders, with a mirror or half-turn symmetry. None of the named adinkra symbols is
drawn, because those symbols belong to the Akan tradition and each carries its own
proverb and meaning. Palettes: black on white, black on russet, and outlines to
colour.

## How to use it

Display it, or colour the outline version: traditional cloth is printed in one dark
colour on a plain or dyed ground, so colour every stamp black or dark brown and choose
one ground colour — white, russet, red or indigo; the joining bands take bright
stripes of red, yellow, green and black. Children can carve their own stamps from
potato or eraser and print a cloth the same way.

## Purpose

A bold graphic print and colouring page, and an introduction to how stamped cloth is
made, without borrowing a living tradition's sacred and proverbial symbols.

## History

Adinkra cloth is made by the Asante (Ashanti) of Ghana, centred on the village of
Ntonso near Kumasi; it was traditionally worn at funerals and on solemn occasions, and
today on many others. The dye, *adinkra aduru*, is boiled from the bark of the
badie tree; the stamps are carved from calabash gourd; the grid is drawn with a comb
(*dua afe*). The symbols — Gye Nyame, Sankofa and hundreds more — each stand for a
proverb or idea and are an important part of Akan visual culture. This page is a
geometric grammar in the manner of the cloth's making (comb grid, repeated stamps,
woven joins) and deliberately invents its stamps.

Sources: Kwame Arhin and Michael Kwamena-Poh, Ghana National Museum notes on adinkra;
Doran H. Ross, *Wrapped in Pride: Ghanaian Kente and African American Identity*
(UCLA Fowler Museum, 1998); G. F. Kojo Arthur, *Cloth As Metaphor: (Re)reading the
Adinkra Cloth Symbols of the Akan of Ghana* (2001).

## This implementation

**Spec knobs:** `strips` (1–6; 0 = 2–3 by the seed); `across` (squares across each
strip, 1–4); `rows` (1–10; 0 = 4–5); `comb_lines` (lines in each comb band, 2–5);
`repeats` (stamps across a square, 2–4; 0 = varies); `bands` (woven joining bands);
`palette` (auto, black_on_white, black_on_russet, line_art); `stroke`; page `width`,
`height`, `margin`.

**Generation:** stamps come from the ornament toolkit's cell-glyph grammar on a 9×9
grid with a clear border, two colours, and the symmetries D4, D2, a vertical mirror or
a half turn — never quarter turns alone; any stamp that is unchanged by a quarter turn
but by no mirror (a pinwheel, which can read as a hooked cross) is rejected, as are
near-empty and near-solid stamps and duplicates under rotation and reflection. The
cloth is split into strips (with joining bands between), each ruled by comb bands
around and between its squares: every band is its set of parallel lines, drifting
together as a hand-held comb does, each with a gentle wobble. Each square is stamped
with one stamp in a grid of 2 to 4 impressions a side, each a little off register.

**Solving:** Nothing to solve.

**Guarantees:** every square repeats exactly one stamp, all impressions the same
size and inside the square; every comb band has exactly the requested number of lines;
no stamp on any page is a pinwheel or uses quarter-turn symmetry without mirrors; all
ink is on the page.
