import NotFound from "./(public)/not-found";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
export default function RootNotFound() {
  return (
    <>
      <SiteHeader />
      <NotFound />
      <SiteFooter />
    </>
  );
}
