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
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-28 pb-16 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-3">Blog</p>
            <h1 className="heading-lg mb-4">
              Écrits & <span className="text-gradient-gold">réflexions</span>
            </h1>
            <div className="h-[2px] w-16 bg-gold-gradient mb-8" />
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            {filterTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value)}
                className={`font-body text-xs uppercase tracking-widest px-4 py-2 rounded-sm border transition-colors ${filter === tab.value
                    ? "border-primary text-primary bg-primary/10"
                    : "border-border text-muted-foreground hover:text-primary hover:border-primary/40"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Articles */}
          <div className="grid gap-6">
            {loading && (
              <p className="text-muted-foreground text-center py-12">Chargement des articles...</p>
            )}
            {!loading && articles.length === 0 && (
              <p className="text-muted-foreground text-center py-12">Aucun article dans cette catégorie.</p>
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
                  className="group block p-6 md:p-8 bg-card border border-border rounded-sm hover:border-primary/40 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-body uppercase tracking-widest text-primary">
                      {getCategoryLabel(article.category)}
                    </span>
                    <span className="text-border">·</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar size={12} />
                      {new Date(article.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                    </span>
                  </div>
                  <h2 className="font-heading text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                    {article.title}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{article.excerpt}</p>
                  <span className="inline-flex items-center gap-1 text-primary text-xs font-body uppercase tracking-widest group-hover:gap-2 transition-all">
                    Lire la suite <ArrowRight size={14} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
