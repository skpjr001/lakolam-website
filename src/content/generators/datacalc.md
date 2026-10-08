---
title: "Data Calculations"
blurb: "Data units, file sizes and compression — bits and bytes, image, sound and text sizes, transfer times, run-length encoding and Huffman coding, every answer recomputed independently"
category: maths
version: "1.0.0"
---
Bits and bytes, file sizes, run-length encoding and Huffman trees — every answer exact and checked a second way.

## What it is

A computer science worksheet of four to ten questions on how data is
stored and squeezed. Unit questions convert between bits, nibbles, bytes
and kilo-, mega-, giga- and terabytes. File-size questions work out the
size of an image from its width, height and colour depth, of a sound clip
from its sample rate, bit depth and length, and of a text file from its
characters, and how long a file takes to send. Run-length questions encode
a string or a row of black and white pixels, decode a code back into
pixels to shade, or count the bits saved. Huffman questions decode or
encode with a drawn tree, or build the tree from letter counts and write
each letter's code. A box at the top prints every fact and rule the page
uses. The answer key fills in every answer, shades the pixels and draws
each Huffman tree.

## How to play

1. **Units:** 1 byte is 8 bits and a nibble is 4 bits. With the page's
   prefixes, 1 kB = 1000 bytes and each step up (MB, GB, TB) is another
   1000 — or, on binary pages, 1 KiB = 1024 bytes and each step is 1024.
   To go to a smaller unit multiply; to a bigger one divide.
2. **Images:** size in bits = width × height × colour depth (bits per
   pixel). Divide by 8 for bytes, then by 1000 (or 1024) for each prefix.
   n bits per pixel give 2 × 2 × … × 2 (n twos) colours.
3. **Sound:** size in bits = sample rate × bit depth × seconds, doubled
   for stereo.
4. **Text:** size in bits = characters × bits per character.
5. **Sending a file:** time in seconds = size in bits ÷ speed in bits per
   second, and 1 Mbps is 1 000 000 bits per second.
6. **Run-length encoding:** write each run as its length then its
   character, left to right: WWWBBW is 3W 2B 1W. To decode, write each
   character as many times as its number says.
7. **Huffman trees:** to read a code, start at the top and follow 0 for
   left and 1 for right until you reach a letter. To build a tree, join
   the two smallest counts into one node (smaller on the left) and write
   their total on it; repeat until one tree is left. A letter's code is
   the path from the top.

## Purpose

Data representation is a core topic of England's GCSE Computer Science
(AQA 8525 section 3.3, OCR J277 1.2), and exam papers set exactly these
calculations: units with the board's prefix convention, file sizes for
images, sound and text, and run-length and Huffman compression with bits
saved. Doing them by hand shows why a photo is bigger than a page of text,
why CD sound needs so many bytes, and how compression wins by giving
common things short codes.

## History

Claude Shannon's 1948 paper founded information theory and popularised
the word "bit" (coined by John Tukey). Werner Buchholz named the byte at
IBM in 1956. David Huffman found his optimal prefix code in 1952 as a
student in Robert Fano's MIT class, choosing the term paper over the final
exam. Run-length encoding was used to send television signals in 1967 and
is still inside fax machines and the BMP and PCX image formats. The
International Electrotechnical Commission introduced the binary prefixes
KiB, MiB and GiB in 1998 to end the confusion between 1000 and 1024.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `units`, `file_sizes`,
  `run_length`, `huffman`); `prefixes` (`decimal`: 1 kB = 1000 bytes, as
  AQA uses, or `binary`: 1 KiB = 1024 bytes; ignored on pages with no unit
  or file-size question — topics `run_length` and `huffman`); `count`
  (4-10, clamped and recorded as `requested_count`); `width`, `height`,
  `line`.
- **Generation:** numbers are drawn for the level and kept only when the
  answer terminates within three decimal places. Easy converts between
  bits, nibbles and bytes, gives small images, sounds and texts in bits,
  encodes a string by run-length and decodes with a drawn Huffman tree.
  Medium uses kilo- and megabytes, asks sizes in bytes and colours from a
  colour depth, encodes pixel rows and encodes text with a drawn tree.
  Hard converts across several prefixes, asks sizes in kB, transfer times
  (binary pages give the file in bytes, as network speeds are always
  decimal), decodes pixel rows and builds Huffman trees from five counts.
  Expert adds stereo sound, 7-bit ASCII, decimal fractions of units, the
  bits run-length encoding saves (8 bits per character against 16 per
  run) and the bits a six-letter Huffman code saves against 8-bit ASCII.
  Binary pages ask Expert sound sizes in KiB, since a binary megabyte
  never divides a sound file exactly. Kids is served at Easy (meta
  `requested_difficulty`). No question repeats on a page.
- **Solving:** every size is recomputed from a table of bits per unit
  (the generator divides step by step); every run-length code is decoded
  back and must have maximal runs, which makes it the only code for its
  text; every Huffman tree is rebuilt with a re-sorted list instead of
  the generator's heap. Huffman counts are drawn so that no two weights
  ever tie at any step, so under the printed rule (smaller on the left,
  left = 0) the tree and every code are unique.
- **Guarantees:** `answers_checked` and `unique`. The tests check
  textbook values (100 × 100 pixels at 24 bits is 30 kB; a minute of CD
  sound is 5.292 MB; the classic six-letter Huffman example costs 224
  bits with codes 0, 100, 101, 1100, 1101, 111), recompute image and sound
  sizes a third way, check every Huffman code set is prefix-free and fills
  its tree (Kraft's equality), that the coded length equals the sum of
  the merged weights, that a changed answer is caught, that `prefixes`
  changes exactly the pages that use units, and that every drawing stays
  inside its question.
