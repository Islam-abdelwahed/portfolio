// src/content.config.ts

interface SocialLink {
  label: string;
  href: string;
  icon: string;
  target?: string;
  rel?: string;
}

interface SiteContent {
  // floatingIcons: {
  //   safePositions: { x: number; y: number }[];
  //   icons: { name: string; className: string; color: string }[];
  // };

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
    category: string;
  }[]; // Note: Projects are fetched from API, these are fallback values

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

  certificates: {
    title: string;
    org: string;
    url: string;
    embedUrl: string;
    thumbnail?: string;
    date?: string;
  }[]; // Note: Certificates are fetched from API, these are fallback values

  education: {
    startDate: string; // Format: "YYYY-MM"
    endDate: string; // Format: "YYYY-MM"
    type: 'education' | 'work' | 'training';
    title: string;
    subtitle?: string;
    place?: string;
    dateRange: string;
    icon: string;
  }[];

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
  email: {
    label: "Email",
    email: "islamabdelwahed61@gmail.com",
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
  },
  linkedin: {
    label: "LinkedIn",
    href: "https://linkedin.com/in/islamelsayed0",
    icon: "linkedin",
    target: "_blank",
    rel: "noopener noreferrer"
  },
  github: {
    label: "GitHub",
    href: "https://github.com/Islam-abdelwahed",
    icon: "github",
    target: "_blank",
    rel: "noopener noreferrer"
  },
  upwork: {
    label: "Upwork",
    href: "https://www.upwork.com/freelancers/~01b2a478d4b0aceee6",
    icon: "briefcase",
    target: "_blank",
    rel: "noopener noreferrer"
  },
  wuzzuf: {
    label: "Wuzzuf",
    href: "https://wuzzuf.net/me/islam-elsayed",
    icon: "id-card",
    target: "_blank",
    rel: "noopener noreferrer"
  },
  mostaql: {
    label: "Mostaql",
    href: "https://mostaql.com/u/IslamAbdelwahed",
    icon: "user-tie",
    target: "_blank",
    rel: "noopener noreferrer"
  },
  khamsat: {
    label: "Khamsat",
    href: "https://khamsat.com/user/islam_abdelwahed",
    icon: "five",
    target: "_blank",
    rel: "noopener noreferrer"
  }
};

/* ============================= */
/* SITE CONTENT */
/* ============================= */

const siteContent: SiteContent = {

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

  education: [
    {
      startDate: '2021-09',
      endDate: '2025-07',
      type: 'education',
      title: "Bachelor of Computer Science (with Honors)",
      subtitle: "Computer Science Department, Faculty of Computers and Informatics",
      place: "Zagazig University",
      dateRange: "Sep 2021 - Jul 2025",
      icon: 'fas fa-graduation-cap'
    },

  ],

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
      image: "./project.jpg",
      imageAlt: "AI Surveillance System",
      demoLink: "",
      githubRepo: "",
      category: "Backend"
    },
     {
      title: "Video Analysis & Management System",
      description:
        "Distributed real-time surveillance system with AI-powered edge devices and scalable backend processing.",
      stack: ["Node.js", "TypeScript", "MongoDB", "Redis", "BullMQ"],
      image: "./project.jpg",
      imageAlt: "AI Surveillance System",
      demoLink: "",
      githubRepo: "",
      category: "Backend"
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
      date: "2024",
      highlight: "Global Hackathon",
      icon: "🚀",
      images: [
        "./achievement.png",
        "./achievement.jpg"
      ]
    },
    {
      title: "NASA Space Apps",
      description: "Built and presented a space-tech solution as part of the global NASA Space Apps challenge.",
      date: "2024",
      highlight: "Global Hackathon",
      icon: "🚀",
      images: [
        "./achievement.png",
        "./achievement.jpg"
      ]
    },

  ],

  certificates: [
    {
      title: "Network",
      org: "Mahara",
      // Link to view the certificate (opens in new tab)
      url: "https://drive.google.com/file/d/1uzXQJ4RcBzd6Y4PNeCGHhDAngxaB1jBH/view",
      // For embedding or direct PDF link
      embedUrl: "https://drive.google.com/file/d/1uzXQJ4RcBzd6Y4PNeCGHhDAngxaB1jBH/preview",
      // Thumbnail generated by Google Drive
      thumbnail: "https://drive.google.com/thumbnail?id=1uzXQJ4RcBzd6Y4PNeCGHhDAngxaB1jBH&sz=w200",
      date: "15/08/2023"
    },
  ],

  contact: {
    ctaText: "Contact Me",
    email: socialLinks.email.email,
    info: [
      socialLinks.phone,
      socialLinks.email,
      socialLinks.linkedin,
      socialLinks.github,
      socialLinks.upwork,
      socialLinks.wuzzuf,
      socialLinks.mostaql,
      socialLinks.khamsat
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

export const ApiLink = "https://script.google.com/macros/s/AKfycbwFpRN1Nkqutm3OpcoK-bt8hfozT-f5tFJaNIO5DomzdxGzGHOc1FKVz2-5qtBYbOs/exec";