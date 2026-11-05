import type { Metadata } from "next";
import { CalendarLinks, PageHead } from "@/components/Blocks";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/content";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact the METU SIAM Student Chapter at the Institute of Applied Mathematics, METU.",
};

export default function ContactPage() {
  return (
    <>
      <PageHead
        kicker="The chapter"
        title="Contact"
        lede="Officers read mail at the chapter address. Seminars are held at IAM unless a listing says otherwise."
      />
      <div className={`container ${styles.grid}`}>
        <dl className={styles.meta}>
          <dt>Email</dt>
          <dd><a href={`mailto:${site.email}`}>{site.email}</a></dd>
          <dt>Mailing address</dt>
          <dd>
            <address>
              {site.address_lines.map((l, i) => (
                <span key={i}>{l}{i < site.address_lines.length - 1 ? <br /> : null}</span>
              ))}
            </address>
          </dd>
          <dt>Calendar</dt>
          <dd className="btn-row"><CalendarLinks /></dd>
          <dt>Social</dt>
          <dd className={styles.social}>
            {site.social.map((s) => (
              <a key={s.url} href={s.url} rel="noopener noreferrer">{s.label}</a>
            ))}
          </dd>
        </dl>
        <section aria-labelledby="write">
          <h2 id="write" className={styles.formHead}>Write to the chapter</h2>
          <ContactForm email={site.email} formId={site.formspree_form_id ?? ""} subject="Message from the website" />
        </section>
      </div>
    </>
  );
}
