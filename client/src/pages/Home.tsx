/* ==========================================================
   DESIGN: Editorial Ledger
   Home: assembles all sections in order
   ========================================================== */

import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
// import GoodReadsSection from "@/components/GoodReadsSection";
import HeroSection from "@/components/HeroSection";
import LedgerSection from "@/components/LedgerSection";
import LibrarySection from "@/components/LibrarySection";
import Navbar from "@/components/Navbar";
import OpenSourceSection from "@/components/OpenSourceSection";
// import ToolsSection from "@/components/ToolsSection";
import WritingSection from "@/components/WritingSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B0D11]">
      <Navbar />
      <HeroSection />
      <LedgerSection />
      <WritingSection />
      <LibrarySection />
      <OpenSourceSection />
      {/* <GoodReadsSection /> */}
      {/* <ToolsSection /> */}
      <ContactSection />
      <Footer />
    </div>
  );
}
