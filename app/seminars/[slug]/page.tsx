import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EventPage } from "@/components/EventPage";
import { findEvent, seminars } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return seminars.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const e = findEvent("seminar", (await params).slug);
  if (!e) return {};
  return {
    title: e.title,
    description: e.description ?? `METU SIAM seminar${e.speaker ? ` by ${e.speaker}` : ""}`,
    openGraph: { title: e.title, description: e.description, images: e.poster ? [e.poster] : undefined },
  };
}

export default async function SeminarPage({ params }: Props) {
  const e = findEvent("seminar", (await params).slug);
  if (!e) notFound();
  return <EventPage event={e} />;
}
