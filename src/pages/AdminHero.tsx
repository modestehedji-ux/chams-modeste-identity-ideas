import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import { getHero, updateHero, type HeroData } from "@/lib/content";
import { useToast } from "@/hooks/use-toast";
import { RichTextEditor } from "@/components/ui/rich-text-editor";

const AdminHero = () => {
  const { toast } = useToast();
  const [data, setData] = useState<HeroData | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getHero().then(setData);
  }, []);

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    try {
      const updated = await updateHero(data.id, {
        title_fr: data.title_fr,
        title_en: data.title_en,
        subtitle_fr: data.subtitle_fr,
        subtitle_en: data.subtitle_en,
        description_fr: data.description_fr,
        description_en: data.description_en,
      });
      setData(updated);
      toast({ title: "Section Hero mise à jour" });
    } catch {
      toast({ title: "Erreur", description: "Impossible de sauvegarder.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (!data) {
    return <p className="text-muted-foreground">Chargement...</p>;
  }

  const Field = ({
    label,
    value,
    onChange,
    rows,
  }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    rows?: number;
  }) => (
    <div>
      <label className="block text-xs font-body uppercase tracking-widest text-muted-foreground mb-2">
        {label}
      </label>
      {rows ? (
        <div className="bg-card p-4 rounded-sm border border-border mt-1">
          <RichTextEditor
            content={value}
            onChange={onChange}
          />
        </div>
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-secondary/50 border border-border rounded-sm px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
        />
      )}
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-8">
      <div className="bg-card border border-border rounded-sm p-6 shadow-sm space-y-6">
        <h2 className="font-heading font-semibold text-foreground border-b border-border pb-3">
          🇫🇷 Français
        </h2>
        <Field label="Titre" value={data.title_fr} onChange={(v) => setData({ ...data, title_fr: v })} />
        <Field label="Sous-titre" value={data.subtitle_fr} onChange={(v) => setData({ ...data, subtitle_fr: v })} />
        <Field label="Description" value={data.description_fr} onChange={(v) => setData({ ...data, description_fr: v })} rows={3} />
      </div>

      <div className="bg-card border border-border rounded-sm p-6 shadow-sm space-y-6">
        <h2 className="font-heading font-semibold text-foreground border-b border-border pb-3">
          🇬🇧 English
        </h2>
        <Field label="Title" value={data.title_en} onChange={(v) => setData({ ...data, title_en: v })} />
        <Field label="Subtitle" value={data.subtitle_en} onChange={(v) => setData({ ...data, subtitle_en: v })} />
        <Field label="Description" value={data.description_en} onChange={(v) => setData({ ...data, description_en: v })} rows={3} />
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="inline-flex items-center gap-2 bg-gold-gradient text-primary-foreground font-body font-semibold px-8 py-3 rounded-sm tracking-wide text-sm uppercase hover:opacity-90 transition-opacity disabled:opacity-60"
      >
        <Save size={16} />
        {saving ? "Sauvegarde..." : "Enregistrer"}
      </button>
    </motion.div>
  );
};

export default AdminHero;
