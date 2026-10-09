---
title: "Pixel Art Paper"
blurb: "Pixel-art paper — 8×8 to 64×64 sprite tiles at an exact pixel size, with tile borders, centre guides, numbers and a transparency checkerboard"
category: paper
version: "1.0.0"
---
Sprite planning sheets — numbered tiles of 8×8 up to 64×64 pixels, one
square per pixel, with centre guides and a transparency checkerboard.

## What it is

A page of square **sprite tiles**, each ruled into a grid with one square
for every pixel. The tile sizes are the ones games and icons are made in:

- **8×8** — the hardware tile of the NES, the Game Boy and many other 8-bit
  machines; small items, bullets, font characters.
- **16×16** — the classic character sprite.
- **24×24** and **32×32** — more detailed characters, the common size for
  modern indie games and icons.
- **48×48** and **64×64** — portraits, large icons and bosses.

A heavier line frames each tile. Optional guides split it in half (and in
quarters) each way, for drawing symmetrical sprites. Each tile can carry a
small number above its corner, so a sheet of animation frames stays in
order. An optional light-grey **checkerboard** on alternate pixels is the
pattern pixel-art editors show behind a transparent background.

The page holds as many whole tiles as fit at a chosen pixel size, or it can
be set to a number of tiles across and down, with the pixel made as large as
those tiles allow. With no gap between tiles the sheet becomes one
continuous sprite sheet, tiles sharing their borders.

## How to use it

Print at actual size ("Actual size" or "100%", not "Fit to page"). Colour
one square for each pixel with pencils, markers or a fine pen. Leave the
grey checker squares empty where the sprite should be transparent: whatever
is left showing the checks is the background.

Use the centre guides to keep a face or a body symmetrical: draw one half,
then mirror it across the heavy middle line. For an animation, draw one
frame per tile in number order, changing a few pixels each time, and flip
through them. When the drawing is done, copy it into a pixel editor square
by square, or photograph it and use it as a reference layer.

## Purpose

Planning sprites, icons, tiles and fonts on paper before (or instead of)
drawing them on screen: game-jam teams sketch characters and animation
frames, teachers run pixel-art lessons and coding clubs plan sprites for
their games, and crafters use the same sheets for perler (fuse) beads,
cross-stitch and mosaic designs. In a book, pixel-art pages make a sprite
sketchbook or a companion to a game-design workbook.

## History

Drawing images square by square on a grid is far older than computers —
needlework and mosaic charts are the same idea. On screens, deliberately
placed pixels date at least to Richard Shoup's SuperPaint system at Xerox
PARC in 1972, and the name "pixel art" was first published in 1982 by
Adele Goldberg and Robert Flegal of Xerox PARC, in *Communications of the
ACM*. Arcade games such as *Space Invaders* (1978) and *Pac-Man* (1980)
made the look famous. Home consoles and computers drew moving objects as
hardware **sprites** of fixed size — the NES built its characters from 8×8
(or 8×16) tiles, the Commodore 64's sprites were 24×21 pixels — and artists
planned them on squared paper before typing the bytes in. Image editors
later adopted the grey-and-white checkerboard as the sign of a transparent
background, and pixel-art tools still show it today.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `tile` (px8, px16, px24,
  px32, px48, px64; default px16); `fit` (pixel_size — keep `pixel_mm`,
  0.5–10 mm, default 2.5, and fit as many tiles as the page holds — or
  tile_count — fit `tiles_across` (1–16, default 3) × `tiles_down` (1–20,
  default 4) at the largest pixel that allows); `gap_mm` between tiles
  (0–20, default 5; 0 makes one continuous sprite sheet); `guides` (none,
  half, quarters); `numbers` (tile index above each tile); `checker`
  (grey on alternate pixels); `ink` (pixel lines, default gray), `tile_ink`
  (borders and numbers, default charcoal); `weight` of the pixel lines in
  points (0.1–2; borders are 3×, centre guides 2×).
- **Generation:** a tile is `px × pixel` a side; tiles sit at an exact pitch
  of side + gap across, and side + gap + the number band down, as many
  whole tiles as fit, and the block is centred in the content box. In
  tile-count mode the pixel is the largest multiple of 0.05 mm (0.5–10 mm)
  that fits the requested tiles; if even 0.5 mm pixels cannot fit them, the
  count is reduced and the request recorded as `requested_tiles_across` /
  `requested_tiles_down`. In pixel-size mode a tile too large for the page
  shrinks its pixel (on the same step) until one tile fits, recorded as
  `requested_pixel_mm`. Numbers are 6 pt, made smaller (down to 3 pt) when
  the widest number would overhang its tile, and dropped (meta
  `numbers_dropped`) if even 3 pt is too wide. Checker squares are the
  pixels whose row + column is odd, so every tile starts with a white
  top-left pixel. Every mark of one style is one path.
- **Solving:** nothing to solve — a page to draw on. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** every pixel square is exactly the pixel size and every tile
  exactly `px` pixels a side; tiles sit at an exact pitch; numbers read 1, 2,
  3 … left to right and top to bottom, sit above their own tile and touch no
  tile or other number; all ink — stroke widths and numbers included — stays
  inside the margins on every page size and orientation. Any knob outside its
  range is clamped and the request recorded as `requested_<field>`; meta
  records `tile_px`, `pixel_mm`, `tile_mm`, `tiles`, `tile_count` and
  `spacing_exact`.
