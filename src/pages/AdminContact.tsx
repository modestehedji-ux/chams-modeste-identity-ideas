import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import { getContactInfo, updateContactInfo, type ContactInfo } from "@/lib/content";
import { useToast } from "@/hooks/use-toast";
import { RichTextEditor } from "@/components/ui/rich-text-editor";

const AdminContact = () => {
  const { toast } = useToast();
  const [data, setData] = useState<ContactInfo | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getContactInfo().then(setData);
  }, []);

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    try {
      const updated = await updateContactInfo(data.id, {
        email: data.email,
        location_fr: data.location_fr,
        location_en: data.location_en,
        linkedin_url: data.linkedin_url,
        description_fr: data.description_fr,
        description_en: data.description_en,
      });
      setData(updated);
      toast({ title: "Contact mis à jour" });
    } catch {
      toast({ title: "Erreur", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const Field = ({ label, value, onChange, rows }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) => (
    <div>
      <label className="block text-xs font-body uppercase tracking-widest text-muted-foreground mb-2">{label}</label>
      {rows ? (
        <div className="bg-card p-4 rounded-sm border border-border mt-1">
          <RichTextEditor
            content={value}
            onChange={onChange}
          />
        </div>
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-secondary/50 border border-border rounded-sm px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors" />
      )}
    </div>
  );

  if (!data) return <p className="text-muted-foreground">Chargement...</p>;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-8">
      <div className="bg-card border border-border rounded-sm p-6 shadow-sm space-y-6">
        <h2 className="font-heading font-semibold text-foreground border-b border-border pb-3">Informations générales</h2>
        <Field label="Email" value={data.email} onChange={(v) => setData({ ...data, email: v })} />
        <Field label="URL LinkedIn" value={data.linkedin_url} onChange={(v) => setData({ ...data, linkedin_url: v })} />
      </div>

      <div className="bg-card border border-border rounded-sm p-6 shadow-sm space-y-6">
        <h2 className="font-heading font-semibold text-foreground border-b border-border pb-3">🇫🇷 Français</h2>
        <Field label="Localisation" value={data.location_fr} onChange={(v) => setData({ ...data, location_fr: v })} />
        <Field label="Description" value={data.description_fr} onChange={(v) => setData({ ...data, description_fr: v })} rows={3} />
      </div>

      <div className="bg-card border border-border rounded-sm p-6 shadow-sm space-y-6">
        <h2 className="font-heading font-semibold text-foreground border-b border-border pb-3">🇬🇧 English</h2>
        <Field label="Location" value={data.location_en} onChange={(v) => setData({ ...data, location_en: v })} />
        <Field label="Description" value={data.description_en} onChange={(v) => setData({ ...data, description_en: v })} rows={3} />
      </div>

      <button onClick={handleSave} disabled={saving} className="inline-flex items-center gap-2 bg-gold-gradient text-primary-foreground font-body font-semibold px-8 py-3 rounded-sm tracking-wide text-sm uppercase hover:opacity-90 transition-opacity disabled:opacity-60">
        <Save size={16} />
        {saving ? "Sauvegarde..." : "Enregistrer"}
      </button>
    </motion.div>
  );
};

export default AdminContact;
