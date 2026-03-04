-- Migration: 002 - Add i18n support + all dynamic sections
-- Adds: site_settings, hero, about, highlights, parcours, publications, contact_info, translations

----------------------------------------------------------------------
-- 1) SITE SETTINGS (general site configuration)
----------------------------------------------------------------------
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value_fr TEXT NOT NULL DEFAULT '',
  value_en TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Admins can manage settings" ON site_settings FOR ALL
  USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Seed default settings
INSERT INTO site_settings (key, value_fr, value_en) VALUES
  ('site_name', 'Chams Modeste HEDJI', 'Chams Modeste HEDJI'),
  ('site_subtitle', 'Diplômé en Philosophie · Juriste des droits humains (en formation) · IA Maker Bootcamp (2026) · Auteur · Acteur', 'Graduate in Philosophy · Human Rights Jurist (in training) · AI Maker Bootcamp (2026) · Author · Actor'),
  ('site_description', 'Mes travaux portent sur les questions identitaires africaines à l''ère des mutations contemporaines, dans une perspective philosophique, éthique, juridique et scientifique.', 'My work focuses on African identity issues in the era of contemporary transformations, from a philosophical, ethical, legal and scientific perspective.'),
  ('footer_tagline', 'Conçu avec passion depuis Cotonou.', 'Crafted with passion from Cotonou.');

----------------------------------------------------------------------
-- 2) HERO SECTION
----------------------------------------------------------------------
CREATE TABLE hero (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_fr TEXT NOT NULL DEFAULT '',
  title_en TEXT NOT NULL DEFAULT '',
  subtitle_fr TEXT NOT NULL DEFAULT '',
  subtitle_en TEXT NOT NULL DEFAULT '',
  description_fr TEXT NOT NULL DEFAULT '',
  description_en TEXT NOT NULL DEFAULT '',
  portrait_url TEXT,
  bg_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE hero ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read hero" ON hero FOR SELECT USING (true);
CREATE POLICY "Admins can manage hero" ON hero FOR ALL
  USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

INSERT INTO hero (title_fr, title_en, subtitle_fr, subtitle_en, description_fr, description_en) VALUES
  ('Chams Modeste HEDJI',
   'Chams Modeste HEDJI',
   'Diplômé en Philosophie · Juriste des droits humains (en formation) · IA Maker Bootcamp (2026) · Auteur · Acteur',
   'Graduate in Philosophy · Human Rights Jurist (in training) · AI Maker Bootcamp (2026) · Author · Actor',
   'Mes travaux portent sur les questions identitaires africaines à l''ère des mutations contemporaines, dans une perspective philosophique, éthique, juridique et scientifique.',
   'My work focuses on African identity issues in the era of contemporary transformations, from a philosophical, ethical, legal and scientific perspective.');

----------------------------------------------------------------------
-- 3) ABOUT SECTION
----------------------------------------------------------------------
CREATE TABLE about (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_title_fr TEXT NOT NULL DEFAULT 'À propos',
  section_title_en TEXT NOT NULL DEFAULT 'About',
  heading_fr TEXT NOT NULL DEFAULT '',
  heading_en TEXT NOT NULL DEFAULT '',
  paragraph1_fr TEXT NOT NULL DEFAULT '',
  paragraph1_en TEXT NOT NULL DEFAULT '',
  paragraph2_fr TEXT NOT NULL DEFAULT '',
  paragraph2_en TEXT NOT NULL DEFAULT '',
  paragraph3_fr TEXT NOT NULL DEFAULT '',
  paragraph3_en TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE about ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read about" ON about FOR SELECT USING (true);
CREATE POLICY "Admins can manage about" ON about FOR ALL
  USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

INSERT INTO about (heading_fr, heading_en, paragraph1_fr, paragraph1_en, paragraph2_fr, paragraph2_en, paragraph3_fr, paragraph3_en) VALUES
  ('Penser l''Afrique autrement',
   'Rethinking Africa',
   'Chams Modeste HEDJI est titulaire d''une double licence en Philosophie obtenue à l''Institut Jean-Paul II de Cotonou et à l''Université Pontificale Urbanienne. Juriste des droits humains en formation, il est actuellement auditeur en Master Droits de la Personne Humaine et Démocratie à la Chaire UNESCO.',
   'Chams Modeste HEDJI holds a double degree in Philosophy from the Jean-Paul II Institute in Cotonou and the Pontifical Urbaniana University. A human rights jurist in training, he is currently pursuing a Master''s in Human Rights and Democracy at the UNESCO Chair.',
   'Ses travaux portent sur les questions identitaires africaines à l''ère des mutations contemporaines — liées notamment à l''intelligence artificielle et aux transformations socio-culturelles — dans une perspective à la fois philosophique, éthique, juridique et scientifique. Il a également obtenu une attestation d''IA Maker Bootcamp au Centre de Recherche, d''Étude et de Créativité (CREC) de Godomey, Bénin.',
   'His work focuses on African identity issues in the era of contemporary transformations — particularly related to artificial intelligence and socio-cultural changes — from a philosophical, ethical, legal and scientific perspective. He also obtained an AI Maker Bootcamp certificate from the CREC in Godomey, Benin.',
   'Sa soutenance de fin de cycle, portant sur « De la reconquête de l''authenticité de l''être-là africain : une lecture de la Crise du Muntu de Fabien Eboussi Boulaga », a obtenu la mention Excellente.',
   'His final thesis, on "The reconquest of the authenticity of African Dasein: a reading of Fabien Eboussi Boulaga''s Crisis of the Muntu," received the highest distinction.');

----------------------------------------------------------------------
-- 4) HIGHLIGHTS (About section cards)
----------------------------------------------------------------------
CREATE TABLE highlights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  icon TEXT NOT NULL DEFAULT 'BookOpen',
  label_fr TEXT NOT NULL,
  label_en TEXT NOT NULL DEFAULT '',
  detail_fr TEXT NOT NULL,
  detail_en TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE highlights ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read highlights" ON highlights FOR SELECT USING (true);
CREATE POLICY "Admins can manage highlights" ON highlights FOR ALL
  USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

INSERT INTO highlights (icon, label_fr, label_en, detail_fr, detail_en, sort_order) VALUES
  ('GraduationCap', 'Double licence en Philosophie', 'Double Degree in Philosophy', 'Institut Jean-Paul II, Cotonou · Université Pontificale Urbanienne', 'Jean-Paul II Institute, Cotonou · Pontifical Urbaniana University', 1),
  ('Scale', 'Juriste des droits humains (en formation)', 'Human Rights Jurist (in training)', 'Master — Chaire UNESCO, Cotonou', 'Master''s — UNESCO Chair, Cotonou', 2),
  ('Theater', 'Acteur', 'Actor', 'Série "Ministre" · Deutsche Welle', '"Minister" Series · Deutsche Welle', 3),
  ('BookOpen', 'IA Maker Bootcamp', 'AI Maker Bootcamp', 'CREC, Godomey, Bénin', 'CREC, Godomey, Benin', 4);

----------------------------------------------------------------------
-- 5) PARCOURS (Timeline)
----------------------------------------------------------------------
CREATE TABLE parcours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year TEXT NOT NULL,
  title_fr TEXT NOT NULL,
  title_en TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'académique',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE parcours ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read parcours" ON parcours FOR SELECT USING (true);
CREATE POLICY "Admins can manage parcours" ON parcours FOR ALL
  USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

INSERT INTO parcours (year, title_fr, title_en, category, sort_order) VALUES
  ('2008', 'Début au Festival de Théâtre REST d''Alexandre Atindoko à Abomey', 'Debut at the REST Theatre Festival by Alexandre Atindoko in Abomey', 'art', 1),
  ('2008-2010', 'Prestations sur les scènes de Ayessi (ORTB) et Ablodé Gbadja (Canal 3)', 'Performances on Ayessi (ORTB) and Ablodé Gbadja (Canal 3) stages', 'art', 2),
  ('2014', 'Acteur dans la série "Ministre" (ORTB/A+) et feuilleton Deutsche Welle', 'Actor in the "Minister" series (ORTB/A+) and Deutsche Welle soap opera', 'art', 3),
  ('2018', 'Baccalauréat', 'Baccalaureate', 'académique', 4),
  ('2019', 'Institut de Théologie Saint-Gall de Ouidah · Finaliste national concours d''écriture', 'Saint-Gall Theology Institute, Ouidah · National writing contest finalist', 'académique', 5),
  ('2022', 'Double licence en Philosophie (mention Excellente) — Institut Jean-Paul II & Université Pontificale Urbanienne', 'Double Degree in Philosophy (Highest Distinction) — Jean-Paul II Institute & Pontifical Urbaniana University', 'académique', 6),
  ('2024', 'Publication de "Jusqu''aux enfers…" (Éditions Savanes du Continent) · Master Chaire UNESCO', 'Publication of "To the Underworld…" (Savanes du Continent Editions) · UNESCO Chair Master''s', 'publication', 7),
  ('2026', 'IA Maker Bootcamp — CREC, Godomey, Bénin', 'AI Maker Bootcamp — CREC, Godomey, Benin', 'académique', 8);

----------------------------------------------------------------------
-- 6) PUBLICATIONS (Academic publications)
----------------------------------------------------------------------
CREATE TABLE publications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  icon TEXT NOT NULL DEFAULT 'FileText',
  type_fr TEXT NOT NULL,
  type_en TEXT NOT NULL DEFAULT '',
  title_fr TEXT NOT NULL,
  title_en TEXT NOT NULL DEFAULT '',
  detail_fr TEXT NOT NULL,
  detail_en TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read publications" ON publications FOR SELECT USING (true);
CREATE POLICY "Admins can manage publications" ON publications FOR ALL
  USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

INSERT INTO publications (icon, type_fr, type_en, title_fr, title_en, detail_fr, detail_en, sort_order) VALUES
  ('BookOpen', 'Ouvrage', 'Book', 'Jusqu''aux enfers…', 'To the Underworld…', 'Pièce théâtrale — Éditions Savanes du Continent, 2024', 'Theatrical play — Savanes du Continent Editions, 2024', 1),
  ('FileText', 'Article', 'Article', 'La conception du temps en Afrique à la lumière du christianisme africain de Jacob Agossou', 'The conception of time in Africa in light of Jacob Agossou''s African Christianity', 'Revue du Philosophat, 2021', 'Revue du Philosophat, 2021', 2),
  ('FileText', 'Article (co-auteur)', 'Article (co-author)', 'La philosophie de l''inculturation dans « Gbeto et Gbedoto » de Jacob AGOSSOU', 'The philosophy of inculturation in Jacob AGOSSOU''s "Gbeto and Gbedoto"', 'Actes du Colloque Jacob AGOSSOU, 2022', 'Proceedings of the Jacob AGOSSOU Symposium, 2022', 3),
  ('FileText', 'Article (co-auteur)', 'Article (co-author)', 'Quelques tentatives d''unification politique et territoriale en Afrique', 'Some attempts at political and territorial unification in Africa', 'La Voix de Saint-Gall, 2023', 'La Voix de Saint-Gall, 2023', 4),
  ('Pen', 'Mémoire', 'Thesis', 'De la reconquête de l''authenticité de l''être-là africain : une lecture de la Crise du Muntu', 'The reconquest of the authenticity of African Dasein: a reading of the Crisis of the Muntu', 'Mention Excellente — Fabien Eboussi Boulaga, 2022', 'Highest Distinction — Fabien Eboussi Boulaga, 2022', 5);

----------------------------------------------------------------------
-- 7) CONTACT INFO
----------------------------------------------------------------------
CREATE TABLE contact_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL DEFAULT '',
  location_fr TEXT NOT NULL DEFAULT 'Cotonou, Bénin',
  location_en TEXT NOT NULL DEFAULT 'Cotonou, Benin',
  linkedin_url TEXT NOT NULL DEFAULT '',
  description_fr TEXT NOT NULL DEFAULT '',
  description_en TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read contact_info" ON contact_info FOR SELECT USING (true);
CREATE POLICY "Admins can manage contact_info" ON contact_info FOR ALL
  USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

INSERT INTO contact_info (email, location_fr, location_en, linkedin_url, description_fr, description_en) VALUES
  ('modestehedji@gmail.com', 'Cotonou, Bénin', 'Cotonou, Benin', 'https://www.linkedin.com/in/chams-modeste-hedji-49469426b/', 'Pour toute collaboration, invitation académique ou échange intellectuel, n''hésitez pas à me contacter.', 'For any collaboration, academic invitation, or intellectual exchange, feel free to contact me.');

----------------------------------------------------------------------
-- 8) Add i18n columns to articles table
----------------------------------------------------------------------
ALTER TABLE articles ADD COLUMN IF NOT EXISTS title_en TEXT NOT NULL DEFAULT '';
ALTER TABLE articles ADD COLUMN IF NOT EXISTS excerpt_en TEXT NOT NULL DEFAULT '';
ALTER TABLE articles ADD COLUMN IF NOT EXISTS content_en TEXT NOT NULL DEFAULT '';
