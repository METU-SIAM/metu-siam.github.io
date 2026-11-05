"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { addToCalendarUrl, formatLong, formatParts, isUpcoming, SITE_URL, type Event } from "@/lib/format";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import styles from "./Events.module.css";

/** The build ran at some point in the past; once mounted, use the reader's clock. */
export function useNow(buildTime: string) {
  const [now, setNow] = useState(() => new Date(buildTime));
  useEffect(() => setNow(new Date()), []);
  return now;
}

function DateBlock({ day, compact }: { day: string; compact?: boolean }) {
  const p = formatParts(day);
  return (
    <time dateTime={day} className={`${styles.dateBlock} ${compact ? styles.dateCompact : ""}`}>
      <span className={styles.dbDay}>{p.day}</span>
      <span className={styles.dbMonth}>{p.month}</span>
      <span className={styles.dbYear}>{p.year}</span>
    </time>
  );
}

export function FeaturedEvent({ event, label }: { event: Event; label?: string }) {
  const cal = addToCalendarUrl(event, SITE_URL);
  return (
    <article className={styles.featured}>
      <div className={styles.featuredMain}>
        <div className={styles.featuredTop}>
          <DateBlock day={event.day} />
          <div>
            {label ? <p className="kicker">{label}</p> : null}
            <p className={styles.dateline}>
              {formatLong(event.day)}
              {event.time ? ` · ${event.time}` : ""}
            </p>
          </div>
        </div>
        <h3 className={styles.featuredTitle}>
          <Link href={event.href}>{event.title}</Link>
        </h3>
        {event.speaker ? (
          <p className={styles.speaker}>
            {event.speaker}
            {event.affiliation ? <span className={styles.affil}> · {event.affiliation}</span> : null}
          </p>
        ) : null}
        {event.venue ? (
          <p className={styles.venue}>
            <Icon name="pin" size={16} />
            <span>{event.venue}</span>
          </p>
        ) : null}
        {event.description ? <p className={styles.desc}>{event.description}</p> : null}
        <div className="btn-row" style={{ marginTop: "1.25rem" }}>
          <Link className="btn btn-primary" href={event.href}>
            {event.kind === "workshop" ? "Workshop page" : "Seminar page"} <Icon name="arrow" size={16} />
          </Link>
          {cal ? (
            <a className="btn btn-ghost" href={cal} target="_blank" rel="noopener noreferrer">
              <Icon name="calendar" size={16} /> Add to calendar
            </a>
          ) : null}
        </div>
      </div>
      {event.poster ? (
        <Link href={event.href} className={styles.posterLink} tabIndex={-1} aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={event.poster} alt="" className={styles.poster} loading="lazy" width={362} height={512} />
        </Link>
      ) : null}
    </article>
  );
}

export function EventRow({ event, index }: { event: Event; index: number }) {
  return (
    <Reveal as="li" index={index} className={styles.row}>
      <DateBlock day={event.day} compact />
      <div className={styles.rowBody}>
        <h4 className={styles.rowTitle}>
          <Link href={event.href}>{event.title}</Link>
        </h4>
        {event.speaker ? (
          <p className={styles.speaker}>
            {event.speaker}
            {event.affiliation ? <span className={styles.affil}> · {event.affiliation}</span> : null}
          </p>
        ) : null}
        {event.time || event.venue ? (
          <p className={styles.rowMeta}>{[event.time, event.venue].filter(Boolean).join(" · ")}</p>
        ) : null}
      </div>
      {event.poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={event.poster} alt="" className={styles.rowPoster} loading="lazy" width={72} height={102} />
      ) : null}
    </Reveal>
  );
}

/** Upcoming events as featured cards and the rest as an archive grouped by year. */
export function EventListing({ events, buildTime, emptyUpcoming, kindLabel }: { events: Event[]; buildTime: string; emptyUpcoming: string; kindLabel: string }) {
  const now = useNow(buildTime);
  const upcoming = events.filter((e) => isUpcoming(e, now));
  const past = events.filter((e) => !isUpcoming(e, now)).reverse();
  const years = [...new Set(past.map((e) => e.day.slice(0, 4)))];
  return (
    <>
      <section className="section" aria-labelledby="upcoming">
        <h2 id="upcoming" className={styles.listHead}>Upcoming</h2>
        {upcoming.length ? (
          <div className={styles.featuredList}>
            {upcoming.map((e, i) => (
              <Reveal key={e.slug} index={i}>
                <FeaturedEvent event={e} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className={styles.empty}>{emptyUpcoming}</p>
        )}
      </section>
      {past.length ? (
        <section className="section" aria-labelledby="archive" style={{ paddingTop: 0 }}>
          <h2 id="archive" className={styles.listHead}>Archive</h2>
          {years.map((y) => (
            <div key={y} className={styles.year}>
              <h3 className={styles.yearHead}>{y}</h3>
              <ul className={styles.rows}>
                {past.filter((e) => e.day.startsWith(y)).map((e, i) => (
                  <EventRow key={e.slug} event={e} index={i} />
                ))}
              </ul>
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
  return <FeaturedEvent event={e} label={next ? "Next" : "Latest"} />;
}
