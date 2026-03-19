import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import heroPortrait from "@/assets/chams-portrait.jpg";
import { getHero, type HeroData } from "@/lib/content";
import { useI18n } from "@/hooks/use-i18n";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const { t } = useI18n();
  const [hero, setHero] = useState<HeroData | null>(null);

  useEffect(() => {
    getHero().then(setHero).catch(() => {});
  }, []);

  const title = hero ? t(hero.title_fr, hero.title_en) : "Chams Modeste HEDJI";
  const subtitle = "PHILOSOPHIE · DROITS HUMAINS · CRÉATION NUMÉRIQUE";
  const description = "J'accompagne institutions, chercheurs et porteurs de projets dans la compréhension des enjeux identitaires africains à l'ère numérique — et dans leur transition vers l'intelligence artificielle.";

  const titleParts = title.split(" ");
  const lastName = titleParts.pop() || "HEDJI";
  const firstName = titleParts.join(" ");

  return (
    <section
      id="accueil"
      style={{ background: "#f4efe4" }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "6rem 4rem 4rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "center",
          border: "20px solid red",
        }}
        className="hero-grid"
      >
        {/* Left — Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p
            className="font-body"
            style={{
              fontSize: "0.68rem",
              letterSpacing: "3px",
              color: "#b8922a",
              textTransform: "uppercase",
              fontWeight: 600,
              marginBottom: "0.8rem",
            }}
          >
            {subtitle}
          </p>

          <h1
            className="font-heading"
            style={{
              fontSize: "clamp(3rem, 5vw, 4.5rem)",
              lineHeight: 1.0,
              fontWeight: 700,
              color: "#1a1710",
              marginBottom: 0,
            }}
          >
            {firstName}
          </h1>
          <h1
            className="font-heading"
            style={{
              fontSize: "clamp(3rem, 5vw, 4.5rem)",
              lineHeight: 1.0,
              fontWeight: 700,
              color: "#b8922a",
              marginBottom: 0,
            }}
          >
            {lastName}
          </h1>

          <div
            style={{
              width: "40px",
              height: "2px",
              background: "#b8922a",
              margin: "1.5rem 0",
            }}
          />

          <div
            className="font-body"
            style={{ fontSize: "0.95rem", color: "#444", lineHeight: 1.9, marginBottom: "0.8rem" }}
            dangerouslySetInnerHTML={{
              __html: `<strong style="color:#1a1710;">À l'intersection de la pensée critique et de l'action concrète.</strong>`,
            }}
          />
          <p
            className="font-body"
            style={{
              fontSize: "0.92rem",
              color: "#555",
              lineHeight: 1.85,
              marginBottom: "1.8rem",
            }}
          >
            {description}
          </p>

          <p
            className="font-heading"
            style={{
              fontSize: "1.05rem",
              fontStyle: "italic",
              color: "#8a6a1a",
              marginBottom: "2rem",
            }}
          >
            « Penser le monde, mais aussi le transformer. »
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link
              to="/services"
              className="font-body"
              style={{
                background: "#b8922a",
                color: "white",
                padding: "0.85rem 2rem",
                fontSize: "0.72rem",
                letterSpacing: "2px",
                textTransform: "uppercase",
                fontWeight: 600,
                textDecoration: "none",
                display: "inline-block",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#8a6a1a")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#b8922a")}
            >
              Travailler ensemble
            </Link>
            <a
              href="#apropos"
              className="font-body"
              style={{
                background: "transparent",
                color: "#1a1710",
                padding: "0.85rem 2rem",
                fontSize: "0.72rem",
                letterSpacing: "2px",
                textTransform: "uppercase",
                fontWeight: 600,
                border: "1.5px solid #1a1710",
                textDecoration: "none",
                display: "inline-block",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#1a1710";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#1a1710";
              }}
            >
              Découvrir mon travail
            </a>
          </div>
        </motion.div>

        {/* Right — Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{
            width: "100%",
            aspectRatio: "3/4",
            overflow: "hidden",
            borderRadius: "2px",
            position: "relative",
          }}
        >
          <img
            src={heroPortrait}
            alt="Chams Modeste HEDJI"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
          />
          {/* Effet de lumière blanchâtre en bas */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "40%",
              background: "linear-gradient(to top, #f4efe4, transparent)",
              pointerEvents: "none",
            }}
          />
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            padding: 3rem 1.5rem 2rem !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
