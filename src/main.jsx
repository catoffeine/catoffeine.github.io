import { StrictMode, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import "./styles.scss";
import catLogo from "../assets/java_cat_coffee.png";
import hseLogo from "../assets/hse_logo.svg";
import javaLogo from "../assets/java_logo.png";

const Arrow = () => (
  <span className="arrow" aria-hidden="true">
    ↗
  </span>
);

const techTools = [
  // { icon: "♨", name: "Java", description: "Core language I love" },
  // { icon: "●", name: "Spring", description: "Spring Boot · Spring Security" },
  // { icon: "◉", name: "PostgreSQL", description: "Reliable relationships" },
  // { icon: "◆", name: "Docker", description: "Build, ship anywhere" },
  { icon: "◆", name: "Git", description: "Version control for better code" },
  { icon: "♙", name: "Linux", description: "Comfortable with terminal" },
  // { icon: "◢", name: "Maven", description: "Build and dependencies" },
  // { icon: "⚙", name: "REST APIs", description: "Design and develop" },
  { icon: "C++", name: "C++", description: "Where my coding journey began" },
  {
    icon: "✦",
    name: "More tech will appear here soon!",
    description: "Always exploring what comes next",
    isComingSoon: true,
  },
];

const projectCards = [
  {
    icon: "♨",
    title: "Cat Nap Scheduler",
    copy: "A critically important system for balancing naps, snacks, and surprise keyboard walks.",
    tags: ["Cats", "Naps", "Purring"],
    url: "#projects",
    action: "Coming soon",
  },
  {
    icon: "◯",
    title: "Meow Message Queue",
    copy: "A highly reliable way to deliver meows in order — unless a cat sits on the keyboard.",
    tags: ["Meows", "Queues", "Whiskers"],
    url: "#projects",
    action: "Coming soon",
  },
  {
    icon: "↗",
    title: "More projects here",
    copy: "Find my actual work, experiments, and more caffeine-fueled ideas on GitHub.",
    tags: ["GitHub", "Open source"],
    url: "https://github.com/catoffeine",
    action: "Visit GitHub",
    isExternal: true,
  },
];

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
  const activeSectionRef = useRef("home");
  const quoteCardRef = useRef(null);

  const scrollToTop = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openProject = (url, isExternal) => {
    if (isExternal) {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }

    window.location.hash = url;
  };

  const handleProjectKeyDown = (event, url, isExternal) => {
    if (event.key !== "Enter" && event.key !== " ") return;

    event.preventDefault();
    openProject(url, isExternal);
  };

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

      const headerHeight =
        document.querySelector(".site-header")?.offsetHeight ?? 0;
      const scrollMarker =
        window.scrollY + Math.max(headerHeight + 32, window.innerHeight * 0.6);
      const sectionIds = ["home", "about", "stack", "projects", "contact"];
      const activeSection = sectionIds.reduce((current, sectionId) => {
        const section = document.getElementById(sectionId);
        const sectionTop = section?.getBoundingClientRect().top ?? Infinity;

        return sectionTop + window.scrollY <= scrollMarker
          ? sectionId
          : current;
      }, "home");

      if (activeSection !== activeSectionRef.current) {
        activeSectionRef.current = activeSection;

        const navLinks = navLinksRef.current;
        const activeLink = navLinks?.querySelector(
          `a[href="#${activeSection}"]`,
        );

        navLinks?.querySelectorAll("a").forEach((link) => {
          link.classList.toggle("active", link === activeLink);
        });
        moveNavIndicator(activeLink);
      }

      const quoteCard = quoteCardRef.current;
      if (quoteCard) {
        const cardBounds = quoteCard.getBoundingClientRect();
        const cardCenter = cardBounds.top + cardBounds.height / 2;
        const viewportOffset =
          (window.innerHeight / 2 - cardCenter) / window.innerHeight;
        const parallaxProgress = Math.max(-1, Math.min(1, viewportOffset));

        quoteCard.style.setProperty(
          "--quote-tilt-x",
          `${parallaxProgress * -16}deg`,
        );
        quoteCard.style.setProperty(
          "--quote-tilt-y",
          `${parallaxProgress * 11}deg`,
        );
      }

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

  useEffect(() => {
    const sections = document.querySelectorAll(".reveal-section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.7 },
    );

    document.documentElement.classList.add("reveal-ready");
    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("reveal-ready");
    };
  }, []);

  return (
    <main>
      <header className="site-header">
        <nav className="nav container" aria-label="Primary navigation">
          <a
            className="brand"
            href="#home"
            aria-label="catoffeine.dev home"
            onClick={scrollToTop}
          >
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
              onClick={scrollToTop}
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
            <p>Constantly learning and petting cats.</p>
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
        <section className="about section container reveal-section" id="about">
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
                <span>
                  {title === "HSE Student" ? (
                    <img className="hse-logo" src={hseLogo} alt="" />
                  ) : (
                    icon
                  )}
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </article>
            ))}
          </div>
          <aside ref={quoteCardRef} className="quote-card mountain-card">
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

        <section className="stack section container reveal-section" id="stack">
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
            {techTools.map(({ icon, name, description, isComingSoon }) => (
              <div
                className={`tool${isComingSoon ? " tool--coming-soon" : ""}`}
                key={name}
              >
                <span>{icon}</span>
                <strong>{name}</strong>
                <small>{description}</small>
              </div>
            ))}
          </div>
        </section>

        <section
          className="projects section container reveal-section"
          id="projects"
        >
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
            <a
              className="button"
              href="https://github.com/catoffeine"
              target="_blank"
              rel="noreferrer"
            >
              View all projects <Arrow />
            </a>
          </div>
          <div className="project-grid">
            {projectCards.map(
              ({ icon, title, copy, tags, url, action, isExternal }) => (
                <article
                  className="project"
                  key={title}
                  role="link"
                  tabIndex={0}
                  aria-label={`Open ${title}`}
                  onClick={() => openProject(url, isExternal)}
                  onKeyDown={(event) =>
                    handleProjectKeyDown(event, url, isExternal)
                  }
                >
                  <span className="project-link" aria-hidden="true">
                    ↗
                  </span>
                  <span className="project-icon">{icon}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                  <div className="tags">
                    {tags.map((tag) => (
                      <small key={tag}>{tag}</small>
                    ))}
                  </div>
                  <span className="project-button">
                    {action} <Arrow />
                  </span>
                </article>
              ),
            )}
          </div>
        </section>

        <section className="contact container reveal-section" id="contact">
          <div>
            <h2>Let&apos;s build something great together.</h2>
            <p>Open to opportunities, collaborations, and interesting ideas.</p>
          </div>
          <a className="button" href="mailto:hello@catoffeine.dev">
            Get in touch <Arrow />
          </a>
        </section>
        <footer className="container">
          <a className="brand" href="#home" onClick={scrollToTop}>
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
