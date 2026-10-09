---
title: "SQL Queries"
blurb: "SQL queries on a printed table — write the result of SELECT … WHERE … ORDER BY, pick the query that gives a result, fill the gap, COUNT and SUM, INNER JOIN, every answer re-run by an interpreter"
category: maths
version: "1.0.0"
---
SELECT, WHERE and ORDER BY on a printed table — write the result, pick the condition, fill the gap, every answer re-run by an interpreter.

## What it is

A computing worksheet built around one small invented table — pets,
books, football players or shop stock — printed at the top of the page,
with a second linked table (owners, authors, teams or suppliers) when a
question joins them. Each question shows an SQL query. You write the rows
it returns into a result grid, say what single value a COUNT, SUM, MAX or
MIN query returns, choose which of four conditions completes a query so
that it gives a printed result, or fill one gap in a query — an operator,
a column name, AND or OR, ASC or DESC — so that it gives the printed
result. The answer key fills in every grid, gap and letter.

## How to play

1. Read the table. Each row is one record; each column is one field.
2. **FROM** names the table. **INNER JOIN … ON** pairs each row with the
   row of the second table whose ID matches; a row with no match is left
   out.
3. **WHERE** keeps only the rows for which the condition is true. `=`
   equal, `<>` not equal, `<` less than, `>` more than, `<=` at most,
   `>=` at least. Text goes in single quotes.
4. **LIKE** matches a pattern: `%` stands for any run of letters (even
   none), so `'B%'` means "starts with B", `'%y'` "ends in y" and
   `'%an%'` "contains an".
5. **AND** needs both parts true; **OR** needs at least one. AND is
   worked out before OR, unless brackets say otherwise.
6. **ORDER BY** sorts the rows kept, smallest first (ASC) or largest
   first (DESC); without it, rows come out in the order of the table.
7. **SELECT** chooses the columns to show, in the order listed; `*`
   shows every column. COUNT(*) counts the rows kept, SUM adds a column,
   MAX and MIN give its largest and smallest value.
8. For a gap, try each choice the question allows: exactly one makes the
   query give the printed result.

## Purpose

SQL SELECT with WHERE, AND, OR, LIKE and the `%` wildcard is set content
for England's GCSE Computer Science (OCR J277 2.2, AQA 8525 3.7) and
Scotland's National 5; joins and aggregate functions appear at A-level
and in introductory database courses. Tracing a query by hand against a
printed table is how the exams test it, and it builds the habit of
reading a condition row by row before trusting a computer to do it.

## History

Edgar F. Codd described the relational model at IBM in 1970. Donald
Chamberlin and Raymond Boyce designed SEQUEL ("Structured English Query
Language") for IBM's System R in 1974; the name was shortened to SQL over
a trademark clash. Oracle shipped the first commercial SQL database in
1979, ANSI standardised the language in 1986 and ISO in 1987, and it
remains the most widely used way to ask questions of data.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `output`,
  `which_query`, `complete`, `join`, `aggregate`); `theme` (`pets`,
  `books`, `sports`, `shop`); `count` (2-6, clamped and recorded as
  `requested_count`); `width`, `height`, `line`.
- **Generation:** the table's rows are drawn at random from pools of
  invented names, categories and number ranges (6 rows at Easy, 8 at
  Medium, 10 at Hard, 12 at Expert; the second table has one row no main
  row links to, so an inner join visibly drops it). Queries are built as
  syntax trees. Easy uses one comparison (=, <, >) and no ORDER BY;
  Medium adds AND/OR, every comparison, LIKE 'B%', ORDER BY and SUM;
  Hard adds LIKE on any part of a word, DESC, INNER JOIN (in `mixed`),
  MAX and MIN; Expert adds three conditions with brackets and totals
  over a join. A condition is kept only if it keeps between one and five
  rows (four at Easy), drops at least one, and none of its parts is
  redundant on the printed data: forcing any comparison or bracket to
  true, or to false, changes the rows kept. Questions on a page never
  share a condition. Kids is served as Easy.
- **Solving:** each answer is computed by the generator's tree evaluator
  and checked by a separate interpreter that tokenises the *printed*
  query text and evaluates its WHERE clause while parsing it, row by
  row, with its own LIKE matcher (dynamic programming rather than
  recursion) and its own sort (insertion sort).
- **Guarantees:** every printed answer is what the printed query returns
  on the printed tables (meta `answers_checked`). Every result has at
  least one row (two for "write the result") and differs from the result
  with the WHERE clause removed. An ORDER BY never meets a tie, so the
  order of the rows is defined. In a "which condition" question exactly
  one option gives the printed result, and every other option gives
  different rows, not merely a different order. In a "fill the gap"
  question exactly one word from the stated set gives the printed
  result. Joins always name the shared ID column with its table, and no
  query compares text with < or >, so no answer depends on a database's
  text ordering; LIKE patterns are chosen so upper/lower case never
  changes the match.
