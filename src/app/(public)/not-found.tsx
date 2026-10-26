import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function NotFound() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto w-full max-w-6xl flex-1 px-5 py-20"
    >
      <p className="eyebrow">404 · Tidak ditemukan</p>
      <h1 className="mt-4 text-3xl font-black">Halaman ini belum ada.</h1>
      <p className="mt-4 text-muted-foreground">
        Pilih kelas 1 sampai 6 dari katalog untuk melanjutkan.
      </p>
      <Button asChild className="mt-8">
        <Link href="/grades">Kembali ke pilihan kelas</Link>
      </Button>
    </main>
  );
}
