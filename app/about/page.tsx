import type { Metadata } from "next";
import { PageHead } from "@/components/Blocks";
import { Markdown } from "@/components/Markdown";
import { aboutPage } from "@/lib/content";

const about = aboutPage();

export const metadata: Metadata = { title: about.title, description: about.description };

export default function AboutPage() {
  return (
    <>
      <PageHead kicker="The chapter" title="About METU SIAM" />
      <div className="container prose" style={{ paddingBottom: "2rem" }}>
        <Markdown source={about.body} />
      </div>
    </>
  );
}
