
import { useEffect, useRef, useState } from "react";

const sections = [
    {
        id: "sec1",
        title: "Core Development & Languages",
        rune: "ᚠ",
        color: "#a78bfa",
        glow: "#7c3aed",
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
        ]
    },
    {
        id: "sec2",
        title: "Frontend & Mobile Development",
        rune: "ᚢ",
        color: "#67e8f9",
        glow: "#0891b2",
        skills: [
            { icon: "⚛", iconColor: "#61DAFB", label: "React", desc: "UI Components" },
            { icon: "▲", iconColor: "#ffffff", label: "Next.js", desc: "Full-stack React" },
            { icon: "V", iconColor: "#4FC08D", label: "Vue.js", desc: "Progressive UI" },
            { icon: "N", iconColor: "#00DC82", label: "Nuxt.js", desc: "Vue Meta-framework" },
            { icon: "🦋", iconColor: "#54C5F8", label: "Flutter", desc: "Cross-platform" },
            { icon: "H5", iconColor: "#E34F26", label: "HTML5", desc: "Semantic Web" },
            { icon: "C3", iconColor: "#1572B6", label: "CSS3", desc: "Modern Styling" },
        ]
    },
    {
        id: "sec3",
        title: "Backend & Database Architecture",
        rune: "ᚦ",
        color: "#86efac",
        glow: "#16a34a",
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
        ]
    },
    {
        id: "sec4",
        title: "DevOps & Infrastructure",
        rune: "ᚨ",
        color: "#fda4af",
        glow: "#e11d48",
        skills: [
            { icon: "🐳", iconColor: "#2496ED", label: "Docker", desc: "Containerization" },
            { icon: "POD", iconColor: "#892CA0", label: "Podman", desc: "Rootless Containers" },
            { icon: "🌿", iconColor: "#F05032", label: "Git", desc: "Version Control" },
            { icon: "⚙", iconColor: "#2088FF", label: "GH Actions", desc: "CI/CD Pipeline" },
            { icon: "🐙", iconColor: "#ffffff", label: "GitHub", desc: "Code Hosting" },
            { icon: "🏺", iconColor: "#D33833", label: "Jenkins", desc: "Automation" },
            { icon: "🦊", iconColor: "#FC6D26", label: "GitLab", desc: "DevOps Platform" },
            { icon: "▲", iconColor: "#ffffff", label: "Vercel", desc: "Edge Deploy" },
            { icon: "NTL", iconColor: "#00C7B7", label: "Netlify", desc: "JAMstack" },
            { icon: "RDR", iconColor: "#46E3B7", label: "Render", desc: "Cloud Deploy" },
        ]
    },
    {
        id: "sec5",
        title: "Data Analytics & Professional Qualities",
        rune: "ᚱ",
        color: "#fcd34d",
        glow: "#d97706",
        skills: [
            { icon: "📊", iconColor: "#F2C811", label: "Power BI", desc: "Data Visualization" },
            { icon: "🧩", iconColor: "#a78bfa", label: "Problem Solving", desc: "Systematic Analysis" },
            { icon: "🤝", iconColor: "#67e8f9", label: "Collaboration", desc: "Team & Communication" },
            { icon: "🎯", iconColor: "#86efac", label: "Responsibility", desc: "Goal & Quality Focus" },
        ]
    },
];

const SkillCard = ({ icon, iconColor, label, desc, color, glow, index }: { icon: string; iconColor: string; label: string; desc: string; color: string; glow: string; index: number }) => {
    const [hovered, setHovered] = useState(false);
    const isEmoji = /\p{Emoji}/u.test(icon) && icon.length <= 2;
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
                background: hovered
                    ? `linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))`
                    : `linear-gradient(135deg, rgba(255,255,255,0.045), rgba(255,255,255,0.015))`,
                border: `1px solid ${hovered ? color + "99" : color + "25"}`,
                boxShadow: hovered
                    ? `0 0 30px ${glow}44, 0 0 10px ${glow}22, inset 0 1px 0 rgba(255,255,255,0.08)`
                    : `inset 0 1px 0 rgba(255,255,255,0.03)`,
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
            <div style={{
                position: "absolute", top: 8, right: 9,
                width: 5, height: 5, borderRadius: "50%",
                background: color,
                boxShadow: `0 0 6px ${color}`,
                opacity: hovered ? 1 : 0.25,
                transition: "opacity 0.3s",
            }} />
            <div style={{
                fontSize: isEmoji ? 28 : 16,
                fontWeight: 900,
                fontFamily: isEmoji ? "inherit" : "'Space Mono', monospace",
                color: iconColor,
                lineHeight: 1,
                minHeight: 30,
                display: "flex", alignItems: "center", justifyContent: "center",
                filter: hovered ? `drop-shadow(0 0 7px ${iconColor})` : "none",
                transition: "filter 0.35s",
                letterSpacing: "-0.02em",
            }}>
                {icon}
            </div>
            <div style={{
                fontSize: 11,
                fontWeight: 700,
                color: hovered ? color : "#cbd5e1",
                letterSpacing: "0.05em",
                textAlign: "center",
                transition: "color 0.3s",
                fontFamily: "'Space Mono', monospace",
                lineHeight: 1.2,
            }}>
                {label}
            </div>
            <div style={{
                fontSize: 9.5,
                color: "#475569",
                textAlign: "center",
                lineHeight: 1.3,
                fontFamily: "'Space Mono', monospace",
            }}>
                {desc}
            </div>
            <div style={{
                position: "absolute", bottom: 0, left: "10%",
                width: hovered ? "80%" : "0%", height: 2, borderRadius: 2,
                background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                transition: "width 0.4s ease",
            }} />
        </div>
    );
};

const Section = ({ section, sectionIndex }: { section: typeof sections[0], sectionIndex: number }) => {
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <div ref={ref} style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(44px)",
            transition: `opacity 0.75s ease ${sectionIndex * 0.1}s, transform 0.75s cubic-bezier(.22,.68,0,1.2) ${sectionIndex * 0.1}s`,
            marginBottom: 52,
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
                <div style={{
                    width: 46, height: 46, borderRadius: 13, flexShrink: 0,
                    background: `radial-gradient(circle, ${section.glow}55 0%, transparent 70%)`,
                    border: `1.5px solid ${section.color}44`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 22, color: section.color,
                    boxShadow: `0 0 22px ${section.glow}44`,
                    fontFamily: "serif",
                }}>
                    {section.rune}
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 7 }}>
                        <h2 style={{
                            margin: 0, fontSize: "clamp(13px,1.8vw,17px)", fontWeight: 700,
                            color: section.color, fontFamily: "'Space Mono', monospace",
                            letterSpacing: "0.04em",
                            textShadow: `0 0 18px ${section.glow}77`,
                        }}>
                            {section.title}
                        </h2>
                        <span style={{
                            fontSize: 10, color: section.color + "aa",
                            fontFamily: "'Space Mono', monospace",
                            border: `1px solid ${section.color}30`,
                            padding: "2px 8px", borderRadius: 20,
                        }}>
                            {section.skills.length}
                        </span>
                    </div>
                    <div style={{
                        height: 1,
                        background: `linear-gradient(90deg, ${section.color}99, ${section.color}22, transparent)`,
                    }} />
                </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {section.skills.map((skill, i) => (
                    <SkillCard key={skill.label} {...skill} color={section.color} glow={section.glow} index={i} />
                ))}
            </div>
        </div>
    );
};

export default function SkillPage() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

    const particles = Array.from({ length: 28 }, (_, i) => ({
        id: i,
        left: `${(i * 37.3) % 100}%`,
        top: `${(i * 53.7) % 100}%`,
        size: (i % 3) + 1,
        color: sections[i % sections.length].color,
        dur: 5 + (i % 5),
        delay: (i * 0.4) % 5,
    }));

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Cinzel:wght@600;700&display=swap');
        @keyframes cardReveal { from { opacity:0; transform:translateY(18px) scale(.93); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes floatUp { 0%,100% { transform:translateY(0) scale(1); opacity:.5; } 50% { transform:translateY(-18px) scale(1.3); opacity:1; } }
        @keyframes titleIn { from { opacity:0; letter-spacing:.6em; filter:blur(10px); } to { opacity:1; letter-spacing:.18em; filter:blur(0); } }
        @keyframes orbitA { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        @keyframes orbitB { from { transform:rotate(180deg); } to { transform:rotate(-180deg); } }
        @keyframes scan { 0% { top:-5%; } 100% { top:105%; } }
        @keyframes runeGlow { 0%,100% { opacity:.7; } 50% { opacity:1; text-shadow:0 0 30px #a78bfa; } }
        * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:#05050e; }
        ::-webkit-scrollbar-thumb { background:#a78bfa33; border-radius:3px; }
      `}</style>

            <section id="skills" style={{
                minHeight: "100vh",
                background: "linear-gradient(180deg, #05050e 0%, #080816 100%)",
                padding: "90px 8% 80px",
                position: "relative",
                overflow: "hidden",
                fontFamily: "'Space Mono', monospace",
            }}>
                {/* Grid */}
                <div style={{
                    position: "absolute", inset: 0, pointerEvents: "none",
                    backgroundImage: `linear-gradient(rgba(167,139,250,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,.03) 1px, transparent 1px)`,
                    backgroundSize: "64px 64px",
                }} />
                {/* Radial glow top */}
                <div style={{
                    position: "absolute", inset: 0, pointerEvents: "none",
                    background: "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(124,58,237,.14) 0%, transparent 70%)",
                }} />
                {/* Scanline */}
                <div style={{
                    position: "absolute", left: 0, right: 0, height: 2, pointerEvents: "none", zIndex: 2,
                    background: "linear-gradient(90deg, transparent, rgba(167,139,250,.35), transparent)",
                    animation: "scan 9s linear infinite",
                }} />
                {/* Particles */}
                {particles.map(p => (
                    <div key={p.id} style={{
                        position: "absolute", borderRadius: "50%", pointerEvents: "none",
                        left: p.left, top: p.top,
                        width: p.size, height: p.size,
                        background: p.color,
                        boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
                        animation: `floatUp ${p.dur}s ease-in-out ${p.delay}s infinite`,
                    }} />
                ))}

                {/* Title */}
                <div style={{
                    textAlign: "center", marginBottom: 68, position: "relative", zIndex: 3,
                    opacity: mounted ? 1 : 0, transition: "opacity 0.7s ease 0.15s",
                }}>
                    {/* Orbit rings */}
                    {[160, 220].map((size, ri) => (
                        <div key={ri} style={{
                            position: "absolute", top: "50%", left: "50%",
                            width: size, height: size,
                            marginLeft: -size / 2, marginTop: -size / 2,
                            borderRadius: "50%",
                            border: `1px solid rgba(167,139,250,${ri === 0 ? .15 : .07})`,
                            animation: `${ri === 0 ? "orbitA" : "orbitB"} ${ri === 0 ? 18 : 28}s linear infinite`,
                            pointerEvents: "none",
                        }}>
                            <div style={{
                                position: "absolute",
                                top: ri === 0 ? -3 : "auto",
                                bottom: ri === 1 ? -3 : "auto",
                                left: "50%", marginLeft: -3,
                                width: 6, height: 6, borderRadius: "50%",
                                background: sections[ri * 2].color,
                                boxShadow: `0 0 10px ${sections[ri * 2].color}`,
                            }} />
                        </div>
                    ))}

                    <p style={{
                        fontSize: "clamp(10px,1.3vw,12px)", color: "#a78bfa",
                        letterSpacing: "0.4em", textTransform: "uppercase",
                        marginBottom: 14, animation: "runeGlow 3s ease-in-out infinite",
                    }}>
                        ✦ &nbsp; 1DEV Codex &nbsp; ✦
                    </p>
                    <h1 style={{
                        fontSize: "clamp(44px,7vw,80px)",
                        fontFamily: "'Cinzel', serif", fontWeight: 700,
                        background: "linear-gradient(135deg, #f1f5f9 0%, #a78bfa 35%, #67e8f9 70%, #f1f5f9 100%)",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                        animation: "titleIn 1.1s cubic-bezier(.22,.68,0,1.2) .25s both",
                        lineHeight: 1,
                    }}>
                        SKILLS
                    </h1>
                    <div style={{
                        margin: "18px auto 0", maxWidth: 380, height: 1,
                        background: "linear-gradient(90deg, transparent, #a78bfa77, #67e8f944, transparent)",
                    }} />
                    <p style={{
                        marginTop: 12, fontSize: "clamp(10px,1.1vw,12px)", color: "#334155",
                        letterSpacing: "0.14em",
                    }}>
                        Technologies &amp; Disciplines Mastered
                    </p>
                </div>

                {/* Sections */}
                <div style={{ position: "relative", zIndex: 3, maxWidth: 1240, margin: "0 auto" }}>
                    {sections.map((section, i) => (
                        <Section key={section.id} section={section} sectionIndex={i} />
                    ))}
                </div>

                {/* Bottom fade */}
                <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0, height: 70,
                    background: "linear-gradient(transparent, #05050e)", pointerEvents: "none",
                }} />
            </section>
        </>
    );
}