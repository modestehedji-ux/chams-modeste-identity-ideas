import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Save } from "lucide-react";
import { getParcours, createParcours, updateParcours, deleteParcours, type ParcoursItem } from "@/lib/content";
import { useToast } from "@/hooks/use-toast";

const categoryOptions = ["art", "académique", "publication"];

const AdminParcours = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<ParcoursItem[]>([]);
  const [editing, setEditing] = useState<Partial<ParcoursItem> | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => getParcours().then(setItems).catch(() => {});

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if (editing.id) {
        await updateParcours(editing.id, {
          year: editing.year!,
          title_fr: editing.title_fr!,
          title_en: editing.title_en || "",
          category: editing.category || "académique",
          sort_order: editing.sort_order || 0,
        });
        toast({ title: "Étape mise à jour" });
      } else {
        await createParcours({
          year: editing.year || "",
          title_fr: editing.title_fr || "",
          title_en: editing.title_en || "",
          category: editing.category || "académique",
          sort_order: items.length + 1,
        });
        toast({ title: "Étape créée" });
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
    if (!confirm("Supprimer cette étape ?")) return;
    await deleteParcours(id);
    refresh();
    toast({ title: "Étape supprimée" });
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
          <h2 className="font-heading font-semibold text-lg text-foreground">Étapes du parcours</h2>
          <button
            onClick={() => setEditing({ year: "", title_fr: "", title_en: "", category: "académique", sort_order: items.length + 1 })}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground py-2 px-4 text-sm font-medium hover:bg-primary/90 transition-colors rounded-sm"
          >
            <Plus size={16} /> Ajouter
          </button>
        </div>

        <div className="divide-y divide-border">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-5 hover:bg-muted/20 transition-colors">
              <div className="w-20 shrink-0">
                <span className="text-primary font-heading font-bold">{item.year}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{item.title_fr}</p>
                {item.title_en && <p className="text-xs text-muted-foreground truncate mt-0.5">{item.title_en}</p>}
                <span className={`inline-block mt-1 text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full ${
                  item.category === "art" ? "bg-primary/10 text-primary" :
                  item.category === "publication" ? "bg-amber-500/10 text-amber-600" :
                  "bg-blue-500/10 text-blue-600"
                }`}>
                  {item.category}
                </span>
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
          {items.length === 0 && <p className="text-muted-foreground text-center py-8">Aucune étape.</p>}
        </div>
      </div>

      {/* EDIT MODAL */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-card border border-border rounded-sm p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto space-y-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-heading font-semibold text-foreground text-lg">
              {editing.id ? "Modifier l'étape" : "Nouvelle étape"}
            </h3>
            <Field label="Année" value={editing.year || ""} onChange={(v) => setEditing({ ...editing, year: v })} />
            <Field label="Titre (FR)" value={editing.title_fr || ""} onChange={(v) => setEditing({ ...editing, title_fr: v })} />
            <Field label="Title (EN)" value={editing.title_en || ""} onChange={(v) => setEditing({ ...editing, title_en: v })} />
            <div>
              <label className="block text-xs font-body uppercase tracking-widest text-muted-foreground mb-2">Catégorie</label>
              <select
                value={editing.category || "académique"}
                onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                className="w-full bg-secondary/50 border border-border rounded-sm px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary"
              >
                {categoryOptions.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
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

export default AdminParcours;
