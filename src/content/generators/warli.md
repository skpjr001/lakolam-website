---
title: "Warli-Style Painting"
blurb: "Warli-style painting: white triangle-and-circle figures on red ochre — a tarpa spiral of dancers holding hands, village life and borders"
category: design
version: "1.0.0"
---
White figures of triangles, circles and lines on a red ochre wall: dancers
holding hands in a spiral round a tarpa player, and the busy life of a
village.

## What it is

A painting in the manner of the Warli people of Maharashtra, India. Warli
painting uses a very small set of shapes. A circle is the sun or the moon,
or a head. A triangle is a hill or a tree. Two triangles meeting point to
point make a person's body, with the top triangle for the chest and the
bottom one for the hips. Arms and legs are single lines. With only these
marks, a painter shows a whole world: dancing, ploughing, carrying water,
fishing, huts, trees, cattle and birds.

This page paints one such world in white on a red ochre or brown ground.
The main picture is the *tarpa* dance. Dancers hold hands in a long spiral
round a musician playing the *tarpa*, a long horn made from a dried gourd.
Above the dance are the sun and flying birds, and below it is a strip of
village life. The other scene is a village in rows: huts and trees,
ploughing and hoeing, a line of dancers with a drummer, and fishers on a
river bank above a stream of fish. A border of small dancers or of
triangle hills runs round the edge.

## How to use it

Start at the musician in the middle and follow the dancers round and
outward, hand to hand, to the last dancer at the end of the spiral, who is
waving. Every hand along the way holds the next one. Count the dancers,
or find the one with a different step. In the village scene, look along
each row for what people are doing. The line-art style is a colouring
page: colour the ground first, then the figures. Warli paintings are
white on a dark wall, so try a red, brown or black background with the
figures left white.

## Purpose

To enjoy a living art that makes a lot out of very little: three shapes,
lines and a sense of rhythm. The page is made for looking, copying and
colouring. It also shows how a figure can be built from a few angles, and
how a crowd can be arranged so that nobody bumps into anybody.

## History

The Warli are an Adivasi (indigenous) people who live mainly in Palghar
district of Maharashtra, around Dahanu, Talasari, Jawhar and Mokhada, and
in nearby parts of Gujarat and Dadra and Nagar Haveli. Their paintings
were made by women on the inside walls of their huts. The walls are
plastered with mud, cow dung and red earth. The painting is done in a
white paste of ground rice and water, with a thin bamboo stick chewed at
the end to make a brush. Paintings were made for weddings, harvests and
other important times in the year. Some of them have religious meaning,
such as the square *chauk* painted for a wedding. This page leaves all such
images out and keeps to scenes of everyday life.

The tarpa is a real instrument of the region. It is a long horn made of a
dried gourd with bamboo pipes, and its player leads the dance. The dancers
follow in a winding line or circle, holding each other round the waist or
by the hands. A spiral of dancers round a tarpa player is one of the best
known pictures in Warli painting.

In the early 1970s, Warli painters began to paint on paper and cloth as
well as on walls, and the art became known across India and abroad. Jivya
Soma Mashe (1934–2018), from Ganjad near Dahanu, was the best known of
them. His large, crowded paintings were shown in many countries, and he
was awarded the Padma Shri in 2011. Warli painting is registered as a
Geographical Indication of India. Many Warli artists, men and women, now
paint for a living. This page uses Warli's shapes and grammar to make up
its own scenes. It does not copy any painting or any artist's work.

## This implementation

- **Spec knobs:** `width`, `height` (points, 200-3000; default 600 × 800);
  `margin` (0-200 pt, default 16). `scene` is `tarpa` (default: the spiral
  dance with sky above and a village strip below, or village columns at
  the sides on a wide page) or `village` (rows of village life under a
  sky). `turns` (1-5, default 3) is the number of turns of the tarpa
  spiral; it is used only by the tarpa scene. `border` is `figures`
  (default: a chain of small dancers along every side, with a sun in each
  corner), `triangles` (a row of hills) or `none`. `style` is `terracotta`
  (white on red ochre, default), `brown` (white on brown mud) or `lines`
  (black line art for colouring). `wobble` (0-1, default 0.5; 0 =
  ruler-true) is how much the hand-drawn lines wander. `stroke` (0.3-3,
  default 1) is the line weight.
- **Generation:** a person is two triangles meeting at the waist, a round
  head and stick limbs, posed by angles: the thigh and shin of each leg,
  and the upper arm and forearm of each arm. An arm can also reach for a
  point. It is a two-part arm whose elbow bends below the line, and it
  goes straight when the point is too far. Holding hands works this way:
  the hand between two neighbours is placed first, halfway between their
  shoulders and a little lower, and both arms reach for it. Other poses
  carry a pot on the head, swing a hoe, hold a net, beat a drum or play
  the tarpa. Huts, trees, palms, cattle, goats, fish, birds, the sun and
  the moon are built from the same triangles, circles and lines. In the
  tarpa scene, the dancers stand on an Archimedean spiral round the
  musician, feet in and heads out, a fixed distance apart along the curve.
  The distance between turns is a figure's height plus a gap. The figure
  size is worked out from the space, so the outermost raised hand still
  fits in the circle. If figures would be too small, fewer turns are used.
  Village rows are filled left to right. Each thing is built, measured,
  scaled to the row and added only if it fits, and the spare space is
  shared out evenly. The four corners round the dance circle hold birds,
  trees, a goat or a woman with a pot. Every line then gets a seeded hand
  wobble of bounded size, and the gaps all allow for it. Both ends of
  every open line stay fixed, so held hands still meet.
- **Guarantees:** figures never overlap. This is checked with a
  separating-axis test: the outline round each figure's body (or each
  thing) is more than a line width away from every other one. No arm
  enters another figure's body, and no two arms cross, except the two
  arms that hold the same hand. In every chain of dancers (the spiral, the
  border sides and the dancing rows), each pair of neighbours' hands meet
  at exactly the same point, with the wobble on. The spiral is one
  unbroken chain whose dancers move outward along it, and the whole
  spiral stays inside its circle. Scene things stay inside the field,
  border things inside the border band, and all ink stays on the page,
  for every scene, border, page shape and the largest stroke and wobble.
  `verification: figures_apart_hands_meet_ink_inside`. The line-art page
  reports the adult colourability check as `colorable`. Clamped knobs are
  reported as `requested_<field>`.
