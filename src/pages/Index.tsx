import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ApercuOffres from "@/components/ApercuOffres";
import AboutSection from "@/components/AboutSection";
import ParcoursSection from "@/components/ParcoursSection";
import PublicationsSection from "@/components/PublicationsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <HeroSection />
      <ApercuOffres />
      <AboutSection />
      <ParcoursSection />
      <PublicationsSection />
      <Footer />
    </div>
  );
};

export default Index;
