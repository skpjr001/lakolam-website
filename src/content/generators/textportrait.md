---
title: "Text Portrait"
blurb: "A picture (an upload or a built-in picture) drawn with text: words repeated with weight following darkness, typewriter-style tone ramps, or a calligram written inside the shape"
category: design
version: "1.0.0"
---
A picture written in words: letters that grow bold in the shadows, typed
characters that shade like a pencil, or a verse that fills a shape.

## What it is

A page that draws a picture with nothing but text. Upload a photo or drawing
(or use one of the built-in pictures) and choose how the words draw it:

- **Weight** — your text runs line after line across the whole picture,
  over and over. Every letter is drawn bolder where the picture is dark and
  finer where it is pale, so from a distance the words become shading. The
  letters can also grow and shrink with the shading, or do both.
- **Ramp** — typewriter art. Each place on the grid gets the character
  whose ink best matches the shade there: a full stop or a dash for pale
  areas, a heavy W, 8 or hash mark for the shadows. Choose all the
  characters, only the classic marks, only capital letters, or only the
  letters of your own text.
- **Calligram** — your text written only inside the dark shape, flowing on
  from line to line; the pale background stays empty paper, so the words
  themselves become the silhouette.

Each comes in black ink or in colour: the picture's own colours letter by
letter, or a palette from dark to light.

## How to use it

Choose a picture with a clear subject and strong light and shade: a face lit
from one side, an animal against a pale sky, a bold silhouette. Then choose
the words: a favourite verse, a name repeated, a song, a wedding vow or a
recipe. Letters, numbers and punctuation are drawn in capitals; letters from
other alphabets and symbols the lettering cannot draw are left out.

Small letters make a finer picture; large letters make the words easier to
read. Step back from the page to see the picture, and come close to read
the words. For a calligram, a bold shape with little detail reads best. If
the picture is a dark subject on a pale background and you want the
background written instead, swap dark and light.

## Purpose

To show that tone can be made from text alone: the more ink a letter lays
down, the darker it reads, so words can carry a whole picture and still be
read up close. It makes a personal print or gift (a portrait written in a
poem, a pet drawn in its own name) and a lesson in how printers, typists and
early computer artists made pictures from type.

## History

Shaped and pictorial writing is old. Greek pattern poems such as Simmias of
Rhodes' "Egg" and "Wings" (about 300 BC) set verse in the outline of their
subject, and George Herbert's "Easter Wings" (The Temple, 1633) is the best
known English example. From about the ninth century Jewish scribes practised
micrography, writing the Masoretic notes of Hebrew Bibles in minute script
shaped into animals, plants and borders. Lewis Carroll's "Mouse's Tale" in
Alice's Adventures in Wonderland (1865) tapers down the page like a tail, and
Guillaume Apollinaire named the form in his collection Calligrammes (1918).

Typewriter art followed the typewriter. A plate in Pitman's Typewriter
Manual (1893) is the earliest recorded example of "art typing", and Flora
Stacey's butterfly, built from brackets, dashes, strokes and an asterisk,
was printed in Pitman's Phonetic Journal on 15 October 1898; typists' clubs
held competitions for such pictures for decades after. In 1966 Kenneth
Knowlton and Leon Harmon at Bell Labs scanned a photograph and replaced
every patch of tone with a small symbol of matching density ("Studies in
Perception I", the Computer Nude), one of the first and most widely shown
works of computer art. Teletype and RTTY operators traded character
pictures through the 1960s and 70s, and the ASCII art of bulletin boards and
the early internet used density ramps such as " .:-=+*#%@" — the same idea
this page's ramp mode measures exactly from its own lettering.

## This implementation

**Spec knobs** — `image` (a PNG or JPEG data URL; empty picks a built-in
picture by the seed); `mode` (`weight`, `ramp`, `calligram`); `style`
(`line` black ink, `colour`); `colours` (`picture`, or a palette by
darkness: `sunset`, `ocean`, `forest`, `berry`, `rainbow`, `ink_blue`);
`text` (empty or undrawable → a verse from William Blake's "Auguries of
Innocence", public domain); `width`, `height` (144–2000 pt), `margin`
(0–144 pt); `letter_size` (3–48 pt); `line_spacing` (0.8–3 em); weight
mode's `modulate` (`weight`, `size`, `both`) and `min_weight` (0–0.1 em);
`weight` (heaviest stroke, 0.04–0.3 em; ramp and calligram write at half of
it); ramp mode's `ramp` (`fine`, `classic`, `letters`, `text`) and `dither`;
calligram mode's `threshold` (0.05–0.95); `invert`. Out-of-range numbers are
clamped and the request recorded as `requested_<field>`; a letter size too
large for the page shrinks until six columns and six rows fit.

**Generation** — The upload is decoded in colour (longer side 256 px) and its
darkness (Rec. 709 luma) stretched to the full range; a built-in picture's
darkness is its silhouette at 45 % with the darker parts of its coloured
drawing on top. The picture is fitted inside the margins, less the letters'
overhang, and a grid of glyph cells (advance 0.6125 em, line pitch
`line_spacing` em) is centred on it; each cell's tone is the mean of nine
darkness samples over its glyph box. The text is cleaned for the stroke font
(small letters become capitals; whitespace runs become one space; characters
with no glyph are dropped and listed in meta as `dropped_characters`) and
repeated with a space between, starting at a word the seed picks. Weight
mode rounds each tone to 24 steps and sets stroke weight (and/or scale)
from it. Ramp mode measures every candidate character's ink from the font
itself — stroke length times weight plus the round caps — sorts them, and
picks the character whose ink is nearest the tone, optionally carrying the
error along the line. Calligram mode writes the next character in each cell
at or above the threshold. Letters of one stroke weight and colour are drawn
as one path. The seed picks the built-in picture and where in the text the
page begins.

**Solving** — Nothing to solve: a design to display.

**Guarantees** — Deterministic per spec and seed. Tone follows darkness:
the ink laid on dark cells exceeds that on light cells, recorded in meta
(`tone`, `tone_follows_darkness`) and tested by rasterising a grey ramp in
every mode. The ramp is in measured ink order. Every letter's ink lies
inside the margins (`inside_margins`). The page is text art, not outlined
regions, so it is honestly marked `colorable: false`. A blank upload that
gives nothing to write is a clean refusal.
