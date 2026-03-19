import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Globe } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";
import { useI18n, uiStrings } from "@/hooks/use-i18n";

const navItemKeys = [
  { key: "nav.home", href: "#accueil" },
  { key: "nav.about", href: "#apropos" },
  { key: "nav.parcours", href: "#parcours" },
  { key: "nav.publications", href: "#publications" },
  { key: "nav.services", href: "/services" },
  { key: "nav.blog", href: "/blog" },
  { key: "nav.contact", href: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("accueil");
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang } = useI18n();

  const navItems = navItemKeys.map((item) => ({
    label: uiStrings[item.key][lang],
    href: item.href,
  }));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section via IntersectionObserver on home page
  useEffect(() => {
    if (!isHome) return;
    const sectionIds = navItems
      .filter((item) => item.href.startsWith("#"))
      .map((item) => item.href.slice(1));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHome]);

  const isActive = (href: string) => {
    if (href.startsWith("/")) {
      return location.pathname === href || location.pathname.startsWith(href + "/");
    }
    // anchor links — only relevant on home page
    if (isHome) {
      return href === `#${activeSection}`;
    }
    return false;
  };

  const linkClass = (href: string) =>
    `font-body text-sm tracking-widest uppercase transition-colors duration-300 ${
      isActive(href)
        ? "text-primary font-semibold"
        : "text-muted-foreground hover:text-primary"
    }`;

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-4">
        <a href="#accueil" className="font-heading text-xl md:text-2xl font-bold tracking-tight">
          <span className="text-foreground">Chams Modeste</span>{" "}
          <span className="text-primary">HEDJI</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) =>
            item.href.startsWith("/") ? (
              <Link
                key={item.href}
                to={item.href}
                className={linkClass(item.href)}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.href}
                href={isHome ? item.href : `/${item.href}`}
                className={linkClass(item.href)}
              >
                {item.label}
              </a>
            )
          )}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-muted-foreground hover:text-primary transition-colors duration-300"
            aria-label="Changer de thème"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold text-muted-foreground hover:text-primary border border-border hover:border-primary transition-colors duration-300 uppercase"
            aria-label="Changer de langue"
          >
            <Globe size={14} />
            {lang === "fr" ? "EN" : "FR"}
          </button>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            className="inline-flex items-center gap-1 px-2 py-1.5 rounded-full text-xs font-semibold text-muted-foreground hover:text-primary border border-border hover:border-primary transition-colors duration-300 uppercase"
          >
            <Globe size={14} />
            {lang === "fr" ? "EN" : "FR"}
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-muted-foreground hover:text-primary transition-colors duration-300"
            aria-label="Changer de thème"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-foreground"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/98 backdrop-blur-md border-b border-border overflow-hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {navItems.map((item) =>
                item.href.startsWith("/") ? (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={linkClass(item.href)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.href}
                    href={isHome ? item.href : `/${item.href}`}
                    onClick={() => setMobileOpen(false)}
                    className={linkClass(item.href)}
                  >
                    {item.label}
                  </a>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
