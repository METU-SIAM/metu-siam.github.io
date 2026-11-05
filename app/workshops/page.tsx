import type { Metadata } from "next";
import { PageHead } from "@/components/Blocks";
import { EventListing } from "@/components/Events";
import { Rule } from "@/components/Motion";
import { Reveal } from "@/components/Reveal";
import { pythonLectures, workshops } from "@/lib/content";
import styles from "./workshops.module.css";

export const metadata: Metadata = {
  title: "Workshops",
  description: "Workshops and the Python Lecture Series of the METU SIAM Student Chapter.",
};

const day = (d: unknown) => (d instanceof Date ? d.toISOString().slice(0, 10) : typeof d === "string" ? d.slice(0, 10) : null);

export default function WorkshopsPage() {
  const py = pythonLectures;
  return (
    <>
      <PageHead
        kicker="Short courses"
        title="Workshops"
        lede="Hands-on sessions alongside the seminar series: programming, tools, and topics from the IAM programmes. Materials are linked from each listing when they are available."
      />
      <div className="container">
        <section id="python-lecture-series" className={styles.python} aria-labelledby="py-head">
          <Rule accent className={styles.pyRule} />
          <div className={styles.pyHead}>
            <p className="kicker">{py.status === "ongoing" ? "Ongoing series" : "Series"}</p>
            <h2 id="py-head">{py.title}</h2>
          </div>
          <div>
            <p className={styles.pyIntro}>{py.intro}</p>
          {py.sessions.length ? (
            <ol className={styles.sessions}>
              {py.sessions.map((s, i) => {
                const d = day(s.date);
                return (
                  <Reveal as="li" key={`${s.title}-${i}`} index={i} className={styles.session}>
                    <span className={styles.sessionNum}>{d ?? `Session ${String(i + 1).padStart(2, "0")}`}</span>
                    <h3>{s.title}</h3>
                    {s.note ? <p>{s.note}</p> : null}
                    {s.materials ? <a href={s.materials}>Materials</a> : null}
                  </Reveal>
                );
              })}
            </ol>
          ) : (
            <p className={styles.pyEmpty}>Session titles and notes will appear here as the series is scheduled.</p>
          )}
          </div>
        </section>
        <EventListing
          events={workshops}
          buildTime={new Date().toISOString()}
          kindLabel="workshops"
          emptyUpcoming="No workshop is on the calendar yet. When one is announced, it will lead this page."
        />
      </div>
    </>
  );
}
