"use client"

import { useState, useRef, useEffect, useCallback } from "react"

const cinzel = { fontFamily: "'Cinzel', serif" }
const mono = { fontFamily: "'Courier New', monospace" }
const crimson = { fontFamily: "'Crimson Text', Georgia, serif" }

interface FAQ {
  question: string
  answer: string
  answer2?: string
}

interface ActivitiePageProps {
  images?: string[]
  faqs?: FAQ[]
}

const DEFAULT_IMAGES: string[] = [
  "https://placehold.co/600x600/0f0528/a78bfa?text=Activity+1",
  "https://placehold.co/600x600/0f0528/7dd3fc?text=Activity+2",
  "https://placehold.co/600x600/0f0528/f472b6?text=Activity+3",
  "https://placehold.co/600x600/0f0528/34d399?text=Activity+4",
  "https://placehold.co/600x600/0f0528/fbbf24?text=Activity+5",
  "https://placehold.co/600x600/0f0528/818cf8?text=Activity+6",
]

const DEFAULT_FAQS: FAQ[] = [
  {
    question: "What technologies do you specialise in?",
    answer: "Primarily React, TypeScript, and Go for backend services.",
    answer2: "Also experienced with PostgreSQL, Docker, and cloud infrastructure.",
  },
  {
    question: "Are you open to freelance work?",
    answer: "Yes — feel free to reach out via the contact section.",
  },
  {
    question: "How did you get into web development?",
    answer: "Started with a C programming course, then progressively moved into backend and frontend.",
    answer2: "Hackathons accelerated the learning curve significantly.",
  },
  {
    question: "What was your favourite hackathon project?",
    answer: "Chain Fusion Hacker House — working with ICP blockchain was a completely new paradigm.",
  },
]

// ─── Background: Orbs + Grid + Stars (matching Certificate page) ──────────────
function CosmicBackground() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      <style>{`
        @keyframes orbPulse {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50%       { opacity: 0.75; transform: scale(1.06); }
        }
        @keyframes orbPulse2 {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50%       { opacity: 0.55; transform: scale(1.04); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; transform: scale(0.8); }
          50%       { opacity: 1;    transform: scale(1.5); }
        }
      `}</style>

      {/* ── Base deep navy-purple gradient ── */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, #0d0a2e 0%, #100c38 30%, #0a0824 60%, #0c0930 100%)",
      }} />

      {/* ── Grid lines ── */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `
          linear-gradient(rgba(109,40,217,0.07) 1px, transparent 1px),
          linear-gradient(90deg, rgba(109,40,217,0.07) 1px, transparent 1px)
        `,
        backgroundSize: "72px 72px",
      }} />

      {/* ── Left large orb (purple) ── */}
      <div style={{
        position: "absolute",
        left: "-8vw", top: "5%",
        width: "38vw", height: "38vw",
        maxWidth: 520, maxHeight: 520,
        borderRadius: "50%",
        background: "radial-gradient(circle at 40% 40%, rgba(139,92,246,0.38) 0%, rgba(109,40,217,0.18) 45%, transparent 70%)",
        border: "1px solid rgba(139,92,246,0.18)",
        animation: "orbPulse 7s ease-in-out infinite",
        boxShadow: "0 0 80px rgba(109,40,217,0.2) inset, 0 0 120px rgba(109,40,217,0.12)",
      }} />

      {/* ── Left orb inner ring ── */}
      <div style={{
        position: "absolute",
        left: "-4vw", top: "9%",
        width: "28vw", height: "28vw",
        maxWidth: 380, maxHeight: 380,
        borderRadius: "50%",
        border: "1px solid rgba(139,92,246,0.12)",
        animation: "orbPulse 9s 1s ease-in-out infinite",
      }} />

      {/* ── Right large orb (teal/indigo) ── */}
      <div style={{
        position: "absolute",
        right: "-6vw", top: "-2%",
        width: "30vw", height: "30vw",
        maxWidth: 430, maxHeight: 430,
        borderRadius: "50%",
        background: "radial-gradient(circle at 60% 35%, rgba(56,189,248,0.18) 0%, rgba(99,102,241,0.22) 40%, rgba(109,40,217,0.3) 65%, transparent 80%)",
        border: "1px solid rgba(99,102,241,0.2)",
        animation: "orbPulse2 8s 0.5s ease-in-out infinite",
        boxShadow: "0 0 100px rgba(99,102,241,0.15) inset",
      }} />

      {/* ── Right orb outer ring ── */}
      <div style={{
        position: "absolute",
        right: "-10vw", top: "-5%",
        width: "38vw", height: "38vw",
        maxWidth: 520, maxHeight: 520,
        borderRadius: "50%",
        border: "1px solid rgba(99,102,241,0.1)",
        animation: "orbPulse2 10s 2s ease-in-out infinite",
      }} />

      {/* ── Subtle center nebula glow ── */}
      <div style={{
        position: "absolute",
        left: "50%", top: "30%",
        transform: "translate(-50%, -50%)",
        width: "60vw", height: "40vw",
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(109,40,217,0.06) 0%, transparent 70%)",
      }} />

      {/* ── Stars ── */}
      {[
        { left: "18%",  top: "12%",  s: 2,   d: 0,   c: "#c4b5fd" },
        { left: "35%",  top: "7%",   s: 1.5, d: 1.2, c: "#7dd3fc" },
        { left: "52%",  top: "18%",  s: 2.5, d: 2.1, c: "#c4b5fd" },
        { left: "66%",  top: "10%",  s: 1.5, d: 0.8, c: "#f9a8d4" },
        { left: "78%",  top: "22%",  s: 2,   d: 3,   c: "#7dd3fc" },
        { left: "42%",  top: "35%",  s: 1,   d: 1.5, c: "#c4b5fd" },
        { left: "24%",  top: "45%",  s: 2,   d: 4,   c: "#6ee7b7" },
        { left: "60%",  top: "50%",  s: 1.5, d: 0.3, c: "#c4b5fd" },
        { left: "82%",  top: "55%",  s: 2,   d: 2.5, c: "#7dd3fc" },
        { left: "12%",  top: "60%",  s: 1.5, d: 1.8, c: "#f9a8d4" },
        { left: "47%",  top: "70%",  s: 2.5, d: 3.5, c: "#c4b5fd" },
        { left: "30%",  top: "80%",  s: 1,   d: 0.6, c: "#7dd3fc" },
        { left: "72%",  top: "75%",  s: 2,   d: 4.2, c: "#c4b5fd" },
        { left: "88%",  top: "82%",  s: 1.5, d: 1.1, c: "#6ee7b7" },
        { left: "56%",  top: "88%",  s: 2,   d: 2.8, c: "#f9a8d4" },
        { left: "8%",   top: "30%",  s: 1.5, d: 0.9, c: "#c4b5fd" },
        { left: "91%",  top: "40%",  s: 1,   d: 3.3, c: "#7dd3fc" },
        { left: "38%",  top: "92%",  s: 2,   d: 1.7, c: "#c4b5fd" },
        { left: "74%",  top: "95%",  s: 1.5, d: 0.4, c: "#f9a8d4" },
        { left: "20%",  top: "96%",  s: 1,   d: 2.2, c: "#7dd3fc" },
      ].map((star, i) => (
        <div key={i} style={{
          position: "absolute",
          left: star.left, top: star.top,
          width: star.s, height: star.s,
          borderRadius: "50%",
          background: star.c,
          boxShadow: `0 0 ${star.s * 3}px ${star.c}`,
          animation: `twinkle ${2.5 + (i % 4) * 0.8}s ${star.d}s ease-in-out infinite`,
        }} />
      ))}
    </div>
  )
}

// ─── Portal Canvas Overlay ────────────────────────────────────────────────────
function PortalOverlay({
  active,
  origin,
  onDone,
}: {
  active: boolean
  origin: { x: number; y: number }
  onDone: () => void
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const DURATION = 1400

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const startTime = performance.now()
    const colors = ["#a78bfa", "#7dd3fc", "#f472b6", "#34d399", "#fbbf24"]
    const { x, y } = origin
    const maxR = Math.hypot(Math.max(x, canvas.width - x), Math.max(y, canvas.height - y)) * 1.4

    const draw = (now: number) => {
      const t = Math.min((now - startTime) / DURATION, 1)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const vAlpha = Math.sin(t * Math.PI) * 0.6
      const vGrad = ctx.createRadialGradient(x, y, 0, x, y, maxR)
      vGrad.addColorStop(0, `rgba(0,0,0,0)`)
      vGrad.addColorStop(0.4, `rgba(6,4,20,${vAlpha * 0.5})`)
      vGrad.addColorStop(1, `rgba(6,4,20,${vAlpha})`)
      ctx.fillStyle = vGrad
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const swirlT = Math.sin(t * Math.PI)
      for (let r = 0; r < 14; r++) {
        const angle = (r / 14) * Math.PI * 2 + t * Math.PI * 5
        const len = maxR * swirlT * 0.9
        const alpha = swirlT * 0.18
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(angle)
        ctx.strokeStyle = colors[r % colors.length] + Math.floor(alpha * 255).toString(16).padStart(2, "0")
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(6, 0)
        ctx.lineTo(len, 0)
        ctx.stroke()
        ctx.restore()
      }

      for (let i = 0; i < 8; i++) {
        const phase = ((i / 8) + t * 1.1) % 1
        const r = (1 - Math.pow(1 - phase, 2.2)) * maxR
        const alpha = (1 - phase) * 0.75 * swirlT
        const col = colors[i % colors.length]
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.strokeStyle = col + Math.floor(alpha * 255).toString(16).padStart(2, "0")
        ctx.lineWidth = 2.5
        ctx.stroke()
      }

      for (let i = 0; i < 5; i++) {
        const wR = (14 + i * 16) + Math.sin(t * Math.PI * 8 + i * 1.2) * 6
        const wA = swirlT * (0.55 - i * 0.09)
        ctx.beginPath()
        ctx.arc(x, y, wR, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(125,209,252,${wA})`
        ctx.lineWidth = 2
        ctx.stroke()
      }

      const coreR = 60 + Math.sin(t * Math.PI * 4) * 18
      const coreGrad = ctx.createRadialGradient(x, y, 0, x, y, coreR)
      coreGrad.addColorStop(0, `rgba(200,180,255,${swirlT})`)
      coreGrad.addColorStop(0.5, `rgba(167,139,250,${swirlT * 0.5})`)
      coreGrad.addColorStop(1, `rgba(125,100,240,0)`)
      ctx.fillStyle = coreGrad
      ctx.beginPath()
      ctx.arc(x, y, coreR, 0, Math.PI * 2)
      ctx.fill()

      if (t < 1) {
        rafRef.current = requestAnimationFrame(draw)
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        onDone()
      }
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafRef.current)
  }, [active])

  if (!active) return null
  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none" }}
    />
  )
}

// ─── Image Grid Item ──────────────────────────────────────────────────────────
function ImageGridItem({
  src,
  index,
  onClick,
}: {
  src: string
  index: number
  onClick: (e: React.MouseEvent, src: string) => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={(e) => onClick(e, src)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer",
        aspectRatio: "1",
        border: `1px solid ${hovered ? "rgba(167,139,250,0.5)" : "rgba(139,92,246,0.15)"}`,
        boxShadow: hovered
          ? "0 0 40px rgba(167,139,250,0.25), 0 20px 60px rgba(0,0,0,0.5)"
          : "0 4px 24px rgba(0,0,0,0.4)",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
        transform: hovered ? "scale(1.04)" : "scale(1)",
        willChange: "transform",
        animation: `gridReveal 0.6s ${index * 0.07}s ease both`,
      }}
    >
      <img src={src} alt={`activity ${index + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      <div style={{
        position: "absolute", inset: 0,
        background: hovered
          ? "linear-gradient(135deg, rgba(167,139,250,0.1) 0%, rgba(125,209,252,0.06) 50%, rgba(244,114,182,0.1) 100%)"
          : "transparent",
        transition: "background 0.3s ease",
      }} />
      <div style={{
        position: "absolute", bottom: 10, right: 10,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.25s ease, transform 0.25s ease",
        transform: hovered ? "translateY(0)" : "translateY(4px)",
        display: "flex", alignItems: "center", gap: 5,
        background: "rgba(6,4,20,0.8)",
        borderRadius: 20, padding: "4px 10px",
        border: "1px solid rgba(167,139,250,0.35)",
        backdropFilter: "blur(6px)",
      }}>
        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#a78bfa", boxShadow: "0 0 8px #a78bfa", display: "inline-block" }} />
        <span style={{ fontFamily: mono.fontFamily, fontSize: 8, letterSpacing: "0.2em", color: "#c4b5fd" }}>OPEN PORTAL</span>
      </div>
    </div>
  )
}

// ─── Expanded Image Modal ─────────────────────────────────────────────────────
function ImageModal({ src, onClose }: { src: string | null; onClose: () => void }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (src) {
      const t = setTimeout(() => setVisible(true), 480)
      return () => clearTimeout(t)
    } else {
      setVisible(false)
    }
  }, [src])

  if (!src) return null

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(2,2,16,0.88)",
        backdropFilter: "blur(14px)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: "min(82vw, 580px)",
          transform: visible ? "scale(1) translateY(0)" : "scale(0.55) translateY(50px)",
          transition: "transform 0.5s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s ease",
          opacity: visible ? 1 : 0,
        }}
      >
        <div style={{
          position: "absolute", inset: -3, borderRadius: 22,
          background: "linear-gradient(135deg, #a78bfa, #7dd3fc, #f472b6, #34d399, #a78bfa)",
          backgroundSize: "300% 300%",
          animation: "gradientSpin 2.5s linear infinite",
          zIndex: 0,
        }} />
        <div style={{
          position: "relative", zIndex: 1, borderRadius: 20, overflow: "hidden",
          boxShadow: "0 0 80px rgba(167,139,250,0.35), 0 0 160px rgba(125,209,252,0.15)",
        }}>
          <img src={src} alt="expanded" style={{ width: "100%", height: "auto", display: "block" }} />
        </div>
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: -14, right: -14, zIndex: 2,
            width: 34, height: 34, borderRadius: "50%",
            background: "rgba(6,4,20,0.95)",
            border: "1px solid rgba(167,139,250,0.45)",
            color: "#c4b5fd", fontSize: 14, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 20px rgba(167,139,250,0.3)",
          }}
        >✕</button>
      </div>
    </div>
  )
}

// ─── FAQ Carousel ─────────────────────────────────────────────────────────────
function FAQCarousel({ faqs }: { faqs: FAQ[] }) {
  const [paused, setPaused] = useState(false)
  const tripled = [...faqs, ...faqs, ...faqs]
  const accentColors = ["#7dd3fc", "#a78bfa", "#f472b6", "#34d399", "#fbbf24", "#818cf8"]
  const cardWidth = 300
  const totalWidth = cardWidth * faqs.length
  const duration = totalWidth / 60

  return (
    <div style={{ overflow: "hidden", position: "relative" }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <style>{`
        @keyframes scrollTrack {
          from { transform: translateX(0) translateZ(0); }
          to   { transform: translateX(-${totalWidth}px) translateZ(0); }
        }
      `}</style>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(90deg, #0d0a2e, transparent)", zIndex: 2, pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(270deg, #0d0a2e, transparent)", zIndex: 2, pointerEvents: "none" }} />
      <div style={{ padding: "0 80px 20px" }}>
        <div style={{
          display: "flex", gap: 20, width: "max-content",
          animation: `scrollTrack ${duration}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
          willChange: "transform",
        }}>
          {tripled.map((faq, i) => (
            <FAQCard key={i} faq={faq} color={accentColors[i % accentColors.length]} onOpen={() => setPaused(true)} onClose={() => setPaused(false)} />
          ))}
        </div>
      </div>
    </div>
  )
}

function FAQCard({ faq, color, onOpen, onClose }: { faq: FAQ; color: string; onOpen: () => void; onClose: () => void }) {
  const [open, setOpen] = useState(false)
  const toggle = () => { const n = !open; setOpen(n); n ? onOpen() : onClose() }

  return (
    <div onClick={toggle} style={{
      width: 280, flexShrink: 0,
      background: open ? "linear-gradient(135deg, rgba(15,10,40,0.98), rgba(30,15,60,0.98))" : "linear-gradient(135deg, rgba(10,8,30,0.9), rgba(20,12,50,0.9))",
      border: `1px solid ${open ? color + "88" : color + "33"}`,
      borderRadius: 16, padding: "22px 20px", cursor: "pointer",
      transition: "border-color 0.35s ease, box-shadow 0.35s ease",
      boxShadow: open ? `0 0 30px ${color}22, 0 20px 40px rgba(0,0,0,0.5)` : "0 4px 20px rgba(0,0,0,0.3)",
      userSelect: "none", position: "relative", overflow: "hidden", isolation: "isolate",
    }}>
      <div style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: 1, background: `linear-gradient(90deg, transparent, ${color}88, transparent)`, opacity: open ? 1 : 0.3, transition: "opacity 0.35s ease" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: color, boxShadow: `0 0 8px ${color}` }} />
        <span style={{ fontFamily: mono.fontFamily, fontSize: 9, letterSpacing: "0.25em", color, fontWeight: 700 }}>Q&A</span>
        <span style={{ marginLeft: "auto", fontSize: 10, color, opacity: 0.7, transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease", display: "inline-block" }}>▾</span>
      </div>
      <p style={{ fontFamily: cinzel.fontFamily, fontSize: 13, color: open ? "#e2d9f3" : "#c4b5fd", letterSpacing: "0.04em", lineHeight: 1.5, margin: "0 0 12px", transition: "color 0.3s ease" }}>{faq.question}</p>
      <div style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows 0.4s cubic-bezier(0.23,1,0.32,1)", opacity: open ? 1 : 0, transitionProperty: "grid-template-rows, opacity", transitionDuration: "0.4s, 0.3s" }}>
        <div style={{ overflow: "hidden" }}>
          <p style={{ fontFamily: crimson.fontFamily, fontSize: 13, color: "#8b7fc0", lineHeight: 1.7, margin: "0 0 6px" }}>{faq.answer}</p>
          {faq.answer2 && <p style={{ fontFamily: crimson.fontFamily, fontSize: 12, color: "#6b5fa0", lineHeight: 1.6, margin: 0 }}>{faq.answer2}</p>}
        </div>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ActivitiePage({
  images = DEFAULT_IMAGES,
  faqs = DEFAULT_FAQS,
}: ActivitiePageProps) {
  const [portalActive, setPortalActive] = useState(false)
  const [portalOrigin, setPortalOrigin] = useState({ x: 0, y: 0 })
  const [expandedSrc, setExpandedSrc] = useState<string | null>(null)
  const pendingSrc = useRef<string | null>(null)

  const handleImageClick = useCallback((e: React.MouseEvent, src: string) => {
    if (portalActive) return
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    setPortalOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
    pendingSrc.current = src
    setPortalActive(true)
  }, [portalActive])

  const handlePortalDone = useCallback(() => {
    setPortalActive(false)
    setExpandedSrc(pendingSrc.current)
    pendingSrc.current = null
  }, [])

  return (
    <section
      id="activity"
      style={{
        minHeight: "100vh",
        position: "relative",
        padding: "80px 0 120px",
        overflow: "hidden",
        // ── Transparent so CosmicBackground shows through ──
        background: "transparent",
      }}
    >
      {/* ── Keyframe styles ── */}
      <style>{`
        @keyframes sectionReveal {
          from { opacity: 0; transform: translateY(24px) translateZ(0); }
          to   { opacity: 1; transform: translateY(0) translateZ(0); }
        }
        @keyframes gridReveal {
          from { opacity: 0; transform: scale(0.9) translateZ(0); }
          to   { opacity: 1; transform: scale(1) translateZ(0); }
        }
        @keyframes gradientSpin {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* ── Cosmic background layer ── */}
      <CosmicBackground />

      <PortalOverlay active={portalActive} origin={portalOrigin} onDone={handlePortalDone} />
      <ImageModal src={expandedSrc} onClose={() => setExpandedSrc(null)} />

      {/* ── All content sits above background (z-index: 1) ── */}
      <div style={{ position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 60, animation: "sectionReveal 0.8s ease both" }}>
          <p style={{ fontFamily: cinzel.fontFamily, fontSize: 10, letterSpacing: "0.5em", color: "#6d28d9", margin: "0 0 12px" }}>✦ &nbsp; CHRONICLES &nbsp; ✦</p>
          <h2 style={{
            fontFamily: cinzel.fontFamily, fontWeight: 900, fontSize: "clamp(36px, 7vw, 72px)", letterSpacing: "0.12em",
            background: "linear-gradient(135deg, #c4b5fd 0%, #818cf8 50%, #7dd3fc 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", margin: 0,
          }}>ACTIVITY</h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 16 }}>
            <div style={{ height: 1, width: 60, background: "linear-gradient(90deg, transparent, #7c3aed)" }} />
            <span style={{ color: "#7c3aed", fontSize: 12 }}>⬡</span>
            <div style={{ height: 1, width: 60, background: "linear-gradient(90deg, #7c3aed, transparent)" }} />
          </div>
        </div>

        {/* Image Grid */}
        <div style={{ animation: "sectionReveal 0.8s 0.2s ease both", padding: "0 clamp(20px, 5vw, 80px)", marginBottom: 80 }}>
          <p style={{ fontFamily: mono.fontFamily, fontSize: 9, letterSpacing: "0.3em", color: "rgba(167,139,250,0.35)", textAlign: "center", marginBottom: 28 }}>
            ✦ &nbsp; CLICK ANY IMAGE TO OPEN THE PORTAL &nbsp; ✦
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(160px, 100%), 1fr))",
            gap: 14,
            maxWidth: 880,
            margin: "0 auto",
          }}>
            {images.map((src, i) => (
              <ImageGridItem key={i} src={src} index={i} onClick={handleImageClick} />
            ))}
          </div>
        </div>

        {/* Q&A Header */}
        <div style={{ textAlign: "center", marginBottom: 40, animation: "sectionReveal 0.8s 0.4s ease both" }}>
          <p style={{ fontFamily: cinzel.fontFamily, fontSize: 10, letterSpacing: "0.5em", color: "#6d28d9", margin: "0 0 10px" }}>✦ &nbsp; INQUIRIES &nbsp; ✦</p>
          <h2 style={{
            fontFamily: cinzel.fontFamily, fontWeight: 900, fontSize: "clamp(28px, 5vw, 52px)", letterSpacing: "0.12em",
            background: "linear-gradient(135deg, #fbbf24 0%, #f472b6 60%, #a78bfa 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", margin: 0,
          }}>Q &amp; A</h2>
          <p style={{ fontFamily: crimson.fontFamily, fontSize: 14, color: "#6b5fa0", fontStyle: "italic", marginTop: 10, letterSpacing: "0.08em" }}>
            Hover to pause · Click to expand
          </p>
        </div>

        {/* Carousel */}
        <div style={{ animation: "sectionReveal 0.8s 0.6s ease both" }}>
          <FAQCarousel faqs={faqs} />
        </div>

      </div>
    </section>
  )
}