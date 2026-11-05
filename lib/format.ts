// Pure helpers shared by server and client components (no file system here).

export type Kind = "seminar" | "workshop";

export type Event = {
  kind: Kind;
  slug: string;
  href: string;
  title: string;
  speaker?: string;
  affiliation?: string;
  /** the day in Istanbul, YYYY-MM-DD */
  day: string;
  /** ISO instant: the start time if given, otherwise the end of that day */
  sortKey: string;
  /** ISO instant after which the event counts as past */
  endsAt: string;
  time?: string;
  start_time?: string;
  end_time?: string;
  venue?: string;
  poster?: string;
  series?: number | string;
  description?: string;
  status?: "upcoming" | "past";
  body: string;
};

const TZ = "Europe/Istanbul";

/** Split by the time the page is built; the client re-checks against its own clock. */
export function isUpcoming(e: Event, now = new Date()) {
  if (e.status) return e.status === "upcoming";
  return new Date(e.endsAt) >= now;
}

// --- formatting ---------------------------------------------------------------

const fmt = (opts: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", ...opts });
const asDate = (day: string) => new Date(`${day}T12:00:00Z`);

export const formatLong = (day: string) => fmt({ weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(asDate(day));
export const formatDayMonth = (day: string) => fmt({ day: "2-digit", month: "short" }).format(asDate(day));
export const formatParts = (day: string) => ({
  day: fmt({ day: "2-digit" }).format(asDate(day)),
  month: fmt({ month: "short" }).format(asDate(day)),
  year: day.slice(0, 4),
});

// --- calendar links -------------------------------------------------------------

export const calendarUrls = (src: string) => ({
  view: `https://calendar.google.com/calendar/embed?src=${src}&ctz=Europe%2FIstanbul`,
  subscribe: `https://calendar.google.com/calendar/u/0?cid=${src}`,
});

export function addToCalendarUrl(e: Event, siteUrl: string) {
  if (!e.start_time || !e.end_time) return null;
  const d = e.day.replace(/-/g, "");
  const s = e.start_time.replace(":", "");
  const t = e.end_time.replace(":", "");
  const text = `${e.title}${e.speaker ? ` — ${e.speaker}` : ""}`;
  const q = new URLSearchParams({
    action: "TEMPLATE",
    text,
    dates: `${d}T${s}00/${d}T${t}00`,
    ctz: TZ,
    location: e.venue ?? "",
    details: `${siteUrl}${e.href}`,
  });
  return `https://calendar.google.com/calendar/render?${q.toString()}`;
}

export const SITE_URL = "https://metu-siam.github.io";

