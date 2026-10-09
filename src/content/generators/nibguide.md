---
title: "Nib Guide Sheets"
blurb: "Broad-edge calligraphy guide sheets — italic, foundational, uncial, textura and Roman capital rows in nib widths, with a nib ladder and pen-angle mark"
category: paper
version: "1.0.0"
---
Broad-edge calligraphy guide sheets ruled in nib widths — Italic,
Foundational, Uncial, Textura and Roman capitals, with the nib-width ladder
at the start of every row.

## What it is

Practice paper for the scripts written with a broad-edged pen, where the
width of the nib sets the size of every letter. Each script's letters are
a fixed number of **nib widths** tall, so the rows are ruled to match the
pen in your hand:

- **Italic** — x-height 5 nib widths, ascenders and descenders 4 more,
  capitals 7; pen held at about 45° and letters leaning forward about 5°.
- **Foundational** — Edward Johnston's hand: x-height 4, ascenders and
  descenders 3, capitals 6; pen at 30°, upright.
- **Uncial** — round capitals with short extenders: x-height 3.5,
  ascenders and descenders 1.5; a flat pen at about 20°, upright.
- **Textura** — Gothic blackletter: x-height 5, ascenders and descenders
  2; pen at about 40°, upright.
- **Roman capitals** — pen-made capitals 7 nib widths tall; pen at 30°.

Every row starts with a **ladder**: little squares one nib width on a side,
stacked corner to corner through the x-height and up and down through the
ascender and descender zones — the same marks you make yourself with the
pen turned flat across the line. Beside it a **pen-angle mark** shows the
angle to hold the nib's edge, and light **slant lines** show the lean of the
downstrokes (vertical guides for the upright scripts). A dashed capital line
marks where Italic and Foundational capitals reach.

## How to use it

Print at actual size ("Actual size" or "100%", not "Fit to page"), then
choose the sheet for your nib: a 2.5 mm nib wants the 2.5 mm sheet. To check,
make your own ladder with the pen held flat across the line — your squares
should match the printed ones.

Sit each small letter on the heavy baseline and reach the line above it;
ascenders rise to the top line of the row and descenders drop to the bottom
line. Hold the nib's edge at the angle of the mark at the start of the row
and keep it there through every stroke — the thick and thin strokes come
from the angle, not from pressure. Keep downstrokes parallel to the guide
lines. Many calligraphers lay thin layout paper over the sheet and write on
that.

## Purpose

Guide sheets for learning and practising the broad-edge scripts —
Italic for handwriting and invitations, Foundational as a first bookhand,
Uncial and Blackletter for certificates and titles, Roman capitals for
headings — and for any nib, from fine 1 mm pens to 6 mm poster nibs. In a
book they make the practice pages of a calligraphy workbook.

## History

Measuring letters in pen widths is how the broad-edge scripts were
rediscovered. Edward Johnston, studying medieval manuscripts in the British
Museum, worked out that their letters were written with an edged pen held
at a constant angle, and his *Writing & Illuminating, & Lettering* (1906)
taught letter heights in pen widths. His Foundational hand was based on the
10th-century Ramsey Psalter. The scripts themselves are much older: Roman
square capitals reached their classic form in inscriptions such as the one
on Trajan's Column (AD 113); Uncial was a book script of the 4th to 8th
centuries; Textura was the formal Gothic hand of the later Middle Ages and
the model for Gutenberg's type; and Italic grew from the chancery cursive of
Renaissance Italy, set down in writing manuals such as Ludovico degli
Arrighi's *La Operina* (1522). The ladder of nib-width squares is the
measuring rule calligraphy teachers have used since Johnston's day.
Published proportions vary a little from teacher to teacher (Foundational
is sometimes taught at 4.5, Uncial at 4); these sheets use the common
values above and let you change them.

## This implementation

- **Spec knobs:** `page` and `landscape`; `margin_mm` (0–30, default 10);
  `script` (italic, foundational, uncial, textura, roman_capitals, custom;
  default italic); `nib_mm` (1–6, default 2.5); overrides, each `null` for
  the script's value: `x_height_nibs` (1–12), `ascender_nibs` and
  `descender_nibs` (0–10), `pen_angle_deg` (0–90), `slant_deg` (0–20,
  forward lean from upright); `row_gap_nibs` (0–10, default 2; at 0 rows
  share their outer lines); `ladder`, `pen_angle_mark`, `slant_lines`,
  `cap_line` (all on); `slant_spacing_mm` (3–50, default 10); `ink` for the
  ruling (default gray), `accent_ink` for ladder and mark (default
  dark red); `weight` (0.1–2 pt, default 0.4). The custom script starts
  from x-height 5, extenders 3, pen 35°, upright.
- **Generation:** a row is ascender + x-height + descender nib widths; rows
  repeat at that height plus the gap, as many as fit, centred down the page.
  Lines shared by two rows are drawn once, the heavier kind winning. Each
  row's ladder fills every zone with nib squares in alternating columns,
  ending on a partial square when a zone is a fractional number of nibs.
  The pen-angle mark (a horizontal arm, the nib edge at the pen angle and
  an arc between, at most 4 nib widths long and never taller than the
  x-height) sits on the baseline right of the ladder. Slant lines run
  through each row from there to the right margin, their feet
  `slant_spacing_mm` apart along the baseline. If a whole row would not fit
  the page at the asked nib width, the nib is reduced until one does and the
  meta says so (`requested_nib_mm`, `nib_reduced_to_fit`).
- **Solving:** nothing to solve — a page to write on. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** every zone is exactly its number of nib widths; ladder
  squares are exactly one nib width wide and fill each zone; rows repeat at
  an exact pitch; slant lines lean exactly the asked angle and stand the
  asked distance apart; all ink stays inside the margins on every page size
  and orientation. A knob outside its range is clamped and recorded as
  `requested_<field>` in the meta.
