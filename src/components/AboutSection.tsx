import { useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, BookOpen, Theater, Scale, FileText, Pen, Award, Star, Globe, Heart, ChevronLeft, ChevronRight, type LucideIcon } from "lucide-react";
import { getAbout, getHighlights } from "@/lib/content";
import { useI18n, uiStrings } from "@/hooks/use-i18n";
import { useQuery } from "@tanstack/react-query";

const iconMap: Record<string, LucideIcon> = {
  GraduationCap, BookOpen, Theater, Scale, FileText, Pen, Award, Star, Globe, Heart,
};

const iconEmoji: Record<string, string> = {
  GraduationCap: "🎓",
  Scale: "⚖️",
  Award: "🤖",
  Theater: "🎭",
};

const CARDS_PER_VIEW = 2;
const AUTO_PLAY_INTERVAL = 4000;

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { lang, t } = useI18n();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const { data: about } = useQuery({
    queryKey: ["about"],
    queryFn: getAbout,
  });

  const { data: highlights = [] } = useQuery({
    queryKey: ["highlights"],
    queryFn: getHighlights,
  });

  const totalGroups = Math.max(0, highlights.length - CARDS_PER_VIEW + 1);

  useEffect(() => {
    if (highlights.length <= CARDS_PER_VIEW) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % totalGroups);
    }, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [highlights.length, totalGroups]);

  const goTo = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalGroups) % totalGroups);
  };

  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalGroups);
  };

  const visibleHighlights = highlights.slice(currentIndex, currentIndex + CARDS_PER_VIEW);

  return (
    <section id="apropos" className="bg-background py-20 px-6 md:px-12 lg:px-24" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="font-body text-[0.68rem] tracking-[3px] text-primary uppercase font-semibold block mb-3">
            {uiStrings["about.label"][lang]}
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-2">
            {about ? t(about.heading_fr, about.heading_en) : uiStrings["about.label"][lang]}
          </h2>
          <div className="w-10 h-[2px] bg-primary my-8 md:my-10" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left: text — fixe */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {about ? (
              <div
                className="font-body text-base md:text-lg leading-relaxed space-y-4 [&_*]:!text-foreground/80 [&_strong]:!text-foreground [&_strong]:!font-semibold"
                dangerouslySetInnerHTML={{
                  __html: [
                    t(about.paragraph1_fr, about.paragraph1_en),
                    t(about.paragraph2_fr, about.paragraph2_en),
                  ]
                    .filter(Boolean)
                    .join(""),
                }}
              />
            ) : (
              <p className="font-body text-muted-foreground italic">
                {uiStrings["common.loading"][lang]}
              </p>
            )}

            <div className="border-l-4 border-primary pl-6 py-4 mt-8 bg-card/50 rounded-r-md">
              <div
                className="font-heading text-xl md:text-2xl font-medium italic text-foreground leading-snug [&_*]:!text-inherit"
                dangerouslySetInnerHTML={{ __html: about ? t(about.paragraph3_fr, about.paragraph3_en) : "" }}
              />
            </div>
          </motion.div>

          {/* Right: compétences en slider */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative"
          >
            {highlights.length > 0 && (
              <>
                {/* Slider cards */}
                <div className="relative overflow-hidden min-h-[280px]">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentIndex}
                      custom={direction}
                      variants={{
                        enter: (d: number) => ({ opacity: 0, x: d * 40 }),
                        center: { opacity: 1, x: 0 },
                        exit: (d: number) => ({ opacity: 0, x: d * -40 }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.45, ease: "easeInOut" }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                      {visibleHighlights.map((h) => {
                        const Icon = iconMap[h.icon] || BookOpen;
                        const emoji = iconEmoji[h.icon];
                        return (
                          <div
                            key={h.id}
                            className="bg-card border border-border/50 hover:border-primary/40 rounded-xl p-6 transition-all duration-300 shadow-sm hover:shadow-md"
                          >
                            <span className="text-3xl block mb-4">
                              {emoji || <Icon size={24} className="text-primary" />}
                            </span>
                            <h5 className="font-body text-sm font-bold text-foreground mb-2 leading-snug">
                              {t(h.label_fr, h.label_en)}
                            </h5>
                            <div
                              className="font-body text-xs text-muted-foreground leading-relaxed [&_*]:!text-muted-foreground [&_strong]:!text-foreground"
                              dangerouslySetInnerHTML={{ __html: t(h.detail_fr, h.detail_en) }}
                            />
                          </div>
                        );
                      })}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation */}
                {highlights.length > CARDS_PER_VIEW && (
                  <div className="flex items-center justify-between mt-6">
                    {/* Dots */}
                    <div className="flex gap-2">
                      {Array.from({ length: totalGroups }).map((_, i) => (
                        <button
                          key={i}
                          onClick={() => goTo(i)}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            currentIndex === i ? "bg-primary w-6" : "bg-primary/25 w-2 hover:bg-primary/50"
                          }`}
                          aria-label={`Aller au groupe ${i + 1}`}
                        />
                      ))}
                    </div>
                    {/* Arrows */}
                    <div className="flex gap-2">
                      <button
                        onClick={prev}
                        className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary transition-all duration-200"
                        aria-label="Précédent"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        onClick={next}
                        className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary transition-all duration-200"
                        aria-label="Suivant"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
