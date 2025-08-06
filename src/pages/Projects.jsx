import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Projects.css';
import ProjectCard from "../components/ProjectCard";
import FeaturedProject from "../components/FeaturedProject";
import { getProjects } from "../data/api";

function Projects() {

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
            Promise.all(imagePromises).then(() => { setLoading(false); });
        });
    }, []);


    if (loading) {
        return <div>Loading...</div>;
    }
    
    const featuredProject = projects.find(project => project.featured);

    return (
       <div className="projects">
            <h1>My Projects</h1>
            <div className="project-grid">
                <div className="featured-project">
                    <div className="featured-badge">Featured</div>
                    {featuredProject && <FeaturedProject key={featuredProject.id} {...featuredProject}/>}
                </div>

                {projects.map((project) => (
                    !project.featured && <ProjectCard key={project.id} {...project}/>
                ))}
            </div>
       </div> 
    );
}

export default Projects;