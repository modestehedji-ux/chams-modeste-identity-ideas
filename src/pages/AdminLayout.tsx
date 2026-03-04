import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Globe, LogOut, FileText, Route as RouteIcon,
  BookOpen, User, Phone, Settings, Menu, X, ChevronRight,
} from "lucide-react";
import { logout, getSession } from "@/lib/articles";

interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
}

const navSections: { title: string; items: NavItem[] }[] = [
  {
    title: "Général",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    ],
  },
  {
    title: "Contenu",
    items: [
      { label: "Hero / Accueil", icon: User, path: "/admin/hero" },
      { label: "À propos", icon: User, path: "/admin/about" },
      { label: "Parcours", icon: RouteIcon, path: "/admin/parcours" },
      { label: "Publications", icon: BookOpen, path: "/admin/publications" },
      { label: "Articles (Blog)", icon: FileText, path: "/admin/articles" },
      { label: "Contact", icon: Phone, path: "/admin/contact" },
    ],
  },
  {
    title: "Configuration",
    items: [
      { label: "Paramètres", icon: Settings, path: "/admin/settings" },
    ],
  },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        navigate("/admin/login");
      } else {
        setLoading(false);
      }
    });
  }, [navigate]);

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  const isActive = (path: string) => {
    if (path === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(path);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    );
  }

  const SidebarContent = () => (
    <>
      <div className="h-16 flex items-center px-6 border-b border-border shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary flex items-center justify-center text-primary-foreground text-lg rounded-sm">
            <span className="font-bold">A</span>
          </div>
          <span className="text-lg font-bold uppercase tracking-tight text-foreground">
            ADMIN<span className="text-primary">PANEL</span>
          </span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-5">
        {navSections.map((section) => (
          <div key={section.title} className="border border-border bg-background p-3 rounded-sm">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-3 border-b border-border pb-1">
              {section.title}
            </p>
            {section.items.map((item) => {
              const active = isActive(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors mb-1 rounded-sm border-l-4 ${
                    active
                      ? "bg-primary text-primary-foreground border-l-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-primary border-l-transparent hover:border-l-primary"
                  }`}
                >
                  <item.icon size={18} className="w-5 shrink-0" />
                  {item.label}
                  {active && <ChevronRight size={14} className="ml-auto" />}
                </button>
              );
            })}
          </div>
        ))}

        <div className="border border-border bg-background p-3 rounded-sm">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-3 border-b border-border pb-1">
            Actions
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-primary transition-colors mb-1 border-l-4 border-l-transparent hover:border-l-primary rounded-sm"
          >
            <Globe size={18} className="w-5" />
            Retour au site
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors mb-1 border-l-4 border-l-transparent rounded-sm"
          >
            <LogOut size={16} className="w-5" />
            Déconnexion
          </button>
        </div>
      </nav>
    </>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-72 bg-card border-r border-border h-screen sticky top-0 shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile overlay sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-card border-r border-border z-50 flex flex-col lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-muted-foreground hover:text-primary transition-colors"
            >
              <Menu size={20} />
            </button>
            <h1 className="font-heading text-lg font-bold text-foreground">
              {getCurrentTitle(location.pathname)}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="lg:hidden text-muted-foreground hover:text-destructive transition-colors"
            >
              <LogOut size={18} />
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8 bg-secondary/20">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

function getCurrentTitle(pathname: string): string {
  const map: Record<string, string> = {
    "/admin": "Dashboard",
    "/admin/hero": "Section Hero / Accueil",
    "/admin/about": "Section À propos",
    "/admin/parcours": "Gestion du Parcours",
    "/admin/publications": "Gestion des Publications",
    "/admin/articles": "Gestion des Articles",
    "/admin/contact": "Informations de Contact",
    "/admin/settings": "Paramètres du site",
  };
  for (const [path, title] of Object.entries(map)) {
    if (pathname === path || pathname.startsWith(path + "/")) return title;
  }
  return "Administration";
}

export default AdminLayout;
