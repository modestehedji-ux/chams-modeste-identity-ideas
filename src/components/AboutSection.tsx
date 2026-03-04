import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, BookOpen, Theater, Scale, FileText, Pen, Award, Star, Globe, Heart, type LucideIcon } from "lucide-react";
import { getAbout, getHighlights, type AboutData, type Highlight } from "@/lib/content";
import { useI18n, uiStrings } from "@/hooks/use-i18n";

const iconMap: Record<string, LucideIcon> = {
  GraduationCap, BookOpen, Theater, Scale, FileText, Pen, Award, Star, Globe, Heart,
};

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { lang, t } = useI18n();
  const [about, setAbout] = useState<AboutData | null>(null);
  const [highlights, setHighlights] = useState<Highlight[]>([]);

  useEffect(() => {
    getAbout().then(setAbout).catch(() => {});
    getHighlights().then(setHighlights).catch(() => {});
  }, []);

  return (
    <section id="apropos" className="section-padding bg-card" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-3">
            {uiStrings["about.label"][lang]}
          </p>
          <h2 className="heading-lg mb-4">
            {uiStrings["about.heading.1"][lang]} <span className="text-gradient-gold">{uiStrings["about.heading.2"][lang]}</span>
          </h2>
          <div className="h-[2px] w-16 bg-gold-gradient mb-8" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            {about ? (
              <>
                <p className="body-lg text-secondary-foreground leading-relaxed">
                  <strong className="text-foreground">{t(about.paragraph1_fr, about.paragraph1_en).split('.')[0]}.</strong>{t(about.paragraph1_fr, about.paragraph1_en).split('.').slice(1).join('.')}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t(about.paragraph2_fr, about.paragraph2_en)}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t(about.paragraph3_fr, about.paragraph3_en)}
                </p>
              </>
            ) : (
              <p className="text-muted-foreground">Chargement...</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {highlights.map((h, i) => {
              const Icon = iconMap[h.icon] || BookOpen;
              return (
                <motion.div
                  key={h.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="bg-secondary/50 border border-border p-6 rounded-sm hover:border-primary/40 transition-colors group"
                >
                  <Icon className="text-primary mb-3 group-hover:scale-110 transition-transform" size={28} />
                  <h3 className="font-heading font-semibold text-foreground mb-1 text-sm">{t(h.label_fr, h.label_en)}</h3>
                  <p className="text-muted-foreground text-xs">{t(h.detail_fr, h.detail_en)}</p>
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
