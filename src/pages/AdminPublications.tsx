import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Save } from "lucide-react";
import { getPublications, createPublication, updatePublication, deletePublication, type Publication } from "@/lib/content";
import { useToast } from "@/hooks/use-toast";

const iconOptions = ["BookOpen", "FileText", "Pen", "Award", "Star", "GraduationCap"];

const AdminPublications = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<Publication[]>([]);
  const [editing, setEditing] = useState<Partial<Publication> | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => getPublications().then(setItems).catch(() => {});

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if (editing.id) {
        await updatePublication(editing.id, {
          icon: editing.icon!,
          type_fr: editing.type_fr!,
          type_en: editing.type_en || "",
          title_fr: editing.title_fr!,
          title_en: editing.title_en || "",
          detail_fr: editing.detail_fr!,
          detail_en: editing.detail_en || "",
          sort_order: editing.sort_order || 0,
        });
        toast({ title: "Publication mise à jour" });
      } else {
        await createPublication({
          icon: editing.icon || "FileText",
          type_fr: editing.type_fr || "",
          type_en: editing.type_en || "",
          title_fr: editing.title_fr || "",
          title_en: editing.title_en || "",
          detail_fr: editing.detail_fr || "",
          detail_en: editing.detail_en || "",
          sort_order: items.length + 1,
        });
        toast({ title: "Publication créée" });
      }
      setEditing(null);
      refresh();
    } catch {
      toast({ title: "Erreur", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cette publication ?")) return;
    await deletePublication(id);
    refresh();
    toast({ title: "Publication supprimée" });
  };

  const Field = ({ label, value, onChange, rows }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) => (
    <div>
      <label className="block text-xs font-body uppercase tracking-widest text-muted-foreground mb-2">{label}</label>
      {rows ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} className="w-full bg-secondary/50 border border-border rounded-sm px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors resize-y" />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-secondary/50 border border-border rounded-sm px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors" />
      )}
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
      <div className="bg-card border border-border rounded-sm shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-muted/30 flex items-center justify-between">
          <h2 className="font-heading font-semibold text-lg text-foreground">Publications académiques</h2>
          <button
            onClick={() => setEditing({ icon: "FileText", type_fr: "", type_en: "", title_fr: "", title_en: "", detail_fr: "", detail_en: "", sort_order: items.length + 1 })}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground py-2 px-4 text-sm font-medium hover:bg-primary/90 transition-colors rounded-sm"
          >
            <Plus size={16} /> Ajouter
          </button>
        </div>

        <div className="divide-y divide-border">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-5 hover:bg-muted/20 transition-colors">
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase tracking-wider font-medium text-primary">{item.type_fr}</span>
                <p className="text-sm font-semibold text-foreground truncate mt-0.5">{item.title_fr}</p>
                <p className="text-xs text-muted-foreground truncate mt-0.5">{item.detail_fr}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setEditing(item)} className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-sm transition-colors">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => handleDelete(item.id)} className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-sm transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="text-muted-foreground text-center py-8">Aucune publication.</p>}
        </div>
      </div>

      {/* EDIT MODAL */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-card border border-border rounded-sm p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto space-y-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-heading font-semibold text-foreground text-lg">
              {editing.id ? "Modifier la publication" : "Nouvelle publication"}
            </h3>
            <div>
              <label className="block text-xs font-body uppercase tracking-widest text-muted-foreground mb-2">Icône</label>
              <select
                value={editing.icon || "FileText"}
                onChange={(e) => setEditing({ ...editing, icon: e.target.value })}
                className="w-full bg-secondary/50 border border-border rounded-sm px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary"
              >
                {iconOptions.map((icon) => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
            </div>
            <Field label="Type (FR)" value={editing.type_fr || ""} onChange={(v) => setEditing({ ...editing, type_fr: v })} />
            <Field label="Type (EN)" value={editing.type_en || ""} onChange={(v) => setEditing({ ...editing, type_en: v })} />
            <Field label="Titre (FR)" value={editing.title_fr || ""} onChange={(v) => setEditing({ ...editing, title_fr: v })} />
            <Field label="Title (EN)" value={editing.title_en || ""} onChange={(v) => setEditing({ ...editing, title_en: v })} />
            <Field label="Détail (FR)" value={editing.detail_fr || ""} onChange={(v) => setEditing({ ...editing, detail_fr: v })} />
            <Field label="Detail (EN)" value={editing.detail_en || ""} onChange={(v) => setEditing({ ...editing, detail_en: v })} />
            <div>
              <label className="block text-xs font-body uppercase tracking-widest text-muted-foreground mb-2">Ordre</label>
              <input
                type="number"
                value={editing.sort_order || 0}
                onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })}
                className="w-full bg-secondary/50 border border-border rounded-sm px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={handleSave} disabled={saving} className="inline-flex items-center gap-2 bg-primary text-primary-foreground py-2 px-6 text-sm font-medium hover:bg-primary/90 transition-colors rounded-sm disabled:opacity-60">
                <Save size={16} /> {saving ? "..." : "Sauvegarder"}
              </button>
              <button onClick={() => setEditing(null)} className="py-2 px-6 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-sm transition-colors">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AdminPublications;
