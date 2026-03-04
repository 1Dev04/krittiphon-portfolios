"use client"

import React from 'react';
import '../theme/HighAbout.css';

const AboutPage: React.FC = () => {
    const [lang, setlang] = React.useState<"en" | "th">('en');

    return (

        <section id="about" className="about">
            <div className="class-about">

                {/* LEFT SIDE */}
                <div className="class-sec1-about">
                    <div className="mage-frame">
                        <img
                            src="https://res.cloudinary.com/dag73dhpl/image/upload/v1772465219/Generated_Image_October_16_2025_-_8_59AM_m4qpvu.png"
                            alt="profile"
                        />
                        <span className="magic-circle"></span>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="class-sec2-about">
                    <h1>{lang === "en" ? `Profile ` : `ประวัติโดยย่อ`}</h1>


                    <p>{lang === "en"
                        ? ` I am a passionate and dedicated Full Stack Developer with a strong background in game development, web development, and mobile development. 
                        With a keen eye for detail and a commitment to delivering high-quality solutions, I thrive in dynamic and collaborative environments. 
                        My expertise spans across various technologies, allowing me to create innovative and efficient applications that meet the needs of users. I am constantly seeking new challenges and opportunities to grow as a developer, and I am excited to contribute my skills and creativity to impactful projects.`
                        : `ผมเป็นนักพัฒนา Full Stack ที่มีความมุ่งมั่นและทุ่มเท มีพื้นฐานที่แข็งแกร่งในด้านการพัฒนาเกม การพัฒนาเว็บไซต์ และการพัฒนาแอปพลิเคชันบนมือถือ
ด้วยความใส่ใจในรายละเอียดและความมุ่งมั่นในการส่งมอบโซลูชันคุณภาพสูง ผมจึงเติบโตได้ดีในสภาพแวดล้อมที่มีพลวัตและเน้นการทำงานร่วมกัน
ความเชี่ยวชาญของผม ครอบคลุมเทคโนโลยีที่หลากหลาย ทำให้ผมสามารถสร้างแอปพลิเคชันที่สร้างสรรค์และมีประสิทธิภาพซึ่งตอบสนองความต้องการของผู้ใช้ได้ ผมแสวงหาความท้าทายและโอกาสใหม่ๆ อย่างต่อเนื่องเพื่อพัฒนาตนเองในฐานะนักพัฒนา และผมตื่นเต้นที่จะนำทักษะและความคิดสร้างสรรค์ของผมไปใช้ในโครงการที่มีผลกระทบต่อสังคม`}
                    </p>

                    <div className="lang-toggle">
                        <button className={lang === "th" ? "active" : ""} onClick={() => setlang("th")}>TH</button>
                        <span>|</span>
                        <button className={lang === "en" ? "active" : ""} onClick={() => setlang("en")}>EN</button>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default AboutPage;