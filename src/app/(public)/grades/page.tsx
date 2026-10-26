import type { Metadata } from "next";
import { GradeGrid } from "@/features/catalog/grade-grid";
export const metadata: Metadata = { title: "Pilih kelas" };
export default function GradesPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto w-full max-w-6xl flex-1 px-5 py-12 sm:px-8 sm:py-16"
    >
      <p className="eyebrow">Ruang belajar matematika</p>
      <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
        Setiap kelas, langkah baru.
      </h1>
      <p className="mt-5 max-w-2xl leading-8 text-muted-foreground">
        Materi kelas 1–6 akan dibuka bertahap. Saat ini kamu bisa melihat
        pratinjau pecahan, desimal, dan persentase untuk kelas 5.
      </p>
      <div className="mt-10">
        <GradeGrid />
      </div>
    </main>
  );
}
