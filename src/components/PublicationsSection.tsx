import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, FileText, Pen, Award, Star, GraduationCap, Globe, Heart, Scale, Theater, type LucideIcon } from "lucide-react";
import { getPublications, type Publication } from "@/lib/content";
import { useI18n, uiStrings } from "@/hooks/use-i18n";

const iconMap: Record<string, LucideIcon> = {
  BookOpen, FileText, Pen, Award, Star, GraduationCap, Globe, Heart, Scale, Theater,
};

const PublicationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { lang, t } = useI18n();
  const [pubs, setPubs] = useState<Publication[]>([]);

  useEffect(() => {
    getPublications().then(setPubs).catch(() => {});
  }, []);

  return (
    <section id="publications" className="section-padding bg-card" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-3">
            {uiStrings["pub.label"][lang]}
          </p>
          <h2 className="heading-lg mb-4">
            {uiStrings["pub.heading.1"][lang]} <span className="text-gradient-gold">{uiStrings["pub.heading.2"][lang]}</span>
          </h2>
          <div className="h-[2px] w-16 bg-gold-gradient mb-12" />
        </motion.div>

        <div className="space-y-4">
          {pubs.map((pub, i) => {
            const Icon = iconMap[pub.icon] || FileText;
            return (
              <motion.div
                key={pub.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="group flex gap-5 items-start p-6 bg-secondary/30 border border-border rounded-sm hover:border-primary/40 transition-all duration-300"
              >
                <Icon className="text-primary shrink-0 mt-1 group-hover:scale-110 transition-transform" size={22} />
                <div>
                  <span className="text-primary text-xs font-body uppercase tracking-widest">{t(pub.type_fr, pub.type_en)}</span>
                  <h3 className="font-heading font-semibold text-foreground mt-1">{t(pub.title_fr, pub.title_en)}</h3>
                  <div 
                    className="prose prose-sm dark:prose-invert prose-p:text-muted-foreground prose-p:mt-1"
                    dangerouslySetInnerHTML={{ __html: t(pub.detail_fr, pub.detail_en) }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PublicationsSection;
