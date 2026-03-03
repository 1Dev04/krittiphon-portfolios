"use client"

import React from 'react';
import '../theme/HighHomePage.css';
import Typed from 'typed.js';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';

const HomePage: React.FC = () => {

    React.useEffect(() => {
        const typed = new Typed(".multiple-text", {
            strings: [
                "Full Stack Developer",
                "Game Developer",
                "Web Developer",
                "Mobile Developer",
            ],
            typeSpeed: 120,
            backSpeed: 200,
            loop: true,
        });
        return () => {
            typed.destroy();
        };
    }, []);


    return (
        <section id="home" className="home">

            <div className="class-body">
                <div className="logo">
                    <h1>P<img src="https://res.cloudinary.com/dag73dhpl/image/upload/v1772370287/Gemini_Generated_Image_ycpubfycpubfycpu-removebg-preview_1_n8ccjy.png" className='class-logo' alt="logo" />RTFOLIOS</h1>
                </div>
                <h2>Krittiphon Yoonaitham</h2>
                <h3 className="auto-typing">
                    I’m a <span className="multiple-text"></span>
                </h3>
                <div className="class-social">
                    <a href="https://github.com/1Dev04" target="_blank" rel="noopener noreferrer">
                        <GitHubIcon />
                    </a>

                    <a href="https://www.youtube.com/@UR1MOSS" target="_blank" rel="noopener noreferrer">
                        <YouTubeIcon />
                    </a>

                    <a href="https://www.instagram.com/1devmoz/" target="_blank" rel="noopener noreferrer">
                        <InstagramIcon />
                    </a>

                    <a href="https://www.facebook.com/krittiphon.yoonaitham.9" target="_blank" rel="noopener noreferrer">
                        <FacebookIcon />
                    </a>

                    <a href="https://www.linkedin.com/in/krittiphon-yoonaitham-a291482b1/" target="_blank" rel="noopener noreferrer">
                        <LinkedInIcon />
                    </a>
                </div>

            </div>

         

        </section>

    )
}

export default HomePage;