"use client"

import React, { useState, useEffect, useRef } from "react";

type Lang = "en" | "th";
type TText = string | { en: string; th: string };
const gl = (t: TText, l: Lang): string =>
  typeof t === "string" ? t : (t[l] ?? t.en ?? "");

interface ProjectItem {
  title: TText; year: TText; head: TText[]; desc: TText[];
  img: string; link: string; youtube: string; github: string; color?: string;
}

const projects: ProjectItem[] = [
  { title: { en: "Portfolio Web V2", th: "เว็บไซต์พอร์ตโฟลิโอ เวอร์ชัน 2" }, year: { en: "Mar 2026", th: "มีนาคม 2569" }, head: [], desc: [], img: "https://res.cloudinary.com/dag73dhpl/image/upload/v1772344095/Screenshot_2026-03-01_124257_u6m2sr.png", link: "", youtube: "", github: "", color: "#a78bfa" },
  { title: { en: "ABC_Shop - AI-Powered eCommerce Platform (Full Version)", th: "ABC_Shop - แพลตฟอร์มอีคอมเมิร์ซพลัง AI (เวอร์ชันสมบูรณ์)" }, year: { en: "Jan 2026 – Mar 2026", th: "มกราคม 2569 – มีนาคม 2569" }, head: [{ en: "Core Dev", th: "การพัฒนาหลัก" }, { en: "AI Integration", th: "การบูรณาการ AI" }, { en: "Database", th: "ฐานข้อมูล" }, { en: "Deployment", th: "การปรับใช้" }, { en: "CI/CD & Ops", th: "CI/CD และการดำเนินงาน" }], desc: [{ en: "Developing a production-ready eCommerce app for cat apparel using Flutter (Dart) and FastAPI (Python).", th: "พัฒนาแอปพลิเคชัน eCommerce สำหรับเสื้อผ้าแมวด้วย Flutter (Dart) และ FastAPI (Python)" }, { en: "Implemented AI-based cat image analysis via OpenAI API with Google AI (Gemini 2.5 Flash) pre-detection.", th: "ประยุกต์ใช้ AI วิเคราะห์รูปภาพแมวผ่าน OpenAI API และใช้ Google AI (Gemini 2.5 Flash)" }, { en: "Designed PostgreSQL database running in rootless containers (Podman).", th: "ออกแบบฐานข้อมูล PostgreSQL บน Rootless Container (Podman)" }, { en: "Deployed backend on Render and frontend on Vercel, with Cloudinary CDN.", th: "Backend บน Render, Frontend บน Vercel พร้อม Cloudinary CDN" }, { en: "Integrated Jenkins for CI/CD pipeline automation and distributed Android APK.", th: "เชื่อมต่อ Jenkins CI/CD อัตโนมัติ + Android APK" }], img: "https://res.cloudinary.com/dag73dhpl/image/upload/v1772542604/mobileapp_fb5k5g.png", link: "", youtube: "", github: "https://github.com/1Dev04/shop_app", color: "#67e8f9" },
  { title: { en: "Full-Stack Developer Intern | ClickNext Co., Ltd. (SMSMKT Team)", th: "นักศึกษาฝึกงาน Full-Stack Developer | บริษัท คลิกเน็กซ์ จำกัด (ทีม SMSMKT)" }, year: { en: "May 2025 – Oct 2025", th: "พฤษภาคม 2568 – ตุลาคม 2568" }, head: [{ en: "BackOffice Development", th: "การพัฒนาส่วนงาน BackOffice" }, { en: "SMS Monitor Platform", th: "การพัฒนาแพลตฟอร์ม SMS Monitor" }, { en: "Deployment & Operations", th: "การติดตั้งและบริหารจัดการระบบ" }, { en: "System Analysis (SA) Workflow", th: "กระบวนการวิเคราะห์และออกแบบระบบ (SA)" }], desc: [{ en: "Enhanced core BackOffice modules using PHP (REST API), Docker, and MySQL.", th: "พัฒนาโมดูลหลักของ BackOffice ด้วย PHP (REST API), Docker และ MySQL" }, { en: "Developed SMSMKT Monitor with Microsoft Authentication using Vue/Nuxt, NestJS, and MongoDB.", th: "พัฒนาแพลตฟอร์ม SMSMKT Monitor ด้วย Vue/Nuxt, NestJS และ MongoDB" }, { en: "Engineered Unit Tests for Template Message APIs.", th: "Unit Test สำหรับ Template Message API" }, { en: "Implemented Docker-based containerization and automated CI/CD pipelines with Jenkins.", th: "Docker Container + Jenkins CI/CD Pipeline" }, { en: "Followed SA workflow for requirement analysis and structured system design.", th: "SA Workflow: วิเคราะห์ความต้องการ + เอกสาร + ออกแบบระบบ" }], img: "https://res.cloudinary.com/dag73dhpl/image/upload/v1772549606/%E0%B8%AA%E0%B8%B3%E0%B9%80%E0%B8%99%E0%B8%B2%E0%B8%82%E0%B8%AD%E0%B8%87_Season_lpgf0l.png", link: "https://smsmkt.com/", youtube: "", github: "", color: "#86efac" },
  { title: { en: "ABC_Shop - Foundation & Prototype (Mock Data Phase)", th: "ABC_Shop - การวางรากฐานและการสร้างต้นแบบ (ขั้นตอนการจำลองข้อมูล)" }, year: { en: "2025", th: "2568" }, head: [{ en: "Cross-Platform Development", th: "การพัฒนาแอปพลิเคชันข้ามแพลตฟอร์ม" }, { en: "User Authentication System", th: "ระบบยืนยันตัวตนผู้ใช้งาน" }, { en: "UI/UX & Theme Customization", th: "การออกแบบ UI/UX และการปรับแต่งธีม" }], desc: [{ en: "Developed a cat apparel eCommerce application using Flutter and Dart.", th: "พัฒนาแอปพลิเคชัน eCommerce สำหรับเสื้อผ้าแมวด้วย Flutter และ Dart" }, { en: "Implemented Sign Up, Login, and Profile Management functions.", th: "สมัครสมาชิก, เข้าสู่ระบบ, จัดการโปรไฟล์" }, { en: "Designed auto-sliding advertisement banner and product display prototypes.", th: "Banner โฆษณาอัตโนมัติ + ต้นแบบการแสดงสินค้า" }, { en: "Developed a Feedback and Notification system.", th: "ระบบ Feedback และแจ้งเตือน" }, { en: "Integrated Light Mode and Dark Mode toggle.", th: "Light Mode / Dark Mode" }], img: "https://res.cloudinary.com/dag73dhpl/image/upload/v1772542604/mobileapp_fb5k5g.png", link: "", youtube: "https://www.youtube.com/watch?v=zE7b4hVGziY", github: "", color: "#fcd34d" },
  { title: { en: "Fraud Monitoring Platform | 1st Runner Up @ National ITMX Hackathon", th: "แพลตฟอร์มตรวจสอบการฉ้อโกง | รองชนะเลิศอันดับ 1 ITMX Hackathon" }, year: { en: "2024", th: "2567" }, head: [{ en: "Fraud Monitoring Solution", th: "โซลูชันตรวจสอบการฉ้อโกง" }, { en: "Key Achievement", th: "ความสำเร็จที่สำคัญ" }], desc: [{ en: "Developed a real-time fraud monitoring platform using Next.js and Go.", th: "Real-time fraud monitoring ด้วย Next.js และ Go สำหรับข้อมูลธนาคาร" }, { en: "Awarded 1st Runner-Up and 'The Best of Track: Data Solution for Banks'.", th: "รองชนะเลิศ + 'Best of Track: Data Solution for Banks'" }], img: "https://res.cloudinary.com/dag73dhpl/image/upload/v1772687152/%E0%B8%AA%E0%B8%B3%E0%B9%80%E0%B8%99%E0%B8%B2%E0%B8%82%E0%B8%AD%E0%B8%87_Season_i41t06.png", link: "https://www.canva.com/design/DAGUmDup7d8/VVNuGCgxYmRFay2Tzs-QEA/view", youtube: "https://youtube.com/clip/UgkxZJYlGrbciXjurkuopfWPmnDje1bfidfP?si=2HXwNJT23d6-VoZ8", github: "", color: "#fda4af" },
  { title: { en: "MotionNext", th: "โมชั่นเน็กซ์" }, year: { en: "2023", th: "2566" }, head: [{ en: "Game Top-up System (Beta)", th: "ระบบเติมเงินเกม (เวอร์ชันเบต้า)" }], desc: [{ en: "Developed a game top-up website using Next.js and TypeScript with MySQL schema.", th: "เว็บเติมเงินเกม Next.js + TypeScript พร้อม MySQL schema" }], img: "https://res.cloudinary.com/dag73dhpl/image/upload/v1772525124/Screenshot_2026-03-03_150110_hdbjdq.png", link: "https://monext.netlify.app/", youtube: "", github: "https://github.com/1Dev04/motion-next", color: "#fb923c" },
  { title: { en: "Portfolio Web V1", th: "เว็บไซต์พอร์ตโฟลิโอ เวอร์ชัน 1" }, year: { en: "2022 - 2025", th: "2565 - 2568" }, head: [{ en: "Frontend Development", th: "การพัฒนาส่วนหน้า" }, { en: "Real-time Data Integration", th: "การบูรณาการข้อมูลแบบเรียลไทม์" }, { en: "Engagement Features", th: "คุณสมบัติการมีส่วนร่วม" }, { en: "Deployment & Hosting", th: "การติดตั้งและการโฮสติ้ง" }], desc: [{ en: "Develop responsive websites with React compatible with all devices.", th: "React Responsive Website ทุกอุปกรณ์" }, { en: "Connect to Firebase to store and display real-time data.", th: "Firebase Real-time โดยไม่ต้องรีเฟรช" }, { en: "Design and develop a 'Hearts' (Like button) and Visitor Counter system.", th: "Hearts (Like) + Visitor Counter" }, { en: "Deployment through CI/CD on Netlify.", th: "CI/CD บน Netlify" }], img: "https://res.cloudinary.com/dag73dhpl/image/upload/v1772552203/%E0%B8%AA%E0%B8%B3%E0%B9%80%E0%B8%99%E0%B8%B2%E0%B8%82%E0%B8%AD%E0%B8%87_Season_2_lvw00v.png", link: "https://1devp.netlify.app/#home", youtube: "", github: "", color: "#a78bfa" },
  { title: { en: "Cake Cafe", th: "เค้กคาเฟ่" }, year: { en: "2022", th: "2565" }, head: [{ en: "Console Application Development", th: "การพัฒนาแอปพลิเคชันคอนโซล" }, { en: "Menu & Ordering Logic", th: "เมนูและตรรกะการสั่งอาหาร" }, { en: "Special Discount Feature", th: "ส่วนลดพิเศษ" }, { en: "Error Handling & Validation", th: "การจัดการข้อผิดพลาดและการตรวจสอบ" }], desc: [{ en: "Develop a cake and beverage shop management system using CLI.", th: "ระบบจัดการร้านเค้กผ่าน CLI บน Replit" }, { en: "Order-taking system with bill summary.", th: "ระบบสั่งอาหารพร้อมคำนวณสรุปบิล" }, { en: "Secret code '99' for 50% discount.", th: "รหัสลับ '99' ลด 50% (Half Price)" }, { en: "Input validation system.", th: "ตรวจสอบ Input ทันทีเมื่อกรอกผิด" }], img: "https://res.cloudinary.com/dag73dhpl/image/upload/v1772523546/cakeCafe_mywa7z.png", link: "", youtube: "https://www.youtube.com/watch?v=c3gxKG7UsSM", github: "https://github.com/1Dev04/C_CakeCafe", color: "#67e8f9" },
  { title: { en: "Cheese Cake Cafe", th: "ชีสเค้กคาเฟ่" }, year: { en: "2022", th: "2565" }, head: [{ en: "Desktop Application Development", th: "การพัฒนาแอปพลิเคชันบนเดสก์ท็อป" }, { en: "Database & Security", th: "ฐานข้อมูลและความปลอดภัย" }, { en: "Tiered Membership System", th: "ระบบสมาชิกแบบแบ่งระดับ" }, { en: "Ordering & Receipt Generation", th: "การสั่งซื้อและการออกใบเสร็จรับเงิน" }, { en: "Payment Integration", th: "การผสานรวมการชำระเงิน" }], desc: [{ en: "Java + Apache NetBeans GUI cafe management program.", th: "Java + Apache NetBeans GUI จัดการร้านคาเฟ่" }, { en: "PostgreSQL database with copy/paste blocked on registration.", th: "PostgreSQL + บล็อก Copy/Paste หน้าสมัคร" }, { en: "VIP access with auto-discount on login.", th: "VIP รับส่วนลดอาหารและภาษีอัตโนมัติ" }, { en: "Receipt generation via screen capture.", th: "ใบเสร็จรับเงินผ่าน Screen Capture" }, { en: "Cash and QR code payment support.", th: "รองรับเงินสดและ QR Code" }], img: "https://res.cloudinary.com/dag73dhpl/image/upload/v1772522869/cheeseCake_dx5v0u.png", link: "", youtube: "https://www.youtube.com/watch?v=bQ7pbJf0NUs&t=77s", github: "", color: "#86efac" },
  { title: { en: "Roblox Game", th: "เกม Roblox" }, year: { en: "2017 - Present", th: "2560 - ปัจจุบัน" }, head: [{ en: "Lua Scripting & Game Logic", th: "การเขียนสคริปต์ Lua และตรรกะของเกม" }, { en: "Immersive World Building (D MIRAGE)", th: "การสร้างโลกเสมือนจริง (D MIRAGE)" }, { en: "Vibe & Showcase Creation", th: "การสร้างบรรยากาศและการนำเสนอ" }, { en: "Simulator Game Mechanics", th: "กลไกเกมจำลอง" }], desc: [{ en: "Lua in Roblox Studio for complex game mechanics.", th: "Lua บน Roblox Studio สำหรับ Game Mechanics ที่ซับซ้อน" }, { en: "'D MIRAGE: Dream Illusion World' — surreal exploration game.", th: "D MIRAGE: Dream Illusion World — Surreal Exploration" }, { en: "Vibe/Showcase games with beautiful lighting and sound effects.", th: "Vibe/Showcase เน้น Lighting และเสียงประกอบ" }, { en: "Core Loop Simulator: collection and upgrade systems.", th: "Core Loop Simulator: ระบบเก็บสะสมและอัปเกรด" }], img: "https://res.cloudinary.com/dag73dhpl/image/upload/v1772521505/Screenshot_2026-03-03_140110_wmq3zv.png", link: "https://www.roblox.com/th/games/71645504910205/D-MIRAGE-Dream-Illusion-World", youtube: "", github: "", color: "#fda4af" },
];

const RUNES = ["ᚠ","ᚢ","ᚦ","ᚨ","ᚱ","ᚲ","ᚷ","ᚹ","ᚺ","ᚾ"];
const CARD_W = 316;
const DRAG_THRESHOLD = 8; // px — below this = tap, above = drag

/* ── Icons ─────────────────────────────────────────────────────── */
const IcoLink  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="14" height="14"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>;
const IcoGH    = () => <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>;
const IcoYT    = () => <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
const IcoX     = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="17" height="17"><path d="M18 6L6 18M6 6l12 12"/></svg>;
const IcoLeft  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18"><path d="M15 18l-6-6 6-6"/></svg>;
const IcoRight = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18"><path d="M9 18l6-6-6-6"/></svg>;

function ActionBtn({ href, color, label, icon }: { href: string; color: string; label: string; icon: React.ReactNode }) {
  const [h, sh] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
       onMouseEnter={() => sh(true)} onMouseLeave={() => sh(false)}
       onClick={e => e.stopPropagation()}
       style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 14px", borderRadius: 999, border: `1px solid ${h ? color+"99" : color+"33"}`, background: h ? `${color}1c` : "transparent", color: h ? color : color+"66", textDecoration: "none", fontSize: 10, fontWeight: 700, fontFamily: "'Space Mono',monospace", letterSpacing: ".06em", boxShadow: h ? `0 0 12px ${color}33` : "none", transform: h ? "translateY(-1px)" : "none", transition: "all .25s cubic-bezier(.22,.68,0,1.2)", whiteSpace: "nowrap" }}>
      {icon}{label}
    </a>
  );
}

/* ══════════════════════════════════════════════════════════════
   FLIP CARD
   — own pointerDown/Up to detect tap vs drag
   — buttons use e.stopPropagation() so they don't open modal
══════════════════════════════════════════════════════════════ */
function FlipCard({ item, lang, index, onOpen, isDragging }:
  { item: ProjectItem; lang: Lang; index: number; onOpen: (i: ProjectItem) => void; isDragging: React.MutableRefObject<boolean> }) {
  const [flipped, setFlipped] = useState(false);
  const c = item.color || "#a78bfa";
  const downX = useRef(0);

  return (
    <div
      style={{ width: 296, height: 420, flexShrink: 0, perspective: "1100px", cursor: "pointer" }}
      onPointerDown={e => { downX.current = e.clientX; }}
      onClick={e => {
        // Only open modal on a genuine tap (not after a drag)
        if (isDragging.current) return;
        if (Math.abs(e.clientX - downX.current) > DRAG_THRESHOLD) return;
        onOpen(item);
      }}
    >
      <div style={{ position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)", transition: "transform .7s cubic-bezier(.22,.68,0,1.2)" }}>

        {/* FRONT */}
        <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", borderRadius: 20, overflow: "hidden", background: "linear-gradient(165deg,rgba(255,255,255,.055),rgba(255,255,255,.015))", border: `1px solid ${c}28`, backdropFilter: "blur(16px)", boxShadow: `0 8px 40px rgba(0,0,0,.55),inset 0 1px 0 rgba(255,255,255,.07)`, display: "flex", flexDirection: "column" }}>
          <div style={{ position: "absolute", top: 0, left: "8%", right: "8%", height: 1.5, background: `linear-gradient(90deg,transparent,${c}bb,transparent)`, borderRadius: 2 }}/>
          <div style={{ height: 185, overflow: "hidden", flexShrink: 0, background: "#080818", position: "relative" }}>
            <img src={item.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.6)", pointerEvents: "none", userSelect: "none" }}/>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(5,5,14,.97) 0%,rgba(5,5,14,.1) 55%,transparent 100%)" }}/>
            <div style={{ position: "absolute", top: 10, left: 10, width: 28, height: 28, borderRadius: 8, background: "rgba(0,0,0,.6)", border: `1px solid ${c}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: `${c}88`, fontFamily: "serif" }}>{RUNES[index % 10]}</div>
            <div style={{ position: "absolute", top: 10, right: 10, background: `${c}18`, border: `1px solid ${c}44`, borderRadius: 999, padding: "3px 9px", fontSize: 9, color: c, fontFamily: "'Space Mono',monospace", backdropFilter: "blur(8px)" }}>{gl(item.year, lang)}</div>
          </div>
          <div style={{ padding: "14px 16px 16px", flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
            <h2 style={{ margin: 0, fontSize: 12.5, fontWeight: 700, color: "#e2e8f0", fontFamily: "'Space Mono',monospace", lineHeight: 1.45, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{gl(item.title, lang)}</h2>
            <div style={{ height: 1, background: `linear-gradient(90deg,${c}55,transparent)` }}/>
            <p style={{ margin: 0, fontSize: 10, color: "rgba(255,255,255,.32)", fontFamily: "'Space Mono',monospace", lineHeight: 1.65, flex: 1 }}>
              {item.head.length > 0 ? item.head.slice(0, 3).map(h => gl(h, lang)).join(" · ") + (item.head.length > 3 ? "…" : "") : "Click to explore →"}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button
                onClick={e => { e.stopPropagation(); onOpen(item); }}
                style={{ flex: 1, padding: "6px 0", borderRadius: 999, border: `1px solid ${c}55`, background: `linear-gradient(135deg,${c}22,${c}0a)`, color: c, fontSize: 9, fontFamily: "'Space Mono',monospace", fontWeight: 700, cursor: "pointer", letterSpacing: ".08em", boxShadow: `0 0 14px ${c}22` }}
              >⊕ DETAIL</button>
              <button
                onClick={e => { e.stopPropagation(); setFlipped(f => !f); }}
                style={{ flex: 1, padding: "6px 0", borderRadius: 999, border: `1px solid ${c}44`, background: `${c}14`, color: c, fontSize: 9, fontFamily: "'Space Mono',monospace", fontWeight: 700, cursor: "pointer", letterSpacing: ".08em" }}
              >↺ FLIP</button>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", borderRadius: 20, transform: "rotateY(180deg)", overflow: "hidden", background: `linear-gradient(145deg,rgba(10,10,28,.98),rgba(5,5,18,.99))`, border: `1px solid ${c}55`, backdropFilter: "blur(20px)", boxShadow: `0 0 50px ${c}22,inset 0 1px 0 rgba(255,255,255,.08)`, display: "flex", flexDirection: "column", padding: "18px 16px 16px", gap: 9 }}>
          <div style={{ position: "absolute", top: 0, left: "8%", right: "8%", height: 2, background: `linear-gradient(90deg,transparent,${c},transparent)`, opacity: .8, borderRadius: 2 }}/>
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 65% 45% at 50% 0%,${c}0d 0%,transparent 70%)`, pointerEvents: "none" }}/>
          <div style={{ fontSize: 26, color: `${c}18`, fontFamily: "serif", textAlign: "right", position: "absolute", top: 12, right: 14, lineHeight: 1 }}>{RUNES[index % 10]}</div>
          <div style={{ paddingRight: 24 }}>
            <h3 style={{ margin: 0, fontSize: 12, fontWeight: 700, color: c, fontFamily: "'Space Mono',monospace", lineHeight: 1.4, textShadow: `0 0 14px ${c}88`, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{gl(item.title, lang)}</h3>
            <span style={{ fontSize: 8.5, color: `${c}77`, letterSpacing: ".1em", fontFamily: "'Space Mono',monospace" }}>{gl(item.year, lang)}</span>
          </div>
          <div style={{ height: 1, background: `linear-gradient(90deg,${c}66,transparent)` }}/>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 5, flex: 1, overflow: "hidden" }}>
            {item.head.slice(0, 4).map((h, i) => (
              <li key={i} style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <span style={{ fontSize: 9.5, fontWeight: 700, color: c, fontFamily: "'Space Mono',monospace", display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ fontSize: 6, opacity: .55 }}>◆</span>{gl(h, lang)}
                </span>
                {item.desc[i] && <span style={{ fontSize: 9.5, color: "rgba(255,255,255,.36)", fontFamily: "'Space Mono',monospace", lineHeight: 1.55, paddingLeft: 11, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{gl(item.desc[i], lang)}</span>}
              </li>
            ))}
          </ul>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 2 }}>
            <button onClick={e => { e.stopPropagation(); setFlipped(false); }}
              style={{ padding: "5px 0", borderRadius: 999, border: `1px solid ${c}33`, background: "transparent", color: `${c}77`, fontSize: 9, fontFamily: "'Space Mono',monospace", fontWeight: 700, cursor: "pointer", letterSpacing: ".08em", flex: 1 }}>↩ BACK</button>
            <button onClick={e => { e.stopPropagation(); onOpen(item); }}
              style={{ flex: 2, padding: "5px 0", borderRadius: 999, border: `1px solid ${c}55`, background: `linear-gradient(135deg,${c}22,${c}0a)`, color: c, fontSize: 9, fontFamily: "'Space Mono',monospace", fontWeight: 700, cursor: "pointer", letterSpacing: ".08em", boxShadow: `0 0 14px ${c}22` }}>⊕ DETAIL</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Modal ─────────────────────────────────────────────────────── */
function Modal({ item, lang, onClose }: { item: ProjectItem; lang: Lang; onClose: () => void }) {
  const c = item.color || "#a78bfa";
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", fn); document.body.style.overflow = ""; };
  }, []);
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(2,2,12,.9)", backdropFilter: "blur(20px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px", animation: "mBg .28s ease both" }}>
      <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 700, maxHeight: "88vh", borderRadius: 24, background: "linear-gradient(160deg,rgba(11,11,27,.99),rgba(5,5,16,.99))", border: `1px solid ${c}55`, boxShadow: `0 0 80px ${c}33,0 40px 100px rgba(0,0,0,.85),inset 0 1px 0 rgba(255,255,255,.08)`, overflow: "hidden", display: "flex", flexDirection: "column", animation: "mIn .42s cubic-bezier(.22,.68,0,1.2) both", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: "5%", right: "5%", height: 2, background: `linear-gradient(90deg,transparent,${c},transparent)`, borderRadius: 2 }}/>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 280, background: `radial-gradient(ellipse 70% 55% at 50% 0%,${c}11 0%,transparent 70%)`, pointerEvents: "none" }}/>
        <div style={{ height: 215, overflow: "hidden", flexShrink: 0, background: "#060612", position: "relative" }}>
          <img src={item.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.45)" }}/>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(5,5,16,1) 0%,rgba(5,5,16,.2) 55%,transparent 100%)" }}/>
          <button onClick={onClose} style={{ position: "absolute", top: 14, right: 14, width: 34, height: 34, borderRadius: 10, background: "rgba(0,0,0,.65)", border: `1px solid ${c}33`, color: "rgba(255,255,255,.65)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><IcoX/></button>
          <div style={{ position: "absolute", bottom: 14, left: 20, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: `${c}22`, border: `1px solid ${c}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: `${c}99`, fontFamily: "serif" }}>{RUNES[projects.indexOf(item) % 10]}</div>
            <div style={{ background: `${c}1a`, border: `1px solid ${c}44`, borderRadius: 999, padding: "4px 12px", fontSize: 10, color: c, fontFamily: "'Space Mono',monospace", backdropFilter: "blur(8px)" }}>{gl(item.year, lang)}</div>
          </div>
        </div>
        <div style={{ padding: "22px 26px 28px", overflow: "auto", display: "flex", flexDirection: "column", gap: 14 }}>
          <h2 style={{ margin: 0, fontFamily: "'Cinzel',serif", fontWeight: 700, fontSize: "clamp(15px,2.5vw,20px)", background: `linear-gradient(135deg,#f1f5f9,${c} 60%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1.3, letterSpacing: ".03em" }}>{gl(item.title, lang)}</h2>
          <div style={{ height: 1, background: `linear-gradient(90deg,${c}77,${c}22,transparent)` }}/>
          {item.head.length > 0 ? (
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {item.head.map((h, i) => (
                <li key={i} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: c, fontFamily: "'Space Mono',monospace", letterSpacing: ".07em", display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 7, opacity: .65 }}>◆</span>{gl(h, lang)}
                  </span>
                  {item.desc[i] && <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,.48)", fontFamily: "'Space Mono',monospace", lineHeight: 1.8, paddingLeft: 14 }}>{gl(item.desc[i], lang)}</p>}
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ margin: 0, fontSize: 12.5, color: "rgba(255,255,255,.38)", fontFamily: "'Space Mono',monospace", lineHeight: 1.8 }}>This project is currently in progress or has limited public details available.</p>
          )}
          {(item.link || item.youtube || item.github) && (
            <>
              <div style={{ height: 1, background: `linear-gradient(90deg,${c}33,transparent)` }}/>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {item.link    && <ActionBtn href={item.link}    color={c}       label="Live Link" icon={<IcoLink/>}/>}
                {item.youtube && <ActionBtn href={item.youtube} color="#ff4444" label="Watch"     icon={<IcoYT/>}/>}
                {item.github  && <ActionBtn href={item.github}  color="#e2e8f0" label="GitHub"    icon={<IcoGH/>}/>}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ArrowBtn({ dir, onClick }: { dir: "left"|"right"; onClick: () => void }) {
  const [h, sh] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => sh(true)} onMouseLeave={() => sh(false)}
      style={{ position: "absolute", [dir==="left"?"left":"right"]: 14, top: "50%", transform: h ? "translateY(-50%) scale(1.1)" : "translateY(-50%)", zIndex: 5, width: 44, height: 44, borderRadius: 13, background: h ? "rgba(167,139,250,.2)" : "rgba(8,8,24,.88)", border: `1px solid ${h?"rgba(167,139,250,.55)":"rgba(167,139,250,.28)"}`, color: h ? "#c4b5fd" : "rgba(167,139,250,.75)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(14px)", boxShadow: h ? "0 0 28px rgba(124,58,237,.4)" : "0 0 16px rgba(124,58,237,.18)", transition: "all .22s cubic-bezier(.22,.68,0,1.2)" }}>
      {dir === "left" ? <IcoLeft/> : <IcoRight/>}
    </button>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE
   Drag logic lives here — shared isDragging ref is passed to
   FlipCard so cards know whether to honour the click.
══════════════════════════════════════════════════════════════ */
const ProjectPage: React.FC = () => {
  const [lang, setLang]     = useState<Lang>("en");
  const [switching, setSw]  = useState(false);
  const [modal, setModal]   = useState<ProjectItem | null>(null);
  const [titleVis, setTV]   = useState(false);
  const [activeIdx, setIdx] = useState(0);
  const [canL, setCanL]     = useState(false);
  const [canR, setCanR]     = useState(true);
  const [grabbing, setGrab] = useState(false);

  const scrollRef  = useRef<HTMLDivElement>(null);
  const titleRef   = useRef<HTMLDivElement>(null);

  /* ── shared drag state (refs = no re-render lag) ── */
  const isDragging  = useRef(false); // true while finger/mouse is moving > threshold
  const dragStartX  = useRef(0);
  const dragStartSL = useRef(0);
  const hasDragged  = useRef(false); // latches true once threshold crossed; reset on pointerUp

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTV(true); }, { threshold: .1 });
    if (titleRef.current) obs.observe(titleRef.current);
    return () => obs.disconnect();
  }, []);

  const updateArrows = () => {
    const el = scrollRef.current; if (!el) return;
    setCanL(el.scrollLeft > 10);
    setCanR(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
    setIdx(Math.round(el.scrollLeft / CARD_W));
  };

  const smoothScrollTo = (target: number) => {
    scrollRef.current?.scrollTo({ left: target, behavior: "smooth" });
  };

  const scrollTo = (i: number) => {
    smoothScrollTo(Math.max(0, Math.min(projects.length - 1, i)) * CARD_W);
  };

  /* ── pointer handlers on scroll track ── */
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button,a")) return;
    const el = scrollRef.current; if (!el) return;
    isDragging.current  = false;
    hasDragged.current  = false;
    dragStartX.current  = e.clientX;
    dragStartSL.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
    setGrab(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current; if (!el || !el.hasPointerCapture(e.pointerId)) return;
    const dx = dragStartX.current - e.clientX;
    if (!hasDragged.current && Math.abs(dx) > DRAG_THRESHOLD) {
      hasDragged.current = true;
      isDragging.current = true;
    }
    if (hasDragged.current) {
      el.scrollLeft = dragStartSL.current + dx;
      updateArrows();
    }
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (el) {
      try { el.releasePointerCapture(e.pointerId); } catch {}
      if (hasDragged.current) {
        // snap to nearest card after drag
        const nearest = Math.round(el.scrollLeft / CARD_W);
        smoothScrollTo(nearest * CARD_W);
      }
    }
    setGrab(false);
    // keep isDragging.current = true briefly so FlipCard.onClick can see it
    setTimeout(() => { isDragging.current = false; hasDragged.current = false; }, 50);
  };

  const switchLang = (l: Lang) => {
    if (l === lang) return;
    setSw(true);
    setTimeout(() => { setLang(l); setSw(false); }, 240);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;900&family=Space+Mono:wght@400;700&family=Sarabun:wght@400;600&display=swap');
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes scan    { 0%{top:-5%} 100%{top:105%} }
        @keyframes orbF    { 0%,100%{transform:translate(0,0)} 50%{transform:translate(14px,-14px)} }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes mBg     { from{opacity:0} to{opacity:1} }
        @keyframes mIn     { from{opacity:0;transform:translateY(28px) scale(.95)} to{opacity:1;transform:none} }
        .ps-hide::-webkit-scrollbar{display:none}
        .ps-hide{scrollbar-width:none;-ms-overflow-style:none}
        *{box-sizing:border-box;margin:0;padding:0}
      `}</style>

      <section id="project" style={{ minHeight: "100vh", background: "linear-gradient(180deg,#05050e 0%,#070714 100%)", padding: "100px 0 80px", position: "relative", overflow: "hidden", fontFamily: "'Space Mono',monospace " , fontSize: "clamp(44px,7vw,80px)"}}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(rgba(167,139,250,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(167,139,250,.025) 1px,transparent 1px)`, backgroundSize: "64px 64px" }}/>
        <div style={{ position: "absolute", width: 600, height: 600, top: "-20%", right: "-10%", borderRadius: "50%", filter: "blur(90px)", background: "rgba(124,58,237,.12)", animation: "orbF 16s ease-in-out infinite", pointerEvents: "none" }}/>
        <div style={{ position: "absolute", width: 500, height: 500, bottom: "-5%", left: "-12%", borderRadius: "50%", filter: "blur(80px)", background: "rgba(6,182,212,.09)", animation: "orbF 20s ease-in-out 5s infinite", pointerEvents: "none" }}/>
        <div style={{ position: "absolute", left: 0, right: 0, height: 2, background: "linear-gradient(90deg,transparent,rgba(167,139,250,.18),transparent)", animation: "scan 11s linear infinite", pointerEvents: "none", zIndex: 2 }}/>
        {Array.from({ length: 14 }, (_, i) => (
          <div key={i} style={{ position: "absolute", left: `${(i*71.3)%100}%`, top: `${(i*43.7)%100}%`, width: (i%2)+1, height: (i%2)+1, borderRadius: "50%", background: ["#a78bfa","#67e8f9","#86efac","#fda4af","#fcd34d"][i%5], boxShadow: `0 0 ${(i%2+1)*4}px ${["#a78bfa","#67e8f9","#86efac","#fda4af","#fcd34d"][i%5]}`, animation: `orbF ${5+i%6}s ease-in-out ${(i*.3)%5}s infinite`, pointerEvents: "none" }}/>
        ))}

        {/* Title */}
        <div ref={titleRef} style={{ textAlign: "center", marginBottom: 44, padding: "0 8%", position: "relative", zIndex: 3, opacity: titleVis ? 1 : 0, transform: titleVis ? "none" : "translateY(24px)", transition: "opacity .7s ease,transform .7s cubic-bezier(.22,.68,0,1.2)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 10 }}>
            <div style={{ height: 1, width: 36, background: "linear-gradient(90deg,transparent,#a78bfa88)" }}/>
            <span style={{ fontSize: 10, color: "#a78bfa", letterSpacing: ".32em", textTransform: "uppercase" }}>✦ &nbsp;Arcane Works&nbsp; ✦</span>
            <div style={{ height: 1, width: 36, background: "linear-gradient(90deg,#a78bfa88,transparent)" }}/>
          </div>
          <h1 style={{ fontFamily: "'Cinzel',serif", fontWeight: 900, fontSize: "clamp(32px,5vw,56px)", background: "linear-gradient(135deg,#f1f5f9 0%,#a78bfa 35%,#67e8f9 70%,#f1f5f9 100%)", backgroundSize: "200% 100%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "shimmer 5s linear infinite", letterSpacing: ".06em", lineHeight: 1 }}>{lang === "en" ? "Projects" : "ผลงาน"}</h1>
          <div style={{ margin: "12px auto 0", maxWidth: 280, height: 1, background: "linear-gradient(90deg,transparent,#a78bfa77,#67e8f933,transparent)" }}/>
          <p style={{ marginTop: 10, fontSize: 10, color: "rgba(255,255,255,.2)", letterSpacing: ".18em" }}>{projects.length}&nbsp; Crafted Spells &nbsp;·&nbsp; Drag &nbsp;·&nbsp; Flip &nbsp;·&nbsp; Click to expand</p>
        </div>

        {/* Carousel */}
        <div style={{ position: "relative", zIndex: 3 }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 72, background: "linear-gradient(90deg,#05050e,transparent)", pointerEvents: "none", zIndex: 4 }}/>
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 72, background: "linear-gradient(270deg,#05050e,transparent)", pointerEvents: "none", zIndex: 4 }}/>
          {canL && <ArrowBtn dir="left"  onClick={() => scrollTo(activeIdx - 1)}/>}
          {canR && <ArrowBtn dir="right" onClick={() => scrollTo(activeIdx + 1)}/>}

          <div
            ref={scrollRef}
            className="ps-hide"
            onScroll={updateArrows}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
            style={{ display: "flex", gap: 20, overflowX: "auto", padding: "20px 8% 28px", cursor: grabbing ? "grabbing" : "grab", userSelect: "none", opacity: switching ? 0 : 1, transition: "opacity .24s" }}
          >
            {projects.map((item, i) => (
              <div key={i} style={{ animation: `fadeUp .55s ease ${i*.04}s both`, flexShrink: 0 }}>
                <FlipCard item={item} lang={lang} index={i} onOpen={setModal} isDragging={isDragging}/>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 5, marginTop: 4 }}>
            {projects.map((p, i) => (
              <div key={i} onClick={() => scrollTo(i)} style={{ width: i===activeIdx ? 22 : 6, height: 6, borderRadius: 3, background: i===activeIdx ? (p.color||"#a78bfa") : "rgba(167,139,250,.2)", cursor: "pointer", boxShadow: i===activeIdx ? `0 0 10px ${p.color||"#a78bfa"}77` : "none", transition: "all .35s cubic-bezier(.22,.68,0,1.2)" }}/>
            ))}
          </div>
        </div>

        {/* Lang toggle */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 32, position: "relative", zIndex: 3 }}>
          <div style={{ display: "inline-flex", alignItems: "center", background: "rgba(255,255,255,.04)", border: "1px solid rgba(167,139,250,.2)", borderRadius: 999, padding: 4, backdropFilter: "blur(14px)" }}>
            {(["th","en"] as Lang[]).map(l => (
              <button key={l} onClick={() => switchLang(l)} style={{ padding: "7px 26px", borderRadius: 999, border: lang===l ? "1px solid rgba(167,139,250,.45)" : "1px solid transparent", background: lang===l ? "linear-gradient(135deg,rgba(167,139,250,.28),rgba(103,232,249,.14))" : "transparent", color: lang===l ? "#a78bfa" : "rgba(255,255,255,.28)", fontFamily: "'Space Mono',monospace", fontSize: 11, fontWeight: 700, letterSpacing: ".12em", cursor: "pointer", boxShadow: lang===l ? "0 0 16px rgba(167,139,250,.22),inset 0 1px 0 rgba(255,255,255,.1)" : "none", transition: "all .3s cubic-bezier(.22,.68,0,1.2)" }}>{l.toUpperCase()}</button>
            ))}
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(transparent,#05050e)", pointerEvents: "none" }}/>
      </section>

      {modal && <Modal item={modal} lang={lang} onClose={() => setModal(null)}/>}
    </>
  );
};

export default ProjectPage;