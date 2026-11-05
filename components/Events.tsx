"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { addToCalendarUrl, countdown, formatLong, formatParts, isUpcoming, SITE_URL, type Event } from "@/lib/format";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import styles from "./Events.module.css";

/** The build ran at some point in the past; once mounted, use the reader's clock. */
export function useNow(buildTime: string) {
  const [now, setNow] = useState(() => new Date(buildTime));
  useEffect(() => setNow(new Date()), []);
  return now;
}

function Series({ event }: { event: Event }) {
  const kind = event.kind === "workshop" ? "Workshop" : "Seminar";
  return (
    <span className={styles.series}>
      {kind}
      {event.series ? <> · Series {event.series}</> : null}
    </span>
  );
}

/**
 * The lead card: poster on the left, the talk set like the first page of a
 * programme on the right.
 */
export function FeaturedEvent({ event, label, now }: { event: Event; label?: string; now: Date }) {
  const cal = addToCalendarUrl(event, SITE_URL);
  const soon = isUpcoming(event, now) ? countdown(event.day, now) : null;
  return (
    <article className={`${styles.featured} ${event.poster ? "" : styles.noPoster}`}>
      {event.poster ? (
        <Link href={event.href} className={styles.posterLink} tabIndex={-1} aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={event.poster} alt="" className={styles.poster} loading="lazy" width={362} height={512} />
        </Link>
      ) : null}
      <div className={styles.featuredMain}>
        <div className={styles.metaRow}>
          {label ? <span className={styles.label}>{label}</span> : null}
          <Series event={event} />
          {soon ? <span className={styles.soon}>{soon}</span> : null}
        </div>
        <h3 className={styles.featuredTitle}>
          <Link href={event.href}>{event.title}</Link>
        </h3>
        {event.speaker ? (
          <p className={styles.speaker}>
            {event.speaker}
            {event.affiliation ? <span className={styles.affil}>{event.affiliation}</span> : null}
          </p>
        ) : null}
        <dl className={styles.facts}>
          <div>
            <dt>Date</dt>
            <dd>
              <time dateTime={event.day}>{formatLong(event.day)}</time>
            </dd>
          </div>
          {event.time ? (
            <div>
              <dt>Time</dt>
              <dd>{event.time}</dd>
            </div>
          ) : null}
          {event.venue ? (
            <div className={styles.factWide}>
              <dt>Venue</dt>
              <dd>{event.venue}</dd>
            </div>
          ) : null}
        </dl>
        {event.excerpt ? <p className={styles.excerpt}>{event.excerpt}</p> : null}
        <div className="btn-row" style={{ marginTop: "1.5rem" }}>
          <Link className="btn btn-primary" href={event.href}>
            {event.body ? "Abstract" : event.kind === "workshop" ? "Workshop page" : "Seminar page"} <Icon name="arrow" size={16} />
          </Link>
          {cal && soon ? (
            <a className="btn btn-ghost" href={cal} target="_blank" rel="noopener noreferrer">
              <Icon name="calendar" size={16} /> Add to calendar
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

/** One line of the archive timeline. */
export function EventRow({ event, index }: { event: Event; index: number }) {
  const p = formatParts(event.day);
  return (
    <Reveal as="li" index={index} className={styles.row}>
      <time dateTime={event.day} className={styles.rowDate}>
        <span className={styles.rowDay}>{p.day}</span>
        <span className={styles.rowMonth}>{p.month}</span>
      </time>
      <span className={styles.dot} aria-hidden="true" />
      <div className={styles.rowBody}>
        <Series event={event} />
        <h4 className={styles.rowTitle}>
          <Link href={event.href}>{event.title}</Link>
        </h4>
        {event.speaker ? (
          <p className={styles.rowSpeaker}>
            {event.speaker}
            {event.affiliation ? <span className={styles.affil}>{event.affiliation}</span> : null}
          </p>
        ) : null}
      </div>
      {event.poster ? (
        <Link href={event.href} className={styles.rowPosterLink} tabIndex={-1} aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={event.poster} alt="" className={styles.rowPoster} loading="lazy" width={84} height={119} />
        </Link>
      ) : null}
    </Reveal>
  );
}

/** Upcoming events as lead cards, then the rest as a timeline grouped by year. */
export function EventListing({ events, buildTime, emptyUpcoming, kindLabel }: { events: Event[]; buildTime: string; emptyUpcoming: string; kindLabel: string }) {
  const now = useNow(buildTime);
  const upcoming = events.filter((e) => isUpcoming(e, now));
  const past = events.filter((e) => !isUpcoming(e, now)).reverse();
  const years = [...new Set(past.map((e) => e.day.slice(0, 4)))];
  return (
    <>
      <section className="section" aria-labelledby="upcoming">
        <div className={styles.listHead}>
          <h2 id="upcoming">Upcoming</h2>
          <span className={styles.count}>{upcoming.length || "None scheduled"}</span>
        </div>
        {upcoming.length ? (
          <div className={styles.featuredList}>
            {upcoming.map((e, i) => (
              <Reveal key={e.slug} index={i}>
                <FeaturedEvent event={e} now={now} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className={styles.empty}>{emptyUpcoming}</p>
        )}
      </section>
      {past.length ? (
        <section className="section" aria-labelledby="archive" style={{ paddingTop: 0 }}>
          <div className={styles.listHead}>
            <h2 id="archive">Archive</h2>
            <span className={styles.count}>
              {past.length} {past.length === 1 ? kindLabel.replace(/s$/, "") : kindLabel}
            </span>
          </div>
          {years.map((y) => (
            <div key={y} className={styles.year}>
              <h3 className={styles.yearHead}>{y}</h3>
              <ol className={styles.timeline}>
                {past.filter((e) => e.day.startsWith(y)).map((e, i) => (
                  <EventRow key={e.slug} event={e} index={i} />
                ))}
              </ol>
            </div>
          ))}
        </section>
      ) : (
        <p className={styles.empty}>Past {kindLabel} will be listed here.</p>
      )}
    </>
  );
}

/** The next event if there is one, otherwise the latest. */
export function Spotlight({ events, buildTime }: { events: Event[]; buildTime: string }) {
  const now = useNow(buildTime);
  const next = events.find((e) => isUpcoming(e, now));
  const e = next ?? events[events.length - 1];
  if (!e) return <p className={styles.empty}>New talks are announced here and on the chapter calendar.</p>;
  return <FeaturedEvent event={e} label={next ? "Next" : "Latest"} now={now} />;
}
