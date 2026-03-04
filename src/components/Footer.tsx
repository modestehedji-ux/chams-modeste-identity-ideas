import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";
import { useI18n, uiStrings } from "@/hooks/use-i18n";

const Footer = () => {
  const { lang } = useI18n();

  const quickLinks = [
    { label: uiStrings["nav.home"][lang], href: "/" },
    { label: uiStrings["nav.about"][lang], href: "/#apropos" },
    { label: uiStrings["nav.parcours"][lang], href: "/#parcours" },
    { label: uiStrings["nav.publications"][lang], href: "/#publications" },
    { label: uiStrings["nav.blog"][lang], href: "/blog" },
    { label: uiStrings["nav.contact"][lang], href: "/contact" },
  ];

  return (
  <footer className="border-t border-border bg-secondary/30">
    {/* Main footer content */}
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 text-center md:text-left md:items-start md:justify-items-center">
        {/* Brand */}
        <div className="space-y-4 flex flex-col items-center md:items-start">
          <p className="font-heading text-xl font-bold tracking-tight">
            <span className="text-foreground">Chams M.</span>{" "}
            <span className="text-primary">HEDJI</span>
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Diplômé en Philosophie · Auteur · Juriste des droits humains (en formation)
          </p>
          <div className="flex items-center justify-center md:justify-start gap-3 text-muted-foreground">
            <MapPin className="text-primary shrink-0" size={16} />
            <span className="text-sm">Cotonou, Bénin</span>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-3 text-muted-foreground">
            <Mail className="text-primary shrink-0" size={16} />
            <a
              href="mailto:modestehedji@gmail.com"
              className="text-sm hover:text-primary transition-colors"
            >
              modestehedji@gmail.com
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div className="space-y-4 flex flex-col items-center md:items-start">
          <h4 className="font-heading text-sm font-semibold uppercase tracking-widest text-foreground">
            {uiStrings["footer.links"][lang]}
          </h4>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.href}>
                {link.href.startsWith("/#") ? (
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Social / Réseaux */}
        <div className="space-y-4 flex flex-col items-center md:items-start">
          <h4 className="font-heading text-sm font-semibold uppercase tracking-widest text-foreground">
            {uiStrings["footer.social"][lang]}
          </h4>
          <div className="flex flex-col gap-3">
            <a
              href="https://www.linkedin.com/in/chams-modeste-hedji-49469426b/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <a
              href="mailto:modestehedji@gmail.com"
              className="inline-flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail size={18} />
              Email
            </a>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Chams Modeste <span className="text-primary font-medium">HEDJI</span>. {uiStrings["footer.rights"][lang]}
        </p>
        <p className="text-xs text-muted-foreground">
          {uiStrings["footer.tagline"][lang]}
        </p>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
