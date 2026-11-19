import { CustomCursor } from "@/components/effects/CustomCursor";
import { Bento } from "@/components/sections/Bento";
import { Closing } from "@/components/sections/Closing";
import { Corridors } from "@/components/sections/Corridors";
import { DeclinedMoment } from "@/components/sections/DeclinedMoment";
import { Faq } from "@/components/sections/Faq";
import { Fees } from "@/components/sections/Fees";
import { FundingRoutes } from "@/components/sections/FundingRoutes";
import { Hero } from "@/components/sections/Hero";
import { KineticVerbs } from "@/components/sections/KineticVerbs";
import { Merchants } from "@/components/sections/Merchants";
import { Pillars } from "@/components/sections/Pillars";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { Trust } from "@/components/sections/Trust";

export default function LandingPage() {
  return (
    <>
      <CustomCursor />
      <SiteHeader />

      <main id="top">
        <Hero />
        <KineticVerbs />
        <Pillars />
        <DeclinedMoment />
        <Bento />
        <FundingRoutes />
        <Merchants />
        <Corridors />
        <Fees />
        <Trust />
        <Faq />
        <Closing />
      </main>

      <SiteFooter />
    </>
  );
}
