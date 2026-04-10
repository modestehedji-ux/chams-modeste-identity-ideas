import { motion } from "framer-motion";
import heroPortrait from "@/assets/chams-portrait.jpg";
import { getHero } from "@/lib/content";
import { useI18n, uiStrings } from "@/hooks/use-i18n";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const HeroSection = () => {
  const { t, lang } = useI18n();
  const { data: hero } = useQuery({
    queryKey: ["hero"],
    queryFn: getHero,
  });

  const title = hero ? t(hero.title_fr, hero.title_en) : "Chams Modeste HEDJI";
  const subtitle = hero ? t(hero.subtitle_fr, hero.subtitle_en) : "";
  const description = hero ? t(hero.description_fr, hero.description_en) : "";

  const titleParts = title.split(" ");
  const lastName = titleParts.pop() || "HEDJI";
  const firstName = titleParts.join(" ");

  return (
    <section id="accueil" className="bg-background pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 md:gap-24 items-center">
        {/* Left — Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10"
        >
          <p className="font-body text-[0.68rem] tracking-[3px] text-primary uppercase font-semibold mb-3">
            {subtitle}
          </p>

          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl leading-tight font-bold text-foreground mb-0">
            {firstName}
          </h1>
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl leading-tight font-bold text-primary mb-0">
            {lastName}
          </h1>

          <div className="w-10 h-[2px] bg-primary my-6 md:my-8" />

          <div
            className="font-body text-base md:text-lg text-foreground/90 leading-relaxed mb-4"
            dangerouslySetInnerHTML={{
              __html: `<strong class="text-foreground">${uiStrings["hero.intersection"][lang]}</strong>`,
            }}
          />
          <div 
            className="font-body text-sm md:text-base leading-relaxed mb-6 prose prose-sm max-w-none prose-p:my-1 [&_*]:!text-foreground/80 [&_strong]:!text-foreground [&_strong]:!font-semibold"
            dangerouslySetInnerHTML={{ __html: description }}
          />

          <p className="font-heading text-lg md:text-xl italic text-primary/80 mb-10">
            {uiStrings["hero.quote"][lang]}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/services"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-[0.7rem] tracking-[2px] uppercase font-semibold rounded-sm transition-all duration-300 shadow-sm"
            >
              {uiStrings["hero.cta.work"][lang]}
            </Link>
            <a
              href="#apropos"
              className="bg-transparent border border-foreground hover:bg-foreground hover:text-background px-8 py-4 text-[0.7rem] tracking-[2px] uppercase font-semibold rounded-sm transition-all duration-300"
            >
              {uiStrings["hero.cta.discover"][lang]}
            </a>
          </div>
        </motion.div>

        {/* Right — Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative aspect-[3/4] w-full max-w-md mx-auto md:max-w-none overflow-hidden rounded-sm"
        >
          <img
            src={heroPortrait}
            alt="Chams Modeste HEDJI"
            className="w-full h-full object-cover object-top"
          />
          {/* Effet de fondu en bas */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
