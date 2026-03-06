# Guide de migration Supabase

## Étape 1 — Se connecter au CLI

```powershell
npx supabase login
```

Ça va ouvrir ton navigateur. Connecte-toi avec ton compte Supabase et autorise l'accès.

---

## Étape 2 — Lier le projet

```powershell
npx supabase link --project-ref ytteogphzphdfkjxglxn
```

Il te demandera le **mot de passe de la base de données** (celui défini à la création du projet Supabase).

---

## Étape 3 — Pousser la migration

```powershell
npx supabase db push
```

Cette commande exécute les fichiers SQL dans `supabase/migrations/` sur ta base distante.  
Elle va :

- Créer 7 nouvelles tables (`site_settings`, `hero`, `about`, `highlights`, `parcours`, `publications`, `contact_info`)
- Configurer les politiques RLS (lecture publique, écriture authentifiée)
- Insérer les données initiales (seeders)
- Ajouter les colonnes `title_en`, `excerpt_en`, `content_en` sur la table `articles`

---

## Étape 4 — Vérifier

Va dans ton dashboard Supabase → **Table Editor**.  
Tu devrais voir les nouvelles tables avec ces données :

| Table           | Lignes attendues |
|-----------------|-----------------|
| `site_settings` | 4               |
| `hero`          | 1               |
| `about`         | 1               |
| `highlights`    | 4               |
| `parcours`      | 8               |
| `publications`  | 5               |
| `contact_info`  | 1               |

---

## Alternative — SQL Editor

Si le CLI ne fonctionne pas, tu peux copier-coller le contenu de `supabase/migrations/002_full_dynamic_i18n.sql` directement dans le **SQL Editor** du dashboard Supabase :

1. Va sur [https://supabase.com/dashboard/project/ytteogphzphdfkjxglxn/sql](https://supabase.com/dashboard/project/ytteogphzphdfkjxglxn/sql)
2. Clique **New query**
3. Copie-colle tout le contenu du fichier SQL
4. Clique **Run**
5. Tu devrais voir "Success. No rows returned"

 npx supabase db push
Initialising login role...
Connecting to remote database...
Do you want to push these migrations to the remote database?
 • 001_initial_articles.sql
 • 002_full_dynamic_i18n.sql

 [Y/n] Y
Applying migration 001_initial_articles.sql...
NOTICE (42P07): relation "articles" already exists, skipping
ERROR: policy "Public can read published articles" for table "articles" already exists (SQLSTATE 42710)
At statement: 2
CREATE POLICY "Public can read published articles"
  ON articles FOR SELECT
  USING (published = true)
Try rerunning the command with --debug to troubleshoot the error.
