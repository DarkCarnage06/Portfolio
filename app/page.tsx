import Image from "next/image"
import { ArrowDown, ArrowUpRight, Binary, Braces, Database, GitBranch } from "lucide-react"
import { portfolioContent } from "@/data/content"
import PortfolioMotion from "@/components/PortfolioMotion"
import ProjectIndex from "@/components/ProjectIndex"
import HeroControls from "@/components/HeroControls"
import { hypermotiveExperience } from "@/data/experience"

const { personal } = portfolioContent
const github = "https://github.com/DarkCarnage06"
const linkedin = "https://www.linkedin.com/in/atharv-r-0a73a0279/"

const skillGroups = [
  { name: "Full-stack development", icon: Braces, detail: "Interfaces, APIs and the data behind them.", tools: ["React", "Next.js", "Node.js", "TypeScript"] },
  { name: "Data & retrieval", icon: Database, detail: "Structured storage and semantic search.", tools: ["PostgreSQL", "Neon", "MongoDB", "pgvector"] },
  { name: "Applied AI", icon: Binary, detail: "Machine learning and grounded LLM workflows.", tools: ["Python", "ML", "RAG", "Claude API"] },
  { name: "Tools & deployment", icon: GitBranch, detail: "Versioning, delivery and integrations.", tools: ["GitHub", "Vercel", "Resend", "C++", "C#"] },
]

const ticker = ["FULL-STACK DEVELOPMENT", "SEMANTIC SEARCH", "APPLIED MACHINE LEARNING", "AI WORKFLOWS"]

export default function Home() {
  return (
    <PortfolioMotion>
      <a className="skip" href="#main">Skip to content</a>
      <header className="site-header frame">
        <a className="editorial-brand" href="#home"><b aria-hidden>ar✳</b><span>Atharv Randive<small>AI &amp; ML Developer</small></span></a>
        <nav aria-label="Main navigation">
          <a href="#projects">Selected work <ArrowUpRight size={14} aria-hidden /></a>
          <a href="#about">About</a>
          <a href="#contact">Let’s talk <ArrowUpRight size={14} aria-hidden /></a>
        </nav>
        <details className="editorial-menu">
          <summary>Menu <span aria-hidden>☰</span></summary>
          <div>
            <a href="#about">About</a>
            <a href="#skills">Expertise</a>
            <a href="#projects">Selected work</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
            <a href={personal.resumeUrl}>Résumé <ArrowDown size={14} aria-hidden /></a>
          </div>
        </details>
      </header>

      <main id="main">
        <section className="editorial-hero" aria-labelledby="hero-title">
          <div className="hero-meta"><span>● &nbsp; ATHARV RANDIVE</span><span>PORTFOLIO / 2026</span></div>
          <div className="hero hero-stage">
            <div className="hero-copy">
              <p className="role">AI · MACHINE LEARNING · FULL-STACK</p>
              <h1 id="hero-title"><span className="name-line"><span>Useful AI.</span></span>{" "}<span className="name-line name-accent"><span>Built to work.</span></span></h1>
              <p className="intro">I’m Atharv. I build full-stack AI applications, from semantic job matching to tools that help teams understand their AI spending.</p>
              <div className="hero-actions"><a className="pill" href="#projects">Explore my work <ArrowUpRight size={23} aria-hidden /></a></div>
            </div>
            <figure className="hero-orbit" data-gesture aria-hidden>
              <div className="orbit-shift">
                <div className="orbit-sphere">
                  {[18, 42, 64].map(tilt => <i key={tilt} style={{ rotate: `${tilt}deg` }} />)}
                  <i className="orbit-latitude" /><i className="orbit-longitude" />
                </div>
                <div className="orbit-track"><span /></div>
              </div>
              <figcaption>DATA ↔ PRODUCT</figcaption>
            </figure>
          </div>
          <div className="hero-meta hero-bottom">
            <a href="#about"><ArrowDown size={17} aria-hidden /> Scroll to explore</a>
            <HeroControls />
          </div>
        </section>

        <div className="editorial-ticker" aria-hidden><div>{[0, 1, 2, 3].map(copy => <span key={copy}>{ticker.map(item => <span key={item}>✳ &nbsp; {item}</span>)}</span>)}</div></div>

        <section className="editorial-paper" id="about" aria-labelledby="about-title">
          <div className="frame">
            <div className="section-index"><span>01 / ABOUT</span><span>MANIPAL UNIVERSITY JAIPUR</span></div>
            <div className="about-grid editorial-about" data-slide>
              <div>
                <h2 className="editorial-heading" id="about-title">Curious about AI.<br /><em>Focused on what it does.</em></h2>
                <p className="about-lead">I study Artificial Intelligence and Machine Learning at Manipal University Jaipur and expect to graduate in 2027. My projects bring together web development, databases, semantic search, and LLM APIs.</p>
                <a className="editorial-text-link" href={personal.resumeUrl}>Download résumé <ArrowDown size={17} aria-hidden /></a>
              </div>
              <figure className="editorial-photo" data-gesture>
                <Image src={personal.avatar} alt="Atharv Randive" fill sizes="(max-width: 740px) 75vw, 33vw" />
                <figcaption>Atharv Randive <ArrowUpRight size={17} aria-hidden /></figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="editorial-expertise" id="skills" aria-labelledby="skills-title">
          <div className="frame skills" data-slide>
            <div className="section-index"><span>02 / EXPERTISE</span><span>TECHNICAL SKILLS</span></div>
            <h2 className="editorial-heading" id="skills-title">From interface<br /><em>to infrastructure.</em></h2>
            <div className="skills-grid">
              {skillGroups.map(({ name, icon: Icon, detail, tools }) => (
                <div className="skill-group" key={name} data-gesture>
                  <Icon size={25} aria-hidden />
                  <h3>{name}</h3>
                  <p>{detail}</p>
                  <ul>{tools.map(tool => <li key={tool}>{tool}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="editorial-paper" id="projects" aria-labelledby="work-title">
          <div className="work frame" data-slide>
            <div className="section-index"><span>03 / SELECTED WORK</span><span>PROJECTS &amp; PROTOTYPES</span></div>
            <h2 id="work-title">Work in <span>practice.</span></h2>
            <ProjectIndex />
          </div>
        </section>

        <section className="editorial-paper editorial-history" id="experience" aria-labelledby="experience-title">
          <div className="frame about-grid" data-slide>
            <div>
              <div className="section-index"><span>04 / EXPERIENCE</span></div>
              <h2 className="editorial-heading" id="experience-title">What shaped<br /><em>how I work.</em></h2>
            </div>
            <div className="experience">
              <details open>
                <summary><span>ISRO · Spark India Program</span><span aria-hidden>+</span></summary>
                <p className="date">Aug 2025 – Aug 2026</p>
                <p>Built a machine learning model to predict rocket thrust from simulation and scientific data, and taught space science through practical outreach sessions.</p>
              </details>
              <details>
                <summary><span>{hypermotiveExperience.company}</span><span aria-hidden>+</span></summary>
                <p className="date">{hypermotiveExperience.role} · {hypermotiveExperience.dates}</p>
                <p>{hypermotiveExperience.summary}</p>
              </details>
              <details>
                <summary><span>Manipal University Jaipur</span><span aria-hidden>+</span></summary>
                <p className="date">2023 – 2027 (expected)</p>
                <p>B.Tech in Artificial Intelligence and Machine Learning. Three-time Student Excellence Award recipient and Music Club participant from 2023 to 2025.</p>
              </details>
            </div>
          </div>
        </section>
        <section className="editorial-method" aria-labelledby="method-title">
          <div className="frame" data-slide>
            <h2 className="editorial-heading" id="method-title">How I build.</h2>
            <ol>
              <li><h3>Find the problem</h3><p>Identify the decision or task the product should make easier.</p></li>
              <li><h3>Build the shortest path</h3><p>Connect the interface, data, and model around a working flow.</p></li>
              <li><h3>Check what actually works</h3><p>Test the flow and make failures clear and recoverable.</p></li>
            </ol>
          </div>
        </section>

        <section className="editorial-paper editorial-history" aria-labelledby="faq-title">
          <div className="frame about-grid" data-slide>
            <h2 className="editorial-heading" id="faq-title">A few things<br /><em>you might ask.</em></h2>
            <div className="experience">
              <details><summary><span>What do you like to build?</span><span aria-hidden>+</span></summary><p>Full-stack applications that make AI practical, especially semantic search, grounded model responses, and tools backed by structured data.</p></details>
              <details><summary><span>Where can I try your work?</span><span aria-hidden>+</span></summary><p>The selected work section links to live demos and source code where available.</p></details>
              <details><summary><span>How can I reach you?</span><span aria-hidden>+</span></summary><p>Email me at <a href={`mailto:${personal.email}`}>{personal.email}</a> or connect with me on LinkedIn.</p></details>
            </div>
          </div>
        </section>
      </main>

      <footer className="frame footer editorial-footer" id="contact" data-slide>
        <div className="section-index"><span>CONTACT</span></div>
        <h2>Let’s talk<br /><span>about your idea.</span></h2>
        <a className="email" href={`mailto:${personal.email}`}>{personal.email} <ArrowUpRight size={20} aria-hidden /></a>
        <div className="footer-links">
          <span>Atharv Randive</span>
          <a href={github}>GitHub <ArrowUpRight size={16} aria-hidden /></a>
          <a href={linkedin}>LinkedIn <ArrowUpRight size={16} aria-hidden /></a>
          <a href={personal.resumeUrl}>Résumé <ArrowDown size={16} aria-hidden /></a>
        </div>
      </footer>
    </PortfolioMotion>
  )
}
