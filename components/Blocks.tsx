import Link from "next/link";
import { calendarUrls, site, type Person } from "@/lib/content";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import styles from "./Blocks.module.css";

export function CalendarLinks() {
  const c = calendarUrls(site.calendar_src);
  return (
    <>
      <a className="btn btn-ghost" href={c.view} target="_blank" rel="noopener noreferrer">
        <Icon name="calendar" size={16} /> Calendar
      </a>
      <a className="btn btn-ghost" href={c.subscribe} target="_blank" rel="noopener noreferrer">
        Subscribe <Icon name="external" size={14} />
      </a>
    </>
  );
}

export function JoinSteps() {
  const steps = [
    {
      title: "Become a SIAM member",
      body: "Student members of SIAM chapters are eligible for a free SIAM student membership: SIAM News and SIAM Review, a discount on SIAM books, and travel awards for conferences.",
      link: { href: site.links.siam_membership, label: "Create a SIAM account" },
    },
    {
      title: "Register the chapter at METU",
      body: "If you already hold SIAM membership, complete the student-community registration with the Office of Cultural Affairs (Kültür ve Ders Dışı İşler Müdürlüğü).",
      link: { href: site.links.kdd, label: "Office of Cultural Affairs" },
    },
    {
      title: "Write to us",
      body: "Tell us you would like to join — seminars, workshops, and chapter mail go out from the officers. We welcome students and faculty from mathematics, statistics, computer science, engineering, economics, physics, and neighbouring fields.",
      link: { href: `mailto:${site.email}`, label: site.email },
      extra: { href: "/contact/", label: "Contact form" },
    },
  ];
  return (
    <ol className={styles.steps}>
      {steps.map((s, i) => (
        <Reveal as="li" key={s.title} index={i} className={styles.step}>
          <span className={styles.stepNum} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
          <h3 className={styles.stepTitle}>{s.title}</h3>
          <p className={styles.stepBody}>{s.body}</p>
          <p className={styles.stepLinks}>
            <a href={s.link.href} className="link-arrow">
              {s.link.label} <Icon name="arrow" size={16} />
            </a>
            {s.extra ? (
              <Link href={s.extra.href} className="link-arrow">
                {s.extra.label} <Icon name="arrow" size={16} />
              </Link>
            ) : null}
          </p>
        </Reveal>
      ))}
    </ol>
  );
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter((w) => /^\p{L}/u.test(w))
    .map((w) => w[0])
    .filter((_, i, a) => i === 0 || i === a.length - 1)
    .join("");

export function PeopleGrid({ people, sponsors = false }: { people: Person[]; sponsors?: boolean }) {
  return (
    <ul className={styles.people}>
      {people.map((p, i) => (
        <Reveal as="li" key={p.name} index={i} className={styles.person}>
          {!sponsors ? <span className={styles.avatar} aria-hidden="true">{initials(p.name)}</span> : null}
          <div className={styles.personBody}>
            <h3 className={styles.personName}>{p.name}</h3>
            <p className={styles.personRole}>{p.role}</p>
            {p.affiliation ? <p className={styles.personAffil}>{p.affiliation}</p> : null}
            {p.email ? (
              <a className={styles.personLink} href={`mailto:${p.email}`}>
                <Icon name="mail" size={14} /> {p.email}
              </a>
            ) : null}
            {p.url ? (
              <a className={styles.personLink} href={p.url} rel="noopener noreferrer">
                <Icon name="external" size={14} /> {p.url.replace(/^https?:\/\//, "")}
              </a>
            ) : null}
          </div>
        </Reveal>
      ))}
    </ul>
  );
}

export function PageHead({ kicker, title, lede, children }: { kicker: string; title: string; lede?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <header className="container page-head">
      <p className="kicker">{kicker}</p>
      <h1 className="page-title">{title}</h1>
      {lede ? <p className="lede">{lede}</p> : null}
      {children}
    </header>
  );
}
