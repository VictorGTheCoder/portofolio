import type { SiteConfig, SiteContent } from "../types";

export const SITE_CONFIG: SiteConfig = {
  title: "Victor Giordani — Data Science & IA",
  author: "Victor Giordani",
  description:
    "Portfolio de Victor Giordani, étudiant en data science à la HEIG-VD, formé au tronc commun de 42 Lausanne et créateur de projets IA orientés produit.",
  lang: "fr",
  siteLogo: "/victor-mark.svg",
  navLinks: [
    { text: "Projets", href: "#projects" },
    { text: "Stack", href: "#stack" },
    { text: "Parcours", href: "#experience" },
    { text: "À propos", href: "#about" },
    { text: "Contact", href: "#contact" },
  ],
  languageHref: "/en/",
  socialLinks: [
    { text: "GitHub", href: "https://github.com/VictorGTheCoder" },
    {
      text: "Hugging Face",
      href: "https://huggingface.co/BobbyBobby01",
    },
  ],
  socialImage: "/zen-og.png",
  canonicalURL: "https://www.victorgiordani.ch/",
};

export const SITE_CONFIG_EN: SiteConfig = {
  ...SITE_CONFIG,
  title: "Victor Giordani — Data Science & AI",
  description:
    "Victor Giordani's portfolio. Data science student at HEIG-VD, trained in the 42 Lausanne core curriculum, building product-focused AI projects.",
  lang: "en",
  canonicalURL: "https://www.victorgiordani.ch/en/",
  navLinks: [
    { text: "Projects", href: "#projects" },
    { text: "Stack", href: "#stack" },
    { text: "Experience", href: "#experience" },
    { text: "About", href: "#about" },
    { text: "Contact", href: "#contact" },
  ],
  languageHref: "/",
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
      name: "Sterna",
      summary:
        "Application mobile qui transforme les photos géolocalisées en cartes personnelles et partagées de découvertes de voyage.",
      linkPreview: "https://www.sterna-app.ch/",
      tags: ["Voyage", "Cartographie", "Mobile"],
    },
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
    { name: "Python", logo: "https://cdn.simpleicons.org/python" },
    { name: "PyTorch", logo: "https://cdn.simpleicons.org/pytorch" },
    { name: "Pandas", logo: "https://cdn.simpleicons.org/pandas" },
    { name: "scikit-learn", logo: "https://cdn.simpleicons.org/scikitlearn" },
    { name: "LLM / RAG", logo: "https://cdn.simpleicons.org/openai" },
    { name: "TypeScript", logo: "https://cdn.simpleicons.org/typescript" },
    { name: "Astro", logo: "https://cdn.simpleicons.org/astro" },
    { name: "SQL", logo: "https://cdn.simpleicons.org/postgresql" },
    { name: "Git", logo: "https://cdn.simpleicons.org/git" },
    { name: "Docker", logo: "https://cdn.simpleicons.org/docker" },
  ],
  about: {
    description: `
      Je m'appelle Victor Giordani. Mon terrain de jeu est l'intersection entre data science, développement logiciel et produits IA. J'aime partir d'un problème réel, structurer les données disponibles, construire un pipeline fiable, puis rendre le résultat utilisable dans une interface claire.

      Mon parcours combine la base technique exigeante de 42 Lausanne et une formation académique en data science à la HEIG-VD. Mes projets personnels me servent de laboratoire: agents IA, analyse immobilière, génération de supports d'étude et outils web déployés publiquement.
    `,
    image: "/victor-mark.svg",
  },
  contact: {
    email: "victor.giordani@protonmail.com",
  },
};

export const SITE_CONTENT_EN: SiteContent = {
  hero: {
    name: "Victor Giordani",
    specialty: "Data Science & AI Products",
    summary:
      "Data science student at HEIG-VD, with a background in the 42 Lausanne core curriculum. I build practical tools around AI, data analysis, and automation.",
  },
  experience: [
    {
      company: "HEIG-VD",
      position: "Data Science Student",
      startDate: "Current",
      endDate: "In progress",
      summary: [
        "Studies in statistics, machine learning, software engineering, and data analysis.",
        "Especially interested in useful AI systems: search, scoring, automation, and straightforward interfaces.",
      ],
    },
    {
      company: "42 Lausanne",
      position: "Core Curriculum",
      startDate: "Before HEIG",
      endDate: "Completed",
      summary: [
        "Project-based learning in C, algorithms, data structures, Unix, and disciplined software development.",
        "Independent work, peer learning, and solving problems under constraints.",
      ],
    },
    {
      company: "Personal Projects",
      position: "Data & AI Product Builder",
      startDate: "Alongside studies",
      endDate: "Ongoing",
      summary:
        "Building products such as Polybrain, CheatSheet, and Swiss Real Estate Analyser, with a focus on usefulness, automation, and user experience.",
    },
  ],
  projects: [
    {
      name: "Sterna",
      summary:
        "A mobile app that turns geolocated photos into personal and shared maps of travel discoveries.",
      linkPreview: "https://www.sterna-app.ch/",
      tags: ["Travel", "Maps", "Mobile"],
    },
    {
      name: "Polybrain",
      summary:
        "An AI web assistant designed as a workspace, with conversations, productivity tools, and an interface for everyday use.",
      linkPreview: "https://polybrain.ch",
      tags: ["AI", "Web product", "Automation"],
    },
    {
      name: "CheatSheet.ch",
      summary:
        "A study-sheet generator that turns documents into structured, exportable notes that are easy to review.",
      linkPreview: "https://cheatsheet.ch",
      tags: ["EdTech", "PDF", "LLM"],
    },
    {
      name: "Swiss Real Estate Analyser",
      summary:
        "A Swiss property analyser that ranks listings against practical criteria: budget, location, quality, and market potential.",
      linkPreview:
        "https://huggingface.co/spaces/BobbyBobby01/swiss-real-estate-analyser",
      tags: ["Data", "Scoring", "Real estate"],
    },
    {
      name: "Retractify",
      summary:
        "A SaaS and WooCommerce plugin for handling withdrawal requests with a clear workflow, PDF evidence, and operational tracking.",
      linkPreview: "https://www.retractify.ch/",
      tags: ["WooCommerce", "SaaS", "Legal tech"],
    },
  ],
  stack: SITE_CONTENT.stack,
  about: {
    description: `
      I'm Victor Giordani. I work at the intersection of data science, software development, and AI products. I like starting with a real problem, organizing the available data, building a reliable pipeline, and making the result useful through a clear interface.

      My background combines the demanding technical foundation of 42 Lausanne with academic studies in data science at HEIG-VD. My personal projects are a place to experiment with AI agents, property analysis, study material generation, and publicly available web tools.
    `,
    image: "/victor-mark.svg",
  },
  contact: { email: "victor.giordani@protonmail.com" },
};

// #5755ff
