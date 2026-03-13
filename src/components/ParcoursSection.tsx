import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { getParcours, type ParcoursItem } from "@/lib/content";
import { useI18n, uiStrings } from "@/hooks/use-i18n";

const categoryColors: Record<string, string> = {
  vie: "bg-muted-foreground",
  art: "bg-primary",
  académique: "bg-gold-light",
  publication: "bg-gold-dark",
};

const ParcoursSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { lang, t } = useI18n();
  const [items, setItems] = useState<ParcoursItem[]>([]);

  useEffect(() => {
    getParcours().then(setItems).catch(() => {});
  }, []);

  return (
    <section id="parcours" className="section-padding" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-3">
            {uiStrings["parcours.label"][lang]}
          </p>
          <h2 className="heading-lg mb-4">
            {uiStrings["parcours.heading.1"][lang]} <span className="text-gradient-gold">{uiStrings["parcours.heading.2"][lang]}</span>
          </h2>
          <div className="h-[2px] w-16 bg-gold-gradient mb-12" />
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[18px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[2px] bg-border" />

          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              className={`relative flex items-start mb-10 md:mb-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
            >
              {/* Dot */}
              <div className="absolute left-[14px] md:left-1/2 md:-translate-x-1/2 top-1 z-10">
                <div className={`w-[10px] h-[10px] rounded-full ${categoryColors[item.category] || "bg-primary"} ring-4 ring-background`} />
              </div>

              {/* Content */}
              <div className={`ml-12 md:ml-0 md:w-[45%] ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                <span className="text-primary font-heading font-bold text-lg">{item.year}</span>
                <div 
                  className="prose prose-sm dark:prose-invert prose-p:text-foreground prose-p:mt-1 prose-p:leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: t(item.title_fr, item.title_en) }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ParcoursSection;
