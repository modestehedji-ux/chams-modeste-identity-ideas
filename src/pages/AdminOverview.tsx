import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, CheckCircle, FileEdit, Route, BookOpen, Users } from "lucide-react";
import { getArticles, type Article } from "@/lib/articles";
import { getParcours, getPublications, getHighlights } from "@/lib/content";

const AdminOverview = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [parcoursCount, setParcoursCount] = useState(0);
  const [pubsCount, setPubsCount] = useState(0);
  const [highlightsCount, setHighlightsCount] = useState(0);

  useEffect(() => {
    getArticles().then(setArticles).catch(() => {});
    getParcours().then((d) => setParcoursCount(d.length)).catch(() => {});
    getPublications().then((d) => setPubsCount(d.length)).catch(() => {});
    getHighlights().then((d) => setHighlightsCount(d.length)).catch(() => {});
  }, []);

  const published = articles.filter((a) => a.published).length;
  const drafts = articles.filter((a) => !a.published).length;

  const stats = [
    { label: "Total articles", value: articles.length, icon: FileText, color: "text-primary", bg: "bg-primary/10" },
    { label: "Articles publiés", value: published, icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10" },
    { label: "Brouillons", value: drafts, icon: FileEdit, color: "text-muted-foreground", bg: "bg-secondary" },
    { label: "Étapes parcours", value: parcoursCount, icon: Route, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Publications", value: pubsCount, icon: BookOpen, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Points forts", value: highlightsCount, icon: Users, color: "text-purple-500", bg: "bg-purple-500/10" },
  ];

  const shortcuts = [
    { label: "Gérer le Hero", path: "/admin/hero" },
    { label: "Gérer À propos", path: "/admin/about" },
    { label: "Gérer le Parcours", path: "/admin/parcours" },
    { label: "Gérer les Publications", path: "/admin/publications" },
    { label: "Gérer les Articles", path: "/admin/articles" },
    { label: "Gérer le Contact", path: "/admin/contact" },
    { label: "Paramètres", path: "/admin/settings" },
  ];

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card border border-border p-6 rounded-sm shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">{s.label}</p>
                <h3 className="text-3xl font-bold text-foreground">{s.value}</h3>
              </div>
              <div className={`w-12 h-12 ${s.bg} rounded-full flex items-center justify-center ${s.color}`}>
                <s.icon size={24} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-card border border-border rounded-sm shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-muted/30">
          <h2 className="font-heading font-semibold text-lg text-foreground">Accès rapide</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {shortcuts.map((s) => (
            <button
              key={s.path}
              onClick={() => navigate(s.path)}
              className="text-left p-4 border border-border rounded-sm hover:border-primary/40 hover:bg-secondary/30 transition-all text-sm font-medium text-foreground"
            >
              {s.label} →
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
