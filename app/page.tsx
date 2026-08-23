import { CustomCursor } from "@/components/effects/CustomCursor";
import { AppShowcase } from "@/components/sections/AppShowcase";
import { DeclinedMoment } from "@/components/sections/DeclinedMoment";
import { Faq } from "@/components/sections/Faq";
import { Fees } from "@/components/sections/Fees";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { MerchantProof } from "@/components/sections/MerchantProof";
import { PersonaFork } from "@/components/sections/PersonaFork";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { Trust } from "@/components/sections/Trust";
import { Waitlist } from "@/components/sections/Waitlist";
import { WhoItsFor } from "@/components/sections/WhoItsFor";

export default function LandingPage() {
  return (
    <>
      <CustomCursor />
      <SiteHeader />

      <main id="top">
        <Hero />
        <DeclinedMoment />
        <MerchantProof />
        <HowItWorks />
        <PersonaFork />
        <Fees />
        <WhoItsFor />
        <AppShowcase />
        <Trust />
        <Faq />
        <Waitlist />
      </main>

      <SiteFooter />
    </>
  );
}
