"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

const projects = [
  {
    index: "01",
    title: "Relay",
    subtitle: "Operations, without the noise.",
    description:
      "A real-time logistics command center that turns fragmented fleet signals into a calm, shared picture—cutting incident response time by 38%.",
    stack: "React · TypeScript · WebSockets · Node.js",
    note: "The decisive move was reducing twelve alert states to three human decisions. A shared event model kept dispatch, support, and field teams in the same operational picture.",
    year: "2026",
    discipline: "PRODUCT ENGINEERING",
    visual: "relay",
  },
  {
    index: "02",
    title: "Northstar",
    subtitle: "Climate data, made actionable.",
    description:
      "A scenario-planning platform translating regional climate models into investment decisions for infrastructure teams across six countries.",
    stack: "Next.js · D3 · Mapbox · PostgreSQL",
    note: "We paired progressive disclosure with spatial comparison, letting non-specialists move from a national signal to a specific asset without losing the scenario context.",
    year: "2025",
    discipline: "DATA EXPERIENCE",
    visual: "northstar",
  },
  {
    index: "03",
    title: "Forma",
    subtitle: "Creative review, in one rhythm.",
    description:
      "A collaborative review workspace that gave distributed brand teams one fast, precise place to move work across fourteen markets.",
    stack: "React · WebRTC · GraphQL · AWS",
    note: "Review speed came from treating every comment as a coordinate in time and space. The interface made authorship, versions, and decisions visible at a glance.",
    year: "2024",
    discipline: "COLLABORATION",
    visual: "forma",
  },
  {
    index: "04",
    title: "Quiet Hours",
    subtitle: "Focus with fewer metrics.",
    description:
      "A privacy-first desktop tool for deep work, pairing offline-first sessions with ambient soundscapes and intentionally quiet analytics.",
    stack: "Electron · Zustand · SQLite · Web Audio",
    note: "Instead of gamifying attention, Quiet Hours protects it. Sessions work entirely offline, analytics stay local, and the sound engine adapts without asking for input.",
    year: "2023",
    discipline: "INDEPENDENT PRODUCT",
    visual: "quiet",
  },
] as const;

const skills = [
  { name: "React", x: "12%", y: "18%", note: "Systems that scale" },
  { name: "TypeScript", x: "69%", y: "13%", note: "Confident contracts" },
  { name: "Node.js", x: "76%", y: "42%", note: "Resilient services" },
  { name: "Motion", x: "64%", y: "75%", note: "Purposeful movement" },
  { name: "WebGL", x: "13%", y: "69%", note: "Expressive canvases" },
  { name: "Design systems", x: "32%", y: "45%", note: "Shared language" },
  { name: "Product strategy", x: "39%", y: "86%", note: "Useful outcomes" },
] as const;

const experience = [
  {
    years: "2024—NOW",
    role: "Senior Product Engineer",
    company: "Fieldwork",
    detail:
      "Leading the front-end platform and design-system migration across three product teams. Set the interaction model for the company’s most complex workflow.",
  },
  {
    years: "2021—2024",
    role: "Software Engineer",
    company: "Northstar Labs",
    detail:
      "Built data-heavy planning tools used by public-sector and infrastructure teams, from spatial prototypes to production systems.",
  },
  {
    years: "2018—2021",
    role: "Creative Developer",
    company: "Independent",
    detail:
      "Delivered interactive launches and identity-rich digital products for early-stage technology and culture brands.",
  },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 36 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.78, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <div className="section-label">
      <span>{index}</span>
      <span>{children}</span>
    </div>
  );
}

function ProjectVisual({ visual, title }: { visual: string; title: string }) {
  if (visual === "relay") {
    return (
      <div className="project-art art-relay" aria-label={`${title} interface preview`} role="img">
        <div className="relay-topline">
          <span>RELAY / LIVE OPS</span>
          <span className="live-dot">LIVE</span>
        </div>
        <div className="route route-a" />
        <div className="route route-b" />
        <div className="route route-c" />
        <div className="map-point point-a">12</div>
        <div className="map-point point-b">07</div>
        <div className="map-point point-c">21</div>
        <div className="incident-card">
          <span>INCIDENT 042</span>
          <strong>Route recovered</strong>
          <small>08:42 / KUL-03</small>
        </div>
        <div className="relay-kpi">
          <small>ACTIVE FLEET</small>
          <strong>284</strong>
        </div>
      </div>
    );
  }

  if (visual === "northstar") {
    return (
      <div className="project-art art-northstar" aria-label={`${title} interface preview`} role="img">
        <div className="topography topo-one" />
        <div className="topography topo-two" />
        <div className="topography topo-three" />
        <div className="north-index">3.7°</div>
        <div className="north-copy">
          <span>SCENARIO / 2040</span>
          <strong>Coastal resilience</strong>
        </div>
        <div className="north-chart">
          {[34, 58, 46, 78, 65, 92].map((height, index) => (
            <i key={height} style={{ height: `${height}%`, animationDelay: `${index * 90}ms` }} />
          ))}
        </div>
      </div>
    );
  }

  if (visual === "forma") {
    return (
      <div className="project-art art-forma" aria-label={`${title} interface preview`} role="img">
        <div className="forma-header">
          <span>FORMA / REVIEW 06</span>
          <span>12 COMMENTS</span>
        </div>
        <div className="forma-canvas">
          <div className="forma-poster">
            <span>SHIFT</span>
            <strong>THE<br />FRAME</strong>
          </div>
          <div className="comment-pin pin-one">1</div>
          <div className="comment-pin pin-two">2</div>
          <div className="comment-bubble">Increase the tension here ↗</div>
        </div>
        <div className="forma-users">
          <i>A</i><i>M</i><i>S</i><span>+8</span>
        </div>
      </div>
    );
  }

  return (
    <div className="project-art art-quiet" aria-label={`${title} interface preview`} role="img">
      <div className="quiet-meta">
        <span>QUIET HOURS</span>
        <span>SESSION 014</span>
      </div>
      <div className="quiet-time">42:17</div>
      <div className="waveform" aria-hidden="true">
        {[18, 40, 72, 34, 86, 48, 27, 64, 92, 44, 69, 22, 54, 78, 31, 58, 83, 42, 66, 25].map(
          (height, index) => (
            <i key={`${height}-${index}`} style={{ height: `${height}%`, animationDelay: `${index * -70}ms` }} />
          ),
        )}
      </div>
      <div className="quiet-status"><i /> DEEP SESSION</div>
      <div className="quiet-orbit"><span>PAUSE</span></div>
    </div>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const reduceMotion = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 180, damping: 22, mass: 0.55 });
  const springY = useSpring(rotateY, { stiffness: 180, damping: 22, mass: 0.55 });

  const handleMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (reduceMotion || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    rotateY.set(x * 5.5);
    rotateX.set(y * -4.5);
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.article
      className="project-row"
      initial={reduceMotion ? false : { opacity: 0, y: 64 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.9, ease }}
    >
      <div className="project-heading">
        <span className="project-index">/{project.index}</span>
        <div>
          <h3>{project.title}</h3>
          <p>{project.subtitle}</p>
        </div>
        <span className="project-year">{project.year}</span>
      </div>

      <div className="project-body">
        <button
          type="button"
          className="project-stage"
          onPointerMove={handleMove}
          onPointerLeave={resetTilt}
          onClick={() => setExpanded((current) => !current)}
          aria-expanded={expanded}
          aria-controls={`case-note-${project.visual}`}
          aria-label={`${expanded ? "Close" : "Open"} ${project.title} project note`}
          data-cursor="view"
        >
          <motion.div
            className="project-tilt"
            style={{
              rotateX: springX,
              rotateY: springY,
              transformPerspective: 1100,
            }}
          >
            <ProjectVisual visual={project.visual} title={project.title} />
            <div className="project-reveal" aria-hidden="true">
              <span>{expanded ? "CLOSE PROJECT NOTE" : "READ PROJECT NOTE"}</span>
              <span>↗</span>
            </div>
          </motion.div>
        </button>

        <div className="project-notes">
          <span className="eyebrow">{project.discipline}</span>
          <p>{project.description}</p>
          <div className="project-stack">{project.stack}</div>
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                id={`case-note-${project.visual}`}
                className="project-note"
                initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.42, ease }}
              >
                <span>THE PRODUCT DECISION</span>
                <p>{project.note}</p>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            className="text-link"
            type="button"
            onClick={() => setExpanded((current) => !current)}
            aria-expanded={expanded}
            aria-controls={`case-note-${project.visual}`}
          >
            <span>{expanded ? "Close project note" : "Read project note"}</span><span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function CapabilityRadar() {
  return (
    <div className="capability-radar" aria-label="Core capabilities">
      <div className="radar-ring ring-one" />
      <div className="radar-ring ring-two" />
      <div className="radar-ring ring-three" />
      <div className="radar-axis axis-x" />
      <div className="radar-axis axis-y" />
      <div className="radar-sweep" />
      <div className="radar-core"><span>BUILD</span><small>↗</small></div>
      {skills.map((skill, index) => (
        <div
          key={skill.name}
          className="skill-node"
          style={{
            left: skill.x,
            top: skill.y,
            "--delay": `${index * -0.43}s`,
          } as CSSProperties}
        >
          <span>{skill.name}</span>
          <small>{skill.note}</small>
        </div>
      ))}
    </div>
  );
}

function MagneticContact() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.45 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.45 });
  const reduceMotion = useReducedMotion();
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");

  const handleMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (reduceMotion || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - bounds.left - bounds.width / 2) * 0.12);
    y.set((event.clientY - bounds.top - bounds.height / 2) * 0.16);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const copyEmail = async () => {
    try {
      if (!navigator.clipboard) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText("hello@syafiadil.dev");
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
    window.setTimeout(() => setCopyStatus("idle"), 2400);
  };

  return (
    <motion.button
      type="button"
      className="magnetic-contact"
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onClick={() => void copyEmail()}
      style={{ x: springX, y: springY }}
      data-cursor="contact"
    >
      <span>{copyStatus === "copied" ? "COPIED ✓" : copyStatus === "failed" ? "COPY FAILED" : "COPY EMAIL"}</span>
      <span aria-hidden="true">↗</span>
      <span className="sr-only" role="status" aria-live="polite">
        {copyStatus === "copied" ? "Email address copied to clipboard." : copyStatus === "failed" ? "Could not copy the email address. Use the email link below." : ""}
      </span>
    </motion.button>
  );
}

function Cursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(cursorX, { stiffness: 420, damping: 34, mass: 0.32 });
  const ringY = useSpring(cursorY, { stiffness: 420, damping: 34, mass: 0.32 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const move = (event: PointerEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      const target = event.target as HTMLElement | null;
      setActive(Boolean(target?.closest("a, button, [data-cursor]")));
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [cursorX, cursorY]);

  return (
    <div className={`custom-cursor ${active ? "is-active" : ""}`} aria-hidden="true">
      <motion.i className="cursor-dot" style={{ x: cursorX, y: cursorY }} />
      <motion.i className="cursor-ring" style={{ x: ringX, y: ringY }} />
    </div>
  );
}

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const [theme, setTheme] = useState<"paper" | "ink">("paper");
  const reduceMotion = useReducedMotion();
  const experienceRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: experienceProgress } = useScroll({
    target: experienceRef,
    offset: ["start 78%", "end 72%"],
  });
  const heroY = useTransform(scrollYProgress, [0, 0.18], [0, reduceMotion ? 0 : 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.14], [1, reduceMotion ? 1 : 0.22]);

  useEffect(() => {
    const stored = window.localStorage.getItem("portfolio-theme");
    const frame = window.requestAnimationFrame(() => {
      if (stored === "ink" || stored === "paper") setTheme(stored);
    });
    const timer = window.setTimeout(() => setIntroComplete(true), reduceMotion ? 80 : 1150);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [reduceMotion]);

  const toggleTheme = () => {
    setTheme((current) => {
      const next = current === "paper" ? "ink" : "paper";
      window.localStorage.setItem("portfolio-theme", next);
      return next;
    });
  };

  return (
    <main className="portfolio-shell" data-theme={theme}>
      <a className="skip-link" href="#work">Skip to selected work</a>
      {!reduceMotion && <Cursor />}
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />

      <AnimatePresence>
        {!introComplete && (
          <motion.div
            className="intro-screen"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: reduceMotion ? 0.01 : 0.72, ease }}
            aria-hidden="true"
          >
            <div className="intro-meta"><span>PORTFOLIO / 2026</span><span>KUL—MY</span></div>
            <div className="intro-name">
              <motion.span
                initial={reduceMotion ? false : { y: "110%" }}
                animate={reduceMotion ? undefined : { y: 0 }}
                transition={{ duration: 0.64, ease }}
              >
                SYAFI ADIL
              </motion.span>
            </div>
            <div className="intro-meter">
              <motion.i
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.92, ease }}
              />
              <span>00 — 100</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="site-header">
        <a href="#top" className="wordmark" aria-label="Syafi Adil, back to top">
          <span>SA</span><i />
        </a>
        <nav aria-label="Primary navigation">
          <a href="#about"><small>01</small> About</a>
          <a href="#work"><small>02</small> Work</a>
          <a href="#experience"><small>03</small> Experience</a>
          <a href="#contact"><small>04</small> Contact</a>
        </nav>
        <div className="header-actions">
          <span className="availability"><i /> AVAILABLE Q4 ’26</span>
          <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "paper" ? "ink" : "paper"} mode`}>
            <span>{theme === "paper" ? "INK" : "PAPER"}</span><i />
          </button>
        </div>
      </header>

      <section id="top" className="hero-section">
        <div className="hero-grid" aria-hidden="true"><i className="scanner" /></div>
        <motion.div className="hero-content" style={{ y: heroY, opacity: heroOpacity }}>
          <div className="hero-kicker">
            <span>SYAFI ADIL</span>
            <span>PRODUCT ENGINEER / CREATIVE DEVELOPER</span>
            <span>KL 03°08′N 101°41′E</span>
          </div>
          <h1 aria-label="I build digital products">
            <span>I BUILD</span>
            <span className="outline-line">DIGITAL</span>
            <span>PRODUCTS<i>.</i></span>
          </h1>
          <div className="hero-bottom">
            <p>Product-minded software developer turning complex systems into fast, humane experiences.</p>
            <a className="hero-scroll" href="#work"><span>SCROLL TO WORK</span><i>↓</i></a>
            <div className="edition-mark"><span>REDLINE</span><small>ISSUE 01 / 2026</small></div>
          </div>
        </motion.div>
        <div className="registration-mark mark-left" aria-hidden="true">+</div>
        <div className="registration-mark mark-right" aria-hidden="true">+</div>
      </section>

      <section id="about" className="about-section page-gutter">
        <Reveal><SectionLabel index="01">ABOUT / PRACTICE</SectionLabel></Reveal>
        <div className="about-grid">
          <Reveal className="about-statement">
            <h2>I make complex things feel <em>inevitable.</em></h2>
          </Reveal>
          <Reveal className="about-copy" delay={0.08}>
            <p>I’m a product-minded software developer based in Kuala Lumpur. I work where engineering, interaction, and systems thinking meet—building interfaces that remain clear even when the product underneath is complex.</p>
            <p>My best work happens with ambitious teams who care about the details: how information moves, how feedback feels, and how a product earns trust over time.</p>
            <a href="#contact" className="text-link"><span>More about my approach</span><span>↗</span></a>
          </Reveal>
        </div>
        <div className="stats-row">
          {[
            ["08", "YEARS BUILDING"],
            ["24", "PRODUCT LAUNCHES"],
            ["06", "COUNTRIES / COLLABORATED"],
          ].map(([value, label], index) => (
            <Reveal className="stat" delay={index * 0.08} key={label}>
              <strong>{value}</strong><span>{label}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="work" className="work-section page-gutter">
        <Reveal>
          <SectionLabel index="02">SELECTED WORK / 2023—26</SectionLabel>
          <div className="section-intro">
            <h2>Selected<br /><span>case studies.</span></h2>
            <p>Four products, each shaped from the messy middle: systems thinking, interface craft, and production code.</p>
          </div>
        </Reveal>
        <div className="project-list">
          {projects.map((project) => <ProjectCard project={project} key={project.title} />)}
        </div>
      </section>

      <section id="skills" className="skills-section">
        <div className="page-gutter">
          <Reveal><SectionLabel index="03">CAPABILITIES / TOOLKIT</SectionLabel></Reveal>
          <div className="skills-grid">
            <Reveal className="skills-copy">
              <h2>Broad enough<br />to see the system.<br /><em>Deep enough</em><br />to build it.</h2>
              <p>I move comfortably from product framing to interaction details to resilient front-end architecture—then stay close enough to ship.</p>
              <div className="skills-legend"><i /> EXPLORE THE CAPABILITY MAP</div>
            </Reveal>
            <Reveal className="radar-wrap" delay={0.08}><CapabilityRadar /></Reveal>
          </div>
        </div>
      </section>

      <section id="experience" className="experience-section page-gutter" ref={experienceRef}>
        <Reveal><SectionLabel index="04">EXPERIENCE / LEDGER</SectionLabel></Reveal>
        <div className="experience-title">
          <Reveal><h2>Where I’ve<br />made <em>impact.</em></h2></Reveal>
          <Reveal delay={0.08}><p>A working history measured in clearer systems, stronger teams, and products people choose to return to.</p></Reveal>
        </div>
        <div className="timeline">
          <div className="timeline-rail"><motion.i style={{ scaleY: reduceMotion ? 1 : experienceProgress }} /></div>
          {experience.map((item, index) => (
            <Reveal className="timeline-row" delay={index * 0.07} key={item.years}>
              <span className="timeline-years">{item.years}</span>
              <div className="timeline-role"><h3>{item.role}</h3><span>{item.company}</span></div>
              <p>{item.detail}</p>
              <span className="timeline-number">0{index + 1}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-ticker" aria-hidden="true">
          <div>LET’S MAKE IT MATTER <i>✦</i> LET’S MAKE IT MATTER <i>✦</i> LET’S MAKE IT MATTER <i>✦</i></div>
        </div>
        <div className="page-gutter contact-inner">
          <Reveal><SectionLabel index="05">CONTACT / OPEN CHANNEL</SectionLabel></Reveal>
          <div className="contact-main">
            <Reveal className="contact-heading">
              <h2>HAVE A HARD<br />PROBLEM<span>?</span></h2>
              <p>Good. Those are the interesting ones.</p>
            </Reveal>
            <Reveal className="contact-action" delay={0.1}>
              <p>I’m available for select product engineering and creative development projects from Q4 2026. Write to <a className="contact-email" href="mailto:hello@syafiadil.dev">hello@syafiadil.dev</a>.</p>
              <MagneticContact />
              <small>CLICK TO COPY THE ADDRESS</small>
            </Reveal>
          </div>
          <footer>
            <span>© 2026 SYAFI ADIL</span>
            <div>
              <a href="https://github.com/syafiadil" target="_blank" rel="noreferrer">GITHUB ↗</a>
              <a href="https://www.linkedin.com/in/syafiadil" target="_blank" rel="noreferrer">LINKEDIN ↗</a>
              <a href="https://read.cv/syafiadil" target="_blank" rel="noreferrer">READ.CV ↗</a>
            </div>
            <a href="#top">BACK TO TOP ↑</a>
          </footer>
        </div>
      </section>
    </main>
  );
}
