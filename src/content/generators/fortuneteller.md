---
title: "Fortune Teller"
blurb: "Fortune teller — a paper cootie catcher to cut and fold, with colour flaps, numbers and kind fortunes"
category: design
version: "1.0.0"
---
Cut out the square, fold it into a fortune teller, and let a friend pick a
colour and a number to find their fortune.

## What it is

A printable paper fortune teller — also called a cootie catcher, salt
cellar or chatterbox. The page holds one big square to cut out: four
coloured corner flaps (or four pictures), eight numbers and eight hidden
messages, with every fold line dashed. Under the square, five small
pictures show how to fold it. The messages can be fortunes ("You will make
a new friend"), kind words ("You are brave and clever"), silly things to do
("Hop on one foot ten times"), a mix, or your own.

## How to use it

**Folding.** Cut out the big square on the solid line.

1. Lay it printed side down. Fold each corner to the middle.
2. Turn it over.
3. Fold each corner to the middle again.
4. Fold it in half both ways and open it out.
5. Push your thumbs and first fingers into the four pockets underneath and
   pinch the points together.

**Playing.** Hold the fortune teller closed and ask a friend to choose a
colour (or picture). Spell it out, opening the fortune teller one way and
then the other for each letter. Your friend picks one of the numbers they
can see; count it out the same way. They pick a number again; lift that
flap and read out the message underneath. Then swap!

Every word on the paper is printed so that it reads the right way up once
the fortune teller is folded: the colours from outside, the numbers inside,
and each message when its flap is lifted.

## Purpose

Making one is a short lesson in following steps in order, in precise folds
and in symmetry, and playing it practises spelling, counting and reading
aloud. Writing your own messages is a small creative writing task, and kind
messages turn the game into a way of saying something nice. It suits ages
seven to twelve; younger children can play with one an adult has folded.

## History

The fortune teller is one of the best-known paper folds in the world. Its
first two steps — folding the corners of a square to the middle — are the
"blintz" fold, named after the folded pancake, and the finished shape was
long known in Britain as a salt cellar, since it could stand on a table and
hold salt. Paper-folding books from the early twentieth century describe
it, and children have since used it for games and fortunes in many
countries, under names such as cootie catcher, chatterbox and snapdragon.

## This implementation

- **Spec knobs:** `flaps` (`colours` — four tinted colour flaps, named; or
  `pictures` — four pictures from the shared icon set, named), `theme`
  (`mixed`: three fortunes, three kind words and two things to do;
  `fortunes`, `compliments`, `actions`), `fortunes` (up to eight of your
  own, each up to 48 characters; the rest come from the theme), `colour`
  (tints and coloured pictures, or line art to colour in), `width`,
  `height`.
- **Generation:** the seed picks four of seven colours (or four of twelve
  pictures) and the messages from hand-written, kid-safe lists. The
  numbers run 1 to 8 clockwise round the folded square. Each message is
  wrapped into its flap's triangle with lines parallel to the flap's hinge,
  the longest line nearest it, at the largest size that fits; a message
  with a word too long for a flap is refused with a clear error.
- **Solving:** nothing to solve — it is a game. There is no answer key.
- **Guarantees:** every label is rotated so that it reads upright after
  folding, checked rather than assumed. The folds are modelled as
  reflections of the paper (corners to the middle across the diamond's
  sides; after turning over, corners to the middle again; the two middle
  creases of folding in half), and each label's frame is carried through
  them: it must land on the face it belongs to (numbers on the inner
  faces, colour names on the back of the folded square, messages on the
  inside of their flap), not be mirrored as seen from that face, and point
  its top inward — numbers straight in from the nearest edge, flap names to
  the centre, messages towards their flap's hinge — to within a hundredth
  of a degree. Every corner of every text and picture box stays inside its
  crease-bounded region (no word is bent over a fold), and the message
  under each number is the one printed on that number's flap. Tests also
  show the check has teeth: labels printed upright on the flat sheet, any
  label turned upside down, or two messages swapped all fail it. Meta
  reports `upright_after_folding: true` and `answers_checked: true`.
