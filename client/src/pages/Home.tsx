import type { HomeProps } from "../content/contracts";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import WorkSection from "../components/WorkSection";
import WritingSection from "../components/WritingSection";
import LibrarySection from "../components/LibrarySection";
import OpenSourceSection from "../components/OpenSourceSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
export default function Home({ writing, reports }: HomeProps) {
  return (
    <div className="plumber">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="sheet" id="top">
        <Navbar />
        <main id="main" tabIndex={-1}>
          <HeroSection />
          <WorkSection />
          <WritingSection writing={writing} />
          <LibrarySection reports={reports} />
          <OpenSourceSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
