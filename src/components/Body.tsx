"Use Client";


import React from 'react';
import '../theme/HighBody.css';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import ProjectPage from '../pages/ProjectPage';
import SkillPage from '../pages/SkillPage';
import CertificatePage from '../pages/CertificatePage';
import ActivitiePage  from '../pages/ActivitePage';


const Body: React.FC = () => {
    return (

        <main className="main">
            <HomePage />
            <AboutPage />
            <ProjectPage />
            <SkillPage />
            <CertificatePage />
            <ActivitiePage />
        </main>

    )
}

export default Body;