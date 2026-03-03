"use client"

import { useEffect, useState } from "react";
import '../theme/HighNavbar.css'

const Navbar: React.FC = () => {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "project", "skill", "certificate", "activity"];

      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActive(id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

    return (
        <nav className="navbar">
            <div className="menu">
                <a href="#home" className={active === "home" ? "active" : ""}>Home</a>
                <a href="#about" className={active === "about" ? "active" : ""}>About</a>
                <a href="#project" className={active === "project" ? "active" : ""}>Projects</a>
                <a href="#skill" className={active === "skill" ? "active" : ""}>Skills</a>
                <a href="#certificate" className={active === "certificate" ? "active" : ""}>Certificates</a>
                <a href="#activity" className={active === "activity" ? "active" : ""}>Activitys</a>
            </div>
        </nav>
    );
};

export default Navbar;