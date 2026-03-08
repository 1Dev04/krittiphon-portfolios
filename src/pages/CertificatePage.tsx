"use client"

import { useMemo, useState } from "react"

// Font family constants — loaded via <link> in index.html (see note below)
// Add this to your public/index.html <head>:
// <link rel="preconnect" href="https://fonts.googleapis.com">
// <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
// <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
const cinzel = { style: { fontFamily: "'Cinzel', serif" } }
const crimsonText = { style: { fontFamily: "'Crimson Text', Georgia, serif" } }

const certificates = {
  frontend: [
    { title: "Basic React", desc: "Completed Basic React training to enhance digital skills for students.", tag: "FRONTEND" },
    { title: "Power BI", desc: "Completed Power BI basic training to enhance digital skills for students.", tag: "FRONTEND" },
    { title: "Cloud API", desc: "Completed Cloud API training to enhance digital skills for students.", tag: "FRONTEND" },
  ],
  backend: [
    { title: "Jenkins", desc: "Joined the Jenkins corporate training program.", tag: "BACKEND" },
    { title: "Ultimate Golang", desc: "Completed Golang backend course with Udemy.", tag: "BACKEND" },
    { title: "Java Programming", desc: "Completed Java Programming with Born to Dev. Built CheeseCake_Cafe with JAVA & PostgreSQL.", tag: "BACKEND" },
    { title: "C Programming", desc: "Completed Zero To One: C Programming with Born to Dev. Built CakeCafe_C project.", tag: "BACKEND" },
  ],
  other: [
    { title: "Krung Thai Bank", desc: "ธนาคารกรุงไทย | ผ่านการอบรม", tag: "SPECIAL" },
    { title: "Chula Mooc", desc: "Exploring Digital Technology Landscape | การสำรวจดิจิทัลเทคโนโลยี", tag: "SPECIAL" },
    { title: "Chain Fusion Hackathon", desc: "ICP Hub Thailand: Chain Fusion Hacker House", tag: "HACKATHON" },
    { title: "Hack to the Max", desc: "Hack to the Max: Digital Infrastructure", tag: "HACKATHON" },
    { title: "Network Cabling", desc: "Link American Standard: Network Cabling for Engineering", tag: "OTHER" },
    { title: "Generative AI & ChatGPT", desc: "อ. ดร.เอกพล ช่วงสุวนิช — How Generative AI & ChatGPT work.", tag: "AI" },
    { title: "Visual Storytelling with AI", desc: "ตุลย์ เล็กอุทัย & อ.วรรษยุต คงจันทร์", tag: "AI" },
    { title: "GenAI Tools Adaptation", desc: "ดร.อวิรุทธ์ ฉัตรมาลาทอง — Using GenAI tools for better outcomes.", tag: "AI" },
  ],
}

const tagColors: Record<string, string> = {
  FRONTEND: "#7dd3fc",
  BACKEND: "#a78bfa",
  SPECIAL: "#fbbf24",
  HACKATHON: "#f472b6",
  OTHER: "#34d399",
  AI: "#818cf8",
}

// ✅ FIX 2: Stabilize random values with useMemo — prevents SSR hydration mismatch
// Math.random() during SSR and client render produces different values → hydration error
// useMemo runs once on client, same values used for all re-renders
function StarField() {
  const stars = useMemo(
    () =>
      Array.from({ length: 80 }).map((_, i) => ({
        size: Math.random() * 2 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 4,
        dur: 2 + Math.random() * 3,
        colorIndex: i,
      })),
    [] // empty deps = compute once, stable across renders
  )

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      {stars.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            background:
              s.colorIndex % 5 === 0 ? "#a78bfa" : s.colorIndex % 3 === 0 ? "#7dd3fc" : "#ffffff",
            opacity: 0.6,
            animation: `twinkle ${s.dur}s ${s.delay}s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  )
}

function GridLines() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(139,92,246,0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(139,92,246,0.08) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }}
    />
  )
}

function RuneOrb({ x, y, size, color }: { x: string; y: string; size: number; color: string }) {
  return (
    <div
      style={{
        position: "fixed",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color}33 0%, transparent 70%)`,
        border: `1px solid ${color}44`,
        pointerEvents: "none",
        zIndex: 0,
        animation: "orbFloat 8s ease-in-out infinite alternate",
      }}
    />
  )
}

type Tab = "frontend" | "backend" | "other"

function CertCard({
  title,
  desc,
  tag,
  index,
}: {
  title: string
  desc: string
  tag: string
  index: number
}) {
  const [hovered, setHovered] = useState(false)
  const color = tagColors[tag] || "#a78bfa"

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: hovered
          ? `linear-gradient(135deg, rgba(15,10,40,0.95), rgba(30,15,60,0.95))`
          : `linear-gradient(135deg, rgba(10,8,30,0.9), rgba(20,12,50,0.9))`,
        border: `1px solid ${hovered ? color + "88" : color + "33"}`,
        borderRadius: 16,
        padding: "28px 24px",
        cursor: "default",
        transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
        // ✅ BONUS: 3D hover — rotateX adds depth tilt on hover for futuristic feel
        transform: hovered
          ? "translateY(-6px) scale(1.02) rotateX(4deg)"
          : "translateY(0) scale(1) rotateX(0deg)",
        transformStyle: "preserve-3d",
        perspective: "800px",
        boxShadow: hovered
          ? `0 0 30px ${color}22, 0 0 60px ${color}11, 0 20px 40px rgba(0,0,0,0.5)`
          : `0 4px 20px rgba(0,0,0,0.4)`,
        backdropFilter: "blur(12px)",
        animationDelay: `${index * 0.08}s`,
        animation: "cardReveal 0.6s ease forwards",
        opacity: 0,
        overflow: "hidden",
      }}
    >
      {/* Corner rune marks */}
      {(["top-left", "top-right", "bottom-left", "bottom-right"] as const).map((corner) => (
        <div
          key={corner}
          style={{
            position: "absolute",
            ...(corner.includes("top") ? { top: 8 } : { bottom: 8 }),
            ...(corner.includes("left") ? { left: 8 } : { right: 8 }),
            width: 12,
            height: 12,
            borderTop: corner.includes("top") ? `1px solid ${color}66` : "none",
            borderBottom: corner.includes("bottom") ? `1px solid ${color}66` : "none",
            borderLeft: corner.includes("left") ? `1px solid ${color}66` : "none",
            borderRight: corner.includes("right") ? `1px solid ${color}66` : "none",
          }}
        />
      ))}

      {/* Glow line top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "20%",
          right: "20%",
          height: 1,
          background: `linear-gradient(90deg, transparent, ${color}88, transparent)`,
          opacity: hovered ? 1 : 0.4,
          transition: "opacity 0.4s",
        }}
      />

      {/* Tag */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 14,
          padding: "3px 10px",
          borderRadius: 20,
          border: `1px solid ${color}44`,
          background: `${color}11`,
        }}
      >
        <div
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: color,
            boxShadow: `0 0 6px ${color}`,
          }}
        />
        <span
          style={{
            fontSize: 10,
            letterSpacing: "0.2em",
            color: color,
            fontFamily: "'Courier New', monospace",
            fontWeight: 700,
          }}
        >
          {tag}
        </span>
      </div>

      <h3
        style={{
          margin: "0 0 10px",
          fontSize: 18,
          fontFamily: cinzel.style.fontFamily,
          color: "#e2d9f3",
          letterSpacing: "0.05em",
          lineHeight: 1.3,
        }}
      >
        {title}
      </h3>

      <p
        style={{
          margin: 0,
          fontSize: 13,
          color: "#8b7fc0",
          fontFamily: crimsonText.style.fontFamily,
          lineHeight: 1.7,
        }}
      >
        {desc}
      </p>
    </div>
  )
}

export default function CertificatePage() {
  const [activeTab, setActiveTab] = useState<Tab>("frontend")

  // ✅ FIX 1: Removed unused `mounted` state
  // Previously: const [mounted, setMounted] = useState(false) / useEffect(() => { setMounted(true) }, [])
  // But `mounted` was never read in JSX → TypeScript lint warning + dead code
  // If you need SSR guard later, add: if (!mounted) return null

  const tabs: { key: Tab; label: string; glyph: string }[] = [
    { key: "frontend", label: "Front-End", glyph: "◈" },
    { key: "backend", label: "Back-End", glyph: "⬡" },
    { key: "other", label: "Others", glyph: "✦" },
  ]

  const currentCerts = certificates[activeTab]

  return (
    <section id="certificate"
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(ellipse at 20% 50%, #0f0528 0%, #060414 40%, #020210 100%)",
        position: "relative",
        overflowX: "hidden",
        fontFamily: "sans-serif",
      }}
    >
      <style>{`
        @keyframes twinkle {
          from { opacity: 0.2; transform: scale(0.8); }
          to   { opacity: 0.9; transform: scale(1.2); }
        }
        @keyframes orbFloat {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(20px, -30px) scale(1.05); }
        }
        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes titleReveal {
          from { opacity: 0; letter-spacing: 0.8em; }
          to   { opacity: 1; letter-spacing: 0.15em; }
        }
        @keyframes runeRotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes subtitleFade {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #060414; }
        ::-webkit-scrollbar-thumb { background: #4c1d95; border-radius: 2px; }
      `}</style>

      <GridLines />
      <StarField />

      {/* Ambient orbs */}
      <RuneOrb x="5%" y="10%" size={300} color="#7c3aed" />
      <RuneOrb x="70%" y="60%" size={400} color="#1d4ed8" />
      <RuneOrb x="85%" y="5%" size={200} color="#a78bfa" />
      <RuneOrb x="10%" y="70%" size={250} color="#4338ca" />

      <div style={{ position: "relative", zIndex: 10 }}>
        {/* Hero */}
        <div
          style={{
            textAlign: "center",
            padding: "80px 20px 60px",
            position: "relative",
          }}
        >
          {/* Rotating rune ring */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 320,
              height: 320,
              border: "1px solid rgba(139,92,246,0.12)",
              borderRadius: "50%",
              animation: "runeRotate 30s linear infinite",
            }}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: i % 3 === 0 ? "#7c3aed" : "rgba(139,92,246,0.3)",
                  top: `${50 - 50 * Math.cos((i * 30 * Math.PI) / 180)}%`,
                  left: `${50 + 50 * Math.sin((i * 30 * Math.PI) / 180)}%`,
                }}
              />
            ))}
          </div>

          <p
            style={{
              fontFamily: cinzel.style.fontFamily,
              fontSize: 11,
              letterSpacing: "0.5em",
              color: "#6d28d9",
              margin: "0 0 20px",
              animation: "subtitleFade 1s 0.2s ease forwards",
              opacity: 0,
            }}
          >
            ✦ &nbsp; ARCANE RECORD &nbsp; ✦
          </p>

          <h1
            style={{
              margin: 0,
              fontFamily: cinzel.style.fontFamily,
              fontWeight: 900,
              fontSize: "clamp(48px, 10vw, 96px)",
              letterSpacing: "0.15em",
              background:
                "linear-gradient(135deg, #c4b5fd 0%, #818cf8 40%, #7dd3fc 80%, #c4b5fd 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "titleReveal 1.2s 0.3s cubic-bezier(0.23,1,0.32,1) forwards",
              opacity: 0,
              position: "relative",
              zIndex: 1,
            }}
          >
            CERTIFICATE
          </h1>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              marginTop: 24,
              animation: "subtitleFade 1s 0.8s ease forwards",
              opacity: 0,
            }}
          >
            <div
              style={{
                height: 1,
                width: 80,
                background: "linear-gradient(90deg, transparent, #7c3aed)",
              }}
            />
            <span style={{ color: "#7c3aed", fontSize: 14 }}>⬡</span>
            <div
              style={{
                height: 1,
                width: 80,
                background: "linear-gradient(90deg, #7c3aed, transparent)",
              }}
            />
          </div>

          <p
            style={{
              marginTop: 20,
              fontFamily: crimsonText.style.fontFamily,
              fontSize: 16,
              color: "#6b5fa0",
              letterSpacing: "0.1em",
              fontStyle: "italic",
              animation: "subtitleFade 1s 1s ease forwards",
              opacity: 0,
            }}
          >
            A chronicle of knowledge, forged through trials and mastery
          </p>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 8,
            padding: "0 20px 50px",
            position: "relative",
            zIndex: 10,
          }}
        >
          {tabs.map((tab) => {
            const active = activeTab === tab.key
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: "10px 28px",
                  borderRadius: 40,
                  border: active
                    ? "1px solid #7c3aed"
                    : "1px solid rgba(139,92,246,0.2)",
                  background: active
                    ? "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(67,56,202,0.3))"
                    : "rgba(6,4,20,0.6)",
                  color: active ? "#c4b5fd" : "#6b5fa0",
                  fontFamily: cinzel.style.fontFamily,
                  fontSize: 13,
                  letterSpacing: "0.15em",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(10px)",
                  boxShadow: active ? "0 0 20px rgba(124,58,237,0.3)" : "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span style={{ fontSize: 12 }}>{tab.glyph}</span>
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Cards Grid */}
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 32px 120px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 24,
            position: "relative",
            zIndex: 5,
          }}
        >
          {currentCerts.map((cert, i) => (
            <CertCard key={`${activeTab}-${i}`} {...cert} index={i} />
          ))}
        </div>

     
      </div>
    </section>
  )
}