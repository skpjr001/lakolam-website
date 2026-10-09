---
title: "Data Structures"
blurb: "Data structures — stack and queue traces with pointers, binary search trees and their traversals, Reverse Polish, breadth- and depth-first search, every answer re-run by a second method"
category: maths
version: "1.0.0"
---
Trace stacks and queues step by step, walk binary search trees and graphs, and evaluate Reverse Polish — every answer re-run by a second method.

## What it is

A computing worksheet on the data structures and algorithms of A-level
and senior-school Computer Science. Stack questions give a row of
numbered steps (PUSH, POP, PEEK) and a drawn stack to fill in; queue
questions give ENQUEUE and DEQUEUE steps and an array, linear at first
and then circular, with front and rear pointers. Tree questions draw a
binary search tree and ask for its traversals, give a list to insert and
ask for the tree, or give a pre-order traversal and ask you to rebuild
the tree. Reverse Polish questions ask for the value of a postfix
expression and the stack part-way through, or convert between infix and
postfix. Graph questions draw a small network of lettered nodes and ask
for the breadth-first and depth-first visiting orders. The answer key
writes every answer, fills in the stacks and arrays, and draws the trees.

## How to play

1. Stacks: start with an empty stack. PUSH puts a value on top, POP takes
   the top value off and returns it, PEEK returns the top value without
   removing it. When the stack has a size, a PUSH on a full stack or a
   POP or PEEK on an empty one fails and changes nothing; write the
   numbers of the steps that fail. Fill in the drawn stack as it ends,
   slot 0 at the bottom.
2. Queues: ENQUEUE adds a value at the rear, DEQUEUE removes the value
   at the front. In an array the items stay where they were put, so the
   front moves along as items leave. In a circular queue the front
   starts at 0 and the rear at -1; each moves on one slot, wrapping from
   the last slot back to 0. Write the final front and rear.
3. Binary search trees: insert each value in turn from the root, going
   left when it is smaller than the node and right when it is larger,
   until you reach an empty place. Pre-order visits a node, then its left subtree, then its right;
   in-order does left, node, right; post-order does left, right, node.
   Breadth-first reads the tree level by level, left to right. Levels
   counts the rows of the tree, the root being the first.
4. A pre-order traversal rebuilds its tree: insert the values in that
   order.
5. Reverse Polish: read the tokens left to right. Push each number; at an
   operator, pop two numbers, apply it (the first popped is the right
   operand) and push the result. The steps are numbered, so "the stack
   after token 5" is the stack once the fifth token has been read,
   written bottom first.
6. Converting: operators of equal precedence work left to right, so
   a - b - c means (a - b) - c. Keep the operands in their order, and use
   brackets only where they are needed.
7. Graphs: from the start node, always take neighbours in alphabetical
   order. Breadth-first visits every neighbour of a node before moving
   further out, using a queue. Depth-first goes as deep as it can before
   coming back, using a stack.

## Purpose

Stacks, queues, trees, graph traversal and Reverse Polish are named
content in AQA A-level Computer Science (4.2.2 to 4.3.3), OCR A-level
(H446 1.4.2) and the CBSE Class 12 stacks unit. Exam questions ask for
exactly these traces, and the only way to get them right is to follow
the rules one step at a time. Doing so builds the mental model of
pointers, recursion and call stacks that every later programming topic
relies on.

## History

Alan Turing described a stack of return addresses ("bury" and
"unbury") in 1946, and Friedrich Bauer and Klaus Samelson patented the
stack principle for evaluating expressions in 1957. Jan Lukasiewicz
invented prefix ("Polish") notation in the 1920s; the reversed, postfix
form was proposed for computers by Arthur Burks, Don Warren and Jesse
Wright in 1954 and made famous by Hewlett-Packard calculators from 1968.
Edsger Dijkstra's shunting-yard algorithm (1961) converts infix to
postfix. Binary search trees were discovered independently by several
people around 1960, among them P. F. Windley, A. D. Booth, A. J. T.
Colin and T. N. Hibbard. Breadth-first search was described by Konrad
Zuse in 1945 and Edward Moore in 1959; depth-first search goes back to
Charles Trémaux's nineteenth-century method for solving mazes.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `stacks`, `queues`,
  `trees`, `rpn`, `graphs`); `count` (3-8, clamped and recorded as
  `requested_count`); `width`, `height`, `line`.
- **Generation:** each question is drawn at random and simulated.
  Stacks have 6, 8, 10 or 12 steps by level; PEEK appears from Medium;
  Hard and Expert stacks hold 4 items and have exactly one and two
  failing steps. Queues are linear at Easy, then circular (5 slots, or 4
  at Expert) with the rear pointer always wrapping round; Hard and Expert
  have one and two failing steps. Trees have 5, 7, 9 or 11 distinct keys
  from 11 to 99, use both sides of the root and have 3-4 levels (4-5 at
  Hard and Expert). Easy asks pre- and in-order, Medium adds post-order,
  Hard asks post-order and breadth-first, and Expert asks the tree back
  from its pre-order. Expressions have 3-6 operands (letters a, b, c… in
  order for conversions); evaluation keeps every value a whole number,
  never negative, with no remainders, and from Medium the stack holds at
  least three numbers at some point. Graphs have 5-8 nodes on grid
  points, edges only between neighbouring points with no crossings, are
  connected, and the breadth- and depth-first orders differ.
- **Solving:** the generator simulates on ordinary collections: a vector
  stack, a double-ended queue, a node-by-node tree, an expression tree
  (the stack after token t read off postorder spans), a recursive
  depth-first search and a queue-driven breadth-first search.
- **Guarantees:** every answer is re-derived by an independent route
  before the page is accepted: stacks on a fixed array with a top
  pointer; queues on an array moving front and rear exactly as the exam
  pseudocode does; tree traversals with no tree at all, by splitting the
  insertion order recursively (in-order is the sorted keys, breadth-first
  is by depth then key), which also checks the drawn tree; Reverse Polish
  on a stack machine over the printed tokens; infix through Dijkstra's
  shunting-yard; an infix answer parsed back by recursive descent with
  every bracket shown to be needed (so the fewest-brackets form is
  unique); graph orders with an explicit-stack depth-first search and a
  level-by-level breadth-first search. The printed tie-breaks
  (alphabetical neighbours, left-to-right precedence) make every order
  unique. Meta records `answers_checked`. The linked-list pointer tables
  of A-level are not covered.
