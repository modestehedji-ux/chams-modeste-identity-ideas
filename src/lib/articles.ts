import { supabase } from './supabase';

export type ArticleCategory = "reflexion" | "actualite" | "academique";

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: ArticleCategory;
  cover_image?: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

const categoryLabels: Record<ArticleCategory, string> = {
  reflexion: "Réflexion",
  actualite: "Actualité",
  academique: "Publication académique",
};

export const getCategoryLabel = (cat: ArticleCategory) => categoryLabels[cat];

// --- Articles CRUD (Supabase) ---

export const getArticles = async (): Promise<Article[]> => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as Article[];
};

export const getPublishedArticles = async (): Promise<Article[]> => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as Article[];
};

export const getArticleBySlug = async (slug: string): Promise<Article | null> => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();
  if (error) return null;
  return data as Article;
};

export const getArticleById = async (id: string): Promise<Article | null> => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .single();
  if (error) return null;
  return data as Article;
};

export const createArticle = async (
  data: Omit<Article, 'id' | 'created_at' | 'updated_at'>
): Promise<Article> => {
  const { data: created, error } = await supabase
    .from('articles')
    .insert([data])
    .select()
    .single();
  if (error) throw error;
  return created as Article;
};

export const updateArticle = async (
  id: string,
  data: Partial<Omit<Article, 'id' | 'created_at'>>
): Promise<Article> => {
  const { data: updated, error } = await supabase
    .from('articles')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return updated as Article;
};

export const deleteArticle = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', id);
  if (error) throw error;
};

// --- Auth (Supabase Auth) ---

export const login = async (email: string, password: string): Promise<boolean> => {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  return !error;
};

export const logout = async (): Promise<void> => {
  await supabase.auth.signOut();
};

export const getSession = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session;
};
