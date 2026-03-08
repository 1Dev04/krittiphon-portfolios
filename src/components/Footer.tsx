"use client";

import React from "react";

const cinzel = { style: { fontFamily: "'Cinzel', serif" } };

interface FooterProps {
  recordCount?: number; // optional — defaults to 0
}

const Footer: React.FC<FooterProps> = ({ recordCount = 0 }) => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        borderTop: "1px solid rgba(139,92,246,0.15)",
        background: "rgba(6,4,20,0.9)",
        backdropFilter: "blur(20px)",
        padding: "14px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 20,
      }}
    >
      <a
        href="/#home"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          color: "#7c3aed",
          textDecoration: "none",
          fontFamily: cinzel.style.fontFamily,
          fontSize: 13,
          letterSpacing: "0.15em",
          transition: "color 0.3s",
        }}
      >
        <span style={{ fontSize: 18 }}>←</span> RETURN
      </a>

      <div
        style={{
          fontSize: 11,
          color: "rgba(107,95,160,0.5)",
          fontFamily: "'Courier New', monospace",
          letterSpacing: "0.2em",
        }}
      >
        {recordCount > 0 ? `${recordCount} · ` : ""}Build By Krittiphon Yoonaitham
      </div>
    </div>
  );
};

export default Footer;