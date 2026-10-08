---
title: "Logarithms"
blurb: "Logarithms — index and log form, evaluating logs, the laws of logarithms, exponential and log equations, every exact log proven by integer powers"
category: maths
version: "1.0.0"
---
Index and log form, evaluating logs, the laws of logarithms and exponential equations — every exact log proven by whole powers.

## What it is

A worksheet of four to twelve questions on logarithms. Rewrite 2⁵ = 32 as
log₂ 32 = 5 and back again; evaluate logs such as log₃ 81, log₂ 1/8 or
log₈ 2 without a calculator; combine 2 log₃ 6 – log₃ 4 into a single
logarithm, or evaluate log₆ 4 + log₆ 9; expand log(x²y/z); write log 18
in terms of p = log 2 and q = log 3; and solve equations such as
3^(2x – 1) = 27, 5^x = 40 (to 3 significant figures), log₂(3x + 2) = 5,
log₂ x + log₂(x + 2) = 3 and 2^(2x) – 6·2^x + 8 = 0. The answer key
writes every answer in red.

## How to play

- **Log form and index form:** log_b x = k means exactly the same as
  b^k = x. "The log is the power": log₂ 32 asks "2 to what power gives
  32?" — the answer is 5.
- **Evaluating:** write the number as a power of the base. log₂ 1/8 =
  –3 because 1/8 = 2^-3; log₈ 2 = 1/3 because the cube root of 8 is 2;
  log_b 1 = 0 and log_b b = 1. ln is the log to base e, so ln e³ = 3.
- **The laws:** log a + log b = log ab; log a – log b = log (a/b);
  k log a = log a^k (all to the same base). To write a single log, first
  move each number in front up as a power, then multiply and divide.
- **Expanding:** use the laws the other way: log(x²y/z) =
  2 log x + log y – log z, and a square root is a power of 1/2.
- **In terms of p and q:** write the number as a product of powers of 2
  and 3, such as 18 = 2 × 3², so log 18 = p + 2q.
- **Exponential equations:** if both sides can be written as powers of
  the same number, make the powers equal. Otherwise take logs of both
  sides: 5^x = 40 gives x = log 40 / log 5.
- **Log equations:** combine into one log, change to index form and
  solve. Check every answer: you can only take the log of a positive
  number, so reject any that would need the log of zero or a negative.
- **Hidden quadratics:** in 2^(2x) – 6·2^x + 8 = 0 let y = 2^x, solve
  y² – 6y + 8 = 0, then solve 2^x = y for each positive y.

## Purpose

Logarithms turn multiplication into addition and powers into products,
and solve every equation where the unknown is an exponent — growth,
decay, pH, decibels and earthquake scales. They are core content in US
Algebra 2 and Precalculus (Common Core F-LE.4, F-BF.5), A-level
Mathematics in England, and NCERT/ICSE classes 9–11 in India.

## History

John Napier published the first table of logarithms in 1614 to speed up
astronomers' multiplications; Henry Briggs recast them to base 10 in
1617, and common logarithm tables and slide rules did the world's
arithmetic for three and a half centuries. Leonhard Euler defined the
logarithm as the inverse of the exponential in 1748 and made e the
natural base.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `convert`, `evaluate`,
  `laws`, `equations`); `locale` (`uk` says "index form" and always
  writes base 10, `us` and `in` say "exponential form" and write a bare
  log for base 10); `count` (4-12); `width` (300-2000 Pt) and `height`
  (300-3000 Pt). Out-of-range values are clamped and reported in meta as
  `requested_*`.
- **Generation:** Easy: whole positive exponents, two logs into one,
  b^x = b^n and b^(x + c) = N. Medium: zero, negative and fraction
  arguments, coefficients in front of logs, evaluating with the laws,
  b^(ax + c) = N and log_b(ax + c) = k with whole answers. Hard:
  fractional logs such as log₈ 2 and log₄ 8, square-number bases with
  half powers, bases 1/2 and 1/3 in conversions, expanding log(x²√y/z),
  fractional exact solutions and b^x = c to 3 significant figures.
  Expert: roots inside logs, bases 1/2 and 1/3, ln of powers of e, logs
  in terms of p and q, e^(kx) = c, sums of logs with an extraneous root,
  and quadratics in b^x. Answers are chosen first so they come out
  exact.
- **Solving:** an exact log log_b x = p/q is accepted only when
  b^(p/q) = x holds exactly in whole-number powers and roots; equations
  are solved exactly (quadratics by whole-number roots of the
  discriminant).
- **Guarantees:** every answer is re-derived: conversions and values by
  exact powers and by floating-point logs; single logs by multiplying the
  arguments out exactly; expansions by comparing both sides at sample
  values; equations by substituting each root back, and log equations
  list exactly the roots inside the domain (the other root of the
  quadratic is rejected); 3 s.f. answers are recomputed and never sit on
  a rounding boundary, and only appear where no exact answer exists.
  Meta: `answers_checked`, `unique`, `difficulty`, `rating_basis`
  (`question_forms_by_level`), `exact_logs_proven_by`.
