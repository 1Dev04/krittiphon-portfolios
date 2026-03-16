import { useEffect, useRef, useState } from "react";
import { useTheme } from "../components/themeContext";

/* ══════════════════════════════════════════════════════
   THEME TOKENS
══════════════════════════════════════════════════════ */
interface ExpTheme {
  pageBg:       string;
  gridLine:     string;
  orbA:         string;
  orbB:         string;
  orbC:         string;
  scanLine:     string;
  bottomFade:   string;
  // header
  eyebrowColor: string;
  eyebrowLine:  string;
  headingGrad:  string;
  headingSub:   string;
  // badge
  badgeBg:      (c:string)=>string;
  badgeBorder:  (c:string)=>string;
  badgeGlow:    (c:string)=>string;
  badgeTitle:   string;
  badgePeriod:  (c:string)=>string;
  badgePeriodBg:(c:string)=>string;
  // stats
  statBg:       string;
  statBorder:   (c:string)=>string;
  statTopLine:  (c:string)=>string;
  statNumber:   (c:string)=>string;
  statLabel:    (c:string)=>string;
  statSub:      string;
  // timeline header
  tlHeaderColor:(c:string)=>string;
  tlLine:       (c:string)=>string;
  // timeline card
  cardBg:       string;
  cardBgHov:    string;
  cardBgSuccess:(c:string)=>string;
  cardBorder:   (hov:boolean,suc:boolean,c:string)=>string;
  cardShadow:   (hov:boolean,suc:boolean,c:string)=>string;
  cardMonthColor:(c:string)=>string;
  cardMonthShadow:(hov:boolean,c:string)=>string;
  cardYear:     string;
  cardNumBg:    (c:string)=>string;
  cardNumBorder:(c:string)=>string;
  cardNumColor: (c:string)=>string;
  cardDivider:  (c:string)=>string;
  taskNormal:   string;
  taskHighlight:(c:string)=>string;
  taskHighBg:   (c:string)=>string;
  taskHighBorder:(c:string)=>string;
  // tech
  techBg:       (c:string)=>string;
  techBorder:   (c:string)=>string;
  techLabel:    (c:string)=>string;
  techCat:      string;
}

const SUN_EXP: ExpTheme = {
  pageBg:        "linear-gradient(160deg,#f5f7f4 0%,#eef4ee 50%,#f0f5f0 100%)",
  gridLine:      "rgba(45,106,79,0.04)",
  orbA:          "rgba(45,106,79,0.08)",
  orbB:          "rgba(82,183,136,0.06)",
  orbC:          "rgba(27,67,50,0.05)",
  scanLine:      "rgba(45,106,79,0.06)",
  bottomFade:    "linear-gradient(transparent,#eef4ee)",
  eyebrowColor:  "#2d6a4f",
  eyebrowLine:   "rgba(45,106,79,0.35)",
  headingGrad:   "linear-gradient(135deg,#1a3d28 0%,#2d6a4f 40%,#40916c 70%,#1a3d28 100%)",
  headingSub:    "rgba(20,50,30,0.45)",
  badgeBg:       (c)=>`${c}12`,
  badgeBorder:   (c)=>`${c}44`,
  badgeGlow:     (c)=>`0 0 20px ${c}14`,
  badgeTitle:    "#1a3d28",
  badgePeriod:   (c)=>c,
  badgePeriodBg: (c)=>`${c}14`,
  statBg:        "rgba(255,255,255,0.78)",
  statBorder:    (c)=>`${c}22`,
  statTopLine:   (c)=>`linear-gradient(90deg,transparent,${c}77,transparent)`,
  statNumber:    (c)=>`linear-gradient(135deg,#1a3d28,${c})`,
  statLabel:     (c)=>c,
  statSub:       "rgba(20,50,30,0.42)",
  tlHeaderColor: (c)=>c,
  tlLine:        (c)=>`linear-gradient(90deg,transparent,${c}44)`,
  cardBg:        "rgba(255,255,255,0.80)",
  cardBgHov:     "rgba(255,255,255,0.96)",
  cardBgSuccess: (c)=>`linear-gradient(135deg,${c}0e,rgba(255,255,255,0.85))`,
  cardBorder:    (hov,suc,c)=> hov||suc ? `${c}50` : `${c}22`,
  cardShadow:    (hov,suc,c)=>
    hov ? `0 0 32px ${c}18,0 12px 40px rgba(20,60,35,0.10),inset 0 1px 0 rgba(255,255,255,.8)`
    : suc ? `0 0 20px ${c}14,0 4px 20px rgba(20,60,35,0.08)`
    : `0 2px 16px rgba(20,60,35,0.06),inset 0 1px 0 rgba(255,255,255,.6)`,
  cardMonthColor:(c)=>c,
  cardMonthShadow:(hov,c)=> hov ? `0 0 14px ${c}88` : `0 0 6px ${c}44`,
  cardYear:      "rgba(20,50,30,0.32)",
  cardNumBg:     (c)=>`${c}14`,
  cardNumBorder: (c)=>`${c}44`,
  cardNumColor:  (c)=>c,
  cardDivider:   (c)=>`linear-gradient(90deg,${c}55,transparent)`,
  taskNormal:    "rgba(20,50,30,0.58)",
  taskHighlight: (c)=>c,
  taskHighBg:    (c)=>`${c}0c`,
  taskHighBorder:(c)=>`${c}33`,
  techBg:        (c)=>`${c}10`,
  techBorder:    (c)=>`${c}40`,
  techLabel:     (c)=>c,
  techCat:       "rgba(20,50,30,0.32)",
};

const MOON_EXP: ExpTheme = {
  pageBg:        "radial-gradient(ellipse at 20% 50%,#0f0528 0%,#060414 40%,#020210 100%)",
  gridLine:      "rgba(167,139,250,0.025)",
  orbA:          "rgba(124,58,237,0.18)",
  orbB:          "rgba(6,182,212,0.12)",
  orbC:          "rgba(253,164,175,0.09)",
  scanLine:      "rgba(167,139,250,0.20)",
  bottomFade:    "linear-gradient(transparent,#020210)",
  eyebrowColor:  "#a78bfa",
  eyebrowLine:   "rgba(167,139,250,0.40)",
  headingGrad:   "linear-gradient(135deg,#f1f5f9 0%,#a78bfa 25%,#67e8f9 55%,#86efac 75%,#f1f5f9 100%)",
  headingSub:    "rgba(255,255,255,0.30)",
  badgeBg:       (c)=>`${c}10`,
  badgeBorder:   (c)=>`${c}44`,
  badgeGlow:     (c)=>`0 0 28px ${c}22`,
  badgeTitle:    "#e2d9f3",
  badgePeriod:   (c)=>c,
  badgePeriodBg: (c)=>`${c}18`,
  statBg:        "rgba(255,255,255,0.04)",
  statBorder:    (c)=>`${c}28`,
  statTopLine:   (c)=>`linear-gradient(90deg,transparent,${c}88,transparent)`,
  statNumber:    (c)=>`linear-gradient(135deg,#f1f5f9,${c})`,
  statLabel:     (c)=>c,
  statSub:       "rgba(255,255,255,0.35)",
  tlHeaderColor: (c)=>c,
  tlLine:        (c)=>`linear-gradient(90deg,transparent,${c}44)`,
  cardBg:        "rgba(255,255,255,0.04)",
  cardBgHov:     "linear-gradient(135deg,rgba(255,255,255,.09),rgba(255,255,255,.04))",
  cardBgSuccess: (c)=>`linear-gradient(135deg,${c}10,rgba(255,255,255,.04))`,
  cardBorder:    (hov,suc,c)=> hov||suc ? `${c}66` : `${c}28`,
  cardShadow:    (hov,suc,c)=>
    hov ? `0 0 40px ${c}33,0 16px 48px rgba(0,0,0,.6),inset 0 1px 0 rgba(255,255,255,.08)`
    : suc ? `0 0 28px ${c}44,0 8px 32px rgba(0,0,0,.5)`
    : `0 4px 24px rgba(0,0,0,.4),inset 0 1px 0 rgba(255,255,255,.04)`,
  cardMonthColor:(c)=>c,
  cardMonthShadow:(hov,c)=> hov ? `0 0 20px ${c}cc` : `0 0 10px ${c}55`,
  cardYear:      "rgba(255,255,255,0.30)",
  cardNumBg:     (c)=>`${c}18`,
  cardNumBorder: (c)=>`${c}44`,
  cardNumColor:  (c)=>c,
  cardDivider:   (c)=>`linear-gradient(90deg,${c}55,transparent)`,
  taskNormal:    "rgba(255,255,255,0.58)",
  taskHighlight: (c)=>c,
  taskHighBg:    (c)=>`${c}0d`,
  taskHighBorder:(c)=>`${c}33`,
  techBg:        (c)=>`${c}12`,
  techBorder:    (c)=>`${c}44`,
  techLabel:     (c)=>c,
  techCat:       "rgba(255,255,255,0.25)",
};

/* ══════════════════════════════════════════════════════
   DATA — CLICKNEXT
══════════════════════════════════════════════════════ */
const CLICKNEXT = {
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
    { month:"พฤษภาคม",              year:"2025", num:"01", color:"#a78bfa", glow:"#7c3aed", icon:"🚀",
      tasks:["1–11 พ.ค. — Orientation & ศึกษา Codebase บริษัท","12 พ.ค. — เริ่มพัฒนา Domain Whitelist Feature แรก","12–30 พ.ค. — พัฒนา Domain Whitelist ครบทุกฟีเจอร์ (List, Add, Edit, Delete)","20 พ.ค. — สร้าง ER Diagram & Data Dictionary ระบบ","28 พ.ค. — ออกแบบ Sequence Diagram Domain Whitelist","30 พ.ค. — ทบทวน REST API & PHP Codebase เพิ่มเติม"] },
    { month:"มิถุนายน",             year:"2025", num:"02", color:"#67e8f9", glow:"#0891b2", icon:"🔐",
      tasks:["2–6 มิ.ย. — Deploy Domain Whitelist สู่ Staging, แก้ไข Add/Update logic","9–10 มิ.ย. — พัฒนา Sender Log — List & Filter","11–14 มิ.ย. — ปรับปรุง Sender Log ให้ครบ spec","18–20 มิ.ย. — พัฒนา Authentication with Microsoft (OAuth2)","23 มิ.ย. — ต่อ Microsoft Auth Flow ฝั่ง Backend","24–30 มิ.ย. — เริ่ม Company Setting General Page"] },
    { month:"กรกฎาคม",             year:"2025", num:"03", color:"#86efac", glow:"#16a34a", icon:"🏢",
      tasks:["1–7 ก.ค. — ปรับปรุง Company Setting (General, Contact Owner)","8–11 ก.ค. — แก้ไข Domain Whitelist ตาม feedback + อัปเดต Sequence Diagram","14–18 ก.ค. — พัฒนา Company Address CRUD","21–25 ก.ค. — พัฒนา Data Masking สำหรับข้อมูลสำคัญ","28–31 ก.ค. — Review & QA Company Setting ทั้งหมด"] },
    { month:"สิงหาคม",             year:"2025", num:"04", color:"#fda4af", glow:"#e11d48", icon:"🛡️",
      tasks:["1–8 ส.ค. — พัฒนา 2FA Phone Verification & Trust Device","11–15 ส.ค. — สร้าง Portal Setting Pages ใหม่ทั้งหมด","18–22 ส.ค. — ปรับ Roles Setting & Permissions","22–25 ส.ค. — พัฒนา Logs Setting (Filter, Export)","26–27 ส.ค. — เริ่ม Tracking URL Feature","28–29 ส.ค. — Unit Testing Template Message"] },
    { month:"กันยายน",             year:"2025", num:"05", color:"#fcd34d", glow:"#d97706", icon:"📊",
      tasks:["1–5 ก.ย. — ศึกษา NestJS & NuxtJS (เปลี่ยน Stack ใหม่)","8–12 ก.ย. — พัฒนา SMS Monitor Dashboard","15–19 ก.ย. — Top 20 API Request Chart & Table","22–25 ก.ย. — Portal Setting Whitelist/Blacklist CRUD","26–29 ก.ย. — Postpaid Monthly Report + Flow Diagram","30 ก.ย. — Review & Demo ก่อนเดือนสุดท้าย"] },
    { month:"ตุลาคม",              year:"2025", num:"06", color:"#fb923c", glow:"#ea580c", icon:"🎯",
      tasks:["1–3 ต.ค. — User Management (List, Create, Edit, Delete)","6–10 ต.ค. — Log Authentication History","13–15 ต.ค. — Login with Microsoft integration (Portal)","16–17 ต.ค. — reCaptcha Integration หน้า Login","20–24 ต.ค. — จัดทำ Flow Diagram ครบถ้วนทุก Feature","🎉 31 ต.ค. — วันสุดท้ายสหกิจ — ส่งมอบงานครบถ้วน"] },
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
  item: typeof CLICKNEXT.months[0]; isMobile: boolean; visible: boolean; tk: ExpTheme;
}) {
  const [hov, setHov] = useState(false);
  const isSuccess = item.tasks.some(t => t.includes("SUCCESS") || t.includes("🎉"));

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position:"relative", borderRadius:20,
        padding: isMobile ? "18px 16px 16px" : "22px 24px 20px",
        background: hov ? tk.cardBgHov : isSuccess ? tk.cardBgSuccess(item.color) : tk.cardBg,
        border:`1px solid ${tk.cardBorder(hov,isSuccess,item.color)}`,
        backdropFilter:"blur(16px)",
        boxShadow: tk.cardShadow(hov, isSuccess, item.color),
        transform: hov ? "translateY(-5px)" : "none",
        transition:"all .38s cubic-bezier(.22,.68,0,1.2)",
        overflow:"hidden",
      }}
    >
      <div style={{ position:"absolute", top:0, left:"10%", right:"10%", height:1.5,
        background:`linear-gradient(90deg,transparent,${item.color}${hov||isSuccess?"cc":"77"},transparent)`,
        transition:"opacity .3s" }}/>

      {(["tl","tr","bl","br"] as const).map(k => (
        <div key={k} style={{
          position:"absolute",
          top:k[0]==="t"?10:"auto", bottom:k[0]==="b"?10:"auto",
          left:k[1]==="l"?10:"auto", right:k[1]==="r"?10:"auto",
          width:12, height:12,
          borderTop:k[0]==="t"?`1px solid ${item.color}55`:"none",
          borderBottom:k[0]==="b"?`1px solid ${item.color}55`:"none",
          borderLeft:k[1]==="l"?`1px solid ${item.color}55`:"none",
          borderRight:k[1]==="r"?`1px solid ${item.color}55`:"none",
          pointerEvents:"none",
        }}/>
      ))}

      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
        <span style={{ fontSize: isMobile?18:20 }}>{item.icon}</span>
        <div>
          <div style={{
            fontFamily:"'Cinzel',serif",
            fontSize: isMobile?14:16, fontWeight:700,
            color: tk.cardMonthColor(item.color),
            textShadow: tk.cardMonthShadow(hov, item.color),
            letterSpacing:".06em", transition:"text-shadow .3s",
          }}>{item.month}</div>
          <div style={{ fontSize:10, fontFamily:"'Space Mono',monospace",
            color:tk.cardYear, letterSpacing:".2em" }}>{item.year}</div>
        </div>
        <div style={{
          marginLeft:"auto", width:32, height:32, borderRadius:"50%",
          background:tk.cardNumBg(item.color), border:`1px solid ${tk.cardNumBorder(item.color)}`,
          display:"flex", alignItems:"center", justifyContent:"center",
          fontFamily:"'Space Mono',monospace", fontSize:11,
          color:tk.cardNumColor(item.color), fontWeight:700,
        }}>{item.num}</div>
      </div>

      <div style={{ height:1, marginBottom:12,
        background: tk.cardDivider(item.color) }}/>

      <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:6 }}>
        {item.tasks.map((t,ti) => {
          const isHL = t.includes("✅")||t.includes("🎉")||t.includes("SUCCESS");
          return (
            <li key={ti} style={{
              display:"flex", alignItems:"flex-start", gap:8,
              fontFamily: isHL ? "'Space Mono',monospace" : "Georgia,serif",
              fontSize: isMobile?11:12,
              color: isHL ? tk.taskHighlight(item.color) : tk.taskNormal,
              lineHeight:1.65, fontWeight: isHL?700:400,
              letterSpacing: isHL?".04em":"0",
              animation: visible ? `expTaskIn .4s ${.08+ti*.055}s ease both` : "none",
              background: isHL ? tk.taskHighBg(item.color) : "transparent",
              padding: isHL ? "4px 8px" : "0",
              borderRadius: isHL ? 8 : 0,
              border: isHL ? `1px solid ${tk.taskHighBorder(item.color)}` : "none",
              margin: isHL ? "2px 0" : "0",
            }}>
              <span style={{
                width:isHL?6:5, height:isHL?6:5, borderRadius:"50%", flexShrink:0,
                background:item.color,
                boxShadow:`0 0 ${isHL?10:5}px ${item.color}`,
                marginTop:5,
              }}/>
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
  item: typeof CLICKNEXT.months[0]; index: number; isMobile: boolean; isLast: boolean; tk: ExpTheme;
}) {
  const { ref, visible } = useVisible(0.07);
  const isRight = index % 2 === 0;

  if (isMobile) {
    return (
      <div ref={ref} style={{
        display:"flex", gap:12,
        opacity: visible?1:0,
        transform: visible?"none":"translateY(24px)",
        transition:`opacity .6s ${index*.07}s ease,transform .6s ${index*.07}s cubic-bezier(.22,.68,0,1.2)`,
      }}>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", flexShrink:0, width:26 }}>
          <div style={{
            width:26, height:26, borderRadius:"50%", flexShrink:0,
            background:`radial-gradient(circle,${item.color} 0%,${item.color}44 60%,transparent 100%)`,
            border:`2px solid ${item.color}`,
            boxShadow:`0 0 12px ${item.glow}88,0 0 24px ${item.glow}44`,
            display:"flex", alignItems:"center", justifyContent:"center",
            zIndex:2,
            animation: visible ? `expNodeIn .5s ${index*.07}s ease both` : "none",
          }}>
            <div style={{ width:7, height:7, borderRadius:"50%", background:"#fff",
              boxShadow:`0 0 5px ${item.color}` }}/>
          </div>
          {!isLast && (
            <div style={{ flex:1, width:2, marginTop:4,
              background:`linear-gradient(180deg,${item.color}88,transparent)` }}/>
          )}
        </div>
        <div style={{ flex:1, paddingBottom: isLast?0:18 }}>
          <TimelineCard item={item} isMobile={isMobile} visible={visible} tk={tk}/>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} style={{ display:"grid", gridTemplateColumns:"1fr 64px 1fr", alignItems:"flex-start" }}>
      <div style={{
        paddingRight:28, paddingTop:8,
        opacity: visible?1:0,
        transform: visible?"none":`translateX(${isRight?-28:0}px)`,
        transition:`opacity .65s ${index*.1}s ease,transform .65s ${index*.1}s cubic-bezier(.22,.68,0,1.2)`,
      }}>
        {isRight && <TimelineCard item={item} isMobile={isMobile} visible={visible} tk={tk}/>}
      </div>
      <div style={{ display:"flex", justifyContent:"center", alignItems:"flex-start", zIndex:2, paddingTop:8 }}>
        <div style={{
          width:48, height:48, borderRadius:"50%",
          background:`radial-gradient(circle,${item.color}ee 0%,${item.color}55 55%,transparent 100%)`,
          border:`2px solid ${item.color}`,
          boxShadow:`0 0 24px ${item.glow}99,0 0 48px ${item.glow}44`,
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:18, flexShrink:0,
          animation: visible ? `expNodeIn .5s ${index*.1}s ease both` : "none",
        }}>{item.icon}</div>
      </div>
      <div style={{
        paddingLeft:28, paddingTop:8,
        opacity: visible?1:0,
        transform: visible?"none":`translateX(${!isRight?28:0}px)`,
        transition:`opacity .65s ${index*.1}s ease,transform .65s ${index*.1}s cubic-bezier(.22,.68,0,1.2)`,
      }}>
        {!isRight && <TimelineCard item={item} isMobile={isMobile} visible={visible} tk={tk}/>}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════ */
export default function ExperiancePage() {
  const { isDark } = useTheme();
  const tk = isDark ? MOON_EXP : SUN_EXP;
  const project = CLICKNEXT;

  const [isMobile, setIsMobile] = useState(false);
  const { ref: headerRef, visible: headerVisible } = useVisible(0.1);
  const { ref: techRef,   visible: techVisible   } = useVisible(0.1);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Space+Mono:wght@400;700&family=Sarabun:wght@400;500&display=swap');
        @keyframes expOrbDrift  { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,-20px) scale(1.05)} }
        @keyframes expScan      { 0%{top:-2%} 100%{top:102%} }
        @keyframes expShimmer   { 0%{background-position:-300% center} 100%{background-position:300% center} }
        @keyframes expNodeIn    { 0%{transform:scale(0) rotate(-180deg);opacity:0} 70%{transform:scale(1.15) rotate(10deg)} 100%{transform:scale(1) rotate(0);opacity:1} }
        @keyframes expTaskIn    { from{opacity:0;transform:translateX(-12px)} to{opacity:1;transform:translateX(0)} }
        @keyframes expTechReveal{ from{opacity:0;transform:scale(.8) translateY(10px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes expLineGrow  { from{height:0;opacity:0} to{opacity:1} }
        @keyframes expFadeUp    { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes expDotPulse  { 0%,100%{transform:scale(1);opacity:.7} 50%{transform:scale(1.8);opacity:1} }
        * { box-sizing:border-box; margin:0; padding:0; }
      `}</style>

      <section id="experiances" style={{
        minHeight:"100vh",
        background: tk.pageBg,
        position:"relative", overflowX:"hidden",
        padding: isMobile ? "80px 0 60px" : "100px 0 80px",
        transition:"background .5s ease",
      }}>
        {/* grid */}
        <div style={{ position:"absolute", inset:0, pointerEvents:"none",
          backgroundImage:`linear-gradient(${tk.gridLine} 1px,transparent 1px),linear-gradient(90deg,${tk.gridLine} 1px,transparent 1px)`,
          backgroundSize:"80px 80px", transition:"background-image .5s" }}/>

        {/* orbs */}
        {([
          {w:520,h:520,t:"-15%",l:"-10%",bg:tk.orbA,d:"16s",dl:"0s"},
          {w:400,h:400,t:"60%", r:"-8%", bg:tk.orbB,d:"20s",dl:"5s"},
          {w:280,h:280,t:"30%", l:"40%", bg:tk.orbC,d:"12s",dl:"3s"},
        ] as any[]).map((o,i)=>(
          <div key={i} style={{ position:"absolute", width:o.w, height:o.h, top:o.t,
            left:o.l, right:o.r, borderRadius:"50%", filter:"blur(90px)",
            background:o.bg, animation:`expOrbDrift ${o.d} ease-in-out ${o.dl} infinite`,
            pointerEvents:"none", transition:"background .5s" }}/>
        ))}

        {/* scan line */}
        <div style={{ position:"absolute", left:0, right:0, height:2,
          background:`linear-gradient(90deg,transparent,${tk.scanLine},transparent)`,
          animation:"expScan 10s linear infinite", pointerEvents:"none", zIndex:2 }}/>

        {/* particles — only dark */}
        {isDark && Array.from({length:18},(_,i)=>(
          <div key={i} style={{
            position:"absolute",
            left:`${(i*47.3)%100}%`, top:`${(i*31.7)%100}%`,
            width:(i%3)+1, height:(i%3)+1, borderRadius:"50%",
            background:["#a78bfa","#67e8f9","#86efac","#fda4af","#fcd34d","#fb923c"][i%6],
            boxShadow:`0 0 ${(i%3+2)*3}px ${["#a78bfa","#67e8f9","#86efac","#fda4af","#fcd34d","#fb923c"][i%6]}`,
            animation:`expOrbDrift ${5+i%5}s ease-in-out ${(i*.3)%5}s infinite`,
            pointerEvents:"none", opacity:.65,
          }}/>
        ))}

        {/* CONTENT */}
        <div style={{ position:"relative", zIndex:3, maxWidth:1080, margin:"0 auto",
          padding: isMobile ? "0 16px" : "0 clamp(20px,5%,60px)" }}>

          {/* HEADER */}
          <div ref={headerRef} style={{
            textAlign:"center", marginBottom: isMobile?40:56,
            opacity: headerVisible?1:0,
            transform: headerVisible?"none":"translateY(-24px)",
            transition:"opacity .8s ease,transform .8s cubic-bezier(.22,.68,0,1.2)",
          }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:14, marginBottom:14 }}>
              <div style={{ height:1, width:isMobile?40:80, background:`linear-gradient(90deg,transparent,${tk.eyebrowLine})` }}/>
              <span style={{ fontSize:10, color:tk.eyebrowColor, letterSpacing:".45em",
                fontFamily:"'Space Mono',monospace", transition:"color .5s" }}>✦ JOURNEY ✦</span>
              <div style={{ height:1, width:isMobile?40:80, background:`linear-gradient(90deg,${tk.eyebrowLine},transparent)` }}/>
            </div>
            <h1 style={{
             fontFamily: isDark ? "'Cinzel', serif" : "'Lora', serif",
              fontSize: isMobile ? "clamp(26px,8vw,38px)" : "clamp(32px,4.5vw,52px)",
              fontWeight:900, letterSpacing:".08em",
              color: isDark ? "#e9d5ff" : "#1a3d28",
              textShadow: isDark
                ? "0 0 32px rgba(167,139,250,0.55), 0 2px 8px rgba(0,0,0,0.5)"
                : "0 1px 0 rgba(255,255,255,0.9), 0 2px 12px rgba(45,106,79,0.15)",
              lineHeight:1.1, marginBottom:8,
              transition:"color .5s, text-shadow .5s",
            }}>EXPERIENCES</h1>
            <p style={{ fontFamily:"'Sarabun',sans-serif", fontSize:13,
              color:tk.headingSub, letterSpacing:".02em", transition:"color .5s" }}>
              Clicknext Co., Ltd. — สหกิจศึกษา 6 เดือน
            </p>
          </div>

          {/* PROJECT BADGE */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center",
            marginBottom: isMobile?36:48, animation:"expFadeUp .5s ease both" }}>
            <div style={{
              display:"inline-flex", alignItems:"center", gap:12,
              padding: isMobile ? "12px 20px" : "14px 28px", borderRadius:999,
              background: tk.badgeBg(project.accentColor),
              border:`1.5px solid ${tk.badgeBorder(project.accentColor)}`,
              backdropFilter:"blur(12px)",
              boxShadow: tk.badgeGlow(project.accentColor),
              flexWrap: isMobile ? "wrap" : "nowrap",
              justifyContent:"center",
            }}>
              <span style={{ fontSize:20 }}>{project.icon}</span>
              <div>
                <div style={{ fontFamily:"'Cinzel',serif", fontSize:isMobile?12:14,
                  color:tk.badgeTitle, fontWeight:700, letterSpacing:".06em",
                  transition:"color .5s" }}>{project.name}</div>
                <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10,
                  color:tk.badgePeriod(project.accentColor),
                  letterSpacing:".14em" }}>{project.role}</div>
              </div>
              <div style={{
                padding:"3px 12px", borderRadius:999,
                background: tk.badgePeriodBg(project.accentColor),
                border:`1px solid ${tk.badgeBorder(project.accentColor)}`,
                fontSize:10, color:tk.badgePeriod(project.accentColor),
                fontFamily:"'Space Mono',monospace", letterSpacing:".1em",
              }}>{project.period}</div>
            </div>
          </div>

          {/* STATS */}
          <div style={{
            display:"grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)",
            gap: isMobile?12:20,
            marginBottom: isMobile?48:68,
          }}>
            {project.stats.map((s,i)=>(
              <div key={i} style={{
                textAlign:"center", padding: isMobile?"20px 14px":"26px 18px",
                borderRadius:18,
                background: tk.statBg,
                border:`1.5px solid ${tk.statBorder(project.accentColor)}`,
                backdropFilter:"blur(14px)",
                position:"relative", overflow:"hidden",
                animation:`expFadeUp .5s ${i*.1}s ease both`,
                transition:"background .5s,border-color .5s",
              }}>
                <div style={{ position:"absolute", top:0, left:"20%", right:"20%", height:1.5,
                  background: tk.statTopLine(project.accentColor) }}/>
                <div style={{
                  fontFamily:"'Cinzel',serif", fontSize:isMobile?38:46, fontWeight:900, lineHeight:1,
                  color: project.accentColor,
                  textShadow: isDark ? `0 0 20px ${project.accentColor}88` : `0 0 12px ${project.accentColor}44`,
                  marginBottom:6,
                  transition:"color .5s, text-shadow .5s",
                }}>{s.value}</div>
                <div style={{ fontFamily:"'Cinzel',serif", fontSize:13, color:tk.statLabel(project.accentColor),
                  fontWeight:700, letterSpacing:".08em", marginBottom:4, transition:"color .5s" }}>{s.label}</div>
                <div style={{ fontFamily:"'Sarabun',sans-serif", fontSize:12,
                  color:tk.statSub, fontStyle:"italic", transition:"color .5s" }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* TIMELINE HEADER */}
          <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:isMobile?30:44 }}>
            <div style={{ flex:1, height:1, background:tk.tlLine(project.accentColor) }}/>
            <span style={{ fontFamily:"'Cinzel',serif", fontSize:11,
              color:tk.tlHeaderColor(project.accentColor), letterSpacing:".28em",
              fontWeight:700, whiteSpace:"nowrap", transition:"color .5s" }}>
              🗓 TIMELINE · {project.name}
            </span>
            <div style={{ flex:1, height:1,
              background:`linear-gradient(90deg,${project.accentColor}44,transparent)` }}/>
          </div>

          {/* TIMELINE */}
          <div style={{ position:"relative" }}>
            {!isMobile && (
              <div style={{
                position:"absolute", left:"50%", top:28, bottom:28,
                width:2, transform:"translateX(-50%)",
                background:`linear-gradient(180deg,${project.months.map(m=>m.color+"55").join(",")})`,
                animation:"expLineGrow 1.2s ease both",
                zIndex:1,
              }}/>
            )}
            <div style={{ display:"flex", flexDirection:"column", gap:isMobile?0:32 }}>
              {project.months.map((item,i)=>(
                <TimelineItem key={i} item={item} index={i}
                  isMobile={isMobile} isLast={i===project.months.length-1} tk={tk}/>
              ))}
            </div>
          </div>

          {/* TECH STACK */}
          <div ref={techRef} style={{ marginTop:isMobile?48:68 }}>
            <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:28 }}>
              <div style={{ flex:1, height:1, background:tk.tlLine(project.accentColor) }}/>
              <span style={{ fontFamily:"'Cinzel',serif", fontSize:11,
                color:tk.tlHeaderColor(project.accentColor),
                letterSpacing:".28em", fontWeight:700, transition:"color .5s" }}>
                ⚙ เทคโนโลยีที่ใช้
              </span>
              <div style={{ flex:1, height:1,
                background:`linear-gradient(90deg,${project.accentColor}44,transparent)` }}/>
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:isMobile?8:12, justifyContent:"center" }}>
              {project.tech.map((t,i)=>(
                <div key={i} style={{
                  padding: isMobile?"7px 13px":"9px 17px", borderRadius:999,
                  background: tk.techBg(t.color),
                  border:`1.5px solid ${tk.techBorder(t.color)}`,
                  backdropFilter:"blur(10px)",
                  display:"flex", alignItems:"center", gap:7,
                  animation: techVisible ? `expTechReveal .5s ${i*.045}s ease both` : "none",
                  opacity: techVisible ? 1 : 0,
                }}>
                  <div style={{ width:6, height:6, borderRadius:"50%", background:t.color,
                    boxShadow:`0 0 6px ${t.color}`, flexShrink:0 }}/>
                  <span style={{ fontFamily:"'Space Mono',monospace",
                    fontSize:isMobile?10:11, color:tk.techLabel(t.color),
                    fontWeight:700, letterSpacing:".08em" }}>{t.label}</span>
                  <span style={{ fontSize:9, color:tk.techCat,
                    fontFamily:"'Space Mono',monospace", letterSpacing:".1em",
                    textTransform:"uppercase", transition:"color .5s" }}>{t.cat}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* bottom fade */}
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:80,
          background:tk.bottomFade, pointerEvents:"none", transition:"background .5s" }}/>
      </section>
    </>
  );
}