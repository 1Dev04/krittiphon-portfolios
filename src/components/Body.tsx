

import React from 'react';

import ProfilePage from '../pages/ProfilePage';
import AwardAndCertificatePage from '../pages/AwardAndCertificatePage';
import ExperiancePage from '../pages/Experiance';
import ProjectPage from '../pages/ProjectPage';
import ProjectFeaturePage from '../pages/FeatureProject';
import SkillPage from '../pages/SkillPage';
import QAPage  from '../pages/QA';


const Body: React.FC = () => {
    return (

        <main className="main">
            <ProfilePage />
            <AwardAndCertificatePage />
            <ExperiancePage />
            <ProjectPage />
            <ProjectFeaturePage />
            <SkillPage />
            <QAPage />
        </main>

    )
}

export default Body;