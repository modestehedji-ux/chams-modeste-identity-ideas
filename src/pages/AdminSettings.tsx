import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import { getSiteSettings, updateSetting, type SiteSetting } from "@/lib/content";
import { useToast } from "@/hooks/use-toast";
import { RichTextEditor } from "@/components/ui/rich-text-editor";

const settingLabels: Record<string, { fr: string; en: string }> = {
  site_name: { fr: "Nom du site", en: "Site name" },
  site_subtitle: { fr: "Sous-titre du site", en: "Site subtitle" },
  site_description: { fr: "Description du site", en: "Site description" },
  footer_tagline: { fr: "Slogan du footer", en: "Footer tagline" },
};

const AdminSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getSiteSettings().then(setSettings).catch(() => {});
  }, []);

  const updateLocal = (id: string, field: "value_fr" | "value_en", value: string) => {
    setSettings((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const s of settings) {
        await updateSetting(s.id, { value_fr: s.value_fr, value_en: s.value_en });
      }
      toast({ title: "Paramètres sauvegardés" });
    } catch {
      toast({ title: "Erreur", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-8">
      {settings.map((s) => {
        const labels = settingLabels[s.key] || { fr: s.key, en: s.key };
        return (
          <div key={s.id} className="bg-card border border-border rounded-sm p-6 shadow-sm space-y-4">
            <h3 className="font-heading font-semibold text-foreground text-sm uppercase tracking-wider border-b border-border pb-2">
              {labels.fr}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-body uppercase tracking-widest text-muted-foreground mb-2">
                  🇫🇷 Français
                </label>
                <div className="bg-card p-4 rounded-sm border border-border mt-1">
                  <RichTextEditor
                    content={s.value_fr}
                    onChange={(html) => updateLocal(s.id, "value_fr", html)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-body uppercase tracking-widest text-muted-foreground mb-2">
                  🇬🇧 English
                </label>
                <div className="bg-card p-4 rounded-sm border border-border mt-1">
                  <RichTextEditor
                    content={s.value_en}
                    onChange={(html) => updateLocal(s.id, "value_en", html)}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {settings.length === 0 && (
        <p className="text-muted-foreground text-center py-8">Aucun paramètre trouvé. Exécutez la migration pour initialiser les données.</p>
      )}

      <button onClick={handleSave} disabled={saving} className="inline-flex items-center gap-2 bg-gold-gradient text-primary-foreground font-body font-semibold px-8 py-3 rounded-sm tracking-wide text-sm uppercase hover:opacity-90 transition-opacity disabled:opacity-60">
        <Save size={16} />
        {saving ? "Sauvegarde..." : "Enregistrer"}
      </button>
    </motion.div>
  );
};

export default AdminSettings;
