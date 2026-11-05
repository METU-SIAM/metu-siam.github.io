import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

/**
 * Renders an abstract or page body. Plain Markdown (not MDX), with GFM and
 * $math$. Relative images resolve against `base`, the talk's own folder.
 */
export function Markdown({ source, base }: { source: string; base?: string }) {
  return (
    <MDXRemote
      source={source}
      options={{ mdxOptions: { format: "md", remarkPlugins: [remarkGfm, remarkMath], rehypePlugins: [rehypeKatex] } }}
      components={{
        img: ({ src, alt }) => {
          const s = typeof src === "string" ? src : "";
          const resolved = base && s && !s.includes("://") && !s.startsWith("/") ? `${base}${s}` : s;
          // eslint-disable-next-line @next/next/no-img-element
          return <img src={resolved} alt={alt ?? ""} loading="lazy" />;
        },
      }}
    />
  );
}
