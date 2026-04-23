import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getContactInfo, type ContactInfo } from "@/lib/content";
import { useI18n } from "@/hooks/use-i18n";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useI18n();
  const [info, setInfo] = useState<ContactInfo | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getContactInfo().then(setInfo).catch(() => {});
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSent(true);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const infoItems = [
    { label: "Email", value: info?.email || "modestehedji@gmail.com" },
    { label: "Localisation", value: info ? t(info.location_fr, info.location_en) : "Cotonou, Bénin" },
    { label: "LinkedIn", value: info?.linkedin_url || "Chams Modeste HEDJI" },
    { label: "Réponse", value: "Sous 48 heures" },
  ];

  return (
    <section
      id="contact"
      style={{ background: "#f4efe4", padding: "5rem 4rem 4rem" }}
      ref={ref}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "start",
        }}
        className="cnt-grid"
      >
        {/* Left: info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span
            className="font-body"
            style={{ fontSize: "0.68rem", letterSpacing: "3px", color: "#b8922a", textTransform: "uppercase", fontWeight: 600, display: "block", marginBottom: "0.8rem" }}
          >
            Contact
          </span>
          <h1
            className="font-heading"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, color: "#1a1710", lineHeight: 1.1 }}
          >
            Démarrons<br />
            <em style={{ color: "#b8922a", fontStyle: "italic" }}>la conversation</em>
          </h1>
          <div style={{ width: "40px", height: "2px", background: "#b8922a", margin: "1.5rem 0 2rem" }} />
          <div 
            className="font-body [&_*]:!text-foreground/80 [&_strong]:!text-foreground [&_strong]:!font-semibold" 
            style={{ fontSize: "0.93rem", lineHeight: 1.85, marginBottom: "1rem" }}
            dangerouslySetInnerHTML={{ __html: info ? t(info.description_fr, info.description_en) : "" }}
          />

          <div style={{ marginTop: "2rem" }}>
            {infoItems.map((item, i) => (
              <div
                key={item.label}
                className="font-body"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1rem",
                  padding: "1rem 0",
                  borderBottom: "0.5px solid #ede7d9",
                  borderTop: i === 0 ? "0.5px solid #ede7d9" : "none",
                }}
              >
                <span style={{ fontSize: "0.68rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "#b8922a", fontWeight: 600, minWidth: "80px", paddingTop: "0.1rem" }}>
                  {item.label}
                </span>
                <span style={{ fontSize: "0.88rem", color: "#1a1710", lineHeight: 1.5 }}>
                  {item.label === "Email" ? (
                    <a href={`mailto:${item.value}`} style={{ color: "#1a1710", textDecoration: "none" }}>{item.value}</a>
                  ) : item.label === "LinkedIn" ? (
                    <a href="https://www.linkedin.com/in/chams-modeste-hedji-49469426b/" target="_blank" rel="noopener noreferrer" style={{ color: "#1a1710", textDecoration: "none" }}>{item.value}</a>
                  ) : item.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
          >
          {[
            { label: "Votre nom", type: "text", placeholder: "Prénom et nom" },
            { label: "Votre email", type: "email", placeholder: "votre@email.com" },
          ].map(({ label, type, placeholder }) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <label
                className="font-body"
                style={{ fontSize: "0.68rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "#6b6560", fontWeight: 600 }}
              >
                {label}
              </label>
              <input
                type={type}
                placeholder={placeholder}
                required
                className="font-body"
                style={{ background: "white", border: "0.5px solid #ede7d9", padding: "0.8rem 1rem", fontSize: "0.9rem", color: "#1a1710", outline: "none", width: "100%", transition: "border-color 0.2s" }}
                onFocus={e => (e.currentTarget.style.borderColor = "#b8922a")}
                onBlur={e => (e.currentTarget.style.borderColor = "#ede7d9")}
              />
            </div>
          ))}

          {/* Select */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label className="font-body" style={{ fontSize: "0.68rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "#6b6560", fontWeight: 600 }}>
              Type de demande
            </label>
            <select
              className="font-body"
              style={{ background: "white", border: "0.5px solid #ede7d9", padding: "0.8rem 1rem", fontSize: "0.9rem", color: "#1a1710", outline: "none", width: "100%", transition: "border-color 0.2s" }}
              onFocus={e => (e.currentTarget.style.borderColor = "#b8922a")}
              onBlur={e => (e.currentTarget.style.borderColor = "#ede7d9")}
            >
              <option value="">Sélectionnez...</option>
              <option>Collaboration académique / recherche</option>
              <option>Services numériques (site, IA, automatisation)</option>
              <option>Intervention / conférence</option>
              <option>Création de contenu</option>
              <option>Autre</option>
            </select>
          </div>

          {/* Textarea */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label className="font-body" style={{ fontSize: "0.68rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "#6b6560", fontWeight: 600 }}>
              Votre message
            </label>
            <textarea
              rows={5}
              placeholder="Décrivez votre projet ou votre besoin, même brièvement..."
              required
              className="font-body"
              style={{ background: "white", border: "0.5px solid #ede7d9", padding: "0.8rem 1rem", fontSize: "0.9rem", color: "#1a1710", outline: "none", width: "100%", resize: "vertical", transition: "border-color 0.2s", minHeight: "130px" }}
              onFocus={e => (e.currentTarget.style.borderColor = "#b8922a")}
              onBlur={e => (e.currentTarget.style.borderColor = "#ede7d9")}
            />
          </div>

          <p className="font-body" style={{ fontSize: "0.78rem", color: "#6b6560" }}>
            Je lis chaque message personnellement et réponds sous 48 heures.
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="font-body"
            style={{ background: isSubmitting ? "#8a6a1a" : "#b8922a", color: "white", padding: "0.85rem 2rem", fontSize: "0.72rem", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 600, border: "none", cursor: isSubmitting ? "not-allowed" : "pointer", display: "block", width: "100%", textAlign: "center", transition: "background 0.2s", opacity: isSubmitting ? 0.8 : 1 }}
          >
            {sent ? "Message reçu ! ✓ Redirection..." : "Envoyer le message"}
          </button>
          </form>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .cnt-grid { grid-template-columns: 1fr !important; gap: 2rem !important; padding: 3rem 1.5rem !important; }
        }
      `}</style>
    </section>
  );
};

export default ContactSection;
