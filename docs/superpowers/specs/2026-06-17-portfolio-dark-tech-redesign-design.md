# Portfolio Victor Giordani — Refonte "Dark Tech Lab"

**Date:** 2026-06-17
**Stack:** Astro 6 + Tailwind CSS v4 (existant)
**Objectif:** Transformer le portfolio minimaliste actuel (template AstroZen) en un site unique, ultra-moderne, ultra-clean, avec un effet "wow", aligné sur un profil Data Science & IA.

---

## 1. Direction visuelle — "Dark Tech Lab"

- **Thème sombre** : fond charbon/noir (`#0a0a0f` → `#000`), accent violet de marque `#5755ff` + variantes glow.
- **Glow néon** : halos radiaux flous animés en fond (hero + sections clés). Grain subtil pour la profondeur.
- **Glassmorphism léger** sur les cartes : verre dépoli, bordure 1px lumineuse, ombres douces.
- **Typographie** :
  - Titres / impact : **Space Grotesk**
  - Corps / lisibilité : **Inter**
  - (Remplace Gabarito + Be Vietnam Pro dans `astro.config.mjs`.)

### Tokens couleur (indicatifs)
- `--bg`: `#0a0a0f`
- `--surface`: `rgba(255,255,255,0.03)` (cartes verre)
- `--border`: `rgba(255,255,255,0.08)`
- `--accent`: `#5755ff`
- `--accent-glow`: `#5755ff` à faible opacité pour halos
- `--text`: `#f4f4f6`
- `--text-muted`: `#a1a1aa`

---

## 2. Effets signature (CSS + JS vanilla ciblé)

Niveau d'animation : **CSS + une touche JS interactive** (pas de framework JS, pas de WebGL).

1. **Spotlight souris** dans le hero — halo lumineux qui suit le curseur (JS vanilla, `mousemove` → CSS custom props).
2. **Cartes projets tilt + spotlight** au survol — léger effet 3D + halo local (JS vanilla par carte).
3. **Reveals au scroll** — fade/slide à l'apparition via `IntersectionObserver`.
4. **Bandeau stack défilant** — marquee infini CSS de logos technos.
5. **Micro-interactions hover** — liens, boutons, cartes (transitions CSS).

### Contraintes transverses
- **`prefers-reduced-motion`** : désactive spotlight, tilt, marquee et reveals (état final visible directement).
- Tous les effets JS dégradent proprement si JS désactivé (contenu visible).

---

## 3. Structure des sections

| # | Section | Contenu / notes |
|---|---------|-----------------|
| 1 | **Header** sticky | Fond blur au scroll. Nav : Projets · Stack · Parcours · À propos · Contact. Logo `victor-mark.svg`. |
| 2 | **Hero** | Nom en grand (Space Grotesk), accroche "Data Science & produits IA", sous-titre = `hero.summary`. 2 CTA : `Voir mes projets` (#projects) / `Me contacter` (#contact). Spotlight souris + halo glow. |
| 3 | **Projets en vedette** | Remontés en 2e position. 4 cartes spotlight/tilt : Polybrain, CheatSheet, Swiss Real Estate Analyser, Retractify. Tags + lien externe. |
| 4 | **Stack / Compétences** | Marquee de logos technos (Python, PyTorch/ML, LLM, Pandas, etc.) récupérés via MCP `logo_search`. Fallback : pastilles texte si logo indisponible. |
| 5 | **Parcours** | Timeline verticale : HEIG-VD, 42 Lausanne, Projets personnels (données existantes `experience`). |
| 6 | **À propos** | Texte `about.description` + visuel/glow. |
| 7 | **Contact** | Bloc CTA fort : email `vgfxgpt@gmail.com` avec bouton "copier". Liens GitHub *(placeholder)*, LinkedIn *(placeholder)*, Hugging Face. |
| 8 | **Footer** | Minimal : liens + crédit + année. |

---

## 4. Données & configuration

- Réutilise `src/config/index.ts` (`SITE_CONTENT`) comme source de vérité.
- **Ajouts au config** :
  - `contact.email = "vgfxgpt@gmail.com"`
  - `socialLinks` enrichis : GitHub *(placeholder `https://github.com/USERNAME`)*, LinkedIn *(placeholder `https://www.linkedin.com/in/USERNAME`)*, Hugging Face (existant).
  - `stack`: liste des technos pour le marquee (nom + slug logo).
- Mettre à jour les types dans `src/types/index.ts` en conséquence.

> **Placeholders à remplir par Victor** : URLs GitHub et LinkedIn (balisées clairement dans le code avec un commentaire `// TODO: remplacer`).

---

## 5. Stack technique & qualité

- **100% Astro + Tailwind v4**. JS vanilla uniquement (fichiers légers, scoped par composant ou `src/scripts/`).
- Composants signature (hero, cartes) affinés avec le MCP **magic (21st.dev)** ; logos via **logo_search**.
- **Accessibilité** : `prefers-reduced-motion`, contrastes AA sur fond sombre, navigation clavier, focus visibles, attributs ARIA sur la nav et les liens externes (`rel="noopener"`).
- **Performance** : aucune lib lourde, images optimisées (`astro:assets` si pertinent), animations GPU-friendly (`transform`/`opacity`), reveals lazy.
- **SEO** : titres/desc existants conservés, balises OG/canonical maintenues dans `Layout.astro`.

---

## 6. Périmètre (scope)

**Inclus** : refonte visuelle complète des composants existants (`Hero`, `Projects`, `Experience`, `About`, `Header`, `Footer`, `Section`, `Layout`, `global.css`), nouvelle section Stack, nouvelle section Contact, changement de polices, effets signature, config/types mis à jour.

**Exclus (YAGNI)** : CMS, i18n multi-langue (reste FR), blog, mode clair/sombre togglable (dark only), backend/formulaire de contact serveur (email = lien `mailto` + copier), WebGL/3D.

---

## 7. Critères de succès

- Le site est en dark theme cohérent avec glow violet, sur toutes les sections.
- Les 5 effets signature fonctionnent et se désactivent avec `prefers-reduced-motion`.
- Responsive impeccable (mobile → desktop), nav mobile incluse.
- `pnpm build` (`astro check && astro build`) passe sans erreur.
- Aucune régression de contenu (tous les projets, parcours, about présents).
- Placeholders GitHub/LinkedIn clairement balisés.
