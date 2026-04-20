import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroPortrait from "@/assets/chams-portrait.jpg";
import chamsWriting from "@/assets/chams-writing.jpg";
import digitalTransition from "@/assets/digital-transition.png";
import { getHero } from "@/lib/content";
import { useI18n, uiStrings } from "@/hooks/use-i18n";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const HeroSection = () => {
  const { t, lang } = useI18n();
  const { data: hero } = useQuery({
    queryKey: ["hero"],
    queryFn: getHero,
  });

  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: "identity",
      subtitle: hero ? t(hero.subtitle_fr, hero.subtitle_en) : uiStrings["hero.intersection"][lang],
      titleMain: hero ? t(hero.title_fr, hero.title_en).split(" ").slice(0, -1).join(" ") : "Chams Modeste",
      titleLast: hero ? t(hero.title_fr, hero.title_en).split(" ").pop() : "HEDJI",
      description: hero ? t(hero.description_fr, hero.description_en) : "",
      quote: uiStrings["hero.quote"][lang],
      image: heroPortrait,
      ctaLabel: uiStrings["hero.cta.work"][lang],
      ctaLink: "/services",
    },
    {
      id: "expertise",
      subtitle: uiStrings["hero.slide2.title"][lang],
      titleMain: "Pensée &",
      titleLast: "Rigueur",
      description: uiStrings["hero.slide2.desc"][lang],
      quote: "« Comprendre le monde pour mieux l'orienter. »",
      image: chamsWriting,
      ctaLabel: uiStrings["hero.discover"][lang],
      ctaLink: "#apropos",
    },
    {
      id: "digital",
      subtitle: uiStrings["hero.slide3.title"][lang],
      titleMain: "Transition",
      titleLast: "Numérique",
      description: uiStrings["hero.slide3.desc"][lang],
      quote: "« L'IA au service d'une humanité augmentée. »",
      image: digitalTransition,
      ctaLabel: "Mes Services IA",
      ctaLink: "/services",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // 6 seconds auto-play
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <section id="accueil" className="bg-background pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden min-h-[90vh] flex items-center relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="grid md:grid-cols-2 gap-12 md:gap-24 items-center"
          >
            {/* Left — Text */}
            <div className="relative z-10">
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-body text-[0.68rem] tracking-[3px] text-primary uppercase font-semibold mb-3"
              >
                {slide.subtitle}
              </motion.p>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-heading text-5xl md:text-7xl lg:text-8xl leading-tight font-bold text-foreground mb-0"
              >
                {slide.titleMain}
              </motion.h1>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="font-heading text-5xl md:text-7xl lg:text-8xl leading-tight font-bold text-primary mb-0"
              >
                {slide.titleLast}
              </motion.h1>

              <div className="w-10 h-[2px] bg-primary my-6 md:my-8" />

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="font-body text-base md:text-lg text-foreground/90 leading-relaxed mb-6 max-w-xl"
                dangerouslySetInnerHTML={{ __html: slide.description }}
              />

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="font-heading text-lg md:text-xl italic text-primary/80 mb-10"
              >
                {slide.quote}
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  to={slide.ctaLink}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-[0.7rem] tracking-[2px] uppercase font-semibold rounded-sm transition-all duration-300 shadow-sm"
                >
                  {slide.ctaLabel}
                </Link>
                {currentSlide === 0 && (
                  <a
                    href="#apropos"
                    className="bg-transparent border border-foreground hover:bg-foreground hover:text-background px-8 py-4 text-[0.7rem] tracking-[2px] uppercase font-semibold rounded-sm transition-all duration-300"
                  >
                    {uiStrings["hero.cta.discover"][lang]}
                  </a>
                )}
              </motion.div>
            </div>

            {/* Right — Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative aspect-[3/4] w-full max-w-md mx-auto md:max-w-none overflow-hidden rounded-sm shadow-2xl"
            >
              <img
                src={slide.image}
                alt={slide.titleMain}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background to-transparent pointer-events-none" />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === i ? "bg-primary w-8" : "bg-primary/30 hover:bg-primary/50"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

