import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Eye, EyeOff, LogOut, ArrowLeft } from "lucide-react";
import { getArticles, deleteArticle, updateArticle, logout, getSession, getCategoryLabel, type Article } from "@/lib/articles";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    getSession().then((session) => {
      if (!session) {
        navigate("/admin/login");
        return;
      }
      // Load articles
      getArticles()
        .then(setArticles)
        .finally(() => setLoading(false));
    });
  }, [navigate]);

  const refresh = () => getArticles().then(setArticles);

  const handleDelete = async (id: string) => {
    await deleteArticle(id);
    refresh();
    toast({ title: "Article supprimé" });
  };

  const togglePublish = async (id: string, published: boolean) => {
    await updateArticle(id, { published: !published });
    refresh();
    toast({ title: published ? "Article dépublié" : "Article publié" });
  };

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft size={20} />
            </button>
            <h1 className="font-heading text-xl font-bold text-foreground">
              Tableau de bord
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/admin/editor")}
              className="inline-flex items-center gap-2 bg-gold-gradient text-primary-foreground font-body font-semibold px-5 py-2 rounded-sm tracking-wide text-xs uppercase hover:opacity-90 transition-opacity"
            >
              <Plus size={14} />
              Nouvel article
            </button>
            <button onClick={handleLogout} className="text-muted-foreground hover:text-destructive transition-colors">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid gap-4">
          {articles.length === 0 && (
            <p className="text-muted-foreground text-center py-12">Aucun article pour le moment.</p>
          )}
          {articles.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 p-5 bg-card border border-border rounded-sm hover:border-primary/30 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`inline-block w-2 h-2 rounded-full ${article.published ? "bg-green-500" : "bg-muted-foreground"}`} />
                  <span className="text-xs text-primary font-body uppercase tracking-widest">
                    {getCategoryLabel(article.category)}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-foreground truncate">{article.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(article.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => togglePublish(article.id, article.published)}
                  className="p-2 text-muted-foreground hover:text-primary transition-colors"
                  title={article.published ? "Dépublier" : "Publier"}
                >
                  {article.published ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <button
                  onClick={() => navigate(`/admin/editor/${article.id}`)}
                  className="p-2 text-muted-foreground hover:text-primary transition-colors"
                  title="Modifier"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(article.id)}
                  className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                  title="Supprimer"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
