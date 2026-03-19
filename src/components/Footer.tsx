import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { useI18n, uiStrings } from "@/hooks/use-i18n";

const Footer = () => {
  const { lang } = useI18n();

  const quickLinks = [
    { label: "Accueil", href: "/" },
    { label: "À propos", href: "/#apropos" },
    { label: "Parcours", href: "/#parcours" },
    { label: "Publications", href: "/#publications" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer style={{ background: "#1a1710", padding: "3rem 4rem" }}>
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr 1fr",
          gap: "3rem",
          marginBottom: "2.5rem",
        }}
        className="footer-grid"
      >
        {/* Brand */}
        <div>
          <p className="font-heading" style={{ fontSize: "1.3rem", color: "white", fontWeight: 600, marginBottom: "0.8rem" }}>
            Chams M. <span style={{ color: "#b8922a" }}>HEDJI</span>
          </p>
          <p className="font-body" style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: "1rem" }}>
            Diplômé en Philosophie · Auteur · Juriste des droits humains (en formation)
          </p>
          <div className="font-body" style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.35)", lineHeight: 2 }}>
            <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#b8922a", display: "inline-block" }} />
              Cotonou, Bénin
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#b8922a", display: "inline-block" }} />
              modestehedji@gmail.com
            </span>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h5
            className="font-body"
            style={{ fontSize: "0.65rem", letterSpacing: "2px", textTransform: "uppercase", color: "#b8922a", marginBottom: "1.2rem", fontWeight: 600 }}
          >
            {uiStrings["footer.links"][lang]}
          </h5>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {quickLinks.map((link) => (
              <li key={link.href} style={{ marginBottom: "0.7rem" }}>
                {link.href.startsWith("/#") ? (
                  <a
                    href={link.href}
                    className="font-body"
                    style={{ fontSize: "0.84rem", color: "rgba(255,255,255,0.45)", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#b8922a")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    to={link.href}
                    className="font-body"
                    style={{ fontSize: "0.84rem", color: "rgba(255,255,255,0.45)", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#b8922a")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h5
            className="font-body"
            style={{ fontSize: "0.65rem", letterSpacing: "2px", textTransform: "uppercase", color: "#b8922a", marginBottom: "1.2rem", fontWeight: 600 }}
          >
            {uiStrings["footer.social"][lang]}
          </h5>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
            <a
              href="https://www.linkedin.com/in/chams-modeste-hedji-49469426b/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body"
              style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.84rem", color: "rgba(255,255,255,0.45)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#b8922a")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              LinkedIn
            </a>
            <a
              href="mailto:modestehedji@gmail.com"
              className="font-body"
              style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.84rem", color: "rgba(255,255,255,0.45)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#b8922a")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
            >
              <Mail size={16} />
              Email
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          borderTop: "0.5px solid rgba(255,255,255,0.08)",
          paddingTop: "1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
        className="footer-bottom"
      >
        <p className="font-body" style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.25)" }}>
          © {new Date().getFullYear()} Chams Modeste{" "}
          <Link to="/" style={{ color: "#b8922a", textDecoration: "none" }}>HEDJI</Link>. {uiStrings["footer.rights"][lang]}
        </p>
        <p className="font-body" style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.25)" }}>
          Conçu par Chams Modeste HEDJI
        </p>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; padding: 0; }
          footer { padding: 2rem 1.5rem !important; }
          .footer-bottom { flex-direction: column; text-align: center; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
