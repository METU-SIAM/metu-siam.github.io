"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import styles from "./Header.module.css";
import { ThemeToggle } from "./ThemeToggle";

const NAV = [
  { href: "/seminars/", label: "Seminars" },
  { href: "/workshops/", label: "Workshops" },
  { href: "/people/", label: "People" },
  { href: "/about/", label: "About" },
];

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const active = (href: string) => path === href || path.startsWith(href);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${open ? styles.open : ""}`}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand} aria-label="METU SIAM home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/metu-siam-logo.svg" alt="" width={34} height={39} />
          <span className={styles.brandText}>
            <span className={styles.brandTitle}>METU SIAM</span>
            <span className={styles.brandSub}>Student Chapter</span>
          </span>
        </Link>

        <nav id="site-nav" className={styles.nav} aria-label="Primary">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={styles.link} aria-current={active(n.href) ? "page" : undefined}>
              {n.label}
            </Link>
          ))}
          <Link href="/join/" className={`btn btn-primary ${styles.join}`} aria-current={active("/join/") ? "page" : undefined}>
            Join
          </Link>
        </nav>

        <div className={styles.tools}>
          <ThemeToggle className={styles.iconBtn} />
          <button
            type="button"
            className={`${styles.iconBtn} ${styles.menuBtn}`}
            aria-controls="site-nav"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? "close" : "menu"} size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
