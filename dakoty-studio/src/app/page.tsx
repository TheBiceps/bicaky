import Hero from "@/components/Hero";
import IntegrationBeam from "@/components/IntegrationBeam";
import Benefits from "@/components/Benefits";
import DestroyManualWork from "@/components/DestroyManualWork";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import DataGovernance from "@/components/DataGovernance";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Comparison from "@/components/Comparison";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <IntegrationBeam />
      <Benefits />
      <DestroyManualWork />
      <Services />
      <HowItWorks />
      <DataGovernance />
      <Pricing />
      <Comparison />
      <FAQ />
      <ContactSection />
    </>
  );
}
