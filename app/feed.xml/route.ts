import { seminars, site, SITE_URL, workshops } from "@/lib/content";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const items = [...seminars, ...workshops].sort((a, b) => b.sortKey.localeCompare(a.sortKey)).slice(0, 20);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.name)}</title>
    <description>Seminars and workshops of the METU SIAM Student Chapter.</description>
    <link>${SITE_URL}/</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <language>en</language>
${items
  .map(
    (e) => `    <item>
      <title>${esc(e.title)}</title>
      <link>${SITE_URL}${e.href}</link>
      <guid isPermaLink="false">${e.kind}s/${e.slug}</guid>
      <pubDate>${new Date(e.sortKey).toUTCString()}</pubDate>
      <description>${esc([e.speaker, e.affiliation].filter(Boolean).join(" · ") + (e.venue ? `. ${e.venue}` : ""))}</description>
    </item>`,
  )
  .join("\n")}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
