import Image from "next/image"
import { ArrowDown, ArrowDownRight, ArrowUpRight } from "lucide-react"
import { portfolioContent } from "@/data/content"
import ProjectIndex from "@/components/ProjectIndex"
import "./portfolio.css"

const { personal } = portfolioContent
const github = "https://github.com/DarkCarnage06"
const linkedin = "https://www.linkedin.com/in/atharv-r-0a73a0279/"

export default function Home() {
  return (
    <div className="portfolio" id="home">
      <a className="skip" href="#main">Skip to content</a>
      <header className="site-header frame">
        <a className="wordmark" href="#home">AR<span>.</span></a>
        <nav aria-label="Main navigation">
          <a href="#projects">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="resume" href={personal.resumeUrl}>Résumé <ArrowDown size={15} aria-hidden /></a>
      </header>

      <main id="main">
        <section className="hero frame" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="role">AI / ML developer</p>
            <h1 id="hero-title">Atharv<br />Randive<span>.</span></h1>
            <p className="intro">I build AI that people can use, from semantic search and computer vision to the web products around them.</p>
            <a className="pill" href="#projects">Explore my work <ArrowDownRight size={20} aria-hidden /></a>
          </div>
          <figure className="portrait">
            <span className="portrait-grid" aria-hidden />
            <Image src={personal.avatar} alt="Atharv Randive" fill priority sizes="(max-width: 740px) 95vw, 45vw" />
            <figcaption>Manipal University Jaipur <span>B.Tech · AI &amp; ML</span></figcaption>
          </figure>
        </section>

        <section className="work frame" id="projects" aria-labelledby="work-title">
          <h2 id="work-title">Selected work<span>.</span></h2>
          <ProjectIndex />
        </section>

        <section className="about" id="about" aria-labelledby="about-title">
          <div className="frame about-grid">
            <h2 id="about-title">About<span>.</span></h2>
            <div>
              <p className="about-lead">I study AI and machine learning at Manipal University Jaipur. My work spans retrieval, computer vision, and full-stack development.</p>
              <div id="experience" className="experience">
                <details>
                  <summary>Space science outreach &amp; research <span aria-hidden>+</span></summary>
                  <p>Led space science awareness sessions and developed a machine learning regression model to estimate rocket thrust from simulation and propulsion data.</p>
                </details>
                <details>
                  <summary>Hypermotive ML internship <span aria-hidden>+</span></summary>
                  <p>Worked with regression, clustering, SVMs and random forests, and trained image classification models using TensorFlow and convolutional neural networks.</p>
                </details>
              </div>
              <p id="skills" className="toolkit">Python · TensorFlow · scikit-learn · PostgreSQL · pgvector · React · TypeScript</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="frame footer" id="contact">
        <h2>Get in touch<span>.</span></h2>
        <a className="email" href={`mailto:${personal.email}`}>{personal.email} <ArrowUpRight aria-hidden /></a>
        <div className="footer-links">
          <span>Atharv Randive</span>
          <a href={github}>GitHub <ArrowUpRight size={16} aria-hidden /></a>
          <a href={linkedin}>LinkedIn <ArrowUpRight size={16} aria-hidden /></a>
          <a href={personal.resumeUrl}>Résumé <ArrowDown size={16} aria-hidden /></a>
        </div>
      </footer>
    </div>
  )
}
