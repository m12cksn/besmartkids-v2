import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Langsung ke isi
      </a>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
