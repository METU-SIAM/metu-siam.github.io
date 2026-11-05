// Reads the chapter's content at build time: YAML data files in content/data,
// and one folder per talk in content/seminars (or content/workshops) holding
// index.md (front matter + abstract) and its images.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import yaml from "js-yaml";
import type { Event, Kind } from "./format";

export * from "./format";

const ROOT = path.join(process.cwd(), "content");
const TZ = "Europe/Istanbul";

function readYaml<T>(name: string): T {
  return yaml.load(fs.readFileSync(path.join(ROOT, "data", name), "utf8")) as T;
}

// --- data files --------------------------------------------------------------

export type Social = { label: string; handle: string; url: string };
export type SiteData = {
  name: string;
  short_name: string;
  email: string;
  founded: number;
  address_lines: string[];
  calendar_src: string;
  formspree_form_id: string;
  social: Social[];
  links: Record<string, string>;
};

export type Person = { name: string; role: string; affiliation?: string; email?: string; url?: string };
export type People = {
  faculty_advisors: Person[];
  departmental_advisors: Person[];
  student_officers: Person[];
  sponsors: Person[];
};

export type ResourceGroup = { title: string; items: { label: string; url: string; note?: string }[] };
export type PythonLectures = {
  title: string;
  status: string;
  intro: string;
  sessions: { title: string; date?: string | Date; note?: string; materials?: string }[];
};

export const site = readYaml<SiteData>("site.yml");
export const people = readYaml<People>("people.yml");
export const resources = readYaml<{ groups: ResourceGroup[] }>("resources.yml").groups;
export const pythonLectures = readYaml<PythonLectures>("python_lectures.yml");

// --- talks and workshops ------------------------------------------------------



/** The calendar day of a YAML date in Istanbul. */
function dayInIstanbul(d: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)!.value;
  return `${get("year")}-${get("month")}-${get("day")}`;
}

function toDay(value: unknown): string | null {
  if (value instanceof Date) {
    // a bare date (2026-01-01) is parsed as UTC midnight; keep it as written
    const isBare = value.getUTCHours() === 0 && value.getUTCMinutes() === 0 && value.getUTCSeconds() === 0;
    return isBare ? value.toISOString().slice(0, 10) : dayInIstanbul(value);
  }
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)) return value.slice(0, 10);
  return null;
}

/** Istanbul has been UTC+3 all year since 2016. */
const at = (day: string, hhmm: string) => new Date(`${day}T${hhmm}:00+03:00`).toISOString();

function readEvents(kind: Kind): Event[] {
  const dir = path.join(ROOT, kind === "seminar" ? "seminars" : "workshops");
  if (!fs.existsSync(dir)) return [];
  const out: Event[] = [];
  for (const slug of fs.readdirSync(dir)) {
    if (slug.startsWith("_") || slug.startsWith(".")) continue;
    const file = path.join(dir, slug, "index.md");
    if (!fs.existsSync(file)) continue;
    const { data, content } = matter(fs.readFileSync(file, "utf8"));
    if (data.published === false) continue;
    const day = toDay(data.date);
    if (!day) continue;
    const base = kind === "seminar" ? "/seminars" : "/workshops";
    const poster = typeof data.poster === "string" && data.poster
      ? data.poster.includes("://") || data.poster.startsWith("/") ? data.poster : `${base}/${slug}/${data.poster}`
      : undefined;
    out.push({
      kind,
      slug,
      href: `${base}/${slug}/`,
      title: String(data.title ?? slug),
      speaker: data.speaker,
      affiliation: data.affiliation,
      day,
      sortKey: at(day, data.start_time ?? "23:59"),
      endsAt: at(day, data.end_time ?? "23:59"),
      time: data.time,
      start_time: data.start_time,
      end_time: data.end_time,
      venue: data.venue,
      poster,
      series: data.series ?? undefined,
      description: data.description,
      status: data.status,
      body: content.trim(),
    });
  }
  return out.sort((a, b) => a.sortKey.localeCompare(b.sortKey));
}

export const seminars = readEvents("seminar");
export const workshops = readEvents("workshop");

export function findEvent(kind: Kind, slug: string) {
  return (kind === "seminar" ? seminars : workshops).find((e) => e.slug === slug);
}

export function aboutPage() {
  const { data, content } = matter(fs.readFileSync(path.join(ROOT, "about.md"), "utf8"));
  // the Jekyll file uses Liquid for two links; resolve them here
  const body = content
    .replace(/\{\{\s*site\.data\.site\.links\.(\w+)\s*\}\}/g, (_, k) => site.links[k] ?? "#")
    .replace(/\{\{\s*'([^']+)'\s*\|\s*relative_url\s*\}\}/g, (_, p) => p);
  return { title: String(data.title), description: String(data.description ?? ""), body };
}
