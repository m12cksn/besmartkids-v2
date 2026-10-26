import Link from "next/link";
import { BrandMark } from "./brand-mark";
import { Button } from "@/components/ui/button";
export function SiteHeader() {
  return (
    <header className="border-b border-border bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-8">
        <Link
          href="/"
          aria-label="Beranda BeSmartKids"
          className="inline-flex min-h-11 items-center rounded-xl"
        >
          <BrandMark />
        </Link>
        <nav aria-label="Navigasi utama" className="flex items-center gap-3">
          <Button asChild variant="ghost">
            <Link href="/grades">Pilih kelas</Link>
          </Button>
          <span className="hidden text-xs text-muted-foreground sm:block">
            Masuk · segera hadir
          </span>
        </nav>
      </div>
    </header>
  );
}
