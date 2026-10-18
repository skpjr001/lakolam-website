---
title: "Self-Referential Quiz"
blurb: "Self-Referential Quiz — multiple-choice questions about the quiz's own answers"
category: puzzle
version: "1.0.0"
---
A multiple-choice quiz whose questions are about its own answers.

## What it is

Three to twelve questions, each with options A to E (A to C on a
three-question quiz, A to D on four). The questions ask about the answer
sheet itself: "How many answers are B?", "The first question whose answer
is C is number …", "The answer to question 4 is …", "Which answer is used
most often?". In every question exactly one option is true, and that option
is the right answer. Only one answer sheet makes all of them work.

## How to play

Choose an answer for every question so that, for each question, the option
you chose is true and every other option of that question is false.

- "The answer to question 4 is" links two questions: whatever you pick for
  question 4 decides this one.
- "How many answers are B?" counts the whole sheet, including this question.
- "The first (last) question whose answer is C is number …" means no earlier
  (later) question has the answer C.
- "Which question has the same answer as question 3?" means exactly that
  question shares question 3's answer among the options offered.
- "Most often" and "least often" mean strictly more or strictly fewer than
  every other letter (a letter not used at all counts as zero).

Start with the questions that link to one another, make a guess where you
must, and check every question against the full sheet. Write your answers
in the boxes at the bottom.

## Purpose

A logic quiz with no knowledge needed: every fact you need is on the page.
It trains careful reading, case analysis and checking a whole system of
statements for consistency.

## History

Self-referential quizzes were popularised by Jim Propp's "Self-Referential
Aptitude Test" (1990s) and circulate widely in puzzle collections; this
generator builds new ones from a family of question templates.

## This implementation

- **Spec knobs:** `questions` (3–12; null picks by band: Kids 4, Easy 6,
  Medium 8, Hard 10, Expert 12), `difficulty` (also picks the question
  types), `text_size`, `line`.
- **Question types:** count of a letter; first / last question with a
  letter; the answer to another question; which question shares another's
  answer; count of two letters together; the next question with this one's
  answer; most / least used letter. Kids uses counts, firsts and
  cross-references; Easy adds lasts and matching questions; Medium adds
  pairs, next-same and most-used; Hard and Expert add least-used. No
  question repeats another's wording.
- **Generation:** an answer sheet is drawn (using every letter when it can),
  and each question is built so that the sheet's answer is its only true
  option. The quiz is then counted, and questions are re-rolled
  hill-climbing style (a change is kept when the number of valid sheets does
  not grow, counted up to 64) until only the drawn sheet is left.
- **Solving / uniqueness:** an exhaustive depth-first search over every
  sheet (choices^q), pruned at every node by a three-valued truth of every
  option (true, false, or not yet known from the answers fixed so far);
  exactly one sheet (cap 2).
- **Rating** (`rating_basis: "questions"`): Kids 3–4 questions, Easy 5–6,
  Medium 7–8, Hard 9–10, Expert 11–12. With `questions` set, the band
  follows the size and the request is reported as `requested_difficulty`.
  Meta: `questions`, `choices`, `question_kinds`, `rerolls`, `answer`.
- **Guarantees:** deterministic per seed; the drawn sheet makes each chosen
  option the only true one; exactly one sheet does. Tests re-check every
  quiz of 3–8 questions by plain enumeration of all sheets, with each
  question's truth written out from its wording, and compare the pruned
  count with plain enumeration on unclimbed random quizzes.
- **App:** printable for now (a tap-quiz app game can use `build`, the
  question texts and `quiz::sheet_ok`).
