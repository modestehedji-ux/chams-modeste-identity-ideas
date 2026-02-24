const Footer = () => (
  <footer className="border-t border-border py-8 px-6 md:px-12">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="font-heading text-sm text-foreground">
        © {new Date().getFullYear()} Chams Modeste <span className="text-primary">HEDJI</span>
      </p>
      <p className="text-xs text-muted-foreground">
        Diplômé en Philosophie · Auteur · Juriste des droits humains (en formation)
      </p>
    </div>
  </footer>
);

export default Footer;
