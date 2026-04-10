import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Plus, Trash2, Edit2 } from "lucide-react";
import { getAbout, updateAbout, getHighlights, createHighlight, updateHighlight, deleteHighlight, type AboutData, type Highlight } from "@/lib/content";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { useToast } from "@/hooks/use-toast";
import { translateText } from "@/lib/translate";

const iconOptions = ["GraduationCap", "Scale", "Theater", "BookOpen", "FileText", "Pen", "Award", "Star", "Globe", "Heart"];

const AdminAbout = () => {
  const { toast } = useToast();
  const [about, setAbout] = useState<AboutData | null>(null);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [savingAbout, setSavingAbout] = useState(false);
  const [editingHighlight, setEditingHighlight] = useState<Partial<Highlight> | null>(null);
  const [savingHL, setSavingHL] = useState(false);
  const [translatingAbout, setTranslatingAbout] = useState(false);
  const [translatingHL, setTranslatingHL] = useState(false);

  useEffect(() => {
    getAbout().then(setAbout);
    refreshHighlights();
  }, []);

  const refreshHighlights = () => getHighlights().then(setHighlights).catch(() => {});

  const handleTranslateAbout = async () => {
    if (!about) return;
    setTranslatingAbout(true);
    try {
      const [th, tp1, tp2, tp3] = await Promise.all([
        about.heading_fr ? translateText(about.heading_fr) : Promise.resolve(""),
        about.paragraph1_fr ? translateText(about.paragraph1_fr) : Promise.resolve(""),
        about.paragraph2_fr ? translateText(about.paragraph2_fr) : Promise.resolve(""),
        about.paragraph3_fr ? translateText(about.paragraph3_fr) : Promise.resolve(""),
      ]);
      setAbout({
        ...about,
        heading_en: th,
        paragraph1_en: tp1,
        paragraph2_en: tp2,
        paragraph3_en: tp3,
      });
      toast({ title: "Traduction terminée" });
    } catch (e: any) {
      toast({ title: "Erreur de traduction", description: e.message, variant: "destructive" });
    } finally {
      setTranslatingAbout(false);
    }
  };

  const handleTranslateHighlight = async () => {
    if (!editingHighlight) return;
    setTranslatingHL(true);
    try {
      const [tl, td] = await Promise.all([
        editingHighlight.label_fr ? translateText(editingHighlight.label_fr) : Promise.resolve(""),
        editingHighlight.detail_fr ? translateText(editingHighlight.detail_fr) : Promise.resolve(""),
      ]);
      setEditingHighlight({
        ...editingHighlight,
        label_en: tl,
        detail_en: td,
      });
      toast({ title: "Traduction terminée" });
    } catch (e: any) {
      toast({ title: "Erreur de traduction", description: e.message, variant: "destructive" });
    } finally {
      setTranslatingHL(false);
    }
  };

  const handleSaveAbout = async () => {
    if (!about) return;
    setSavingAbout(true);
    try {
      const updated = await updateAbout(about.id, {
        heading_fr: about.heading_fr,
        heading_en: about.heading_en,
        paragraph1_fr: about.paragraph1_fr,
        paragraph1_en: about.paragraph1_en,
        paragraph2_fr: about.paragraph2_fr,
        paragraph2_en: about.paragraph2_en,
        paragraph3_fr: about.paragraph3_fr,
        paragraph3_en: about.paragraph3_en,
      });
      setAbout(updated);
      toast({ title: "Section À propos mise à jour" });
    } catch {
      toast({ title: "Erreur", variant: "destructive" });
    } finally {
      setSavingAbout(false);
    }
  };

  const handleSaveHighlight = async () => {
    if (!editingHighlight) return;
    setSavingHL(true);
    try {
      if (editingHighlight.id) {
        await updateHighlight(editingHighlight.id, {
          icon: editingHighlight.icon!,
          label_fr: editingHighlight.label_fr!,
          label_en: editingHighlight.label_en || "",
          detail_fr: editingHighlight.detail_fr!,
          detail_en: editingHighlight.detail_en || "",
          sort_order: editingHighlight.sort_order || 0,
        });
        toast({ title: "Point fort mis à jour" });
      } else {
        await createHighlight({
          icon: editingHighlight.icon || "BookOpen",
          label_fr: editingHighlight.label_fr || "",
          label_en: editingHighlight.label_en || "",
          detail_fr: editingHighlight.detail_fr || "",
          detail_en: editingHighlight.detail_en || "",
          sort_order: highlights.length + 1,
        });
        toast({ title: "Point fort créé" });
      }
      setEditingHighlight(null);
      refreshHighlights();
    } catch {
      toast({ title: "Erreur", variant: "destructive" });
    } finally {
      setSavingHL(false);
    }
  };

  const handleDeleteHighlight = async (id: string) => {
    if (!confirm("Supprimer ce point fort ?")) return;
    await deleteHighlight(id);
    refreshHighlights();
    toast({ title: "Point fort supprimé" });
  };

  const Field = ({ label, value, onChange, rows }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) => (
    <div>
      <label className="block text-xs font-body uppercase tracking-widest text-muted-foreground mb-2">{label}</label>
      {rows ? (
        <div className="bg-card p-6 rounded-sm border border-border">
          <label className="block text-xs font-body uppercase tracking-widest text-muted-foreground mb-4">
            Texte de présentation
          </label>
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

  if (!about) return <p className="text-muted-foreground">Chargement...</p>;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-8">
      {/* ABOUT TEXT */}
      <div className="bg-card border border-border rounded-sm p-6 shadow-sm space-y-6">
        <h2 className="font-heading font-semibold text-foreground border-b border-border pb-3">Texte — 🇫🇷 Français</h2>
        <Field label="Titre" value={about.heading_fr} onChange={(v) => setAbout({ ...about, heading_fr: v })} />
        <Field label="Paragraphe 1" value={about.paragraph1_fr} onChange={(v) => setAbout({ ...about, paragraph1_fr: v })} rows={3} />
        <Field label="Paragraphe 2" value={about.paragraph2_fr} onChange={(v) => setAbout({ ...about, paragraph2_fr: v })} rows={3} />
        <Field label="Paragraphe 3" value={about.paragraph3_fr} onChange={(v) => setAbout({ ...about, paragraph3_fr: v })} rows={3} />
      </div>

      <div className="bg-card border border-border rounded-sm p-6 shadow-sm space-y-6">
        <div className="border-b border-border pb-3 flex justify-between items-center">
          <h2 className="font-heading font-semibold text-foreground">Text — 🇬🇧 English</h2>
          <button 
            disabled={translatingAbout}
            onClick={handleTranslateAbout}
            className="text-xs flex items-center gap-1.5 bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1.5 rounded-sm transition-colors font-medium disabled:opacity-50"
          >
            {translatingAbout ? "Traduction..." : "✨ Auto-Traduire depuis FR"}
          </button>
        </div>
        <Field label="Heading" value={about.heading_en} onChange={(v) => setAbout({ ...about, heading_en: v })} />
        <Field label="Paragraph 1" value={about.paragraph1_en} onChange={(v) => setAbout({ ...about, paragraph1_en: v })} rows={3} />
        <Field label="Paragraph 2" value={about.paragraph2_en} onChange={(v) => setAbout({ ...about, paragraph2_en: v })} rows={3} />
        <Field label="Paragraph 3" value={about.paragraph3_en} onChange={(v) => setAbout({ ...about, paragraph3_en: v })} rows={3} />
      </div>

      <button onClick={handleSaveAbout} disabled={savingAbout || translatingAbout} className="inline-flex items-center gap-2 bg-gold-gradient text-primary-foreground font-body font-semibold px-8 py-3 rounded-sm tracking-wide text-sm uppercase hover:opacity-90 transition-opacity disabled:opacity-60">
        <Save size={16} />
        {savingAbout ? "Sauvegarde..." : "Enregistrer le texte"}
      </button>

      {/* HIGHLIGHTS */}
      <div className="bg-card border border-border rounded-sm shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-muted/30 flex items-center justify-between">
          <h2 className="font-heading font-semibold text-lg text-foreground">Points forts</h2>
          <button
            onClick={() => setEditingHighlight({ icon: "BookOpen", label_fr: "", label_en: "", detail_fr: "", detail_en: "", sort_order: highlights.length + 1 })}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground py-2 px-4 text-sm font-medium hover:bg-primary/90 transition-colors rounded-sm"
          >
            <Plus size={16} /> Ajouter
          </button>
        </div>

        <div className="divide-y divide-border">
          {highlights.map((h) => (
            <div key={h.id} className="flex items-center gap-4 p-5 hover:bg-muted/20 transition-colors">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{h.label_fr}</p>
                <p className="text-xs text-muted-foreground truncate">{h.detail_fr}</p>
                <p className="text-[10px] text-primary mt-1">Icône: {h.icon} · Ordre: {h.sort_order}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setEditingHighlight(h)} className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-sm transition-colors">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => handleDeleteHighlight(h.id)} className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-sm transition-colors" title="Supprimer">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {highlights.length === 0 && <p className="text-muted-foreground text-center py-8">Aucun point fort.</p>}
        </div>
      </div>

      {/* HIGHLIGHT EDIT MODAL */}
      {editingHighlight && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setEditingHighlight(null)}>
          <div className="bg-card border border-border rounded-sm p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center border-b border-border pb-2">
              <h3 className="font-heading font-semibold text-foreground text-lg">
                {editingHighlight.id ? "Modifier le point fort" : "Nouveau point fort"}
              </h3>
              <button 
                disabled={translatingHL}
                onClick={handleTranslateHighlight}
                className="text-xs flex items-center gap-1.5 bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1.5 rounded-sm transition-colors font-medium disabled:opacity-50"
              >
                {translatingHL ? "..." : "✨ Auto-Traduire EN"}
              </button>
            </div>
            <div>
              <label className="block text-xs font-body uppercase tracking-widest text-muted-foreground mb-2">Icône</label>
              <select
                value={editingHighlight.icon || "BookOpen"}
                onChange={(e) => setEditingHighlight({ ...editingHighlight, icon: e.target.value })}
                className="w-full bg-secondary/50 border border-border rounded-sm px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary"
              >
                {iconOptions.map((icon) => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
            </div>
            <Field label="Label (FR)" value={editingHighlight.label_fr || ""} onChange={(v) => setEditingHighlight({ ...editingHighlight, label_fr: v })} />
            <Field label="Label (EN)" value={editingHighlight.label_en || ""} onChange={(v) => setEditingHighlight({ ...editingHighlight, label_en: v })} />
            <Field label="Détail (FR)" value={editingHighlight.detail_fr || ""} onChange={(v) => setEditingHighlight({ ...editingHighlight, detail_fr: v })} />
            <Field label="Detail (EN)" value={editingHighlight.detail_en || ""} onChange={(v) => setEditingHighlight({ ...editingHighlight, detail_en: v })} />
            <div>
              <label className="block text-xs font-body uppercase tracking-widest text-muted-foreground mb-2">Ordre</label>
              <input
                type="number"
                value={editingHighlight.sort_order || 0}
                onChange={(e) => setEditingHighlight({ ...editingHighlight, sort_order: Number(e.target.value) })}
                className="w-full bg-secondary/50 border border-border rounded-sm px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={handleSaveHighlight} disabled={savingHL || translatingHL} className="inline-flex items-center gap-2 bg-primary text-primary-foreground py-2 px-6 text-sm font-medium hover:bg-primary/90 transition-colors rounded-sm disabled:opacity-60">
                <Save size={16} /> {savingHL ? "..." : "Sauvegarder"}
              </button>
              <button onClick={() => setEditingHighlight(null)} className="py-2 px-6 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-sm transition-colors">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AdminAbout;
