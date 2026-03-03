"Use Client";


import React from 'react';
import '../theme/HighBody.css';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import ProjectPage from '../pages/ProjectPage';

const Body: React.FC = () => {
    return (

        <main className="main">
            <HomePage />
            <AboutPage />
            <ProjectPage />
        </main>

    )
}

export default Body;