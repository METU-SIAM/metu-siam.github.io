import type { Metadata } from "next";
import { PageHead, PeopleGrid } from "@/components/Blocks";
import { people, site } from "@/lib/content";
import styles from "./people.module.css";

export const metadata: Metadata = {
  title: "People",
  description: "Faculty advisors, departmental advisors, and student officers of the METU SIAM Student Chapter.",
};

const GROUPS = [
  { key: "student_officers", title: "Present officers", sub: "Student leadership and operations." },
  { key: "faculty_advisors", title: "Faculty advisors", sub: "Academic guidance and chapter oversight." },
  { key: "departmental_advisors", title: "Departmental advisors", sub: "Support across departments and research areas." },
  { key: "sponsors", title: "Sponsors", sub: "The chapter is hosted and supported at METU." },
] as const;

export default function PeoplePage() {
  return (
    <>
      <PageHead
        kicker="The chapter"
        title="People"
        lede={
          <>
            Faculty and departmental advisors sit with a student officer team. For general inquiries use{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </>
        }
      />
      <div className="container">
        {GROUPS.map((g) => (
          <section key={g.key} className={styles.group} aria-labelledby={g.key}>
            <header className={styles.head}>
              <h2 id={g.key}>{g.title}</h2>
              <p>{g.sub}</p>
            </header>
            <PeopleGrid people={people[g.key]} />
          </section>
        ))}
      </div>
    </>
  );
}
