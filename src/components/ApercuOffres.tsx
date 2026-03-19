import { Link } from "react-router-dom";

const offres = [
  {
    num: "01",
    title: "Expertise juridique & philosophique",
    desc: "Analyses, notes de position, interventions et conseils sur les enjeux africains contemporains.",
  },
  {
    num: "02",
    title: "Transition numérique & IA",
    desc: "Création de sites web, automatisation, intégration d'outils IA pour individus et structures.",
  },
  {
    num: "03",
    title: "Création de contenu",
    desc: "Écriture, narration vidéo, articles de fond et contenus éditoriaux à haute valeur intellectuelle.",
  },
];

const ApercuOffres = () => {
  return (
    <section style={{ background: "#1a1710", padding: "4rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <h2
          className="font-heading"
          style={{
            fontSize: "2rem",
            color: "white",
            fontWeight: 700,
            marginBottom: "2.5rem",
            lineHeight: 1.2,
          }}
        >
          Ce que je peux faire{" "}
          <em style={{ color: "#b8922a", fontStyle: "italic" }}>pour vous</em>
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
            marginBottom: "2.5rem",
          }}
        >
          {offres.map((o) => (
            <Link
              to="/services"
              key={o.num}
              style={{
                border: "0.5px solid rgba(255,255,255,0.1)",
                padding: "1.8rem",
                display: "block",
                textDecoration: "none",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "#b8922a")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")
              }
            >
              <div
                className="font-heading"
                style={{
                  fontSize: "2.5rem",
                  color: "rgba(184,146,42,0.3)",
                  fontWeight: 700,
                  marginBottom: "0.8rem",
                }}
              >
                {o.num}
              </div>
              <h4
                className="font-heading"
                style={{
                  fontSize: "1.2rem",
                  color: "white",
                  fontWeight: 600,
                  marginBottom: "0.6rem",
                }}
              >
                {o.title}
              </h4>
              <p
                className="font-body"
                style={{
                  fontSize: "0.83rem",
                  color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.7,
                }}
              >
                {o.desc}
              </p>
            </Link>
          ))}
        </div>

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
            display: "inline-block",
            textDecoration: "none",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "#8a6a1a")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "#b8922a")
          }
        >
          Voir tous les services
        </Link>
      </div>
    </section>
  );
};

export default ApercuOffres;
