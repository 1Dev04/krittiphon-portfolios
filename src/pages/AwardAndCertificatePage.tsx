import { useEffect, useState, useRef, useCallback } from "react";
import { useTheme } from "../components/themeContext";

/* ══════════════════════════════════════════════════════════════════
   THEME INTERFACE
══════════════════════════════════════════════════════════════════ */
interface ThemeTk {
  // page
  pageBg: string;
  gridLine: string;
  orbA: string;
  orbB: string;
  orbC: string;
  scanLine: string;
  particles: string[];
  bottomFade: string;
  // typography
  pageEyebrow: string;
  pageEyebrowLine: string;
  pageHeading: string;
  sectionLabel: string;
  sectionLabelLine: string;
  dividerLine: string;
  dividerText: string;
  // award slideshow
  awardSlideBorder: (c: string) => string;
  awardSlideGlow: (c: string) => string;
  awardOverlay: string;
  awardTagBg: (c: string) => string;
  awardTagBorder: (c: string) => string;
  awardYearColor: string;
  // popup
  popupBg: string;
  popupBorder: (c: string) => string;
  popupBodyBg: string;
  // tabs
  tabActiveBg: (c: string) => string;
  tabActiveBorder: (c: string) => string;
  tabActiveGlow: (c: string) => string;
  tabInactiveBg: string;
  tabInactiveBorder: string;
  tabInactiveText: string;
  // cert card
  cardBg: string;
  cardBorder: string;
  cardBorderHov: (c: string) => string;
  cardShadow: string;
  cardShadowHov: (c: string) => string;
  cardImgOverlay: string;
  cardTitle: string;
  cardTitleHov: string;
  cardDesc: string;
  cardMeta: string;
  cardHint: string;
  cardHintHov: (c: string) => string;
  // modal
  modalBackdrop: string;
  modalBg: string;
  modalBorder: (c: string) => string;
  modalShadow: (c: string) => string;
  modalSpine: (c: string) => string;
  modalLine: string;
  modalSealColor: string;
  modalCorner: (c: string) => string;
  modalHeading: (c: string) => string;
  modalDesc: string;
  modalFooter: string;
  modalCloseBg: string;
  modalCloseColor: (c: string) => string;
}

/* ══════════════════════════════════════════════════════════════════
   ☀️  SUN — Natural Smooth / Clean Green White Black
══════════════════════════════════════════════════════════════════ */
const SUN: ThemeTk = {
  pageBg: "#f8faf8",
  gridLine: "rgba(45,106,79,0.04)",
  orbA: "rgba(45,106,79,0.07)",
  orbB: "rgba(82,183,136,0.06)",
  orbC: "rgba(27,67,50,0.05)",
  scanLine: "rgba(45,106,79,0.06)",
  particles: ["#2d6a4f", "#40916c", "#74c69d", "#1b4332", "#52b788"],
  bottomFade: "linear-gradient(transparent,#f0f5f0)",
  pageEyebrow: "#2d6a4f",
  pageEyebrowLine: "rgba(45,106,79,0.35)",
  pageHeading: "#1a3d28",
  sectionLabel: "#2d6a4f",
  sectionLabelLine: "rgba(45,106,79,0.28)",
  dividerLine: "rgba(45,106,79,0.16)",
  dividerText: "rgba(45,106,79,0.40)",
  awardSlideBorder: (c) => `${c}40`,
  awardSlideGlow: (c) => `0 4px 40px ${c}18, 0 16px 48px rgba(20,60,35,0.10)`,
  awardOverlay: "linear-gradient(to top,rgba(10,30,15,0.90) 0%,rgba(10,30,15,0.50) 45%,transparent 100%)",
  awardTagBg: (c) => `${c}18`,
  awardTagBorder: (c) => `${c}50`,
  awardYearColor: "rgba(255,255,255,0.60)",
  popupBg: "rgba(240,248,243,0.97)",
  popupBorder: (c) => `${c}38`,
  popupBodyBg: "rgba(248,252,249,0.99)",
  tabActiveBg: (c) => `${c}18`,
  tabActiveBorder: (c) => `${c}66`,
  tabActiveGlow: () => "none",
  tabInactiveBg: "rgba(255,255,255,0.85)",
  tabInactiveBorder: "rgba(45,106,79,0.22)",
  tabInactiveText: "rgba(20,50,30,0.50)",
  cardBg: "rgba(255,255,255,0.90)",
  cardBorder: "rgba(45,106,79,0.12)",
  cardBorderHov: (c) => `${c}40`,
  cardShadow: "0 2px 12px rgba(20,60,35,0.06), 0 1px 3px rgba(20,60,35,0.04)",
  cardShadowHov: (c) => `0 8px 32px ${c}18, 0 2px 8px rgba(20,60,35,0.08)`,
  cardImgOverlay: "linear-gradient(to top,rgba(10,30,15,0.75) 0%,transparent 55%)",
  cardTitle: "#1a3d28",
  cardTitleHov: "#0d2618",
  cardDesc: "rgba(20,50,30,0.56)",
  cardMeta: "rgba(20,50,30,0.36)",
  cardHint: "rgba(20,50,30,0.24)",
  cardHintHov: (c) => c,
  modalBackdrop: "rgba(10,30,15,0.75)",
  modalBg: "rgba(245,252,248,0.99)",
  modalBorder: (c) => `${c}38`,
  modalShadow: (c) => `0 24px 80px ${c}18, 0 8px 32px rgba(10,30,15,0.12)`,
  modalSpine: (c) => `linear-gradient(180deg,transparent,${c}33,transparent)`,
  modalLine: "rgba(45,106,79,0.05)",
  modalSealColor: "#ffffff",
  modalCorner: (c) => `${c}44`,
  modalHeading: (c) => c,
  modalDesc: "rgba(20,50,30,0.60)",
  modalFooter: "rgba(20,50,30,0.25)",
  modalCloseBg: "rgba(240,248,243,0.97)",
  modalCloseColor: (c) => c,
};

/* ══════════════════════════════════════════════════════════════════
   🌙  MOON — Galaxy Magic
══════════════════════════════════════════════════════════════════ */
const MOON: ThemeTk = {
  pageBg: "#05050e",
  gridLine: "rgba(167,139,250,0.028)",
  orbA: "rgba(124,58,237,0.16)",
  orbB: "rgba(6,182,212,0.11)",
  orbC: "rgba(236,72,153,0.09)",
  scanLine: "rgba(167,139,250,0.16)",
  particles: ["#a78bfa", "#67e8f9", "#86efac", "#fda4af", "#fcd34d"],
  bottomFade: "linear-gradient(transparent,#05050e)",
  pageEyebrow: "#a78bfa",
  pageEyebrowLine: "rgba(167,139,250,0.40)",
  pageHeading: "#f1f5f9",
  sectionLabel: "#fcd34d",
  sectionLabelLine: "rgba(252,211,77,0.35)",
  dividerLine: "rgba(167,139,250,0.20)",
  dividerText: "rgba(167,139,250,0.45)",
  awardSlideBorder: (c) => `${c}44`,
  awardSlideGlow: (c) => `0 4px 60px ${c}22, 0 20px 60px rgba(0,0,0,0.55)`,
  awardOverlay: "linear-gradient(to top,rgba(5,5,14,0.94) 0%,rgba(5,5,14,0.35) 50%,transparent 100%)",
  awardTagBg: (c) => `${c}1e`,
  awardTagBorder: (c) => `${c}55`,
  awardYearColor: "rgba(255,255,255,0.45)",
  popupBg: "rgba(4,4,20,0.96)",
  popupBorder: (c) => `${c}44`,
  popupBodyBg: "rgba(6,5,22,0.99)",
  tabActiveBg: (c) => `linear-gradient(135deg,${c}20,${c}0e)`,
  tabActiveBorder: (c) => `${c}77`,
  tabActiveGlow: (c) => `0 0 16px ${c}28`,
  tabInactiveBg: "rgba(255,255,255,0.03)",
  tabInactiveBorder: "rgba(167,139,250,0.14)",
  tabInactiveText: "rgba(200,180,255,0.38)",
  cardBg: "rgba(255,255,255,0.04)",
  cardBorder: "rgba(167,139,250,0.12)",
  cardBorderHov: (c) => `${c}55`,
  cardShadow: "0 4px 20px rgba(0,0,0,0.32)",
  cardShadowHov: (c) => `0 0 32px ${c}22, 0 12px 40px rgba(0,0,0,0.55)`,
  cardImgOverlay: "linear-gradient(to top,rgba(5,5,14,0.90) 0%,transparent 55%)",
  cardTitle: "#e2d9f3",
  cardTitleHov: "#f1f5f9",
  cardDesc: "rgba(200,185,255,0.50)",
  cardMeta: "rgba(200,185,255,0.32)",
  cardHint: "rgba(167,139,250,0.28)",
  cardHintHov: (c) => c,
  modalBackdrop: "rgba(2,1,12,0.88)",
  modalBg: "rgba(8,6,24,0.98)",
  modalBorder: (c) => `${c}44`,
  modalShadow: (c) => `0 0 80px ${c}22, 0 30px 80px rgba(0,0,0,0.75)`,
  modalSpine: (c) => `linear-gradient(180deg,transparent,${c}44,transparent)`,
  modalLine: "rgba(167,139,250,0.025)",
  modalSealColor: "#ffffff",
  modalCorner: (c) => `${c}55`,
  modalHeading: (c) => c,
  modalDesc: "rgba(220,210,255,0.60)",
  modalFooter: "rgba(167,139,250,0.22)",
  modalCloseBg: "rgba(5,5,14,0.92)",
  modalCloseColor: (c) => c,
};

/* ══════════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════════ */
type Tab = "frontend" | "backend" | "other";

const awards = [
  { title: "Completed an Internship in the Full Stack Developer", org: "Clicknext Co.,Ltd.", year: "May – Oct 2025", color: "#a78bfa", img: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773244452/IMG_3239_xmjvrx.jpg" },
  { title: "นิสิตวิทยาการคอมพิวเตอร์ ศรีราชา คว้ารางวัลจากโครงการ Hack to the Max", org: "Hack to the Max: Digital Infrastructure", year: "Nov 2024", color: "#67e8f9", img: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773245022/Screenshot_2026-03-11_225936_b7fnul.png" },
  { title: "Fraud Monitoring", org: "National ITMX Hackathon", year: "2024", color: "#86efac", img: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773243732/Screenshot_2024-10-29_003709_rzxdrh.png" },
];

type Cert = { image?: string; title: string; desc: string; tag: string; color: string };

const certs: Record<Tab, Cert[]> = {
  frontend: [
    { image: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773285639/React_cjm6x6.png", title: "Basic React", desc: "React training to enhance digital skills.", tag: "FRONTEND", color: "#7dd3fc" },
    { image: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773285721/powerBi_rdluo7.jpg", title: "Power BI", desc: "Power BI basic training for data analysis.", tag: "FRONTEND", color: "#7dd3fc" },
    { image: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773285725/GoogleC_ycotsm.png", title: "Cloud API", desc: "Google Cloud API integration training.", tag: "FRONTEND", color: "#7dd3fc" },
  ],
  backend: [
    { image: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773285798/jenkins_qv0rqa.jpg", title: "Jenkins", desc: "Jenkins corporate CI/CD training program.", tag: "BACKEND", color: "#a78bfa" },
    { image: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773285790/Golang_u37fgw.jpg", title: "Ultimate Golang", desc: "Complete Golang backend development — Udemy.", tag: "BACKEND", color: "#a78bfa" },
    { image: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773285803/Java_g0imtf.jpg", title: "Java Programming", desc: "Java with Born to Dev. Built CheeseCake_Cafe with PostgreSQL.", tag: "BACKEND", color: "#a78bfa" },
    { image: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773285794/C_uxveew.jpg", title: "C Programming", desc: "Zero To One: C Programming — Built CakeCafe_C project.", tag: "BACKEND", color: "#a78bfa" },
  ],
  other: [
    { image: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773286121/IMG_3244_vs9z52.jpg", title: "Clicknext Internship", desc: "Full Stack Developer internship certificate.", tag: "SPECIAL", color: "#fbbf24" },
    { image: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773285936/Fusion_rrfhil.jpg", title: "ICP Hubs Thailand", desc: "Chain Fusion Hacker House participation.", tag: "SPECIAL", color: "#fbbf24" },
    { image: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773285949/Hack_o3svyr.png", title: "National ITMX", desc: "National ITMX Hackathon 2024.", tag: "SPECIAL", color: "#fbbf24" },
    { image: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773285927/KBTG_xadmrz.jpg", title: "Krung Thai Bank", desc: "ธนาคารกรุงไทย | ผ่านการอบรม", tag: "SPECIAL", color: "#fbbf24" },
    { image: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773285954/A14_qvjsss.png", title: "Chula Mooc", desc: "Exploring Digital Technology Landscape.", tag: "SPECIAL", color: "#fbbf24" },
    { image: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773285932/Link_mu0uhx.jpg", title: "Network Cabling", desc: "Link American Standard: Network Cabling.", tag: "OTHER", color: "#34d399" },
    { image: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773285856/A1_vctren.png", title: "GenAI & ChatGPT", desc: "อ. ดร.เอกพล ช่วงสุวนิช", tag: "AI", color: "#818cf8" },
    { image: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773285861/A2_g295om.png", title: "ChatGPT ช่วยทำวิจัย", desc: "รศ. ดร.วิโรจน์ อรุณมานะกุล", tag: "AI", color: "#818cf8" },
    { image: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773285874/A3_tpd9xz.png", title: "แท็กติกการสอนยุค AI", desc: "ศ. ดร.จินตวีร์ คล้ายสังข์", tag: "AI", color: "#818cf8" },
    { image: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773285869/A4_jowrst.png", title: "ChatGPT เศรษฐกิจยุคใหม่", desc: "ผศ. ดร.วรประภา นาควัชระ", tag: "AI", color: "#818cf8" },
    { image: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773285884/A5_xod5ou.png", title: "เขียนโค้ดคู่ AI", desc: "ผศ. ดร.ฑิตยา หวานวารี", tag: "AI", color: "#818cf8" },
    { image: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773285879/A6_nz3eur.png", title: "Python กับ ChatGPT", desc: "ผศ. ดร.สุกรี สินธุภิญโญ", tag: "AI", color: "#818cf8" },
    { image: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773285895/A7_pm2kwu.png", title: "Microsoft x GPT4", desc: "คุณโอม ศิวะดิตถ์", tag: "AI", color: "#818cf8" },
    { image: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773285890/A8_wznvwk.png", title: "การสอนในยุค AI", desc: "Dr.Virot 'TA' Chiraphadhanakul", tag: "AI", color: "#818cf8" },
    { image: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773285906/A9_h8kk67.png", title: "Visual Storytelling AI", desc: "ตุลย์ เล็กอุทัย , อ.วรรษยุต คงจันทร์", tag: "AI", color: "#818cf8" },
    { image: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773285911/A10_zua3sh.png", title: "จริยธรรม ChatGPT", desc: "รศ. ดร.ศิรประภา ชวะนะญาณ", tag: "AI", color: "#818cf8" },
    { image: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773285901/A11_khuqa4.png", title: "การเงินกับ AI", desc: "รศ. ดร.คณิสร์ แสงโชติ", tag: "AI", color: "#818cf8" },
    { image: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773285940/A12_awz3ri.png", title: "AI กับการตลาด 6.0", desc: "ผศ. ดร.เอกก์ ภทรธนกุล", tag: "AI", color: "#818cf8" },
    { image: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773285944/A13_e1ogec.png", title: "ปรับตัวใช้ GenAI", desc: "ดร.อวิรุทธ์ ฉัตรมาลาทอง", tag: "AI", color: "#818cf8" },
  ],
};

/* ══════════════════════════════════════════════════════════════════
   MODAL — Magic Book
══════════════════════════════════════════════════════════════════ */
function CertModal({ cert, isOpen, onClose, isMobile, tk }: {
  cert: Cert | null; isOpen: boolean; onClose: () => void; isMobile: boolean; tk: ThemeTk;
}) {
  if (!cert) return null;
  const hasImg = !!cert.image;
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: tk.modalBackdrop, backdropFilter: "blur(18px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
      opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? "auto" : "none", transition: "opacity .35s",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        position: "relative",
        width: isMobile ? "100%" : hasImg ? 800 : 560,
        maxWidth: hasImg ? 800 : 560,
        animation: isOpen ? "acBookOpen .55s cubic-bezier(.22,.68,0,1.2) both" : "none",
      }}>
        {/* glow shadow */}
        <div style={{
          position: "absolute", bottom: -24, left: "12%", right: "12%", height: 24,
          background: `radial-gradient(ellipse,${cert.color}30 0%,transparent 70%)`,
          filter: "blur(12px)", pointerEvents: "none"
        }} />

        <div style={{
          background: tk.modalBg, borderRadius: 18,
          border: `1.5px solid ${tk.modalBorder(cert.color)}`,
          boxShadow: tk.modalShadow(cert.color),
          overflow: "hidden", position: "relative",
          display: "flex", flexDirection: hasImg && !isMobile ? "row" : "column",
        }}>
          {/* spine */}
          <div style={{
            position: "absolute", top: 0, left: 32, bottom: 0, width: 1,
            background: tk.modalSpine(cert.color), zIndex: 1, pointerEvents: "none"
          }} />
          {/* page lines */}
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} style={{
              position: "absolute", left: 0, right: 0, height: 1,
              top: `${14 + i * 13}%`, background: tk.modalLine, pointerEvents: "none", zIndex: 0
            }} />
          ))}
          {/* wax seal */}
          <div style={{
            position: "absolute", top: isMobile ? -16 : -20, left: "50%", transform: "translateX(-50%)",
            width: isMobile ? 40 : 52, height: isMobile ? 40 : 52, borderRadius: "50%", zIndex: 5,
            background: `radial-gradient(circle,${cert.color} 0%,${cert.color}88 55%,transparent 100%)`,
            border: `2px solid ${cert.color}`,
            boxShadow: `0 0 18px ${cert.color}99, 0 0 36px ${cert.color}44`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: isMobile ? 16 : 20, color: tk.modalSealColor,
          }}>✦</div>
          {/* corner marks */}
          {[["top", "left"], ["top", "right"], ["bottom", "left"], ["bottom", "right"]].map(([v, h], ki) => (
            <div key={ki} style={{
              position: "absolute", zIndex: 2, pointerEvents: "none",
              top: v === "top" ? 14 : "auto", bottom: v === "bottom" ? 14 : "auto",
              left: h === "left" ? 14 : "auto", right: h === "right" ? 14 : "auto",
              width: 14, height: 14,
              borderTop: v === "top" ? `1.5px solid ${tk.modalCorner(cert.color)}` : "none",
              borderBottom: v === "bottom" ? `1.5px solid ${tk.modalCorner(cert.color)}` : "none",
              borderLeft: h === "left" ? `1.5px solid ${tk.modalCorner(cert.color)}` : "none",
              borderRight: h === "right" ? `1.5px solid ${tk.modalCorner(cert.color)}` : "none",
            }} />
          ))}

          {/* image */}
          {hasImg && (
            <div style={{
              position: "relative", width: isMobile ? "100%" : "46%", flexShrink: 0,
              minHeight: isMobile ? 180 : 300, overflow: "hidden",
              borderRight: !isMobile ? `1px solid ${cert.color}22` : "none",
              borderBottom: isMobile ? `1px solid ${cert.color}22` : "none",
            }}>
              <img src={cert.image} alt={cert.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "brightness(.9) saturate(1.05)" }} />
              <div style={{
                position: "absolute", inset: 0,
                background: !isMobile
                  ? `linear-gradient(90deg,transparent 65%,rgba(0,0,0,.55) 100%)`
                  : `linear-gradient(0deg,rgba(0,0,0,.7) 0%,transparent 55%)`,
                pointerEvents: "none"
              }} />
              <span style={{
                position: "absolute", top: 10, left: 10,
                padding: "2px 10px", borderRadius: 999,
                background: `${cert.color}1e`, border: `1px solid ${cert.color}55`,
                backdropFilter: "blur(8px)",
                fontSize: 10, color: cert.color, fontFamily: "'Space Mono',monospace",
                letterSpacing: ".16em", fontWeight: 700,
              }}>{cert.tag}</span>
            </div>
          )}

          {/* text */}
          <div style={{
            flex: 1, padding: isMobile ? "28px 22px 24px" : "40px 36px 36px",
            display: "flex", flexDirection: "column", justifyContent: "center",
            position: "relative", zIndex: 2, marginTop: !hasImg ? 14 : 0,
          }}>
            <p style={{
              margin: "0 0 12px", textAlign: "center",
              fontFamily: "'Space Mono',monospace", fontSize: 10,
              color: `${cert.color}88`, letterSpacing: ".38em", textTransform: "uppercase"
            }}>
              ✦ &nbsp; Certificate of Completion &nbsp; ✦</p>
            <h2 style={{
              margin: "0 0 18px", fontFamily: "'Cinzel',serif",
              fontSize: isMobile ? "clamp(19px,5vw,24px)" : hasImg ? 22 : 32,
              fontWeight: 900, lineHeight: 1.25, textAlign: "center",
              color: tk.modalHeading(cert.color),
            }}>{cert.title}</h2>

            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,transparent,${cert.color}44)` }} />
              <span style={{ color: `${cert.color}88`, fontSize: 11, letterSpacing: ".18em" }}>ᚠ ᚢ ᚦ</span>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${cert.color}44,transparent)` }} />
            </div>

            {!hasImg && (
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
                <span style={{
                  padding: "3px 14px", borderRadius: 999,
                  background: `${cert.color}14`, border: `1px solid ${cert.color}44`,
                  fontSize: 10, color: cert.color, fontFamily: "'Space Mono',monospace",
                  letterSpacing: ".18em", fontWeight: 700
                }}>{cert.tag}</span>
              </div>
            )}

            <p style={{
              margin: "0 0 20px", fontSize: isMobile ? 13 : 14,
              fontFamily: "Georgia,serif", fontStyle: "italic",
              color: tk.modalDesc, lineHeight: 1.85, textAlign: "center"
            }}>
              {cert.desc}</p>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,transparent,${cert.color}22)` }} />
              <div style={{
                width: 34, height: 34, borderRadius: "50%",
                border: `1px solid ${cert.color}44`, background: `${cert.color}0e`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, color: `${cert.color}bb`
              }}>ᚠ</div>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${cert.color}22,transparent)` }} />
            </div>
            <p style={{
              margin: "8px 0 0", textAlign: "center", fontSize: 10,
              color: tk.modalFooter, fontFamily: "'Space Mono',monospace", letterSpacing: ".16em"
            }}>
              1DEV · KNOWLEDGE CODEX</p>
          </div>
        </div>

        <button onClick={onClose} style={{
          position: "absolute", top: -12, right: -12,
          width: 30, height: 30, borderRadius: "50%",
          background: tk.modalCloseBg, border: `1px solid ${cert.color}44`,
          color: tk.modalCloseColor(cert.color), fontSize: 13, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 0 12px ${cert.color}44`, zIndex: 10,
        }}>✕</button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   CERT CARD — clean new design
══════════════════════════════════════════════════════════════════ */
function CertCard({ cert, idx, onOpen, isMobile, tk }: {
  cert: Cert; idx: number; onOpen: (c: Cert) => void; isMobile: boolean; tk: ThemeTk;
}) {
  const [h, sh] = useState(false);
  const hasImg = !!cert.image;

  return (
    <div
      onMouseEnter={() => sh(true)} onMouseLeave={() => sh(false)}
      onClick={() => onOpen(cert)}
      style={{
        position: "relative", borderRadius: 14, overflow: "hidden", cursor: "pointer",
        background: tk.cardBg,
        border: `1.5px solid ${h ? tk.cardBorderHov(cert.color) : tk.cardBorder}`,
        boxShadow: h ? tk.cardShadowHov(cert.color) : tk.cardShadow,
        transform: h ? "translateY(-5px)" : "none",
        transition: "all .3s cubic-bezier(.22,.68,0,1.2)",
        animation: `acReveal .5s ${idx * .06}s ease both`,
        display: "flex", flexDirection: "column",
      }}
    >
      {/* accent top bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2.5, zIndex: 3,
        background: h
          ? `linear-gradient(90deg,transparent,${cert.color},transparent)`
          : `linear-gradient(90deg,transparent,${cert.color}55,transparent)`,
        transition: "background .3s",
      }} />

      {/* image */}
      {hasImg && (
        <div style={{ position: "relative", width: "100%", height: isMobile ? 150 : 164, overflow: "hidden", flexShrink: 0 }}>
          <img src={cert.image} alt={cert.title}
            style={{
              width: "100%", height: "100%", objectFit: "cover", display: "block",
              transform: h ? "scale(1.05)" : "scale(1)",
              transition: "transform .5s cubic-bezier(.22,.68,0,1.2)",
              filter: "brightness(.88) saturate(1.1)"
            }} />
          <div style={{ position: "absolute", inset: 0, background: tk.cardImgOverlay, pointerEvents: "none" }} />
          {h && (
            <div style={{
              position: "absolute", inset: 0,
              background: `linear-gradient(135deg,transparent 45%,${cert.color}12 65%,transparent 85%)`,
              backgroundSize: "200% 200%", animation: "acShimmer 2s linear infinite", pointerEvents: "none"
            }} />
          )}
        </div>
      )}

      {/* body */}
      <div style={{
        padding: hasImg ? "14px 16px 16px" : "20px 18px 18px",
        display: "flex", flexDirection: "column", flex: 1, position: "relative",
      }}>
        {/* tag row */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 9 }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 4,
            padding: "2px 8px", borderRadius: 999,
            background: `${cert.color}14`, border: `1px solid ${cert.color}44`,
            fontSize: 10, color: cert.color, fontFamily: "'Space Mono',monospace",
            letterSpacing: ".14em", fontWeight: 700,
          }}>
            <span style={{
              width: 4, height: 4, borderRadius: "50%", background: cert.color,
              boxShadow: `0 0 4px ${cert.color}`, display: "inline-block"
            }} />
            {cert.tag}
          </span>
        </div>

        {/* title */}
        <h3 style={{
          margin: "0 0 7px", fontFamily: "'Cinzel',serif",
          fontSize: isMobile ? 14 : 15, fontWeight: 700, letterSpacing: ".03em", lineHeight: 1.35,
          color: h ? tk.cardTitleHov : tk.cardTitle, transition: "color .25s",
        }}>{cert.title}</h3>

        {/* desc */}
        <p style={{
          margin: "0 0 14px", fontSize: 12.5, lineHeight: 1.65, flex: 1,
          color: tk.cardDesc, fontFamily: "Georgia,serif", fontStyle: "italic",
        }}>{cert.desc}</p>

        {/* footer */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          borderTop: `1px solid ${h ? cert.color + "22" : tk.cardBorder}`,
          paddingTop: 10, transition: "border-color .3s",
        }}>
          <span style={{
            fontSize: 10, color: h ? tk.cardHintHov(cert.color) : tk.cardHint,
            fontFamily: "'Space Mono',monospace", letterSpacing: ".14em",
            transition: "color .3s", display: "flex", alignItems: "center", gap: 5,
          }}>
            <span style={{ fontSize: 11 }}>📖</span> VIEW CERT
          </span>
          <span style={{
            fontSize: 12, color: h ? cert.color : tk.cardMeta,
            fontFamily: "'Space Mono',monospace",
            opacity: h ? 1 : .6, transition: "all .25s",
          }}>→</span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   AWARD SLIDESHOW — clean large
══════════════════════════════════════════════════════════════════ */
function AwardSlideshow({ isMobile, tk, isDark }: { isMobile: boolean; tk: ThemeTk; isDark: boolean }) {
  const [cur, setCur] = useState(0);
  const [, setPrev] = useState<number | null>(null);
  const [dir, setDir] = useState<"next" | "prev">("next");
  const [paused, setPaused] = useState(false);
  const [popup, setPopup] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((n: number, d: "next" | "prev" = "next") => {
    setPrev(cur); setDir(d); setCur((n + awards.length) % awards.length);
  }, [cur]);

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => go(cur + 1, "next"), 3800);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [cur, paused, go]);

  const award = awards[cur];

  return (
    <div style={{ width: "100%", maxWidth: 920, margin: "0 auto" }}>

      {/* section label */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
        <span style={{ fontSize: 20 }}>🏆</span>
        <span style={{
          fontFamily: "'Cinzel',serif", fontSize: 12, color: tk.sectionLabel,
          letterSpacing: ".32em", textTransform: "uppercase", fontWeight: 700
        }}>Awards & Achievements</span>
        <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${tk.sectionLabelLine},transparent)` }} />
      </div>

      {/* slide */}
      <div style={{
        position: "relative", borderRadius: 20, overflow: "hidden",
        height: isMobile ? 260 : 420,
        border: `1.5px solid ${tk.awardSlideBorder(award.color)}`,
        boxShadow: tk.awardSlideGlow(award.color),
        transition: "border-color .5s,box-shadow .5s",
        cursor: "pointer",
      }}
        onClick={() => { setPopup(cur); setPaused(true); }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <img key={cur} src={award.img} alt={award.title}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center",
            animation: `${dir === "next" ? "acSlideIn" : "acSlideInRev"} .5s cubic-bezier(.22,.68,0,1.2) both`
          }} />

        {/* gradient overlay */}
        <div style={{ position: "absolute", inset: 0, background: tk.awardOverlay, pointerEvents: "none" }} />

        {/* moon: floating particles on slide */}
        {isDark && Array.from({ length: 6 }, (_, i) => (
          <div key={i} style={{
            position: "absolute",
            left: `${15 + i * 14}%`, top: `${10 + i * 8}%`,
            width: (i % 2) + 1, height: (i % 2) + 1, borderRadius: "50%",
            background: award.color, boxShadow: `0 0 6px ${award.color}`,
            animation: `acFloat ${3 + i * .5}s ease-in-out ${i * .3}s infinite`,
            pointerEvents: "none", opacity: .5,
          }} />
        ))}

        {/* corner decorations */}
        {[["top", "left"], ["top", "right"], ["bottom", "right"]].map(([v, h], ki) => (
          <div key={ki} style={{
            position: "absolute", zIndex: 2, pointerEvents: "none",
            top: v === "top" ? 16 : "auto", bottom: v === "bottom" ? 16 : "auto",
            left: h === "left" ? 16 : "auto", right: h === "right" ? 16 : "auto",
            width: 20, height: 20,
            borderTop: v === "top" ? `1.5px solid ${award.color}77` : "none",
            borderBottom: v === "bottom" ? `1.5px solid ${award.color}77` : "none",
            borderLeft: h === "left" ? `1.5px solid ${award.color}77` : "none",
            borderRight: h === "right" ? `1.5px solid ${award.color}77` : "none",
          }} />
        ))}

        {/* expand hint */}
        <div style={{
          position: "absolute", top: 16, right: 16,
          width: 34, height: 34, borderRadius: 10,
          background: "rgba(0,0,0,.45)", backdropFilter: "blur(8px)",
          border: `1px solid ${award.color}44`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, color: award.color, pointerEvents: "none"
        }}>⊕</div>

        {/* text block */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: isMobile ? "20px 20px 22px" : "32px 36px 36px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
            <span style={{
              padding: "3px 10px", borderRadius: 999,
              background: tk.awardTagBg(award.color), border: `1px solid ${tk.awardTagBorder(award.color)}`,
              backdropFilter: "blur(8px)",
              fontSize: 11, color: award.color, fontFamily: "'Space Mono',monospace",
              letterSpacing: ".14em", fontWeight: 700,
            }}>{award.org}</span>
            <span style={{ fontSize: 11, color: tk.awardYearColor, fontFamily: "'Space Mono',monospace" }}>
              {award.year}</span>
          </div>
          <h3 style={{
            margin: 0, fontFamily: "'Cinzel',serif",
            fontSize: isMobile ? "clamp(17px,4.5vw,24px)" : "clamp(22px,2.2vw,30px)",
            fontWeight: 700, color: "#ffffff",
            letterSpacing: ".04em", lineHeight: 1.3,
            textShadow: `0 2px 16px rgba(0,0,0,.85), 0 0 24px ${award.color}44`,
          }}>{award.title}</h3>
        </div>

        {/* progress bar */}
        {!paused && (
          <div style={{
            position: "absolute", bottom: 0, left: 0, height: 3,
            background: award.color,
            animation: "acProgress 3.8s linear forwards",
            boxShadow: `0 0 10px ${award.color}`, zIndex: 2
          }} />
        )}

        {/* nav arrows */}
        {["←", "→"].map((arr, ai) => (
          <button key={arr}
            onClick={e => { e.stopPropagation(); go(cur + (ai === 0 ? -1 : 1), ai === 0 ? "prev" : "next"); setPaused(true); }}
            style={{
              position: "absolute", top: "50%", transform: "translateY(-50%)",
              [ai === 0 ? "left" : "right"]: 16,
              width: 40, height: 40, borderRadius: 12,
              background: "rgba(0,0,0,.50)", backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,.16)",
              color: "rgba(255,255,255,.88)", fontSize: 14, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all .2s", zIndex: 3,
            }}>{arr}</button>
        ))}
      </div>

      {/* dots */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 20 }}>
        {awards.map((a, i) => (
          <button key={i} onClick={() => { setPrev(cur); setDir("next"); setCur(i); setPaused(true); }}
            style={{
              width: i === cur ? 32 : 8, height: 8, borderRadius: 999, padding: 0, border: "none", cursor: "pointer",
              background: i === cur ? a.color : "rgba(128,128,128,0.30)",
              boxShadow: i === cur ? `0 0 10px ${a.color}99` : "none",
              transition: "all .38s cubic-bezier(.22,.68,0,1.2)",
            }} />
        ))}
      </div>

      {/* popup */}
      {popup !== null && (
        <div onClick={() => setPopup(null)} style={{
          position: "fixed", inset: 0, zIndex: 9998,
          background: tk.popupBg, backdropFilter: "blur(20px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 20, animation: "acFadeIn .25s ease both"
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            position: "relative", maxWidth: 880, width: "100%",
            borderRadius: 18, overflow: "hidden",
            border: `1.5px solid ${tk.popupBorder(awards[popup].color)}`,
            boxShadow: `0 0 80px ${awards[popup].color}22,0 30px 80px rgba(0,0,0,.55)`,
            background: tk.popupBodyBg,
            animation: "acPopIn .3s cubic-bezier(.22,.68,0,1.2) both",
          }}>
            <img src={awards[popup].img} alt={awards[popup].title}
              style={{ width: "100%", display: "block", maxHeight: "80vh", objectFit: "contain" }} />
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, padding: "18px 24px",
              background: "linear-gradient(0deg,rgba(0,0,0,.90) 0%,transparent 100%)"
            }}>
              <h3 style={{
                margin: 0, fontFamily: "'Cinzel',serif", fontSize: 18,
                color: "#fff", fontWeight: 700, textShadow: "0 2px 12px rgba(0,0,0,.9)"
              }}>{awards[popup].title}</h3>
              <p style={{
                margin: "4px 0 0", fontSize: 13, color: awards[popup].color,
                fontFamily: "'Space Mono',monospace"
              }}>{awards[popup].org} · {awards[popup].year}</p>
            </div>
            <button onClick={() => setPopup(null)} style={{
              position: "absolute", top: 12, right: 12, width: 30, height: 30, borderRadius: "50%",
              background: "rgba(0,0,0,.7)", border: "1px solid rgba(255,255,255,.2)",
              color: "#fff", fontSize: 14, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>✕</button>
            {["←", "→"].map((arr, ai) => (
              <button key={arr}
                onClick={() => setPopup((popup + (ai === 0 ? -1 : 1) + awards.length) % awards.length)}
                style={{
                  position: "absolute", top: "50%", transform: "translateY(-50%)",
                  [ai === 0 ? "left" : "right"]: 12, width: 38, height: 38, borderRadius: 10,
                  background: "rgba(0,0,0,.65)", border: "1px solid rgba(255,255,255,.15)",
                  color: "#fff", fontSize: 14, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>{arr}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   CERTIFICATE SECTION
══════════════════════════════════════════════════════════════════ */
function CertSection({ isMobile, tk }: { isMobile: boolean; tk: ThemeTk }) {
  const [tab, setTab] = useState<Tab>("frontend");
  const [cert, setCert] = useState<Cert | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const TABS = [
    { key: "frontend" as Tab, label: "Front-End", icon: "◈", color: "#7dd3fc" },
    { key: "backend" as Tab, label: "Back-End", icon: "⬡", color: "#a78bfa" },
    { key: "other" as Tab, label: "Others", icon: "✦", color: "#fbbf24" },
  ];

  const openModal = (c: Cert) => { setCert(c); setTimeout(() => setIsOpen(true), 10); };
  const closeModal = () => { setIsOpen(false); setTimeout(() => setCert(null), 350); };

  return (
    <div style={{ width: "100%", maxWidth: 960, margin: "0 auto" }}>

      {/* section label */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
        <span style={{ fontSize: 20 }}>📜</span>
        <span style={{
          fontFamily: "'Cinzel',serif", fontSize: 12, color: tk.sectionLabel,
          letterSpacing: ".32em", textTransform: "uppercase", fontWeight: 700
        }}>Certificates</span>
        <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${tk.sectionLabelLine},transparent)` }} />
      </div>

      {/* tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
        {TABS.map(t => {
          const active = tab === t.key;
          return (
            <button key={t.key} onClick={() => setTab(t.key)} style={{
              display: "flex", alignItems: "center", gap: 7,
              padding: isMobile ? "7px 14px" : "8px 22px", borderRadius: 40, cursor: "pointer",
              outline: "none",
              background: active ? tk.tabActiveBg(t.color) : tk.tabInactiveBg,
              border: `1.5px solid ${active ? tk.tabActiveBorder(t.color) : tk.tabInactiveBorder}`,
              color: active ? t.color : tk.tabInactiveText,
              fontFamily: "'Cinzel',serif", fontSize: isMobile ? 11 : 13,
              letterSpacing: ".08em", backdropFilter: "blur(10px)",
              boxShadow: active ? tk.tabActiveGlow(t.color) : "none",
              transition: "all .3s cubic-bezier(.22,.68,0,1.2)",
            }}>
              <span style={{ fontSize: 11 }}>{t.icon}</span>{t.label}
            </button>
          );
        })}
        <div style={{
          marginLeft: "auto", display: "flex", alignItems: "center", gap: 6,
          fontSize: 11, color: tk.pageEyebrow, fontFamily: "'Space Mono',monospace",
          letterSpacing: ".12em", opacity: .6
        }}>
          {certs[tab].length} records
        </div>
      </div>

      {/* grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)",
        gap: isMobile ? 14 : 16,
      }}>
        {certs[tab].map((c, i) => (
          <CertCard key={`${tab}-${i}`} cert={c} idx={i}
            onOpen={openModal} isMobile={isMobile} tk={tk} />
        ))}
      </div>

      <CertModal cert={cert} isOpen={isOpen} onClose={closeModal} isMobile={isMobile} tk={tk} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════════ */
export default function AwardAndCertificatePage() {
  const { isDark } = useTheme();
  const tk: ThemeTk = isDark ? MOON : SUN;

  const [isMobile, setIsMobile] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check(); window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: .04 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Space+Mono:wght@400;700&family=Inter:wght@400;500;600&display=swap');
        @keyframes acReveal    { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes acSlideIn   { from{opacity:0;transform:scale(1.03) translateX(12px)} to{opacity:1;transform:scale(1) translateX(0)} }
        @keyframes acSlideInRev{ from{opacity:0;transform:scale(1.03) translateX(-12px)} to{opacity:1;transform:scale(1) translateX(0)} }
        @keyframes acShimmer   { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes acFloat     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes acBookOpen  { 0%{opacity:0;transform:perspective(1100px) rotateY(-45deg) scale(.88)} 65%{transform:perspective(1100px) rotateY(5deg) scale(1.01)} 100%{opacity:1;transform:perspective(1100px) rotateY(0) scale(1)} }
        @keyframes acFadeIn    { from{opacity:0} to{opacity:1} }
        @keyframes acPopIn     { from{opacity:0;transform:scale(.9)} to{opacity:1;transform:scale(1)} }
        @keyframes acProgress  { from{width:0} to{width:100%} }
        @keyframes acOrb       { 0%,100%{transform:translate(0,0)} 50%{transform:translate(14px,-12px)} }
        @keyframes acScan      { 0%{top:-2%} 100%{top:102%} }
        * { box-sizing:border-box; }
      `}</style>

      <section id="award-certificates" style={{
        minHeight: "100vh",
        background: tk.pageBg,
        position: "relative", overflow: "hidden",
        fontFamily: "'Space Mono',monospace",
        padding: "88px 0 100px",
        transition: "background .5s ease",
      }}>

        {/* grid */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `linear-gradient(${tk.gridLine} 1px,transparent 1px),linear-gradient(90deg,${tk.gridLine} 1px,transparent 1px)`,
          backgroundSize: "60px 60px"
        }} />

        {/* orbs */}
        {([
          { w: 460, h: 460, t: "-10%", r: "-6%", bg: tk.orbA, d: "13s", dl: "0s" },
          { w: 340, h: 340, b: "-7%", l: "-5%", bg: tk.orbB, d: "17s", dl: "2s" },
          { w: 200, h: 200, t: "38%", r: "16%", bg: tk.orbC, d: "11s", dl: "5s" },
        ] as any[]).map((o, i) => (
          <div key={i} style={{
            position: "absolute", width: o.w, height: o.h,
            top: o.t, right: o.r, bottom: o.b, left: o.l,
            borderRadius: "50%", filter: "blur(72px)", background: o.bg,
            animation: `acOrb ${o.d} ease-in-out ${o.dl} infinite`,
            pointerEvents: "none", transition: "background .5s",
          }} />
        ))}

        {/* scan */}
        <div style={{
          position: "absolute", left: 0, right: 0, height: 1.5,
          background: `linear-gradient(90deg,transparent,${tk.scanLine},transparent)`,
          animation: "acScan 12s linear infinite", pointerEvents: "none", zIndex: 2
        }} />

        {/* particles */}
        {isDark && Array.from({ length: 20 }, (_, i) => (
          <div key={i} style={{
            position: "absolute",
            left: `${(i * 47.3 + 9) % 100}%`, top: `${(i * 33.1 + 5) % 100}%`,
            width: (i % 3) + 1, height: (i % 3) + 1, borderRadius: "50%",
            background: tk.particles[i % 5],
            boxShadow: `0 0 ${(i % 3 + 1) * 4}px ${tk.particles[i % 5]}`,
            animation: `acFloat ${4 + i % 5}s ease-in-out ${(i * .3) % 4}s infinite`,
            pointerEvents: "none", opacity: .65,
          }} />
        ))}

        {/* content */}
        <div ref={ref} style={{
          position: "relative", zIndex: 3,
          maxWidth: 1040, margin: "0 auto",
          padding: isMobile ? "0 16px" : "0 clamp(20px,5%,56px)",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(28px)",
          transition: "opacity .65s ease,transform .7s cubic-bezier(.22,.68,0,1.2)",
          display: "flex", flexDirection: "column", gap: isMobile ? 52 : 76,
        }}>

          {/* page header */}
          <div style={{ textAlign: "center", animation: "acReveal .7s ease both" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 12 }}>
              <div style={{ height: 1, width: 52, background: `linear-gradient(90deg,transparent,${tk.pageEyebrowLine})` }} />
              <span style={{
                fontSize: 11, color: tk.pageEyebrow, letterSpacing: ".36em",
                fontFamily: "'Space Mono',monospace", transition: "color .5s"
              }}>✦ 1DEV CODEX ✦</span>
              <div style={{ height: 1, width: 52, background: `linear-gradient(90deg,${tk.pageEyebrowLine},transparent)` }} />
            </div>
            <h1 style={{
              fontFamily: isDark ? "'Cinzel', serif" : "'Lora', serif",
              fontSize: isMobile ? "clamp(24px,6.5vw,34px)" : "clamp(28px,3.2vw,44px)",
              fontWeight: 900, letterSpacing: ".08em",
              color: isDark ? "#e9d5ff" : "#1a3d28",
              textShadow: isDark
                ? "0 0 32px rgba(167,139,250,0.55), 0 2px 8px rgba(0,0,0,0.5)"
                : "0 1px 0 rgba(255,255,255,0.9), 0 2px 12px rgba(45,106,79,0.15)",
              lineHeight: 1.1, marginBottom: 8,
              transition: "color .5s, text-shadow .5s",
            }}>AWARD & CERTIFICATE</h1>
            <div style={{
              marginTop: 10, height: 1, maxWidth: 200, margin: "10px auto 0",
              background: `linear-gradient(90deg,transparent,${tk.pageEyebrowLine},transparent)`
            }} />
          </div>

          <AwardSlideshow isMobile={isMobile} tk={tk} isDark={isDark} />

          {/* divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,transparent,${tk.dividerLine})` }} />
            <span style={{ color: tk.dividerText, fontSize: 11, letterSpacing: ".2em", fontFamily: "serif" }}>ᚠ ᚢ ᚦ</span>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${tk.dividerLine},transparent)` }} />
          </div>

          <CertSection isMobile={isMobile} tk={tk} />
        </div>

        {/* bottom fade */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 80,
          background: tk.bottomFade, pointerEvents: "none", transition: "background .5s"
        }} />
      </section>
    </>
  );
}