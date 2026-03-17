import { createContext, useContext, useState } from "react";

interface ThemeCtx {
  isDark: boolean;
  setIsDark: (v: boolean | ((p: boolean) => boolean)) => void;
}

export const ThemeContext = createContext<ThemeCtx>({ isDark: false, setIsDark: () => {} });
export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ── Sun = Natural Throne  (white / forest-green / near-black)
// ── Moon = Dark magic      (deep violet-black / purple / lavender)
export const SUN = {
  // backgrounds
  barBg:        "rgba(255,255,255,0.97)",
  barBgScroll:  "rgba(255,255,255,0.99)",
  drawerBg:     "rgba(250,252,248,0.99)",
  backdropBg:   "rgba(20,40,20,0.30)",
  // borders
  borderBottom: "rgba(30,80,50,0.14)",
  // shadows
  shadow:       "0 2px 24px rgba(20,60,35,0.10)",
  shadowScroll: "0 6px 40px rgba(20,60,35,0.16), 0 1px 0 rgba(30,80,50,0.08)",
  // text
  textActive:   "#1a3d28",          // deep forest — high contrast on white
  textNormal:   "rgba(20,50,30,0.42)",
  textHover:    "rgba(20,50,30,0.82)",
  // ink pill
  inkBg:        "rgba(30,100,60,0.09)",
  inkBorder:    "rgba(30,100,60,0.28)",
  inkShadow:    "0 2px 12px rgba(30,100,60,0.12)",
  // misc
  logoColor:    "#1a3d28",
  accentColor:  "#2d6a4f",
  dotShadow:    (c: string) => `0 0 5px ${c}88`,
  shimmerMid:   "rgba(255,255,255,0.85)",
  // toggle button
  toggleBg:     "rgba(240,248,243,1)",
  toggleBorder: "rgba(30,100,60,0.20)",
  toggleColor:  "#2d6a4f",
  // footer
  footerBg:     "rgba(248,252,249,0.97)",
  footerBorder: "rgba(30,100,60,0.13)",
  footerReturn: "#2d6a4f",
  footerVer:    "rgba(20,60,35,0.38)",
};

export const MOON = {
  barBg:        "rgba(6,4,22,0.93)",
  barBgScroll:  "rgba(8,5,28,0.97)",
  drawerBg:     "rgba(6,4,22,0.99)",
  backdropBg:   "rgba(2,1,12,0.65)",
  borderBottom: "rgba(139,92,246,0.12)",
  shadow:       "0 2px 24px rgba(0,0,0,0.55), inset 0 1px 0 rgba(139,92,246,0.06)",
  shadowScroll: "0 8px 56px rgba(0,0,0,0.78), inset 0 1px 0 rgba(139,92,246,0.10)",
  // text — bumped opacity for readability
  textActive:   "#ede9fe",          // near-white lavender
  textNormal:   "rgba(196,181,253,0.50)",   // was 0.28 — now clearly readable
  textHover:    "rgba(221,214,254,0.88)",
  inkBg:        "rgba(139,92,246,0.12)",
  inkBorder:    "rgba(139,92,246,0.32)",
  inkShadow:    "0 0 22px rgba(139,92,246,0.20)",
  logoColor:    "#ddd6fe",
  accentColor:  "#8b5cf6",
  dotShadow:    (c: string) => `0 0 10px ${c}cc`,
  shimmerMid:   "rgba(255,255,255,0.10)",
  toggleBg:     "rgba(139,92,246,0.10)",
  toggleBorder: "rgba(139,92,246,0.28)",
  toggleColor:  "#a78bfa",
  footerBg:     "rgba(6,4,20,0.92)",
  footerBorder: "rgba(139,92,246,0.15)",
  footerReturn: "#7c3aed",
  footerVer:    "rgba(167,139,250,0.45)",
};

// Per-item accent colours
export const NAV_ITEMS = [
  { id: "profile",            label: "Profile",              rune: "ᚠ", sunColor: "#1a5c38", moonColor: "#a78bfa" },
  { id: "award-certificates", label: "Award & Certificates", rune: "ᚢ", sunColor: "#1a5c38", moonColor: "#67e8f9" },
  { id: "experiances",        label: "Experiences",          rune: "ᚦ", sunColor: "#1a5c38", moonColor: "#c084fc" },
  { id: "projects-reference", label: "Projects",     rune: "ᚨ", sunColor: "#1a5c38", moonColor: "#f0abfc" },
  { id: "feature-project", label: "Feature Project",     rune: "ᚨ", sunColor: "#1a5c38", moonColor: "#beabfcff" }, // ✅ แก้
  { id: "skills",             label: "Skills",               rune: "ᚱ", sunColor: "#1a5c38", moonColor: "#818cf8" },
  { id: "other-activites",    label: "QA",                   rune: "ᚲ", sunColor: "#1a5c38", moonColor: "#7dd3fc" }, // ✅ แก้
] as const;

export type NavId = typeof NAV_ITEMS[number]["id"];