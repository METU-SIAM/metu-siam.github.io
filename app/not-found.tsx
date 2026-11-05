import Link from "next/link";
import { PageHead } from "@/components/Blocks";

export default function NotFound() {
  return (
    <PageHead kicker="404" title="Page not found" lede="The page you were looking for is not here. It may have moved when the site was rebuilt.">
      <div className="btn-row" style={{ marginTop: "1.5rem" }}>
        <Link href="/" className="btn btn-primary">Home</Link>
        <Link href="/seminars/" className="btn btn-ghost">Seminars</Link>
      </div>
    </PageHead>
  );
}
