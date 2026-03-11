

import React from 'react';

import ProfilePage from '../pages/ProfilePage';
import AwardAndCertificatePage from '../pages/AwardAndCertificatePage';
import ExperiancePage from '../pages/Experiance';
import ProjectPage from '../pages/ProjectPage';
import SkillPage from '../pages/SkillPage';
import ActivitiePage  from '../pages/ActivitePage';


const Body: React.FC = () => {
    return (

        <main className="main">
            <ProfilePage />
            <AwardAndCertificatePage />
            <ExperiancePage />
            <ProjectPage />
            <SkillPage />
            <ActivitiePage />
        </main>

    )
}

export default Body;