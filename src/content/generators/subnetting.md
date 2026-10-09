---
title: "IPv4 Subnetting"
blurb: "IPv4 subnetting — network and broadcast addresses, host ranges, prefixes and masks in dotted decimal and binary, same-subnet checks and VLSM plans, every answer recomputed bit by bit"
category: maths
version: "1.0.0"
---
Network and broadcast addresses, host ranges, masks and VLSM plans — the subnetting drill of every networking course, with every answer worked out bit by bit.

## What it is

A worksheet of four to ten subnetting questions. Given a host address
with a prefix such as /26 or a subnet mask such as 255.255.255.192, find
its network address, broadcast address, first and last usable host and
the number of usable hosts. Convert prefixes to masks and back, and write
masks in binary; find the smallest subnet that holds a number of hosts;
count how many subnets of one size fit in a block; decide whether two
hosts are on the same subnet; and plan a variable-length (VLSM) split of
a block for several LANs. A facts box sums up the rules, and the answer
key fills every line in red.

## How to play

- An IPv4 address is 32 bits written as four numbers from 0 to 255. The
  bits in each number are worth 128, 64, 32, 16, 8, 4, 2 and 1.
- A prefix /n, or a mask made of n ones followed by zeros, says the
  first n bits are the network part and the rest the host part. The mask
  for /26 is 255.255.255.192: 26 ones.
- **Network address:** keep the network bits and set every host bit to
  0. **Broadcast address:** set every host bit to 1. The first usable
  host is one more than the network address, the last one less than the
  broadcast.
- **Usable hosts:** multiply 2 by itself once for each host bit, then
  take away 2 (the network and broadcast addresses). A /26 has 6 host
  bits: 64 – 2 = 62 hosts.
- A quick way: the interesting number of the mask is the one that is
  not 255 or 0. Take it away from 256 to get the block size, and the
  network starts at the multiple of the block size at or below the
  address.
- **Same subnet:** work out the network address of each host with the
  same mask; the hosts share a subnet exactly when the two are equal.
- **VLSM:** sort the LANs from most hosts to fewest. Give each the
  smallest subnet with enough usable hosts, starting at the beginning of
  the block, and start each next subnet where the last one ended.

## Purpose

Subnetting is a core skill for network engineers and is examined in the
Cisco CCNA (topic 1.6, IPv4 addressing and subnetting), CompTIA Network+
and computing courses. It is mostly practice: being fast and accurate
with binary and powers of two. These pages give unlimited graded drills
with checked answers.

## History

IPv4 was defined in RFC 791 in 1981 with fixed address classes A, B and
C. Subnet masks, which split a network inside an organisation, came in
RFC 950 (1985). Classless Inter-Domain Routing (CIDR, RFC 1519, 1993)
replaced the classes with any prefix length and introduced the /n
notation, and variable-length subnet masks let one block be divided into
subnets of different sizes to save addresses. The private ranges
10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16 used on these pages come
from RFC 1918 (1996).

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `addresses`, `masks`,
  `same_subnet`, `vlsm`); `notation` (`cidr` prefixes, `mask` dotted
  masks, `mixed` alternating — mask questions convert prefix to mask
  under `cidr`, mask to prefix under `mask`, both ways under `mixed`);
  `count` (4-10); `width` (300-2000 Pt), `height` (300-3000 Pt) and
  `line` (0.8-4 Pt). Out-of-range values are clamped and reported in meta
  as `requested_*`.
- **Generation:** addresses come from the private ranges. Easy: prefixes
  /24 to /30 (only the last number changes); network, broadcast and host
  count; masks; subnets in a /24. Medium: prefixes from /16, the full host
  range, masks in binary, the smallest subnet for n hosts, same-subnet
  pairs. Hard: prefixes from /8 and VLSM plans for three LANs in a /24.
  Expert: VLSM plans for four or five LANs in a /22 or /23. Kids is served
  as Easy; `vlsm` is set at Hard and Expert and meta records
  `requested_difficulty` when a level is moved. Same-subnet pairs that
  differ do so in one of the last few network bits, so they look alike.
- **Solving:** 32-bit integer arithmetic with shifted masks.
- **Guarantees:** every answer is recomputed by a second route on
  32-character bit strings: the network and broadcast are the string with
  its host bits overwritten, first and last hosts by binary counting,
  host counts by doubling once per host bit, masks spelled out bit by
  bit. A VLSM plan is rebuilt from the LANs' needs and checked aligned,
  inside the block and free of overlaps; LANs needing different subnet
  sizes are required, so the largest-first, lowest-address-first rule
  gives exactly one plan. Meta: `answers_checked`, `unique`,
  `difficulty`, `rating_basis` (`question_kinds_and_prefix_range_by_level`).
