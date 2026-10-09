---
title: "Money in Real Life"
blurb: "Money in real life — best buys, exchange rates, pay and payslips, bills and phone plans, budgets and bank statements, interest, loans and credit, in dollars, pounds or rupees, every answer exact and recomputed"
category: maths
version: "1.0.0"
---
Best buys, exchange rates, pay, bills, budgets and borrowing — in dollars, pounds or rupees, every answer exact to the cent and checked a second way.

## What it is

A worksheet of four to ten everyday money questions. Shopping questions
work out a unit price, pick the best buy from two, three or four packs and
compare a "3 for the price of 2" offer with a multipack. Travel money
questions change money at a printed exchange rate in both directions, take
off a bureau's commission, compare a price at home with a price abroad and
change leftover money back at a worse rate. Pay questions work out wages
from hours (or days), overtime at time-and-a-half or double time, a weekly
or monthly share of a salary, commission on sales and a payslip with tax
and pension. Bill questions read an electricity meter, add a daily standing
charge and tax, and compare two phone plans or find where they cost the
same. Budget questions total a month's spending, find what is left, the
share that goes on rent and how long a savings goal takes, and complete the
balance column of a bank statement. Borrowing questions work out simple and
compound interest, loan repayments from a bank's table and the extra cost
of buying on credit. A box at the top prints the rules the page uses. The
answer key writes every answer, and fills in each bank statement, in red.

## How to play

1. Read each question and write the answer on the line. Write money with
   two decimal places: 4.50, not 4.5.
2. **Unit price** = price ÷ amount. The best buy is the pack with the
   lowest unit price.
3. **Offers:** "3 for the price of 2" means every third item in a group of
   three is free; "buy one, get one free" means every second one is.
4. **Exchange rates:** going from the side of the rate that says 1,
   multiply by the rate; going the other way, divide by it. Commission is
   a percentage of the money you get, kept by the bureau.
5. **Pay:** pay = rate × hours (or days). Time-and-a-half is 1.5 times the
   normal rate and double time is 2 times. A yearly salary is 52 weeks or
   12 months. Net pay = gross pay - tax - other deductions.
6. **Bills:** units used = new reading - old reading. A standing charge is
   paid every day whatever you use.
7. **Bank statements:** add money in and take away money out, line by
   line. A balance below zero is written with a minus sign.
8. **Interest:** simple interest = amount × rate ÷ 100 × years. With
   compound interest the interest is added each year and earns interest
   itself, so work out one year at a time.

## Purpose

More than half of US states now require a personal finance course for
high-school graduation, and "exchange rates and best buys", wages, bills
and interest appear on every English GCSE Maths board at Foundation and
Higher tier.
India's CBSE teaches the same contexts in Classes 7 and 8 "Comparing
Quantities". These are the sums adults actually do: whether the big pack is
cheaper, what a holiday will cost, whether a payslip is right, which phone
plan to choose and what a loan really costs.

## History

Unit pricing labels on shelves began in US supermarkets in 1970, after
consumer groups showed that shoppers could not tell which size was the
better buy. In the UK the right to an itemised payslip dates from the
Employment Protection Act 1975. The idea of
compound interest is ancient — a Babylonian clay tablet from about 1700 BC
asks how long money takes to double — and Jacob Bernoulli's study of it in
1683 led to the number e. Loan repayment tables like the one these
questions quote were printed in books of "amortization tables" for most of
the twentieth century, before calculators did the sum at the counter.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `shopping`, `exchange`,
  `pay`, `bills`, `budget`, `borrowing`); `locale` (`us`: dollars, sizes in
  ounces, pay stubs and check registers, sales tax; `uk`: pounds, grams
  and millilitres, payslips and bank statements, VAT; `in`: rupees with
  lakh and crore grouping, daily wages, overtime at double rate as India's
  Factories Act sets, provident fund, salary slips, passbooks and loan EMIs
  per ₹1,00,000); `count` (4-10, clamped and recorded as
  `requested_count`); `width`, `height`, `line`.
- **Generation:** each level has its own set of question kinds. Easy: unit
  prices, best buy of two, changing money at a rate, wages, meter
  readings, money left in a budget, simple interest for whole years and
  credit against cash. Medium adds best buy of three with the unit price,
  multibuy offers, changing money back the other way, overtime, salaries,
  commission, standing charges, bank statements and half-percent rates.
  Hard adds bureau commission, prices abroad, payslips with tax above an
  allowance and a pension, phone plans, the percentage on rent, compound
  interest, loan repayments from a table, simple interest over months and
  overdrawn statements. Expert adds four packs, changing money back at a
  worse rate, two tax bands, double time on a holiday, energy bills with
  tax, the minutes where two phone plans cost the same, the months to reach
  a savings goal and comparing two loan lengths. A page shows every kind of
  its level before repeating one; a mixed page spreads its questions over
  the six contexts. Kids is served at Easy (meta `requested_difficulty`).
  Every amount is a whole number of cents, pence or paise and numbers are
  kept only when every answer is exact to the cent. Tax rules are stated in
  each question ("in this question income tax is 20% of pay above …") and
  are not any country's real tax tables.
- **Solving:** the generator works in integer minor units; the checker
  recomputes every answer from the printed numbers with exact fractions by
  a second route — a multibuy is costed item by item, a phone plan's
  break-even point is found by trying every minute, a statement is run line
  by line, compound interest is added a year at a time and rounded only at
  the end (never from an exact half cent), and a savings goal is reached
  month by month. Every "which is cheaper" question has a strict winner,
  and a best buy wins by at least 1%, so there is one answer. The loan
  table (5-12%, 1-5 years) is the annuity formula rounded to the cent.
- **Guarantees:** `answers_checked`. The tests check textbook values
  (£5,000 at 4% compound for 3 years is £5,624.32; Indian grouping prints
  ₹12,34,567.00), recompute every loan-table entry from the formula,
  recompute wages, exchange, simple and compound interest and statements a
  third way in plain integers and floating point, check that a changed
  answer or a wrong balance is caught, that every level asks only its own
  kinds, that the locale changes the currency and the words, that every
  printed character can be drawn (the currency symbols are drawn as
  vector shapes) and that every table stays inside its question.
