import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import heroPortrait from "@/assets/chams-portrait.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import { getHero, type HeroData } from "@/lib/content";
import { useI18n, uiStrings } from "@/hooks/use-i18n";

const HeroSection = () => {
  const { lang, t } = useI18n();
  const [hero, setHero] = useState<HeroData | null>(null);

  useEffect(() => {
    getHero().then(setHero).catch(() => {});
  }, []);

  // Fallbacks while loading or if DB is empty
  const title = hero ? t(hero.title_fr, hero.title_en) : "Chams Modeste HEDJI";
  const subtitle = hero ? t(hero.subtitle_fr, hero.subtitle_en) : "";
  const description = hero ? t(hero.description_fr, hero.description_en) : "";

  // Split title into first name and last name for styling
  const titleParts = title.split(" ");
  const lastName = titleParts.pop() || "";
  const firstName = titleParts.join(" ");

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
            {subtitle}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="heading-xl mb-6"
          >
            {firstName}{" "}
            <span className="text-gradient-gold">{lastName}</span>
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
            {description}
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
              {uiStrings["hero.discover"][lang]}
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 border border-primary text-primary font-body font-semibold px-8 py-3 rounded-sm tracking-wide text-sm uppercase hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {uiStrings["hero.contact"][lang]}
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
              alt={title}
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
