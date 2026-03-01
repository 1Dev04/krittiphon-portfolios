"use Client" 
import '../theme/HighNavbar.css';

const Navbar:React.FC = () => {
    return (
        <nav className="navbar">        
           
            <div className="menu">
                <a href="#home" className="class-home">Home</a>
                <a href="#about" className="class-about">About</a>
                <a href="#projects" className="class-projects">Projects</a>
                <a href="#skill" className="class-skills">Skills</a>
                <a href="#certificate" className="class-certificate">Certificates</a>
                <a href="#activity" className="class-activity">Activitys</a>
            </div>
        </nav>
    )
}

export default Navbar;