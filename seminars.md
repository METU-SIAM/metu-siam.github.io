---
title: Seminars
layout: page
---

# Seminars

METU SIAM Student Chapter organizes a regular seminar series on topics in applied mathematics,
scientific computing, data science, and related areas.

## Upcoming Seminar

<!-- markdownlint-disable MD033 -->
<section class="featured-seminar">
  <div class="featured-meta">
    <span class="featured-badge">Upcoming</span>
    <span>No upcoming seminar scheduled yet. Stay tuned for announcements.</span>
  </div>
  <h2 class="featured-title">To be announced</h2>
  <p>
    New seminars will appear here with speaker, title, date, location, and quick links. In the
    meantime, you can browse past seminars below or check the events calendar on the home page.
  </p>
  <div class="featured-actions">
    <a href="{{ '/' | relative_url }}" class="btn btn-secondary">View Calendar</a>
  </div>
</section>

## Past Seminars

<div class="events-grid">
  <div class="event-card">
    <div class="event-card-inner">
      <div class="event-image-wrapper">
        <img
          src="{{ '/assets/seminar/tugluk-seminar.jpg' | relative_url }}"
          alt="Whither data? seminar poster"
          class="event-image"
        />
      </div>
      <div class="event-content">
        <div class="event-meta">
          <span class="event-type">Seminar</span>
          <span class="event-date">December 11, 2025 &middot; 14:30–15:30</span>
        </div>
        <h3 id="whither-data-2025-12-12" class="event-title">
          Whither data? Scientific computing and compression in the exascale era
        </h3>
        <p class="event-speaker">
          <strong>Speaker:</strong> Ozan Tuğluk (Scientific Computing Program / IAM)
        </p>
        <p class="event-venue">
          <strong>Venue:</strong> Institute of Applied Mathematics (IAM), Hayri Körezlioğlu Seminar Room (S-212)
        </p>
        <details class="event-abstract">
          <summary>Abstract ▼</summary>
          <p>
            Rapidly evolving high performance computing resources result in an exponential
            increase in data storage demands. Scientific data compression is a much cheaper alternative to constantly
            expanding data storage units. However, due to the nature of current floating point representations and
            scientific simulations, lossless compression is rarely relevant. Lossy compression offers a viable alternative,
            however there are two main challenges, namely hesitancy of applications scientist and seemingly low
            compression ratios.
          </p>
          <p>
            We present our approach to tackling these two problems. Our approach involves compressing the data so that a
            prescribed loss is guaranteed, not on the original data, but on the quantities of interest which are computed
            from the data. Advantages of this approach are twofold, preserving quantities of interest results in better
            compression, and assures the user that compression artifacts will not adversely effect their analysis. We
            present our mathematical framework, and our compression tool/library MGARD (MultiGrid Adaptive Reduction of
            Data) which was developed for CODAR (Co-design Center for Online Data Analysis and Reduction at the Exascale).
            We provide illustrative examples from experimental and computational data.
          </p>
        </details>
      </div>
    </div>
  </div>

  <div class="event-card">
    <div class="event-card-inner">
      <div class="event-image-wrapper">
        <img
          src="{{ '/assets/seminar/bagce-seminar.jpg' | relative_url }}"
          alt="Sanremo'lu Bir Cizvit seminar poster"
          class="event-image"
        />
      </div>
      <div class="event-content">
        <div class="event-meta">
          <span class="event-type">Seminar</span>
          <span class="event-date">December 12, 2024 &middot; 14:30–15:30</span>
        </div>
        <h3 id="bagce-2024-12-12" class="event-title">
          Sanremo’lu Bir Cizvit Giovanni Girolamo Saccheri (1667–1733) ve Euclides’i
        </h3>
        <p class="event-speaker">
          <strong>Speaker:</strong> Samet Bağçe (Department of Philosophy, METU)
        </p>
        <p class="event-venue">
          <strong>Venue:</strong> Institute of Applied Mathematics (IAM), Hayri Körezlioğlu Seminar Room (S-212)
        </p>
      </div>
    </div>
  </div>
</div>
<!-- markdownlint-enable MD033 -->
