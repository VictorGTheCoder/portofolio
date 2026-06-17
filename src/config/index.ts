import type { SiteConfig, SiteContent } from "../types";

export const SITE_CONFIG: SiteConfig = {
  title: "Victor Giordani — Data Science & IA",
  author: "Victor Giordani",
  description:
    "Portfolio de Victor Giordani, étudiant en data science à la HEIG-VD, formé au tronc commun de 42 Lausanne et créateur de projets IA orientés produit.",
  lang: "fr",
  siteLogo: "/victor-mark.svg",
  navLinks: [
    { text: "Parcours", href: "#experience" },
    { text: "Projets", href: "#projects" },
    { text: "À propos", href: "#about" },
  ],
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
  socialImage: "/victor-mark.svg",
  canonicalURL: "https://polybrain.ch",
};

export const SITE_CONTENT: SiteContent = {
  hero: {
    name: "Victor Giordani",
    specialty: "Data Science & produits IA",
    summary:
      "Étudiant en data science à la HEIG-VD, passé par le tronc commun de 42 Lausanne. Je construis des outils concrets autour de l'IA, de l'analyse de données et de l'automatisation.",
  },
  experience: [
    {
      company: "HEIG-VD",
      position: "Étudiant en Data Science",
      startDate: "Aujourd'hui",
      endDate: "En cours",
      summary: [
        "Formation orientée statistiques, machine learning, ingénierie logicielle et exploitation de données.",
        "Intérêt particulier pour les systèmes IA utiles: recherche, scoring, automatisation et interfaces simples à utiliser.",
      ],
    },
    {
      company: "42 Lausanne",
      position: "Tronc commun",
      startDate: "Avant la HEIG",
      endDate: "Réalisé",
      summary: [
        "Apprentissage intensif par projets: C, algorithmique, structures de données, Unix et rigueur de développement.",
        "Travail en autonomie, peer learning et résolution de problèmes sous contraintes.",
      ],
    },
    {
      company: "Projets personnels",
      position: "Créateur d'outils data et IA",
      startDate: "En parallèle",
      endDate: "Continu",
      summary:
        "Développement de produits comme Polybrain, CheatSheet et Swiss Real Estate Analyser, avec un focus sur l'utilité, l'automatisation et l'expérience utilisateur.",
    },
  ],
  projects: [
    {
      name: "Polybrain",
      summary:
        "Assistant IA web pensé comme un espace de travail: conversations, outils de productivité et interface orientée usage quotidien.",
      linkPreview: "https://polybrain.ch",
      tags: ["IA", "Produit web", "Automation"],
    },
    {
      name: "CheatSheet.ch",
      summary:
        "Générateur de fiches de révision: transformation de documents en cheatsheets structurées, exportables et faciles à relire.",
      linkPreview: "https://cheatsheet.ch",
      tags: ["EdTech", "PDF", "LLM"],
    },
    {
      name: "Swiss Real Estate Analyser",
      summary:
        "Analyseur immobilier suisse qui classe des annonces selon des critères concrets: budget, localisation, qualité et potentiel de marché.",
      linkPreview:
        "https://huggingface.co/spaces/BobbyBobby01/swiss-real-estate-analyser",
      tags: ["Data", "Scoring", "Immobilier"],
    },
    {
      name: "Retractify",
      summary:
        "SaaS et plugin WooCommerce pour gérer les demandes de rétractation avec un flux clair, des preuves PDF et un suivi opérationnel.",
      linkPreview: "https://www.retractify.ch/",
      tags: ["WooCommerce", "SaaS", "Legal tech"],
    },
  ],
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
  about: {
    description: `
      Je m'appelle Victor Giordani. Mon terrain de jeu est l'intersection entre data science, développement logiciel et produits IA. J'aime partir d'un problème réel, structurer les données disponibles, construire un pipeline fiable, puis rendre le résultat utilisable dans une interface claire.

      Mon parcours combine la base technique exigeante de 42 Lausanne et une formation académique en data science à la HEIG-VD. Mes projets personnels me servent de laboratoire: agents IA, analyse immobilière, génération de supports d'étude et outils web déployés publiquement.
    `,
    image: "/victor-mark.svg",
  },
  contact: {
    email: "vgfxgpt@gmail.com",
  },
};

// #5755ff
