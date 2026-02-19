"use client";

import useScrollAnimation from "../hooks/useScrollAnimation";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ClientLogos from "../components/ClientLogos";
import FeaturesMarquee from "../components/FeaturesMarquee";
import Stats from "../components/Stats";
import Ecosystem from "../components/Ecosystem";
import FeatureShowcase from "../components/FeatureShowcase";
import StackingCards from "../components/StackingCards";
import PricingPreview from "../components/PricingPreview";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import FloatingControls from "../components/FloatingControls";
import Services from "../components/Services";
import Benefits from "../components/Benefits";

export default function Home() {
  useScrollAnimation();

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />

      {/* Landing Page Sections */}
      <ClientLogos />
      <FeaturesMarquee />
      <Services />
      <Benefits />
      <Stats />
      <Ecosystem />
      <FeatureShowcase />
      <StackingCards />
      <PricingPreview />
      <CTA />

      <Footer />
      <FloatingControls />
    </main>
  );
}
