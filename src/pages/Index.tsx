import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import ApercuOffres from "@/components/ApercuOffres";
import AboutSection from "@/components/AboutSection";
import ParcoursSection from "@/components/ParcoursSection";
import PublicationsSection from "@/components/PublicationsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div style={{ background: "#f4efe4" }}>
      <Navbar />
      <HeroSection />
      <StatsBar />
      <ApercuOffres />
      <AboutSection />
      <ParcoursSection />
      <PublicationsSection />
      <Footer />
    </div>
  );
};

export default Index;
