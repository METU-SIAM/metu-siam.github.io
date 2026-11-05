import type { Metadata } from "next";
import { JoinSteps, PageHead } from "@/components/Blocks";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Join",
  description: "How to join the METU SIAM Student Chapter — SIAM membership, METU registration, and contacting the officers.",
};

export default function JoinPage() {
  return (
    <>
      <PageHead
        kicker="Membership"
        title="Join the chapter"
        lede="METU SIAM is open to students and faculty across mathematical sciences, statistics, computer science, engineering, economics, physics, and related fields. Chapter members who are students may take a free SIAM student membership."
      />
      <div className="container">
        <JoinSteps />
        <section className="section" aria-labelledby="ask">
          <h2 id="ask" style={{ fontSize: "1.8rem" }}>Ask to join</h2>
          <p className="lede" style={{ marginBottom: "1.5rem" }}>
            If you have already started the SIAM or campus paperwork — or you only want to be on the seminar list — send a
            short note.
          </p>
          <ContactForm email={site.email} formId={site.formspree_form_id ?? ""} subject="I would like to join METU SIAM" />
        </section>
      </div>
    </>
  );
}
