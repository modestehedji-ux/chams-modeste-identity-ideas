import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Lang = "fr" | "en";

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (fr: string | undefined, en: string | undefined) => string;
}

const I18nContext = createContext<I18nContextType>({
  lang: "fr",
  setLang: () => {},
  t: (fr) => fr || "",
});

const getInitialLang = (): Lang => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("lang") as Lang | null;
    if (stored === "fr" || stored === "en") return stored;
  }
  return "fr";
};

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
    document.documentElement.lang = l;
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  /** Helper: returns the string for the current language */
  const t = (fr: string | undefined, en: string | undefined): string => {
    if (lang === "en") return en || fr || "";
    return fr || en || "";
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);

/** Static UI translations used across the app */
export const uiStrings: Record<string, Record<Lang, string>> = {
  // Navbar
  "nav.home": { fr: "Accueil", en: "Home" },
  "nav.about": { fr: "À propos", en: "About" },
  "nav.parcours": { fr: "Parcours", en: "Journey" },
  "nav.publications": { fr: "Publications", en: "Publications" },
  "nav.services": { fr: "Services", en: "Services" },
  "nav.blog": { fr: "Blog", en: "Blog" },
  "nav.contact": { fr: "Contact", en: "Contact" },

  // Hero
  "hero.discover": { fr: "Découvrir", en: "Discover" },
  "hero.contact": { fr: "Me contacter", en: "Contact me" },

  // About
  "about.label": { fr: "À propos", en: "About" },
  "about.heading.1": { fr: "Penser l'Afrique", en: "Rethinking Africa" },
  "about.heading.2": { fr: "autrement", en: "differently" },

  // Parcours
  "parcours.label": { fr: "Parcours", en: "Journey" },
  "parcours.heading.1": { fr: "Un itinéraire", en: "A singular" },
  "parcours.heading.2": { fr: "singulier", en: "journey" },

  // Publications
  "pub.label": { fr: "Publications", en: "Publications" },
  "pub.heading.1": { fr: "Écrits &", en: "Writings &" },
  "pub.heading.2": { fr: "contributions", en: "contributions" },

  // Contact
  "contact.label": { fr: "Contact", en: "Contact" },
  "contact.heading.1": { fr: "Entrons en", en: "Let's start a" },
  "contact.heading.2": { fr: "dialogue", en: "dialogue" },
  "contact.name": { fr: "Votre nom", en: "Your name" },
  "contact.email": { fr: "Votre email", en: "Your email" },
  "contact.message": { fr: "Votre message", en: "Your message" },
  "contact.send": { fr: "Envoyer", en: "Send" },
  "contact.sent": { fr: "Envoyé !", en: "Sent!" },

  // Footer
  "footer.links": { fr: "Liens rapides", en: "Quick links" },
  "footer.social": { fr: "Réseaux sociaux", en: "Social networks" },
  "footer.rights": { fr: "Tous droits réservés.", en: "All rights reserved." },

  // Blog
  "blog.readMore": { fr: "Lire la suite", en: "Read more" },
  "blog.noArticles": { fr: "Aucun article pour le moment.", en: "No articles yet." },
};
