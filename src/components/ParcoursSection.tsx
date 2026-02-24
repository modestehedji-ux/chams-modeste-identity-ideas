import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const timelineData = [
  { year: "2008", title: "Début au Festival de Théâtre REST d'Alexandre Atindoko à Abomey", category: "art" },
  { year: "2008-2010", title: "Prestations sur les scènes de Ayessi (ORTB) et Ablodé Gbadja (Canal 3)", category: "art" },
  { year: "2014", title: 'Acteur dans la série "Ministre" (ORTB/A+) et feuilleton Deutsche Welle', category: "art" },
  { year: "2018", title: "Baccalauréat Série A1", category: "académique" },
  { year: "2019", title: "Institut de Théologie Saint-Gall de Ouidah · Finaliste national concours d'écriture", category: "académique" },
  { year: "2022", title: "Double licence en Philosophie (mention Excellente) — Institut Jean-Paul II & Université Pontificale Urbanienne", category: "académique" },
  { year: "2024", title: 'Publication de "Jusqu\'aux enfers…" (Éditions Savanes du Continent) · Master Chaire UNESCO', category: "publication" },
  { year: "2024", title: "IA Maker Bootcamp — CREC, Godomey, Bénin", category: "académique" },
];

const categoryColors: Record<string, string> = {
  vie: "bg-muted-foreground",
  art: "bg-primary",
  académique: "bg-gold-light",
  publication: "bg-gold-dark",
};

const ParcoursSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="parcours" className="section-padding" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-3">
            Parcours
          </p>
          <h2 className="heading-lg mb-4">
            Un itinéraire <span className="text-gradient-gold">singulier</span>
          </h2>
          <div className="h-[2px] w-16 bg-gold-gradient mb-12" />
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[18px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[2px] bg-border" />

          {timelineData.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              className={`relative flex items-start mb-10 md:mb-8 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Dot */}
              <div className="absolute left-[14px] md:left-1/2 md:-translate-x-1/2 top-1 z-10">
                <div className={`w-[10px] h-[10px] rounded-full ${categoryColors[item.category] || "bg-primary"} ring-4 ring-background`} />
              </div>

              {/* Content */}
              <div className={`ml-12 md:ml-0 md:w-[45%] ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                <span className="text-primary font-heading font-bold text-lg">{item.year}</span>
                <p className="text-foreground mt-1 text-sm leading-relaxed">{item.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ParcoursSection;
