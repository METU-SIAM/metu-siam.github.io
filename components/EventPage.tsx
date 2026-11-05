import Link from "next/link";
import { addToCalendarUrl, formatLong, SITE_URL, type Event } from "@/lib/content";
import { Icon } from "./Icon";
import { Markdown } from "./Markdown";
import { Reveal } from "./Reveal";
import styles from "./EventPage.module.css";

export function EventPage({ event }: { event: Event }) {
  const listing = event.kind === "workshop" ? { href: "/workshops/", label: "Workshops" } : { href: "/seminars/", label: "Seminars" };
  const cal = addToCalendarUrl(event, SITE_URL);
  return (
    <article className={`container ${styles.talk} ${event.poster ? styles.hasPoster : ""}`}>
      <div className={styles.main}>
        <p className="kicker">
          <Link href={listing.href} className={styles.crumb}>{listing.label}</Link>
          {event.series ? ` · Series ${event.series}` : ""}
        </p>
        <p className={styles.dateline}>
          <Icon name="calendar" size={16} />
          <time dateTime={event.day}>{formatLong(event.day)}</time>
          {event.time ? (
            <>
              <span aria-hidden="true">·</span>
              <Icon name="clock" size={16} />
              {event.time}
            </>
          ) : null}
        </p>
        <h1 className={styles.title}>{event.title}</h1>
        {event.speaker ? (
          <p className={styles.speaker}>
            {event.speaker}
            {event.affiliation ? <span> · {event.affiliation}</span> : null}
          </p>
        ) : null}
        {event.venue ? (
          <p className={styles.venue}>
            <Icon name="pin" size={16} /> {event.venue}
          </p>
        ) : null}
        <div className="btn-row" style={{ marginTop: "1.5rem" }}>
          {cal ? (
            <a className="btn btn-primary" href={cal} target="_blank" rel="noopener noreferrer">
              <Icon name="calendar" size={16} /> Add to calendar
            </a>
          ) : null}
          <Link className="btn btn-ghost" href={listing.href}>
            All {listing.label.toLowerCase()}
          </Link>
        </div>
        {event.body ? (
          <section className={`prose ${styles.body}`} aria-label="Abstract">
            <h2 className={styles.abstractHead}>Abstract</h2>
            <Markdown source={event.body} base={event.href} />
          </section>
        ) : null}
      </div>
      {event.poster ? (
        <Reveal className={styles.posterWrap}>
          <a href={event.poster} target="_blank" rel="noopener noreferrer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={event.poster} alt={`Poster for ${event.title}`} className={styles.poster} width={362} height={512} />
          </a>
        </Reveal>
      ) : null}
    </article>
  );
}
