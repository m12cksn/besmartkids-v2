import { Accessibility, Blocks, Check, MousePointerClick, Palette, ShieldCheck, Sparkles } from "lucide-react";

import { SiteHeader } from "@/components/layout/site-header";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const foundations = [
  { icon: Palette, title: "Design system khas", description: "Warna, tipografi, radius, bayangan, dan ritme ruang yang konsisten." },
  { icon: Accessibility, title: "Aksesibel sejak awal", description: "Fokus terlihat, target sentuh nyaman, semantik tepat, dan reduced motion." },
  { icon: Blocks, title: "Arsitektur modular", description: "Batas fitur jelas untuk berkembang dari kelas 1 sampai kelas 6." },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="relative isolate overflow-hidden">
          <div className="absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.20),transparent_45%),radial-gradient(circle_at_top_left,rgba(34,197,94,0.16),transparent_40%)]" />
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-8">
            <Reveal>
              <Badge variant="accent" className="mb-5 gap-1.5"><Sparkles className="size-3.5" aria-hidden="true" />Sprint 1 · Fondasi siap</Badge>
              <h1 className="max-w-3xl text-4xl font-black leading-[1.08] tracking-[-0.04em] sm:text-6xl">
                Matematika terasa lebih <span className="text-primary">dekat</span>, satu langkah setiap hari.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                Fondasi BeSmartKids dibangun untuk pengalaman belajar interaktif yang aman, ramah anak, dan mudah dikembangkan.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg"><a href="#foundation">Jelajahi fondasi <MousePointerClick aria-hidden="true" /></a></Button>
                <Button asChild size="lg" variant="secondary"><a href="#status">Status Sprint 1</a></Button>
              </div>
            </Reveal>

            <Reveal delay={0.12} className="relative">
              <Card className="overflow-hidden border-primary/15 bg-white/90">
                <div className="bg-primary px-6 py-4 text-primary-foreground">
                  <p className="text-sm font-semibold text-green-100">Contoh visual matematika</p>
                  <p className="mt-1 text-2xl font-black">Pecahan itu sederhana</p>
                </div>
                <CardContent className="space-y-6 pt-6">
                  <div className="flex items-center justify-center gap-5" aria-label="Tiga dari empat bagian terisi">
                    <div className="grid grid-cols-2 gap-1" aria-hidden="true">
                      {[true, true, true, false].map((filled, index) => (
                        <span key={index} className={`size-14 rounded-lg border-2 border-primary/30 ${filled ? "bg-success" : "bg-muted"}`} />
                      ))}
                    </div>
                    <span className="text-4xl font-black text-primary">¾</span>
                  </div>
                  <div className="rounded-lg bg-muted p-4 text-sm leading-6 text-muted-foreground">Tiga bagian berwarna dari empat bagian yang sama besar.</div>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </section>

        <section id="foundation" className="mx-auto max-w-6xl scroll-mt-8 px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Badge>Fondasi produk</Badge>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">Dibuat untuk tumbuh dengan rapi</h2>
            <p className="mt-4 leading-7 text-muted-foreground">Komponen dasar dan aturan teknis sudah disiapkan sebelum fitur pembelajaran ditambahkan.</p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {foundations.map(({ icon: Icon, title, description }) => (
              <Card key={title} className="transition-transform hover:-translate-y-1">
                <CardHeader>
                  <span className="grid size-11 place-items-center rounded-lg bg-primary/10 text-primary"><Icon aria-hidden="true" /></span>
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section id="status" className="border-y border-border bg-white">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <Badge variant="neutral">Engineering status</Badge>
              <h2 className="mt-4 text-3xl font-black tracking-tight">Siap untuk Sprint 2</h2>
              <p className="mt-4 leading-7 text-muted-foreground">Sprint ini sengaja berhenti di fondasi. Katalog kelas dan halaman pemasaran lengkap masuk tahap berikutnya.</p>
            </div>
            <ul className="grid gap-3" aria-label="Cakupan yang siap">
              {["Next.js App Router + strict TypeScript", "Tailwind dan komponen UI reusable", "Motion dengan reduced-motion support", "Placeholder Supabase yang tervalidasi", "Vitest, Testing Library, dan Playwright"].map((item) => (
                <li key={item} className="flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 text-sm font-semibold">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-success/15 text-primary"><Check className="size-4" aria-hidden="true" /></span>{item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <footer className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>© 2026 BeSmartKids. Belajar dengan percaya diri.</p>
        <p className="inline-flex items-center gap-2"><ShieldCheck className="size-4 text-primary" aria-hidden="true" />Fondasi aman dan teruji</p>
      </footer>
    </div>
  );
}
