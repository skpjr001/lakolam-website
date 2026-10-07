---
title: "Percentages"
blurb: "Percentages worksheet — percent of, change, reverse percentages, profit and loss, discount, tax, simple and compound interest"
category: maths
version: "1.1.0"
---
Percent of, percentage change, profit and loss, discounts, tax and interest — every answer exact.

## What it is

A worksheet of four to twelve percentage questions. The easiest pages are
bare facts such as 25% OF 160 = ____; later pages are short money problems:
a price that rises or falls, a sale with a percentage off, a shop's profit
or loss, sales tax (US), VAT (UK) or GST (India) added to a price or taken
back off it, and money invested at simple or compound interest. Each
question ends with one or two answer lines such as SALE PRICE = ____
DOLLARS. Amounts are written in dollars, pounds or rupees by region. The
answer key fills in every line.

## How to play

Percent means "out of 100": 15% is 15/100.

- **Percent of an amount:** multiply by the percentage and divide by 100.
  15% of 240 = 240 × 15 ÷ 100 = 36. Handy shortcuts: 10% is a tenth, 50%
  is half, 25% is a quarter, 5% is half of 10%.
- **One amount as a percentage of another:** divide, then multiply by 100.
  12 out of 25 = 12 ÷ 25 × 100 = 48%.
- **Increase or decrease:** find the percentage of the amount, then add it
  or take it away. Or multiply in one step: a 6% rise multiplies by 1.06,
  a 15% fall by 0.85.
- **Percentage change:** change ÷ original amount × 100. Always divide by
  the amount you started with.
- **Reverse percentages:** after a 20% rise the new price is 120% of the
  old one, so divide by 1.2 (not take 20% off!). After 30% off, divide by
  0.7.
- **Profit and loss:** profit = selling price − cost; loss = cost −
  selling price. Profit (or loss) % = profit ÷ cost × 100.
- **Discount:** the discount is the percentage of the marked price; the
  sale price is what is left.
- **Tax:** the tax is the percentage of the price; the total is the price
  plus the tax. To take tax back off a total, divide: with 20% VAT, divide
  by 1.2.
- **Simple interest:** interest = amount invested × rate × years ÷ 100.
  For months, use years = months ÷ 12. The total amount is the money
  invested plus the interest.
- **Compound interest:** each year the interest is added on, and next
  year's interest is worked out on the new total. Amount = P × (1 + r/100)
  for each year. When it is paid every six months, use half the rate for
  twice as many periods. Compound interest = amount − money invested.

Every answer on these pages comes out exactly — whole cents, pennies or
paise — so you never need to round.

## Purpose

Percentages are among the most-used pieces of school mathematics: prices,
sales, tax, wages and savings all use them. They are taught across grades
6-8 in the US Common Core (ratios and proportional reasoning: percent of a
quantity, markups, discounts, tax, simple interest), through Key Stage 3
and GCSE in England (percentage change, reverse percentages, compound
interest), and in the "Comparing Quantities" chapters of India's NCERT
class 7 and 8 books (profit and loss, discount, GST, simple and compound
interest, half-yearly compounding). The questions climb that ladder, and
because every answer is exact, practice focuses on the method rather than
on rounding.

## History

The idea is Roman: Emperor Augustus levied a tax of one hundredth
(*centesima rerum venalium*) on goods sold at auction, and fractions of a
hundred became the natural way to talk about taxes and interest. Medieval
Italian merchants wrote "per cento", and the abbreviation drifted through
"p cento" and "pc" with a loop into the % sign by the 1600s. Compound
interest is older still — Babylonian clay tablets about 4,000 years old
ask how long a loan takes to double — and value-added tax was introduced
in France in 1954, with the UK adopting VAT in 1973 and India its Goods
and Services Tax in 2017.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `percent_of`, `change`,
  `profit_loss`, `tax`, `interest`); `locale` (`us` dollars and sales tax,
  "percent"; `uk` pounds and VAT, "percentage"; `in` rupees and GST at 5,
  12, 18 or 28%, lakh digit grouping, "per annum", "half-yearly"); `count`
  (4-12); `width`, `height`, `line`.
- **Since 1.1.0:** `line` scales every rule and diagram stroke on the
  page and its key (it was accepted but changed nothing before); a
  `count` outside its range is clamped and recorded as `requested_count`.
- **Generation:** Kids asks 10%, 25% and 50% of round numbers; Easy uses
  friendly rates (5, 10, 20, 25, 50, 75%) for percent of, increases,
  decreases and discounts, with whole-number answers; Medium uses any whole
  rate up to 60% and adds one amount as a percentage of another, percentage
  change, profit and loss, tax and simple interest; Hard adds rates such as
  2.5%, 12.5% and 17.5%, reverse percentages, interest over months and
  compound interest over two or three years; Expert adds finding the cost
  price from a selling price and profit or loss percentage, taking tax back
  off a total, and compound interest paid half-yearly. Single-topic pages
  are served at an honest level: change and profit-and-loss start at Easy,
  and tax and interest at Medium (lower requests are served there and meta
  reports `requested_difficulty`). Amounts and rates are drawn until every
  answer terminates within two decimal places, so nothing is rounded; no
  question repeats on a page. Money is written as a number and the
  currency's name (the print font has no $, £ or ₹ sign).
- **Solving:** answers are computed step by step with exact decimals — the
  percentage of an amount, the new amount, and compound interest period by
  period as a student would — and written to the key, money with two
  places when it is not whole.
- **Guarantees:** `answers_checked` — every answer is recomputed from the
  question's numbers by the textbook formulas in exact fractions (compound
  interest by the power formula A = P(1 + r/100)^n), must match exactly,
  and must be positive with at most two decimal places (whole numbers on
  Kids and Easy). The tests go further and re-solve every question from
  its printed words alone — the numbers are read out of the prompt text —
  check that the key writes exactly the answers in red and the page none,
  that every printed character is in the font, and that answer lines fit
  their slots without touching the question.
