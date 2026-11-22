import Image from "next/image"
import { ArrowDown, ArrowDownRight, ArrowUpRight, Binary, Braces, Database, GitBranch } from "lucide-react"
import { Barlow_Condensed } from "next/font/google"
import { portfolioContent } from "@/data/content"
import PortfolioMotion from "@/components/PortfolioMotion"
import ProjectIndex from "@/components/ProjectIndex"
import "./portfolio.css"

const display = Barlow_Condensed({ subsets: ["latin"], weight: "800", display: "swap", variable: "--font-display" })
const { personal } = portfolioContent
const github = "https://github.com/DarkCarnage06"
const linkedin = "https://www.linkedin.com/in/atharv-r-0a73a0279/"

const skillGroups = [
  { name: "Languages", icon: Braces, tools: ["Python", "TypeScript", "C++", "C#"] },
  { name: "Web & data", icon: Database, tools: ["React", "Next.js", "Node.js", "PostgreSQL", "Neon", "MongoDB"] },
  { name: "Applied AI", icon: Binary, tools: ["Machine learning", "RAG", "Semantic search", "Claude API"] },
  { name: "Tools & deployment", icon: GitBranch, tools: ["GitHub", "Vercel", "pgvector", "Resend"] },
]

export default function Home() {
  return (
    <div className={display.variable}>
      <PortfolioMotion>
        <a className="skip" href="#main">Skip to content</a>
        <header className="site-header frame">
          <a className="wordmark" href="#home" aria-label="Atharv Randive, home">AR<span>.</span></a>
          <nav aria-label="Main navigation">
            <a href="#projects">Work</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="resume" href={personal.resumeUrl}>Résumé <ArrowDown size={16} aria-hidden /></a>
        </header>

        <main id="main">
          <section className="hero frame" aria-labelledby="hero-title">
            <div className="hero-copy">
              <p className="role">AI &amp; ML developer</p>
              <h1 id="hero-title">Atharv<br /><span>Randive</span></h1>
              <p className="intro">I build full-stack AI applications, from semantic job matching to tools that help teams understand their AI spending.</p>
              <div className="hero-actions">
                <a className="pill" href="#projects">Explore my work <ArrowDownRight size={18} aria-hidden /></a>
                <a className="pill outline" href="#contact">Get in touch</a>
              </div>
            </div>
            <figure className="portrait">
              <div className="portrait-grid" aria-hidden />
              <Image src={personal.avatar} alt="Atharv Randive" fill priority sizes="(max-width: 740px) 95vw, 52vw" />
              <span className="tech-marker marker-rag"><Binary size={16} aria-hidden /> RAG</span>
              <span className="tech-marker marker-next"><Braces size={16} aria-hidden /> Next.js</span>
              <span className="tech-marker marker-data"><Database size={16} aria-hidden /> PostgreSQL</span>
              <figcaption>Manipal University Jaipur <span>B.Tech · AI &amp; ML</span></figcaption>
            </figure>
          </section>

          <section className="about" id="about" aria-labelledby="about-title">
            <div className="frame about-grid" data-slide>
              <div>
                <h2 id="about-title">About <span>me</span></h2>
                <p className="about-lead">I study Artificial Intelligence and Machine Learning at Manipal University Jaipur and expect to graduate in 2027. My projects bring together web development, databases, semantic search, and LLM APIs.</p>
                <a className="pill outline" href={personal.resumeUrl}>Download résumé <ArrowDown size={17} aria-hidden /></a>
              </div>
              <div id="experience" className="experience">
                <h3>Experience &amp; education</h3>
                <details open>
                  <summary><span>ISRO · Spark India Program</span><span aria-hidden>+</span></summary>
                  <p className="date">Aug 2025 – Aug 2026</p>
                  <p>Built a machine learning model to predict rocket thrust using simulation and scientific data. Taught rocketry, satellite systems, and launch technologies through practical outreach sessions.</p>
                </details>
                <details>
                  <summary><span>Manipal University Jaipur</span><span aria-hidden>+</span></summary>
                  <p className="date">2023 – 2027 (expected)</p>
                  <p>B.Tech in Artificial Intelligence and Machine Learning. Three-time Student Excellence Award recipient and Music Club participant from 2023 to 2025.</p>
                </details>
              </div>
            </div>
          </section>

          <section className="skills frame" id="skills" aria-labelledby="skills-title" data-slide>
            <h2 id="skills-title">Technical <span>skills</span></h2>
            <div className="skills-grid">
              {skillGroups.map(({ name, icon: Icon, tools }) => (
                <div className="skill-group" key={name}>
                  <Icon size={23} aria-hidden />
                  <h3>{name}</h3>
                  <ul>{tools.map(tool => <li key={tool}>{tool}</li>)}</ul>
                </div>
              ))}
            </div>
          </section>

          <section className="work frame" id="projects" aria-labelledby="work-title" data-slide>
            <h2 id="work-title">Selected <span>work</span></h2>
            <ProjectIndex />
          </section>
        </main>

        <footer className="frame footer" id="contact" data-slide>
          <h2>Get in <span>touch</span></h2>
          <a className="email" href={`mailto:${personal.email}`}>{personal.email} <ArrowUpRight size={20} aria-hidden /></a>
          <div className="footer-links">
            <span>Atharv Randive</span>
            <a href={github}>GitHub <ArrowUpRight size={16} aria-hidden /></a>
            <a href={linkedin}>LinkedIn <ArrowUpRight size={16} aria-hidden /></a>
            <a href={personal.resumeUrl}>Résumé <ArrowDown size={16} aria-hidden /></a>
          </div>
        </footer>
      </PortfolioMotion>
    </div>
  )
}
