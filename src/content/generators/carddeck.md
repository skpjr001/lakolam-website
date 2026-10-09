---
title: "Card Deck"
blurb: "Printable card decks and domino sets — 52 cards and jokers in large print, double-6, double-9 and double-12 dominoes — every set complete and every back registered for duplex printing"
category: design
version: "1.0.0"
---
Print-and-cut playing cards and domino sets, with large print for players
who need it and backs that line up when printed on both sides.

## What it is

A complete set to print on card stock and cut out: 52 playing cards with up
to four jokers, or a double-six (28 tiles), double-nine (55) or
double-twelve (91) domino set. In large print each card carries a big rank
and suit across its top and bottom, readable across the table; the pips
keep their usual places, the picture cards show a crown, and the jokers a
star. Domino halves show pips in the familiar arrangements, coloured by
number, or plain numerals. Card backs carry a pattern that looks the same
either way up. The pages come in pairs: a sheet of fronts, then the sheet
of backs that goes on its reverse.

## How to use it

Print on card stock with two-sided printing turned on, choosing the same
flip (long edge or short edge) the sheet was made for. If your printer
cannot print both sides, print the fronts, put the pages back in the tray
and print the backs. Cut along the lines between the corner marks; the back
pattern runs a little past each cut so a small slip still looks tidy. A
paper trimmer and a corner rounder make the cards feel like a bought deck.
For the sturdiest dominoes, glue the tiles onto mounting board before
cutting.

## Purpose

Large-print cards are hard to find in shops and wear out, and a lost card
ruins a deck. A printed set can be replaced card by card, made in any size,
and given four-colour suits so diamonds and hearts, clubs and spades never
get mixed up. Domino sets make a home-made Mexican train or a classroom
maths game. The deck rounds out packs of games for seniors and families.

## History

Playing cards reached Europe in the 1370s; the French suits of spades,
hearts, diamonds and clubs appeared around 1480, and corner indices in the
1860s, letting a hand be held in a fan. Four-colour packs have been printed
since the 19th century and are used in online poker. Dominoes came to
Europe from China in the 18th century; double-nine and double-twelve sets
grew popular with games such as Mexican train in the 20th century.

## This implementation

- **Spec knobs:** `set` (cards, double-6, double-9, double-12), `jokers`
  (0–4, cards only), `size` (small: bridge cards or 0.75 × 1.5 in tiles;
  standard: poker cards or 1 × 2 in tiles; jumbo: 3.5 × 5 in cards or
  1.5 × 3 in tiles), `large_print`, `faces` (pips or numerals, dominoes
  only), `four_colour` (cards only), `colour` (red suits and coloured pips;
  in black ink the red suits are drawn hollow), `back` (seeded pattern or
  plain), `duplex` (long or short edge) and `page` (Letter or A4). A knob
  that does not apply to the chosen set is reported as `requested_<knob>`.
- **Generation:** the pieces are laid in a grid centred on the page with at
  least a quarter inch of margin, as many per sheet as fit, with up to a
  9 pt gutter. Each back sits at the mirror image of its front for the
  chosen flip, carried half a gutter past the cut. The seed picks the accent
  colour and the back pattern (lattice, rings, chevrons, dots or checks).
- **Verification:** `obeys()` checks that every card (each rank of each suit
  and the jokers) or every domino pair a ≤ b appears exactly once, that
  every corner of each front lands on a corner of its back when the sheet
  is turned over, that no pieces overlap and that every cut line is inside
  the margin. Tests check the pip layouts (count, left-right symmetry,
  half-turn symmetry for all but the seven, every domino layout the same
  either way up), turn the rasterised back sheet over and find back, not
  paper, under every front, and check each back pattern is the same upside
  down.
- **Guarantees:** `set_complete` and `registration_checked` in the meta,
  with the piece count, sheets, page order and piece size.
