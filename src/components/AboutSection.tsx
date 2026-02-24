import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, BookOpen, Theater, Scale } from "lucide-react";

const highlights = [
  { icon: GraduationCap, label: "Double licence en Philosophie", detail: "Institut Jean-Paul II, Cotonou · Université Pontificale Urbanienne" },
  { icon: Scale, label: "Juriste des droits humains (en formation)", detail: "Master — Chaire UNESCO, Cotonou" },
  { icon: Theater, label: "Acteur", detail: 'Série "Ministre" · Deutsche Welle' },
  { icon: BookOpen, label: "IA Maker Bootcamp", detail: "CREC, Godomey, Bénin" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="apropos" className="section-padding bg-card" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-3">
            À propos
          </p>
          <h2 className="heading-lg mb-4">
            Penser l'Afrique <span className="text-gradient-gold">autrement</span>
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
            <p className="body-lg text-secondary-foreground leading-relaxed">
              <strong className="text-foreground">Chams Modeste HEDJI</strong> est titulaire d'une double licence en Philosophie obtenue à l'Institut Jean-Paul II de Cotonou et à l'Université Pontificale Urbanienne. Juriste des droits humains en formation, il est actuellement auditeur en Master Droits de la Personne Humaine et Démocratie à la Chaire UNESCO.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Ses travaux portent sur les questions identitaires africaines à l'ère des mutations contemporaines — liées notamment à l'intelligence artificielle et aux transformations socio-culturelles — dans une perspective à la fois philosophique, éthique, juridique et scientifique. Il a également obtenu une attestation d'IA Maker Bootcamp au Centre de Recherche, d'Étude et de Créativité (CREC) de Godomey, Bénin.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Sa soutenance de fin de cycle, portant sur <em>« De la reconquête de l'authenticité de l'être-là africain : une lecture de la Crise du Muntu de Fabien Eboussi Boulaga »</em>, a obtenu la mention Excellente.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="bg-secondary/50 border border-border p-6 rounded-sm hover:border-primary/40 transition-colors group"
              >
                <h.icon className="text-primary mb-3 group-hover:scale-110 transition-transform" size={28} />
                <h3 className="font-heading font-semibold text-foreground mb-1 text-sm">{h.label}</h3>
                <p className="text-muted-foreground text-xs">{h.detail}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
