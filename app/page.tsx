import Link from "next/link";
import { JoinSteps } from "@/components/Blocks";
import { Spotlight } from "@/components/Events";
import { FlowField } from "@/components/FlowField";
import { Icon, type IconName } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { seminars, site, workshops } from "@/lib/content";
import styles from "./home.module.css";

const OFFER: { icon: IconName; title: string; body: string; href: string; cta: string }[] = [
  {
    icon: "presentation",
    title: "Seminars",
    body: "Talks in applied mathematics, computation, and neighbouring fields, usually in the Hayri Körezlioğlu Seminar Room at IAM.",
    href: "/seminars/",
    cta: "Upcoming talks",
  },
  {
    icon: "code",
    title: "Workshops",
    body: "Hands-on sessions alongside the seminar series — programming, tools, and topics from the IAM programmes, including the Python Lecture Series.",
    href: "/workshops/",
    cta: "Short courses",
  },
  {
    icon: "users",
    title: "Community",
    body: "Students and faculty from mathematics, engineering, economics, physics, and the IAM programmes. Free SIAM student membership for members.",
    href: "/join/",
    cta: "Join the chapter",
  },
];

export default function Home() {
  const buildTime = new Date().toISOString();
  const all = [...seminars, ...workshops].sort((a, b) => a.sortKey.localeCompare(b.sortKey));
  const facts = [
    { n: String(site.founded), label: "founded at the Institute of Applied Mathematics" },
    { n: "1st", label: "SIAM student chapter in Turkey" },
    { n: "4", label: "IAM programmes at the chapter's scientific home" },
  ];

  return (
    <>
      <section className={styles.hero}>
        <FlowField className={styles.field} />
        <div className={`container ${styles.heroInner}`}>
          <Reveal>
            <p className={styles.heroKicker}>Institute of Applied Mathematics · METU · since {site.founded}</p>
          </Reveal>
          <Reveal index={1}>
            <h1 className={styles.heroTitle}>
              METU SIAM
              <span>Student Chapter</span>
            </h1>
          </Reveal>
          <Reveal index={2}>
            <p className={styles.heroLede}>
              Society for Industrial and Applied Mathematics at Middle East Technical University. A student chapter
              for applied mathematics, scientific computing, and neighbouring fields, with seminars and workshops at
              the Institute of Applied Mathematics since {site.founded}.
            </p>
          </Reveal>
          <Reveal index={3}>
            <div className="btn-row" style={{ marginTop: "2rem" }}>
              <Link href="/seminars/" className="btn btn-primary">
                Upcoming events <Icon name="arrow" size={16} />
              </Link>
              <Link href="/join/" className={`btn ${styles.heroGhost}`}>
                Join the chapter
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section container" aria-labelledby="spotlight">
        <div className="section-head">
          <div>
            <p className="kicker">Seminar series</p>
            <h2 id="spotlight">From the seminar series</h2>
          </div>
          <Link href="/seminars/" className="link-arrow">
            All seminars <Icon name="arrow" size={16} />
          </Link>
        </div>
        <Reveal>
          <Spotlight events={all} buildTime={buildTime} />
        </Reveal>
      </section>

      <section className={styles.band} aria-labelledby="what">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="kicker">What we do</p>
              <h2 id="what">Talks, courses, and people</h2>
            </div>
          </div>
          <ul className={styles.offer}>
            {OFFER.map((o, i) => (
              <Reveal as="li" key={o.title} index={i} className={styles.card}>
                <span className={styles.cardIcon}>
                  <Icon name={o.icon} size={22} />
                </span>
                <h3>{o.title}</h3>
                <p>{o.body}</p>
                <Link href={o.href} className="link-arrow">
                  {o.cta} <Icon name="arrow" size={16} />
                </Link>
              </Reveal>
            ))}
          </ul>
          <dl className={styles.facts}>
            {facts.map((f, i) => (
              <Reveal key={f.label} index={i} className={styles.fact}>
                <dt>{f.n}</dt>
                <dd>{f.label}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <section className="section container" aria-labelledby="join">
        <div className="section-head">
          <div>
            <p className="kicker">Membership</p>
            <h2 id="join">Join the chapter in three steps</h2>
          </div>
          <Link href="/join/" className="link-arrow">
            Full instructions <Icon name="arrow" size={16} />
          </Link>
        </div>
        <JoinSteps />
      </section>
    </>
  );
}
