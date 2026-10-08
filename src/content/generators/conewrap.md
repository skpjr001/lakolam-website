---
title: "Cone wraps"
blurb: "Cone wraps: tapered tumbler wraps, lampshades, cup sleeves, party cones and pot covers unrolled exactly, with seamless whole-number pattern repeats"
category: design
version: "1.0.0"
---
Exact unrolled templates for tapered tumbler wraps, lampshades, cup sleeves, party cones and plant-pot covers, with a pattern that meets itself invisibly at the seam.

## What it is

Anything shaped like a cone with its tip cut off — a tapered tumbler, an empire lampshade, a paper coffee cup, a flower pot — unrolls not to a rectangle but to a curved band: a slice of a ring. This generator draws that band at true size from three measurements (the diameter across the top, across the bottom, and the height), with a glue strip on the closing edge and a repeating pattern:

- **Kinds** with typical sizes ready to go: a 20 oz skinny tumbler wrap, an empire lampshade, a coffee-cup sleeve, a favour cone and a plant-pot cover. Type your own sizes to fit anything else; equal diameters make a straight band, and a diameter of 0 makes a cone.
- **Patterns:** chevrons, fish-scale scallops, polka dots, stripes, harlequin diamonds, or blank to decorate yourself.
- **Looks:** printed in colour, or black outlines to colour in.

A wrap too big for the page is cut into equal parts, each with its own glue strip, spread over as many pages as needed.

## How to use it

1. Measure your object: the diameter across the top, the diameter across the bottom, and the height straight up (not along the slope). For a tumbler, measure the part you want covered.
2. Print every page at 100 % ("actual size"), not "fit to page", and check the 1 cm square with a ruler.
3. Cut along the solid outline. Fold the glue strip back along the dashed line.
4. Wrap the band around the object, curved edges top and bottom (the word TOP marks the top edge), and glue the strip under the other end. With several parts, glue part 1's strip under part 2, and so on round, closing the last onto part 1.
5. For a lampshade, glue the band to a lampshade frame or a plain shade; for a favour cone, roll it into a point and glue.

## Purpose

Wrapping a tapered shape with a rectangle leaves the paper bunched at one end and gaping at the other; crafters use cone calculators to get the curved shape right. This page does that calculation and draws the result at true size, ready to print, with a pattern that runs right round and meets itself at the seam.

## History

Unrolling a cone is a classic of sheet-metal work and tailoring: tinsmiths laid out funnels, buckets and lamp shades with radial-line development long before printed patterns. Paper lampshades have been made from such templates since the nineteenth century, and the craze for decorated tumblers has made the "warped wrap" a popular download for crafters with cutting machines and sublimation printers.

## This implementation

- **Spec knobs:** `kind` (`tumbler`, `lampshade`, `sleeve`, `cone`, `pot`) supplies typical sizes; `top_cm`, `bottom_cm` (0–60, 0 = a point, null = the kind's size), `height_cm` (1–60, null = the kind's size); `pattern` (`chevron`, `scallop`, `dots`, `stripes`, `diamonds`, `blank`); `repeats` (1–60 round, 0 = about square motifs); `overlap_cm` (glue strip, 0–5); `look` (`colour`, `outline`); `index` (which page of the set); `page`, `landscape`, `margin`.
- **Generation:** with end diameters D > d and height h, the slant is s = √(h² + ((D − d)/2)²), and the band is a ring sector of outer radius R = s·D/(D − d), inner radius R − s and angle 180° × D/R, so the arcs are exactly the two circumferences. Equal diameters give a rectangle π·D by h. The band is cut into the fewest equal parts (each optionally turned on its side) that fit the printable area at 100 %, shelf-packed onto pages; a wrap whose part cannot fit is made shorter, and then narrower, and both are reported (`requested_*`, `height_cut_to_fit_cm`, `ends_cut_to_fit_cm`). The pattern is drawn in the wrap's own coordinates — the way round and the way up — with a whole number of repeats, then cut to each part's share of the way round. The seed picks the colours, a shift of the pattern round, and the number of rows.
- **Solving:** nothing to solve.
- **Guarantees:** `geometry_checked`, re-checked from the drawn shapes before the page is drawn: measured along the drawn lines, the top and bottom edges add up to π × diameter within 0.2 mm; every seam is the slant height; the parts cover the way round exactly once; the pattern crosses the opening and closing seams at the same places, so the join is invisible; every part lies inside the printable area at 100 % and no two overlap. The tests also roll the flat shape back up — a sector of angle θ becomes a cone whose radius-to-slant ratio is θ/360° — and confirm it gives back the two diameters and the height.
