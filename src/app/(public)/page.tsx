import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Hand,
  Lightbulb,
  Pencil,
  Sprout,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { FractionIllustration } from "@/components/math/fraction-illustration";
const steps = [
  { icon: BookOpen, title: "Pelajari", text: "Kenali idenya." },
  { icon: Hand, title: "Jelajahi", text: "Lihat dan coba." },
  { icon: Pencil, title: "Latihan", text: "Uji pemahamanmu." },
  { icon: Lightbulb, title: "Pahami", text: "Temukan alasannya." },
  { icon: Sprout, title: "Berkembang", text: "Lanjut selangkah lagi." },
];
export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="hero-surface border-b border-border">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <Reveal>
            <Badge variant="accent">Matematika visual · SD kelas 1–6</Badge>
            <h1 className="mt-6 max-w-xl text-4xl font-black leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
              Bukan cuma hafal.
              <br />
              <span className="text-primary">Sekarang, paham.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-muted-foreground">
              Dari potongan pecahan hingga garis bilangan. Temukan cara melihat
              matematika, satu ide kecil setiap hari.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/grades">
                  Pilih kelas
                  <ArrowRight aria-hidden="true" className="size-5" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/grades/5/topics">Intip materi kelas 5</Link>
              </Button>
            </div>
            <p className="mt-5 text-sm leading-6 text-muted-foreground">
              Pratinjau awal: pecahan, desimal, dan persentase.
              <br />
              Pelajaran dan latihan belum dibuka.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <FractionIllustration />
          </Reveal>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <p className="eyebrow">Cara belajar BeSmartKids</p>
        <h2 className="mt-3 text-3xl font-black tracking-tight">
          Dari rasa ingin tahu, jadi mengerti.
        </h2>
        <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
          Pengalaman belajar yang sedang kami siapkan: melihat konsep, mencoba
          sendiri, lalu memahami alasan di balik jawaban.
        </p>
        <ol className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <li key={title}>
              <Card className="h-full p-5">
                <div className="flex items-center justify-between">
                  <Icon aria-hidden="true" className="size-6 text-primary" />
                  <span
                    aria-hidden="true"
                    className="text-xs font-bold text-muted-foreground"
                  >
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {text}
                </p>
              </Card>
            </li>
          ))}
        </ol>
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
        <div className="grid items-center gap-8 rounded-[2rem] bg-primary p-7 text-white sm:p-10 md:grid-cols-[1fr_auto]">
          <div>
            <p className="text-sm font-semibold text-white">
              Dimulai dari kelas 5
            </p>
            <h2 className="mt-3 text-3xl font-black">
              Pecahan. Desimal. Persentase.
            </h2>
            <p className="mt-4 max-w-xl leading-7">
              Tiga cara berbeda untuk melihat bagian dari satu kesatuan. Kenali
              topik pada pratinjau pilot kami.
            </p>
          </div>
          <Button asChild variant="accent" size="lg">
            <Link href="/grades/5/topics">
              Lihat pratinjau
              <ArrowRight aria-hidden="true" className="size-5" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
