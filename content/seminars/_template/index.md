---
# Yeni seminer: bu klasörü kopyala → seminars/YYYY-MM-DD-kisa-ad/
# Aynı klasöre poster.png (veya jpg) ve abstract içindeki diğer görselleri koy.
# Gövde = abstract. Markdown ve göreli görseller konuşma sayfasında görünür.
# Tarih bugün veya sonrasıysa ana sayfada Next olur; geçmişse Latest / arşiv.
# published: false dersen taslak kalır, siteye çıkmaz.
# main dalına push edince GitHub Actions siteyi kurar ve yayınlar (.github/workflows/pages.yml).
title: "Talk title"
speaker: Name Surname
affiliation: Department, University
date: 2026-01-01
time: "14:30–15:30"
start_time: "14:30"
end_time: "15:30"
venue: Institute of Applied Mathematics (IAM), Hayri Körezlioğlu Seminar Room (S-212)
poster: poster.png
series:
kind: seminar
layout: event
description: One-sentence summary used in the page preview.
---

The abstract goes here, in ordinary Markdown.

A figure dropped next to this file:

![Short description of the figure](figure.png)
