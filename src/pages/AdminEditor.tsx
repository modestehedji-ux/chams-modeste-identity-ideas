import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Save } from "lucide-react";
import { createArticle, updateArticle, getArticleById, getSession, type ArticleCategory } from "@/lib/articles";
import { useToast } from "@/hooks/use-toast";

const categories: { value: ArticleCategory; label: string }[] = [
  { value: "reflexion", label: "Réflexion" },
  { value: "actualite", label: "Actualité" },
  { value: "academique", label: "Publication académique" },
];

const AdminEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEdit = !!id;

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<ArticleCategory>("reflexion");
  const [published, setPublished] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Check authentication
    getSession().then((session) => {
      if (!session) { navigate("/admin/login"); return; }
      if (isEdit) {
        getArticleById(id!).then((article) => {
          if (!article) { navigate("/admin"); return; }
          setTitle(article.title);
          setSlug(article.slug);
          setExcerpt(article.excerpt);
          setContent(article.content);
          setCategory(article.category);
          setPublished(article.published);
        });
      }
    });
  }, [id, isEdit, navigate]);

  const generateSlug = (t: string) =>
    t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEdit) setSlug(generateSlug(val));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isEdit) {
        await updateArticle(id!, { title, slug, excerpt, content, category, published });
        toast({ title: "Article mis à jour" });
      } else {
        await createArticle({ title, slug, excerpt, content, category, published });
        toast({ title: "Article créé" });
      }
      navigate("/admin");
    } catch {
      toast({ title: "Erreur", description: "Impossible de sauvegarder l'article.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/admin")} className="text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft size={20} />
            </button>
            <h1 className="font-heading text-xl font-bold text-foreground">
              {isEdit ? "Modifier l'article" : "Nouvel article"}
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label className="block text-xs font-body uppercase tracking-widest text-muted-foreground mb-2">Titre</label>
            <input
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              required
              className="w-full bg-secondary/50 border border-border rounded-sm px-4 py-3 text-foreground font-heading text-lg focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-body uppercase tracking-widest text-muted-foreground mb-2">Slug</label>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              className="w-full bg-secondary/50 border border-border rounded-sm px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors font-mono"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-body uppercase tracking-widest text-muted-foreground mb-2">Catégorie</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ArticleCategory)}
                className="w-full bg-secondary/50 border border-border rounded-sm px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
              >
                {categories.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="w-4 h-4 accent-primary"
                />
                <span className="text-sm text-foreground">Publier immédiatement</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-body uppercase tracking-widest text-muted-foreground mb-2">Résumé</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={2}
              required
              className="w-full bg-secondary/50 border border-border rounded-sm px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-body uppercase tracking-widest text-muted-foreground mb-2">Contenu</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={14}
              required
              className="w-full bg-secondary/50 border border-border rounded-sm px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors resize-y leading-relaxed"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-gold-gradient text-primary-foreground font-body font-semibold px-8 py-3 rounded-sm tracking-wide text-sm uppercase hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            <Save size={16} />
            {saving ? "Sauvegarde..." : (isEdit ? "Mettre à jour" : "Enregistrer")}
          </button>
        </motion.form>
      </main>
    </div>
  );
};

export default AdminEditor;
