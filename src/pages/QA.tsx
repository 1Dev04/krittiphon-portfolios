import { useEffect, useState } from "react";
import { useTheme } from "../components/themeContext"

const cinzel = { fontFamily: "'Cinzel', serif" }
const mono = { fontFamily: "'Courier New', monospace" }
const crimson = { fontFamily: "'Crimson Text', Georgia, serif" }

// เพิ่มตรงบนสุด หลัง import
interface QATheme {
  pageBg: string
  gridLine: string
  orbA: string
  orbB: string
  scanLine: string
  bottomFade: string
  eyebrow: string
  eyebrowLine: string
  headingGrad: string
  headingSub: string
  dot: string
  cardBg: string
  cardBgHov: string
  cardBgOpen: string
  cardBorder: (c: string, open: boolean) => string
  cardShadow: (c: string, open: boolean) => string
  topLine: (c: string) => string
  labelColor: (c: string) => string
  questionColor: (open: boolean) => string
  answerColor: string
  answer2Color: string
  tagColor: (c: string) => string
  chevron: (c: string) => string
  dot2: string
  fadeLeft: string
  fadeRight: string
  accents: string[]
}



interface FAQ {
  question: string
  answer: string
  answer2?: string
}

interface ActivitiePageProps {
  faqs?: FAQ[]
}

const DEFAULT_FAQS: FAQ[] = [
  {
    question: "What technologies do you specialise in?",
    answer: "Primarily Flutter, Python, FastAPI, and PostgreSQL for full-stack mobile development.",
    answer2: "Also experienced with AI/ML pipelines, Docker, Firebase, and cloud infrastructure.",
  },
  {
    question: "Are you open to freelance work?",
    answer: "Yes — feel free to reach out via the contact section.",
  },
  {
    question: "How did you get into software development?",
    answer: "Started with a C programming course, then progressively moved into backend and frontend.",
    answer2: "Senior project accelerated the learning curve significantly.",
  },
  {
    question: "What was your favourite project?",
    answer: "ABCat Shop — integrating YOLO detection with GPT-4.1 mini for cat sizing was a completely new paradigm.",
  },
  {
    question: "What AI models have you worked with?",
    answer: "YOLO v8 for object detection, Gemini 2.5 Flash and GPT-4.1 mini for vision analysis.",
    answer2: "Also experimented with Google AI Studio and OpenAI API for various tasks.",
  },
  {
    question: "What is your development workflow?",
    answer: "Agile-inspired: plan → design → implement → test → deploy.",
    answer2: "CI/CD via Jenkins, version control with Git, deployment on Render.",
  },
]

// ── Theme tokens ──────────────────────────────────────────────────────────────
const SUN_QA = {
  pageBg: "linear-gradient(160deg,#f5f7f4 0%,#eef4ee 50%,#f0f5f0 100%)",
  gridLine: "rgba(45,106,79,0.04)",
  orbA: "rgba(45,106,79,0.08)",
  orbB: "rgba(82,183,136,0.06)",
  scanLine: "rgba(45,106,79,0.06)",
  bottomFade: "linear-gradient(transparent,#eef4ee)",
  eyebrow: "#2d6a4f",
  eyebrowLine: "rgba(45,106,79,0.35)",
  headingGrad: "linear-gradient(135deg,#1a3d28 0%,#2d6a4f 50%,#52b788 100%)",
  headingSub: "rgba(20,50,30,0.45)",
  dot: "#2d6a4f",
  // card
  cardBg: "rgba(255,255,255,0.80)",
  cardBgHov: "rgba(255,255,255,0.96)",
  cardBgOpen: "rgba(255,255,255,0.95)",
  cardBorder: (c: string, open: boolean) => open ? `${c}55` : `${c}22`,
  cardShadow: (c: string, open: boolean) => open
    ? `0 0 28px ${c}18, 0 12px 40px rgba(20,60,35,0.10)`
    : `0 2px 16px rgba(20,60,35,0.06)`,
  topLine: (c: string) => `linear-gradient(90deg,transparent,${c}66,transparent)`,
  labelColor: (c: string) => c,
  questionColor: (open: boolean) => open ? "#1a3d28" : "rgba(20,50,30,0.65)",
  answerColor: "rgba(20,50,30,0.58)",
  answer2Color: "rgba(20,50,30,0.42)",
  tagColor: (c: string) => c,
  chevron: (c: string) => c,
  dot2: "#2d6a4f",
  // fade
  fadeLeft: "linear-gradient(90deg,rgba(238,244,238,0.98),transparent)",
  fadeRight: "linear-gradient(270deg,rgba(238,244,238,0.98),transparent)",
  // accent colors per card
  accents: ["#2d6a4f", "#1e6b5c", "#3a8a6e", "#2d6a4f", "#1a5c38", "#3a8a6e"],
}

const MOON_QA = {
  pageBg: "radial-gradient(ellipse at 20% 50%,#0f0528 0%,#060414 40%,#020210 100%)",
  gridLine: "rgba(167,139,250,0.025)",
  orbA: "rgba(124,58,237,0.12)",
  orbB: "rgba(6,182,212,0.09)",
  scanLine: "rgba(167,139,250,0.18)",
  bottomFade: "linear-gradient(transparent,#020210)",
  eyebrow: "#7c3aed",
  eyebrowLine: "rgba(124,58,237,0.40)",
  headingGrad: "linear-gradient(135deg,#c4b5fd 0%,#818cf8 50%,#7dd3fc 100%)",
  headingSub: "rgba(255,255,255,0.32)",
  dot: "#7c3aed",
  // card
  cardBg: "linear-gradient(135deg,rgba(10,8,30,0.6),rgba(20,12,50,0.6))",
  cardBgHov: "linear-gradient(135deg,rgba(15,10,40,0.85),rgba(30,15,60,0.85))",
  cardBgOpen: "linear-gradient(135deg,rgba(15,10,40,0.85),rgba(30,15,60,0.85))",
  cardBorder: (c: string, open: boolean) => open ? `${c}88` : `${c}28`,
  cardShadow: (c: string, open: boolean) => open
    ? `0 0 30px ${c}22, 0 20px 40px rgba(0,0,0,0.4)`
    : `0 4px 20px rgba(0,0,0,0.2)`,
  topLine: (c: string) => `linear-gradient(90deg,transparent,${c}88,transparent)`,
  labelColor: (c: string) => c,
  questionColor: (open: boolean) => open ? "#e2d9f3" : "#c4b5fd",
  answerColor: "#8b7fc0",
  answer2Color: "#6b5fa0",
  tagColor: (c: string) => c,
  chevron: (c: string) => c,
  dot2: "#a78bfa",
  // fade
  fadeLeft: "linear-gradient(90deg,rgba(5,5,14,0.95),transparent)",
  fadeRight: "linear-gradient(270deg,rgba(5,5,14,0.95),transparent)",
  // accent colors per card
  accents: ["#7dd3fc", "#a78bfa", "#f472b6", "#34d399", "#fbbf24", "#818cf8"],
}

// ── FAQ Card ──────────────────────────────────────────────────────────────────
function FAQCard({ faq, color, tk, onOpen, onClose }: {
  faq: FAQ
  color: string
  tk: QATheme
  onOpen: () => void
  onClose: () => void
}) {
  const [open, setOpen] = useState(false)
  const [hov, setHov] = useState(false)

  const toggle = () => {
    const next = !open
    setOpen(next)
    next ? onOpen() : onClose()
  }

  return (
    <div
      onClick={toggle}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 300, flexShrink: 0,
        background: open ? tk.cardBgOpen : hov ? tk.cardBgHov : tk.cardBg,
        border: `1px solid ${tk.cardBorder(color, open)}`,
        borderRadius: 16, padding: "22px 20px",
        cursor: "pointer",
        transition: "all 0.35s cubic-bezier(.22,.68,0,1.2)",
        boxShadow: tk.cardShadow(color, open),
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        userSelect: "none", position: "relative",
        overflow: "hidden", isolation: "isolate",
        transform: hov && !open ? "translateY(-4px)" : "none",
      }}
    >
      {/* top accent line */}
      <div style={{
        position: "absolute", top: 0, left: "15%", right: "15%", height: 1.5,
        background: tk.topLine(color),
        opacity: open ? 1 : 0.3,
        transition: "opacity 0.35s ease",
      }} />

      {/* label row */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
        <div style={{
          width: 6, height: 6, borderRadius: "50%",
          background: color,
          boxShadow: `0 0 8px ${color}`,
        }} />
        <span style={{
          ...mono, fontSize: 9, letterSpacing: "0.25em",
          color: tk.labelColor(color), fontWeight: 700,
        }}>Q&A</span>
        <span style={{
          marginLeft: "auto", fontSize: 11,
          color: tk.chevron(color), opacity: 0.75,
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.3s ease",
          display: "inline-block",
        }}>▾</span>
      </div>

      {/* question */}
      <p style={{
        ...cinzel, fontSize: 13,
        color: tk.questionColor(open),
        letterSpacing: "0.04em", lineHeight: 1.6,
        margin: "0 0 12px",
        transition: "color 0.3s ease",
      }}>{faq.question}</p>

      {/* answer (animated) */}
      <div style={{
        display: "grid",
        gridTemplateRows: open ? "1fr" : "0fr",
        transition: "grid-template-rows 0.4s cubic-bezier(0.23,1,0.32,1)",
        opacity: open ? 1 : 0,
        transitionProperty: "grid-template-rows, opacity",
        transitionDuration: "0.4s, 0.3s",
      }}>
        <div style={{ overflow: "hidden" }}>
          <p style={{
            ...crimson, fontSize: 13,
            color: tk.answerColor,
            lineHeight: 1.75, margin: "0 0 6px",
          }}>{faq.answer}</p>
          {faq.answer2 && (
            <p style={{
              ...crimson, fontSize: 12,
              color: tk.answer2Color,
              lineHeight: 1.6, margin: 0,
            }}>{faq.answer2}</p>
          )}
        </div>
      </div>
    </div>
  )
}

// ── FAQ Carousel ──────────────────────────────────────────────────────────────
function FAQCarousel({ faqs, tk }: { faqs: FAQ[]; tk: QATheme }) {
  const [paused, setPaused] = useState(false)
  const tripled = [...faqs, ...faqs, ...faqs]
  const cardWidth = 320   // card 300 + gap 20
  const totalWidth = cardWidth * faqs.length
  const duration = totalWidth / 55

  return (
    <div
      style={{ overflow: "hidden", position: "relative" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <style>{`
        @keyframes scrollTrack {
          from { transform: translateX(0) translateZ(0); }
          to   { transform: translateX(-${totalWidth}px) translateZ(0); }
        }
      `}</style>

      {/* fade edges */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 80,
        background: tk.fadeLeft, zIndex: 2, pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: 80,
        background: tk.fadeRight, zIndex: 2, pointerEvents: "none"
      }} />

      <div style={{ padding: "0 80px 24px" }}>
        <div style={{
          display: "flex", gap: 20, width: "max-content",
          animation: `scrollTrack ${duration}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
          willChange: "transform",
        }}>
          {tripled.map((faq, i) => (
            <FAQCard
              key={i}
              faq={faq}
              color={tk.accents[i % tk.accents.length]}
              tk={tk}
              onOpen={() => setPaused(true)}
              onClose={() => setPaused(false)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function ActivitiePage({ faqs = DEFAULT_FAQS }: ActivitiePageProps) {
  const { isDark } = useTheme()
  const tk = isDark ? MOON_QA : SUN_QA
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return (

    <section
      id="other-activites"
      style={{
        minHeight: "100vh",
        position: "relative",
        padding: "100px 0 120px",
        overflow: "hidden",
        background: tk.pageBg,
        isolation: "isolate",
        transition: "background 0.5s ease",
      }}
    >
      <style>{`
        @keyframes qaReveal {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes qaOrb {
          0%,100% { transform:translate(0,0) scale(1); }
          50%     { transform:translate(16px,-14px) scale(1.04); }
        }
        @keyframes qaScan {
          0%   { top:-2%; }
          100% { top:102%; }
        }
      `}</style>

      {/* grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(${tk.gridLine} 1px,transparent 1px),linear-gradient(90deg,${tk.gridLine} 1px,transparent 1px)`,
        backgroundSize: "72px 72px",
        zIndex: 0,
      }} />

      {/* orbs */}
      <div style={{
        position: "absolute", width: 560, height: 560, top: "-15%", right: "-8%",
        borderRadius: "50%", filter: "blur(88px)",
        background: tk.orbA, animation: "qaOrb 16s ease-in-out infinite",
        pointerEvents: "none", transition: "background 0.5s",
      }} />
      <div style={{
        position: "absolute", width: 440, height: 440, bottom: "0%", left: "-10%",
        borderRadius: "50%", filter: "blur(80px)",
        background: tk.orbB, animation: "qaOrb 20s ease-in-out 5s infinite",
        pointerEvents: "none", transition: "background 0.5s",
      }} />

      {/* scan line */}
      <div style={{
        position: "absolute", left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg,transparent,${tk.scanLine},transparent)`,
        animation: "qaScan 12s linear infinite",
        pointerEvents: "none", zIndex: 2,
        transition: "background 0.5s",
      }} />

      {/* star dots — dark only */}
      {isDark && Array.from({ length: 14 }, (_, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${(i * 71.3) % 100}%`, top: `${(i * 43.7) % 100}%`,
          width: (i % 2) + 1, height: (i % 2) + 1, borderRadius: "50%",
          background: ["#a78bfa", "#67e8f9", "#86efac", "#fda4af", "#fcd34d"][i % 5],
          boxShadow: `0 0 ${(i % 2 + 1) * 4}px ${["#a78bfa", "#67e8f9", "#86efac", "#fda4af", "#fcd34d"][i % 5]}`,
          animation: `qaOrb ${5 + i % 6}s ease-in-out ${(i * .3) % 5}s infinite`,
          pointerEvents: "none", opacity: 0.55,
        }} />
      ))}

      {/* content */}
      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ── Header ── */}
        <div style={{
          textAlign: "center", marginBottom: 64,
          animation: "qaReveal 0.8s ease both",
        }}>
          {/* eyebrow */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 14 }}>
            <div style={{ height: 1, width: 60, background: `linear-gradient(90deg,transparent,${tk.eyebrowLine})` }} />
            <span style={{
              ...mono, fontSize: 10, letterSpacing: ".40em",
              color: tk.eyebrow, transition: "color 0.5s",
            }}>✦ 1DEV Codex ✦</span>
            <div style={{ height: 1, width: 60, background: `linear-gradient(90deg,${tk.eyebrowLine},transparent)` }} />
          </div>


          {/* heading */}
          <h2 style={{
            ...cinzel,
            fontFamily: isDark ? "'Cinzel', serif" : "'Lora', serif",
            fontSize: isMobile ? "clamp(26px,8vw,38px)" : "clamp(32px,4.5vw,52px)",
            fontWeight: 900, letterSpacing: ".08em",
            color: isDark ? "#dac3f3ff" : "#1a3d28",
            textShadow: isDark
              ? "0 0 32px rgba(167,139,250,0.55), 0 2px 8px rgba(0,0,0,0.5)"
              : "0 1px 0 rgba(255,255,255,0.9), 0 2px 12px rgba(45,106,79,0.15)",
            lineHeight: 1.1, marginBottom: 8,
            transition: "color .5s, text-shadow .5s",



          }}>Q &amp; A</h2>

          {/* sub */}
          <p style={{
            ...crimson, fontSize: 15,
            color: tk.headingSub,
            fontStyle: "italic", marginTop: 12,
            letterSpacing: ".06em",
            transition: "color 0.5s",
          }}>Hover to pause · Click to expand</p>

          {/* divider */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 20 }}>
            <div style={{ height: 1, width: 60, background: `linear-gradient(90deg,transparent,${tk.eyebrowLine})` }} />
            <span style={{ color: tk.dot, fontSize: 12 }}>⬡</span>
            <div style={{ height: 1, width: 60, background: `linear-gradient(90deg,${tk.eyebrowLine},transparent)` }} />
          </div>
        </div>

        {/* ── Carousel ── */}
        <div style={{ animation: "qaReveal 0.8s 0.2s ease both" }}>
          <FAQCarousel faqs={faqs} tk={tk} />
        </div>

      </div>

      {/* bottom fade */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 80,
        background: tk.bottomFade,
        pointerEvents: "none", transition: "background 0.5s",
      }} />
    </section>
  )
}