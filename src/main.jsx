import { StrictMode, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import "./styles.scss";
import catLogo from "../assets/java_cat_coffee.png";
import javaLogo from "../assets/java_logo.png";

const Arrow = () => (
  <span className="arrow" aria-hidden="true">
    ↗
  </span>
);

function JavaParallaxCard() {
  const cardRef = useRef(null);

  const resetCard = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.setProperty("--pointer-x", "50%");
    card.style.setProperty("--pointer-y", "50%");
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
  };

  const handlePointerMove = (event) => {
    const card = cardRef.current;
    if (!card) return;

    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;

    card.style.setProperty("--pointer-x", `${x * 100}%`);
    card.style.setProperty("--pointer-y", `${y * 100}%`);
    card.style.setProperty("--tilt-x", `${(0.5 - y) * 8}deg`);
    card.style.setProperty("--tilt-y", `${(x - 0.5) * 10}deg`);
  };

  return (
    <aside
      ref={cardRef}
      className="java-card"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetCard}
    >
      <div className="java-card__note java-card__note--left">
        //
        <br />
        Write
        <br />
        Build
        <br />
        Improve
        <br />
        Repeat
      </div>
      <div className="java-card__note java-card__note--right">
        <span className="java-card__phrase">
          Good <b>software</b>
        </span>
        <span className="java-card__phrase">
          Better <b>coffee</b>
        </span>
        <span className="java-card__phrase">
          Fluffier <b>cat</b>
        </span>
        <i />
      </div>
      <img className="java-card__logo" src={javaLogo} alt="Java logo" />
      <div className="java-card__note java-card__note--bottom">
        {`{`}
        <br />
        Java
        <br />
        backend
        <br />
        systems
        <br />
        ideas
        <br />
        {`}`}
      </div>
    </aside>
  );
}

function App() {
  const navLinksRef = useRef(null);
  const indicatorTimerRef = useRef(null);

  const moveNavIndicator = (link, shouldMorph = true) => {
    const navLinks = navLinksRef.current;
    if (!navLinks || !link) return;

    const navBounds = navLinks.getBoundingClientRect();
    const linkBounds = link.getBoundingClientRect();
    const position =
      linkBounds.left - navBounds.left + linkBounds.width / 2 - 3;
    const previousPosition = Number.parseFloat(
      navLinks.dataset.indicatorPosition ?? `${position}`,
    );

    navLinks.style.setProperty("--indicator-x", `${position}px`);
    navLinks.dataset.indicatorPosition = `${position}`;
    navLinks.dataset.indicatorDirection =
      position < previousPosition ? "left" : "right";

    if (!shouldMorph) return;

    navLinks.classList.remove("is-indicator-moving");
    void navLinks.offsetWidth;
    navLinks.classList.add("is-indicator-moving");

    window.clearTimeout(indicatorTimerRef.current);
    indicatorTimerRef.current = window.setTimeout(() => {
      navLinks.classList.remove("is-indicator-moving");
    }, 480);
  };

  useEffect(() => {
    let frameId = 0;

    const updateHeroProgress = () => {
      const heroHeight =
        document.getElementById("home")?.offsetHeight ?? window.innerHeight;
      const progress = Math.min(window.scrollY / heroHeight, 1);
      document.documentElement.style.setProperty("--hero-progress", progress);
      document.documentElement.classList.toggle(
        "hero-is-covered",
        progress >= 0.88,
      );
      frameId = 0;
    };

    const requestUpdate = () => {
      if (!frameId) frameId = requestAnimationFrame(updateHeroProgress);
    };

    updateHeroProgress();
    moveNavIndicator(navLinksRef.current?.querySelector(".active"), false);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      document.documentElement.classList.remove("hero-is-covered");
      window.clearTimeout(indicatorTimerRef.current);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <main>
      <header className="site-header">
        <nav className="nav container" aria-label="Primary navigation">
          <a className="brand" href="#home" aria-label="catoffeine.dev home">
            <img src={catLogo} alt="" />
            <span>
              catoffeine<span>.dev</span>
            </span>
          </a>
          <div
            ref={navLinksRef}
            className="nav-links"
            onMouseLeave={() =>
              moveNavIndicator(navLinksRef.current?.querySelector(".active"))
            }
          >
            <a
              className="active"
              href="#home"
              onMouseEnter={(event) => moveNavIndicator(event.currentTarget)}
            >
              Home
            </a>
            <a
              href="#about"
              onMouseEnter={(event) => moveNavIndicator(event.currentTarget)}
            >
              About
            </a>
            <a
              href="#stack"
              onMouseEnter={(event) => moveNavIndicator(event.currentTarget)}
            >
              Stack
            </a>
            <a
              href="#projects"
              onMouseEnter={(event) => moveNavIndicator(event.currentTarget)}
            >
              Projects
            </a>
            <a
              href="#neetcode"
              onMouseEnter={(event) => moveNavIndicator(event.currentTarget)}
            >
              NeetCode
            </a>
            <a
              href="#contact"
              onMouseEnter={(event) => moveNavIndicator(event.currentTarget)}
            >
              Contact
            </a>
            <span className="nav-indicator" aria-hidden="true" />
          </div>
          <a className="button button-small" href="#contact">
            Let&apos;s talk <Arrow />
          </a>
        </nav>
      </header>
      <section className="hero" id="home">
        <div className="hero-content container">
          <div className="hero-copy">
            <div className="eyebrow availability">
              <i /> Java developer
            </div>
            <h1>
              <span className="cat-word">Cats</span> come first.
              <br />
              <span className="java-word">Java</span> and{" "}
              <span className="coffee-word">coffee</span>
              <br />
              come right after.
            </h1>
            <p>Clean code. Real-world solutions. Constantly learning.</p>
            <div className="hero-actions">
              <a className="button" href="#projects">
                View my work <Arrow />
              </a>
              <a className="scroll-link" href="#about">
                or scroll down <b>↓</b>
              </a>
            </div>
            <div className="stats" aria-label="Experience summary">
              <div>
                <strong>5+</strong>
                <small>
                  Years
                  <br />
                  learning programming
                </small>
              </div>
              <div>
                <strong>∞</strong>
                <small>
                  Curiosity
                  <br />
                  remaining
                </small>
              </div>
            </div>
          </div>
          <JavaParallaxCard />
        </div>
      </section>

      <div className="site-content">
        <section className="about section container" id="about">
          <div className="section-intro">
            <div className="eyebrow">
              <span className="line-icon">♙</span> About me
            </div>
            <h2>
              HSE bachelor&apos;s student
              <br />
              building reliable backend
              <br />
              software.
            </h2>
            <p>
              I&apos;m a bachelor&apos;s student at the Higher School of
              Economics. I&apos;ve been learning programming from a young age,
              started with C++, and always loved it, but eventually chose Java
              as my main language.
            </p>
            <p>
              I enjoy backend development, practical problem solving, and clean
              architecture. I&apos;m always eager to learn new technologies,
              work on real-world projects, and turn ideas into reliable
              solutions.
            </p>
            <a className="button" href="#contact">
              Get to know me <Arrow />
            </a>
          </div>
          <div className="qualities">
            {[
              [
                "◇",
                "HSE Student",
                "Bachelor's student at the Higher School of Economics.",
              ],
              [
                "⌘",
                "Started with C++",
                "Been programming from a young age. Loved C++.",
              ],
              [
                "♨",
                "Java as Main Language",
                "Chose Java as my main language and ecosystem.",
              ],
              [
                "⚙",
                "Problem Solver",
                "I enjoy turning ideas into practical, real-world solutions.",
              ],
            ].map(([icon, title, copy]) => (
              <article className="quality" key={title}>
                <span>{icon}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </article>
            ))}
          </div>
          <aside className="quote-card mountain-card">
            <b>“</b>
            <blockquote>
              Better
              <br />
              software
              <br />
              through
              <br />
              curiosity.
            </blockquote>
            <i />
          </aside>
        </section>

        <section className="stack section container" id="stack">
          <div className="section-intro compact">
            <div className="eyebrow">
              <span className="line-icon">◇</span> Tech stack
            </div>
            <h2>
              Tools and technologies
              <br />I work with.
            </h2>
            <p>
              A constantly evolving stack — focusing on backend development,
              reliable systems, and practical tools.
            </p>
          </div>
          <div className="tool-grid">
            {[
              "Java",
              "Spring",
              "PostgreSQL",
              "Docker",
              "Git",
              "Linux",
              "Maven",
              "REST APIs",
            ].map((tool, index) => (
              <div className="tool" key={tool}>
                <span>{["♨", "●", "◉", "◆", "◆", "♙", "◢", "⚙"][index]}</span>
                <strong>{tool}</strong>
                <small>
                  {
                    [
                      "Core language I love",
                      "Spring Boot · Spring Security",
                      "Reliable relationships",
                      "Build, ship anywhere",
                      "Version control for better code",
                      "Comfortable with terminal",
                      "Build and dependencies",
                      "Design and develop",
                    ][index]
                  }
                </small>
              </div>
            ))}
          </div>
        </section>

        <section className="projects section container" id="projects">
          <div className="section-intro compact">
            <div className="eyebrow">
              <span className="line-icon">▱</span> Featured projects
            </div>
            <h2>
              Real projects.
              <br />
              Real experience.
            </h2>
            <p>
              A selection of my main projects, from practical backend solutions
              to learning experiments.
            </p>
            <a className="button" href="#contact">
              View all projects <Arrow />
            </a>
          </div>
          <div className="project-grid">
            {[
              [
                "Task Manager API",
                "A REST API for task management with user authentication, task organization, and PostgreSQL backend.",
                ["Java", "Spring Boot", "PostgreSQL"],
              ],
              [
                "Real-time Chat",
                "A WebSocket-based chat application with user authentication and a clean modern interface.",
                ["Java", "WebSocket", "Docker"],
              ],
              [
                "Library Management System",
                "A full-featured backend system for library management, including book inventory and user roles.",
                ["Java", "Spring Boot", "PostgreSQL"],
              ],
            ].map(([title, copy, tags]) => (
              <article className="project" key={title}>
                <a href="#contact" aria-label={`Open ${title}`}>
                  ↗
                </a>
                <span className="project-icon">
                  {title === "Task Manager API"
                    ? "▤"
                    : title === "Real-time Chat"
                      ? "◯"
                      : "◇"}
                </span>
                <h3>{title}</h3>
                <p>{copy}</p>
                <div className="tags">
                  {tags.map((tag) => (
                    <small key={tag}>{tag}</small>
                  ))}
                </div>
                <button>
                  View project <Arrow />
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="contact container" id="contact">
          <div>
            <h2>Let&apos;s build something great together.</h2>
            <p>Open to opportunities, collaborations, and interesting ideas.</p>
          </div>
          <a className="button" href="mailto:hello@catoffeine.dev">
            Get in touch <Arrow />
          </a>
        </section>
        <footer className="container">
          <a className="brand" href="#home">
            <img src={catLogo} alt="" />
            <span>
              catoffeine<span>.dev</span>
            </span>
          </a>
          <p>© 2026 catoffeine.dev. All rights reserved.</p>
          <div>Built with ☕ and curiosity.</div>
        </footer>
      </div>
    </main>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
