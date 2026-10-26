import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Construction } from "lucide-react";
import { getGrade, grades, pilotTopics } from "@/features/catalog/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
export const dynamicParams = false;
export function generateStaticParams() {
  return grades.map((g) => ({ grade: String(g.id) }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ grade: string }>;
}) {
  const g = getGrade((await params).grade);
  return { title: g ? `Materi kelas ${g.id}` : "Kelas tidak ditemukan" };
}
export default async function TopicsPage({
  params,
}: {
  params: Promise<{ grade: string }>;
}) {
  const g = getGrade((await params).grade);
  if (!g) notFound();
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 sm:px-8 sm:py-16"
    >
      <nav aria-label="Jejak halaman">
        <Button asChild variant="ghost" className="-ml-5">
          <Link href="/grades">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Semua kelas
          </Link>
        </Button>
      </nav>
      <Badge variant="accent" className="mt-6">
        Kelas {g.id} ·{" "}
        {g.status === "preview" ? "Pratinjau pilot" : "Segera hadir"}
      </Badge>
      <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
        {g.status === "preview"
          ? "Bagian kecil, ide besar."
          : `Materi kelas ${g.id} sedang disiapkan.`}
      </h1>
      {g.status === "preview" ? (
        <>
          <p className="mt-5 max-w-2xl leading-8 text-muted-foreground">
            Pecahan, desimal, dan persentase saling terhubung. Inilah topik yang
            akan kita jelajahi bersama.
          </p>
          <div className="mt-7 flex items-start gap-3 rounded-2xl border border-border bg-white p-5">
            <Construction
              aria-hidden="true"
              className="mt-1 size-5 shrink-0 text-primary"
            />
            <p className="text-sm leading-7">
              <strong>Pratinjau—belum bisa dipelajari.</strong> Pelajaran,
              video, dan latihan masih disiapkan. Jawaban dan progres belum
              dapat disimpan.
            </p>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {pilotTopics.map((t, i) => (
              <Card key={t.slug} className="p-6">
                <div className="flex items-center justify-between">
                  <span className="grid h-20 min-w-24 place-items-center rounded-2xl bg-primary/10 px-4 text-3xl font-black text-primary">
                    {t.symbol}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    0{i + 1}
                  </span>
                </div>
                <h2 className="mt-6 text-2xl font-bold">{t.title}</h2>
                <p className="mt-3 min-h-14 text-sm leading-7 text-muted-foreground">
                  {t.description}
                </p>
                <p className="mt-5 rounded-xl bg-muted p-4 text-sm font-semibold leading-6">
                  {t.example}
                </p>
                <p className="mt-6 text-sm text-muted-foreground">
                  Pelajaran segera hadir
                </p>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <p className="mt-6 max-w-2xl leading-8 text-muted-foreground">
          Belum ada materi yang dibuka untuk kelas ini. Sambil menunggu, kamu
          bisa melihat pratinjau topik kelas 5.
        </p>
      )}
      <div className="mt-10">
        <Button asChild variant="secondary">
          <Link href={g.status === "preview" ? "/grades" : "/grades/5/topics"}>
            {g.status === "preview"
              ? "Kembali ke pilihan kelas"
              : "Lihat pratinjau kelas 5"}
          </Link>
        </Button>
      </div>
    </main>
  );
}
