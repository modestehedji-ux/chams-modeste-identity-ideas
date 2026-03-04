import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Eye, EyeOff, LogOut, ArrowLeft, LayoutDashboard, Globe, FileText, CheckCircle, FileEdit } from "lucide-react";
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
    <div className="min-h-screen bg-background flex">
      {/* SIDEBAR */}
      <aside className="hidden lg:flex flex-col w-72 bg-card border-r border-border h-screen sticky top-0 shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary flex items-center justify-center text-primary-foreground text-lg rounded-sm">
              <span className="font-bold">A</span>
            </div>
            <span className="text-lg font-bold uppercase tracking-tight text-foreground">
              ADMIN<span className="text-primary">PANEL</span>
            </span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          <div className="border border-border bg-background p-3 rounded-sm">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 border-b border-border pb-1">
              Général
            </p>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium bg-primary text-primary-foreground border-l-4 border-l-primary-foreground transition-colors mb-1 rounded-sm">
              <LayoutDashboard size={18} className="w-5" />
              Dashboard
            </button>
            <button 
              onClick={() => navigate("/")}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-primary transition-colors mb-1 border-l-4 border-l-transparent hover:border-l-primary rounded-sm"
            >
              <Globe size={18} className="w-5" />
              Retour au site
            </button>
          </div>
          
          <div className="border border-border bg-background p-3 rounded-sm">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 border-b border-border pb-1">
              Action
            </p>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors mb-1 border-l-4 border-l-transparent rounded-sm"
            >
              <LogOut size={16} className="w-5" />
              Déconnexion
            </button>
          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4 lg:hidden">
            <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft size={20} />
            </button>
            <h1 className="font-heading text-lg font-bold text-foreground">
              Dashboard
            </h1>
          </div>
          <div className="hidden lg:block">
            <h1 className="font-heading text-xl font-bold text-foreground">
              Gestion des articles
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/admin/editor")}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body py-2 px-4 text-sm font-medium hover:bg-primary/90 transition-colors rounded-sm shadow-sm"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">Nouvel article</span>
            </button>
            <button onClick={handleLogout} className="lg:hidden text-muted-foreground hover:text-destructive transition-colors ml-2">
              <LogOut size={18} />
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8 bg-secondary/20">
          {/* Stats row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-card border border-border p-6 rounded-sm shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Total des articles</p>
                  <h3 className="text-3xl font-bold text-foreground">{articles.length}</h3>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <FileText size={24} />
                </div>
              </div>
            </div>
            <div className="bg-card border border-border p-6 rounded-sm shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Articles publiés</p>
                  <h3 className="text-3xl font-bold text-foreground">{articles.filter(a => a.published).length}</h3>
                </div>
                <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center text-green-500">
                  <CheckCircle size={24} />
                </div>
              </div>
            </div>
            <div className="bg-card border border-border p-6 rounded-sm shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Brouillons</p>
                  <h3 className="text-3xl font-bold text-foreground">{articles.filter(a => !a.published).length}</h3>
                </div>
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-muted-foreground">
                  <FileEdit size={24} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-sm shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-muted/30">
              <h2 className="font-heading font-semibold text-lg text-foreground">Liste des articles</h2>
            </div>
            
            <div className="grid gap-0">
              {articles.length === 0 && (
                <p className="text-muted-foreground text-center py-12">Aucun article pour le moment.</p>
              )}
              {articles.map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 border-b border-border last:border-b-0 hover:bg-muted/20 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider ${
                        article.published 
                          ? "bg-green-500/10 text-green-500 border border-green-500/20" 
                          : "bg-secondary text-muted-foreground border border-border"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${article.published ? "bg-green-500" : "bg-muted-foreground"}`}></span>
                        {article.published ? "Publié" : "Brouillon"}
                      </span>
                      <span className="text-xs text-primary font-body uppercase tracking-widest font-semibold">
                        {getCategoryLabel(article.category)}
                      </span>
                    </div>
                    <h2 className="text-lg font-heading font-semibold text-foreground truncate">
                      {article.title}
                    </h2>
                    <p className="text-sm text-muted-foreground truncate mt-1">
                      {new Date(article.created_at).toLocaleDateString("fr-FR", {
                        day: "numeric", month: "long", year: "numeric"
                      })}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 sm:self-center mt-3 sm:mt-0">
                    <button
                      onClick={() => togglePublish(article.id, article.published)}
                      className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-sm transition-colors"
                      title={article.published ? "Dépublier" : "Publier"}
                    >
                      {article.published ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    <button
                      onClick={() => navigate(`/admin/editor/${article.id}`)}
                      className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-sm transition-colors"
                      title="Modifier"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Voulez-vous vraiment supprimer cet article ?')) {
                          handleDelete(article.id);
                        }
                      }}
                      className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-sm transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
