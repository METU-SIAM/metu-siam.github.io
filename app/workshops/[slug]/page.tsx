import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EventPage } from "@/components/EventPage";
import { findEvent, workshops } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  // static export treats an empty list as missing; "_none" renders a 404
  return workshops.length ? workshops.map((e) => ({ slug: e.slug })) : [{ slug: "_none" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const e = findEvent("workshop", (await params).slug);
  if (!e) return {};
  return {
    title: e.title,
    description: e.description ?? `${e.speaker ?? ""} — METU SIAM workshop`,
    openGraph: { title: e.title, description: e.description, images: e.poster ? [e.poster] : undefined },
  };
}

export default async function WorkshopPage({ params }: Props) {
  const e = findEvent("workshop", (await params).slug);
  if (!e) notFound();
  return <EventPage event={e} />;
}
