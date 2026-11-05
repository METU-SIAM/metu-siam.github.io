import type { MetadataRoute } from "next";
import { seminars, SITE_URL, workshops } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/seminars/", "/workshops/", "/people/", "/join/", "/about/", "/resources/", "/contact/"];
  return [
    ...pages.map((p) => ({ url: `${SITE_URL}${p}` })),
    ...[...seminars, ...workshops].map((e) => ({ url: `${SITE_URL}${e.href}` })),
  ];
}
