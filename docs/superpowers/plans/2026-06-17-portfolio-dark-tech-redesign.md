# Portfolio "Dark Tech Lab" — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transformer le portfolio Astro minimaliste de Victor Giordani en un site dark-tech ultra-moderne, ultra-clean, avec effets signature (spotlight souris, cartes tilt, reveals au scroll, marquee de stack) et nouvelles sections Stack + Contact.

**Architecture:** On garde 100% Astro + Tailwind v4. Le contenu reste piloté par `src/config/index.ts`. On réécrit le thème global (`global.css`) en dark + tokens glow, on refond chaque composant existant, on ajoute 2 composants (`Stack`, `Contact`), et on ajoute du JS vanilla scoped (pattern `<script>` déjà utilisé dans `Header.astro`) pour les interactions. Un script global de reveals vit dans le `Layout`.

**Tech Stack:** Astro 6, Tailwind CSS v4 (`@tailwindcss/vite`), polices via `astro:assets` Font (`fontsource`), TypeScript strict, JS vanilla.

## Global Constraints

- **Pas de nouvelle dépendance npm** : JS vanilla uniquement, pas de framework/lib d'animation/WebGL.
- **Dark theme only** : fond `#0a0a0f`/noir, accent `#5755ff`. Pas de toggle clair.
- **Langue : FR** (tout le copy existant et nouveau en français).
- **`prefers-reduced-motion: reduce`** doit désactiver spotlight, tilt, marquee et reveals (état final visible directement).
- **Accessibilité** : contrastes AA sur fond sombre, focus visibles, liens externes `target="_blank" rel="noopener"`, nav clavier.
- **Porte de qualité de chaque tâche** : `pnpm build` (= `astro check && astro build`) passe **sans erreur ni warning TS**, + vérification visuelle via `pnpm dev`. Il n'existe pas de test runner ; ne pas en inventer.
- **Polices** : Space Grotesk (titres, `--font-display`) + Inter (corps, `--font-sans`).
- **Aliases TS existants** : `@components/*`, `@layouts/*`, `@icons/*`, `@types`, `@config`.
- **Placeholders GitHub/LinkedIn** : balisés par un commentaire `// TODO: remplacer par l'URL réelle`.

---

## File Structure

**Modifiés :**
- `astro.config.mjs` — remplacer les 2 polices par Space Grotesk + Inter.
- `src/styles/global.css` — réécriture complète : tokens dark/glow, utilities, keyframes (marquee, reveal), reduced-motion.
- `src/types/index.ts` — ajouter `ContactProps`, `StackItem`, étendre `SiteContent`.
- `src/config/index.ts` — ajouter `contact`, `stack`, enrichir `socialLinks`.
- `src/layouts/Layout.astro` — fond glow/grain global, polices, script global de reveals.
- `src/components/Header.astro` — blur au scroll, nav mise à jour, styles dark.
- `src/components/Hero.astro` — refonte + CTA + spotlight souris.
- `src/components/Section.astro` — styles dark + classe reveal.
- `src/components/Projects.astro` — cartes glass tilt/spotlight.
- `src/components/Experience.astro` — timeline verticale dark.
- `src/components/About.astro` — refonte dark + glow.
- `src/components/Footer.astro` — refonte dark minimal.
- `src/pages/index.astro` — réordonner sections + monter Stack/Contact.

**Créés :**
- `src/components/Stack.astro` — section marquee de technos.
- `src/components/Contact.astro` — bloc contact (email + copier + liens).

---

## Task 1: Polices + tokens dark + types/config

Pose la fondation : polices tech, thème dark, et le modèle de données (contact + stack + liens).

**Files:**
- Modify: `astro.config.mjs`
- Modify: `src/styles/global.css` (réécriture)
- Modify: `src/types/index.ts`
- Modify: `src/config/index.ts`
- Modify: `src/layouts/Layout.astro:30-31` (les 2 `<Font>`)

**Interfaces:**
- Consumes: rien (1re tâche).
- Produces:
  - CSS custom props/utilities : `--font-display`, `--font-sans`, `--color-accent` (`#5755ff`), `--color-bg` (`#0a0a0f`), `--color-surface`, `--color-border`, `--color-fg`, `--color-muted`. Classes utilitaires `.reveal`, `.glass`, `.glow-radial`. Keyframes `marquee`, `reveal-up`.
  - Types : `ContactProps { email: string }`, `StackItem { name: string; logo?: string }`, `SiteContent.contact: ContactProps`, `SiteContent.stack: StackItem[]`.
  - Config : `SITE_CONTENT.contact`, `SITE_CONTENT.stack`, `SITE_CONFIG.socialLinks` enrichi (GitHub/LinkedIn placeholders + Hugging Face).

- [ ] **Step 1: Remplacer les polices dans `astro.config.mjs`**

Remplacer le tableau `fonts` par :

```js
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Space Grotesk",
      cssVariable: "--font-space-grotesk",
      fallbacks: ["ui-sans-serif", "system-ui", "sans-serif"],
      weights: [400, 500, 700],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Inter",
      cssVariable: "--font-inter",
      fallbacks: ["system-ui", "sans-serif"],
      weights: [400, 500, 600],
    },
  ],
```

- [ ] **Step 2: Mettre à jour les `<Font>` dans `Layout.astro`**

Remplacer les 2 lignes :
```astro
    <Font cssVariable="--font-gabarito" preload />
    <Font cssVariable="--font-be-vietnam-pro" preload />
```
par :
```astro
    <Font cssVariable="--font-space-grotesk" preload />
    <Font cssVariable="--font-inter" preload />
```

- [ ] **Step 3: Réécrire `src/styles/global.css`**

Remplacer tout le fichier par :

```css
@import "tailwindcss";

@theme inline {
  --font-sans: var(--font-inter);
  --font-display: var(--font-space-grotesk);

  /* Dark Tech Lab palette */
  --color-bg: #0a0a0f;
  --color-surface: #12121a;
  --color-border: rgba(255, 255, 255, 0.08);
  --color-fg: #f4f4f6;
  --color-muted: #a1a1aa;
  --color-accent: #5755ff;
  --color-accent-soft: #8b8bff;

  --text-xs: 0.8125rem;
  --text-sm: 0.9375rem;
  --text-base: 1.0625rem;
  --text-lg: 1.25rem;
  --text-xl: 1.5rem;
  --text-2xl: 1.875rem;
  --text-3xl: 2.25rem;
  --text-4xl: 2.75rem;
  --text-5xl: 3.5rem;
  --text-6xl: 4.5rem;
  --text-7xl: 5.5rem;
  --text-8xl: 7rem;

  --tracking-tightest: -0.04em;
  --tracking-tighter: -0.02em;
  --tracking-tight: -0.01em;

  --animate-marquee: marquee 30s linear infinite;

  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  @keyframes reveal-up {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
}

html {
  background-color: var(--color-bg);
  color-scheme: dark;
}

body {
  color: var(--color-fg);
}

/* Cartes / surfaces en verre dépoli */
.glass {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.05),
    rgba(255, 255, 255, 0.02)
  );
  border: 1px solid var(--color-border);
  backdrop-filter: blur(12px);
}

/* Halo radial glow réutilisable (positionné par l'élément parent) */
.glow-radial {
  background: radial-gradient(
    circle at center,
    color-mix(in srgb, var(--color-accent) 45%, transparent),
    transparent 70%
  );
  filter: blur(64px);
  pointer-events: none;
}

/* Reveal au scroll : état initial caché, .is-visible déclenche l'anim */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 600ms ease, transform 600ms ease;
  will-change: opacity, transform;
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
  .animate-marquee,
  [class*="animate-"] {
    animation: none !important;
  }
  html {
    scroll-behavior: auto;
  }
}
```

- [ ] **Step 4: Étendre `src/types/index.ts`**

Ajouter ces interfaces et étendre `SiteContent` :

```ts
export interface ContactProps {
  email: string;
}

export interface StackItem {
  name: string;
  logo?: string; // chemin /public ou URL ; sinon pastille texte
}
```

Et dans `SiteContent`, ajouter les deux champs :
```ts
export interface SiteContent {
  hero: HeroProps;
  experience: ExperienceProps[];
  projects: ProjectProps[];
  stack: StackItem[];
  about: AboutProps;
  contact: ContactProps;
}
```

- [ ] **Step 5: Enrichir `src/config/index.ts`**

Dans `SITE_CONFIG.socialLinks`, remplacer le tableau par (placeholders balisés) :

```ts
  socialLinks: [
    // TODO: remplacer par l'URL réelle
    { text: "GitHub", href: "https://github.com/USERNAME" },
    // TODO: remplacer par l'URL réelle
    { text: "LinkedIn", href: "https://www.linkedin.com/in/USERNAME" },
    {
      text: "Hugging Face",
      href: "https://huggingface.co/spaces/BobbyBobby01/swiss-real-estate-analyser",
    },
  ],
```

Dans `SITE_CONTENT`, ajouter `stack` (avant `about`) et `contact` (après `about`) :

```ts
  stack: [
    { name: "Python" },
    { name: "PyTorch" },
    { name: "Pandas" },
    { name: "scikit-learn" },
    { name: "LLM / RAG" },
    { name: "TypeScript" },
    { name: "Astro" },
    { name: "SQL" },
    { name: "Git" },
    { name: "Docker" },
  ],
```

```ts
  contact: {
    email: "vgfxgpt@gmail.com",
  },
```

- [ ] **Step 6: Build + vérification**

Run: `pnpm build`
Expected: build PASS, aucune erreur `astro check`. (Le rendu changera aux tâches suivantes ; ici on valide que polices/tokens/types/config compilent.)

- [ ] **Step 7: Commit**

```bash
git add astro.config.mjs src/styles/global.css src/types/index.ts src/config/index.ts src/layouts/Layout.astro
git commit -m "feat: dark tech tokens, fonts, contact + stack data model"
```

---

## Task 2: Layout — fond glow global + script reveals

Met en place le décor global (halos glow, grain) et le moteur de reveals au scroll partagé.

**Files:**
- Modify: `src/layouts/Layout.astro`

**Interfaces:**
- Consumes: tokens/classes de Task 1 (`.glow-radial`, `.reveal`, `--color-bg`).
- Produces: comportement global — tout élément avec la classe `.reveal` reçoit `.is-visible` quand il entre dans le viewport. Largeur de contenu passée de `max-w-3xl` à `max-w-5xl`.

- [ ] **Step 1: Mettre à jour le `<body>` et `<main>` de `Layout.astro`**

Remplacer le bloc `<body>...</body>` par :

```astro
  <body class="relative min-h-screen overflow-x-hidden bg-bg font-sans antialiased">
    <!-- Halos glow décoratifs (sous le contenu) -->
    <div aria-hidden="true" class="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div class="glow-radial absolute -top-32 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 opacity-40"></div>
      <div class="glow-radial absolute top-1/3 -right-40 h-[32rem] w-[32rem] opacity-20"></div>
    </div>

    <Header siteLogo={siteLogo} navLinks={navLinks} />
    <main class="mx-auto max-w-5xl px-5">
      <slot />
    </main>
    <Footer author={author} socialLinks={socialLinks} />

    <script>
      const els = document.querySelectorAll<HTMLElement>(".reveal");
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReduced || els.length === 0) {
        els.forEach((el) => el.classList.add("is-visible"));
      } else {
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                io.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.15 },
        );
        els.forEach((el) => io.observe(el));
      }
    </script>
  </body>
```

- [ ] **Step 2: Build + visual check**

Run: `pnpm build && pnpm dev`
Expected: build PASS. Sur `localhost`, fond noir avec 2 halos violets flous visibles derrière le contenu. (Les `.reveal` n'existent pas encore → rien ne disparaît.)

- [ ] **Step 3: Commit**

```bash
git add src/layouts/Layout.astro
git commit -m "feat: global glow background + scroll reveal engine"
```

---

## Task 3: Header — blur au scroll + nav dark

**Files:**
- Modify: `src/components/Header.astro`

**Interfaces:**
- Consumes: tokens Task 1, `navLinks` (config). La nav pointe vers `#projects`, `#stack`, `#experience`, `#about`, `#contact` (les `href` viennent du config — voir Task 11 pour l'ordre/labels).
- Produces: header sticky avec fond qui passe en `glass` après 24px de scroll (classe `.scrolled` togglée en JS).

- [ ] **Step 1: Remplacer le `<header>` de `Header.astro`**

Remplacer la balise ouvrante `<header ...>` par :

```astro
<header
  id="site-header"
  class="sticky top-0 z-50 mx-auto flex max-w-5xl items-center justify-between border-b border-transparent px-5 py-5 transition-all duration-300"
>
```

Et le `<style>` en fin de fichier : remplacer son contenu par :

```css
  #site-header.scrolled {
    background: color-mix(in srgb, var(--color-bg) 70%, transparent);
    backdrop-filter: blur(12px);
    border-bottom-color: var(--color-border);
  }
```

(Supprimer l'ancienne règle `animation-timeline: scroll()` et la classe `animate-slide-in` sur le header.)

- [ ] **Step 2: Mettre à jour les couleurs de la nav**

Dans le `<nav>`, remplacer `bg-black` par `bg-surface`, `border-neutral/40` par `border-border`, `text-neutral` par `text-muted`. Dans les liens `nav-item`, `after:text-primary` → `after:text-accent`, `hover:text-white` → `hover:text-fg`.

- [ ] **Step 3: Ajouter le toggle `.scrolled` dans le `<script>`**

Ajouter en haut du `<script>` existant :

```ts
  const header = document.querySelector("#site-header");
  const onScroll = () => {
    if (window.scrollY > 24) header?.classList.add("scrolled");
    else header?.classList.remove("scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
```

Dans l'observer de nav existant, remplacer `"text-white"` par `"text-fg"` et `"md:after:opacity-100"` reste.

- [ ] **Step 4: Build + visual check**

Run: `pnpm build && pnpm dev`
Expected: build PASS. Header transparent en haut, devient verre flou au scroll. Menu mobile fonctionne.

- [ ] **Step 5: Commit**

```bash
git add src/components/Header.astro
git commit -m "feat: header blur-on-scroll + dark nav"
```

---

## Task 4: Hero — refonte + CTA + spotlight souris

**Files:**
- Modify: `src/components/Hero.astro`

**Interfaces:**
- Consumes: `HeroProps` (`name`, `specialty`, `summary`), tokens Task 1.
- Produces: section `id="hero"` avec 2 CTA (`#projects`, `#contact`) et un halo spotlight piloté par les CSS vars `--mx`/`--my` au `mousemove`.

- [ ] **Step 1: Réécrire `src/components/Hero.astro`**

```astro
---
import type { HeroProps } from "@types";
type Props = HeroProps;

const { name, specialty, summary } = Astro.props;
---

<section
  id="hero"
  class="group relative overflow-hidden py-28 md:py-40"
  data-spotlight
>
  <div
    aria-hidden="true"
    class="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
    style="background: radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--color-accent) 25%, transparent), transparent 70%);"
  >
  </div>

  <p class="reveal mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-muted">
    <span class="h-2 w-2 rounded-full bg-accent"></span>
    Disponible pour des projets data & IA
  </p>

  <h1 class="reveal mb-3 font-display text-6xl font-bold tracking-tightest text-fg sm:text-7xl md:text-8xl">
    {name}
  </h1>
  <p class="reveal mb-8 font-display text-3xl font-bold tracking-tighter text-accent sm:text-4xl md:text-5xl">
    {specialty}
  </p>
  <p class="reveal mb-12 max-w-2xl text-base text-muted md:text-lg">
    {summary}
  </p>

  <div class="reveal flex flex-wrap gap-4">
    <a
      href="#projects"
      class="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:scale-105 hover:bg-accent-soft"
    >
      Voir mes projets
    </a>
    <a
      href="#contact"
      class="rounded-full border border-border px-6 py-3 text-sm font-semibold text-fg transition-colors duration-200 hover:border-accent hover:text-accent"
    >
      Me contacter
    </a>
  </div>
</section>

<script>
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (!prefersReduced) {
    const hero = document.querySelector<HTMLElement>("[data-spotlight]");
    hero?.addEventListener("mousemove", (e) => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty("--mx", `${e.clientX - r.left}px`);
      hero.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  }
</script>
```

- [ ] **Step 2: Build + visual check**

Run: `pnpm build && pnpm dev`
Expected: build PASS. Hero avec badge, gros titre, 2 boutons. Au survol desktop, un halo suit la souris. Les `.reveal` apparaissent au chargement.

- [ ] **Step 3: (Optionnel) Affiner avec MCP magic**

Si tu veux pousser le wow, utiliser `mcp__magic__21st_magic_component_refiner` sur cette section pour proposer une variante, puis garder le meilleur. Ne pas ajouter de dépendance.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.astro
git commit -m "feat: hero redesign with CTAs + mouse spotlight"
```

---

## Task 5: Section + Projects — cartes glass tilt/spotlight

**Files:**
- Modify: `src/components/Section.astro`
- Modify: `src/components/Projects.astro`

**Interfaces:**
- Consumes: `ProjectProps[]`, tokens Task 1.
- Produces: `<Section>` réutilisable avec titre dark + classe `.reveal`. Cartes projets avec effet tilt + spotlight local (CSS vars `--mx`/`--my` par carte, `data-tilt`).

- [ ] **Step 1: Réécrire `src/components/Section.astro`**

```astro
---
interface Props {
  text: string;
  href: string;
}

const { text, href } = Astro.props;
---

<section id={href} class="py-24">
  <h2 class="reveal mb-12 font-display text-4xl font-bold tracking-tighter text-fg md:text-5xl">
    {text}
  </h2>
  <slot />
</section>
```

- [ ] **Step 2: Réécrire `src/components/Projects.astro`**

```astro
---
import Section from "./Section.astro";
import type { ProjectProps } from "@types";

interface Props {
  projects: ProjectProps[];
}

const { projects } = Astro.props;
---

<Section text="Projets" href="projects">
  <div class="grid gap-6 sm:grid-cols-2">
    {
      projects.map(({ name, summary, linkPreview, linkSource, tags }) => (
        <article
          data-tilt
          class="reveal group glass relative overflow-hidden rounded-2xl p-6 transition-transform duration-200 will-change-transform"
        >
          <div
            aria-hidden="true"
            class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style="background: radial-gradient(300px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--color-accent) 18%, transparent), transparent 70%);"
          />
          <h3 class="relative mb-3 font-display text-2xl font-medium text-fg">
            {name}
          </h3>
          <p class="relative mb-5 text-base text-muted">{summary}</p>
          {tags ? (
            <ul class="relative mb-5 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li class="rounded-full border border-accent/30 px-3 py-1 text-xs text-accent-soft">
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
          <div class="relative flex gap-5 text-sm font-medium">
            {linkSource ? (
              <a
                href={linkSource}
                target="_blank"
                rel="noopener"
                class="text-fg hover:text-accent"
              >
                Source ↗
              </a>
            ) : null}
            {linkPreview ? (
              <a
                href={linkPreview}
                target="_blank"
                rel="noopener"
                class="text-fg hover:text-accent"
              >
                Ouvrir ↗
              </a>
            ) : null}
          </div>
        </article>
      ))
    }
  </div>
</Section>

<script>
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (!prefersReduced) {
    document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        card.style.setProperty("--mx", `${x}px`);
        card.style.setProperty("--my", `${y}px`);
        const rx = ((y / r.height) - 0.5) * -6;
        const ry = ((x / r.width) - 0.5) * 6;
        card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }
</script>
```

- [ ] **Step 3: Build + visual check**

Run: `pnpm build && pnpm dev`
Expected: build PASS. Grille de 4 cartes verre dépoli. Au survol : léger tilt 3D + halo qui suit la souris. Tags et liens visibles.

- [ ] **Step 4: Commit**

```bash
git add src/components/Section.astro src/components/Projects.astro
git commit -m "feat: glass project cards with tilt + spotlight"
```

---

## Task 6: Stack — marquee de technos

**Files:**
- Create: `src/components/Stack.astro`

**Interfaces:**
- Consumes: `StackItem[]` (config), tokens Task 1, animation `--animate-marquee`.
- Produces: composant `<Stack stack={...} />` — bandeau défilant infini de pastilles technos.

- [ ] **Step 1: Créer `src/components/Stack.astro`**

```astro
---
import type { StackItem } from "@types";

interface Props {
  stack: StackItem[];
}

const { stack } = Astro.props;
// Dupliqué pour une boucle de marquee sans couture (translateX -50%)
const items = [...stack, ...stack];
---

<section id="stack" class="py-24">
  <h2 class="reveal mb-12 font-display text-4xl font-bold tracking-tighter text-fg md:text-5xl">
    Stack
  </h2>

  <div
    class="reveal relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
  >
    <ul class="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
      {
        items.map((item) => (
          <li class="glass flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-fg">
            {item.logo ? (
              <img
                src={item.logo}
                alt={item.name}
                width="20"
                height="20"
                class="h-5 w-5 object-contain"
              />
            ) : (
              <span class="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            )}
            {item.name}
          </li>
        ))
      }
    </ul>
  </div>
</section>
```

- [ ] **Step 2: Build + visual check**

Run: `pnpm build && pnpm dev`
Expected: build PASS (note : `Stack` n'est pas encore monté dans `index.astro` → l'afficher au besoin via une page de test, sinon validé visuellement en Task 11). Le composant compile.

- [ ] **Step 3: (Optionnel) Logos via MCP**

Pour des vrais logos, utiliser `mcp__magic__logo_search` (ex. Python, PyTorch, Docker), déposer les SVG dans `public/logos/`, et renseigner `logo: "/logos/python.svg"` dans `SITE_CONTENT.stack`. Le fallback pastille reste valable sinon.

- [ ] **Step 4: Commit**

```bash
git add src/components/Stack.astro
git commit -m "feat: stack marquee section"
```

---

## Task 7: Experience — timeline verticale dark

**Files:**
- Modify: `src/components/Experience.astro`

**Interfaces:**
- Consumes: `ExperienceProps[]`, `<Section>`, tokens Task 1.
- Produces: timeline verticale avec ligne + points accent.

- [ ] **Step 1: Réécrire `src/components/Experience.astro`**

```astro
---
import Section from "./Section.astro";
import type { ExperienceProps } from "@types";

interface Props {
  experience: ExperienceProps[];
}

const { experience } = Astro.props;
---

<Section text="Parcours" href="experience">
  <div class="relative border-l border-border pl-8">
    {
      experience.map(({ company, position, startDate, endDate, summary }) => (
        <div class="reveal relative mb-12 last:mb-0">
          <span class="absolute -left-[2.6rem] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-bg" />
          <span class="text-xs font-medium uppercase tracking-tight text-muted">
            {startDate} — {endDate}
          </span>
          <h3 class="mt-1 font-display text-2xl font-semibold text-fg">
            {company}
          </h3>
          <h4 class="mb-3 font-display text-lg font-medium text-accent">
            {position}
          </h4>
          {Array.isArray(summary) ? (
            <ul class="space-y-2">
              {summary.map((log) => (
                <li class="relative pl-5 text-base text-muted before:absolute before:left-0 before:text-accent before:content-['▸']">
                  {log}
                </li>
              ))}
            </ul>
          ) : (
            <p class="text-base text-muted">{summary}</p>
          )}
        </div>
      ))
    }
  </div>
</Section>
```

- [ ] **Step 2: Build + visual check**

Run: `pnpm build && pnpm dev`
Expected: build PASS. Timeline verticale avec ligne, points accent, dates, listes à puces `▸`.

- [ ] **Step 3: Commit**

```bash
git add src/components/Experience.astro
git commit -m "feat: experience vertical timeline"
```

---

## Task 8: About — refonte dark + glow

**Files:**
- Modify: `src/components/About.astro`

**Interfaces:**
- Consumes: `AboutProps & { name }`, `<Section>`, tokens Task 1.
- Produces: section about dark, visuel encadré verre + halo.

- [ ] **Step 1: Réécrire `src/components/About.astro`**

```astro
---
import Section from "./Section.astro";
import type { AboutProps, HeroProps } from "@types";

type Props = AboutProps & Pick<HeroProps, "name">;

const { description, image, name } = Astro.props;
---

<Section text="À propos" href="about">
  <div class="flex flex-col items-center gap-12 md:flex-row md:items-start md:gap-12">
    <p class="reveal whitespace-pre-line text-base leading-relaxed text-muted md:flex-1">
      {description}
    </p>
    <div class="reveal relative shrink-0">
      <div class="glow-radial absolute inset-0 -z-10 opacity-40"></div>
      <div class="glass h-72 w-60 rounded-2xl p-3">
        <img
          class="h-full w-full rounded-xl object-cover"
          src={image}
          width="240"
          height="288"
          alt={name}
        />
      </div>
    </div>
  </div>
</Section>
```

- [ ] **Step 2: Build + visual check**

Run: `pnpm build && pnpm dev`
Expected: build PASS. Texte + cadre verre avec halo derrière. `whitespace-pre-line` préserve les paragraphes du config.

- [ ] **Step 3: Commit**

```bash
git add src/components/About.astro
git commit -m "feat: about section dark + glow frame"
```

---

## Task 9: Contact — email + copier + liens

**Files:**
- Create: `src/components/Contact.astro`

**Interfaces:**
- Consumes: `ContactProps` (`email`), `SiteConfig.socialLinks`, tokens Task 1.
- Produces: composant `<Contact email={...} socialLinks={...} />` avec CTA mailto, bouton "Copier" (JS clipboard), et liens sociaux.

- [ ] **Step 1: Créer `src/components/Contact.astro`**

```astro
---
import type { ContactProps, SiteConfig } from "@types";

type Props = ContactProps & Pick<SiteConfig, "socialLinks">;

const { email, socialLinks } = Astro.props;
---

<section id="contact" class="py-24">
  <div class="reveal glass relative overflow-hidden rounded-3xl px-6 py-16 text-center md:py-20">
    <div class="glow-radial absolute -top-20 left-1/2 h-80 w-80 -translate-x-1/2 opacity-40"></div>

    <h2 class="mb-4 font-display text-4xl font-bold tracking-tighter text-fg md:text-5xl">
      Travaillons ensemble
    </h2>
    <p class="mx-auto mb-8 max-w-xl text-base text-muted">
      Un projet data, IA ou produit web ? Écrivez-moi, je réponds vite.
    </p>

    <div class="mb-8 flex flex-wrap items-center justify-center gap-3">
      <a
        href={`mailto:${email}`}
        class="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:scale-105 hover:bg-accent-soft"
      >
        {email}
      </a>
      <button
        type="button"
        id="copy-email"
        data-email={email}
        class="rounded-full border border-border px-6 py-3 text-sm font-semibold text-fg transition-colors duration-200 hover:border-accent hover:text-accent"
      >
        Copier
      </button>
    </div>

    <ul class="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
      {
        socialLinks.map(({ text, href }) => (
          <li>
            <a
              href={href}
              target="_blank"
              rel="noopener"
              class="text-muted hover:text-accent"
            >
              {text} ↗
            </a>
          </li>
        ))
      }
    </ul>
  </div>
</section>

<script>
  const btn = document.querySelector<HTMLButtonElement>("#copy-email");
  btn?.addEventListener("click", async () => {
    const email = btn.dataset.email ?? "";
    try {
      await navigator.clipboard.writeText(email);
      const original = btn.textContent;
      btn.textContent = "Copié ✓";
      setTimeout(() => (btn.textContent = original), 1500);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  });
</script>
```

- [ ] **Step 2: Build + visual check**

Run: `pnpm build && pnpm dev`
Expected: build PASS (monté en Task 11). Le composant compile ; bouton "Copier" copie l'email et affiche "Copié ✓".

- [ ] **Step 3: Commit**

```bash
git add src/components/Contact.astro
git commit -m "feat: contact section with copy-to-clipboard"
```

---

## Task 10: Footer — dark minimal

**Files:**
- Modify: `src/components/Footer.astro`

**Interfaces:**
- Consumes: `author`, `socialLinks`, tokens Task 1.
- Produces: footer dark minimal cohérent.

- [ ] **Step 1: Réécrire le corps de `src/components/Footer.astro`**

Remplacer la balise `<footer>...</footer>` par :

```astro
<footer class="mx-auto mt-16 max-w-5xl border-t border-border px-5 pt-8 pb-12 text-center">
  <ul class="mb-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
    {
      socialLinks.map(({ text, href }) => (
        <li>
          <a
            href={href}
            target="_blank"
            rel="noopener"
            class="text-muted hover:text-accent"
          >
            {text}
          </a>
        </li>
      ))
    }
  </ul>
  <p class="text-xs text-muted">{author} © {currentYear}</p>
</footer>
```

- [ ] **Step 2: Build + visual check**

Run: `pnpm build && pnpm dev`
Expected: build PASS. Footer dark, liens muted → accent au survol.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.astro
git commit -m "feat: dark minimal footer"
```

---

## Task 11: Assembly — réordonner index + nav, vérif finale

Monte Stack + Contact, applique le nouvel ordre des sections et synchronise la nav.

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/config/index.ts` (navLinks)

**Interfaces:**
- Consumes: tous les composants des tâches précédentes.
- Produces: page finale assemblée, nav cohérente avec les `id` de sections (`projects`, `stack`, `experience`, `about`, `contact`).

- [ ] **Step 1: Mettre à jour `navLinks` dans `src/config/index.ts`**

```ts
  navLinks: [
    { text: "Projets", href: "#projects" },
    { text: "Stack", href: "#stack" },
    { text: "Parcours", href: "#experience" },
    { text: "À propos", href: "#about" },
    { text: "Contact", href: "#contact" },
  ],
```

- [ ] **Step 2: Réécrire `src/pages/index.astro`**

```astro
---
import { SITE_CONFIG, SITE_CONTENT } from "@config";
import Hero from "@components/Hero.astro";
import Layout from "@layouts/Layout.astro";
import Projects from "@components/Projects.astro";
import Stack from "@components/Stack.astro";
import Experience from "@components/Experience.astro";
import About from "@components/About.astro";
import Contact from "@components/Contact.astro";

import "../styles/global.css";
---

<Layout>
  <Hero {...SITE_CONTENT.hero} />
  <Projects projects={SITE_CONTENT.projects} />
  <Stack stack={SITE_CONTENT.stack} />
  <Experience experience={SITE_CONTENT.experience} />
  <About {...SITE_CONTENT.about} name={SITE_CONTENT.hero.name} />
  <Contact email={SITE_CONTENT.contact.email} socialLinks={SITE_CONFIG.socialLinks} />
</Layout>
```

(Note : `index.astro` importe maintenant `SITE_CONFIG` en plus de `SITE_CONTENT`.)

- [ ] **Step 3: Build complet**

Run: `pnpm build`
Expected: build PASS, zéro erreur `astro check`.

- [ ] **Step 4: Vérif visuelle complète**

Run: `pnpm dev`
Vérifier dans l'ordre :
- Hero (badge, CTA, spotlight souris).
- Projets (grille cartes, tilt+spotlight).
- Stack (marquee défilant, pause au survol).
- Parcours (timeline).
- À propos (cadre + glow).
- Contact (mailto + bouton Copier fonctionne).
- Footer.
- Nav : clics scrollent vers les bonnes sections, lien actif surligné.
- Menu mobile (largeur réduite).

- [ ] **Step 5: Vérif `prefers-reduced-motion`**

Activer la réduction de mouvement (DevTools → Rendering → Emulate `prefers-reduced-motion: reduce`).
Expected: pas de spotlight/tilt/marquee/reveal animés ; tout le contenu visible directement.

- [ ] **Step 6: Commit**

```bash
git add src/pages/index.astro src/config/index.ts
git commit -m "feat: assemble dark tech portfolio, wire nav + new sections"
```

---

## Self-Review (effectuée)

**Spec coverage :**
- Direction visuelle dark/glow/glass/typo → Task 1, 2. ✅
- 5 effets signature : spotlight Task 4, tilt+spotlight cartes Task 5, reveals Task 2, marquee Task 6, micro-hover (toutes tâches). ✅
- Sections Header/Hero/Projets/Stack/Parcours/About/Contact/Footer → Task 3–11. ✅
- Données contact/stack/social placeholders → Task 1. ✅
- Accessibilité `prefers-reduced-motion`/AA/clavier → tokens Task 1, scripts gardés, vérif Task 11. ✅
- Perf (pas de lib) → Global Constraints, respecté. ✅
- SEO/OG conservés → `Layout.astro` head non modifié (sauf `<Font>`). ✅
- Scope exclusions (pas de WebGL/CMS/i18n/form serveur) → respecté. ✅

**Placeholder scan :** seuls placeholders = URLs GitHub/LinkedIn, balisées `// TODO: remplacer` (intentionnel, conforme au spec). Aucun "TBD/handle edge cases" générique.

**Type consistency :** `StackItem`/`ContactProps` définis Task 1, consommés Task 6/9/11 avec les mêmes noms. `socialLinks` (forme `{text, href}[]`) cohérente Header/Contact/Footer. `--color-*` et classes `.glass`/`.reveal`/`.glow-radial` définies Task 1, réutilisées partout.
