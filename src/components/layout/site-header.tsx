import Link from "next/link";

import { BrandMark } from "@/components/layout/brand-mark";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="border-b border-border/80 bg-background/90 backdrop-blur">
      <div className="mx-auto flex min-h-18 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Beranda BeSmartKids" className="rounded-xl"><BrandMark /></Link>
        <nav aria-label="Navigasi utama" className="flex items-center gap-2">
          <Button asChild variant="ghost" className="hidden sm:inline-flex"><Link href="#foundation">Fondasi</Link></Button>
          <Button asChild size="sm"><Link href="#status">Lihat status</Link></Button>
        </nav>
      </div>
    </header>
  );
}
