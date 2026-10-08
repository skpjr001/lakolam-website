---
title: "Random Variables"
blurb: "Random variables — distribution tables, the binomial distribution, total probability and Bayes' theorem, and expected value of games, every answer an exact fraction re-derived by an independent count"
category: maths
version: "1.0.0"
---
Probability distributions, the binomial distribution, Bayes' theorem and fair games — every answer an exact fraction, checked a second way.

## What it is

A worksheet of four to ten questions on discrete random variables. A
table gives the probability distribution of X with an unknown constant k:
find k, a probability such as P(X ≥ 2), the mean E(X) and the variance. A
coin, a die or a packet of seeds sets up a binomial distribution: find
P(X = r), P(X ≤ r), the mean and the variance, or work back from the mean
and variance to n and p. Two bags, three machines or a medical test ask
for the total probability of an event and, by Bayes' theorem, the chance
of a cause given that the event happened. Spinners and bags of balls are
games: the expected winnings, the expected gain for a stake, the stake
that makes a game fair and the prize that makes it fair. The answer key
writes every answer in red.

## How to play

- **Finding k:** the probabilities in a distribution add up to 1. Add
  the entries, set the total equal to 1 and solve. When the entries hold
  k squared, solve the quadratic and keep the root that makes every
  probability between 0 and 1.
- **Probabilities from a table:** add the probabilities of the values
  that fit. For P(X < 2) take only the values below 2.
- **Mean:** E(X) is the sum of each value times its probability.
- **Variance:** Var(X) = E(X squared) – (E(X)) squared: square each
  value, multiply by its probability, add, then take away the mean
  squared. The standard deviation is the square root of the variance.
- **Changing the variable:** E(aX + b) = aE(X) + b and
  Var(aX + b) = a squared times Var(X); adding b does not change the
  spread.
- **Binomial:** for n independent trials, each a success with
  probability p, P(X = r) = nCr × p to the power r × (1 – p) to the power
  n – r. Add these for "at most" and "at least"; P(X >= 1) = 1 – P(X = 0).
  The mean is np and the variance is np(1 – p). Given the mean and the
  variance, divide to get 1 – p, then n.
- **Total probability:** for each cause multiply the chance of the cause
  by the chance of the event given that cause, then add.
- **Bayes' theorem:** the chance of one cause given the event is that
  cause's product divided by the total.
- **Games:** the expected winnings are the average prize, each prize
  times its probability. Take away the stake to get the expected gain. A
  game is fair when the expected gain is 0.
- **Two balls without replacement:** the second draw has one ball fewer
  in the bag. P(same colour) = P(red, red) + P(blue, blue).

Write fractions in lowest terms. Long fractions are also given to 4
decimal places in the key.

## Purpose

Random variables, the binomial distribution and Bayes' theorem are the
probability chapter of NCERT class 12 (chapter 13: conditional
probability, total probability, Bayes' theorem, random variables, mean,
variance and Bernoulli trials), the binomial distribution in A-level
Mathematics statistics, and AP Statistics unit 4. Exact fractions keep
the arithmetic honest, and checking each answer a second way means the
key can be trusted.

## History

Christiaan Huygens' *De ratiociniis in ludo aleae* (1657) introduced
expectation through fair games. Jacob Bernoulli's *Ars Conjectandi*
(1713) studied repeated independent trials and gave the binomial
probabilities their name of Bernoulli trials. Thomas Bayes' essay,
published after his death by Richard Price in 1763, inverted conditional
probability; Pierre-Simon Laplace stated the theorem in its general form
in 1774.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `distribution`,
  `binomial`, `bayes`, `expectation`); `count` (4-10); `width`
  (300-2000 Pt) and `height` (300-3000 Pt). Out-of-range values are
  clamped and reported in meta as `requested_*`; Kids is served as Easy
  with `requested_difficulty`.
- **Generation:** Easy: tables of c·k entries with k and one probability;
  binomial P(X = r) for n up to 5; two bags chosen by a coin or a die, the
  total probability of red; expected winnings on a fair spinner. Medium:
  the mean, the binomial mean, which bag the ball came from, the expected
  gain for a stake. Hard: tables of fractions with mean, variance and (when
  the variance is a perfect square) standard deviation, cumulative binomial
  probabilities and the variance, three machines and a faulty item, the
  fair stake. Expert: entries a·k² + b·k built so that the sum is a
  quadratic in k with one positive root, E(aX + b) and Var(aX + b), "at
  least one" and interval binomial probabilities, n and p from the mean
  and variance, a medical test, and the prize that makes a two-ball draw
  fair. A binomial answer that would round to 0.0000 or 1.0000 is
  rejected.
- **Solving:** exact fractions throughout: k from the sum of the entries,
  the variance as E(X²) – μ², binomial terms by nCr pʳqⁿ⁻ʳ, Bayes by the
  tree.
- **Guarantees:** every answer is re-derived by a different method: k
  from the linear or quadratic formula (every root in (0, 1] at which all
  entries are probabilities is found, and there must be exactly one), the
  variance as Σ(x – μ)²p, binomial probabilities by summing over all 2ⁿ
  success–failure sequences, n and p by searching every n up to 400 (one
  solution only), total probability and Bayes by counting a whole-number
  population (10 000 items or people, or every die-roll × ball), a
  two-ball draw by listing every ordered pair of balls, a fair prize by
  checking that the expected payout equals the stake. No two questions on
  a page are the same. Meta: `answers_checked`, `unique`, `difficulty`,
  `rating_basis` (`question_forms_by_level`), `checked_by`.
