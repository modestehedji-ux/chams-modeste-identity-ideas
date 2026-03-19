import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPublishedArticles, getCategoryLabel, type Article, type ArticleCategory } from "@/lib/articles";

const filterTabs: { value: ArticleCategory | "all"; label: string }[] = [
  { value: "all", label: "Tous" },
  { value: "reflexion", label: "Réflexions" },
  { value: "actualite", label: "Actualités" },
  { value: "academique", label: "Académique" },
];

const Blog = () => {
  const [filter, setFilter] = useState<ArticleCategory | "all">("all");
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublishedArticles()
      .then(setAllArticles)
      .finally(() => setLoading(false));
  }, []);

  const articles = allArticles.filter((a) => filter === "all" || a.category === filter);

  return (
    <div style={{ background: "#f4efe4", minHeight: "100vh" }}>
      <Navbar />

      <main style={{ paddingTop: "7rem" }}>
        {/* Header */}
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem 4rem 3rem" }} className="blog-header-pad">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span
              className="font-body"
              style={{ fontSize: "0.68rem", letterSpacing: "3px", color: "#b8922a", textTransform: "uppercase", fontWeight: 600, display: "block", marginBottom: "0.8rem" }}
            >
              Blog
            </span>
            <h1 className="font-heading" style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 700, color: "#1a1710", lineHeight: 1.1 }}>
              Écrits &amp; <em style={{ color: "#b8922a", fontStyle: "italic" }}>réflexions</em>
            </h1>
            <div style={{ width: "40px", height: "2px", background: "#b8922a", margin: "1.5rem 0 2rem" }} />

            {/* Filters */}
            <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap", marginBottom: "3rem" }}>
              {filterTabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setFilter(tab.value)}
                  className="font-body"
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    padding: "0.45rem 1rem",
                    border: filter === tab.value ? "0.5px solid #b8922a" : "0.5px solid #ede7d9",
                    background: "white",
                    color: filter === tab.value ? "#b8922a" : "#6b6560",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => {
                    if (filter !== tab.value) {
                      e.currentTarget.style.borderColor = "#b8922a";
                      e.currentTarget.style.color = "#b8922a";
                    }
                  }}
                  onMouseLeave={e => {
                    if (filter !== tab.value) {
                      e.currentTarget.style.borderColor = "#ede7d9";
                      e.currentTarget.style.color = "#6b6560";
                    }
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Articles list */}
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 4rem 4rem" }} className="blog-list-pad">
          {loading && (
            <p className="font-body" style={{ color: "#6b6560", textAlign: "center", padding: "3rem 0" }}>Chargement des articles...</p>
          )}
          {!loading && articles.length === 0 && (
            <p className="font-body" style={{ color: "#6b6560", textAlign: "center", padding: "3rem 0" }}>Aucun article dans cette catégorie.</p>
          )}

          {articles.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={`/blog/${article.slug}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "160px 1fr",
                  gap: "2.5rem",
                  padding: "2.5rem 0",
                  borderTop: "0.5px solid #ede7d9",
                  textDecoration: "none",
                  alignItems: "start",
                }}
                className="blog-article-row"
              >
                {/* Date + cat */}
                <div>
                  <div className="font-heading" style={{ fontSize: "0.95rem", color: "#6b6560", lineHeight: 1.5 }}>
                    {new Date(article.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                  </div>
                  <span className="font-body" style={{ fontSize: "0.62rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "#b8922a", fontWeight: 600, display: "block", marginTop: "0.3rem" }}>
                    {getCategoryLabel(article.category)}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h2 className="font-heading" style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1a1710", marginBottom: "0.5rem", lineHeight: 1.25 }}>
                    {article.title}
                  </h2>
                  <p className="font-body" style={{ fontSize: "0.88rem", color: "#6b6560", lineHeight: 1.75, marginBottom: "1rem" }}>
                    {article.excerpt}
                  </p>
                  <span
                    className="font-body"
                    style={{ fontSize: "0.72rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "#b8922a", textDecoration: "none", fontWeight: 600, borderBottom: "0.5px solid #b8922a", paddingBottom: "1px", display: "inline-flex", alignItems: "center", gap: "4px" }}
                  >
                    Lire la suite <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
          {articles.length > 0 && <div style={{ borderBottom: "0.5px solid #ede7d9" }} />}
        </div>
      </main>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .blog-header-pad, .blog-list-pad { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
          .blog-article-row { grid-template-columns: 1fr !important; gap: 0.8rem !important; }
        }
      `}</style>
    </div>
  );
};

export default Blog;
