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
import Image from "next/image";
import {
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

type Project = {
  index: string;
  title: string;
  subtitle: string;
  description: string;
  stack: string;
  note: string;
  year: string;
  discipline: string;
  visual: string;
  repoUrl: string | null;
  isPrivate: boolean;
};

const projects: readonly Project[] = [
  {
    index: "01",
    title: "LONJAK",
    subtitle: "Adaptive Mathematics, built for Malaysian learners.",
    description:
      "An Android-first learning companion that turns the complete Form 1–5 KSSM Mathematics curriculum into short adaptive missions, multilingual practice, and contextual AI guidance.",
    stack: "Expo 57 · React Native · TypeScript · Supabase · Groq",
    note: "The learning loop combines 53 chapters and 305 curriculum-aligned questions with mastery analytics, offline-first progress, deterministic cloud sync, and privacy protected by Row Level Security.",
    year: "2026",
    discipline: "ADAPTIVE EDTECH",
    visual: "lonjak",
    repoUrl: null,
    isPrivate: true,
  },
  {
    index: "02",
    title: "Cafe Ordering System",
    subtitle: "Order ahead, from menu to pickup.",
    description:
      "A mobile-first ordering experience for Ruang Coffee Room, covering menu discovery, drink customisation, basket review, pickup scheduling, payment selection, order tracking, history, and rewards.",
    stack: "HTML · CSS · JavaScript · Node.js",
    note: "The product flow carries a customer from signature drink discovery through modifiers, checkout, and collection status, with past-order reordering and a points-based rewards view.",
    year: "2026",
    discipline: "MOBILE COMMERCE",
    visual: "cafe",
    repoUrl: null,
    isPrivate: true,
  },
  {
    index: "03",
    title: "Aurum Jets",
    subtitle: "Private aviation, rendered in motion.",
    description:
      "A cinematic aviation experience centered on a textured Boeing 737, combining real-time 3D, scroll choreography, smooth navigation, and responsive lead capture.",
    stack: "Three.js · GSAP · Lenis · HTML/CSS/JS",
    note: "The experience uses a detailed GLB aircraft with a procedural fallback, keeping the motion-led story robust while remaining a zero-build static site.",
    year: "2026",
    discipline: "CREATIVE DEVELOPMENT",
    visual: "aurum",
    repoUrl: "https://github.com/syafiadil1/aurum-jets",
    isPrivate: false,
  },
  {
    index: "04",
    title: "StudentCore System",
    subtitle: "One command center for university life.",
    description:
      "A local-first academic organizer for courses, weekly timetables, tasks, assessments, deadlines, and course files in one terminal-inspired web app.",
    stack: "Next.js · TypeScript · Tailwind CSS",
    note: "Each browser starts with a clean workspace and stores academic data on-device, bringing time, tasks, and study files into one focused daily dashboard.",
    year: "2026",
    discipline: "PRODUCT ENGINEERING",
    visual: "student",
    repoUrl: "https://github.com/syafiadil1/studentcoresystem",
    isPrivate: false,
  },
  {
    index: "05",
    title: "Commitment Manager System",
    subtitle: "Bills remembered, stress reduced.",
    description:
      "A cross-platform bills and commitments tracker for recurring and one-off payments, with due-date cycles, payment history, local persistence, and reminder-driven momentum.",
    stack: "Expo · React Native · TypeScript · AsyncStorage",
    note: "The app normalizes saved bills and payments before use, calculates recurring cycles locally, and keeps dashboard, add/edit, and history flows consistent across native and web.",
    year: "2026",
    discipline: "MOBILE FINANCE",
    visual: "commitment",
    repoUrl: "https://github.com/syafiadil1/commitmentapp",
    isPrivate: false,
  },
];

const cafeScreens = [
  { src: "/projects/cafe-home.webp", alt: "Ruang Coffee Room ordering home screen", width: 720, height: 1416 },
  { src: "/projects/cafe-menu.webp", alt: "Ruang coffee and bakes menu", width: 720, height: 1326 },
  { src: "/projects/cafe-customize.webp", alt: "Gula Melaka Oat Latte customisation screen", width: 720, height: 1463 },
  { src: "/projects/cafe-cart.webp", alt: "Ruang order basket summary", width: 720, height: 1398 },
  { src: "/projects/cafe-checkout.webp", alt: "Pickup time and payment selection", width: 720, height: 1410 },
  { src: "/projects/cafe-review.webp", alt: "Ruang final order review", width: 720, height: 1459 },
  { src: "/projects/cafe-confirmed.webp", alt: "Ruang order confirmation screen", width: 720, height: 1374 },
  { src: "/projects/cafe-tracking.webp", alt: "Ruang live order status timeline", width: 720, height: 1413 },
  { src: "/projects/cafe-location.webp", alt: "Ruang Coffee Room pickup location", width: 720, height: 1391 },
  { src: "/projects/cafe-orders.webp", alt: "Ruang past order history", width: 720, height: 1401 },
  { src: "/projects/cafe-rewards.webp", alt: "Ruang customer rewards balance", width: 720, height: 1375 },
] as const;

const aurumScreens = [
  { src: "/projects/aurum-home.webp", alt: "Aurum Jets cinematic landing page", width: 1800, height: 965 },
  { src: "/projects/aurum-fleet.webp", alt: "Aurum Jets interactive fleet selection", width: 1800, height: 956 },
  { src: "/projects/aurum-craft.webp", alt: "Aurum Jets aircraft craft and cabin experience", width: 1800, height: 959 },
  { src: "/projects/aurum-reach.webp", alt: "Aurum Jets global reach experience", width: 1800, height: 965 },
  { src: "/projects/aurum-process.webp", alt: "Aurum Jets private acquisition process", width: 1800, height: 959 },
  { src: "/projects/aurum-contact.webp", alt: "Aurum Jets private consultation form", width: 1800, height: 974 },
] as const;

const studentScreenDefs = [
  { src: "/projects/student-01.jpg", alt: "StudentCore System dashboard overview", width: 1280, height: 654 },
  { src: "/projects/student-02.jpg", alt: "StudentCore courses and schedule view", width: 1280, height: 654 },
  { src: "/projects/student-03.jpg", alt: "StudentCore task and assessment tracker", width: 1280, height: 656 },
  { src: "/projects/student-04.jpg", alt: "StudentCore file management workspace", width: 1280, height: 658 },
  { src: "/projects/student-05.jpg", alt: "StudentCore terminal command interface", width: 1280, height: 655 },
  { src: "/projects/student-06.jpg", alt: "StudentCore data table and records", width: 1280, height: 656 },
  { src: "/projects/student-07.jpg", alt: "StudentCore settings and configuration", width: 1280, height: 658 },
];

const skills = [
  { name: "React", x: "12%", y: "18%", note: "Product interfaces" },
  { name: "TypeScript", x: "69%", y: "13%", note: "Confident contracts" },
  { name: "Supabase", x: "76%", y: "42%", note: "Secure cloud data" },
  { name: "React Native", x: "64%", y: "75%", note: "Mobile products" },
  { name: "Three.js", x: "13%", y: "69%", note: "Real-time 3D" },
  { name: "Next.js", x: "32%", y: "45%", note: "Modern web apps" },
  { name: "Product design", x: "39%", y: "86%", note: "Useful outcomes" },
] as const;

const experience = [
  {
    years: "2026—NOW",
    role: "Adaptive Learning Product",
    company: "LONJAK",
    detail:
      "Building an Android-first KSSM Mathematics companion with adaptive daily missions, multilingual learning, offline-first progress, and contextual AI tutoring.",
  },
  {
    years: "JUL 2026",
    role: "Creative WebGL Development",
    company: "Aurum Jets",
    detail:
      "Built a zero-build luxury aviation experience with a textured 3D aircraft, cinematic scroll choreography, smooth navigation, and a resilient visual fallback.",
  },
  {
    years: "JUL 2026",
    role: "Mobile Ordering Product",
    company: "Cafe Ordering System",
    detail:
      "Designed a mobile-first cafe journey spanning menu discovery, drink customisation, pickup checkout, live order tracking, history, and customer rewards.",
  },
  {
    years: "FEB—MAR 2026",
    role: "Product & Mobile Engineering",
    company: "StudentCore + Commitment",
    detail:
      "Shipped focused tools for academic planning and recurring bill management across Next.js, React Native, Expo, and local-first browser storage.",
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

const lonjakScreenDefs = [
  { src: "/projects/lonjak-snap.webp", alt: "LONJAK Snap and Practice screen", width: 720, height: 1561 },
  { src: "/projects/lonjak-notes.webp", alt: "LONJAK AI Class Notes recording screen", width: 720, height: 1561 },
  { src: "/projects/lonjak-home.webp", alt: "LONJAK adaptive learning home screen", width: 720, height: 1561 },
  { src: "/projects/lonjak-path.webp", alt: "LONJAK KSSM Mathematics learning path", width: 720, height: 1561 },
  { src: "/projects/lonjak-tutor.webp", alt: "LONJAK AI mathematics tutor screen", width: 720, height: 1561 },
];

function GalleryFigure({ artClass, toplineClass, topline, countLabel, countClass, screens, captionLeft, captionRight, title }: {
  artClass: string;
  toplineClass: string;
  topline: string;
  countLabel: string;
  countClass: string;
  screens: { src: string; alt: string; width: number; height: number }[];
  captionLeft: string;
  captionRight: string;
  title: string;
}) {
  return (
    <figure className={`project-art ${artClass}`} aria-label={`${title} product screens`}>
      <div className={`visual-topline ${toplineClass}`}>
        <span>{topline}</span>
        <span className={countClass}>{countLabel}</span>
      </div>
      <div className="gallery-fan">
        {screens.map((s, i) => (
          <div className={`gallery-screen gallery-screen--${i}`} key={s.src}>
            <Image src={s.src} alt={s.alt} width={s.width} height={s.height} sizes="(max-width: 767px) 24vw, 18vw" unoptimized />
          </div>
        ))}
      </div>
      <figcaption className="gallery-caption"><span>{captionLeft}</span><span>{captionRight}</span></figcaption>
    </figure>
  );
}

function ProjectVisual({ visual, title }: { visual: string; title: string }) {
  if (visual === "lonjak") {
    return (
      <GalleryFigure
        artClass="art-lonjak"
        toplineClass="lonjak-topline"
        topline="LONJAK / REAL PRODUCT SCREENS"
        countLabel="05 VIEWS"
        countClass="lonjak-live"
        screens={lonjakScreenDefs}
        captionLeft="ADAPTIVE LEARNING"
        captionRight="ANDROID FIRST"
        title={title}
      />
    );
  }

  if (visual === "aurum") {
    const picks = [aurumScreens[0], aurumScreens[5], aurumScreens[1], aurumScreens[2], aurumScreens[4]];
    return (
      <figure className="project-art art-aurum" aria-label={`${title} product screens`}>
        <div className="visual-topline aurum-topline">
          <span>AURUM JETS / CINEMATIC WEBGL</span>
          <span className="aurum-count">05 VIEWS</span>
        </div>
        <div className="gallery-stack">
          {picks.map((s, i) => (
            <div className={`gallery-stack-item stack-item--${i}`} key={s.src}>
              <Image src={s.src} alt={s.alt} width={s.width} height={s.height} sizes="(max-width: 767px) 72vw, 52vw" unoptimized />
            </div>
          ))}
        </div>
        <figcaption className="gallery-caption"><span>FLEET → CONSULTATION</span><span>REAL-TIME 3D</span></figcaption>
      </figure>
    );
  }

  if (visual === "student") {
    const picks = [studentScreenDefs[0], studentScreenDefs[1], studentScreenDefs[2], studentScreenDefs[3], studentScreenDefs[5]];
    return (
      <figure className="project-art art-student" aria-label={`${title} product screens`}>
        <div className="visual-topline student-topline">
          <span>STUDENTCORE / WORKSPACE</span>
          <span>05 PANELS</span>
        </div>
        <div className="gallery-stack">
          {picks.map((s, i) => (
            <div className={`gallery-stack-item stack-item--${i}`} key={s.src}>
              <Image src={s.src} alt={s.alt} width={s.width} height={s.height} sizes="(max-width: 767px) 72vw, 52vw" unoptimized />
            </div>
          ))}
        </div>
        <figcaption className="gallery-caption"><span>TERMINAL WORKSPACE</span><span>LOCAL FIRST</span></figcaption>
      </figure>
    );
  }

  if (visual === "cafe") {
    const picks = [cafeScreens[1], cafeScreens[3], cafeScreens[2], cafeScreens[5], cafeScreens[10]];
    return (
      <GalleryFigure
        artClass="art-cafe"
        toplineClass="cafe-topline"
        topline="RUANG / ORDERING FLOW"
        countLabel="05 VIEWS"
        countClass="cafe-count"
        screens={picks}
        captionLeft="MENU → PICKUP"
        captionRight="MOBILE ORDERING"
        title={title}
      />
    );
  }

  return (
    <figure className="project-art art-commitment" aria-label={`${title} interface preview`}>
      <div className="visual-topline commitment-topline">
        <span>COMMITMENT / DASHBOARD</span>
        <span>05 PANELS</span>
      </div>
      <div className="gallery-fan">
        <div className="gallery-screen gallery-screen--0 commitment-screen">
          <div className="commitment-card"><span className="commitment-card-label">DUE SOON</span><strong>04</strong><small>BILLS</small></div>
        </div>
        <div className="gallery-screen gallery-screen--1 commitment-screen">
          <div className="commitment-card"><span className="commitment-card-label">UPCOMING</span><strong>RM 428</strong><small>TOTAL</small></div>
        </div>
        <div className="gallery-screen gallery-screen--2 commitment-screen">
          <div className="commitment-card"><span className="commitment-card-label">CLOUD STORAGE</span><strong>RM 42</strong><small>MONTHLY</small></div>
        </div>
        <div className="gallery-screen gallery-screen--3 commitment-screen">
          <div className="commitment-card"><span className="commitment-card-label">MOBILE PLAN</span><strong>RM 98</strong><small>MONTHLY</small></div>
        </div>
        <div className="gallery-screen gallery-screen--4 commitment-screen">
          <div className="commitment-card"><span className="commitment-card-label">INSURANCE</span><strong>RM 288</strong><small>ANNUAL</small></div>
        </div>
      </div>
      <figcaption className="gallery-caption"><span>CYCLE 76%</span><span>PAID 08</span></figcaption>
    </figure>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const reduceMotion = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 180, damping: 22, mass: 0.55 });
  const springY = useSpring(rotateY, { stiffness: 180, damping: 22, mass: 0.55 });

  const handleMove = (event: ReactPointerEvent<HTMLElement>) => {
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

  const preview = (
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
        <span>{project.isPrivate ? "READ PRIVATE BUILD NOTE" : "OPEN GITHUB REPOSITORY"}</span>
        <span>↗</span>
      </div>
    </motion.div>
  );

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
        {project.repoUrl ? (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="project-stage"
            onPointerMove={handleMove}
            onPointerLeave={resetTilt}
            aria-label={`Open ${project.title} repository on GitHub`}
            data-cursor="view"
          >
            {preview}
          </a>
        ) : (
          <button
            type="button"
            className="project-stage"
            onPointerMove={handleMove}
            onPointerLeave={resetTilt}
            onClick={() => setExpanded((current) => !current)}
            aria-expanded={expanded}
            aria-controls={`case-note-${project.visual}`}
            aria-label={`${expanded ? "Close" : "Open"} ${project.title} private build note`}
            data-cursor="view"
          >
            {preview}
          </button>
        )}

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
          <div className="project-actions">
            {project.repoUrl ? (
              <a className="repo-link" href={project.repoUrl} target="_blank" rel="noreferrer">
                <span>VIEW SOURCE ON GITHUB</span><span aria-hidden="true">↗</span>
              </a>
            ) : (
              <div className="private-source" aria-label="Private proprietary repository">
                <span>PRIVATE REPOSITORY</span><span>PROPRIETARY SOURCE</span>
              </div>
            )}
            <button
              className="text-link"
              type="button"
              onClick={() => setExpanded((current) => !current)}
              aria-expanded={expanded}
              aria-controls={`case-note-${project.visual}`}
            >
              <span>{expanded ? "Close build note" : "Read build note"}</span><span aria-hidden="true">↗</span>
            </button>
          </div>
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
      await navigator.clipboard.writeText("syafiadil@gmail.com");
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
                SYAFI
              </motion.span>
              <motion.span
                className="intro-name-sub"
                initial={reduceMotion ? false : { y: "110%" }}
                animate={reduceMotion ? undefined : { y: 0 }}
                transition={{ duration: 0.64, ease, delay: 0.08 }}
              >
                PORTFOLIO
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
            ["05", "FEATURED PROJECTS"],
            ["03", "WEB / MOBILE / 3D"],
            ["2026", "CURRENT BUILD LOG"],
          ].map(([value, label], index) => (
            <Reveal className="stat" delay={index * 0.08} key={label}>
              <strong>{value}</strong><span>{label}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="work" className="work-section page-gutter">
        <Reveal>
          <SectionLabel index="02">SELECTED WORK / 2026</SectionLabel>
          <div className="section-intro">
            <h2>Selected<br /><span>case studies.</span></h2>
            <p>Five builds spanning adaptive education, real-time 3D, academic tooling, mobile product work, and a new client ordering system in progress.</p>
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
        <Reveal><SectionLabel index="04">EXPERIENCE / BUILD LOG</SectionLabel></Reveal>
        <div className="experience-title">
          <Reveal><h2>What I’ve<br />been <em>building.</em></h2></Reveal>
          <Reveal delay={0.08}><p>A development trail across adaptive learning, interactive 3D, academic tooling, mobile work, and client product foundations.</p></Reveal>
        </div>
        <div className="timeline">
          <div className="timeline-rail"><motion.i style={{ scaleY: reduceMotion ? 1 : experienceProgress }} /></div>
          {experience.map((item, index) => (
            <Reveal className="timeline-row" delay={index * 0.07} key={`${item.years}-${item.company}`}>
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
              <p>I’m available for select product engineering and creative development projects from Q4 2026. Write to <a className="contact-email" href="mailto:syafiadil@gmail.com">syafiadil@gmail.com</a>.</p>
              <MagneticContact />
              <small>CLICK TO COPY THE ADDRESS</small>
            </Reveal>
          </div>
          <footer>
            <a href="https://github.com/syafiadil1" target="_blank" rel="noreferrer">GITHUB ↗</a>
          </footer>
        </div>
      </section>
    </main>
  );
}
