import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, BookOpen, Theater, Scale, FileText, Pen, Award, Star, Globe, Heart, type LucideIcon } from "lucide-react";
import { getAbout, getHighlights, type AboutData, type Highlight } from "@/lib/content";
import { useI18n, uiStrings } from "@/hooks/use-i18n";

const iconMap: Record<string, LucideIcon> = {
  GraduationCap, BookOpen, Theater, Scale, FileText, Pen, Award, Star, Globe, Heart,
};

const iconEmoji: Record<string, string> = {
  GraduationCap: "🎓",
  Scale: "⚖️",
  Award: "🤖",
  Theater: "🎭",
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
    <section id="apropos" style={{ background: "#f4efe4", padding: "5rem 4rem 4rem" }} ref={ref}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span
            className="font-body"
            style={{
              fontSize: "0.68rem",
              letterSpacing: "3px",
              color: "#b8922a",
              textTransform: "uppercase" as const,
              fontWeight: 600,
              display: "block",
              marginBottom: "0.8rem",
            }}
          >
            {uiStrings["about.label"][lang]}
          </span>
          <h1
            className="font-heading"
            style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 700, color: "#1a1710", lineHeight: 1.1, marginBottom: "0.2rem" }}
          >
            Un regard neuf sur{" "}
            <em style={{ color: "#b8922a", fontStyle: "italic" }}>l'Afrique contemporaine</em>
          </h1>
          <div style={{ width: "40px", height: "2px", background: "#b8922a", margin: "1.5rem 0 3rem" }} />
        </motion.div>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}
          className="about-grid"
        >
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {about ? (
              <div
                className="font-body"
                style={{ fontSize: "0.95rem", color: "#3a3a3a", lineHeight: 1.9 }}
                dangerouslySetInnerHTML={{
                  __html: [
                    t(about.paragraph1_fr, about.paragraph1_en),
                    t(about.paragraph2_fr, about.paragraph2_en),
                    t(about.paragraph3_fr, about.paragraph3_en),
                  ]
                    .filter(Boolean)
                    .join(""),
                }}
              />
            ) : (
              <p className="font-body" style={{ color: "#6b6560" }}>Chargement...</p>
            )}

            <div
              style={{
                borderLeft: "3px solid #b8922a",
                padding: "1rem 1.5rem",
                marginTop: "2rem",
                background: "white",
              }}
            >
              <p
                className="font-heading"
                style={{ fontSize: "1.15rem", fontStyle: "italic", color: "#1a1710", lineHeight: 1.6 }}
              >
                « Penser le monde, mais aussi le transformer. »
              </p>
            </div>
          </motion.div>

          {/* Right: competences grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
          >
            {highlights.map((h, i) => {
              const Icon = iconMap[h.icon] || BookOpen;
              const emoji = iconEmoji[h.icon];
              return (
                <motion.div
                  key={h.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  style={{
                    background: "white",
                    border: "0.5px solid #ede7d9",
                    borderRadius: "8px",
                    padding: "1.2rem",
                  }}
                >
                  <span style={{ fontSize: "1.3rem", display: "block", marginBottom: "0.5rem" }}>
                    {emoji || <Icon size={22} color="#b8922a" />}
                  </span>
                  <h5
                    className="font-body"
                    style={{ fontSize: "0.83rem", fontWeight: 600, color: "#1a1710", marginBottom: "0.3rem", lineHeight: 1.3 }}
                  >
                    {t(h.label_fr, h.label_en)}
                  </h5>
                  <p className="font-body" style={{ fontSize: "0.77rem", color: "#6b6560", lineHeight: 1.5 }}>
                    {t(h.detail_fr, h.detail_en)}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
