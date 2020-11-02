---
title: The first language of a machine
date: 2020-11-02T02:50:50.588Z
---

There are billions of people on this planet, speakinig around 7000 languages (yeah I just looked that up). In the meantime billions of computers (including mobile devices) coexsit with us, but they speak only one language. 

And their language has only 2 words: 0 and 1;

## fixed width

unlike us ambiguity. precise.

## How do they (the machines) represent numbers ?

Humans use the decimal or base-10 numeral system, while computers use base-2 numeral system. Each digit is called a bit.

For unsigned integers, translate from binary to decimal is quite straightforward

10 (human language) = 1010

Things get a little more complicated when you consider negative numbers and floating numbers.

Computers represent negative values in two's complement form.

This is how we translate -28 from human language to (8-bit) machine language.

1. First we translate it to a regular binary form. 00011100 
2. Then we invert the digits. we get 11100011.
3. In final step we add 1 to get our end result 11100100.

By utilising the two's complement form of signed encoding, machines get some benefits, such as checking negative/positve becomes super efficient, it only needs to check the first digit. But there are downsides too, for a 8-bit machine, because the first bit is used to represent sign, there are only 7 digits left to represent the value.

overflow 
underflow
casting