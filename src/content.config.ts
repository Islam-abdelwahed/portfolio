// src/content.config.ts

interface SocialLink {
  label: string;
  href: string;
  icon: string;
  target?: string;
  rel?: string;
}

interface SiteContent {
  floatingIcons: {
    safePositions: { x: number; y: number }[];
    icons: { name: string; className: string; color: string }[];
  };

  hero: {
    greeting: string;
    name: string;
    textOptions: string[];
    title: string;
    tagline: string;
    imageAlt: string;
    social: SocialLink[];
    ctas: { text: string; href: string; icon: string; target?: string; rel?: string }[];
  };

  about: {
    paragraph: string;
    highlights: { text: string; icon: string }[];
  };

  skills: {
    categories: {
      title: string;
      icon: string;
      tools: { name: string; icon: string }[];
    }[];
  };

  projects: {
    title: string;
    description: string;
    stack: string[];
    image: string;
    imageAlt: string;
    demoLink: string;
    githubRepo: string;
  }[];

  experience: { title: string; description: string }[];

  work: {
    title: string;
    subtitle: string;
    place: string;
    range: string;
  };

  testimonials: {
    name: string;
    message: string;
    rating: number;
    avatarIcon: string;
    likes: number;
  }[];

  services: {
    title: string;
    description: string;
    icon: string;
  }[];

  achievements: {
    title: string;
    description: string;
    date?: string;
    highlight?: string;
    icon?: string;
    images: string[];
  }[];

  education: {
    title: string;
    subtitle: string;
    place: string;
    range: string;
    startYear: string;
    endYear: string;
  };

  contact: {
    ctaText: string;
    email: string;
    info: SocialLink[];
    formLabels: { name: string; email: string; message: string };
    footer: string;
  };
}

/* ============================= */
/* CENTRALIZED SOCIAL LINKS */
/* ============================= */

const socialLinks = {
  github: {
    label: "GitHub",
    href: "https://github.com/Islam-abdelwahed",
    icon: "github",
    target: "_blank",
    rel: "noopener noreferrer"
  },
  linkedin: {
    label: "LinkedIn",
    href: "https://linkedin.com/in/islamelsayed0",
    icon: "linkedin",
    target: "_blank",
    rel: "noopener noreferrer"
  },
  email: {
    label: "Email",
    href: "mailto:islamabdelwahed61@gmail.com",
    icon: "mail"
  },
  phone: {
    label: "Phone",
    href: "tel:+201156785602",
    icon: "phone"
  },
  cv: {
    label: "Download CV",
    text: "Download CV",
    href: "https://drive.google.com/file/d/11I3ZKVltsDL3gPJljb2nq9hae5QyEOC_/view?usp=sharing",
    icon: "download",
    target: "_blank",
    rel: "noopener noreferrer"
  }
};

/* ============================= */
/* SITE CONTENT */
/* ============================= */

const siteContent: SiteContent = {
  floatingIcons: {
    safePositions: [
      { x: 12, y: 14 },
      { x: 88, y: 14 },
      { x: 10, y: 32 },
      { x: 90, y: 34 },
      { x: 12, y: 72 },
      { x: 88, y: 70 },
      { x: 18, y: 88 },
      { x: 82, y: 88 }
    ],
    icons: [
      { name: "Node.js", className: "fab fa-node", color: "#68A063" },
      { name: "TypeScript", className: "devicon-typescript-plain", color: "#3178C6" },
      { name: "MongoDB", className: "devicon-mongodb-plain", color: "#47A248" },
      { name: "PostgreSQL", className: "devicon-postgresql-plain", color: "#336791" },
      { name: "Docker", className: "fab fa-docker", color: "#2496ED" },
      { name: "Redis", className: "devicon-redis-plain", color: "#DC382D" },
      { name: "GitHub", className: "fab fa-github", color: "#FFFFFF" },
      { name: "Git", className: "fab fa-git-alt", color: "#F05133" }
    ]
  },

  hero: {
    greeting: "Hello, I'm",
    name: "Islam Elsayed Mohamed",
    textOptions: [
      "Backend Developer",
      "Node.js & TypeScript Specialist",
      "System Design & Distributed Architectures"
    ],
    title: "Backend Developer",
    tagline:
      "Building scalable, secure backend systems with Node.js, microservices, and real-time architectures.",
    imageAlt: "Portrait of Islam Elsayed Mohamed",

    social: [
      socialLinks.github,
      socialLinks.linkedin,
      socialLinks.email,
      socialLinks.phone
    ],

    ctas: [
      { text: "View Projects", href: "#projects", icon: "folder-open" },
      { text: "Contact Me", href: "#contact", icon: "mail" },
      socialLinks.cv
    ]
  },

  about: {
    paragraph:
      "Backend Developer specializing in Node.js, databases, APIs, and system architecture, with experience building scalable and secure services and integrating backends with embedded devices, AI, and IoT.",
    highlights: [
      { text: "Node.js & TypeScript", icon: "code" },
      { text: "RESTful APIs & WebSockets", icon: "activity" },
      { text: "Distributed Systems", icon: "share-2" },
      { text: "IoT & AI Integration", icon: "cpu" }
    ]
  },

  skills: {
    categories: [
      {
        title: "Backend",
        icon: "server",
        tools: [
          { name: "Node.js", icon: "code" },
          { name: "NestJS", icon: "layers" },
          { name: "Express.js", icon: "activity" },
          { name: "REST APIs", icon: "link" },
          { name: "WebSockets", icon: "wifi" }
        ]
      },
      {
        title: "Databases",
        icon: "database",
        tools: [
          { name: "MongoDB", icon: "database" },
          { name: "PostgreSQL", icon: "database" },
          { name: "MySQL", icon: "database" },
          { name: "Redis", icon: "database" }
        ]
      },
      {
        title: "Tools",
        icon: "tool",
        tools: [
          { name: "Docker", icon: "box" },
          { name: "Git", icon: "git-branch" },
          { name: "Swagger", icon: "file-text" },
          { name: "Postman", icon: "send" }
        ]
      }
    ]
  },

  projects: [
    {
      title: "Video Analysis & Management System",
      description:
        "Distributed real-time surveillance system with AI-powered edge devices and scalable backend processing.",
      stack: ["Node.js", "TypeScript", "MongoDB", "Redis", "BullMQ"],
      image: "src/assets/img2.jpg",
      imageAlt: "AI Surveillance System",
      demoLink: "",
      githubRepo: ""
    },
    {
      title: "FinTech Wallet & Transaction System",
      description:
        "Secure microservices-based digital wallet with Kafka event-driven architecture and ledger accounting.",
      stack: ["NestJS", "PostgreSQL", "Kafka", "Redis", "gRPC"],
      image: "src/assets/img.jpg",
      imageAlt: "Fintech Wallet Backend",
      demoLink: "",
      githubRepo: ""
    },
    {
      title: "End-to-End Encrypted Messaging Platform",
      description:
        "Secure messaging system implementing X3DH, Double Ratchet, and HSM-based key management.",
      stack: ["NestJS", "Node.js Crypto", "WebSockets"],
      image: "src/assets/img3.png",
      imageAlt: "Encrypted Messaging System",
      demoLink: "",
      githubRepo: ""
    }
  ],

  experience: [
    {
      title: "Backend Developer – Safe-Steer Startup",
      description:
        "Built AI-powered driver monitoring backend using Node.js and MongoDB. Reduced latency by 40% and enabled real-time integration with 50+ embedded devices."
    }
  ],

  work: {
    title: "Backend Developer – Safe-Steer Startup",
    subtitle: "AI backend, real-time device integrations",
    place: "Remote",
    range: "Oct 2024 – Present"
  },

  testimonials: [
    {
      name: "Product Manager, Safe-Steer",
      message:
        "Islam delivered a resilient backend for our AI driver monitoring platform, cutting latency and keeping devices in sync under load.",
      rating: 5,
      avatarIcon: "fas fa-user-astronaut",
      likes: 42
    },
    {
      name: "CTO, FinPay Labs",
      message:
        "He designed a clean event-driven ledger service that passed audit with zero blocking issues and scaled without surprises.",
      rating: 5,
      avatarIcon: "fas fa-user-tie",
      likes: 35
    },
    {
      name: "Tech Lead, SecureChat",
      message:
        "Great collaboration—clear APIs, strong security posture, and pragmatic trade-offs that shipped on time.",
      rating: 4,
      avatarIcon: "fas fa-user-shield",
      likes: 29
    }
  ],

  services: [
    {
      title: "Backend Systems & APIs",
      description: "Designing and building scalable REST/WebSocket APIs, auth, and multi-tenant backends.",
      icon: "fas fa-server"
    },
    {
      title: "Event-Driven & Realtime",
      description: "Kafka, BullMQ, and WebSocket-based realtime pipelines for data and device flows.",
      icon: "fas fa-bolt"
    },
    {
      title: "Data & Storage",
      description: "PostgreSQL, MongoDB, Redis design with indexing, caching, and performance tuning.",
      icon: "fas fa-database"
    },
    {
      title: "Security & Compliance",
      description: "JWT/OAuth2, RBAC, encryption at rest/in transit, and audit-friendly logging.",
      icon: "fas fa-shield-alt"
    },
    {
      title: "DevOps & Delivery",
      description: "Docker-based delivery, CI/CD pipelines, environment hardening, and observability setup.",
      icon: "fas fa-tools"
    }
  ],

  achievements: [
    {
      title: "NASA Space Apps",
      description: "Built and presented a space-tech solution as part of the global NASA Space Apps challenge.",
      date: "Winner / Participant",
      highlight: "Global Hackathon",
      icon: "🚀",
      images: [
        "/src/assets/nasa1.png",
        "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1454789476662-53eb23ba5907?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      title: "MIE Award",
      description: "Recognized for innovation and impact in education technology and mentorship.",
      date: "2025",
      highlight: "Innovation",
      icon: "🏅",
      images: [
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      title: "Open-Source Contributor",
      description: "Shipped meaningful PRs to community projects, focusing on backend reliability and DX.",
      date: "Ongoing",
      highlight: "Community",
      icon: "🌐",
      images: [
        "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=800&q=80"
      ]
    }
  ],

  education: {
    title: "Bachelor of Computer Science (with Honors)",
    subtitle:
      "Computer Science Department, Faculty of Computers and Informatics",
    place: "Zagazig University",
    range: "Sep 2021 - Jul 2025",
    startYear: "2021",
    endYear: "2025"
  },

  contact: {
    ctaText: "Contact Me",
    email: "islamabdelwahed61@gmail.com",
    info: [
      socialLinks.phone,
      socialLinks.email,
      socialLinks.linkedin,
      socialLinks.github,
      socialLinks.cv
    ],
    formLabels: {
      name: "Name",
      email: "Email",
      message: "Message"
    },
    footer:
      "&copy; <span id=\"year\"></span> Islam Elsayed Mohamed. All rights reserved."
  }
};

export default siteContent;
