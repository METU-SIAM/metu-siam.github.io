import Link from "next/link";
import { JoinSteps } from "@/components/Blocks";
import { Spotlight } from "@/components/Events";
import { FlowField } from "@/components/FlowField";
import { Icon } from "@/components/Icon";
import { RiseLines, SectionHead } from "@/components/Motion";
import { Reveal } from "@/components/Reveal";
import { seminars, site, workshops } from "@/lib/content";
import styles from "./home.module.css";

const OFFER = [
  {
    title: "Seminars",
    body: "Talks in applied mathematics, computation, and neighbouring fields, usually in the Hayri Körezlioğlu Seminar Room at IAM.",
    href: "/seminars/",
    cta: "Upcoming talks",
  },
  {
    title: "Workshops",
    body: "Hands-on sessions alongside the seminar series: programming, tools, and topics from the IAM programmes, including the Python Lecture Series.",
    href: "/workshops/",
    cta: "Short courses",
  },
  {
    title: "Community",
    body: "Students and faculty from mathematics, engineering, economics, physics, and the IAM programmes. Free SIAM student membership for members.",
    href: "/join/",
    cta: "Join the chapter",
  },
];

export default function Home() {
  const buildTime = new Date().toISOString();
  const all = [...seminars, ...workshops].sort((a, b) => a.sortKey.localeCompare(b.sortKey));

  return (
    <>
      <section className={styles.hero}>
        <FlowField className={styles.field} />
        <div className={`container ${styles.heroInner}`}>
          <Reveal>
            <p className={styles.heroKicker}>Institute of Applied Mathematics · METU · since {site.founded}</p>
          </Reveal>
          <h1 className={styles.heroTitle}>
            <RiseLines lines={["METU SIAM", <span key="s" className={styles.heroSub}>Student Chapter</span>]} delay={0.1} />
          </h1>
          <Reveal index={3}>
            <p className={styles.heroLede}>
              Society for Industrial and Applied Mathematics at Middle East Technical University. A student chapter for
              applied mathematics, scientific computing, and neighbouring fields, with seminars and workshops at the
              Institute of Applied Mathematics since {site.founded}.
            </p>
          </Reveal>
          <Reveal index={4}>
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
        <SectionHead
          index="i."
          kicker="Seminar series"
          title="From the seminar series"
          id="spotlight"
          aside={
            <Link href="/seminars/" className="link-arrow">
              All seminars <Icon name="arrow" size={16} />
            </Link>
          }
        />
        <Spotlight events={all} buildTime={buildTime} />
      </section>

      <section className="section container" aria-labelledby="what">
        <SectionHead index="ii." kicker="What we do" title="Talks, courses, and people" id="what" />
        <ol className={styles.offer}>
          {OFFER.map((o, i) => (
            <Reveal as="li" key={o.title} index={i} className={styles.offerItem}>
              <span className={styles.offerNum}>{String(i + 1).padStart(2, "0")}</span>
              <h3>{o.title}</h3>
              <p>{o.body}</p>
              <Link href={o.href} className="link-arrow">
                {o.cta} <Icon name="arrow" size={16} />
              </Link>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="section container" aria-labelledby="join">
        <SectionHead
          index="iii."
          kicker="Membership"
          title="Join the chapter in three steps"
          id="join"
          aside={
            <Link href="/join/" className="link-arrow">
              Full instructions <Icon name="arrow" size={16} />
            </Link>
          }
        />
        <JoinSteps />
      </section>
    </>
  );
}
