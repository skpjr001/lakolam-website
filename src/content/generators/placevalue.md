---
title: "Place Value"
blurb: "Place value — charts, expanded form, number words, compare and order (US, UK, India)"
category: maths
version: "1.0.0"
---
A place-value worksheet: charts, expanded form, number words, the value of
an underlined digit, comparing and ordering, written the US, UK or Indian
way.

## What it is

Every digit in a number is worth something different depending on where it
stands: in 4,352 the 4 is worth four thousand and the 5 is worth fifty. The
page practises that idea in six ways:

- **Place-value chart.** Write a number in the chart, one digit per column,
  or read the number a filled chart shows.
- **Expanded form.** Split a number into its places (35,800 = 30,000 +
  5,000 + 800), or put the places back together.
- **Words.** Write a number in words, or write the number that words
  describe.
- **Underlined digit.** Write what the underlined digit is worth.
- **Compare.** Write <, > or = between two numbers.
- **Order.** Put four or five numbers in order, smallest or largest first.

Numbers are written the way the reader's school writes them. In the US and
the UK digits are grouped in threes (1,234,567 is one million two hundred
thirty-four thousand...); in India the first group has three digits and the
rest two (12,34,567 is twelve lakh thirty-four thousand...), and the chart
has lakhs and crores. Higher levels bring decimals to thousandths.

## How to play

**Charts.** Each column is a place. The labels are short: O ones, T tens,
H hundreds, TH thousands, TTH ten thousands; HTH hundred thousands, M
millions, TM ten millions and HM hundred millions; or, on an Indian chart,
L lakhs, TL ten lakhs, C crores and TC ten crores. 1/10, 1/100 and 1/1000
are tenths, hundredths and thousandths, after the decimal point. Write one
digit in each column, ending with the ones digit in the O column.

**Expanded form.** Write each digit's value and join them with plus signs:
in 35,800 the 3 is worth 30,000, the 5 is worth 5,000 and the 8 is worth
800. Skip the zeros. To go back, add the parts together.

**Words.** Read the number group by group, from the left, and say the name
of each group: millions or crores and lakhs, then thousands, then the rest.
In the UK, say "and" after the hundreds (two hundred and five). For
decimals, US pages say "three and twenty-five hundredths"; UK and Indian
pages say "three point two five".

**Underlined digit.** Write the digit followed by a zero for every place to
its right before the decimal point: the 6 in 256,186 is worth 6,000. After
the decimal point, the 5 in 30.15 is worth 0.05.

**Compare.** Look first at how many digits each number has before the
decimal point; more digits means bigger. If they are the same, compare
digit by digit from the left until two digits differ. The wide end of < or
> faces the bigger number. For decimals, 3.4 and 3.40 are equal.

**Order.** The signs between the blanks show the way: < means smallest
first, > means largest first.

## Purpose

Place value underpins every written calculation and reading big numbers.
It is taught from grade 1 to grade 5 or 6 and again with decimals, and the
tasks here are the ones textbooks set: charts, expanded form, number names,
the value of a digit, comparing and ordering. Indian classrooms learn the
lakh-and-crore system and the international system side by side, so the
page draws both correctly, with the right commas, chart and words; US and
UK pages differ in their words ("and") and their terms.

## History

Our digits and their place-value system came from India, where by around
the 6th century a zero and nine other digits, each worth ten times more one
place to the left, were in everyday use. Scholars in Baghdad such as
al-Khwarizmi carried the system west in the 9th century, and Fibonacci's
Liber Abaci (1202) introduced it to European merchants. The Indian names
lakh (100,000) and crore (10,000,000) are older still and remain everyday
words across South Asia, where numbers are grouped 12,34,567 to match them.

## This implementation

- **Spec knobs:** `difficulty`, `locale` (`us`, `uk`, `in`), `tasks`
  (`mixed`, `chart`, `expanded`, `words`, `underlined`, `compare`,
  `order`), `decimals` (`auto`, `none`, `tenths`, `hundredths`,
  `thousandths`), `problems` (single-task pages; 0 fills the page, and a
  larger count is cut to what fits), `width` and `height` (Pt, default US
  letter), `line`.
- **Generation:** difficulty maps to grade. Kids (grades 1-2): 2-3 digits.
  Easy (grade 3): 3-4 digits. Medium (grade 4): 5-6 digits, to hundred
  thousands or lakhs. Hard (grade 5): 7-9 digits, to hundred millions or ten
  crores. Expert (grades 5-6): decimals to thousandths with up to four
  whole digits. Other decimal settings keep the level's whole digits (at
  most six) and add up to that many decimal places. The last decimal digit
  is never 0, except in a comparison built to test that 3.4 equals 3.40.
  Comparisons mostly change one digit of the first number; orders are built
  the same way, so the numbers share their leading digits. No number
  repeats on a page. The mixed page carries two charts (one when numbers
  can run to seven or more digits, decimals included), two expanded-form
  and two words problems, two or four underlined digits and comparisons,
  and one ordering; its size is fixed in advance so that it fits the page.
- **Solving:** numbers are exact integers scaled by a power of ten; every
  answer is computed from them: grouped digits, expanded parts, words (US
  without "and"; UK with "and" after hundreds and before a last group under
  100; Indian crore-lakh-thousand), digit values and exact comparisons.
- **Guarantees:** deterministic per seed. The sum of digit x place equals
  the number for every number and every expanded answer (tested by
  re-parsing the printed parts); grouping obeys each locale's rule (threes;
  or three then twos) on thousands of numbers; the words for every number
  on every page, and for thousands of random numbers in all three locales,
  parse back to the digits with an independent parser; comparisons and
  orders match an independent digit-string comparison; the underlined
  character is the digit whose value is asked; every printed word is in the
  page's font (`answers_checked`). Rating basis: digits and decimal places.
  Every difficulty is reachable with every locale and task.
