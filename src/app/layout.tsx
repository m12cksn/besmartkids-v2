import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://besmartkids.id"),
  title: {
    default: "BeSmartKids — Matematika Jadi Menyenangkan",
    template: "%s | BeSmartKids",
  },
  description: "Platform belajar matematika interaktif untuk siswa kelas 1–6.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className="h-full antialiased" data-scroll-behavior="smooth">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
