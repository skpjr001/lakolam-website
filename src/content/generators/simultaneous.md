---
title: "Simultaneous Equations"
blurb: "Simultaneous equations — elimination, substitution, word problems and how many solutions, every answer proven the only one"
category: maths
version: "1.0.0"
---
Two equations, two unknowns, one answer — by elimination, by substitution, and in words.

## What it is

A worksheet of four to twelve questions on pairs of linear equations in x
and y (a "system of equations" in the US, "simultaneous equations" in the
UK, a "pair of linear equations in two variables" in India). Some pairs are
to be solved by elimination, some by substitution; word problems about
tickets, farmyards, shopping, ages, digits and a boat on a river turn into
a pair; and "how many solutions?" questions ask whether a pair has one
solution, none or infinitely many — or which coefficient would leave it
with none. The answer key fills in every answer and, where there is room,
shows the working: which equations were combined, the one-letter equation
left over, or the two equations a story makes.

## How to play

A pair of equations is solved by values of x and y that make **both**
equations true at once.

- **Elimination:** make the number in front of one letter the same size in
  both equations — multiply one equation, or both, if you need to. If the
  signs are the same, subtract the equations; if they are opposite, add
  them. That letter disappears, leaving an equation in one letter. Solve
  it, then put the value back into either equation to find the other
  letter.
- **Substitution:** if one equation already says y = … (or x = …), put that
  expression in place of the letter in the other equation. If neither
  does, rearrange the simpler equation first — one with a letter on its
  own is easiest. Solve, then substitute back.
- **Word problems:** choose a letter for each unknown (say x for the number
  of adults and y for the number of children), write one equation for each
  fact in the story, and solve the pair.
- **How many solutions?** Compare the numbers in front of x, in front of y,
  and on the right. If the x and y numbers are not in the same proportion,
  there is exactly one solution (the lines cross). If they are in
  proportion but the right-hand numbers are not, there is no solution
  (parallel lines). If all three are in the same proportion, the two
  equations are the same line, and there are infinitely many solutions.
- **Check:** put your answers back into both of the original equations.
  Answers may be fractions on the hardest pages — leave them in lowest
  terms.

## Purpose

Solving two linear equations together is a core algebra skill in every
secondary curriculum: Common Core grade 8 (8.EE.8) and Algebra I (A-REI.6),
GCSE Mathematics in England (Foundation and Higher), and chapter 3 of
India's NCERT class 10 book, "Pair of Linear Equations in Two Variables",
which adds the consistency tests on the ratios of the coefficients. The
graphical method lives on the line-graph worksheet; this page is the
algebra: choosing a method, carrying it through, and modelling a story.

## History

Systems of linear equations are among the oldest problems in mathematics.
Chapter 8 of the Chinese *Nine Chapters on the Mathematical Art* (compiled
by the 1st century CE) solves them on a counting board by what is now
called Gaussian elimination, and Diophantus and later Indian and Islamic
mathematicians posed puzzle problems that lead to pairs of equations. The
determinant test for a unique solution goes back to Seki Takakazu and
Leibniz in the late 17th century, and Cramer published his rule in 1750.
The "two numbers with a given sum and difference" and the farmyard heads-
and-legs puzzle have been school favourites for centuries.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `elimination`,
  `substitution`, `words`, `solutions`); `locale` (`us` "systems of
  equations" and dollars, `uk` "simultaneous equations" and pounds, `in`
  "pairs of linear equations" and rupees); `count` (4-12); `working` (show
  the working on the key, default on); `width`, `height`, `line` (clamped
  to sensible page sizes).
- **Generation:** every solvable pair is built around its solution, chosen
  first (whole numbers 1-10 on Easy, with negatives from Medium); the
  coefficients are drawn and the constants follow. Elimination is rated by
  the method the coefficients need, read back from the pair itself: Easy
  pairs share a coefficient up to sign (add or subtract straight away),
  Medium pairs need one equation multiplied, Hard pairs need both, and
  Expert pairs have fractional answers (denominators up to 6). Substitution
  gives y = mx + k or x = my + k on Easy and Medium, two standard-form
  equations with a coefficient of 1 to rearrange on Hard, and fractional
  answers on Expert. Word problems climb from two numbers, a rectangle's
  perimeter and tickets (Easy), through farmyards and shopping (Medium),
  shopping that needs both equations multiplied and ages (Hard), to ages,
  two-digit numbers and a boat with the stream (Expert). "How many
  solutions" questions start at Medium (a Kids or Easy request is served
  at Medium and meta records `requested_difficulty`); Expert adds finding
  the coefficient n that leaves a pair with no solution or infinitely
  many. Kids is served as Easy. Equations are printed with no common
  factor, and no pair repeats on a page.
- **Solving:** answers come from Cramer's rule in exact fractions. The
  key's elimination working combines the equations by the smallest
  multipliers (it eliminates the letter whose coefficients have the
  smaller lowest common multiple); substitution working shows the
  rearranged equation and the one-letter equation after substituting.
- **Guarantees:** `unique` — every solvable pair has a nonzero determinant
  a1·b2 − a2·b1, which proves its solution is the only one; the solution
  is substituted back into both equations; "how many" answers are read
  from the ranks of the pair; a found n is the only coefficient giving that
  count; and every word-problem answer is checked against the story's own
  numbers (heads and legs, prices and totals, ages now and later) rather
  than against its equations. The tests also confirm each solution by a
  separate search for every whole-number solution of the (scaled) pair,
  check the method each level promises, that the key writes in red where
  the page is blank, and that every printed character is in the font.
