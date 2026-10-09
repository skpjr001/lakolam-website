---
title: "Light"
blurb: "Light — ray diagrams for mirrors and lenses, the mirror and lens formulae in either sign convention, power and refraction, every ray diagram checked by tracing"
category: maths
version: "1.0.0"
---
Mirrors, lenses and refraction: complete the ray diagram, use the mirror and lens formulae, bend light with Snell's law — every ray diagram checked by tracing its rays.

## What it is

A physics worksheet of four to eight questions on light. In a ray
diagram a concave or convex mirror, or a convex or concave lens, stands on
its principal axis with its focus F and centre of curvature C (or 2F)
marked to scale and an object arrow in front of it; pupils draw two rays
from the top of the object, find the image, and describe it — real or
virtual, inverted or upright, magnified, the same size or diminished —
and say where it forms. Numerical questions use the mirror and lens
formulae to find the image distance, the magnification, the image height,
the focal length or the object distance, and the power of a lens or of two
lenses in contact. Refraction questions find a refractive index from the
speed of light, use Snell's law with given sines, and find critical
angles. The answer key draws the rays and fills in every answer.

## How to play

1. **Ray diagrams.** Draw two rays from the top of the object with a
   ruler. A ray parallel to the axis leaves a concave mirror or convex lens
   through F, and leaves a convex mirror or concave lens as if it came from
   F (draw that backward part dashed). A ray to the pole P of a mirror
   reflects at the same angle on the other side of the axis; a ray
   through the centre O of a lens goes straight on.
2. The top of the image is where the rays meet. If they only meet when
   you extend them backwards (dashed), the image is **virtual** and
   upright; if the light really meets there, it is **real** and inverted.
   Compare its height with the object's and say where it lies (for
   example between F and C, or beyond 2F).
3. **Formulae.** Use the sign convention in the box at the top. New
   Cartesian: measure every distance from the mirror or lens, positive in
   the direction the light travels, so the object distance u is negative;
   for mirrors 1/v + 1/u = 1/f and m = -v/u, for lenses 1/v - 1/u = 1/f and
   m = v/u. Real is positive: 1/f = 1/u + 1/v for both, with virtual image
   distances and the focal lengths of convex mirrors and concave lenses
   negative, and m = -v/u.
4. A negative magnification means an inverted image; the image height is
   m × the object height.
5. **Power** P = 1/f with f in metres (100/f with f in cm), in dioptres:
   positive for a converging lens, negative for a diverging one. Powers of
   lenses in contact add.
6. **Refraction.** n = c/v with c = 300,000,000 m/s. Snell's law: n₁ sin i =
   n₂ sin r. At the critical angle the refracted ray runs along the
   boundary, so sin C = n₂/n₁ (1/n into air).

## Purpose

Light is a five-mark-question chapter of India's CBSE class 10 science
("Light — Reflection and Refraction"), where ray diagrams and the mirror
and lens formulae in the New Cartesian convention are examined every year;
GCSE Physics covers lenses, ray diagrams and magnification; and US physics
courses teach the thin-lens equation with real-is-positive signs. Drawing
rays builds the picture, and the formulae make it precise: the page asks
for both, so pupils can check one against the other.

## History

Ibn al-Haytham's *Book of Optics* (1011-1021) explained images by rays of
light travelling from objects to the eye, and studied mirrors and
refraction by experiment. Willebrord Snell found the law of refraction in
1621 (Ibn Sahl had described it in 984), and René Descartes published it
in 1637. Edmond Halley gave the thin-lens formula in 1693. Ole Rømer showed
in 1676 that light has a finite speed, and Léon Foucault measured that it
travels more slowly in water (1850), settling that refraction comes from a
change of speed. The dioptre was proposed by Ferdinand Monoyer in 1872.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `ray_diagrams`,
  `mirrors`, `lenses`, `refraction`); `convention` (`cartesian`,
  `real_positive`; refraction questions ignore it); `count` (4-8, clamped
  and recorded as `requested_count`); `width`, `height`, `line`.
- **Generation:** object distances are simple multiples of the focal
  length (3, 5/2, 2, 5/3, 3/2 or 4/3 for real images; 1/2, 2/3 or 1/3
  inside F; 1/2 to 3 for diverging devices), never at F, so images are at
  most three times the object's size and image distances are exact. Focal
  lengths for numericals are 10-40 cm, and questions are kept only when
  every distance and magnification terminates within two decimal places.
  Easy draws convex lenses and concave mirrors with real images and asks
  refractive index from speed and Snell's law from air; Medium adds
  virtual images, convex mirrors, concave lenses, image distance with
  magnification, and power; Hard adds focal length, object distance and
  image height from the formula, Snell's law between two media and
  critical angles; Expert adds the object distance from a magnification,
  two lenses in contact, critical angles into water or plastic, and
  relative refractive index. The mirror and lens topics start at Medium
  and Kids is served at Easy (meta `requested_difficulty`). Ray diagrams
  are drawn to scale with C (or 2F) on both sides; on the key the
  outgoing rays run to the edge of the diagram and virtual images get
  dashed backward extensions. No question repeats on a page.
- **Solving:** numericals are checked by substituting the printed
  answers into the page's own convention: u and f are re-derived from the
  question's words with their signs, then 1/v + 1/u = 1/f (or 1/v - 1/u,
  or 1/u + 1/v) must hold exactly in rational arithmetic, along with m,
  h' = m × h, P = 100/f, n₁ sin i = n₂ sin r, n₁ sin C = n₂ and n v = c.
  Ray diagrams are checked by tracing: the parallel ray (through or away
  from the focus) and the central ray are intersected exactly, the
  meeting point must equal the formula's image, and the printed
  description must be the one read off that point.
- **Guarantees:** `answers_checked`, `rays_traced` and `unique`: each
  numerical has one exact answer and each image one description. The tests
  rework every numerical in floating point from the textbook formulae,
  check textbook cases (object at 2F, CBSE's 30 cm and f = 20 cm giving
  v = 60 cm and m = -2), confirm the two conventions differ only in sign,
  measure that every drawn ray passes within 0.1 pt of the drawn image,
  catch changed answers and descriptions, and keep every printed
  character inside the font.
