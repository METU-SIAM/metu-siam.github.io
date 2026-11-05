import type { Metadata } from "next";
import { Outfit, Rubik, Source_Serif_4 } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { site, SITE_URL } from "@/lib/content";
import "katex/dist/katex.min.css";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin", "latin-ext"], variable: "--font-outfit", display: "swap" });
const serif = Source_Serif_4({ subsets: ["latin", "latin-ext"], variable: "--font-source-serif", display: "swap", style: ["normal", "italic"] });
const rubik = Rubik({ subsets: ["latin", "latin-ext"], variable: "--font-rubik", display: "swap" });

const description =
  "The METU chapter of SIAM brings together students interested in applied mathematics, scientific computing, data science, and related areas. Seminars, workshops, and reading groups at the Institute of Applied Mathematics.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: site.name, template: `%s · ${site.short_name}` },
  description,
  icons: { icon: "/images/metu-siam-logo.svg" },
  alternates: { types: { "application/rss+xml": `${SITE_URL}/feed.xml` } },
  openGraph: { type: "website", siteName: site.name, title: site.name, description, images: ["/images/metu-siam-logo.png"] },
  twitter: { card: "summary", site: "@MetuSiam" },
};

const themeInit = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className={`${outfit.variable} ${rubik.variable} ${serif.variable}`}>
        <a className="skip-link" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
