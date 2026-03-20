import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { getParcours, type ParcoursItem } from "@/lib/content";
import { useI18n, uiStrings } from "@/hooks/use-i18n";

const ParcoursSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { lang, t } = useI18n();
  const [items, setItems] = useState<ParcoursItem[]>([]);

  useEffect(() => {
    getParcours()
      .then((data) => {
        setItems(data.sort((a, b) => a.sort_order - b.sort_order));
      })
      .catch(() => {});
  }, []);

  return (
    <section id="parcours" style={{ background: "#f4efe4", padding: "5rem 4rem 4rem" }} ref={ref}>
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
            {uiStrings["parcours.label"][lang]}
          </span>
          <h1
            className="font-heading"
            style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 700, color: "#1a1710", lineHeight: 1.1 }}
          >
            {uiStrings["parcours.heading.1"][lang]}{" "}
            <em style={{ color: "#b8922a", fontStyle: "italic" }}>
              {uiStrings["parcours.heading.2"][lang]}
            </em>
          </h1>
          <div style={{ width: "40px", height: "2px", background: "#b8922a", margin: "1.5rem 0 3.5rem" }} />
        </motion.div>

        {/* Timeline */}
        <div style={{ position: "relative" }}>
          {/* Vertical center line */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-0.5px)",
              top: 0,
              bottom: 0,
              width: "0.5px",
              background: "#b8922a",
              opacity: 0.4,
            }}
            className="tl-center-line"
          />

          {items.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 40px 1fr",
                  gap: "1.5rem",
                  marginBottom: "2.5rem",
                  alignItems: "start",
                }}
                className="tl-item-row"
              >
                {/* Left slot */}
                <div style={{ textAlign: "right", paddingTop: "0.2rem" }}>
                  {isLeft && (
                    <>
                      <div
                        className="font-heading"
                        style={{ fontSize: "1.1rem", fontWeight: 700, color: "#b8922a", marginBottom: "0.2rem" }}
                      >
                        {item.year}
                      </div>
                      <div
                        className="font-body"
                        style={{ fontSize: "0.9rem", fontWeight: 600, color: "#1a1710", marginBottom: "0.2rem", lineHeight: 1.4 }}
                        dangerouslySetInnerHTML={{ __html: t(item.title_fr, item.title_en) }}
                      />
                    </>
                  )}
                </div>

                {/* Dot */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      background: "#b8922a",
                      border: "3px solid #f4efe4",
                      marginTop: "0.3rem",
                      position: "relative",
                      zIndex: 1,
                      boxShadow: "0 0 0 2px #b8922a",
                    }}
                  />
                </div>

                {/* Right slot */}
                <div style={{ paddingTop: "0.2rem" }}>
                  {!isLeft && (
                    <>
                      <div
                        className="font-heading"
                        style={{ fontSize: "1.1rem", fontWeight: 700, color: "#b8922a", marginBottom: "0.2rem" }}
                      >
                        {item.year}
                      </div>
                      <div
                        className="font-body"
                        style={{ fontSize: "0.9rem", fontWeight: 600, color: "#1a1710", marginBottom: "0.2rem", lineHeight: 1.4 }}
                        dangerouslySetInnerHTML={{ __html: t(item.title_fr, item.title_en) }}
                      />
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .tl-center-line { left: 20px !important; transform: none !important; }
          .tl-item-row { grid-template-columns: 30px 1fr !important; gap: 1rem !important; }
          .tl-item-row > *:first-child { display: none !important; }
        }
      `}</style>
    </section>
  );
};

export default ParcoursSection;
