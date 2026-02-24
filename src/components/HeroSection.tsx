import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import heroPortrait from "@/assets/chams-portrait.jpg";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/60" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 grid lg:grid-cols-2 gap-12 items-center pt-24">
        {/* Text */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-4"
          >
            Diplômé en Philosophie · Juriste des droits humains (en formation) · IA Maker Bootcamp (2026) · Auteur · Acteur
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="heading-xl mb-6"
          >
            Chams Modeste{" "}
            <span className="text-gradient-gold">HEDJI</span>
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="h-[2px] bg-gold-gradient mb-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="body-lg text-secondary-foreground max-w-lg mb-8 leading-relaxed"
          >
            Mes travaux portent sur les questions identitaires africaines à l'ère des mutations contemporaines, dans une perspective philosophique, éthique, juridique et scientifique.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="flex gap-4 flex-wrap"
          >
            <a
              href="#apropos"
              className="inline-flex items-center gap-2 bg-gold-gradient text-primary-foreground font-body font-semibold px-8 py-3 rounded-sm tracking-wide text-sm uppercase hover:opacity-90 transition-opacity"
            >
              Découvrir
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-primary text-primary font-body font-semibold px-8 py-3 rounded-sm tracking-wide text-sm uppercase hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Me contacter
            </a>
          </motion.div>
        </div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="hidden lg:flex justify-end"
        >
          <div className="relative">
            <div className="absolute -inset-4 border border-primary/30 rounded-sm" />
            <div className="absolute -inset-8 border border-primary/10 rounded-sm" />
            <img
              src={heroPortrait}
              alt="Chams Modeste HEDJI"
              className="relative w-[420px] h-[520px] object-cover object-top rounded-sm"
            />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown className="text-primary" size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
