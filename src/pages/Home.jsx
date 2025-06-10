import React, { useState, useEffect } from 'react';
import '../styles/Home.css';
import { useNavigate } from 'react-router-dom';
import ProjectCard from "../components/ProjectCard"

const projects = [
    {
        title:"Resident Evil 4",
        description: "My goat Leon Kennedy is a one man army, Las Plagas is lightwork",
        image:"re4_cover.jpg",
        tags: ["React", "Firebase"]
    },
    {
        title:"Resident Evil 2",
        description:"Game so goated on my life",
        image:"re2_cover.jpg",
        tags: ["Survival", "Horror"]
    },
    {
        title:"Resident Evil Requiem",
        description:"Resident Evil Requiem is the ninth title in the mainline Resident Evil series. Prepare to escape death in a heart-stopping experience that will chill you to your core.",
        image:"re9_cover.jpg",
        tags: ["Horror", "Action"]
    },
    {
        title:"Resident Evil 6",
        description:"RE6 is an action-adventure game that follows multiple characters, including Leon Kennedy and Chris Redfield, as they fight against a global bioterrorist threat.",
        image:"re6_cover.jpg",
        tags: ["Action", "Adventure"]
    },
    {
        title:"Resident Evil 3",
        description:"RE3 is a remake of the classic survival horror game, Resident Evil 3: Nemesis. It features updated graphics, gameplay mechanics, and a reimagined story that follows Jill Valentine as she tries to escape Raccoon City during the T-Virus outbreak.",
        image:"re3_cover.jpg",
        tags: ["Game Development", "Unity", "C#"]
    },
    {
        title:"Resident Evil 5",
        description:"Chris Redfield and Sheva Alomar team up to take down the bioterrorist organization known as Tricell in Africa.",
        image:"re5_cover.jpg",
        tags: ["Action", "Adventure"]
    },
    {
        title:"Resident Evil 0",
        description:"RE0 is a prequel to the original Resident Evil game, following Rebecca Chambers and Billy Coen as they uncover the origins of the T-Virus outbreak.",
        image:"re0_cover.avif",
        tags: ["Survival", "Horror"]
    },
    {
        title: "Resident Evil",
        description: "The original Resident Evil game that started it all, featuring Chris Redfield and Jill Valentine as they explore the Spencer Mansion and uncover the secrets of the Umbrella Corporation.",
        image: "re1_cover.jpg",
        tags: ["Survival", "Horror"]
    },
    {
        title: "Resident Evil Code: Veronica",
        description: "Claire Redfield raids an Umbrella Corporation facility in Paris in search of her brother, Chris Redfield. Discovered by Umbrella's security forces and eventually captured, Claire is imprisoned on Rockfort Island, a prison complex owned by the corporation, situated in the Southern Ocean. She is knocked unconscious after arriving. Sometime after her imprisonment, Claire wakes up and finds herself released by the man who captured her, and discovers that an outbreak of the T-virus has occurred. In the resulting chaos, she finds herself teaming up with Steve Burnside, another inmate seeking to escape.",
        image: "recv_cover.jfif",
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
            <div className="most-recent-projects">
                {projects.slice(0, 3).map((project, index) => (
                    <ProjectCard key={index} {...project}/>
                ))}
            </div>
        </section>
    </div>
    )
}

export default Home;
