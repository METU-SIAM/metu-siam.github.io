import Link from "next/link";
import { site } from "@/lib/content";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div>
          <p className={styles.brand}>{site.name}</p>
          <p className={styles.copy}>
            Institute of Applied Mathematics,
            <br />
            Middle East Technical University.
          </p>
          <p className={styles.meta}>
            © {new Date().getFullYear()} {site.name}. A student chapter of the Society for Industrial and Applied
            Mathematics.
          </p>
        </div>
        <div>
          <h2 className={styles.head}>Explore</h2>
          <ul className={styles.list}>
            <li><Link href="/about/">About</Link></li>
            <li><Link href="/join/">Join the chapter</Link></li>
            <li><Link href="/resources/">Resources</Link></li>
            <li><Link href="/contact/">Contact</Link></li>
            <li><a href="/feed.xml">RSS</a></li>
          </ul>
        </div>
        <div>
          <h2 className={styles.head}>Follow</h2>
          <ul className={styles.list}>
            {site.social.map((s) => (
              <li key={s.url}>
                <a href={s.url} rel="noopener noreferrer">{s.label}</a>
              </li>
            ))}
            <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
