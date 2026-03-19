const stats = [
  { num: "5+", label: "Publications & écrits" },
  { num: "1", label: "Mémoire de fin de cycle Philosophie" },
  { num: "15+", label: "Années d'engagement culturel" },
  { num: "3", label: "Domaines d'expertise" },
];

const StatsBar = () => {
  return (
    <div className="border-t border-border">
      <div className="max-w-[1100px] mx-auto px-16 py-10 flex gap-12 flex-wrap">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="font-heading text-3xl md:text-4xl text-primary font-bold leading-none">
              {s.num}
            </div>
            <div className="text-xs text-muted-foreground mt-1 font-body">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsBar;
