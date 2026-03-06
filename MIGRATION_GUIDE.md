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

## Dépannage — Erreur "policy already exists"

Si tu obtiens une erreur du type :

```
ERROR: policy "Public can read published articles" for table "articles" already exists (SQLSTATE 42710)
```

C'est parce que la table `articles` et ses policies existent déjà dans ta base distante.  
La migration `001_initial_articles.sql` a été corrigée avec `DROP POLICY IF EXISTS` pour être rejouable.

Pour forcer la ré-application, lance :

```powershell
npx supabase db push
```

Si l'erreur persiste, utilise la méthode alternative ci-dessous.

---

## Alternative — SQL Editor

Si le CLI ne fonctionne pas, tu peux copier-coller le contenu de `supabase/migrations/002_full_dynamic_i18n.sql` directement dans le **SQL Editor** du dashboard Supabase :

1. Va sur [https://supabase.com/dashboard/project/ytteogphzphdfkjxglxn/sql](https://supabase.com/dashboard/project/ytteogphzphdfkjxglxn/sql)
2. Clique **New query**
3. Copie-colle tout le contenu du fichier SQL
4. Clique **Run**
5. Tu devrais voir "Success. No rows returned"
