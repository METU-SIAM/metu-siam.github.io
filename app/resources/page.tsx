import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/Blocks";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { resources } from "@/lib/content";
import styles from "./resources.module.css";

export const metadata: Metadata = {
  title: "Resources",
  description: "Links for METU SIAM members: SIAM, IAM, campus registration, and chapter pages.",
};

export default function ResourcesPage() {
  return (
    <>
      <PageHead
        kicker="A short shelf"
        title="Resources"
        lede="Places the chapter actually uses: SIAM itself, the institute, campus registration, and the pages on this site."
      />
      <div className={`container ${styles.groups}`}>
        {resources.map((g) => (
          <section key={g.title} aria-labelledby={`r-${g.title}`}>
            <h2 id={`r-${g.title}`} className={styles.head}>{g.title}</h2>
            <ul className={styles.list}>
              {g.items.map((it, i) => {
                const external = it.url.includes("://");
                const inner = (
                  <>
                    <span className={styles.label}>
                      {it.label} <Icon name={external ? "external" : "arrow"} size={14} />
                    </span>
                    {it.note ? <span className={styles.note}>{it.note}</span> : null}
                  </>
                );
                return (
                  <Reveal as="li" key={it.url} index={i}>
                    {external ? (
                      <a className={styles.item} href={it.url} rel="noopener noreferrer">{inner}</a>
                    ) : (
                      <Link className={styles.item} href={it.url}>{inner}</Link>
                    )}
                  </Reveal>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
