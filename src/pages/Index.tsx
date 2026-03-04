import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ParcoursSection from "@/components/ParcoursSection";
import PublicationsSection from "@/components/PublicationsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ParcoursSection />
      <PublicationsSection />
      <Footer />
    </div>
  );
};

export default Index;
