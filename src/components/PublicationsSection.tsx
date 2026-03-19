import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { getPublications, type Publication } from "@/lib/content";
import { useI18n, uiStrings } from "@/hooks/use-i18n";

const PublicationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { lang, t } = useI18n();
  const [pubs, setPubs] = useState<Publication[]>([]);

  useEffect(() => {
    getPublications().then(setPubs).catch(() => {});
  }, []);

  return (
    <section id="publications" style={{ background: "#f4efe4", padding: "5rem 4rem 4rem" }} ref={ref}>
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
            {uiStrings["pub.label"][lang]}
          </span>
          <h1
            className="font-heading"
            style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 700, color: "#1a1710", lineHeight: 1.1 }}
          >
            Écrits &amp;{" "}
            <em style={{ color: "#b8922a", fontStyle: "italic" }}>contributions</em>
          </h1>
          <div style={{ width: "40px", height: "2px", background: "#b8922a", margin: "1.5rem 0 3rem" }} />
        </motion.div>

        <div>
          {pubs.map((pub, i) => (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1 }}
              style={{
                display: "grid",
                gridTemplateColumns: "140px 1fr",
                gap: "2rem",
                padding: "2rem 0",
                borderTop: "0.5px solid #ede7d9",
                alignItems: "start",
              }}
              className="pub-item-row"
            >
              {/* Badge */}
              <div>
                <span
                  className="font-body"
                  style={{
                    display: "inline-block",
                    fontSize: "0.62rem",
                    letterSpacing: "1.2px",
                    textTransform: "uppercase" as const,
                    color: "#b8922a",
                    border: "0.5px solid #b8922a",
                    padding: "0.25rem 0.6rem",
                    fontWeight: 600,
                    whiteSpace: "nowrap" as const,
                  }}
                >
                  {t(pub.type_fr, pub.type_en)}
                </span>
              </div>

              {/* Content */}
              <div>
                <h3
                  className="font-heading"
                  style={{ fontSize: "1.35rem", fontWeight: 700, color: "#1a1710", marginBottom: "0.3rem", lineHeight: 1.3 }}
                >
                  {t(pub.title_fr, pub.title_en)}
                </h3>
                <div
                  className="font-body"
                  style={{ fontSize: "0.78rem", color: "#8a6a1a", marginBottom: "0.6rem", fontWeight: 500 }}
                  dangerouslySetInnerHTML={{ __html: t(pub.detail_fr, pub.detail_en) }}
                />
              </div>
            </motion.div>
          ))}
          {/* Bottom border on last item */}
          {pubs.length > 0 && (
            <div style={{ borderBottom: "0.5px solid #ede7d9" }} />
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .pub-item-row {
            grid-template-columns: 1fr !important;
            gap: 0.5rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default PublicationsSection;
