import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getArticleBySlug, getCategoryLabel, type Article } from "@/lib/articles";

const ArticlePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) { navigate("/blog"); return; }
    getArticleBySlug(slug).then((data) => {
      if (!data) navigate("/blog");
      else setArticle(data);
    }).finally(() => setLoading(false));
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    );
  }

  if (!article) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-28 pb-16 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary text-sm mb-8 transition-colors">
              <ArrowLeft size={16} /> Retour aux articles
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-body uppercase tracking-widest text-primary">
                {getCategoryLabel(article.category)}
              </span>
              <span className="text-border">·</span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar size={12} />
                {new Date(article.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
              </span>
            </div>

            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              {article.title}
            </h1>
            <div className="h-[2px] w-16 bg-gold-gradient mb-8" />

            <div className="prose-custom">
              {article.content.split("\n").map((paragraph, i) =>
                paragraph.trim() ? (
                  <p key={i} className="text-muted-foreground leading-relaxed mb-4 text-[15px]">
                    {paragraph}
                  </p>
                ) : null
              )}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ArticlePage;
