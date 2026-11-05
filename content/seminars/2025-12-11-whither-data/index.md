---
title: "Whither data? Scientific computing and compression in the exascale era"
speaker: Ozan Tuğluk
affiliation: Scientific Computing Program / IAM
date: 2025-12-11 14:30:00 +0300
time: "14:30–15:30"
start_time: "14:30"
end_time: "15:30"
venue: Institute of Applied Mathematics (IAM), Hayri Körezlioğlu Seminar Room (S-212)
poster: poster.jpg
kind: seminar
layout: event
description: Lossy compression that preserves quantities of interest, via MGARD.
---

Rapidly evolving high performance computing resources result in an exponential
increase in data storage demands. Scientific data compression is a much cheaper
alternative to constantly expanding data storage units. However, due to the nature
of current floating point representations and scientific simulations, lossless
compression is rarely relevant. Lossy compression offers a viable alternative,
however there are two main challenges, namely hesitancy of applications scientist
and seemingly low compression ratios.

We present our approach to tackling these two problems. Our approach involves
compressing the data so that a prescribed loss is guaranteed, not on the original
data, but on the quantities of interest which are computed from the data.
Advantages of this approach are twofold, preserving quantities of interest results
in better compression, and assures the user that compression artifacts will not
adversely effect their analysis. We present our mathematical framework, and our
compression tool/library MGARD (MultiGrid Adaptive Reduction of Data) which was
developed for CODAR (Co-design Center for Online Data Analysis and Reduction at
the Exascale). We provide illustrative examples from experimental and computational
data.
