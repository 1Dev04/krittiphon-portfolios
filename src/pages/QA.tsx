"use client";

import { useEffect, useState } from "react";
import { useTheme } from "../components/themeContext";

// ─────────────────────────────────────────────
// Font helpers
// ─────────────────────────────────────────────
const mono    = { fontFamily: "'Space Mono', monospace" } as const;
const crimson = { fontFamily: "'Lora', Georgia, serif" } as const;

// ─────────────────────────────────────────────
// Lang — local state lifted to page level
// ─────────────────────────────────────────────
type Lang = "EN" | "TH";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface QATheme {
  pageBg: string;
  gridLine: string;
  orbA: string;
  orbB: string;
  scanLine: string;
  bottomFade: string;
  eyebrow: string;
  eyebrowLine: string;
  headingSub: string;
  dot: string;
  cardBg: string;
  cardBgHov: string;
  cardBgOpen: string;
  cardBorder: (c: string, open: boolean) => string;
  cardShadow: (c: string, open: boolean) => string;
  topLine: (c: string) => string;
  labelColor: (c: string) => string;
  questionColor: (open: boolean) => string;
  answerColor: string;
  answer2Color: string;
  chevron: (c: string) => string;
  fadeLeft: string;
  fadeRight: string;
  accents: string[];
}

interface FAQ {
  question_en: string;
  question_th: string;
  answer_en: string;
  answer_th: string;
  answer2_en?: string;
  answer2_th?: string;
}

interface ActivitiePageProps {
  faqs?: FAQ[];
}

// ─────────────────────────────────────────────
// FAQ data — bilingual
// ─────────────────────────────────────────────
const DEFAULT_FAQS: FAQ[] = [
  {
    question_en: "What technologies do you specialise in?",
    question_th: "คุณเชี่ยวชาญเทคโนโลยีอะไรบ้าง?",
    answer_en: "Primarily Flutter, Python, FastAPI, and PostgreSQL for full-stack mobile development.",
    answer_th: "หลักๆ คือ Flutter, Python, FastAPI และ PostgreSQL สำหรับ Full-stack Mobile",
    answer2_en: "Also experienced with AI/ML pipelines, Docker, Firebase, and cloud infrastructure.",
    answer2_th: "รวมถึง AI/ML pipelines, Docker, Firebase และ Cloud Infrastructure ด้วย",
  },
  {
    question_en: "Are you open to freelance work?",
    question_th: "รับงาน Freelance ไหม?",
    answer_en: "Yes — feel free to reach out via the contact section.",
    answer_th: "รับครับ — ติดต่อได้ที่ช่อง Contact เลย",
  },
  {
    question_en: "How did you get into software development?",
    question_th: "เริ่มต้นเรียนพัฒนาซอฟต์แวร์ได้ยังไง?",
    answer_en: "Started with a C programming course, then progressively moved into backend and frontend.",
    answer_th: "เริ่มจากเรียนภาษา C แล้วค่อยๆ ขยับไปทำ Backend และ Frontend",
    answer2_en: "Senior project accelerated the learning curve significantly.",
    answer2_th: "โปรเจกต์ Senior ช่วยเร่ง Learning Curve ได้มากมาย",
  },
  {
    question_en: "What was your favourite project?",
    question_th: "โปรเจกต์ที่ชอบที่สุดคืออะไร?",
    answer_en: "ABCat Shop — integrating YOLO detection with GPT-4.1 mini for cat sizing was a completely new paradigm.",
    answer_th: "ABCat Shop — การใช้ YOLO ร่วมกับ GPT-4.1 mini วัดขนาดแมวถือเป็น Paradigm ใหม่เลย",
  },
  {
    question_en: "What AI models have you worked with?",
    question_th: "เคยใช้ AI Models อะไรบ้าง?",
    answer_en: "YOLO v8 for object detection, Gemini 2.5 Flash and GPT-4.1 mini for vision analysis.",
    answer_th: "YOLO v8 สำหรับ Object Detection, Gemini 2.5 Flash และ GPT-4.1 mini สำหรับ Vision",
    answer2_en: "Also experimented with Google AI Studio and OpenAI API for various tasks.",
    answer2_th: "ยังลองใช้ Google AI Studio และ OpenAI API สำหรับงานหลายประเภทด้วย",
  },
  {
    question_en: "What is your development workflow?",
    question_th: "Workflow การพัฒนาของคุณเป็นอย่างไร?",
    answer_en: "Agile-inspired: plan → design → implement → test → deploy.",
    answer_th: "แบบ Agile: วางแผน → ออกแบบ → พัฒนา → ทดสอบ → Deploy",
    answer2_en: "CI/CD via Jenkins, version control with Git, deployment on Render.",
    answer2_th: "CI/CD ด้วย Jenkins, Version Control ด้วย Git, Deploy บน Render",
  },
];

// ─────────────────────────────────────────────
// ☀️ Natural theme
// ─────────────────────────────────────────────
const SUN_QA: QATheme = {
  pageBg: "linear-gradient(160deg, #f5f7f4 0%, #eef4ee 50%, #f0f5f0 100%)",
  gridLine: "rgba(45,106,79,0.04)",
  orbA: "rgba(45,106,79,0.09)",
  orbB: "rgba(82,183,136,0.07)",
  scanLine: "rgba(45,106,79,0.07)",
  bottomFade: "linear-gradient(transparent, #eef4ee)",
  eyebrow: "#2d6a4f",
  eyebrowLine: "rgba(45,106,79,0.35)",
  headingSub: "rgba(20,50,30,0.45)",
  dot: "#2d6a4f",
  cardBg: "rgba(255,255,255,0.78)",
  cardBgHov: "rgba(255,255,255,0.97)",
  cardBgOpen: "rgba(255,255,255,0.97)",
  cardBorder: (c, open) => open ? `${c}66` : `${c}28`,
  cardShadow: (c, open) => open
    ? `0 0 28px ${c}1a, 0 12px 40px rgba(20,60,35,0.11), inset 0 1px 0 rgba(255,255,255,0.8)`
    : `0 2px 16px rgba(20,60,35,0.07), inset 0 1px 0 rgba(255,255,255,0.6)`,
  topLine: (c) => `linear-gradient(90deg, transparent, ${c}77, transparent)`,
  labelColor: (c) => c,
  questionColor: (open) => open ? "#1a3d28" : "rgba(20,50,30,0.70)",
  answerColor: "rgba(20,50,30,0.62)",
  answer2Color: "rgba(20,50,30,0.44)",
  chevron: (c) => c,
  fadeLeft: "linear-gradient(90deg, rgba(238,244,238,0.98), transparent)",
  fadeRight: "linear-gradient(270deg, rgba(238,244,238,0.98), transparent)",
  accents: ["#2d6a4f", "#1e6b5c", "#3a8a6e", "#2d7a55", "#1a5c38", "#3a8a6e"],
};

// ─────────────────────────────────────────────
// 🌙 Galaxy theme
// ─────────────────────────────────────────────
const MOON_QA: QATheme = {
  pageBg: "radial-gradient(ellipse at 20% 50%, #0f0528 0%, #060414 40%, #020210 100%)",
  gridLine: "rgba(167,139,250,0.025)",
  orbA: "rgba(124,58,237,0.14)",
  orbB: "rgba(6,182,212,0.10)",
  scanLine: "rgba(167,139,250,0.22)",
  bottomFade: "linear-gradient(transparent, #020210)",
  eyebrow: "#a78bfa",
  eyebrowLine: "rgba(124,58,237,0.45)",
  headingSub: "rgba(255,255,255,0.32)",
  dot: "#7c3aed",
  cardBg: "linear-gradient(135deg, rgba(10,8,30,0.60), rgba(20,12,50,0.60))",
  cardBgHov: "linear-gradient(135deg, rgba(18,12,48,0.88), rgba(32,16,68,0.88))",
  cardBgOpen: "linear-gradient(135deg, rgba(18,12,48,0.92), rgba(32,16,72,0.92))",
  cardBorder: (c, open) => open ? `${c}88` : `${c}30`,
  cardShadow: (c, open) => open
    ? `0 0 32px ${c}28, 0 20px 48px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)`
    : `0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.03)`,
  topLine: (c) => `linear-gradient(90deg, transparent, ${c}99, transparent)`,
  labelColor: (c) => c,
  questionColor: (open) => open ? "#e2d9f3" : "#c4b5fd",
  answerColor: "rgba(196,181,253,0.72)",
  answer2Color: "rgba(167,139,250,0.48)",
  chevron: (c) => c,
  fadeLeft: "linear-gradient(90deg, rgba(2,2,16,0.97), transparent)",
  fadeRight: "linear-gradient(270deg, rgba(2,2,16,0.97), transparent)",
  accents: ["#a78bfa", "#67e8f9", "#f472b6", "#34d399", "#fcd34d", "#818cf8"],
};

// ─────────────────────────────────────────────
// LangToggle — standalone pill, placed below carousel
// ─────────────────────────────────────────────
function LangToggle({ lang, setLang, isDark }: {
  lang: Lang;
  setLang: (l: Lang) => void;
  isDark: boolean;
}) {
  const bg          = isDark ? "rgba(255,255,255,0.06)"          : "rgba(255,255,255,0.85)";
  const border      = isDark ? "rgba(167,139,250,0.28)"          : "rgba(45,106,79,0.22)";
  const activeColor = isDark ? "#a78bfa"                         : "#1a3d28";
  const mutedColor  = isDark ? "rgba(167,139,250,0.38)"          : "rgba(20,50,30,0.30)";
  const pillBg      = isDark ? "rgba(167,139,250,0.16)"          : "rgba(45,106,79,0.11)";
  const pillShadow  = isDark
    ? "0 0 14px rgba(167,139,250,0.25)"
    : "0 0 8px rgba(45,106,79,0.14)";

  return (
    <div style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 3,
      background: bg,
      border: `1px solid ${border}`,
      borderRadius: 999,
      padding: "5px 6px",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      boxShadow: isDark
        ? "0 4px 20px rgba(124,58,237,0.18)"
        : "0 4px 16px rgba(20,60,35,0.10)",
    }}>
      {(["EN", "TH"] as const).map((l) => {
        const active = lang === l;
        return (
          <button
            key={l}
            onClick={() => setLang(l)}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.14em",
              color: active ? activeColor : mutedColor,
              background: active ? pillBg : "transparent",
              border: "none",
              borderRadius: 999,
              padding: "6px 16px",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(.22,.68,0,1.2)",
              boxShadow: active ? pillShadow : "none",
              transform: active ? "scale(1.06)" : "scale(1)",
            }}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────
// FAQCard
// ─────────────────────────────────────────────
function FAQCard({ faq, color, tk, lang, onOpen, onClose }: {
  faq: FAQ;
  color: string;
  tk: QATheme;
  lang: Lang;
  onOpen: () => void;
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [hov,  setHov]  = useState(false);

  const isTH     = lang === "TH";
  const question = isTH ? faq.question_th : faq.question_en;
  const answer   = isTH ? faq.answer_th   : faq.answer_en;
  const answer2  = isTH ? faq.answer2_th  : faq.answer2_en;

  const toggle = () => {
    const next = !open;
    setOpen(next);
    next ? onOpen() : onClose();
  };

  const qFont    = isTH ? "'Sarabun', sans-serif"           : "'Cinzel', serif";
  const bodyFont = isTH ? "'Sarabun', 'Noto Sans Thai', sans-serif" : "'Lora', Georgia, serif";

  return (
    <div
      onClick={toggle}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 300, flexShrink: 0,
        background: open ? tk.cardBgOpen : hov ? tk.cardBgHov : tk.cardBg,
        border: `1px solid ${tk.cardBorder(color, open)}`,
        borderRadius: 18, padding: "22px 20px", cursor: "pointer",
        transition: "all 0.38s cubic-bezier(.22,.68,0,1.2)",
        boxShadow: tk.cardShadow(color, open),
        backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
        userSelect: "none", position: "relative", overflow: "hidden", isolation: "isolate",
        transform: hov && !open ? "translateY(-5px) scale(1.01)" : "none",
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: "absolute", top: 0, left: "15%", right: "15%", height: 1.5,
        background: tk.topLine(color),
        opacity: open ? 1 : 0.35,
        transition: "opacity 0.35s ease",
      }} />

      {/* Corner brackets */}
      {(["tl","tr","bl","br"] as const).map(k => (
        <div key={k} style={{
          position: "absolute",
          top:    k[0]==="t" ? 8  : "auto",
          bottom: k[0]==="b" ? 8  : "auto",
          left:   k[1]==="l" ? 8  : "auto",
          right:  k[1]==="r" ? 8  : "auto",
          width: 10, height: 10,
          borderTop:    k[0]==="t" ? `1px solid ${color}44` : "none",
          borderBottom: k[0]==="b" ? `1px solid ${color}44` : "none",
          borderLeft:   k[1]==="l" ? `1px solid ${color}44` : "none",
          borderRight:  k[1]==="r" ? `1px solid ${color}44` : "none",
          opacity: open || hov ? 1 : 0,
          transition: "opacity 0.3s", pointerEvents: "none",
        }} />
      ))}

      {/* Label row */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
        <div style={{
          width: 6, height: 6, borderRadius: "50%",
          background: color, boxShadow: `0 0 8px ${color}`,
        }} />
        <span style={{ ...mono, fontSize: 9, letterSpacing: "0.25em", color: tk.labelColor(color), fontWeight: 700 }}>
          Q&amp;A
        </span>
        <span style={{
          marginLeft: "auto", fontSize: 12, color: tk.chevron(color), opacity: 0.75,
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.32s ease", display: "inline-block",
        }}>▾</span>
      </div>

      {/* Question */}
      <p style={{
        fontFamily: qFont,
        fontSize: isTH ? 14 : 13,
        fontWeight: 600,
        color: tk.questionColor(open),
        letterSpacing: isTH ? "0.01em" : "0.04em",
        lineHeight: 1.65,
        margin: "0 0 12px",
        transition: "color 0.3s ease",
      }}>
        {question}
      </p>

      {/* Answer — animated grid rows */}
      <div style={{
        display: "grid",
        gridTemplateRows: open ? "1fr" : "0fr",
        transition: "grid-template-rows 0.42s cubic-bezier(.23,1,.32,1)",
        opacity: open ? 1 : 0,
        transitionProperty: "grid-template-rows, opacity",
        transitionDuration: "0.42s, 0.3s",
      }}>
        <div style={{ overflow: "hidden" }}>
          <p style={{
            fontFamily: bodyFont,
            fontSize: isTH ? 13.5 : 13,
            color: tk.answerColor,
            lineHeight: 1.85,
            margin: "0 0 6px",
          }}>
            {answer}
          </p>
          {answer2 && (
            <p style={{
              fontFamily: bodyFont,
              fontSize: isTH ? 12.5 : 12,
              color: tk.answer2Color,
              lineHeight: 1.7,
              margin: 0,
            }}>
              {answer2}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// FAQCarousel
// ─────────────────────────────────────────────
function FAQCarousel({ faqs, tk, lang }: { faqs: FAQ[]; tk: QATheme; lang: Lang }) {
  const [paused, setPaused] = useState(false);
  const tripled    = [...faqs, ...faqs, ...faqs];
  const cardWidth  = 320;
  const totalWidth = cardWidth * faqs.length;
  const duration   = totalWidth / 55;

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

      {/* Fade edges */}
      <div style={{ position:"absolute", left:0, top:0, bottom:0, width:90, background:tk.fadeLeft, zIndex:2, pointerEvents:"none" }} />
      <div style={{ position:"absolute", right:0, top:0, bottom:0, width:90, background:tk.fadeRight, zIndex:2, pointerEvents:"none" }} />

      <div style={{ padding: "0 90px 28px" }}>
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
              lang={lang}
              onOpen={() => setPaused(true)}
              onClose={() => setPaused(false)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────
export default function ActivitiePage({ faqs = DEFAULT_FAQS }: ActivitiePageProps) {
  const { isDark }          = useTheme();
  const tk                  = isDark ? MOON_QA : SUN_QA;
  const [lang, setLang]     = useState<Lang>("EN");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const titleFont   = isDark ? "'Cinzel', serif" : "'Lora', serif";
  const titleColor  = isDark ? "#dac3f3" : "#1a3d28";
  const titleShadow = isDark
    ? "0 0 32px rgba(167,139,250,0.55), 0 2px 8px rgba(0,0,0,0.5)"
    : "0 1px 0 rgba(255,255,255,0.9), 0 2px 12px rgba(45,106,79,0.15)";

  const scrollbarThumb = isDark ? "#a78bfa33" : "#2d6a4f33";
  const scrollbarTrack = isDark ? "#020210"   : "#f0f5f0";

  // Divider / hint line color
  const hintColor = isDark ? "rgba(167,139,250,0.40)" : "rgba(45,106,79,0.28)";

  return (
    <section
      id="other-activites"
      style={{
        minHeight: "100vh", position: "relative",
        padding: "100px 0 120px", overflow: "hidden",
        background: tk.pageBg, isolation: "isolate",
        transition: "background 0.6s ease",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Space+Mono:wght@400;700&family=Lora:ital,wght@0,400;0,600;1,400;1,600&family=Sarabun:wght@400;500;600;700&display=swap');
        @keyframes qaReveal   { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes qaOrb      { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(16px,-14px) scale(1.04)} }
        @keyframes qaScan     { 0%{top:-2%} 100%{top:102%} }
        @keyframes qaDotPulse { 0%,100%{transform:scale(1);opacity:.6} 50%{transform:scale(1.6);opacity:1} }
        @keyframes langPop    { 0%{transform:scale(.92);opacity:0} 60%{transform:scale(1.04)} 100%{transform:scale(1);opacity:1} }
        * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:${scrollbarTrack}; }
        ::-webkit-scrollbar-thumb { background:${scrollbarThumb}; border-radius:3px; }
      `}</style>

      {/* Grid */}
      <div style={{
        position:"absolute", inset:0, pointerEvents:"none",
        backgroundImage:`linear-gradient(${tk.gridLine} 1px,transparent 1px),linear-gradient(90deg,${tk.gridLine} 1px,transparent 1px)`,
        backgroundSize:"72px 72px", zIndex:0,
      }} />

      {/* Orbs */}
      <div style={{ position:"absolute", width:560, height:560, top:"-15%", right:"-8%", borderRadius:"50%", filter:"blur(88px)", background:tk.orbA, animation:"qaOrb 16s ease-in-out infinite", pointerEvents:"none", transition:"background .6s" }} />
      <div style={{ position:"absolute", width:440, height:440, bottom:"0%", left:"-10%", borderRadius:"50%", filter:"blur(80px)", background:tk.orbB, animation:"qaOrb 20s ease-in-out 5s infinite", pointerEvents:"none", transition:"background .6s" }} />

      {/* Scanline */}
      <div style={{
        position:"absolute", left:0, right:0, height:2,
        background:`linear-gradient(90deg,transparent,${tk.scanLine},transparent)`,
        animation:"qaScan 12s linear infinite", pointerEvents:"none", zIndex:2,
        transition:"background .5s", opacity: isDark ? 1 : 0.5,
      }} />

      {/* Stars — galaxy only */}
      {isDark && Array.from({ length: 14 }, (_, i) => {
        const colors = ["#a78bfa","#67e8f9","#86efac","#fda4af","#fcd34d"];
        const c = colors[i % 5];
        return (
          <div key={i} style={{
            position:"absolute", left:`${(i*71.3)%100}%`, top:`${(i*43.7)%100}%`,
            width:(i%2)+1, height:(i%2)+1, borderRadius:"50%",
            background:c, boxShadow:`0 0 ${(i%2+1)*4}px ${c}`,
            animation:`qaOrb ${5+i%6}s ease-in-out ${(i*.3)%5}s infinite`,
            pointerEvents:"none", opacity:.55,
          }} />
        );
      })}

      {/* ── Content ── */}
      <div style={{ position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:64, padding:"0 24px", animation:"qaReveal 0.8s ease both" }}>

          {/* Eyebrow */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:14, marginBottom:14 }}>
            <div style={{ height:1, width:60, background:`linear-gradient(90deg,transparent,${tk.eyebrowLine})` }} />
            <span style={{ ...mono, fontSize:10, letterSpacing:".40em", color:tk.eyebrow, transition:"color .5s" }}>✦ 1DEV Codex ✦</span>
            <div style={{ height:1, width:60, background:`linear-gradient(90deg,${tk.eyebrowLine},transparent)` }} />
          </div>

          {/* Title */}
          <h2 style={{
            fontFamily: titleFont,
            fontStyle: isDark ? "normal" : "italic",
            fontSize: isMobile ? "clamp(26px,8vw,38px)" : "clamp(32px,4.5vw,52px)",
            fontWeight: 900, letterSpacing: ".08em",
            color: titleColor, textShadow: titleShadow,
            lineHeight: 1.1, marginBottom: 8,
            transition: "color .5s, text-shadow .5s, font-family .4s",
          }}>
            Q &amp; A
          </h2>

          {/* Sub */}
          <p style={{ ...crimson, fontSize:15, color:tk.headingSub, fontStyle:"italic", marginTop:12, letterSpacing:".06em", transition:"color .5s" }}>
            {lang === "TH" ? "Hover เพื่อหยุด · คลิกเพื่อขยาย" : "Hover to pause · Click to expand"}
          </p>

          {/* Divider */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, marginTop:20 }}>
            <div style={{ height:1, width:60, background:`linear-gradient(90deg,transparent,${tk.eyebrowLine})` }} />
            <span style={{ color:tk.dot, fontSize:12, animation:"qaDotPulse 2.5s ease-in-out infinite", display:"inline-block" }}>⬡</span>
            <div style={{ height:1, width:60, background:`linear-gradient(90deg,${tk.eyebrowLine},transparent)` }} />
          </div>
        </div>

        {/* ── Carousel ── */}
        <div style={{ animation: "qaReveal 0.8s 0.2s ease both" }}>
          <FAQCarousel faqs={faqs} tk={tk} lang={lang} />
        </div>

        {/* ══════════════════════════════════════
            LANG TOGGLE — below the carousel
        ══════════════════════════════════════ */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          marginTop: 36,
          animation: "qaReveal 0.8s 0.35s ease both",
        }}>
          {/* thin separator line */}
          <div style={{
            display: "flex", alignItems: "center", gap: 14, width: "100%", maxWidth: 320, padding: "0 24px",
          }}>
            <div style={{ flex:1, height:1, background:`linear-gradient(90deg,transparent,${hintColor})` }} />
            <span style={{ ...mono, fontSize:9, letterSpacing:".22em", color:isDark?"rgba(167,139,250,0.35)":"rgba(45,106,79,0.35)" }}>
              LANGUAGE
            </span>
            <div style={{ flex:1, height:1, background:`linear-gradient(90deg,${hintColor},transparent)` }} />
          </div>

          {/* The toggle pill */}
          <LangToggle lang={lang} setLang={setLang} isDark={isDark} />

          {/* micro hint */}
          <p style={{
            ...mono, fontSize:9, letterSpacing:".18em",
            color: isDark ? "rgba(167,139,250,0.28)" : "rgba(45,106,79,0.30)",
            margin:0,
          }}>
            {lang === "TH" ? "กำลังแสดง: ภาษาไทย" : "Currently showing: English"}
          </p>
        </div>

      </div>

      {/* Bottom fade */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:80, background:tk.bottomFade, pointerEvents:"none", transition:"background .5s" }} />
    </section>
  );
}