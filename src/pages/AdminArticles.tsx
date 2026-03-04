import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Eye, EyeOff } from "lucide-react";
import { getArticles, deleteArticle, updateArticle, getCategoryLabel, type Article } from "@/lib/articles";
import { useToast } from "@/hooks/use-toast";

const AdminArticles = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => getArticles().then(setArticles).catch(() => {});

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cet article ?")) return;
    await deleteArticle(id);
    refresh();
    toast({ title: "Article supprimé" });
  };

  const togglePublish = async (id: string, published: boolean) => {
    await updateArticle(id, { published: !published });
    refresh();
    toast({ title: published ? "Article dépublié" : "Article publié" });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
      <div className="bg-card border border-border rounded-sm shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-muted/30 flex items-center justify-between">
          <h2 className="font-heading font-semibold text-lg text-foreground">Articles du blog</h2>
          <button
            onClick={() => navigate("/admin/editor")}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground py-2 px-4 text-sm font-medium hover:bg-primary/90 transition-colors rounded-sm"
          >
            <Plus size={16} /> Nouvel article
          </button>
        </div>

        <div className="divide-y divide-border">
          {articles.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 hover:bg-muted/20 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1.5">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider ${
                    article.published
                      ? "bg-green-500/10 text-green-500 border border-green-500/20"
                      : "bg-secondary text-muted-foreground border border-border"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${article.published ? "bg-green-500" : "bg-muted-foreground"}`} />
                    {article.published ? "Publié" : "Brouillon"}
                  </span>
                  <span className="text-xs text-primary font-body uppercase tracking-widest font-semibold">
                    {getCategoryLabel(article.category)}
                  </span>
                </div>
                <h3 className="text-lg font-heading font-semibold text-foreground truncate">{article.title}</h3>
                <p className="text-sm text-muted-foreground truncate mt-1">
                  {new Date(article.created_at).toLocaleDateString("fr-FR", {
                    day: "numeric", month: "long", year: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center gap-2 sm:self-center">
                <button onClick={() => togglePublish(article.id, article.published)} className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-sm transition-colors" title={article.published ? "Dépublier" : "Publier"}>
                  {article.published ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                <button onClick={() => navigate(`/admin/editor/${article.id}`)} className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-sm transition-colors" title="Modifier">
                  <Edit2 size={18} />
                </button>
                <button onClick={() => handleDelete(article.id)} className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-sm transition-colors" title="Supprimer">
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
          {articles.length === 0 && <p className="text-muted-foreground text-center py-12">Aucun article pour le moment.</p>}
        </div>
      </div>
    </motion.div>
  );
};

export default AdminArticles;
