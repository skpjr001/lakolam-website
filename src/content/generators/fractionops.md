---
title: "Fraction Operations"
blurb: "Fraction operations — add, subtract, multiply, divide, simplify, convert, compare and order fractions and mixed numbers"
category: maths
version: "1.0.0"
---
Add, subtract, multiply and divide fractions and mixed numbers, then simplify,
convert, compare and order them, with answers in simplest form.

## What it is

A worksheet of fraction arithmetic written the way it is in a textbook: each
fraction stacked over a bar, each mixed number with a large whole part beside
it. One page practises one skill: adding and subtracting with like, related or
unlike denominators; multiplying and dividing proper fractions, improper
fractions, mixed numbers and whole numbers; simplifying to lowest terms;
switching between mixed numbers and improper fractions; filling in equivalent
fractions; comparing two numbers with <, > or =; or putting several in order.
The answer key writes every answer in red and, when working is switched on,
shows the steps under each problem.

## How to use it

- **Adding and subtracting.** If the bottom numbers (denominators) match, add
  or subtract the top numbers and keep the bottom number. If they differ, find
  the smallest number both bottoms divide into, rewrite each fraction over it,
  then add or subtract the tops. Write mixed numbers as improper fractions
  first, or work with the whole numbers and the fractions separately.
- **Multiplying.** Multiply the tops together and the bottoms together. Write
  mixed and whole numbers as improper fractions first (3 is 3/1).
- **Dividing.** Keep the first fraction, change ÷ to ×, and flip the second
  fraction upside down; then multiply.
- **Simplest form.** Divide the top and bottom by the biggest number that goes
  into both, until nothing but 1 does. If the top is bigger than the bottom,
  write the answer as a mixed number: divide top by bottom; the quotient is
  the whole number and the remainder goes over the same bottom.
- **Improper fractions.** Multiply the whole number by the bottom and add the
  top; that is the new top, over the same bottom.
- **Equivalent fractions.** Whatever you multiply (or divide) the bottom by,
  do the same to the top.
- **Comparing and ordering.** Rewrite the fractions over a common bottom
  number and compare the tops. The open side of < or > faces the bigger
  number.

## Purpose

Fraction arithmetic is the long middle of the primary and middle-school maths
curriculum (US grades 3-7, UK Years 4-8, India Classes 3-7), and it takes a
lot of practice to make the common-denominator and simplifying steps
automatic. These pages give that practice at a chosen level with answers that
are guaranteed right and a key that shows the working, so a parent, tutor or
teacher can see exactly where a child went wrong.

## History

Egyptian scribes wrote fractions as sums of unit fractions nearly four
thousand years ago; the stacked numerator-over-denominator notation came from
Indian mathematicians such as Brahmagupta (7th century), and the fraction bar
was added by Arabic writers, notably al-Hassar in the 12th century, and spread
to Europe through Fibonacci's *Liber Abaci* (1202). "Invert and multiply" for
division has been taught in schools since at least the 18th century.

## This implementation

- **Spec knobs:** `difficulty` (sets every knob left unset); `operation`
  (`add`, `subtract`, `add_subtract`, `multiply`, `divide`,
  `multiply_divide`, `all_four`, `simplify`, `convert`, `equivalent`,
  `compare`, `order`); `denominators` (`like`, `related` — one divides the
  other, `unlike` — neither does, `different` — related or unlike, `any`;
  used by addition, subtraction and comparing, and `like` also by ordering);
  `min_denominator` / `max_denominator` (2-99); `numbers` (`proper`,
  `improper` — each problem has an improper fraction, `mixed` — each has a
  mixed number, `whole` — one whole number and one fraction, `any` — proper
  fractions and mixed numbers); `simplify` (`none` / `some` / `all` arithmetic
  problems need a simplifying step); `answers` (`simplest` — lowest terms and
  mixed numbers, or `improper` — lowest terms, improper allowed); `max_whole`
  (largest whole part, 1-20); `show_steps` (a working row under each problem,
  filled in on the key); `problems` (1-30); `locale` (`us` "simplest form",
  `uk` "simplest form" / "smallest to largest", `in` "lowest terms"); page
  `width`, `height`, `line`.
- **Difficulty → grade:** Kids = grade 3 (add and subtract like denominators
  2-8, proper fractions, sums within one whole, nothing to simplify). Easy =
  grade 4 (like denominators 2-12 with mixed numbers, half the problems
  simplify). Medium = grade 5 (related and unlike denominators 2-12 with mixed
  numbers, common denominator at most 36, half simplify). Hard = grade 6
  (multiply and divide fractions and mixed numbers, denominators 2-12, every
  problem simplifies, answer denominators at most 60). Expert = grade 7 (all
  four operations with mixed numbers, denominators 2-16, every problem
  simplifies, answer denominators at most 100). The other operations take the
  level's denominators and number types; ordering uses 3, 3, 4, 4 and 5
  numbers. Negative fractions (also grade 7) are not included. Difficulty is
  rated by operation, denominators and number types
  (`rating_basis: operation_denominators_and_number_types`).
- **Generation:** problem kinds are dealt in turn over the page, and in
  `some` mode the first half of the arithmetic slots must simplify and the
  rest must not; each group is drawn at random under its rules (denominator
  pair of the asked relationship, operands of the asked kinds, subtraction
  larger minus smaller, no multiplying or dividing by 1, no x ÷ x) and
  rejected until distinct. Operands are in lowest terms, except in
  like-denominator addition and subtraction, where numerators are free
  (2/8 + 3/8). A whole number plus or minus a lowest-terms fraction can never
  need simplifying, so `numbers: whole` with addition or subtraction requires
  `simplify: none`. Equal pairs appear in about a fifth of comparisons with
  different denominators. A page with working rows fits about 12-14 problems;
  more are refused with a message (turn `show_steps` off for up to 30).
  Generation takes a few milliseconds.
- **Solving:** answers are computed with exact rational arithmetic (checked
  i128 fractions, never floats). "Needs simplifying" is judged on the raw
  result of the standard written method: sums and differences over the least
  common denominator (with mixed numbers as improper fractions — the same
  verdict as working the wholes and fractions separately, since adding whole
  multiples of the denominator never changes a common factor), products of
  tops over products of bottoms, and division as multiplying by the
  reciprocal. The key shows the answer in red on the answer line and, with
  `show_steps`, the rewritten fractions, the raw result and the reduction.
- **Guarantees:** deterministic per seed. Every answer is re-derived in the
  tests by a second method (cross-multiplication over the product of the
  denominators, reduced by Euclid's gcd) and must equal the rational answer;
  every printed answer has gcd(top, bottom) = 1; every mixed number has
  0 < top < bottom and whole × bottom + top equal to the improper numerator;
  the simplifying mode holds for every problem (checked a second way: the
  reduced denominator is smaller than the raw one exactly when simplifying
  was needed), and `some` gives exactly half (rounded up); number types and
  denominator relationships hold for every problem; no two problems on a page
  are the same, with a + b and b + a (and a × b, b × a) counted as one.
  `answers_checked`, `no_duplicates` in meta.
