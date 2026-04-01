import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, BookOpen, Theater, Scale, FileText, Pen, Award, Star, Globe, Heart, type LucideIcon } from "lucide-react";
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

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { lang, t } = useI18n();

  const { data: about } = useQuery({
    queryKey: ["about"],
    queryFn: getAbout,
  });

  const { data: highlights = [] } = useQuery({
    queryKey: ["highlights"],
    queryFn: getHighlights,
  });

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
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {about ? (
              <div
                className="font-body text-base md:text-lg text-foreground/80 leading-relaxed space-y-4"
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
              <p className="font-heading text-xl md:text-2xl font-medium italic text-foreground leading-snug">
                {about ? t(about.paragraph3_fr, about.paragraph3_en) : ""}
              </p>
            </div>
          </motion.div>

          {/* Right: competences grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {highlights.map((h, i) => {
              const Icon = iconMap[h.icon] || BookOpen;
              const emoji = iconEmoji[h.icon];
              return (
                <motion.div
                  key={h.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="bg-card border border-border/50 hover:border-primary/30 rounded-xl p-6 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <span className="text-3xl block mb-4">
                    {emoji || <Icon size={24} className="text-primary" />}
                  </span>
                  <h5 className="font-body text-sm font-bold text-foreground mb-2 leading-snug">
                    {t(h.label_fr, h.label_en)}
                  </h5>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">
                    {t(h.detail_fr, h.detail_en)}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
