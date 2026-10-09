---
title: "Verb Conjugation"
blurb: "Spanish and French verb conjugation — grids, fill-ins, match the subject to the form and odd one out in the present, preterite or passé composé and future; regular verbs, stem and spelling changes, and the irregular core"
category: word
version: "1.0.0"
---
Spanish and French verb drills — conjugation grids, fill-ins, matching and odd one out, from regular verbs to the irregular core.

## What it is

A world-languages worksheet for Spanish or French verbs. A page mixes
four kinds of question: a conjugation grid (one verb, every person from
yo to ellos, or je to ils), fill-ins (a printed subject, a line to write
on and the infinitive in brackets), matching each subject to its form of
one verb, and an odd one out (three forms that belong to one subject and
one that does not). It drills the present, the preterite (Spanish) or
the passé composé (French), and the future, with regular verbs, stem and
spelling changes, or the irregular verbs every course teaches first.
Pages print in upper and lower case with every accent; the answer key
writes each form in red, draws the matching lines and rings the odd one
out.

## How to play

1. Read the verb and the tense each question asks for.
2. Grid: write the form of the verb for every subject in the left-hand
   column. In Spanish, él, ella and usted share one form, and so do
   ellos, ellas and ustedes.
3. Fill-in: write the form that goes with the subject printed before the
   line, using the verb in brackets.
4. Matching: draw a line from each subject to its form of the verb.
5. Odd one out: three of the four words are forms for the subject named
   in the question; circle the one that is not.
6. Accents count: habló and hablo are different words.
7. In the French passé composé, verbs such as aller, venir, arriver and
   partir take être, and the past participle agrees with the subject:
   elle est allée, ils sont allés, elles sont allées. In a grid, (e) and
   (s) show the endings that depend on who is speaking.
8. In French, je becomes j' before a vowel or a silent h: j'aime,
   j'habite.

## Purpose

Spanish is the most studied second language in US schools, French is
taught across the US, the UK, Canada and India, and verb endings are the
first grammar every course drills. Writing the forms by hand builds the
pattern recognition that speaking and reading depend on: which ending
marks which person, which verbs change their stem, and the irregular
verbs that are used most often. The bands follow the order courses teach
them in: regular verbs, then stem and spelling changes, then the
irregular core and the past and future tenses.

## History

Latin grammarians set out verbs in tables of person and number, and the
paradigm — the full table of one verb — has been the backbone of
language teaching ever since. Antonio de Nebrija's Gramática de la
lengua castellana (1492) was the first printed grammar of a modern
European language; the Port-Royal Grammar (1660) and the Bescherelle
conjugation books (from 1842) did the same for French. The drill of
writing out a verb in every person, and of matching subjects to forms,
is still the core of the first years of Spanish and French in school.

## This implementation

- **Spec knobs:** `language` (`spanish`, `french`); `difficulty`;
  `tense` (`auto`: the present at Easy to Hard and the three tenses mixed
  at Expert; `present`; `past` — the preterite in Spanish, the passé
  composé in French; `future`); `format` (`mixed`, `grid`, `fill_in`,
  `match`, `odd_one_out`); `vosotros` (Spanish only: include the
  vosotros form, or leave it out for Latin American usage; ignored for
  French); `count` (3-8 questions, clamped and recorded as
  `requested_count`); `width`, `height`, `line`.
- **Generation:** about 85 Spanish and 85 French verbs, each written down
  with only what rules cannot work out: its stem change (e→ie, o→ue,
  u→ue, e→i) or spelling change (acheter, préférer, appeler, nettoyer),
  explicit forms for irregular tenses, an irregular future stem, an
  irregular past participle, and whether it takes être. A rule engine
  builds every form from the regular endings, then applies stem and
  spelling changes (-car/-gar/-zar, -ger/-gir, -guir, -uir, vowel stems
  such as leer → leyó, -ir stem changes in the preterite; -ger, -cer, e →
  è, doubled consonants, y → i, the future built on the changed stem),
  and lets the table's explicit forms win. Each verb's class in each
  tense is read off by comparing the three layers: regular, changer or
  irregular. Easy uses regular verbs, Medium changers (in the French
  passé composé, the être verbs with agreement; the Spanish future has no
  stem changes, so Medium asks stem-changing verbs, whose future keeps
  the infinitive), Hard the irregular core, Expert the irregular core
  with the tenses mixed. With a fixed tense, Expert is served as Hard and
  recorded as `requested_difficulty`; Kids is served as Easy. Fill-ins use
  four different verbs; a French être verb in the passé composé always
  gets a subject that shows its gender (il, elle, ils, elles). Matching
  keeps only subjects whose forms differ (French je and il share parle,
  so only one is shown). An odd-one-out word comes from another person
  and is not a form for the asked subject of any verb in the table.
- **Solving:** every answer is re-derived from the engine and checked
  against the band; the tests also check the engine against about 70
  hand-written full conjugations, every regular verb against a second
  conjugator written separately, and the strong preterites (tuve, hice,
  dije) against the strong-stem pattern.
- **Guarantees:** each blank has one right answer for the printed subject
  and tense; matching forms are all different; exactly one odd-one-out
  word fails, checked by brute force over the whole table and both
  genders. Verbs with two accepted spellings (payer, the future of
  préférer and its family, connaître) are left out. Meta records
  `answers_checked`, `difficulty`, `rating_basis` and every question with
  its answers. Pages print in mixed case; the inverted marks ¿ and ¡ are
  never needed.
