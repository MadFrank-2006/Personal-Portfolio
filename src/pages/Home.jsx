import React, { useState, useEffect } from 'react';
import '../styles/Home.css';
import { useNavigate } from 'react-router-dom';
import ProjectCard from "../components/ProjectCard"

const projects = [
    {
        title:"Resident Evil 4",
        description: "My goat Leon Kennedy is a one man army, Las Plagas is lightwork",
        image:"re3_cover_1.png",
        tags: ["React", "Firebase"]
    },
    {
        title:"Resident Evil 2",
        description:"Game so goated on my life",
        image:"re3_cover_1.png",
        tags: ["Survival", "Horror"]
    }
]

function Home() {
    return (
        <div className="home">
        <section className="hero">
            <div className="welcome">
                <h1>Hi, I'm Maddox Franklin</h1>
                <p>Welcome to my personal portfolio website built with React! 
                    I'm an ambitious computer science student at Indiana University Bloomington. 
                    I'm interested in full stack development and artificial intelligence. <br />
                    <br />
                    If you happened to stumble upon this site, as of now, this website is my only project, so there's not any actual data. I will be adding all my future projects here though, so keep an eye out!</p>
            </div>
            <img src="/headshotOutline.png" alt="Maddox Franklin" className="profile-image" />
        </section>

        <section className="featured-project">
            <h2>Featured Project</h2>
            <div className="project-card">
                <img src="/re3_cover_1.png" alt="RE3 Cover" className="featured-image" />
                <div className="project-details">
                    <h3>Resident Evil 3</h3>
                    <p>RE3 is a remake of the classic survival horror game, Resident Evil 3: Nemesis. 
                        It features updated graphics, gameplay mechanics, and a reimagined story that follows Jill Valentine as she tries to escape Raccoon City during the T-Virus outbreak.
                    </p>
                    <div className="project-tags">
                        <span className="tag">Game Development</span>
                        <span className="tag">Unity</span>
                        <span className="tag">C#</span>
                    </div>
                </div>
            </div>
        </section>

        <section className="recent-projects">
            <h2>Recent Projects</h2>
            <div className="recent-projects">
                {projects.slice(0, 3).map((project, index) => (
                    <ProjectCard key={index} {...project}/>
                ))}
            </div>
        </section>
    </div>
    )
}

export default Home;
