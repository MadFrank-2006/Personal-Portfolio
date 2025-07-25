import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ProjectDetail.css';
import { projects } from "../data/projects";

function ProjectDetail() {

    const { id } = useParams();
    const project = projects.find((project) => project.id === parseInt(id));

    if (!project) {
        return <div>Project not found</div>;
    }

    function ProjectTags({tag}) {
        return (
            <div className="tag">{tag}</div>
        )
    }

    return (
        <div className="project-detail">
            <div className="project-header">
                <h1>{project.title}</h1>
            </div>
            <div className="project-image">
                <img src={`/${project.image}`} alt={project.title} />
            </div>
            <div className="project-content">
                <section>
                    <h2>About This Project</h2>
                    <p>{project.description}</p>
                </section>
                <section>
                    <h2>Technologies Used</h2>
                    <div className="project-tags">
                        {project.tags.map((tag, index) => (
                            <ProjectTags key={index} tag={tag} />
                        ))}
                    </div>
                </section>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                    Visit Project
                </a>
            </div>
        </div>
    )
}

export default ProjectDetail;