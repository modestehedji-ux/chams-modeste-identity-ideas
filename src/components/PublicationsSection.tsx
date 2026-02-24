import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, FileText, Pen } from "lucide-react";

const publications = [
  {
    icon: BookOpen,
    type: "Ouvrage",
    title: "Jusqu'aux enfers…",
    detail: "Pièce théâtrale — Éditions Savanes du Continent, 2024",
  },
  {
    icon: FileText,
    type: "Article",
    title: "La conception du temps en Afrique à la lumière du christianisme africain de Jacob Agossou",
    detail: "Revue du Philosophat, 2021",
  },
  {
    icon: FileText,
    type: "Article (co-auteur)",
    title: "La philosophie de l'inculturation dans « Gbeto et Gbedoto » de Jacob AGOSSOU",
    detail: "Actes du Colloque Jacob AGOSSOU, 2022",
  },
  {
    icon: FileText,
    type: "Article (co-auteur)",
    title: "Quelques tentatives d'unification politique et territoriale en Afrique",
    detail: "La Voix de Saint-Gall, 2023",
  },
  {
    icon: Pen,
    type: "Mémoire",
    title: "De la reconquête de l'authenticité de l'être-là africain : une lecture de la Crise du Muntu",
    detail: "Mention Excellente — Fabien Eboussi Boulaga, 2022",
  },
];

const PublicationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="publications" className="section-padding bg-card" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-3">
            Publications
          </p>
          <h2 className="heading-lg mb-4">
            Écrits & <span className="text-gradient-gold">contributions</span>
          </h2>
          <div className="h-[2px] w-16 bg-gold-gradient mb-12" />
        </motion.div>

        <div className="space-y-4">
          {publications.map((pub, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="group flex gap-5 items-start p-6 bg-secondary/30 border border-border rounded-sm hover:border-primary/40 transition-all duration-300"
            >
              <pub.icon className="text-primary shrink-0 mt-1 group-hover:scale-110 transition-transform" size={22} />
              <div>
                <span className="text-primary text-xs font-body uppercase tracking-widest">{pub.type}</span>
                <h3 className="font-heading font-semibold text-foreground mt-1">{pub.title}</h3>
                <p className="text-muted-foreground text-sm mt-1">{pub.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PublicationsSection;
