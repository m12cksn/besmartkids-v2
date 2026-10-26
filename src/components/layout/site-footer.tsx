import Link from "next/link";
import { BrandMark } from "./brand-mark";
export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <BrandMark />
          <p className="mt-3 text-sm text-muted-foreground">
            Langkah kecil, pemahaman besar.
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          <Link
            href="/grades"
            className="inline-flex min-h-11 items-center rounded-lg font-semibold text-primary"
          >
            Jelajahi kelas
          </Link>
          <p>© 2026 BeSmartKids · Pratinjau platform</p>
        </div>
      </div>
    </footer>
  );
}
