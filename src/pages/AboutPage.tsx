"use client"

import { useState, useEffect, useRef } from "react";

const content = {
    en: {
        title: "Profile",
        sub: "1DEV Codex",
        body: `I am a passionate and dedicated Full Stack Developer with a strong background in game development, web development, and mobile development. With a keen eye for detail and a commitment to delivering high-quality solutions, I thrive in dynamic and collaborative environments. My expertise spans across various technologies, allowing me to create innovative and efficient applications that meet the needs of users. I am constantly seeking new challenges and opportunities to grow as a developer, and I am excited to contribute my skills and creativity to impactful projects.`,
    },
    th: {
        title: "ประวัติโดยย่อ",
        sub: "บันทึกแห่งเวทมนตร์",
        body: `ผมเป็นนักพัฒนา Full Stack ที่มีความมุ่งมั่นและทุ่มเท มีพื้นฐานที่แข็งแกร่งในด้านการพัฒนาเกม การพัฒนาเว็บไซต์ และการพัฒนาแอปพลิเคชันบนมือถือ ด้วยความใส่ใจในรายละเอียดและความมุ่งมั่นในการส่งมอบโซลูชันคุณภาพสูง ผมจึงเติบโตได้ดีในสภาพแวดล้อมที่มีพลวัตและเน้นการทำงานร่วมกัน ความเชี่ยวชาญของผมครอบคลุมเทคโนโลยีที่หลากหลาย ทำให้ผมสามารถสร้างแอปพลิเคชันที่สร้างสรรค์และมีประสิทธิภาพซึ่งตอบสนองความต้องการของผู้ใช้ได้ ผมแสวงหาความท้าทายและโอกาสใหม่ๆ อย่างต่อเนื่องเพื่อพัฒนาตนเองในฐานะนักพัฒนา`,
    },
};

const stats = [
    { label: "Languages", value: "11+", rune: "ᚠ", color: "#a78bfa" },
    { label: "Frameworks", value: "14+", rune: "ᚢ", color: "#67e8f9" },
    { label: "Projects", value: "20+", rune: "ᚦ", color: "#86efac" },
];

/* ── Rune Ring ─────────────────────────────────────────────────────── */
type RuneRingProps = {
    size: number
    runes: string
    duration: number
    color: string
    reverse?: boolean
    opacity?: number
}

const RuneRing = ({
    size,
    runes,
    duration,
    color,
    reverse,
    opacity = 1
}: RuneRingProps) => (
    <div style={{
        position: "absolute", top: "50%", left: "50%",
        width: size, height: size,
        marginLeft: -size / 2, marginTop: -size / 2,
        borderRadius: "50%",
        border: `1px solid ${color}18`,
        animation: `${reverse ? "rRev" : "rSpin"} ${duration}s linear infinite`,
        pointerEvents: "none",
        opacity,
    }}>
        {runes.split("").map((r, i) => {
            const angle = (i / runes.length) * 360;
            return (
                <span key={i} style={{
                    position: "absolute", top: "50%", left: "50%",
                    fontSize: 10, color: `${color}77`,
                    transform: `rotate(${angle}deg) translateY(-${size / 2}px) rotate(-${angle}deg)`,
                    fontFamily: "serif", lineHeight: 1,
                }}>{r}</span>
            );
        })}
    </div>
);

/* ── Stat Card ─────────────────────────────────────────────────────── */
type StatCardProps = {
    label: string
    value: string
    rune: string
    color: string
    delay: number
}

const StatCard = ({ label, value, rune, color, delay }: StatCardProps) => {
    const [hov, setHov] = useState(false);
    return (
        <div
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                flex: 1, minWidth: 90,
                display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                padding: "16px 10px",
                borderRadius: 16,
                background: hov ? `${color}14` : "rgba(255,255,255,.04)",
                border: `1px solid ${hov ? color + "66" : color + "22"}`,
                backdropFilter: "blur(10px)",
                boxShadow: hov ? `0 0 24px ${color}33` : "none",
                transform: hov ? "translateY(-4px) scale(1.04)" : "none",
                transition: "all .35s cubic-bezier(.22,.68,0,1.2)",
                animationDelay: `${delay}s`,
                animation: "fadeUp .7s ease both",
                cursor: "default",
            }}
        >
            <span style={{ fontSize: 16, color, fontFamily: "serif", opacity: .8 }}>{rune}</span>
            <span style={{ fontSize: "clamp(20px,3vw,28px)", fontWeight: 900, color, fontFamily: "'Cinzel',serif", textShadow: `0 0 18px ${color}88`, lineHeight: 1 }}>{value}</span>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,.4)", letterSpacing: ".1em", textTransform: "uppercase", fontFamily: "'Space Mono',monospace" }}>{label}</span>
        </div>
    );
};

export default function AboutPage() {
    const [lang, setLang] = useState<"en" | "th">("en");
    const [visible, setVisible] = useState(false);
    const [switching, setSwitching] = useState(false);

    const ref = useRef<HTMLDivElement | null>(null);
    const { title, sub, body } = content[lang];

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: .1 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    const switchLang = (l: "en" | "th") => {
        if (l === lang) return;
        setSwitching(true);
        setTimeout(() => { setLang(l); setSwitching(false); }, 280);
    };



    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Space+Mono:wght@400;700&family=Sarabun:wght@400;600&display=swap');
        @keyframes rSpin  { from{transform:rotate(0deg)}   to{transform:rotate(360deg)} }
        @keyframes rRev   { from{transform:rotate(0deg)}   to{transform:rotate(-360deg)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes imgGlow{ 0%,100%{box-shadow:0 0 40px #a78bfa44,0 0 80px #7c3aed22} 50%{box-shadow:0 0 70px #a78bfa77,0 0 140px #7c3aed44} }
        @keyframes shimmer{ 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes orbFloat{0%,100%{transform:translate(0,0)}50%{transform:translate(14px,-14px)}}
        @keyframes scanline{0%{top:-5%}100%{top:105%}}
        @keyframes langIn {from{opacity:0;transform:scale(.92)} to{opacity:1;transform:scale(1)}}
        * { box-sizing:border-box; margin:0; padding:0; }
      `}</style>

            <section id="about" ref={ref} style={{
                minHeight: "100vh",
                background: "#05050e",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "100px 8% 80px",
                position: "relative",
                overflow: "hidden",
                fontFamily: "'Space Mono', monospace",
            }}>

                {/* Grid */}
                <div style={{
                    position: "absolute", inset: 0, pointerEvents: "none",
                    backgroundImage: `linear-gradient(rgba(167,139,250,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(167,139,250,.03) 1px,transparent 1px)`,
                    backgroundSize: "64px 64px"
                }} />

                {/* Orbs */}
                <div style={{ position: "absolute", width: 500, height: 500, top: "-20%", right: "-10%", borderRadius: "50%", filter: "blur(80px)", background: "rgba(124,58,237,.14)", animation: "orbFloat 14s ease-in-out infinite", pointerEvents: "none" }} />
                <div style={{ position: "absolute", width: 350, height: 350, bottom: "-10%", left: "-8%", borderRadius: "50%", filter: "blur(70px)", background: "rgba(6,182,212,.10)", animation: "orbFloat 18s ease-in-out 4s infinite", pointerEvents: "none" }} />

                {/* Scanline */}
                <div style={{
                    position: "absolute", left: 0, right: 0, height: 2,
                    background: "linear-gradient(90deg,transparent,rgba(167,139,250,.25),transparent)",
                    animation: "scanline 10s linear infinite", pointerEvents: "none", zIndex: 2
                }} />

                {/* Particles */}
                {Array.from({ length: 18 }, (_, i) => (
                    <div key={i} style={{
                        position: "absolute",
                        left: `${(i * 53.3) % 100}%`, top: `${(i * 37.7) % 100}%`,
                        width: (i % 3) + 1, height: (i % 3) + 1, borderRadius: "50%",
                        background: ["#a78bfa", "#67e8f9", "#86efac", "#fda4af", "#fcd34d"][i % 5],
                        boxShadow: `0 0 ${(i % 3 + 1) * 4}px ${["#a78bfa", "#67e8f9", "#86efac", "#fda4af", "#fcd34d"][i % 5]}`,
                        animation: `orbFloat ${5 + i % 7}s ease-in-out ${(i * .35) % 5}s infinite`,
                        pointerEvents: "none",
                    }} />
                ))}

                {/* ── Layout ── */}
                <div style={{
                    position: "relative", zIndex: 3,
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "clamp(40px,6vw,80px)",
                    alignItems: "center",
                    maxWidth: 1100, width: "100%",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "none" : "translateY(40px)",
                    transition: "opacity .8s ease, transform .8s cubic-bezier(.22,.68,0,1.2)",

                }}>

                    {/* ── LEFT: Image ── */}
                    <div style={{
                        display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "center",
                        animation: "fadeUp .9s ease .1s both",
                    }}>
                        {/* Rune frame */}
                        <div style={{ position: "relative", width: 260, height: 260 }}>
                            <RuneRing size={258} runes="ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗ" duration={28} color="#a78bfa" />
                            <RuneRing size={220} runes="ᛚᛜᛞᛟᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃ" duration={20} color="#67e8f9" reverse />
                            <RuneRing size={182} runes="✦◈◇✿◉⬡✦◈◇✿◉⬡✦◈" duration={36} color="#86efac" opacity={.7} />

                            {/* Photo */}
                            <div style={{
                                position: "absolute", top: "50%", left: "50%",
                                transform: "translate(-50%,-50%)",
                                width: 140, height: 140, borderRadius: "50%",
                                overflow: "hidden",
                                border: "2.5px solid rgba(167,139,250,.55)",
                                animation: "imgGlow 5s ease-in-out infinite",
                                background: "rgba(10,10,30,.8)",
                            }}>
                                <img
                                    src="https://res.cloudinary.com/dag73dhpl/image/upload/v1772465219/Generated_Image_October_16_2025_-_8_59AM_m4qpvu.png"
                                    alt="profile"
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            </div>

                            {/* Inner glow */}
                            <div style={{
                                position: "absolute", top: "50%", left: "50%",
                                transform: "translate(-50%,-50%)",
                                width: 160, height: 160, borderRadius: "50%",
                                background: "radial-gradient(circle,rgba(124,58,237,.28) 0%,transparent 70%)",
                                animation: "imgGlow 5s ease-in-out 1s infinite",
                                pointerEvents: "none",
                            }} />
                        </div>

                        {/* Stats row */}
                        <div style={{
                            display: "flex", gap: 10, marginTop: 32, width: "100%", maxWidth: 320,
                        }}>
                            {stats.map((s, i) => <StatCard key={s.label} {...s} delay={.4 + i * .1} />)}
                        </div>
                    </div>

                    {/* ── RIGHT: Text ── */}
                    <div style={{
                        display: "flex", flexDirection: "column", gap: 20,
                        animation: "fadeUp .9s ease .25s both",
                    }}>

                        {/* Eyebrow */}
                        <div style={{
                            display: "flex", alignItems: "center", gap: 10,
                        }}>
                            <div style={{ height: 1, width: 36, background: "linear-gradient(90deg,#a78bfa,transparent)" }} />
                            <span style={{ fontSize: 11, color: "#a78bfa", letterSpacing: ".3em", textTransform: "uppercase" }}>
                                {sub}
                            </span>
                            <div style={{ height: 1, flex: 1, background: "linear-gradient(90deg,#a78bfa22,transparent)" }} />
                        </div>

                        {/* Title */}
                        <h1 style={{
                            fontFamily: "'Cinzel',serif",
                            fontSize: "clamp(24px,4vw,42px)",
                            fontWeight: 900,
                            background: "linear-gradient(135deg,#f1f5f9 0%,#a78bfa 35%,#67e8f9 70%,#f1f5f9 100%)",
                            backgroundSize: "200% 100%",
                            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                            animation: "shimmer 6s linear 1s infinite",
                            lineHeight: 1.1,
                            letterSpacing: ".04em",
                            transition: "opacity .28s",
                            opacity: switching ? 0 : 1,
                        }}>
                            {title}
                        </h1>

                        {/* Divider */}
                        <div style={{ height: 1, background: "linear-gradient(90deg,#a78bfa55,#67e8f922,transparent)" }} />

                        {/* Body text */}
                        <div style={{
                            opacity: switching ? 0 : 1,
                            transform: switching ? "translateY(6px)" : "none",
                            transition: "opacity .28s, transform .28s",
                            animation: switching ? "none" : "langIn .35s ease",
                        }}>
                            <p style={{
                                fontSize: "clamp(12px,1.2vw,14px)",
                                lineHeight: 1.95,
                                color: "rgba(255,255,255,.52)",
                                fontFamily: lang === "th" ? "'Sarabun',sans-serif" : "'Space Mono',monospace",
                                fontWeight: lang === "th" ? 400 : 400,
                                letterSpacing: lang === "th" ? ".02em" : ".01em",
                            }}>
                                {body}
                            </p>
                        </div>

                        {/* Lang toggle */}
                        <div style={{
                            display: "inline-flex", alignItems: "center",
                            gap: 0, marginTop: 4,
                            background: "rgba(255,255,255,.04)",
                            border: "1px solid rgba(167,139,250,.2)",
                            borderRadius: 999,
                            padding: "4px",
                            backdropFilter: "blur(10px)",
                            width: "fit-content",
                        }}>
                            {(["th", "en"] as const).map((l) => (
                                <button
                                    key={l}
                                    onClick={() => switchLang(l)}
                                    style={{
                                        padding: "6px 20px",
                                        borderRadius: 999,

                                        cursor: "pointer",
                                        fontFamily: "'Space Mono',monospace",
                                        fontSize: 11,
                                        fontWeight: 700,
                                        letterSpacing: ".12em",
                                        transition: "all .3s cubic-bezier(.22,.68,0,1.2)",
                                        background: lang === l
                                            ? "linear-gradient(135deg,rgba(167,139,250,.35),rgba(103,232,249,.2))"
                                            : "transparent",
                                        color: lang === l ? "#a78bfa" : "rgba(255,255,255,.3)",
                                        boxShadow: lang === l ? "0 0 16px rgba(167,139,250,.3),inset 0 1px 0 rgba(255,255,255,.1)" : "none",
                                        border: lang === l ? "1px solid rgba(167,139,250,.4)" : "1px solid transparent",
                                    }}
                                >
                                    {l.toUpperCase()}
                                </button>
                            ))}
                        </div>

                    </div>
                </div>

            </section>
        </>
    );
}