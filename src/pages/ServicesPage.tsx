import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const offres = [
  {
    num: "01",
    tag: "Recherche & Conseil",
    title: "Expertise juridique\n& en sciences humaines",
    desc: "J'apporte une lecture éthique et juridique des enjeux liés à l'identité africaine, à la démocratie, à la justice et aux transformations socio-culturelles à l'ère numérique. Idéal pour les institutions, ONG, think tanks et milieux académiques.",
    details: [
      "Rédaction d'analyses, notes de position et rapports thématiques",
      "Participation à des colloques, panels et conférences",
      "Contributions académiques et co-publications",
      "Conseil sur les enjeux IA & droits humains en Afrique",
      "Formations et ateliers sur mesure",
    ],
  },
  {
    num: "02",
    tag: "Numérique & IA",
    title: "Transition numérique\n& intelligence artificielle",
    desc: "Je conçois et déploie des solutions numériques adaptées aux besoins des individus et des structures : sites web professionnels, automatisations intelligentes et intégration d'outils IA pour gagner en efficacité et en visibilité.",
    details: [
      "Création de sites web (portfolio, vitrine, blog)",
      "Automatisation de tâches répétitives (emails, reporting, flux)",
      "Intégration d'outils IA dans les processus existants",
      "Formation des équipes aux usages de l'IA",
      "Audit et recommandations de transformation numérique",
    ],
  },
  {
    num: "03",
    tag: "Création de contenu",
    title: "Écriture, vidéo\n& storytelling",
    desc: "J'explore et transmets les grandes questions qui traversent nos sociétés — par l'écrit et par l'image. Articles de fond, scripts, contenus vidéo : je mets la narration au service d'idées qui méritent d'être entendues.",
    details: [
      "Rédaction d'articles, essais et tribunes",
      "Création et gestion de contenus éditoriaux",
      "Scripts et narration pour contenus vidéo",
      "Conception et animation de blogs thématiques",
      "Ghost-writing sur des sujets philosophiques & sociaux",
    ],
  },
];

const profils = [
  {
    icon: "🏛️",
    title: "Institutions & ONG",
    desc: "Vous travaillez sur des questions de droits humains, de gouvernance ou de développement en Afrique. J'apporte une expertise juridique et en sciences humaines pour nourrir vos travaux et publications.",
  },
  {
    icon: "🔬",
    title: "Chercheurs & Académiques",
    desc: "Vous menez des recherches sur les mutations africaines contemporaines. Je peux contribuer comme co-auteur, intervenant ou expert sur les croisements entre éthique, IA et identité.",
  },
  {
    icon: "🚀",
    title: "Porteurs de projets",
    desc: "Vous souhaitez construire votre présence numérique, automatiser vos processus ou intégrer l'IA dans votre activité. Je vous accompagne de la stratégie à l'exécution, depuis Cotonou.",
  },
];

const etapes = [
  { num: "01", title: "Prise de contact", desc: "Vous m'écrivez en décrivant votre besoin. Je réponds sous 48h." },
  { num: "02", title: "Échange exploratoire", desc: "Un appel ou échange écrit pour cerner vos attentes et valider l'adéquation." },
  { num: "03", title: "Proposition", desc: "Je vous soumets une proposition détaillée : périmètre, modalités, délais." },
  { num: "04", title: "Collaboration", desc: "Nous travaillons ensemble avec des points réguliers et une communication fluide." },
];

const ServicesPage = () => {
  return (
    <div style={{ background: "#f4efe4", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "8rem 4rem 4rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "end",
        }}
        className="srv-hero-grid"
      >
        <div>
          <span
            className="font-body"
            style={{ fontSize: "0.68rem", letterSpacing: "3px", color: "#b8922a", textTransform: "uppercase", fontWeight: 600, display: "block", marginBottom: "0.8rem" }}
          >
            Services
          </span>
          <h1 className="font-heading" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 700, color: "#1a1710", lineHeight: 1.05 }}>
            Pensée rigoureuse.<br />
            <em style={{ color: "#b8922a", fontStyle: "italic" }}>Impact concret.</em>
          </h1>
          <div style={{ width: "40px", height: "2px", background: "#b8922a", margin: "2rem 0" }} />
        </div>
        <div>
          <p className="font-body" style={{ fontSize: "0.95rem", color: "#444", lineHeight: 1.9, marginBottom: "1rem" }}>
            <strong style={{ color: "#1a1710" }}>Ce que je propose n'est pas un simple service.</strong> C'est une collaboration ancrée dans la rigueur académique, la connaissance du terrain africain et une maîtrise des outils numériques contemporains.
          </p>
          <p className="font-body" style={{ fontSize: "0.92rem", color: "#555", lineHeight: 1.85, marginBottom: "2rem" }}>
            Que vous soyez une institution en quête d'expertise, un chercheur en besoin d'accompagnement, ou un porteur de projet cherchant à intégrer l'IA dans ses processus — je peux vous aider à franchir ce cap.
          </p>
          <Link
            to="/contact"
            className="font-body"
            style={{ background: "#b8922a", color: "white", padding: "0.85rem 2rem", fontSize: "0.72rem", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 600, textDecoration: "none", display: "inline-block", transition: "background 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#8a6a1a")}
            onMouseLeave={e => (e.currentTarget.style.background = "#b8922a")}
          >
            Ecrire à Chams Modeste HEDJI
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", borderTop: "0.5px solid #ede7d9" }} />

      {/* Offres */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "4rem" }} className="srv-offres-pad">
        {offres.map((o) => (
          <div
            key={o.num}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2.5rem",
              alignItems: "start",
              padding: "2.5rem 0",
              borderTop: "0.5px solid #ede7d9",
            }}
            className="offre-card-grid"
          >

            <div>
              <span
                className="font-body"
                style={{ display: "inline-block", fontSize: "0.62rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "#b8922a", border: "0.5px solid #b8922a", padding: "0.2rem 0.6rem", marginBottom: "0.8rem", fontWeight: 600 }}
              >
                {o.tag}
              </span>
              <h3 className="font-heading" style={{ fontSize: "1.6rem", fontWeight: 700, color: "#1a1710", marginBottom: "0.5rem", lineHeight: 1.2 }}>
                {o.title.split("\n").map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}
              </h3>
              <p className="font-body" style={{ fontSize: "0.9rem", color: "#555", lineHeight: 1.85 }}>{o.desc}</p>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {o.details.map((d, i) => (
                <li
                  key={i}
                  className="font-body"
                  style={{
                    fontSize: "0.85rem",
                    color: "#6b6560",
                    padding: "0.45rem 0",
                    borderBottom: "0.5px solid #ede7d9",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.7rem",
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#b8922a", marginTop: "0.5rem", flexShrink: 0, display: "inline-block" }} />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div style={{ borderBottom: "0.5px solid #ede7d9" }} />
      </div>

      {/* Pour qui */}
      <section style={{ background: "#1a1710", padding: "5rem 4rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <span className="font-body" style={{ fontSize: "0.68rem", letterSpacing: "3px", color: "#b8922a", textTransform: "uppercase", fontWeight: 600, display: "block", marginBottom: "0.8rem" }}>
            Pour qui ?
          </span>
          <h2 className="font-heading" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "white", fontWeight: 700, marginBottom: "2.5rem", lineHeight: 1.2 }}>
            Des collaborations<br />à <em style={{ color: "#b8922a", fontStyle: "italic" }}>haute valeur ajoutée</em>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {profils.map((p) => (
              <div
                key={p.title}
                style={{ border: "0.5px solid rgba(255,255,255,0.1)", padding: "2rem", transition: "border-color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#b8922a")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
              >
                <span style={{ fontSize: "1.4rem", display: "block", marginBottom: "1rem" }}>{p.icon}</span>
                <h4 className="font-heading" style={{ fontSize: "1.15rem", color: "white", fontWeight: 600, marginBottom: "0.7rem" }}>{p.title}</h4>
                <p className="font-body" style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.75 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Processus */}
      <section style={{ padding: "5rem 4rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <span className="font-body" style={{ fontSize: "0.68rem", letterSpacing: "3px", color: "#b8922a", textTransform: "uppercase", fontWeight: 600, display: "block", marginBottom: "0.8rem" }}>
            Comment ça se passe
          </span>
          <h2 className="font-heading" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, marginBottom: "3rem", color: "#1a1710" }}>
            Un processus simple,<br />
            <em style={{ color: "#b8922a", fontStyle: "italic" }}>une collaboration claire</em>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "2rem" }} className="etapes-grid">
            {etapes.map((e) => (
              <div key={e.num} style={{ textAlign: "center", padding: "0 1rem" }}>

                <h5 className="font-heading" style={{ fontSize: "1.05rem", fontWeight: 600, color: "#1a1710", marginBottom: "0.5rem" }}>{e.title}</h5>
                <p className="font-body" style={{ fontSize: "0.82rem", color: "#6b6560", lineHeight: 1.6 }}>{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section style={{ background: "#f5edd8", padding: "5rem 4rem", textAlign: "center" }}>
        <div style={{ maxWidth: "620px", margin: "0 auto" }}>
          <h2 className="font-heading" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 700, color: "#1a1710", marginBottom: "1rem", lineHeight: 1.2 }}>
            Prêt à<br /><em style={{ color: "#8a6a1a", fontStyle: "italic" }}>travailler ensemble ?</em>
          </h2>
          <p className="font-body" style={{ fontSize: "0.95rem", color: "#6b6560", lineHeight: 1.8, marginBottom: "2.5rem" }}>
            Chaque projet est unique. Décrivez-moi votre besoin — même de manière vague — et nous trouverons ensemble la meilleure façon de collaborer.
          </p>
          <a
            href="mailto:modestehedji@gmail.com"
            className="font-body"
            style={{ background: "#b8922a", color: "white", padding: "0.85rem 2rem", fontSize: "0.72rem", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 600, textDecoration: "none", display: "inline-block", transition: "background 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#8a6a1a")}
            onMouseLeave={e => (e.currentTarget.style.background = "#b8922a")}
          >
            Écrire à Chams Modeste HEDJI
          </a>
          <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
            {["modestehedji@gmail.com", "Cotonou, Bénin", "Réponse sous 48h"].map((item) => (
              <div key={item} className="font-body" style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.83rem", color: "#6b6560" }}>
                <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#b8922a", display: "inline-block" }} />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .srv-hero-grid { grid-template-columns: 1fr !important; padding: 5rem 1.5rem 2rem !important; gap: 2rem !important; }
          .srv-offres-pad { padding: 3rem 1.5rem !important; }
          .offre-card-grid { grid-template-columns: 1fr !important; gap: 1rem !important; }
        }
      `}</style>
    </div>
  );
};

export default ServicesPage;
