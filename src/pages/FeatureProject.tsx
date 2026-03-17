import { useEffect, useRef, useState } from "react";
import { useTheme } from "../components/themeContext";

/* ══════════════════════════════════════════════════════
   THEME (reuse same ExpTheme shape)
══════════════════════════════════════════════════════ */
interface FpTheme {
    pageBg: string;
    gridLine: string;
    orbA: string; orbB: string; orbC: string;
    scanLine: string;
    bottomFade: string;
    eyebrowColor: string;
    eyebrowLine: string;
    headingColor: string;
    headingSub: string;
    // top bar / hero
    heroBg: (c: string) => string;
    heroBorder: (c: string) => string;
    heroGlow: (c: string) => string;
    heroTitle: string;
    heroSub: (c: string) => string;
    heroTagBg: (c: string) => string;
    heroTagText: (c: string) => string;
    // stats
    statBg: string;
    statBorder: (c: string) => string;
    statTopLine: (c: string) => string;
    statNumber: (c: string) => string;
    statLabel: (c: string) => string;
    statSub: string;
    // section headers
    sectionColor: (c: string) => string;
    sectionLine: (c: string) => string;
    // planning image card
    imgCardBg: string;
    imgCardBorder: (c: string) => string;
    imgCardShadow: (c: string) => string;
    imgCaption: string;
    imgCaptionBg: string;
    imgTag: (c: string) => string;
    imgTagBg: (c: string) => string;
    // timeline card
    cardBg: string;
    cardBgHov: string;
    cardBgSuccess: (c: string) => string;
    cardBorder: (hov: boolean, suc: boolean, c: string) => string;
    cardShadow: (hov: boolean, suc: boolean, c: string) => string;
    cardMonthColor: (c: string) => string;
    cardMonthShadow: (hov: boolean, c: string) => string;
    cardYear: string;
    cardNumBg: (c: string) => string;
    cardNumBorder: (c: string) => string;
    cardNumColor: (c: string) => string;
    cardDivider: (c: string) => string;
    taskNormal: string;
    taskHighlight: (c: string) => string;
    taskHighBg: (c: string) => string;
    taskHighBorder: (c: string) => string;
    // tech
    techBg: (c: string) => string;
    techBorder: (c: string) => string;
    techLabel: (c: string) => string;
    techCat: string;
}

const SUN_FP: FpTheme = {
    pageBg: "linear-gradient(160deg,#f5f7f4 0%,#eef4ee 50%,#f0f5f0 100%)",
    gridLine: "rgba(45,106,79,0.04)",
    orbA: "rgba(45,106,79,0.08)",
    orbB: "rgba(82,183,136,0.06)",
    orbC: "rgba(27,67,50,0.05)",
    scanLine: "rgba(45,106,79,0.06)",
    bottomFade: "linear-gradient(transparent,#eef4ee)",
    eyebrowColor: "#2d6a4f",
    eyebrowLine: "rgba(45,106,79,0.35)",
    headingColor: "#1a3d28",
    headingSub: "rgba(20,50,30,0.45)",
    heroBg: (c) => `${c}10`,
    heroBorder: (c) => `${c}44`,
    heroGlow: (c) => `0 0 24px ${c}14`,
    heroTitle: "#1a3d28",
    heroSub: (c) => c,
    heroTagBg: (c) => `${c}14`,
    heroTagText: (c) => c,
    statBg: "rgba(255,255,255,0.78)",
    statBorder: (c) => `${c}22`,
    statTopLine: (c) => `linear-gradient(90deg,transparent,${c}77,transparent)`,
    statNumber: (c) => `linear-gradient(135deg,#1a3d28,${c})`,
    statLabel: (c) => c,
    statSub: "rgba(20,50,30,0.42)",
    sectionColor: (c) => c,
    sectionLine: (c) => `linear-gradient(90deg,transparent,${c}44)`,
    imgCardBg: "rgba(255,255,255,0.88)",
    imgCardBorder: (c) => `${c}30`,
    imgCardShadow: (c) => `0 8px 40px ${c}14, 0 2px 12px rgba(20,60,35,0.08)`,
    imgCaption: "rgba(20,50,30,0.60)",
    imgCaptionBg: "rgba(255,255,255,0.92)",
    imgTag: (c) => c,
    imgTagBg: (c) => `${c}14`,
    cardBg: "rgba(255,255,255,0.80)",
    cardBgHov: "rgba(255,255,255,0.96)",
    cardBgSuccess: (c) => `linear-gradient(135deg,${c}0e,rgba(255,255,255,0.85))`,
    cardBorder: (hov, suc, c) => hov || suc ? `${c}50` : `${c}22`,
    cardShadow: (hov, suc, c) =>
        hov ? `0 0 32px ${c}18,0 12px 40px rgba(20,60,35,0.10),inset 0 1px 0 rgba(255,255,255,.8)`
            : suc ? `0 0 20px ${c}14,0 4px 20px rgba(20,60,35,0.08)`
                : `0 2px 16px rgba(20,60,35,0.06),inset 0 1px 0 rgba(255,255,255,.6)`,
    cardMonthColor: (c) => c,
    cardMonthShadow: (hov, c) => hov ? `0 0 14px ${c}88` : `0 0 6px ${c}44`,
    cardYear: "rgba(20,50,30,0.32)",
    cardNumBg: (c) => `${c}14`,
    cardNumBorder: (c) => `${c}44`,
    cardNumColor: (c) => c,
    cardDivider: (c) => `linear-gradient(90deg,${c}55,transparent)`,
    taskNormal: "rgba(20,50,30,0.58)",
    taskHighlight: (c) => c,
    taskHighBg: (c) => `${c}0c`,
    taskHighBorder: (c) => `${c}33`,
    techBg: (c) => `${c}10`,
    techBorder: (c) => `${c}40`,
    techLabel: (c) => c,
    techCat: "rgba(20,50,30,0.32)",
};

const MOON_FP: FpTheme = {
    pageBg: "radial-gradient(ellipse at 20% 50%,#0f0528 0%,#060414 40%,#020210 100%)",
    gridLine: "rgba(167,139,250,0.025)",
    orbA: "rgba(52,211,153,0.14)",
    orbB: "rgba(6,182,212,0.10)",
    orbC: "rgba(253,164,175,0.08)",
    scanLine: "rgba(52,211,153,0.18)",
    bottomFade: "linear-gradient(transparent,#020210)",
    eyebrowColor: "#34d399",
    eyebrowLine: "rgba(52,211,153,0.40)",
    headingColor: "#f1f5f9",
    headingSub: "rgba(255,255,255,0.32)",
    heroBg: (c) => `${c}10`,
    heroBorder: (c) => `${c}44`,
    heroGlow: (c) => `0 0 28px ${c}22`,
    heroTitle: "#e2f8f0",
    heroSub: (c) => c,
    heroTagBg: (c) => `${c}18`,
    heroTagText: (c) => c,
    statBg: "rgba(255,255,255,0.04)",
    statBorder: (c) => `${c}28`,
    statTopLine: (c) => `linear-gradient(90deg,transparent,${c}88,transparent)`,
    statNumber: (c) => `linear-gradient(135deg,#f1f5f9,${c})`,
    statLabel: (c) => c,
    statSub: "rgba(255,255,255,0.35)",
    sectionColor: (c) => c,
    sectionLine: (c) => `linear-gradient(90deg,transparent,${c}44)`,
    imgCardBg: "rgba(255,255,255,0.04)",
    imgCardBorder: (c) => `${c}33`,
    imgCardShadow: (c) => `0 0 48px ${c}18, 0 16px 48px rgba(0,0,0,0.50)`,
    imgCaption: "rgba(220,255,240,0.72)",
    imgCaptionBg: "rgba(5,20,12,0.88)",
    imgTag: (c) => c,
    imgTagBg: (c) => `${c}18`,
    cardBg: "rgba(255,255,255,0.04)",
    cardBgHov: "linear-gradient(135deg,rgba(255,255,255,.09),rgba(255,255,255,.04))",
    cardBgSuccess: (c) => `linear-gradient(135deg,${c}10,rgba(255,255,255,.04))`,
    cardBorder: (hov, suc, c) => hov || suc ? `${c}66` : `${c}28`,
    cardShadow: (hov, suc, c) =>
        hov ? `0 0 40px ${c}33,0 16px 48px rgba(0,0,0,.6),inset 0 1px 0 rgba(255,255,255,.08)`
            : suc ? `0 0 28px ${c}44,0 8px 32px rgba(0,0,0,.5)`
                : `0 4px 24px rgba(0,0,0,.4),inset 0 1px 0 rgba(255,255,255,.04)`,
    cardMonthColor: (c) => c,
    cardMonthShadow: (hov, c) => hov ? `0 0 20px ${c}cc` : `0 0 10px ${c}55`,
    cardYear: "rgba(255,255,255,0.30)",
    cardNumBg: (c) => `${c}18`,
    cardNumBorder: (c) => `${c}44`,
    cardNumColor: (c) => c,
    cardDivider: (c) => `linear-gradient(90deg,${c}55,transparent)`,
    taskNormal: "rgba(255,255,255,0.58)",
    taskHighlight: (c) => c,
    taskHighBg: (c) => `${c}0d`,
    taskHighBorder: (c) => `${c}33`,
    techBg: (c) => `${c}12`,
    techBorder: (c) => `${c}44`,
    techLabel: (c) => c,
    techCat: "rgba(255,255,255,0.25)",
};

/* ══════════════════════════════════════════════════════
   DATA — ABCAT SHOP
══════════════════════════════════════════════════════ */
const ABCSHOP = {
    name: "ABCat Shop",
    role: "Senior Project — Flutter + AI",
    period: "มกราคม – มีนาคม 2569",
    accentColor: "#34d399",
    accentGlow: "#059669",
    icon: "🐱",
    tag: "SENIOR PROJECT",
    description: "ABCat Shop คือ Full-Stack Mobile Application พัฒนาด้วย Flutter + AI ที่ช่วยแนะนำขนาดเสื้อผ้าสำหรับแมว โดยใช้ YOLO สำหรับ Detect แมว และ GPT-4.1 mini / Gemini 2.5 Flash สำหรับ Analysis ขนาด ครบวงจรตั้งแต่ Frontend (Flutter) ถึง Backend (FastAPI) และ DevOps (Jenkins + Render)",
    planningImg: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773725640/%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B8%9E%E0%B8%B1%E0%B8%92%E0%B8%99%E0%B8%B2_1_efrywh.png",
    youtubeUrl: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID",
    stats: [
        { value: "70+", label: "วันพัฒนา", sub: "ม.ค. – มี.ค. 2569" },
        { value: "12", label: "หน้าแอป", sub: "Home, Shop, Basket, Meow Size ฯลฯ" },
        { value: "3", label: "AI Models", sub: "YOLO · Gemini 2.5 Flash · GPT-4.1 mini" },
    ],
    tech: [
        { label: "Flutter", cat: "Frontend", color: "#38bdf8" },
        { label: "Dart", cat: "Frontend", color: "#06b6d4" },
        { label: "Python", cat: "AI/ML", color: "#facc15" },
        { label: "YOLO", cat: "AI/ML", color: "#f97316" },
        { label: "Gemini 2.5 Flash", cat: "AI/ML", color: "#a78bfa" },
        { label: "GPT-4.1 mini", cat: "AI/ML", color: "#10b981" },
        { label: "OpenAI API", cat: "API", color: "#22c55e" },
        { label: "FastAPI", cat: "Backend", color: "#34d399" },
        { label: "PostgreSQL", cat: "Database", color: "#38bdf8" },
        { label: "Cloudinary", cat: "Storage", color: "#60a5fa" },
        { label: "Jenkins", cat: "DevOps", color: "#ef4444" },
        { label: "Render", cat: "Deploy", color: "#a78bfa" },
        { label: "Firebase", cat: "Auth", color: "#fbbf24" },
        { label: "Google AI Studio", cat: "API", color: "#34d399" },
        { label: "Git", cat: "Tools", color: "#f97316" },
    ],
    months: [
        {
            month: "มกราคม", year: "2026", num: "01", color: "#34d399", glow: "#059669", icon: "🤖",
            tasks: ["13–15 ม.ค. — Train AI Model by Python + YOLO (Round 1–3)", "16–23 ม.ค. — ออกแบบ & ลงมือทำ Structure Frontend + Backend (8 วัน)", "24–25 ม.ค. — อัพเดต ER Diagram & Planning Structure", "26 ม.ค. — Mock data หน้า Home page", "27 ม.ค. — Mock data Shop, สร้าง Folder Document ใน Flutter, แยก Section หน้าบ้าน", "28 ม.ค. — Generate AI by Gemini ทำ Poster Notification, Mock data Coupon", "29 ม.ค. — Mock data Notification, Coupon, History, Order, ออกแบบ Search Page", "30–31 ม.ค. — Train AI Model YOLO (Round 4–5)"]
        },
        {
            month: "กุมภาพันธ์ (ต้น)", year: "2026", num: "02", color: "#38bdf8", glow: "#0284c7", icon: "🔗",
            tasks: ["1–7 ก.พ. — เชื่อม Backend ทุกหน้า (Home, Favourite, Basket, Search, Notification, Meow Size, Menu) + Custom Snackbar + วาง Structure DB v1–v4", "8 ก.พ. — สร้าง path transfer → Backend → callback Frontend", "9 ก.พ. — แก้ VARCHAR → TEXT ป้องกัน icon แปลก", "10 ก.พ. — ปรับ 'Learn More' เป็น Icon บน Notification Page", "11 ก.พ. — แก้ไข X ปุ่ม Search Page → กลับ Homepage", "12 ก.พ. — Update Frontend V4.2"]
        },
        {
            month: "กุมภาพันธ์ (ปลาย)", year: "2026", num: "03", color: "#818cf8", glow: "#4f46e5", icon: "🧪",
            tasks: ["13 ก.พ. — Flow Diagram, Use Case, อัพเดต Backend Home + Search Learn More", "14 ก.พ. — อัพเดต Backend Shop, Notification", "15 ก.พ. — Meow Size Page, ค้นหา Feature ใหม่ (OpenAI, Jenkins)", "16 ก.พ. — นัดคุยอาจารย์, ปรับปรุง Favourite + Basket", "17 ก.พ. — Setup Jenkins Sleep Time Automation", "18–22 ก.พ. — ปรับปรุง Meow Size, Favourite, Basket + dot marker + Sequence Diagram Login/Register", "23 ก.พ. — แก้ Alert Text, เจอ Gemini API", "24–28 ก.พ. — แก้ Meow Size, เพิ่ม History Page, Deploy Backend, เชื่อม Google AI Studio V1–V5"]
        },
        {
            month: "มีนาคม (ต้น)", year: "2026", num: "04", color: "#fcd34d", glow: "#d97706", icon: "✨",
            tasks: ["1 มี.ค. — เชื่อม Google AI Studio V6", "2 มี.ค. — แก้ Service API Cat (Frontend), ✅ Success Call Gemini 2.5 Flash", "3 มี.ค. — แก้ History Edit, Meow Size Recommendation Scan Page", "4–5 มี.ค. — แก้ History Cat Edit, Meow Size Recommendation Card", "6 มี.ค. — แก้ History Cat Edit, Meow Size Recommendation Card V2", "7 มี.ค. — แก้ History Cat Edit, Meow Size Recommendation Card V3"]
        },
        {
            month: "มีนาคม (ปลาย) — สำเร็จ!", year: "2026", num: "05", color: "#fb923c", glow: "#ea580c", icon: "🏁",
            tasks: ["8 มี.ค. — Edit Meow Size (Recommend, Edit Cat, Backend Cat CRUD API)", "9 มี.ค. — เปลี่ยนมาใช้ OpenAI GPT-4.1 mini สำหรับ Detect & Analysis Cat", "10 มี.ค. — Edit Meow Size (Recommend, Edit Cat, History Analysis Cat)", "🎉 11 มี.ค. — SUCCESS PROJECT ABCat Shop"]
        },
    ],
};

/* ══════════════════════════════════════════════════════
   HOOKS
══════════════════════════════════════════════════════ */
function useVisible(threshold = 0.1) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [threshold]);
    return { ref, visible };
}

/* ══════════════════════════════════════════════════════
   TIMELINE CARD
══════════════════════════════════════════════════════ */
function TimelineCard({ item, isMobile, visible, tk }: {
    item: typeof ABCSHOP.months[0]; isMobile: boolean; visible: boolean; tk: FpTheme;
}) {
    const [hov, setHov] = useState(false);
    const isSuccess = item.tasks.some(t => t.includes("SUCCESS") || t.includes("🎉"));

    return (
        <div
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                position: "relative", borderRadius: 20,
                padding: isMobile ? "18px 16px 16px" : "22px 24px 20px",
                background: hov ? tk.cardBgHov : isSuccess ? tk.cardBgSuccess(item.color) : tk.cardBg,
                border: `1px solid ${tk.cardBorder(hov, isSuccess, item.color)}`,
                backdropFilter: "blur(16px)",
                boxShadow: tk.cardShadow(hov, isSuccess, item.color),
                transform: hov ? "translateY(-5px)" : "none",
                transition: "all .38s cubic-bezier(.22,.68,0,1.2)",
                overflow: "hidden",
            }}
        >
            <div style={{
                position: "absolute", top: 0, left: "10%", right: "10%", height: 1.5,
                background: `linear-gradient(90deg,transparent,${item.color}${hov || isSuccess ? "cc" : "77"},transparent)`
            }} />

            {(["tl", "tr", "bl", "br"] as const).map(k => (
                <div key={k} style={{
                    position: "absolute",
                    top: k[0] === "t" ? 10 : "auto", bottom: k[0] === "b" ? 10 : "auto",
                    left: k[1] === "l" ? 10 : "auto", right: k[1] === "r" ? 10 : "auto",
                    width: 12, height: 12,
                    borderTop: k[0] === "t" ? `1px solid ${item.color}55` : "none",
                    borderBottom: k[0] === "b" ? `1px solid ${item.color}55` : "none",
                    borderLeft: k[1] === "l" ? `1px solid ${item.color}55` : "none",
                    borderRight: k[1] === "r" ? `1px solid ${item.color}55` : "none",
                    pointerEvents: "none",
                }} />
            ))}

            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span style={{ fontSize: isMobile ? 18 : 20 }}>{item.icon}</span>
                <div>
                    <div style={{
                        fontFamily: "'Cinzel',serif", fontSize: isMobile ? 14 : 16, fontWeight: 700,
                        color: tk.cardMonthColor(item.color),
                        textShadow: tk.cardMonthShadow(hov, item.color),
                        letterSpacing: ".06em", transition: "text-shadow .3s",
                    }}>{item.month}</div>
                    <div style={{
                        fontSize: 10, fontFamily: "'Space Mono',monospace",
                        color: tk.cardYear, letterSpacing: ".2em"
                    }}>{item.year}</div>
                </div>
                <div style={{
                    marginLeft: "auto", width: 32, height: 32, borderRadius: "50%",
                    background: tk.cardNumBg(item.color), border: `1px solid ${tk.cardNumBorder(item.color)}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Space Mono',monospace", fontSize: 11,
                    color: tk.cardNumColor(item.color), fontWeight: 700,
                }}>{item.num}</div>
            </div>

            <div style={{ height: 1, marginBottom: 12, background: tk.cardDivider(item.color) }} />

            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
                {item.tasks.map((t, ti) => {
                    const isHL = t.includes("✅") || t.includes("🎉") || t.includes("SUCCESS");
                    return (
                        <li key={ti} style={{
                            display: "flex", alignItems: "flex-start", gap: 8,
                            fontFamily: isHL ? "'Space Mono',monospace" : "Georgia,serif",
                            fontSize: isMobile ? 11 : 12,
                            color: isHL ? tk.taskHighlight(item.color) : tk.taskNormal,
                            lineHeight: 1.65, fontWeight: isHL ? 700 : 400,
                            letterSpacing: isHL ? ".04em" : "0",
                            animation: visible ? `fpTaskIn .4s ${.08 + ti * .055}s ease both` : "none",
                            background: isHL ? tk.taskHighBg(item.color) : "transparent",
                            padding: isHL ? "4px 8px" : "0",
                            borderRadius: isHL ? 8 : 0,
                            border: isHL ? `1px solid ${tk.taskHighBorder(item.color)}` : "none",
                            margin: isHL ? "2px 0" : "0",
                        }}>
                            <span style={{
                                width: isHL ? 6 : 5, height: isHL ? 6 : 5, borderRadius: "50%", flexShrink: 0,
                                background: item.color,
                                boxShadow: `0 0 ${isHL ? 10 : 5}px ${item.color}`,
                                marginTop: 5,
                            }} />
                            {t}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

/* ══════════════════════════════════════════════════════
   TIMELINE ITEM
══════════════════════════════════════════════════════ */
function TimelineItem({ item, index, isMobile, isLast, tk }: {
    item: typeof ABCSHOP.months[0]; index: number; isMobile: boolean; isLast: boolean; tk: FpTheme;
}) {
    const { ref, visible } = useVisible(0.07);
    const isRight = index % 2 === 0;

    if (isMobile) {
        return (
            <div ref={ref} style={{
                display: "flex", gap: 12,
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(24px)",
                transition: `opacity .6s ${index * .07}s ease,transform .6s ${index * .07}s cubic-bezier(.22,.68,0,1.2)`,
            }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: 26 }}>
                    <div style={{
                        width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
                        background: `radial-gradient(circle,${item.color} 0%,${item.color}44 60%,transparent 100%)`,
                        border: `2px solid ${item.color}`,
                        boxShadow: `0 0 12px ${item.glow}88,0 0 24px ${item.glow}44`,
                        display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2,
                        animation: visible ? `fpNodeIn .5s ${index * .07}s ease both` : "none",
                    }}>
                        <div style={{
                            width: 7, height: 7, borderRadius: "50%", background: "#fff",
                            boxShadow: `0 0 5px ${item.color}`
                        }} />
                    </div>
                    {!isLast && (
                        <div style={{
                            flex: 1, width: 2, marginTop: 4,
                            background: `linear-gradient(180deg,${item.color}88,transparent)`
                        }} />
                    )}
                </div>
                <div style={{ flex: 1, paddingBottom: isLast ? 0 : 18 }}>
                    <TimelineCard item={item} isMobile={isMobile} visible={visible} tk={tk} />
                </div>
            </div>
        );
    }

    return (
        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "1fr 64px 1fr", alignItems: "flex-start" }}>
            <div style={{
                paddingRight: 28, paddingTop: 8,
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : `translateX(${isRight ? -28 : 0}px)`,
                transition: `opacity .65s ${index * .1}s ease,transform .65s ${index * .1}s cubic-bezier(.22,.68,0,1.2)`,
            }}>
                {isRight && <TimelineCard item={item} isMobile={isMobile} visible={visible} tk={tk} />}
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", zIndex: 2, paddingTop: 8 }}>
                <div style={{
                    width: 48, height: 48, borderRadius: "50%",
                    background: `radial-gradient(circle,${item.color}ee 0%,${item.color}55 55%,transparent 100%)`,
                    border: `2px solid ${item.color}`,
                    boxShadow: `0 0 24px ${item.glow}99,0 0 48px ${item.glow}44`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18, flexShrink: 0,
                    animation: visible ? `fpNodeIn .5s ${index * .1}s ease both` : "none",
                }}>{item.icon}</div>
            </div>
            <div style={{
                paddingLeft: 28, paddingTop: 8,
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : `translateX(${!isRight ? 28 : 0}px)`,
                transition: `opacity .65s ${index * .1}s ease,transform .65s ${index * .1}s cubic-bezier(.22,.68,0,1.2)`,
            }}>
                {!isRight && <TimelineCard item={item} isMobile={isMobile} visible={visible} tk={tk} />}
            </div>
        </div>
    );
}

/* ══════════════════════════════════════════════════════
   SECTION HEADER helper
══════════════════════════════════════════════════════ */
function SectionHeader({ icon, label, accentColor, tk }: {
    icon: string; label: string; accentColor: string; tk: FpTheme;
}) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 32 }}>
            <div style={{ flex: 1, height: 1, background: tk.sectionLine(accentColor) }} />
            <span style={{
                fontFamily: "'Cinzel',serif", fontSize: 11,
                color: tk.sectionColor(accentColor), letterSpacing: ".28em",
                fontWeight: 700, whiteSpace: "nowrap", transition: "color .5s"
            }}>
                {icon} {label}
            </span>
            <div style={{
                flex: 1, height: 1,
                background: `linear-gradient(90deg,${accentColor}44,transparent)`
            }} />
        </div>
    );
}

/* ══════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════ */
export default function FeatureProjectPage() {
    const { isDark } = useTheme();
    const tk = isDark ? MOON_FP : SUN_FP;
    const project = ABCSHOP;

    const [isMobile, setIsMobile] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(false);
    const { ref: headerRef, visible: headerVisible } = useVisible(0.1);
    const { ref: planRef, visible: planVisible } = useVisible(0.08);
    const { ref: techRef, visible: techVisible } = useVisible(0.1);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Space+Mono:wght@400;700&family=Sarabun:wght@400;500;600&display=swap');
        @keyframes fpOrbDrift   { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(18px,-16px) scale(1.04)} }
        @keyframes fpScan       { 0%{top:-2%} 100%{top:102%} }
        @keyframes fpShimmer    { 0%{background-position:-300% center} 100%{background-position:300% center} }
        @keyframes fpNodeIn     { 0%{transform:scale(0) rotate(-180deg);opacity:0} 70%{transform:scale(1.15) rotate(10deg)} 100%{transform:scale(1) rotate(0);opacity:1} }
        @keyframes fpTaskIn     { from{opacity:0;transform:translateX(-12px)} to{opacity:1;transform:translateX(0)} }
        @keyframes fpTechReveal { from{opacity:0;transform:scale(.8) translateY(10px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes fpLineGrow   { from{height:0;opacity:0} to{opacity:1} }
        @keyframes fpFadeUp     { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fpImgIn      { from{opacity:0;transform:scale(.97)} to{opacity:1;transform:scale(1)} }
        @keyframes fpDotPulse   { 0%,100%{transform:scale(1);opacity:.7} 50%{transform:scale(1.8);opacity:1} }
        * { box-sizing:border-box; margin:0; padding:0; }
      `}</style>

            <section id="projects-reference" style={{
                minHeight: "100vh",
                background: tk.pageBg,
                position: "relative", overflowX: "hidden",
                padding: isMobile ? "80px 0 60px" : "100px 0 80px",
                transition: "background .5s ease",
            }}>
                {/* grid */}
                <div style={{
                    position: "absolute", inset: 0, pointerEvents: "none",
                    backgroundImage: `linear-gradient(${tk.gridLine} 1px,transparent 1px),linear-gradient(90deg,${tk.gridLine} 1px,transparent 1px)`,
                    backgroundSize: "80px 80px"
                }} />

                {/* orbs */}
                {([
                    { w: 500, h: 500, t: "-12%", l: "-8%", bg: tk.orbA, d: "15s", dl: "0s" },
                    { w: 360, h: 360, t: "60%", r: "-7%", bg: tk.orbB, d: "19s", dl: "4s" },
                    { w: 260, h: 260, t: "28%", l: "42%", bg: tk.orbC, d: "11s", dl: "3s" },
                ] as any[]).map((o, i) => (
                    <div key={i} style={{
                        position: "absolute", width: o.w, height: o.h, top: o.t,
                        left: o.l, right: o.r, borderRadius: "50%", filter: "blur(88px)",
                        background: o.bg, animation: `fpOrbDrift ${o.d} ease-in-out ${o.dl} infinite`,
                        pointerEvents: "none", transition: "background .5s"
                    }} />
                ))}

                {/* scan */}
                <div style={{
                    position: "absolute", left: 0, right: 0, height: 2,
                    background: `linear-gradient(90deg,transparent,${tk.scanLine},transparent)`,
                    animation: "fpScan 10s linear infinite", pointerEvents: "none", zIndex: 2
                }} />

                {/* particles — dark only */}
                {isDark && Array.from({ length: 18 }, (_, i) => (
                    <div key={i} style={{
                        position: "absolute",
                        left: `${(i * 47.3) % 100}%`, top: `${(i * 31.7) % 100}%`,
                        width: (i % 3) + 1, height: (i % 3) + 1, borderRadius: "50%",
                        background: ["#34d399", "#38bdf8", "#a78bfa", "#fcd34d", "#fb923c", "#f0abfc"][i % 6],
                        boxShadow: `0 0 ${(i % 3 + 2) * 3}px ${["#34d399", "#38bdf8", "#a78bfa", "#fcd34d", "#fb923c", "#f0abfc"][i % 6]}`,
                        animation: `fpOrbDrift ${5 + i % 5}s ease-in-out ${(i * .3) % 5}s infinite`,
                        pointerEvents: "none", opacity: .60,
                    }} />
                ))}

                {/* CONTENT */}
                <div style={{
                    position: "relative", zIndex: 3, maxWidth: 1100, margin: "0 auto",
                    padding: isMobile ? "0 16px" : "0 clamp(20px,5%,60px)"
                }}>

                    {/* ══ HEADER ══ */}
                    <div ref={headerRef} style={{
                        textAlign: "center", marginBottom: isMobile ? 40 : 56,
                        opacity: headerVisible ? 1 : 0,
                        transform: headerVisible ? "none" : "translateY(-24px)",
                        transition: "opacity .8s ease,transform .8s cubic-bezier(.22,.68,0,1.2)",
                    }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 14 }}>
                            <div style={{ height: 1, width: isMobile ? 40 : 80, background: `linear-gradient(90deg,transparent,${tk.eyebrowLine})` }} />
                            <span style={{
                                fontSize: 10, color: tk.eyebrowColor, letterSpacing: ".40em",
                                fontFamily: "'Space Mono',monospace", transition: "color .5s"
                            }}>✦ FEATURED PROJECT ✦</span>
                            <div style={{ height: 1, width: isMobile ? 40 : 80, background: `linear-gradient(90deg,${tk.eyebrowLine},transparent)` }} />
                        </div>
                        <h1 style={{

                            fontSize: isMobile ? "clamp(26px,8vw,38px)" : "clamp(30px,4vw,48px)",
                            fontFamily: "'Cinzel',serif",
                            fontWeight: 900, letterSpacing: ".08em",
                            color: isDark ? "#e9d5ff" : "#1a3d28",
                            textShadow: isDark
                                ? "0 0 32px rgba(167,139,250,0.55), 0 2px 8px rgba(0,0,0,0.5)"
                                : "0 1px 0 rgba(255,255,255,0.9), 0 2px 12px rgba(45,106,79,0.15)",
                            lineHeight: 1.1, marginBottom: 8,
                            transition: "color .5s, text-shadow .5s",
                        }}>ABCat Shop</h1>
                        <p style={{
                            fontFamily: "'Space Mono',monospace", fontSize: 11,
                            color: tk.eyebrowColor, letterSpacing: ".18em",
                            textTransform: "uppercase", transition: "color .5s"
                        }}>
                            AI-Powered eCommerce · Smart Sizing Feature
                        </p>
                    </div>





                    {/* ══ HERO BADGE ══ */}
                    <div style={{
                        display: "flex", justifyContent: "center", marginBottom: isMobile ? 36 : 48,
                        animation: "fpFadeUp .5s ease both"
                    }}>
                        <div style={{
                            display: "inline-flex", alignItems: "center", gap: 12,
                            padding: isMobile ? "12px 20px" : "16px 32px",
                            borderRadius: 999,
                            background: tk.heroBg(project.accentColor),
                            border: `1.5px solid ${tk.heroBorder(project.accentColor)}`,
                            backdropFilter: "blur(14px)",
                            boxShadow: tk.heroGlow(project.accentColor),
                            flexWrap: isMobile ? "wrap" : "nowrap",
                            justifyContent: "center",
                        }}>
                            <span style={{ fontSize: 22 }}>{project.icon}</span>
                            <div>
                                <div style={{
                                    fontFamily: "'Cinzel',serif", fontSize: isMobile ? 13 : 15,
                                    color: tk.heroTitle, fontWeight: 700, letterSpacing: ".06em",
                                    transition: "color .5s"
                                }}>{project.name}</div>
                                <div style={{
                                    fontFamily: "'Space Mono',monospace", fontSize: 10,
                                    color: tk.heroSub(project.accentColor), letterSpacing: ".12em"
                                }}>
                                    {project.role}</div>
                            </div>
                            <div style={{
                                padding: "4px 14px", borderRadius: 999,
                                background: tk.heroTagBg(project.accentColor),
                                border: `1px solid ${tk.heroBorder(project.accentColor)}`,
                                fontSize: 10, color: tk.heroTagText(project.accentColor),
                                fontFamily: "'Space Mono',monospace", letterSpacing: ".1em", fontWeight: 700,
                            }}>{project.tag}</div>
                            <div style={{
                                padding: "4px 14px", borderRadius: 999,
                                background: tk.heroTagBg(project.accentColor),
                                border: `1px solid ${tk.heroBorder(project.accentColor)}`,
                                fontSize: 10, color: tk.heroTagText(project.accentColor),
                                fontFamily: "'Space Mono',monospace", letterSpacing: ".1em",
                            }}>{project.period}</div>

                            <a href={project.youtubeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: "flex", alignItems: "center", gap: 6,
                                    padding: "6px 16px", borderRadius: 999,
                                    background: "rgba(255,0,0,0.12)",
                                    border: "1.5px solid rgba(255,0,0,0.35)",
                                    textDecoration: "none", cursor: "pointer",
                                    transition: "all .25s ease",
                                }}
                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,0,0,0.22)";
                                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,0,0,0.60)";
                                    (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.05)";
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,0,0,0.12)";
                                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,0,0,0.35)";
                                    (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
                                }}
                            >
                                {/* YouTube icon */}
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="#ff0000">
                                    <path d="M23.5 6.2s-.23-1.65-.96-2.38c-.91-.96-1.94-.96-2.4-1.02C17.14 2.6 12 2.6 12 2.6s-5.14 0-8.14.2c-.47.06-1.49.06-2.4 1.02C.73 4.55.5 6.2.5 6.2S.27 8.13.27 10.05v1.8c0 1.92.23 3.85.23 3.85s.23 1.65.96 2.38c.91.96 2.12.93 2.65 1.03C5.73 19.3 12 19.3 12 19.3s5.14 0 8.14-.2c.47-.06 1.49-.06 2.4-1.02.73-.73.96-2.38.96-2.38s.23-1.93.23-3.85v-1.8C23.73 8.13 23.5 6.2 23.5 6.2zM9.73 14.59V8.41l6.55 3.1-6.55 3.08z" />
                                </svg>
                                <span style={{
                                    fontFamily: "'Space Mono',monospace", fontSize: 10,
                                    color: "#ff4444", fontWeight: 700, letterSpacing: ".1em",
                                    whiteSpace: "nowrap",
                                }}>VIDEO</span>
                            </a>
                        </div>
                    </div>

                    {/* ══ DESCRIPTION ══ */}
                    <div style={{
                        maxWidth: 820, margin: "0 auto", marginBottom: isMobile ? 40 : 56,
                        padding: isMobile ? "18px 20px" : "22px 32px",
                        borderRadius: 16,
                        background: tk.imgCardBg,
                        border: `1.5px solid ${tk.imgCardBorder(project.accentColor)}`,
                        backdropFilter: "blur(14px)",
                        animation: "fpFadeUp .6s .1s ease both",
                    }}>
                        <p style={{
                            fontFamily: "'Sarabun',sans-serif", fontSize: isMobile ? 13 : 14,
                            lineHeight: 1.9, color: tk.imgCaption,
                            textAlign: "center", letterSpacing: ".01em",
                            transition: "color .5s",
                        }}>{project.description}</p>
                    </div>

                    {/* ══ STATS ══ */}
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)",
                        gap: isMobile ? 12 : 20,
                        marginBottom: isMobile ? 52 : 72,
                    }}>
                        {project.stats.map((s, i) => (
                            <div key={i} style={{
                                textAlign: "center", padding: isMobile ? "20px 14px" : "26px 18px",
                                borderRadius: 18,
                                background: tk.statBg,
                                border: `1.5px solid ${tk.statBorder(project.accentColor)}`,
                                backdropFilter: "blur(14px)",
                                position: "relative", overflow: "hidden",
                                animation: `fpFadeUp .5s ${i * .1}s ease both`,
                                transition: "background .5s,border-color .5s",
                            }}>
                                <div style={{
                                    position: "absolute", top: 0, left: "20%", right: "20%", height: 1.5,
                                    background: tk.statTopLine(project.accentColor)
                                }} />
                                <div style={{
                                    fontFamily: "'Cinzel',serif", fontSize: isMobile ? 38 : 46, fontWeight: 900, lineHeight: 1,
                                    color: project.accentColor,
                                    textShadow: isDark ? `0 0 20px ${project.accentColor}88` : `0 0 12px ${project.accentColor}44`,
                                    marginBottom: 6,
                                    transition: "color .5s, text-shadow .5s",
                                }}>{s.value}</div>
                                <div style={{
                                    fontFamily: "'Cinzel',serif", fontSize: 13,
                                    color: tk.statLabel(project.accentColor),
                                    fontWeight: 700, letterSpacing: ".08em", marginBottom: 4, transition: "color .5s"
                                }}>{s.label}</div>
                                <div style={{
                                    fontFamily: "'Sarabun',sans-serif", fontSize: 12,
                                    color: tk.statSub, transition: "color .5s"
                                }}>{s.sub}</div>
                            </div>
                        ))}
                    </div>

                    {/* ══ PLANNING STRUCTURE ══ */}
                    <div ref={planRef}>
                        <SectionHeader icon="📐" label="PLANNING STRUCTURE" accentColor={project.accentColor} tk={tk} />

                        <div style={{
                            borderRadius: 20, overflow: "hidden",
                            border: `1.5px solid ${tk.imgCardBorder(project.accentColor)}`,
                            boxShadow: tk.imgCardShadow(project.accentColor),
                            background: tk.imgCardBg,
                            opacity: planVisible ? 1 : 0,
                            transform: planVisible ? "none" : "translateY(20px)",
                            transition: "opacity .7s ease,transform .7s cubic-bezier(.22,.68,0,1.2)",
                            backdropFilter: "blur(12px)",
                        }}>
                            {/* image header bar */}
                            <div style={{
                                padding: "12px 20px",
                                borderBottom: `1px solid ${tk.imgCardBorder(project.accentColor)}`,
                                display: "flex", alignItems: "center", gap: 10,
                                background: isDark ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.60)",
                            }}>
                                <div style={{ display: "flex", gap: 6 }}>
                                    {["#ef4444", "#fbbf24", "#34d399"].map((c, i) => (
                                        <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
                                    ))}
                                </div>
                                <span style={{
                                    fontFamily: "'Space Mono',monospace", fontSize: 10,
                                    color: tk.sectionColor(project.accentColor), letterSpacing: ".14em",
                                    fontWeight: 700, transition: "color .5s"
                                }}>
                                    ABCat Shop — Planning Structure & AI Smart Sizing Feature
                                </span>
                                <div style={{ marginLeft: "auto" }}>
                                    <span style={{
                                        padding: "2px 10px", borderRadius: 999,
                                        background: tk.imgTagBg(project.accentColor),
                                        border: `1px solid ${tk.imgCardBorder(project.accentColor)}`,
                                        fontSize: 9, color: tk.imgTag(project.accentColor),
                                        fontFamily: "'Space Mono',monospace", letterSpacing: ".16em", fontWeight: 700,
                                    }}>ARCHITECTURE</span>
                                </div>
                            </div>

                            {/* image */}
                            <div style={{ position: "relative", backgroundColor: isDark ? "#0a0814" : "#f8f9f8" }}>
                                {!imgLoaded && (
                                    <div style={{
                                        height: 300, display: "flex", alignItems: "center", justifyContent: "center",
                                        color: tk.sectionColor(project.accentColor), fontFamily: "'Space Mono',monospace",
                                        fontSize: 11, letterSpacing: ".14em", gap: 8,
                                    }}>
                                        <span style={{ animation: "fpDotPulse 1s ease-in-out infinite" }}>◈</span>
                                        LOADING ARCHITECTURE...
                                        <span style={{ animation: "fpDotPulse 1s .3s ease-in-out infinite" }}>◈</span>
                                    </div>
                                )}
                                <img
                                    src={project.planningImg}
                                    alt="ABCat Shop Planning Structure"
                                    onLoad={() => setImgLoaded(true)}
                                    style={{
                                        width: "100%", display: "block",
                                        objectFit: "contain",
                                        opacity: imgLoaded ? 1 : 0,
                                        transition: "opacity .5s ease",
                                        animation: imgLoaded ? "fpImgIn .6s ease both" : "none",
                                    }}
                                />
                            </div>

                            {/* caption */}
                            <div style={{
                                padding: "16px 24px",
                                borderTop: `1px solid ${tk.imgCardBorder(project.accentColor)}`,
                                background: isDark ? "rgba(0,0,0,0.30)" : "rgba(255,255,255,0.70)",
                            }}>
                                <p style={{
                                    fontFamily: "'Sarabun',sans-serif", fontSize: 12,
                                    color: tk.imgCaption, lineHeight: 1.7, margin: 0, transition: "color .5s",
                                }}>
                                    <strong style={{ color: tk.sectionColor(project.accentColor), fontWeight: 700 }}>
                                        Architecture Overview:
                                    </strong>{" "}
                                    ระบบ ABCat Shop ประกอบด้วย Flutter (Frontend) · FastAPI + Python (Backend & AI) · PostgreSQL + Cloudinary (Database & Storage) · Firebase (Auth) · Jenkins (CI/CD) · Render (Deploy) และ OpenAI GPT-4.1 mini + Gemini 2.5 Flash สำหรับ Detect & Analysis แมว
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ══ TIMELINE ══ */}
                    <div style={{ marginTop: isMobile ? 52 : 76 }}>
                        <SectionHeader icon="🗓" label={`TIMELINE · ${project.name}`} accentColor={project.accentColor} tk={tk} />

                        <div style={{ position: "relative" }}>
                            {!isMobile && (
                                <div style={{
                                    position: "absolute", left: "50%", top: 28, bottom: 28,
                                    width: 2, transform: "translateX(-50%)",
                                    background: `linear-gradient(180deg,${project.months.map(m => m.color + "55").join(",")})`,
                                    animation: "fpLineGrow 1.2s ease both",
                                    zIndex: 1,
                                }} />
                            )}
                            <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 0 : 32 }}>
                                {project.months.map((item, i) => (
                                    <TimelineItem key={i} item={item} index={i}
                                        isMobile={isMobile} isLast={i === project.months.length - 1} tk={tk} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ══ TECH STACK ══ */}
                    <div ref={techRef} style={{ marginTop: isMobile ? 52 : 76 }}>
                        <SectionHeader icon="⚙" label="เทคโนโลยีที่ใช้" accentColor={project.accentColor} tk={tk} />
                        <div style={{ display: "flex", flexWrap: "wrap", gap: isMobile ? 8 : 12, justifyContent: "center" }}>
                            {project.tech.map((t, i) => (
                                <div key={i} style={{
                                    padding: isMobile ? "7px 13px" : "9px 17px", borderRadius: 999,
                                    background: tk.techBg(t.color),
                                    border: `1.5px solid ${tk.techBorder(t.color)}`,
                                    backdropFilter: "blur(10px)",
                                    display: "flex", alignItems: "center", gap: 7,
                                    animation: techVisible ? `fpTechReveal .5s ${i * .045}s ease both` : "none",
                                    opacity: techVisible ? 1 : 0,
                                }}>
                                    <div style={{
                                        width: 6, height: 6, borderRadius: "50%", background: t.color,
                                        boxShadow: `0 0 6px ${t.color}`, flexShrink: 0
                                    }} />
                                    <span style={{
                                        fontFamily: "'Space Mono',monospace",
                                        fontSize: isMobile ? 10 : 11, color: tk.techLabel(t.color),
                                        fontWeight: 700, letterSpacing: ".08em"
                                    }}>{t.label}</span>
                                    <span style={{
                                        fontSize: 9, color: tk.techCat,
                                        fontFamily: "'Space Mono',monospace", letterSpacing: ".1em",
                                        textTransform: "uppercase", transition: "color .5s"
                                    }}>{t.cat}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* bottom fade */}
                <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0, height: 80,
                    background: tk.bottomFade, pointerEvents: "none", transition: "background .5s"
                }} />
            </section >
        </>
    );
}