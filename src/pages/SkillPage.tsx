"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme, SUN, MOON } from "../components/themeContext"; // adjust path as needed

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface Skill {
    icon: string;
    iconColor: string;
    label: string;
    desc: string;
}

interface SectionData {
    id: string;
    title: string;
    rune: string;
    galaxyColor: string;
    galaxyGlow: string;
    naturalColor: string;
    naturalGlow: string;
    skills: Skill[];
}

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────
const sections: SectionData[] = [
    {
        id: "sec1",
        title: "Core Development & Languages",
        rune: "ᚠ",
        galaxyColor: "#a78bfa",
        galaxyGlow: "#7c3aed",
        naturalColor: "#2d6a4f",
        naturalGlow: "#1a3d28",
        skills: [
            { icon: "JS", iconColor: "#F7DF1E", label: "JavaScript", desc: "ES6+ Modern Web" },
            { icon: "TS", iconColor: "#3178C6", label: "TypeScript", desc: "Type-safe JS" },
            { icon: "🐍", iconColor: "#3776AB", label: "Python", desc: "Scripting & AI" },
            { icon: "Go", iconColor: "#00ADD8", label: "Go", desc: "High Performance" },
            { icon: "PHP", iconColor: "#777BB4", label: "PHP", desc: "Server-side Web" },
            { icon: "C", iconColor: "#A8B9CC", label: "C", desc: "Systems Level" },
            { icon: "C#", iconColor: "#239120", label: "C#", desc: "Microsoft Stack" },
            { icon: "☕", iconColor: "#ED8B00", label: "Java", desc: "Enterprise Apps" },
            { icon: "Lua", iconColor: "#8899ff", label: "Lua", desc: "Roblox Engine" },
            { icon: "R", iconColor: "#276DC3", label: "R", desc: "Data Analysis" },
            { icon: "🎯", iconColor: "#0175C2", label: "Dart", desc: "Flutter SDK" },
        ],
    },
    {
        id: "sec2",
        title: "Frontend & Mobile Development",
        rune: "ᚢ",
        galaxyColor: "#67e8f9",
        galaxyGlow: "#0891b2",
        naturalColor: "#1a5c38",
        naturalGlow: "#0f3320",
        skills: [
            { icon: "⚛", iconColor: "#61DAFB", label: "React", desc: "UI Components" },
            { icon: "▲", iconColor: "#888888", label: "Next.js", desc: "Full-stack React" },
            { icon: "V", iconColor: "#4FC08D", label: "Vue.js", desc: "Progressive UI" },
            { icon: "N", iconColor: "#00DC82", label: "Nuxt.js", desc: "Vue Meta-framework" },
            { icon: "🦋", iconColor: "#54C5F8", label: "Flutter", desc: "Cross-platform" },
            { icon: "H5", iconColor: "#E34F26", label: "HTML5", desc: "Semantic Web" },
            { icon: "C3", iconColor: "#1572B6", label: "CSS3", desc: "Modern Styling" },
        ],
    },
    {
        id: "sec3",
        title: "Backend & Database Architecture",
        rune: "ᚦ",
        galaxyColor: "#86efac",
        galaxyGlow: "#16a34a",
        naturalColor: "#386641",
        naturalGlow: "#1f3d26",
        skills: [
            { icon: "🐈", iconColor: "#E0234E", label: "NestJS", desc: "Node.js Server" },
            { icon: "⚡", iconColor: "#009688", label: "FastAPI", desc: "Python API" },
            { icon: "REST", iconColor: "#FF6B35", label: "REST API", desc: "API Design" },
            { icon: "📮", iconColor: "#FF6C37", label: "Postman", desc: "API Testing" },
            { icon: "PG", iconColor: "#336791", label: "PostgreSQL", desc: "Relational DB" },
            { icon: "MY", iconColor: "#4479A1", label: "MySQL", desc: "SQL Database" },
            { icon: "🍃", iconColor: "#47A248", label: "MongoDB", desc: "NoSQL" },
            { icon: "🔥", iconColor: "#FFCA28", label: "Firebase", desc: "Real-time DB" },
            { icon: "☁", iconColor: "#3448C5", label: "Cloudinary", desc: "Media CDN" },
        ],
    },
    {
        id: "sec4",
        title: "DevOps & Infrastructure",
        rune: "ᚨ",
        galaxyColor: "#fda4af",
        galaxyGlow: "#e11d48",
        naturalColor: "#4a6741",
        naturalGlow: "#2a3d20",
        skills: [
            { icon: "🐳", iconColor: "#2496ED", label: "Docker", desc: "Containerization" },
            { icon: "POD", iconColor: "#892CA0", label: "Podman", desc: "Rootless Containers" },
            { icon: "🌿", iconColor: "#F05032", label: "Git", desc: "Version Control" },
            { icon: "⚙", iconColor: "#2088FF", label: "GH Actions", desc: "CI/CD Pipeline" },
            { icon: "🐙", iconColor: "#555555", label: "GitHub", desc: "Code Hosting" },
            { icon: "🏺", iconColor: "#D33833", label: "Jenkins", desc: "Automation" },
            { icon: "🦊", iconColor: "#FC6D26", label: "GitLab", desc: "DevOps Platform" },
            { icon: "▲", iconColor: "#888888", label: "Vercel", desc: "Edge Deploy" },
            { icon: "NTL", iconColor: "#00C7B7", label: "Netlify", desc: "JAMstack" },
            { icon: "RDR", iconColor: "#46E3B7", label: "Render", desc: "Cloud Deploy" },
        ],
    },
    {
        id: "sec5",
        title: "Data Analytics & Professional Qualities",
        rune: "ᚱ",
        galaxyColor: "#fcd34d",
        galaxyGlow: "#d97706",
        naturalColor: "#52796f",
        naturalGlow: "#2f4a44",
        skills: [
            { icon: "📊", iconColor: "#F2C811", label: "Power BI", desc: "Data Visualization" },
            { icon: "🧩", iconColor: "#a78bfa", label: "Problem Solving", desc: "Systematic Analysis" },
            { icon: "🤝", iconColor: "#67e8f9", label: "Collaboration", desc: "Team & Communication" },
            { icon: "🎯", iconColor: "#86efac", label: "Responsibility", desc: "Goal & Quality Focus" },
        ],
    },
];

// ─────────────────────────────────────────────
// Static particle positions (no re-randomize on re-render)
// ─────────────────────────────────────────────
const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    left: `${(i * 37.3) % 100}%`,
    top: `${(i * 53.7) % 100}%`,
    size: (i % 3) + 1,
    sectionIdx: i % sections.length,
    dur: 5 + (i % 5),
    delay: (i * 0.4) % 5,
}));

// ─────────────────────────────────────────────
// SkillCard
// ─────────────────────────────────────────────
interface SkillCardProps {
    skill: Skill;
    color: string;
    glow: string;
    index: number;
    isDark: boolean;
}

function SkillCard({ skill, color, glow, index, isDark }: SkillCardProps) {
    const [hovered, setHovered] = useState(false);
    const isEmoji = /\p{Emoji}/u.test(skill.icon) && skill.icon.length <= 2;

    const cardBg = isDark
        ? hovered
            ? "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))"
            : "linear-gradient(135deg, rgba(255,255,255,0.045), rgba(255,255,255,0.015))"
        : hovered
            ? "rgba(255,255,255,0.98)"
            : "rgba(255,255,255,0.80)";

    const cardBorder = isDark
        ? `1px solid ${hovered ? color + "99" : color + "25"}`
        : `1px solid ${hovered ? color + "88" : "rgba(30,80,50,0.12)"}`;

    const cardShadow = isDark
        ? hovered
            ? `0 0 30px ${glow}44, 0 0 10px ${glow}22, inset 0 1px 0 rgba(255,255,255,0.08)`
            : "inset 0 1px 0 rgba(255,255,255,0.03)"
        : hovered
            ? `0 8px 28px ${glow}28, 0 2px 8px ${glow}14`
            : "0 1px 4px rgba(20,60,35,0.07)";

    const labelColor = hovered
        ? color
        : isDark ? "#cbd5e1" : "#1a3d28";

    const descColor = isDark ? "#475569" : "#52796f";

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                padding: "18px 14px 14px",
                borderRadius: 16,
                background: cardBg,
                border: cardBorder,
                boxShadow: cardShadow,
                cursor: "default",
                transition: "all 0.35s cubic-bezier(.22,.68,0,1.2)",
                transform: hovered ? "translateY(-7px) scale(1.05)" : "translateY(0) scale(1)",
                animationDelay: `${index * 0.06}s`,
                animation: "cardReveal 0.55s ease both",
                minWidth: 88,
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
            }}
        >
            {/* Corner dot */}
            <div style={{
                position: "absolute", top: 8, right: 9,
                width: 5, height: 5, borderRadius: "50%",
                background: color,
                boxShadow: hovered ? `0 0 6px ${color}` : "none",
                opacity: hovered ? 1 : 0.35,
                transition: "opacity 0.3s, box-shadow 0.3s",
            }} />

            {/* Icon */}
            <div style={{
                fontSize: isEmoji ? 28 : 16,
                fontWeight: 900,
                fontFamily: isEmoji ? "inherit" : "'Space Mono', monospace",
                color: skill.iconColor,
                lineHeight: 1,
                minHeight: 30,
                display: "flex", alignItems: "center", justifyContent: "center",
                filter: hovered ? `drop-shadow(0 0 7px ${skill.iconColor})` : "none",
                transition: "filter 0.35s",
                letterSpacing: "-0.02em",
            }}>
                {skill.icon}
            </div>

            {/* Label */}
            <div style={{
                fontSize: 11,
                fontWeight: 700,
                color: labelColor,
                letterSpacing: "0.05em",
                textAlign: "center",
                transition: "color 0.3s",
                fontFamily: "'Space Mono', monospace",
                lineHeight: 1.2,
            }}>
                {skill.label}
            </div>

            {/* Desc */}
            <div style={{
                fontSize: 9.5,
                color: descColor,
                textAlign: "center",
                lineHeight: 1.3,
                fontFamily: "'Space Mono', monospace",
            }}>
                {skill.desc}
            </div>

            {/* Underline bar */}
            <div style={{
                position: "absolute", bottom: 0, left: "10%",
                width: hovered ? "80%" : "0%", height: 2, borderRadius: 2,
                background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                transition: "width 0.4s ease",
            }} />
        </div>
    );
}

// ─────────────────────────────────────────────
// SectionBlock
// ─────────────────────────────────────────────
interface SectionBlockProps {
    section: SectionData;
    sectionIndex: number;
    isDark: boolean;
}

function SectionBlock({ section, sectionIndex, isDark }: SectionBlockProps) {
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.08 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    const color = isDark ? section.galaxyColor : section.naturalColor;
    const glow = isDark ? section.galaxyGlow : section.naturalGlow;

    return (
        <div
            ref={ref}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(44px)",
                transition: `opacity 0.75s ease ${sectionIndex * 0.1}s, transform 0.75s cubic-bezier(.22,.68,0,1.2) ${sectionIndex * 0.1}s`,
                marginBottom: 52,
            }}
        >
            {/* Header row */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
                <div style={{
                    width: 46, height: 46, borderRadius: 13, flexShrink: 0,
                    background: `radial-gradient(circle, ${glow}55 0%, transparent 70%)`,
                    border: `1.5px solid ${color}44`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 22, color,
                    boxShadow: `0 0 22px ${glow}44`,
                    fontFamily: "serif",
                    transition: "all 0.5s ease",
                }}>
                    {section.rune}
                </div>

                <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 7 }}>
                        <h2 style={{
                            margin: 0,
                            fontSize: "clamp(13px,1.8vw,17px)",
                            fontWeight: 700,
                            color,
                            fontFamily: "'Space Mono', monospace",
                            letterSpacing: "0.04em",
                            textShadow: isDark ? `0 0 18px ${glow}77` : `0 2px 12px ${glow}33`,
                            transition: "color 0.5s, text-shadow 0.5s",
                        }}>
                            {section.title}
                        </h2>
                        <span style={{
                            fontSize: 10,
                            color: color + "aa",
                            fontFamily: "'Space Mono', monospace",
                            border: `1px solid ${color}30`,
                            padding: "2px 8px",
                            borderRadius: 20,
                            transition: "all 0.5s",
                        }}>
                            {section.skills.length}
                        </span>
                    </div>
                    <div style={{
                        height: 1,
                        background: `linear-gradient(90deg, ${color}99, ${color}22, transparent)`,
                        transition: "background 0.5s",
                    }} />
                </div>
            </div>

            {/* Cards grid */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {section.skills.map((skill, i) => (
                    <SkillCard
                        key={skill.label}
                        skill={skill}
                        color={color}
                        glow={glow}
                        index={i}
                        isDark={isDark}
                    />
                ))}
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────
export default function SkillPage() {
    const { isDark } = useTheme();
    const T = isDark ? MOON : SUN;

    const [mounted, setMounted] = useState(false);
    useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

    const getColor = (s: SectionData) => isDark ? s.galaxyColor : s.naturalColor;

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    // ── Dynamic theme values
    const pageBg = isDark
        ? "linear-gradient(180deg, #05050e 0%, #080816 100%)"
        : "linear-gradient(180deg, #f4f7f2 0%, #eef4ec 100%)";

    const gridBg = isDark
        ? `linear-gradient(rgba(167,139,250,.03) 1px, transparent 1px),
       linear-gradient(90deg, rgba(167,139,250,.03) 1px, transparent 1px)`
        : `linear-gradient(rgba(30,100,60,.035) 1px, transparent 1px),
       linear-gradient(90deg, rgba(30,100,60,.035) 1px, transparent 1px)`;

    const radialBg = isDark
        ? "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(124,58,237,.14) 0%, transparent 70%)"
        : "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(45,106,79,.12) 0%, transparent 70%)";


    const titleDivider = isDark
        ? "linear-gradient(90deg, transparent, #a78bfa77, #67e8f944, transparent)"
        : "linear-gradient(90deg, transparent, #2d6a4f77, #52796f44, transparent)";

    const scrollbarThumb = isDark ? "#a78bfa33" : "#2d6a4f33";
    const scrollbarTrack = isDark ? "#05050e" : "#f4f7f2";
    const bottomFade = isDark
        ? "linear-gradient(transparent, #05050e)"
        : "linear-gradient(transparent, #eef4ec)";

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Cinzel:wght@600;700&family=Lora:ital,wght@0,600;1,600&display=swap');

        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(18px) scale(.93); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes floatUp {
          0%,100% { transform: translateY(0) scale(1); opacity: .5; }
          50%     { transform: translateY(-18px) scale(1.3); opacity: 1; }
        }
        @keyframes titleIn {
          from { opacity: 0; letter-spacing: .6em; filter: blur(10px); }
          to   { opacity: 1; letter-spacing: .18em; filter: blur(0); }
        }
        @keyframes orbitA { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
        @keyframes orbitB { from { transform: rotate(180deg); } to { transform: rotate(-180deg); } }
        @keyframes scan   { 0% { top: -5%; } 100% { top: 105%; } }
        @keyframes runeGlowDark {
          0%,100% { opacity: .7; }
          50%     { opacity: 1; text-shadow: 0 0 30px #a78bfa; }
        }
        @keyframes runeGlowLight {
          0%,100% { opacity: .75; }
          50%     { opacity: 1; text-shadow: 0 0 20px #2d6a4f88; }
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: ${scrollbarTrack}; }
        ::-webkit-scrollbar-thumb { background: ${scrollbarThumb}; border-radius: 3px; }
      `}</style>

            <section
                id="skills"
                style={{
                    minHeight: "100vh",
                    background: pageBg,
                    padding: "90px 8% 80px",
                    position: "relative",
                    overflow: "hidden",
                    fontFamily: "'Space Mono', monospace",
                    transition: "background 0.6s ease",
                }}
            >
                {/* Grid */}
                <div style={{
                    position: "absolute", inset: 0, pointerEvents: "none",
                    backgroundImage: gridBg,
                    backgroundSize: "64px 64px",
                }} />

                {/* Radial glow */}
                <div style={{
                    position: "absolute", inset: 0, pointerEvents: "none",
                    background: radialBg,
                    transition: "background 0.6s",
                }} />

                {/* Scanline — galaxy only */}
                {isDark && (
                    <div style={{
                        position: "absolute", left: 0, right: 0, height: 2,
                        pointerEvents: "none", zIndex: 2,
                        background: "linear-gradient(90deg, transparent, rgba(167,139,250,.35), transparent)",
                        animation: "scan 9s linear infinite",
                    }} />
                )}

                {/* Particles */}
                {PARTICLES.map(p => {
                    const color = getColor(sections[p.sectionIdx]);
                    return (
                        <div key={p.id} style={{
                            position: "absolute", borderRadius: "50%", pointerEvents: "none",
                            left: p.left, top: p.top,
                            width: p.size, height: p.size,
                            background: color,
                            boxShadow: `0 0 ${p.size * 4}px ${color}`,
                            opacity: isDark ? 0.8 : 0.3,
                            animation: `floatUp ${p.dur}s ease-in-out ${p.delay}s infinite`,
                            transition: "background 0.6s, box-shadow 0.6s, opacity 0.6s",
                        }} />
                    );
                })}

                {/* ── Title ── */}
                <div style={{
                    textAlign: "center", marginBottom: 68,
                    position: "relative", zIndex: 3,
                    opacity: mounted ? 1 : 0,
                    transition: "opacity 0.7s ease 0.15s",
                }}>
                    {/* Orbit rings */}
                    {[
                        { size: 160, anim: "orbitA 18s linear infinite", dotTop: true, secIdx: 0 },
                        { size: 220, anim: "orbitB 28s linear infinite", dotTop: false, secIdx: 2 },
                    ].map((cfg, ri) => {
                        const dotColor = getColor(sections[cfg.secIdx]);
                        const borderColor = isDark
                            ? `rgba(167,139,250,${ri === 0 ? 0.15 : 0.07})`
                            : `rgba(45,106,79,${ri === 0 ? 0.12 : 0.06})`;
                        return (
                            <div key={ri} style={{
                                position: "absolute", top: "50%", left: "50%",
                                width: cfg.size, height: cfg.size,
                                marginLeft: -cfg.size / 2, marginTop: -cfg.size / 2,
                                borderRadius: "50%",
                                border: `1px solid ${borderColor}`,
                                animation: cfg.anim,
                                pointerEvents: "none",
                                transition: "border-color 0.6s",
                            }}>
                                <div style={{
                                    position: "absolute",
                                    ...(cfg.dotTop ? { top: -3 } : { bottom: -3 }),
                                    left: "50%", marginLeft: -3,
                                    width: 6, height: 6, borderRadius: "50%",
                                    background: dotColor,
                                    boxShadow: `0 0 10px ${dotColor}`,
                                    transition: "background 0.6s, box-shadow 0.6s",
                                }} />
                            </div>
                        );
                    })}

                    {/* Eyebrow */}
                    <p style={{
                        fontSize: "clamp(10px,1.3vw,12px)",
                        color: T.accentColor,
                        letterSpacing: "0.4em",
                        textTransform: "uppercase",
                        marginBottom: 14,
                        animation: isDark
                            ? "runeGlowDark 3s ease-in-out infinite"
                            : "runeGlowLight 3s ease-in-out infinite",
                        transition: "color 0.5s",
                    }}>
                        ✦ &nbsp; 1DEV Codex &nbsp; ✦
                    </p>

                    {/* Main title */}
                    <h1 style={{

                        fontFamily: isDark ? "'Cinzel', serif" : "'Lora', serif",
                        fontSize: isMobile ? "clamp(26px,8vw,38px)" : "clamp(32px,4.5vw,52px)",
                        fontWeight: 900, letterSpacing: ".08em",
                        color: isDark ? "#e9d5ff" : "#1a3d28",
                        textShadow: isDark
                            ? "0 0 32px rgba(167,139,250,0.55), 0 2px 8px rgba(0,0,0,0.5)"
                            : "0 1px 0 rgba(255,255,255,0.9), 0 2px 12px rgba(45,106,79,0.15)",
                        lineHeight: 1.1, marginBottom: 8,
                        transition: "color .5s, text-shadow .5s",
                    }}>
                        SKILLS
                    </h1>

                    {/* Divider */}
                    <div style={{
                        margin: "18px auto 0", maxWidth: 380, height: 1,
                        background: titleDivider,
                        transition: "background 0.5s",
                    }} />

                    {/* Subtitle */}
                    <p style={{
                        marginTop: 12,
                        fontSize: "clamp(10px,1.1vw,12px)",
                        color: T.footerVer,
                        letterSpacing: "0.14em",
                        transition: "color 0.5s",
                    }}>
                        Technologies &amp; Disciplines Mastered
                    </p>
                </div>

                {/* ── Sections ── */}
                <div style={{ position: "relative", zIndex: 3, maxWidth: 1240, margin: "0 auto" }}>
                    {sections.map((section, i) => (
                        <SectionBlock
                            key={section.id}
                            section={section}
                            sectionIndex={i}
                            isDark={isDark}
                        />
                    ))}
                </div>

                {/* Bottom fade */}
                <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0, height: 70,
                    background: bottomFade,
                    pointerEvents: "none",
                    transition: "background 0.6s",
                }} />
            </section>
        </>
    );
}