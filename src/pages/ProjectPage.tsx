"use client"

import React from 'react';
import "../theme/HighProject.css";
import LinkIcon from '@mui/icons-material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';

import { projects } from "../data/Project";
import type { ProjectItem } from '../types/Project';



const getTranslatedText = (text: string | { en: string; th: string }, lang: "en" | "th"): string => {
    return typeof text === "string" ? text : text[lang];
};

const ProjectPage: React.FC = () => {
    const [lang, setlang] = React.useState<"en" | "th">('en');

   

    return (
        <section id="project" className="project">
            <div className="class-project">
                <h1>{lang === "en" ? "Projects" : "ผลงาน"}</h1>

                <div className="board-projects-scoll">

                    <div className="project-list">
                        {projects.map((item: ProjectItem, index: number) => (
                            <div className="project-card" key={index}>
                                <div className="project-image">
                                    <img src={item.img} />
                                </div>

                                <div className="project-content">
                                    <div className="project-text">
                                        <h2>{getTranslatedText(item.title, lang)}</h2>
                                        <span className="project-year">{item.year}</span>
                                    </div>

                                    <p>{getTranslatedText(item.desc, lang)}</p>

                                    <div className="project-actions">
                                        {item.link && (
                                            <a href={item.link} target="_blank" rel="noopener noreferrer">
                                                <LinkIcon />
                                            </a>
                                        )}

                                        {item.youtube && (
                                            <a href={item.youtube} target="_blank" rel="noopener noreferrer">
                                                <YouTubeIcon />
                                            </a>
                                        )}

                                        {item.github && (
                                            <a href={item.github} target="_blank" rel="noopener noreferrer">
                                                <GitHubIcon />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <div className="lang-toggle">
                <button className={lang === "th" ? "active" : ""} onClick={() => setlang("th")}>TH</button>
                <span>|</span>
                <button className={lang === "en" ? "active" : ""} onClick={() => setlang("en")}>EN</button>
            </div>

        </section>
    )
}

export default ProjectPage;



