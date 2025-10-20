import React, { useState, useEffect } from 'react';
import '../styles/Home.css';
import { useNavigate } from 'react-router-dom';
import ProjectCard from "../components/ProjectCard"
// import { projects } from "../data/projects";
import FeaturedProject from "../components/FeaturedProject";
import { getProjects } from "../data/api"

function Home() {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProjects().then(data => {
            setProjects(data);
            
            const imagePromises = data.map(project => {
                return new Promise(resolve => {
                    const img = new Image();
                    img.src = project.image;
                    img.onload = resolve;
                    img.onerror = resolve;
                });
            });
            Promise.all(imagePromises).then(() => {
                setLoading(false);
            });
        });
    }, []);

    if (loading) {
        return <div>Loading...</div>
    }

    const featuredProject = projects.find(project => project.featured);

    return (
        <div className="home">
        <section className="hero">
            <div className="welcome">
                <h1>Hi, I'm Maddox Franklin</h1>
                <p>Welcome to my personal portfolio website built with React! 
                    I'm an ambitious computer science student at Indiana University Bloomington. 
                    I'm interested in full stack development and artificial intelligence. <br />
                    <br />
                    If you happened to stumble upon this site, as of now, this website is my only project, so there's not much here. I will be adding all my future projects here though, so keep an eye out!</p>
            </div>
            <img src="/headshotOutline.png" alt="Maddox Franklin" className="profile-image" />
        </section>

        <section className="featured-project">
            <h2>Featured Project</h2>
    
            {featuredProject && <FeaturedProject key={featuredProject.id} {...featuredProject}/>}
        </section>

        <section className="recent-projects">
            <h2>Recent Projects</h2>
            <div className="most-recent-projects">
                {projects.slice(0, 3).map((project) => (
                    <ProjectCard key={project.id} {...project}/>
                ))}
            </div>
        </section>
    </div>
    )
}

export default Home;
