import { supabase } from "./supabase";

// =============================================================================
// TYPES
// =============================================================================

export interface HeroData {
  id: string;
  title_fr: string;
  title_en: string;
  subtitle_fr: string;
  subtitle_en: string;
  description_fr: string;
  description_en: string;
  portrait_url?: string;
  bg_url?: string;
  updated_at: string;
}

export interface AboutData {
  id: string;
  section_title_fr: string;
  section_title_en: string;
  heading_fr: string;
  heading_en: string;
  paragraph1_fr: string;
  paragraph1_en: string;
  paragraph2_fr: string;
  paragraph2_en: string;
  paragraph3_fr: string;
  paragraph3_en: string;
  updated_at: string;
}

export interface Highlight {
  id: string;
  icon: string;
  label_fr: string;
  label_en: string;
  detail_fr: string;
  detail_en: string;
  sort_order: number;
  created_at: string;
}

export interface ParcoursItem {
  id: string;
  year: string;
  title_fr: string;
  title_en: string;
  category: string;
  sort_order: number;
  created_at: string;
}

export interface Publication {
  id: string;
  icon: string;
  type_fr: string;
  type_en: string;
  title_fr: string;
  title_en: string;
  detail_fr: string;
  detail_en: string;
  sort_order: number;
  created_at: string;
}

export interface ContactInfo {
  id: string;
  email: string;
  location_fr: string;
  location_en: string;
  linkedin_url: string;
  description_fr: string;
  description_en: string;
  updated_at: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value_fr: string;
  value_en: string;
  updated_at: string;
}

// =============================================================================
// HERO
// =============================================================================

export const getHero = async (): Promise<HeroData | null> => {
  const { data, error } = await supabase.from("hero").select("*").single();
  if (error) return null;
  return data as HeroData;
};

export const updateHero = async (
  id: string,
  updates: Partial<Omit<HeroData, "id" | "updated_at">>
): Promise<HeroData> => {
  const { data, error } = await supabase
    .from("hero")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as HeroData;
};

// =============================================================================
// ABOUT
// =============================================================================

export const getAbout = async (): Promise<AboutData | null> => {
  const { data, error } = await supabase.from("about").select("*").single();
  if (error) return null;
  return data as AboutData;
};

export const updateAbout = async (
  id: string,
  updates: Partial<Omit<AboutData, "id" | "updated_at">>
): Promise<AboutData> => {
  const { data, error } = await supabase
    .from("about")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as AboutData;
};

// =============================================================================
// HIGHLIGHTS
// =============================================================================

export const getHighlights = async (): Promise<Highlight[]> => {
  const { data, error } = await supabase
    .from("highlights")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data as Highlight[];
};

export const getHighlightById = async (id: string): Promise<Highlight | null> => {
  const { data, error } = await supabase.from("highlights").select("*").eq("id", id).single();
  if (error) return null;
  return data as Highlight;
};

export const createHighlight = async (
  item: Omit<Highlight, "id" | "created_at">
): Promise<Highlight> => {
  const { data, error } = await supabase.from("highlights").insert([item]).select().single();
  if (error) throw error;
  return data as Highlight;
};

export const updateHighlight = async (
  id: string,
  updates: Partial<Omit<Highlight, "id" | "created_at">>
): Promise<Highlight> => {
  const { data, error } = await supabase
    .from("highlights")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as Highlight;
};

export const deleteHighlight = async (id: string): Promise<void> => {
  const { error } = await supabase.from("highlights").delete().eq("id", id);
  if (error) throw error;
};

// =============================================================================
// PARCOURS
// =============================================================================

export const getParcours = async (): Promise<ParcoursItem[]> => {
  const { data, error } = await supabase
    .from("parcours")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data as ParcoursItem[];
};

export const getParcoursById = async (id: string): Promise<ParcoursItem | null> => {
  const { data, error } = await supabase.from("parcours").select("*").eq("id", id).single();
  if (error) return null;
  return data as ParcoursItem;
};

export const createParcours = async (
  item: Omit<ParcoursItem, "id" | "created_at">
): Promise<ParcoursItem> => {
  const { data, error } = await supabase.from("parcours").insert([item]).select().single();
  if (error) throw error;
  return data as ParcoursItem;
};

export const updateParcours = async (
  id: string,
  updates: Partial<Omit<ParcoursItem, "id" | "created_at">>
): Promise<ParcoursItem> => {
  const { data, error } = await supabase
    .from("parcours")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as ParcoursItem;
};

export const deleteParcours = async (id: string): Promise<void> => {
  const { error } = await supabase.from("parcours").delete().eq("id", id);
  if (error) throw error;
};

// =============================================================================
// PUBLICATIONS
// =============================================================================

export const getPublications = async (): Promise<Publication[]> => {
  const { data, error } = await supabase
    .from("publications")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data as Publication[];
};

export const getPublicationById = async (id: string): Promise<Publication | null> => {
  const { data, error } = await supabase.from("publications").select("*").eq("id", id).single();
  if (error) return null;
  return data as Publication;
};

export const createPublication = async (
  item: Omit<Publication, "id" | "created_at">
): Promise<Publication> => {
  const { data, error } = await supabase.from("publications").insert([item]).select().single();
  if (error) throw error;
  return data as Publication;
};

export const updatePublication = async (
  id: string,
  updates: Partial<Omit<Publication, "id" | "created_at">>
): Promise<Publication> => {
  const { data, error } = await supabase
    .from("publications")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as Publication;
};

export const deletePublication = async (id: string): Promise<void> => {
  const { error } = await supabase.from("publications").delete().eq("id", id);
  if (error) throw error;
};

// =============================================================================
// CONTACT INFO
// =============================================================================

export const getContactInfo = async (): Promise<ContactInfo | null> => {
  const { data, error } = await supabase.from("contact_info").select("*").single();
  if (error) return null;
  return data as ContactInfo;
};

export const updateContactInfo = async (
  id: string,
  updates: Partial<Omit<ContactInfo, "id" | "updated_at">>
): Promise<ContactInfo> => {
  const { data, error } = await supabase
    .from("contact_info")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as ContactInfo;
};

// =============================================================================
// SITE SETTINGS
// =============================================================================

export const getSiteSettings = async (): Promise<SiteSetting[]> => {
  const { data, error } = await supabase.from("site_settings").select("*");
  if (error) throw error;
  return data as SiteSetting[];
};

export const getSetting = async (key: string): Promise<SiteSetting | null> => {
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("key", key)
    .single();
  if (error) return null;
  return data as SiteSetting;
};

export const updateSetting = async (
  id: string,
  updates: Partial<Pick<SiteSetting, "value_fr" | "value_en">>
): Promise<SiteSetting> => {
  const { data, error } = await supabase
    .from("site_settings")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as SiteSetting;
};

export const upsertSetting = async (
  key: string,
  value_fr: string,
  value_en: string
): Promise<SiteSetting> => {
  const { data, error } = await supabase
    .from("site_settings")
    .upsert({ key, value_fr, value_en, updated_at: new Date().toISOString() }, { onConflict: "key" })
    .select()
    .single();
  if (error) throw error;
  return data as SiteSetting;
};
