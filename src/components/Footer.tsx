import React from "react";
import { useTheme, SUN, MOON } from "../components/themeContext";

interface FooterProps {
  recordCount?: number;
}

const Footer: React.FC<FooterProps> = ({ recordCount = 0 }) => {
  const { isDark } = useTheme();
  const tk = isDark ? MOON : SUN;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500&family=Inter:wght@400;500&display=swap');
        @keyframes footerFadeIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        .footer-return:hover { opacity: 1 !important; }
        .footer-return:hover .footer-arrow { transform: translateX(-4px); }
        .footer-arrow { display:inline-block; transition: transform .25s ease; }
      `}</style>

      <div
        style={{
          position: "fixed",
          bottom: 0, left: 0, right: 0,
          zIndex: 9000,
          borderTop: `1px solid ${isDark ? "rgba(139,92,246,0.15)" : "rgba(30,100,60,0.13)"}`,
          background: tk.footerBg,
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          padding: "14px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "background .4s ease, border-color .4s ease",
          animation: "footerFadeIn .4s ease both",
        }}
      >
        {/* top shimmer line */}
        <div style={{
          position:"absolute", top:0, left:"6%", right:"6%", height:1,
          background: isDark
            ? "linear-gradient(90deg,transparent,rgba(139,92,246,0.35),transparent)"
            : "linear-gradient(90deg,transparent,rgba(30,100,60,0.22),transparent)",
          pointerEvents:"none",
        }}/>

        {/* RETURN link */}
        <a
          href="/#profile"
          className="footer-return"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: tk.footerReturn,
            textDecoration: "none",
            fontFamily: "'Cinzel', serif",
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: "0.15em",
            opacity: 0.85,
            transition: "opacity .25s ease, color .4s ease",
          }}
        >
          <span className="footer-arrow" style={{ fontSize: 16 }}>←</span>
          RETURN
        </a>

        {/* center dot — decorative */}
        <div style={{
          width: 5, height: 5, borderRadius:"50%",
          background: isDark ? "rgba(139,92,246,0.35)" : "rgba(30,100,60,0.25)",
          boxShadow: isDark ? "0 0 8px rgba(139,92,246,0.4)" : "none",
          transition: "background .4s, box-shadow .4s",
        }}/>

        {/* Version / record count */}
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: tk.footerVer,
            fontFamily: "'Inter', monospace",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            transition: "color .4s ease",
          }}
        >
          {recordCount > 0 ? `${recordCount} · ` : ""}V. 3.0.0
        </div>
      </div>
    </>
  );
};

export default Footer;