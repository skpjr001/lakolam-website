---
title: "Optical toys"
blurb: "Optical toys — phenakistiscope discs, zoetrope drums, flip books and thaumatropes from geometric animations whose loop closes exactly, slits registered with frames"
category: design
version: "1.0.0"
---
Phenakistiscope discs, zoetrope drums, flip books and thaumatropes to print,
cut out and spin, with geometric animations that loop without a jump.

## What it is

Four paper toys that turn still pictures into movement. They all use the same
animation, drawn as 8 to 24 frames (up to 48 in a flip book):

- **Phenakistiscope:** a disc with the frames in a ring and slits round the
  rim. You spin it in front of a mirror and look through the slits.
- **Zoetrope:** a drum. The pages hold a slotted wall, a picture strip that
  sits inside the wall, and a round base.
- **Flip book:** numbered cards to stack and staple.
- **Thaumatrope:** a disc with a picture on each side and strings at the
  edges. When you twirl it, the two pictures merge into one.

The animations are a bouncing ball that squashes as it lands, a swinging
pendulum, a turning cube, a polygon that swells into a circle, a dot drawing
a Lissajous curve, a turning sunflower with a ripple through its seeds, and a
stick figure walking. A blank set has faint guides so you can draw your own
animation. Pages come in colour, or as outlines to colour in.

## How to use it

Print at 100 % ("actual size") on thin card and check the 1 cm square with a
ruler. Cut along the solid lines and fold along the dashed ones.

- **Phenakistiscope:** cut out the disc and the black slits. Push a pin
  through the centre mark into a pencil's eraser so the disc can turn. Stand in
  front of a mirror with the pictures facing it. Spin the disc and look
  through the slits at the reflection: the pictures move. With as many slits
  as frames, the animation stays in place. Choose one slit more or one fewer
  and it creeps round the disc as it plays.
- **Zoetrope:** glue the wall parts into a ring, tab under the next part,
  with the printed side facing out. Fold the small tabs at the bottom inwards
  and glue them under the base disc. Join the picture strips into a loop and
  stand it inside the drum against the lower part of the wall, pictures facing
  in. Put a pencil through the centre of the base so the drum can turn, spin
  it, and look through the slits at the far side.
- **Flip book:** cut out the cards. Stack them with card 1 on top and the
  others in order beneath it, lining up the shaded edges. Staple twice through
  the marks, or clip with a bulldog clip. Hold the stapled edge, bend the
  cards up with your thumb, and let them flick past one by one.
- **Thaumatrope:** cut out the double disc and punch the four small holes.
  Fold along the dashed line so the back picture goes behind the front, and
  glue the two halves together. The holes line up. Tie a string through each
  side hole, then hold the strings and roll them between your fingers so the
  disc flips over and over. The two pictures become one, like the ball and its
  floor.

## Purpose

These toys show persistence of vision and stroboscopic viewing. They are a
staple of science and art lessons on how animation and film work, and making
them is a good craft activity. A toy only works if the frames are evenly
spaced, the slits line up with the frames, and the last frame leads smoothly
back to the first. Here that is built in and checked, so the motion is smooth
and loops without a jump.

## History

The thaumatrope was popularised in London in 1825 by the physician John
Ayrton Paris. In 1832 the Belgian physicist Joseph Plateau made the
phenakistiscope, and Simon Stampfer in Vienna built his stroboscopic disc
independently at the same time. William George Horner described a slotted
drum, the "daedaleum", in 1834. It was sold as the zoetrope from the 1860s,
by Milton Bradley in the United States among others. John Barnes Linnett
patented the flip book as the "kineograph" in 1868. Together these toys led
to the cinema.

## This implementation

- **Spec knobs:** `kind` (`phenakistiscope`, `zoetrope`, `flip_book`,
  `thaumatrope`); `animation` (`bouncing_ball`, `pendulum`, `cube`, `morph`,
  `lissajous`, `sunflower`, `walker`, `blank`); `frames` (8–24, flip books
  8–48, ignored by the thaumatrope); `drift` (slits minus frames, −1 to 1,
  discs and drums only); `size_cm` (disc diameter 8–30, drum diameter 8–25,
  card width 5–15, thaumatrope diameter 4–20, each limited to what fits the
  page; 0 picks 20, 12, 9 or 9); `look` (`colour`, `outline`); `index` (which
  page of the set); `page`, `landscape`; `margin` (inches). Out-of-range
  values are clamped and recorded as `requested_*`. Fields that do not apply
  to the chosen toy are echoed in the meta.
- **Generation:** an animation is a function of the phase t, with one loop
  running from t = 0 to 1. It is built only from functions with period 1 in t,
  such as sin 2πt, |sin πt| and turns of 2πt. Frame k of N shows t = k/N. The
  seed picks the colour scheme and the animation's settings: bounce height and
  squash, swing, tilt and starting turn, number of sides, Lissajous
  frequencies and phase, seed count and ripple, stride, and the guide's
  starting point.
  - **Disc:** frame k sits at angle 2πk/N on a ring, turned so its top points
    outward. The ring radius and cell size are solved so neighbouring cells
    and the slits never touch. The S = N + drift slits sit at 2πj/S.
  - **Drum:** the circumference is π × diameter. Frame k is centred at
    (k + ½)/N of it and slit j at (j + ½)/S. The wall is cut into parts
    between slits, and the picture strip between frames, each part short
    enough to fit the page with a glue tab.
  - **Flip book:** every card draws its picture in the same place beside a
    shaded binding margin.
  - **Thaumatrope:** the front shows the moving subject at a quarter of the
    loop and the back shows the setting. The two discs are joined by a fold
    line.
  - Pieces are shelf-packed at 100 %. `index` picks the page and the meta gives
    `pages`.
- **Solving:** nothing to solve.
- **Guarantees:** `loop_closes` and `geometry_checked`, re-checked from the
  finished model.
  - The animation one whole period on (t = 1) is the first frame (t = 0)
    again, point for point within 1e-9 of the frame box. Every frame stays
    inside its box.
  - Disc frames sit at exactly k/N of a turn, and each is frame 0 turned
    about the centre. Slits sit at exactly j/S of a turn.
  - Drum frames and slits sit at exactly (k + ½)/N and (j + ½)/S of the
    circumference. The wall parts and the picture parts each add up to the
    circumference, no wall cut passes through a slit and no picture cut
    through a frame. Each frame is its neighbour slid one frame width along.
  - Every flip-book card draws its picture with the same transform.
  - For the thaumatrope, folding the back disc behind the front and spinning
    it half a turn about the line through the string holes is simulated in
    3-D. The back's printed side ends up facing the viewer, and its centre,
    holes and picture land exactly on the front's.
  - Every piece lies inside the printable area at 100 %, with no two
    overlapping.
