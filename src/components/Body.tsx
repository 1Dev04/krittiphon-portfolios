"Use Client";


import React from 'react';
import '../theme/HighBody.css';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import ProjectPage from '../pages/ProjectPage';
import SkillPage from '../pages/SkillPage';


const Body: React.FC = () => {
    return (

        <main className="main">
            <HomePage />
            <AboutPage />
            <ProjectPage />
            <SkillPage />
        </main>

    )
}

export default Body;