/* ==========================================================
   DESIGN: Quiet Luxury Futurism
   Home: assembles all sections in order
   ========================================================== */

import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import GoodReadsSection from "@/components/GoodReadsSection";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import ToolsSection from "@/components/ToolsSection";
import VenturesSection from "@/components/VenturesSection";
import WritingSection from "@/components/WritingSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <VenturesSection />
      <WritingSection />
      <GoodReadsSection />
      <ToolsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
