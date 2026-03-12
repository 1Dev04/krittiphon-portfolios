import { useEffect, useRef, useState } from "react";

type ProjectKey = "clicknext" | "abcshop";

/* ════════════════════════════════════════════
   DATA — CLICKNEXT
════════════════════════════════════════════ */
const CLICKNEXT = {
  key: "clicknext" as ProjectKey,
  name: "Clicknext Co., Ltd.",
  role: "Full Stack Developer Intern",
  period: "พฤษภาคม – ตุลาคม 2025",
  accentColor: "#a78bfa",
  accentGlow: "#7c3aed",
  icon: "⚡",
  tag: "INTERNSHIP",
  stats: [
    { value: "126", label: "วันทำงาน",     sub: "ตลอด 6 เดือนสหกิจ" },
    { value: "26",  label: "ส่วนที่พัฒนา", sub: "BackOffice, Portal & SMS Monitor" },
    { value: "20",  label: "วัน WFH",      sub: "ทำงานระยะไกลอย่างมีประสิทธิภาพ" },
  ],
  tech: [
    { label: "NestJS",          cat: "Backend",  color: "#e11d48" },
    { label: "Node.js",         cat: "Backend",  color: "#16a34a" },
    { label: "PHP",             cat: "Backend",  color: "#7c3aed" },
    { label: "Vue.js",          cat: "Frontend", color: "#22c55e" },
    { label: "NuxtJS",          cat: "Frontend", color: "#10b981" },
    { label: "TypeScript",      cat: "Frontend", color: "#3b82f6" },
    { label: "Bootstrap",       cat: "Frontend", color: "#8b5cf6" },
    { label: "MySQL",           cat: "Database", color: "#f59e0b" },
    { label: "MongoDB",         cat: "Database", color: "#84cc16" },
    { label: "REST API",        cat: "API",      color: "#06b6d4" },
    { label: "Microsoft OAuth", cat: "Auth",     color: "#0078d4" },
    { label: "2FA",             cat: "Auth",     color: "#f43f5e" },
    { label: "Git",             cat: "Tools",    color: "#f97316" },
    { label: "reCaptcha",       cat: "Tools",    color: "#6366f1" },
  ],
  months: [
    {
      month: "พฤษภาคม", year: "2025", num: "01",
      color: "#a78bfa", glow: "#7c3aed", icon: "🚀",
      tasks: [
        "1–11 พ.ค. — Orientation & ศึกษา Codebase บริษัท",
        "12 พ.ค. — เริ่มพัฒนา Domain Whitelist Feature แรก",
        "12–30 พ.ค. — พัฒนา Domain Whitelist ครบทุกฟีเจอร์ (List, Add, Edit, Delete)",
        "20 พ.ค. — สร้าง ER Diagram & Data Dictionary ระบบ",
        "28 พ.ค. — ออกแบบ Sequence Diagram Domain Whitelist",
        "30 พ.ค. — ทบทวน REST API & PHP Codebase เพิ่มเติม",
      ],
    },
    {
      month: "มิถุนายน", year: "2025", num: "02",
      color: "#67e8f9", glow: "#0891b2", icon: "🔐",
      tasks: [
        "2–6 มิ.ย. — Deploy Domain Whitelist สู่ Staging, แก้ไข Add/Update logic",
        "9–10 มิ.ย. — พัฒนา Sender Log — List & Filter",
        "11–14 มิ.ย. — ปรับปรุง Sender Log ให้ครบ spec",
        "18–20 มิ.ย. — พัฒนา Authentication with Microsoft (OAuth2)",
        "23 มิ.ย. — ต่อ Microsoft Auth Flow ฝั่ง Backend",
        "24–30 มิ.ย. — เริ่ม Company Setting General Page",
      ],
    },
    {
      month: "กรกฎาคม", year: "2025", num: "03",
      color: "#86efac", glow: "#16a34a", icon: "🏢",
      tasks: [
        "1–7 ก.ค. — ปรับปรุง Company Setting (General, Contact Owner)",
        "8–11 ก.ค. — แก้ไข Domain Whitelist ตาม feedback + อัปเดต Sequence Diagram",
        "14–18 ก.ค. — พัฒนา Company Address CRUD",
        "21–25 ก.ค. — พัฒนา Data Masking สำหรับข้อมูลสำคัญ",
        "28–31 ก.ค. — Review & QA Company Setting ทั้งหมด",
      ],
    },
    {
      month: "สิงหาคม", year: "2025", num: "04",
      color: "#fda4af", glow: "#e11d48", icon: "🛡️",
      tasks: [
        "1–8 ส.ค. — พัฒนา 2FA Phone Verification & Trust Device",
        "11–15 ส.ค. — สร้าง Portal Setting Pages ใหม่ทั้งหมด",
        "18–22 ส.ค. — ปรับ Roles Setting & Permissions",
        "22–25 ส.ค. — พัฒนา Logs Setting (Filter, Export)",
        "26–27 ส.ค. — เริ่ม Tracking URL Feature",
        "28–29 ส.ค. — Unit Testing Template Message",
      ],
    },
    {
      month: "กันยายน", year: "2025", num: "05",
      color: "#fcd34d", glow: "#d97706", icon: "📊",
      tasks: [
        "1–5 ก.ย. — ศึกษา NestJS & NuxtJS (เปลี่ยน Stack ใหม่)",
        "8–12 ก.ย. — พัฒนา SMS Monitor Dashboard",
        "15–19 ก.ย. — Top 20 API Request Chart & Table",
        "22–25 ก.ย. — Portal Setting Whitelist/Blacklist CRUD",
        "26–29 ก.ย. — Postpaid Monthly Report + Flow Diagram",
        "30 ก.ย. — Review & Demo ก่อนเดือนสุดท้าย",
      ],
    },
    {
      month: "ตุลาคม", year: "2025", num: "06",
      color: "#fb923c", glow: "#ea580c", icon: "🎯",
      tasks: [
        "1–3 ต.ค. — User Management (List, Create, Edit, Delete)",
        "6–10 ต.ค. — Log Authentication History",
        "13–15 ต.ค. — Login with Microsoft integration (Portal)",
        "16–17 ต.ค. — reCaptcha Integration หน้า Login",
        "20–24 ต.ค. — จัดทำ Flow Diagram ครบถ้วนทุก Feature",
        "🎉 31 ต.ค. — วันสุดท้ายสหกิจ — ส่งมอบงานครบถ้วน",
      ],
    },
  ],
};

/* ════════════════════════════════════════════
   DATA — ABC SHOP  (รายละเอียดเต็ม)
════════════════════════════════════════════ */
const ABCSHOP = {
  key: "abcshop" as ProjectKey,
  name: "ABCat Shop",
  role: "Senior Project — Flutter + AI",
  period: "มกราคม – มีนาคม 2569",
  accentColor: "#34d399",
  accentGlow: "#059669",
  icon: "🐱",
  tag: "SENIOR PROJECT",
  stats: [
    { value: "70+", label: "วันพัฒนา",  sub: "ม.ค. – มี.ค. 2569" },
    { value: "12",  label: "หน้าแอป",   sub: "Home, Shop, Basket, Meow Size ฯลฯ" },
    { value: "3",   label: "AI Models", sub: "YOLO · Gemini 2.5 Flash · GPT-4.1 mini" },
  ],
  tech: [
    { label: "Flutter",          cat: "Frontend", color: "#38bdf8" },
    { label: "Dart",             cat: "Frontend", color: "#06b6d4" },
    { label: "Python",           cat: "AI/ML",    color: "#facc15" },
    { label: "YOLO",          cat: "AI/ML",    color: "#f97316" },
    { label: "Gemini 2.5 Flash", cat: "AI/ML",    color: "#a78bfa" },
    { label: "GPT-4.1 mini",     cat: "AI/ML",    color: "#10b981" },
    { label: "OpenAI API",       cat: "API",      color: "#22c55e" },
    { label: "NestJS",           cat: "Backend",  color: "#e11d48" },
    { label: "MySQL",            cat: "Database", color: "#f59e0b" },
    { label: "Jenkins",          cat: "DevOps",   color: "#ef4444" },
    { label: "Google AI Studio", cat: "API",      color: "#34d399" },
    { label: "REST API",         cat: "API",      color: "#06b6d4" },
    { label: "Git",              cat: "Tools",    color: "#f97316" },
  ],
  months: [
    {
      month: "มกราคม", year: "2026", num: "01",
      color: "#34d399", glow: "#059669", icon: "🤖",
      tasks: [
        "13–15 ม.ค. — Train AI Model by Python + YOLO (Round 1–3)",
        "16–23 ม.ค. — ออกแบบ & ลงมือทำ Structure Frontend + Backend (8 วัน)",
        "24–25 ม.ค. — อัพเดต ER Diagram & Planning Structure",
        "26 ม.ค. — Mock data หน้า Home page",
        "27 ม.ค. — Mock data Shop, สร้าง Folder Document ใน Flutter, แยก Section หน้าบ้าน",
        "28 ม.ค. — Generate AI by Gemini ทำ Poster Notification, Mock data Coupon",
        "29 ม.ค. — Mock data Notification, Coupon, History, Order, ออกแบบ Search Page",
        "30–31 ม.ค. — Train AI Model YOLO (Round 4–5)",
      ],
    },
    {
      month: "กุมภาพันธ์ (ต้นเดือน)", year: "2026", num: "02",
      color: "#38bdf8", glow: "#0284c7", icon: "🔗",
      tasks: [
        "1–7 ก.พ. — เชื่อม Backend ทุกหน้า (Home, Favourite, Basket, Search, Notification, Meow Size, Menu) + Custom Snackbar + วาง Structure DB v1–v4",
        "8 ก.พ. — สร้าง path transfer → Backend → callback Frontend, แก้ bug กด Mobile เด้ง Start page",
        "9 ก.พ. — แก้ VARCHAR → TEXT ป้องกัน icon แปลก",
        "10 ก.พ. — ปรับ 'Learn More' เป็น Icon บน Notification Page",
        "11 ก.พ. — แก้ไข X ปุ่ม Search Page → กลับ Homepage",
        "12 ก.พ. — Update Frontend V4.2",
      ],
    },
    {
      month: "กุมภาพันธ์ (ปลายเดือน)", year: "2026", num: "03",
      color: "#818cf8", glow: "#4f46e5", icon: "🧪",
      tasks: [
        "13 ก.พ. — Flow Diagram, Use Case, อัพเดต Backend Home + Search Learn More",
        "14 ก.พ. — อัพเดต Backend Shop, Notification",
        "15 ก.พ. — Meow Size Page, ค้นหา Feature ใหม่ (OpenAI, Jenkins)",
        "16 ก.พ. — นัดคุยอาจารย์, ปรับปรุง Favourite + Basket",
        "17 ก.พ. — Setup Jenkins Sleep Time Automation",
        "18–22 ก.พ. — ปรับปรุง Meow Size, Favourite, Basket + dot marker + Sequence Diagram Login/Register",
        "23 ก.พ. — แก้ Alert Text, Responsive Notification/Search, เจอ Gemini API",
        "24–28 ก.พ. — แก้ Meow Size, เพิ่ม History Page, Deploy Backend, เชื่อม Google AI Studio V1–V5",
      ],
    },
    {
      month: "มีนาคม (ต้นเดือน)", year: "2026", num: "04",
      color: "#fcd34d", glow: "#d97706", icon: "✨",
      tasks: [
        "1 มี.ค. — เชื่อม Google AI Studio V6",
        "2 มี.ค. — แก้ Service API Cat (Frontend), ✅ Success Call Gemini 2.5 Flash",
        "3 มี.ค. — แก้ History Edit, Meow Size Recommendation Scan Page",
        "4–5 มี.ค. — แก้ History Cat Edit, Meow Size Recommendation Card",
        "6 มี.ค. — แก้ History Cat Edit, Meow Size Recommendation Card V2",
        "7 มี.ค. — แก้ History Cat Edit, Meow Size Recommendation Card V3",
      ],
    },
    {
      month: "มีนาคม (ปลายเดือน)", year: "2026", num: "05",
      color: "#fb923c", glow: "#ea580c", icon: "🏁",
      tasks: [
        "8 มี.ค. — Edit Meow Size (Recommend, Edit Cat, Backend Cat CRUD API)",
        "9 มี.ค. — เปลี่ยนมาใช้ OpenAI GPT-4.1 mini สำหรับ Detect & Analysis Cat",
        "10 มี.ค. — Edit Meow Size (Recommend, Edit Cat, History Analysis Cat)",
        "🎉 11 มี.ค. — SUCCESS PROJECT ABCat Shop",
      ],
    },
  ],
};

const PROJECTS = { clicknext: CLICKNEXT, abcshop: ABCSHOP } as const;

/* ════════════════════════════════════════════
   INTERSECTION HOOK
════════════════════════════════════════════ */
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

/* ════════════════════════════════════════════
   TIMELINE CARD
════════════════════════════════════════════ */
function TimelineCard({
  item, isMobile, visible,
}: {
  item: typeof CLICKNEXT.months[0]; isMobile: boolean; visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const isSuccess = item.tasks.some(t => t.includes("SUCCESS") || t.includes("🎉"));

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative", borderRadius: 20,
        padding: isMobile ? "18px 16px 16px" : "22px 24px 20px",
        background: hovered
          ? "linear-gradient(135deg,rgba(255,255,255,.09),rgba(255,255,255,.04))"
          : isSuccess
          ? `linear-gradient(135deg,${item.color}10,rgba(255,255,255,.04))`
          : "rgba(255,255,255,.04)",
        border: `1px solid ${hovered || isSuccess ? item.color + "66" : item.color + "28"}`,
        backdropFilter: "blur(16px)",
        boxShadow: hovered
          ? `0 0 40px ${item.glow}33,0 16px 48px rgba(0,0,0,.6),inset 0 1px 0 rgba(255,255,255,.08)`
          : isSuccess
          ? `0 0 28px ${item.glow}44,0 8px 32px rgba(0,0,0,.5)`
          : `0 4px 24px rgba(0,0,0,.4),inset 0 1px 0 rgba(255,255,255,.04)`,
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        transition: "all .38s cubic-bezier(.22,.68,0,1.2)",
        overflow: "hidden",
      }}
    >
      {/* shimmer top */}
      <div style={{
        position: "absolute", top: 0, left: "10%", right: "10%", height: 1.5,
        background: `linear-gradient(90deg,transparent,${item.color}${hovered || isSuccess ? "cc" : "77"},transparent)`,
        transition: "opacity .3s",
      }} />

      {/* corner marks */}
      {(["tl","tr","bl","br"] as const).map(k => (
        <div key={k} style={{
          position: "absolute",
          top: k[0]==="t" ? 10 : "auto", bottom: k[0]==="b" ? 10 : "auto",
          left: k[1]==="l" ? 10 : "auto", right: k[1]==="r" ? 10 : "auto",
          width: 12, height: 12,
          borderTop: k[0]==="t" ? `1px solid ${item.color}55` : "none",
          borderBottom: k[0]==="b" ? `1px solid ${item.color}55` : "none",
          borderLeft: k[1]==="l" ? `1px solid ${item.color}55` : "none",
          borderRight: k[1]==="r" ? `1px solid ${item.color}55` : "none",
          pointerEvents: "none",
        }} />
      ))}

      {/* header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <span style={{ fontSize: isMobile ? 18 : 20 }}>{item.icon}</span>
        <div>
          <div style={{
            fontFamily: "'Cinzel',serif",
            fontSize: isMobile ? 14 : 16, fontWeight: 700,
            color: item.color,
            textShadow: hovered ? `0 0 20px ${item.color}cc` : `0 0 10px ${item.color}55`,
            letterSpacing: ".06em", transition: "text-shadow .3s",
          }}>{item.month}</div>
          <div style={{ fontSize: 9, fontFamily: "'Space Mono',monospace", color: "rgba(255,255,255,.3)", letterSpacing: ".2em" }}>{item.year}</div>
        </div>
        <div style={{
          marginLeft: "auto", width: 30, height: 30, borderRadius: "50%",
          background: `${item.color}18`, border: `1px solid ${item.color}44`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Space Mono',monospace", fontSize: 10, color: item.color, fontWeight: 700,
        }}>{item.num}</div>
      </div>

      <div style={{ height: 1, marginBottom: 12, background: `linear-gradient(90deg,${item.color}55,transparent)` }} />

      {/* tasks */}
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
        {item.tasks.map((t, ti) => {
          const isHighlight = t.includes("✅") || t.includes("🎉") || t.includes("SUCCESS");
          return (
            <li key={ti} style={{
              display: "flex", alignItems: "flex-start", gap: 8,
              fontFamily: isHighlight ? "'Space Mono',monospace" : "Georgia,serif",
              fontSize: isMobile ? 10.5 : 11.5,
              color: isHighlight ? item.color : "rgba(255,255,255,.58)",
              lineHeight: 1.65,
              fontWeight: isHighlight ? 700 : 400,
              letterSpacing: isHighlight ? ".04em" : "0",
              animation: visible ? `taskIn .4s ${.08 + ti * .055}s ease both` : "none",
              background: isHighlight ? `${item.color}0d` : "transparent",
              padding: isHighlight ? "4px 8px" : "0",
              borderRadius: isHighlight ? 8 : 0,
              border: isHighlight ? `1px solid ${item.color}33` : "none",
              margin: isHighlight ? "2px 0" : "0",
            }}>
              <span style={{
                width: isHighlight ? 6 : 5,
                height: isHighlight ? 6 : 5,
                borderRadius: "50%", flexShrink: 0,
                background: item.color,
                boxShadow: `0 0 ${isHighlight ? 10 : 5}px ${item.color}`,
                marginTop: 6,
              }} />
              {t}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ════════════════════════════════════════════
   TIMELINE ITEM (layout)
════════════════════════════════════════════ */
function TimelineItem({
  item, index, isMobile, isLast,
}: {
  item: typeof CLICKNEXT.months[0]; index: number; isMobile: boolean; isLast: boolean;
}) {
  const { ref, visible } = useVisible(0.07);
  const isRight = index % 2 === 0;

  if (isMobile) {
    return (
      <div ref={ref} style={{
        display: "flex", gap: 12,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(24px)",
        transition: `opacity .6s ${index * .07}s ease, transform .6s ${index * .07}s cubic-bezier(.22,.68,0,1.2)`,
      }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: 26 }}>
          <div style={{
            width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
            background: `radial-gradient(circle,${item.color} 0%,${item.color}44 60%,transparent 100%)`,
            border: `2px solid ${item.color}`,
            boxShadow: `0 0 12px ${item.glow}88,0 0 24px ${item.glow}44`,
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 2,
            animation: visible ? `nodeIn .5s ${index * .07}s ease both` : "none",
          }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#fff", boxShadow: `0 0 5px ${item.color}` }} />
          </div>
          {!isLast && (
            <div style={{ flex: 1, width: 2, marginTop: 4, background: `linear-gradient(180deg,${item.color}88,transparent)` }} />
          )}
        </div>
        <div style={{ flex: 1, paddingBottom: isLast ? 0 : 18 }}>
          <TimelineCard item={item} isMobile={isMobile} visible={visible} />
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} style={{ display: "grid", gridTemplateColumns: "1fr 64px 1fr", alignItems: "flex-start", position: "relative" }}>
      <div style={{
        paddingRight: 28, paddingTop: 8,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : `translateX(${isRight ? -28 : 0}px)`,
        transition: `opacity .65s ${index * .1}s ease, transform .65s ${index * .1}s cubic-bezier(.22,.68,0,1.2)`,
      }}>
        {isRight && <TimelineCard item={item} isMobile={isMobile} visible={visible} />}
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", zIndex: 2, paddingTop: 8 }}>
        <div style={{
          width: 48, height: 48, borderRadius: "50%",
          background: `radial-gradient(circle,${item.color}ee 0%,${item.color}55 55%,transparent 100%)`,
          border: `2px solid ${item.color}`,
          boxShadow: `0 0 24px ${item.glow}99,0 0 48px ${item.glow}44`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, flexShrink: 0,
          animation: visible ? `nodeIn .5s ${index * .1}s ease both` : "none",
        }}>{item.icon}</div>
      </div>
      <div style={{
        paddingLeft: 28, paddingTop: 8,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : `translateX(${!isRight ? 28 : 0}px)`,
        transition: `opacity .65s ${index * .1}s ease, transform .65s ${index * .1}s cubic-bezier(.22,.68,0,1.2)`,
      }}>
        {!isRight && <TimelineCard item={item} isMobile={isMobile} visible={visible} />}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   PROJECT SWITCHER TAB
════════════════════════════════════════════ */
function ProjectTab({
  project, active, onClick, isMobile,
}: {
  project: typeof CLICKNEXT; active: boolean; onClick: () => void; isMobile: boolean;
}) {
  const [h, sh] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => sh(true)}
      onMouseLeave={() => sh(false)}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: isMobile ? "row" : "column",
        alignItems: isMobile ? "center" : "flex-start",
        gap: isMobile ? 12 : 0,
        padding: isMobile ? "14px 18px" : "18px 22px 16px",
        borderRadius: 18,
        border: `1px solid ${active ? project.accentColor + "66" : h ? project.accentColor + "33" : "rgba(255,255,255,.08)"}`,
        background: active
          ? `linear-gradient(135deg,${project.accentColor}18,${project.accentColor}08)`
          : h ? "rgba(255,255,255,.04)" : "rgba(255,255,255,.02)",
        boxShadow: active ? `0 0 32px ${project.accentGlow}33,inset 0 1px 0 rgba(255,255,255,.06)` : "none",
        cursor: "pointer",
        transition: "all .32s cubic-bezier(.22,.68,0,1.2)",
        textAlign: "left", flex: 1, minWidth: 0, overflow: "hidden",
      }}
    >
      {active && (
        <div style={{
          position: "absolute", top: 0, left: "15%", right: "15%", height: 1.5,
          background: `linear-gradient(90deg,transparent,${project.accentColor}cc,transparent)`,
        }} />
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: isMobile ? 0 : 8, flexShrink: 0 }}>
        <span style={{
          width: 36, height: 36, borderRadius: 10, flexShrink: 0,
          background: active ? `${project.accentColor}22` : "rgba(255,255,255,.05)",
          border: `1px solid ${active ? project.accentColor + "55" : "rgba(255,255,255,.1)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, transition: "all .3s",
        }}>{project.icon}</span>
        <span style={{
          fontFamily: "'Space Mono',monospace", fontSize: 8,
          letterSpacing: ".2em", textTransform: "uppercase",
          color: active ? project.accentColor : "rgba(255,255,255,.3)",
          padding: "2px 8px", borderRadius: 999,
          background: active ? `${project.accentColor}18` : "transparent",
          border: active ? `1px solid ${project.accentColor}44` : "1px solid transparent",
          fontWeight: 700, transition: "all .3s",
        }}>{project.tag}</span>
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{
          fontFamily: "'Cinzel',serif", fontSize: isMobile ? 12 : 13, fontWeight: 700,
          color: active ? "#f1f5f9" : "rgba(255,255,255,.45)",
          letterSpacing: ".05em", lineHeight: 1.3, transition: "color .3s", marginBottom: 3,
        }}>{project.name}</div>
        <div style={{
          fontFamily: "'Space Mono',monospace", fontSize: 9,
          color: active ? project.accentColor : "rgba(255,255,255,.2)",
          letterSpacing: ".1em", transition: "color .3s",
        }}>{project.period}</div>
      </div>
      {isMobile && active && (
        <div style={{
          marginLeft: "auto", width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
          background: project.accentColor, boxShadow: `0 0 10px ${project.accentColor}`,
          animation: "dotPulse 2s ease-in-out infinite",
        }} />
      )}
    </button>
  );
}

/* ════════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════════ */
export default function ExperiancePage() {
  const [isMobile, setIsMobile]           = useState(false);
  const [activeProject, setActiveProject] = useState<ProjectKey>("clicknext");
  const [switching, setSwitching]         = useState(false);
  const timelineKey = useRef(0);

  const { ref: headerRef, visible: headerVisible } = useVisible(0.1);
  const { ref: techRef,   visible: techVisible   } = useVisible(0.1);

  const project = PROJECTS[activeProject];

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const switchProject = (key: ProjectKey) => {
    if (key === activeProject) return;
    setSwitching(true);
    setTimeout(() => {
      setActiveProject(key);
      timelineKey.current += 1;
      setSwitching(false);
    }, 300);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap');
        @keyframes orbDrift   { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,-20px) scale(1.05)} }
        @keyframes scanLine   { 0%{top:-2%} 100%{top:102%} }
        @keyframes shimmer    { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes nodeIn     { 0%{transform:scale(0) rotate(-180deg);opacity:0} 70%{transform:scale(1.15) rotate(10deg)} 100%{transform:scale(1) rotate(0);opacity:1} }
        @keyframes taskIn     { from{opacity:0;transform:translateX(-12px)} to{opacity:1;transform:translateX(0)} }
        @keyframes techReveal { from{opacity:0;transform:scale(.8) translateY(10px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes lineGrow   { from{height:0;opacity:0} to{opacity:1} }
        @keyframes fadeUp     { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes dotPulse   { 0%,100%{transform:scale(1);opacity:.7} 50%{transform:scale(1.8);opacity:1} }
        * { box-sizing:border-box; margin:0; padding:0; }
      `}</style>

      <section id="experiances" style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at 20% 50%, #0f0528 0%, #060414 40%, #020210 100%)",
        position: "relative", overflowX: "hidden",
        padding: isMobile ? "80px 0 60px" : "100px 0 80px",
      }}>
        {/* BG grid */}
        <div style={{ position:"absolute", inset:0, pointerEvents:"none",
          backgroundImage:"linear-gradient(rgba(167,139,250,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(167,139,250,.025) 1px,transparent 1px)",
          backgroundSize:"80px 80px" }} />

        {/* Orbs */}
        {[
          { w:520, h:520, t:"-15%", l:"-10%", bg:"rgba(124,58,237,.18)", dur:"16s", del:"0s" },
          { w:400, h:400, t:"60%",  r:"-8%",  bg:"rgba(6,182,212,.12)",  dur:"20s", del:"5s" },
          { w:280, h:280, t:"30%",  l:"40%",  bg:"rgba(253,164,175,.09)", dur:"12s", del:"3s" },
        ].map((o, i) => (
          <div key={i} style={{ position:"absolute", width:o.w, height:o.h, top:o.t,
            left:(o as any).l, right:(o as any).r, borderRadius:"50%", filter:"blur(90px)",
            background:o.bg, animation:`orbDrift ${o.dur} ease-in-out ${o.del} infinite`, pointerEvents:"none" }} />
        ))}

        {/* Scanline */}
        <div style={{ position:"absolute", left:0, right:0, height:2,
          background:"linear-gradient(90deg,transparent,rgba(167,139,250,.2),transparent)",
          animation:"scanLine 10s linear infinite", pointerEvents:"none", zIndex:2 }} />

        {/* Particles */}
        {Array.from({length:18},(_,i) => (
          <div key={i} style={{
            position:"absolute",
            left:`${(i*47.3)%100}%`, top:`${(i*31.7)%100}%`,
            width:(i%3)+1, height:(i%3)+1, borderRadius:"50%",
            background:["#a78bfa","#67e8f9","#86efac","#fda4af","#fcd34d","#fb923c"][i%6],
            boxShadow:`0 0 ${(i%3+2)*3}px ${["#a78bfa","#67e8f9","#86efac","#fda4af","#fcd34d","#fb923c"][i%6]}`,
            animation:`orbDrift ${5+i%5}s ease-in-out ${(i*.3)%5}s infinite`, pointerEvents:"none",
          }} />
        ))}

        {/* CONTENT */}
        <div style={{ position:"relative", zIndex:3, maxWidth:1080, margin:"0 auto",
          padding: isMobile ? "0 16px" : "0 clamp(20px,5%,60px)" }}>

          {/* HEADER */}
          <div ref={headerRef} style={{
            textAlign:"center", marginBottom: isMobile ? 40 : 56,
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "none" : "translateY(-24px)",
            transition:"opacity .8s ease, transform .8s cubic-bezier(.22,.68,0,1.2)",
          }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:14, marginBottom:14 }}>
              <div style={{ height:1, width: isMobile?40:80, background:"linear-gradient(90deg,transparent,#a78bfa)" }} />
              <span style={{ fontSize:9, color:"#a78bfa", letterSpacing:".45em", fontFamily:"'Space Mono',monospace" }}>✦ JOURNEY ✦</span>
              <div style={{ height:1, width: isMobile?40:80, background:"linear-gradient(90deg,#a78bfa,transparent)" }} />
            </div>
            <h1 style={{
              fontFamily:"'Cinzel',serif",
              fontSize: isMobile ? "clamp(26px,8vw,38px)" : "clamp(32px,4.5vw,52px)",
              fontWeight:900, letterSpacing:".08em",
              background:"linear-gradient(135deg,#f1f5f9 0%,#a78bfa 25%,#67e8f9 55%,#86efac 75%,#f1f5f9 100%)",
              backgroundSize:"300% 100%",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
              animation:"shimmer 6s linear infinite",
              lineHeight:1.1, marginBottom:8,
            }}>EXPERIENCES</h1>
            <p style={{ fontFamily:"Georgia,serif", fontStyle:"italic", fontSize:12, color:"rgba(255,255,255,.3)", letterSpacing:".04em" }}>
              เลือกโปรเจคด้านล่างเพื่อดู Timeline
            </p>
          </div>

          {/* PROJECT SWITCHER */}
          <div style={{
            display:"grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 10 : 16,
            marginBottom: isMobile ? 40 : 52,
          }}>
            {([CLICKNEXT, ABCSHOP] as const).map(p => (
              <ProjectTab key={p.key} project={p} active={activeProject === p.key}
                onClick={() => switchProject(p.key)} isMobile={isMobile} />
            ))}
          </div>

          {/* TRANSITION WRAPPER */}
          <div style={{
            opacity: switching ? 0 : 1,
            transform: switching ? "translateY(14px)" : "none",
            transition:"opacity .3s ease, transform .3s ease",
          }}>

            {/* Project badge */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", marginBottom: isMobile?32:44, animation:"fadeUp .5s ease both" }}>
              <div style={{
                display:"inline-flex", alignItems:"center", gap:10,
                padding: isMobile ? "10px 18px" : "12px 26px", borderRadius:999,
                background:`${project.accentColor}10`,
                border:`1px solid ${project.accentColor}44`,
                backdropFilter:"blur(12px)",
                boxShadow:`0 0 28px ${project.accentGlow}22`,
              }}>
                <span style={{ fontSize:16 }}>{project.icon}</span>
                <div>
                  <div style={{ fontFamily:"'Cinzel',serif", fontSize: isMobile?11:13, color:"#e2d9f3", fontWeight:700, letterSpacing:".06em" }}>{project.name}</div>
                  <div style={{ fontFamily:"'Space Mono',monospace", fontSize:8, color:project.accentColor, letterSpacing:".18em" }}>{project.role}</div>
                </div>
                <div style={{
                  padding:"2px 10px", borderRadius:999,
                  background:`${project.accentColor}18`, border:`1px solid ${project.accentColor}44`,
                  fontSize:8, color:project.accentColor, fontFamily:"'Space Mono',monospace", letterSpacing:".12em",
                }}>{project.period}</div>
              </div>
            </div>

            {/* STATS */}
            <div style={{
              display:"grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)",
              gap: isMobile ? 10 : 18,
              marginBottom: isMobile ? 48 : 64,
            }}>
              {project.stats.map((s, i) => (
                <div key={`${activeProject}-stat-${i}`} style={{
                  textAlign:"center", padding: isMobile ? "20px 14px" : "26px 18px",
                  borderRadius:18,
                  background:"rgba(255,255,255,.04)",
                  border:`1px solid ${project.accentColor}28`,
                  backdropFilter:"blur(14px)",
                  boxShadow:"0 4px 24px rgba(0,0,0,.4)",
                  position:"relative", overflow:"hidden",
                  animation:`fadeUp .5s ${i * .1}s ease both`,
                }}>
                  <div style={{ position:"absolute", top:0, left:"20%", right:"20%", height:1.5,
                    background:`linear-gradient(90deg,transparent,${project.accentColor}88,transparent)` }} />
                  <div style={{
                    fontFamily:"'Cinzel',serif", fontSize: isMobile?36:44, fontWeight:900, lineHeight:1,
                    background:`linear-gradient(135deg,#f1f5f9,${project.accentColor})`,
                    WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
                    marginBottom:6,
                  }}>{s.value}</div>
                  <div style={{ fontFamily:"'Cinzel',serif", fontSize:12, color:project.accentColor, fontWeight:700, letterSpacing:".08em", marginBottom:4 }}>{s.label}</div>
                  <div style={{ fontFamily:"Georgia,serif", fontSize:11, color:"rgba(255,255,255,.35)", fontStyle:"italic" }}>{s.sub}</div>
                </div>
              ))}
            </div>

            {/* TIMELINE HEADER */}
            <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom: isMobile?30:42 }}>
              <div style={{ flex:1, height:1, background:`linear-gradient(90deg,transparent,${project.accentColor}44)` }} />
              <span style={{ fontFamily:"'Cinzel',serif", fontSize:10, color:project.accentColor, letterSpacing:".28em", fontWeight:700, whiteSpace:"nowrap" }}>
                🗓 TIMELINE · {project.name}
              </span>
              <div style={{ flex:1, height:1, background:`linear-gradient(90deg,${project.accentColor}44,transparent)` }} />
            </div>

            {/* TIMELINE */}
            <div style={{ position:"relative" }}>
              {!isMobile && (
                <div style={{
                  position:"absolute", left:"50%", top:28, bottom:28,
                  width:2, transform:"translateX(-50%)",
                  background:`linear-gradient(180deg,${project.months.map(m => m.color + "55").join(",")})`,
                  animation:"lineGrow 1.2s ease both",
                  zIndex:1,
                }} />
              )}
              <div
                key={`${activeProject}-${timelineKey.current}`}
                style={{ display:"flex", flexDirection:"column", gap: isMobile ? 0 : 32 }}
              >
                {project.months.map((item, i) => (
                  <TimelineItem
                    key={i} item={item} index={i}
                    isMobile={isMobile}
                    isLast={i === project.months.length - 1}
                  />
                ))}
              </div>
            </div>

            {/* TECH STACK */}
            <div ref={techRef} style={{ marginTop: isMobile ? 48 : 68 }}>
              <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:28 }}>
                <div style={{ flex:1, height:1, background:`linear-gradient(90deg,transparent,${project.accentColor}44)` }} />
                <span style={{ fontFamily:"'Cinzel',serif", fontSize:10, color:project.accentColor, letterSpacing:".28em", fontWeight:700 }}>
                  ⚙ เทคโนโลยีที่ใช้
                </span>
                <div style={{ flex:1, height:1, background:`linear-gradient(90deg,${project.accentColor}44,transparent)` }} />
              </div>
              <div style={{ display:"flex", flexWrap:"wrap", gap: isMobile?8:10, justifyContent:"center" }}>
                {project.tech.map((t, i) => (
                  <div key={`${activeProject}-tech-${i}`} style={{
                    padding: isMobile ? "6px 12px" : "8px 16px", borderRadius:999,
                    background:`${t.color}12`, border:`1px solid ${t.color}44`,
                    backdropFilter:"blur(10px)",
                    display:"flex", alignItems:"center", gap:6,
                    animation: techVisible ? `techReveal .5s ${i * .045}s ease both` : "none",
                    opacity: techVisible ? 1 : 0,
                  }}>
                    <div style={{ width:5, height:5, borderRadius:"50%", background:t.color, boxShadow:`0 0 5px ${t.color}`, flexShrink:0 }} />
                    <span style={{ fontFamily:"'Space Mono',monospace", fontSize: isMobile?9:10.5, color:t.color, fontWeight:700, letterSpacing:".1em" }}>{t.label}</span>
                    <span style={{ fontSize:8, color:"rgba(255,255,255,.25)", fontFamily:"'Space Mono',monospace", letterSpacing:".1em", textTransform:"uppercase" }}>{t.cat}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* bottom fade */}
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:80,
          background:"linear-gradient(transparent,#020210)", pointerEvents:"none" }} />
      </section>
    </>
  );
}