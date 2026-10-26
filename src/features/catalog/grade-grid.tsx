import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { grades } from "./data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
export function GradeGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {grades.map((g) => (
        <Card
          key={g.id}
          className={
            g.status === "preview"
              ? "relative border-primary bg-white p-6 ring-1 ring-primary"
              : "bg-white p-6"
          }
        >
          <div className="flex items-center justify-between gap-2">
            <span
              aria-hidden="true"
              className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-xl font-black text-primary"
            >
              {g.id}
            </span>
            <Badge variant={g.status === "preview" ? "accent" : "neutral"}>
              {g.status === "preview" ? "Pratinjau pilot" : "Segera hadir"}
            </Badge>
          </div>
          <h2 className="mt-6 text-2xl font-black">Kelas {g.id}</h2>
          <p className="mt-2 font-semibold">{g.title}</p>
          <p className="mt-2 min-h-14 text-sm leading-7 text-muted-foreground">
            {g.description}
          </p>
          {g.status === "preview" ? (
            <Button asChild className="mt-5 w-full">
              <Link href={`/grades/${g.id}/topics`}>
                Lihat pratinjau kelas {g.id}
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </Link>
            </Button>
          ) : (
            <p className="mt-5 flex min-h-11 items-center text-sm text-muted-foreground">
              Materi sedang disiapkan
            </p>
          )}
        </Card>
      ))}
    </div>
  );
}
