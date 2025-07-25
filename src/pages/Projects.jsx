import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Projects.css';
import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import FeaturedProject from "../components/FeaturedProject";

function Projects() {
    return (
       <div className="projects">
            <h1>My Projects</h1>
            <div className="project-grid">
                <div className="featured-project">
                    <div className="featured-badge">Featured</div>
                    <FeaturedProject key={projects[4].id} {...projects[4]}/>
                </div>

                {projects.map((project) => (
                    project.id != 5 && <ProjectCard key={project.id} {...project}/>
                ))}
            </div>
       </div> 
    );
}

export default Projects;