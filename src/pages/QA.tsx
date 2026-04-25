"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useTheme } from "../components/themeContext";

const mono = { fontFamily: "'Space Mono', monospace" } as const;
const crimson = { fontFamily: "'Lora', Georgia, serif" } as const;

type Lang = "EN" | "TH";

interface QATheme {
  pageBg: string;
  gridLine: string;
  orbA: string;
  orbB: string;
  orbC: string;

  accent: string;
  accentGlow: string;
  accentB: string;


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

  toggleWrap: string;
  toggleWrapBorder: string;
  toggleWrapShadow: string;
  toggleActiveColor: string;
  toggleInactiveColor: string;

 

  headingFont: string;
  headingShadow: string;


  // hero
  heroBg: string;
  heroBorder: string;
  heroGlow: string;
  heroTitle: string;
  heroSub: string;
  heroTagBg: string;
  heroTagText: string;
  // stats
  statBg: string;
  statBorder: string;
  statTopLine: string;
  statNumberColor: string;
  statLabel: string;
  statSub: string;
  // section headers
  sectionColor: string;
  sectionLine: string;
  // planning image card
  imgCardBg: string;
  imgCardBorder: string;
  imgCardShadow: string;
  imgCaption: string;
  imgTag: string;
  imgTagBg: string;
  // timeline card
  headingColor: string;
  cardYear: string;
  taskNormal: string;
  techCat: string;
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

const DEFAULT_FAQS: FAQ[] = [
  {
    question_en: "What technologies do you specialise in?",
    question_th: "คุณเชี่ยวชาญเทคโนโลยีอะไรบ้าง?",
    answer_en: "I specialise in full-stack development using Flutter, FastAPI, and PostgreSQL, with hands-on experience in building production-ready mobile applications.",
    answer_th: "ผมเน้น Full-stack โดยใช้ Flutter, FastAPI และ PostgreSQL พร้อมประสบการณ์ทำแอปจริงระดับ production",
    answer2_en: "I also work with AI integration, CI/CD pipelines, and containerized deployment.",
    answer2_th: "รวมถึงการใช้งาน AI, CI/CD และระบบ container สำหรับ deploy",
  },

  {
    question_en: "What was your most impactful project?",
    question_th: "โปรเจกต์ที่มีผลกับคุณมากที่สุดคืออะไร?",
    answer_en: "ABCat Shop — an AI-powered mobile application for cat clothing size recommendation.",
    answer_th: "ABCat Shop — แอปมือถือที่ใช้ AI แนะนำขนาดเสื้อผ้าสำหรับแมว",
    answer2_en: "It includes an AI pipeline, backend APIs, CI/CD automation, and cloud deployment.",
    answer2_th: "มีทั้ง AI pipeline, Backend API, CI/CD และระบบ Deploy บน Cloud",
  },

  {
    question_en: "How did you design your AI system?",
    question_th: "ออกแบบระบบ AI ยังไง?",
    answer_en: "I built a multi-stage AI pipeline: image validation followed by size analysis.",
    answer_th: "ผมออกแบบเป็น AI pipeline แบบหลายขั้นตอน: ตรวจสอบภาพ → วิเคราะห์ขนาด",
    answer2_en: "I evaluated YOLO, Gemini, and GPT-4.1 mini, selecting models based on performance, cost, and scalability.",
    answer2_th: "มีการทดลอง YOLO, Gemini และ GPT-4.1 mini แล้วเลือกตาม performance, cost และ scalability",
  },

  {
    question_en: "Do you have real-world experience?",
    question_th: "มีประสบการณ์ทำงานจริงไหม?",
    answer_en: "Yes, I worked as a Full-Stack Developer Intern at ClickNext.",
    answer_th: "มีครับ ผมเคยเป็น Full-Stack Developer Intern ที่ ClickNext",
    answer2_en: "I developed internal systems, APIs, and participated in deployment workflows.",
    answer2_th: "ทำทั้งระบบภายใน, API และมีส่วนร่วมใน workflow การ deploy",
  },

  {
    question_en: "What kind of backend systems have you built?",
    question_th: "เคยสร้างระบบ Backend แบบไหนบ้าง?",
    answer_en: "I built RESTful APIs using FastAPI, including authentication, data validation, and structured responses.",
    answer_th: "ผมสร้าง RESTful API ด้วย FastAPI มีทั้ง auth, validation และ response ที่เป็นระบบ",
    answer2_en: "I also worked on system monitoring tools and backend services during my internship.",
    answer2_th: "รวมถึงระบบ monitor และ backend service ตอนฝึกงาน",
  },

  {
    question_en: "How do you handle deployment and DevOps?",
    question_th: "จัดการเรื่อง Deploy และ DevOps ยังไง?",
    answer_en: "I use Podman and Jenkins to automate build and deployment pipelines.",
    answer_th: "ผมใช้ Podman และ Jenkins ทำระบบ build และ deploy อัตโนมัติ",
    answer2_en: "I deploy applications on platforms like Render and Vercel with CI/CD workflows.",
    answer2_th: "Deploy บน Render และ Vercel พร้อม CI/CD",
  },

  {
    question_en: "What challenges have you faced?",
    question_th: "เคยเจอปัญหาอะไรบ้าง?",
    answer_en: "One major challenge was balancing AI performance, cost, and rate limits.",
    answer_th: "ปัญหาหลักคือการบาลานซ์ performance, cost และ rate limit ของ AI",
    answer2_en: "I solved it by switching models and designing fallback strategies.",
    answer2_th: "แก้โดยเปลี่ยน model และออกแบบ fallback strategy",
  },

  {
    question_en: "Are you open to work opportunities?",
    question_th: "เปิดรับโอกาสทำงานไหม?",
    answer_en: "Yes, I am open to full-time and freelance opportunities.",
    answer_th: "เปิดรับทั้งงานประจำและ freelance ครับ",
    answer2_en: "Feel free to contact me via the contact section.",
    answer2_th: "สามารถติดต่อได้ผ่านหน้า Contact",
  },
];

/* ══════════════════════════════════════════════════════
   ☀️  SUN — Natural Green Throne
══════════════════════════════════════════════════════ */
const SUN_QA: QATheme = {
  pageBg: "linear-gradient(160deg,#f5f7f4 0%,#eef4ee 50%,#f0f5f0 100%)",
  gridLine: "rgba(45,106,79,0.04)",
  orbA: "rgba(45,106,79,0.10)",
  orbB: "rgba(82,183,136,0.07)",
  orbC: "rgba(27,67,50,0.05)",
  scanLine: "rgba(45,106,79,0.06)",
  bottomFade: "linear-gradient(transparent,#eef4ee)",
  eyebrow: "#2d6a4f",
  eyebrowLine: "rgba(45,106,79,0.35)",
  headingColor: "#1a3d28",
  headingFont: "'Lora',serif",
  headingShadow: "0 1px 0 rgba(255,255,255,0.9),0 2px 12px rgba(45,106,79,0.15)",
  headingSub: "rgba(20,50,30,0.45)",
  // ── accent = forest green
  accent: "#2d6a4f",
  accentGlow: "#1a3d28",
  accentB: "#40916c",
  heroBg: "rgba(45,106,79,0.10)",
  heroBorder: "rgba(45,106,79,0.40)",
  heroGlow: "0 0 24px rgba(45,106,79,0.14)",
  heroTitle: "#1a3d28",
  heroSub: "#2d6a4f",
  heroTagBg: "rgba(45,106,79,0.12)",
  heroTagText: "#2d6a4f",
  statBg: "rgba(255,255,255,0.82)",
  statBorder: "rgba(45,106,79,0.20)",
  statTopLine: "linear-gradient(90deg,transparent,rgba(45,106,79,0.70),transparent)",
  statNumberColor: "#2d6a4f",
  statLabel: "#2d6a4f",
  statSub: "rgba(20,50,30,0.44)",
  sectionColor: "#2d6a4f",
  sectionLine: "linear-gradient(90deg,transparent,rgba(45,106,79,0.44))",
  imgCardBg: "rgba(255,255,255,0.90)",
  imgCardBorder: "rgba(45,106,79,0.28)",
  imgCardShadow: "0 8px 40px rgba(45,106,79,0.12),0 2px 12px rgba(20,60,35,0.09)",
  imgCaption: "rgba(20,50,30,0.62)",
  imgTag: "#2d6a4f",
  imgTagBg: "rgba(45,106,79,0.12)",
  cardBg: "rgba(255,255,255,0.82)",
  cardBgHov: "rgba(255,255,255,0.97)",
  cardYear: "rgba(20,50,30,0.32)",
  taskNormal: "rgba(20,50,30,0.62)",
  techCat: "rgba(20,50,30,0.34)",
  toggleWrap: "rgba(255,255,255,0.80)",
  toggleWrapBorder: "rgba(45,106,79,0.22)",
  toggleWrapShadow: "0 4px 20px rgba(20,60,35,0.10)",
  toggleActiveColor: "#1a3d28",
  toggleInactiveColor: "rgba(20,50,30,0.30)",

  cardBgOpen: "rgba(255,255,255,0.95)",

  cardBorder: (c, open) =>
    open ? `${c}88` : `${c}33`,

  cardShadow: (c, open) =>
    open
      ? `0 12px 40px ${c}55`
      : `0 4px 20px ${c}22`,

  topLine: (c) =>
    `linear-gradient(90deg,transparent,${c},transparent)`,

  labelColor: (c) => c,

  questionColor: (open) =>
    open ? "#111" : "#333",

  answerColor: "#333",
  answer2Color: "#555",

  chevron: (c) => c,

  fadeLeft: "linear-gradient(to right, rgba(255,255,255,0.9), transparent)",
  fadeRight: "linear-gradient(to left, rgba(255,255,255,0.9), transparent)",

  accents: ["#2d6a4f", "#40916c", "#74c69d"],
  dot: "#2d6a4f",
};

/* ══════════════════════════════════════════════════════
   🌙  MOON — Galaxy Magic Purple/Violet
══════════════════════════════════════════════════════ */
const MOON_QA: QATheme = {
  pageBg: "radial-gradient(ellipse at 20% 50%,#0f0528 0%,#060414 40%,#020210 100%)",
  gridLine: "rgba(167,139,250,0.025)",
  orbA: "rgba(124,58,237,0.16)",
  orbB: "rgba(167,139,250,0.12)",
  orbC: "rgba(192,132,252,0.10)",
  scanLine: "rgba(167,139,250,0.22)",
  bottomFade: "linear-gradient(transparent,#020210)",
  eyebrow: "#a78bfa",
  eyebrowLine: "rgba(167,139,250,0.45)",
  headingColor: "#e9d5ff",
  headingFont: "'Cinzel',serif",
  headingShadow: "0 0 32px rgba(167,139,250,0.55),0 2px 8px rgba(0,0,0,0.5)",
  headingSub: "rgba(255,255,255,0.34)",
  // ── accent = violet/lavender — consistent with galaxy theme
  accent: "#a78bfa",
  accentGlow: "#7c3aed",
  accentB: "#c084fc",
  heroBg: "rgba(167,139,250,0.10)",
  heroBorder: "rgba(167,139,250,0.44)",
  heroGlow: "0 0 32px rgba(167,139,250,0.22)",
  heroTitle: "#e9d5ff",
  heroSub: "#a78bfa",
  heroTagBg: "rgba(167,139,250,0.14)",
  heroTagText: "#a78bfa",
  statBg: "rgba(255,255,255,0.04)",
  statBorder: "rgba(167,139,250,0.24)",
  statTopLine: "linear-gradient(90deg,transparent,rgba(167,139,250,0.80),transparent)",
  statNumberColor: "#a78bfa",
  statLabel: "#a78bfa",
  statSub: "rgba(200,185,255,0.50)",
  sectionColor: "#a78bfa",
  sectionLine: "linear-gradient(90deg,transparent,rgba(167,139,250,0.44))",
  imgCardBg: "rgba(255,255,255,0.04)",
  imgCardBorder: "rgba(167,139,250,0.28)",
  imgCardShadow: "0 0 56px rgba(167,139,250,0.16),0 16px 48px rgba(0,0,0,0.50)",
  imgCaption: "rgba(220,200,255,0.72)",
  imgTag: "#a78bfa",
  imgTagBg: "rgba(167,139,250,0.14)",
  cardBg: "rgba(255,255,255,0.04)",
  cardBgHov: "linear-gradient(135deg,rgba(167,139,250,0.10),rgba(255,255,255,0.04))",
  cardYear: "rgba(200,185,255,0.35)",
  taskNormal: "rgba(200,185,255,0.62)",
  techCat: "rgba(200,185,255,0.32)",
  toggleWrap: "rgba(167,139,250,0.08)",
  toggleWrapBorder: "rgba(167,139,250,0.28)",
  toggleWrapShadow: "0 4px 24px rgba(124,58,237,0.18)",
  toggleActiveColor: "#e9d5ff",
  toggleInactiveColor: "rgba(200,185,255,0.32)",

  cardBgOpen: "rgba(167,139,250,0.08)",

  cardBorder: (c, open) =>
    open ? `${c}aa` : `${c}44`,

  cardShadow: (c, open) =>
    open
      ? `0 12px 50px ${c}66`
      : `0 4px 24px ${c}22`,

  topLine: (c) =>
    `linear-gradient(90deg,transparent,${c},transparent)`,

  labelColor: (c) => c,

  questionColor: () => "#e9d5ff",

  answerColor: "rgba(220,200,255,0.75)",
  answer2Color: "rgba(200,180,255,0.55)",

  chevron: (c) => c,

  fadeLeft: "linear-gradient(to right, #020210, transparent)",
  fadeRight: "linear-gradient(to left, #020210, transparent)",

  accents: ["#a78bfa", "#c084fc", "#67e8f9"],
  dot: "#a78bfa",
};

/* ── Lang Toggle ── */
/* ══════════════════════════════════════════════════════
   LANG TOGGLE
══════════════════════════════════════════════════════ */
function LangToggle({ lang, setLang, tk }: { lang: Lang; setLang: (l: Lang) => void; tk: QATheme }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 3,
      background: tk.toggleWrap, border: `1px solid ${tk.toggleWrapBorder}`,
      borderRadius: 999, padding: "5px 6px",
      backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
      boxShadow: tk.toggleWrapShadow, position: "relative",
    }}>
      {(["EN", "TH"] as Lang[]).map(l => {
        const active = lang === l;
        return (
          <button key={l} onClick={() => setLang(l)} style={{
            fontFamily: "'Space Mono',monospace",
            fontSize: 11, fontWeight: 700, letterSpacing: ".14em",
            color: active ? tk.toggleActiveColor : tk.toggleInactiveColor,
            background: active
              ? `linear-gradient(135deg,${tk.accent}28,${tk.accent}14)`
              : "transparent",
            border: active
              ? `1px solid ${tk.accent}66`
              : "1px solid transparent",
            borderRadius: 999, padding: "6px 18px", cursor: "pointer",
            boxShadow: active ? `0 0 14px ${tk.accent}33` : "none",
            transform: active ? "scale(1.05)" : "scale(1)",
            transition: "all .28s cubic-bezier(.22,.68,0,1.2)",
          }}>{l}</button>
        );
      })}
    </div>
  );
}

/* ── FAQ Card ── */
function FAQCard({ faq, color, tk, lang, onOpen, onClose }: {
  faq: FAQ; color: string; tk: QATheme; lang: Lang;
  onOpen: () => void; onClose: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [hov, setHov] = useState(false);

  // ─ KEY FIX: derive text directly, no state for lang ─
  const isTH = lang === "TH";
  const question = isTH ? faq.question_th : faq.question_en;
  const answer = isTH ? faq.answer_th : faq.answer_en;
  const answer2 = isTH ? faq.answer2_th : faq.answer2_en;

  const toggle = () => {
    const next = !open;
    setOpen(next);
    next ? onOpen() : onClose();
  };

  const qFont = isTH ? "'Sarabun',sans-serif" : "'Cinzel',serif";
  const bodyFont = isTH ? "'Sarabun','Noto Sans Thai',sans-serif" : "'Lora',Georgia,serif";

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
        // only transition layout/shadow — NOT color/font to avoid lang lag
        transition: "background 0.38s cubic-bezier(.22,.68,0,1.2),border-color 0.38s,box-shadow 0.38s,transform 0.28s",
        boxShadow: tk.cardShadow(color, open),
        backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
        userSelect: "none", position: "relative", overflow: "hidden", isolation: "isolate",
        transform: hov && !open ? "translateY(-5px) scale(1.01)" : "none",
      }}
    >
      {/* top accent */}
      <div style={{
        position: "absolute", top: 0, left: "15%", right: "15%", height: 1.5,
        background: tk.topLine(color),
        opacity: open ? 1 : 0.35,
        transition: "opacity 0.35s",
      }} />

      {/* corners */}
      {(["tl", "tr", "bl", "br"] as const).map(k => (
        <div key={k} style={{
          position: "absolute",
          top: k[0] === "t" ? 8 : "auto", bottom: k[0] === "b" ? 8 : "auto",
          left: k[1] === "l" ? 8 : "auto", right: k[1] === "r" ? 8 : "auto",
          width: 10, height: 10,
          borderTop: k[0] === "t" ? `1px solid ${color}44` : "none",
          borderBottom: k[0] === "b" ? `1px solid ${color}44` : "none",
          borderLeft: k[1] === "l" ? `1px solid ${color}44` : "none",
          borderRight: k[1] === "r" ? `1px solid ${color}44` : "none",
          opacity: open || hov ? 1 : 0,
          transition: "opacity 0.3s", pointerEvents: "none",
        }} />
      ))}

      {/* label row */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
        <div style={{
          width: 6, height: 6, borderRadius: "50%",
          background: color, boxShadow: `0 0 8px ${color}`
        }} />
        <span style={{
          ...mono, fontSize: 9, letterSpacing: "0.25em",
          color: tk.labelColor(color), fontWeight: 700
        }}>Q&amp;A</span>
        <span style={{
          marginLeft: "auto", fontSize: 12, color: tk.chevron(color), opacity: 0.75,
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.32s ease", display: "inline-block",
        }}>▾</span>
      </div>

      {/* question — NO color transition for instant lang change */}
      <p style={{
        fontFamily: qFont,
        fontSize: isTH ? 14 : 13,
        fontWeight: 600,
        color: tk.questionColor(open),
        letterSpacing: isTH ? "0.01em" : "0.04em",
        lineHeight: 1.65,
        margin: "0 0 12px",
        // intentionally no transition here — instant on lang switch
      }}>
        {question}
      </p>

      {/* answer — animated expand only */}
      <div style={{
        display: "grid",
        gridTemplateRows: open ? "1fr" : "0fr",
        transition: "grid-template-rows 0.42s cubic-bezier(.23,1,.32,1)",
        opacity: open ? 1 : 0,
        transitionProperty: "grid-template-rows,opacity",
        transitionDuration: "0.42s,0.3s",
      }}>
        <div style={{ overflow: "hidden" }}>
          {/* answer text: no transition — instant lang */}
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

/* ── FAQ Carousel ── */
function FAQCarousel({ faqs, tk, lang }: { faqs: FAQ[]; tk: QATheme; lang: Lang }) {
  const [paused, setPaused] = useState(false);
  // ─ KEY FIX: memoize tripled array — don't recreate on every lang change ─
  const tripled = useRef([...faqs, ...faqs, ...faqs]).current;
  const cardWidth = 320;
  const totalWidth = cardWidth * faqs.length;
  const duration = totalWidth / 55;

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

      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 90,
        background: tk.fadeLeft, zIndex: 2, pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: 90,
        background: tk.fadeRight, zIndex: 2, pointerEvents: "none"
      }} />

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

/* ── Main Page ── */
export default function ActivitiePage({ faqs = DEFAULT_FAQS }: ActivitiePageProps) {
  const { isDark } = useTheme();
  const tk = isDark ? MOON_QA : SUN_QA;
  const [lang, setLang] = useState<Lang>("EN");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // instant lang handler — no setTimeout/transition
  const handleLang = useCallback((l: Lang) => setLang(l), []);

  const titleFont = isDark ? "'Cinzel',serif" : "'Lora',serif";
  const titleColor = isDark ? "#dac3f3" : "#1a3d28";
  const titleShadow = isDark
    ? "0 0 32px rgba(167,139,250,0.55),0 2px 8px rgba(0,0,0,0.5)"
    : "0 1px 0 rgba(255,255,255,0.9),0 2px 12px rgba(45,106,79,0.15)";

  const hintColor = isDark ? "rgba(167,139,250,0.40)" : "rgba(45,106,79,0.28)";
  const scrollbarThumb = isDark ? "#a78bfa33" : "#2d6a4f33";
  const scrollbarTrack = isDark ? "#020210" : "#f0f5f0";

  return (
    <section id="other-activites" style={{
      minHeight: "100vh", position: "relative",
      padding: "100px 0 120px", overflow: "hidden",
      background: tk.pageBg, isolation: "isolate",
      transition: "background 0.6s ease",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Space+Mono:wght@400;700&family=Lora:ital,wght@0,400;0,600;1,400;1,600&family=Sarabun:wght@400;500;600;700&display=swap');
        @keyframes qaReveal   { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes qaOrb      { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(16px,-14px) scale(1.04)} }
        @keyframes qaScan     { 0%{top:-2%} 100%{top:102%} }
        @keyframes qaDotPulse { 0%,100%{transform:scale(1);opacity:.6} 50%{transform:scale(1.6);opacity:1} }
        * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:${scrollbarTrack}; }
        ::-webkit-scrollbar-thumb { background:${scrollbarThumb}; border-radius:3px; }
      `}</style>

      {/* grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `linear-gradient(${tk.gridLine} 1px,transparent 1px),linear-gradient(90deg,${tk.gridLine} 1px,transparent 1px)`,
        backgroundSize: "72px 72px"
      }} />

      {/* orbs */}
      <div style={{
        position: "absolute", width: 560, height: 560, top: "-15%", right: "-8%",
        borderRadius: "50%", filter: "blur(88px)", background: tk.orbA,
        animation: "qaOrb 16s ease-in-out infinite", pointerEvents: "none", transition: "background .6s"
      }} />
      <div style={{
        position: "absolute", width: 440, height: 440, bottom: "0%", left: "-10%",
        borderRadius: "50%", filter: "blur(80px)", background: tk.orbB,
        animation: "qaOrb 20s ease-in-out 5s infinite", pointerEvents: "none", transition: "background .6s"
      }} />

      {/* scan */}
      <div style={{
        position: "absolute", left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg,transparent,${tk.scanLine},transparent)`,
        animation: "qaScan 12s linear infinite", pointerEvents: "none", zIndex: 2,
        transition: "background .5s", opacity: isDark ? 1 : 0.5,
      }} />

      {/* stars — dark only */}
      {isDark && Array.from({ length: 14 }, (_, i) => {
        const colors = ["#a78bfa", "#67e8f9", "#86efac", "#fda4af", "#fcd34d"];
        const c = colors[i % 5];
        return (
          <div key={i} style={{
            position: "absolute",
            left: `${(i * 71.3) % 100}%`, top: `${(i * 43.7) % 100}%`,
            width: (i % 2) + 1, height: (i % 2) + 1, borderRadius: "50%",
            background: c, boxShadow: `0 0 ${(i % 2 + 1) * 4}px ${c}`,
            animation: `qaOrb ${5 + i % 6}s ease-in-out ${(i * .3) % 5}s infinite`,
            pointerEvents: "none", opacity: .55,
          }} />
        );
      })}

      {/* content */}
      <div style={{ position: "relative", zIndex: 1 }}>

        {/* header */}
        <div style={{
          textAlign: "center", marginBottom: 64, padding: "0 24px",
          animation: "qaReveal 0.8s ease both"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 14 }}>
            <div style={{ height: 1, width: 60, background: `linear-gradient(90deg,transparent,${tk.eyebrowLine})` }} />
            <span style={{
              ...mono, fontSize: 10, letterSpacing: ".40em",
              color: tk.eyebrow, transition: "color .5s"
            }}>✦ 1DEV CODEX ✦</span>
            <div style={{ height: 1, width: 60, background: `linear-gradient(90deg,${tk.eyebrowLine},transparent)` }} />
          </div>

          <h2 style={{
            fontFamily: titleFont,
            fontStyle: isDark ? "normal" : "italic",
            fontSize: isMobile ? "clamp(26px,8vw,38px)" : "clamp(32px,4.5vw,52px)",
            fontWeight: 900, letterSpacing: ".08em",
            color: titleColor, textShadow: titleShadow,
            lineHeight: 1.1, marginBottom: 8,
            transition: "color .5s,text-shadow .5s",
          }}>Q &amp; A</h2>

          <p style={{
            ...crimson, fontSize: 15, color: tk.headingSub,
            fontStyle: "italic", marginTop: 12, letterSpacing: ".06em",
            transition: "color .5s"
          }}>
            {lang === "TH" ? "Hover เพื่อหยุด · คลิกเพื่อขยาย" : "Hover to pause · Click to expand"}
          </p>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 20 }}>
            <div style={{ height: 1, width: 60, background: `linear-gradient(90deg,transparent,${tk.eyebrowLine})` }} />
            <span style={{
              color: tk.dot, fontSize: 12,
              animation: "qaDotPulse 2.5s ease-in-out infinite", display: "inline-block"
            }}>⬡</span>
            <div style={{ height: 1, width: 60, background: `linear-gradient(90deg,${tk.eyebrowLine},transparent)` }} />
          </div>
        </div>

        {/* carousel */}
        <div style={{ animation: "qaReveal 0.8s 0.2s ease both" }}>
          <FAQCarousel faqs={faqs} tk={tk} lang={lang} />
        </div>

        {/* lang toggle — no transition on wrapper */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          gap: 12, marginTop: 36,
          animation: "qaReveal 0.8s 0.35s ease both",
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 14,
            width: "100%", maxWidth: 320, padding: "0 24px",
          }}>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,transparent,${hintColor})` }} />
            <span style={{
              ...mono, fontSize: 9, letterSpacing: ".22em",
              color: isDark ? "rgba(167,139,250,0.35)" : "rgba(45,106,79,0.35)"
            }}>
              LANGUAGE
            </span>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${hintColor},transparent)` }} />
          </div>

          <LangToggle lang={lang} setLang={handleLang} tk={tk} />

          <p style={{
            ...mono, fontSize: 9, letterSpacing: ".18em", margin: 0,
            color: isDark ? "rgba(167,139,250,0.28)" : "rgba(45,106,79,0.30)"
          }}>
            {lang === "TH" ? "กำลังแสดง: ภาษาไทย" : "Currently showing: English"}
          </p>
        </div>

      </div>

      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 80,
        background: tk.bottomFade, pointerEvents: "none", transition: "background .5s"
      }} />
    </section>
  );
}