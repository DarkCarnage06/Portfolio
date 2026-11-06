export interface NavLink {
  label: string;
  href: string;
}

export interface TechItem {
  name: string;
  icon: string;
  color?: string;
}

export interface StatItem {
  value: string;
  label: string;
  icon: "code" | "calendar" | "briefcase" | "trophy";
}

export interface SkillItem {
  name: string;
  percentage: number;
  icon: string;
  iconColor: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  link: string;
  image: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: "github" | "linkedin" | "twitter" | "instagram";
}

export const portfolioContent = {
  personal: {
    name: "Atharv",
    fullName: "Atharv Randive",
    role: "AI & ML Engineer",
    badge: "I'M AN AI/ML DEVELOPER",
    heroHeading1: "Hi, I’m",
    heroHeading2: "I build AI that people can use.",
    bio: "B.Tech student in AI and ML at Manipal University Jaipur, building machine learning, RAG and computer vision systems and the web products around them.",
    email: "randiveatharv027@gmail.com",
    resumeUrl: "/api/download-resume",
    avatar: "/images/profile.png",
  },

  navigation: {
    logo: "Atharv",
    links: [
      { label: "Home", href: "#home" },
      { label: "About", href: "#about" },
      { label: "Skills", href: "#skills" },
      { label: "Projects", href: "#projects" },
      { label: "Experience", href: "#about" },
      { label: "Contact", href: "#contact" },
    ] as NavLink[],
    cta: {
      text: "Hire Me",
      href: "mailto:randiveatharv027@gmail.com",
    },
  },

  hero: {
    codeSnippet: `const developer = {
  name: "Atharv",
  skills: ["Python", "ML", "RAG", "Next.js"],
  passion: "Building useful AI",
};`,
    technologiesLabel: "TECHNOLOGIES I WORK WITH",
    technologies: [
      { name: "Python", icon: "python", color: "#3776AB" },
      { name: "TensorFlow", icon: "tensorflow", color: "#FF6F00" },
      { name: "React", icon: "react", color: "#61DAFB" },
      { name: "Next.js", icon: "nextjs", color: "#FFFFFF" },
      { name: "Node.js", icon: "nodejs", color: "#5FA04E" },
      { name: "PostgreSQL", icon: "postgresql", color: "#4169E1" },
      { name: "Git", icon: "git", color: "#F05032" },
    ] as TechItem[],
  },

  about: {
    badge: "ABOUT ME",
    heading: "I’m passionate about creating intelligent products",
    paragraph:
      "I turn research and product ideas into useful software: from RAG matchers and computer vision pipelines to full-stack apps that solve real problems.",
    cta: {
      text: "Learn More About Me",
      href: "#contact",
    },
    stats: [
      {
        value: "5+",
        label: "Projects Built",
        icon: "code",
      },
      {
        value: "4",
        label: "Live Demos",
        icon: "calendar",
      },
      {
        value: "2",
        label: "Research & Internships",
        icon: "briefcase",
      },
      {
        value: "3",
        label: "Core Focus Areas: ML, RAG, Vision",
        icon: "trophy",
      },
    ] as StatItem[],
  },

  skills: {
    badge: "MY SKILLS",
    heading: "Technologies I Master",
    items: [
      {
        name: "Python",
        percentage: 90,
        icon: "python",
        iconColor: "#3776AB",
      },
      {
        name: "Machine Learning",
        percentage: 85,
        icon: "ml",
        iconColor: "#FF6F00",
      },
      {
        name: "TensorFlow",
        percentage: 80,
        icon: "tensorflow",
        iconColor: "#FF6F00",
      },
      {
        name: "scikit-learn",
        percentage: 85,
        icon: "scikitlearn",
        iconColor: "#F7931E",
      },
      {
        name: "RAG / pgvector",
        percentage: 80,
        icon: "database",
        iconColor: "#336791",
      },
      {
        name: "React",
        percentage: 80,
        icon: "react",
        iconColor: "#61DAFB",
      },
      {
        name: "Next.js",
        percentage: 80,
        icon: "nextjs",
        iconColor: "#FFFFFF",
      },
      {
        name: "Node.js",
        percentage: 75,
        icon: "nodejs",
        iconColor: "#5FA04E",
      },
      {
        name: "PostgreSQL",
        percentage: 75,
        icon: "postgresql",
        iconColor: "#4169E1",
      },
    ] as SkillItem[],
  },

  projects: {
    badge: "FEATURED PROJECTS",
    heading: "Some of My Recent Work",
    items: [
      {
        id: "01",
        title: "Internship Studio 2.0",
        description:
          "Semantic RAG matcher using pgvector and cosine similarity, with grounded explanations.",
        link: "https://internship-studio2-0.vercel.app/",
        image: "/images/project1.jpg",
      },
      {
        id: "02",
        title: "Distributor Management Platform",
        description:
          "Full-stack ordering and dashboard workflow for distributors and shopkeepers.",
        link: "https://distributor-yoxh.vercel.app",
        image: "/images/project2.jpg",
      },
      {
        id: "03",
        title: "AI Spend Audit (Credix)",
        description:
          "Finds overspending across AI subscriptions like Cursor, Claude, ChatGPT and Copilot.",
        link: "https://credix-audit-ti1g.vercel.app/",
        image: "/images/project3.jpg",
      },
      {
        id: "04",
        title: "NavPal",
        description:
          "Indoor navigation PWA with QR anchoring and Dijkstra pathfinding.",
        link: "https://github.com/DarkCarnage06",
        image: "/images/project4.jpg",
      },
      {
        id: "05",
        title: "Multimodal Image Captioning",
        description:
          "CNN encoder with Transformer or LSTM decoder and attention.",
        link: "https://github.com/DarkCarnage06",
        image: "/images/project5.jpg",
      },
    ] as ProjectItem[],
  },

  contact: {
    badge: "LET'S WORK TOGETHER",
    heading: "Have a project in mind?",
    paragraph:
      "I’m open to data, ML and AI engineering roles, and to projects where thoughtful systems matter. Let’s build something useful.",
    cta: {
      text: "Get In Touch",
      href: "mailto:randiveatharv027@gmail.com",
    },
    testimonial: {
      heading: "Open to opportunities",
      quote:
        "Looking for fresher roles in data, ML and AI engineering.",
      authorName: "Atharv Randive",
      authorRole: "AI/ML Developer",
      avatar: "/images/profile.png",
    },
    followLabel: "FOLLOW ME",
    socials: [
      {
        name: "GitHub",
        url: "https://github.com/DarkCarnage06",
        icon: "github",
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/atharv-a-0a73a0279",
        icon: "linkedin",
      },
    ] as SocialLink[],
    email: "randiveatharv027@gmail.com",
  },

  footer: {
    copyright: "© 2026 Atharv Randive. All rights reserved.",
    madeWith: "Made with ❤ by Atharv",
  },
};

