import type { Metadata } from "next";
import { CalendarLinks, PageHead } from "@/components/Blocks";
import { EventListing } from "@/components/Events";
import { seminars } from "@/lib/content";

export const metadata: Metadata = {
  title: "Seminars",
  description: "Seminar series of the METU SIAM Student Chapter: upcoming talks and the archive.",
};

export default function SeminarsPage() {
  return (
    <>
      <PageHead
        kicker="Seminar series"
        title="Seminars"
        lede="Talks in applied mathematics, computation, and neighbouring fields, usually in the Hayri Körezlioğlu Seminar Room at the Institute of Applied Mathematics. Subscribe to the chapter calendar, or browse the archive below."
      >
        <div className="btn-row" style={{ marginTop: "1.5rem" }}>
          <CalendarLinks />
        </div>
      </PageHead>
      <div className="container">
        <EventListing
          events={seminars}
          buildTime={new Date().toISOString()}
          kindLabel="seminars"
          emptyUpcoming="No upcoming seminar is scheduled yet. The latest talk is in the archive."
        />
      </div>
    </>
  );
}
