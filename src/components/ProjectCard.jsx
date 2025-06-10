import React, { useState, useEffect } from 'react';
import '../styles/ProjectCard.css';
import { useNavigate } from 'react-router-dom';
import ProjectTags from "./ProjectTags";

function ProjectCard({title, description, image, tags = [], id}) {
    const navigate = useNavigate();

    const handleClick = () => {
        console.log("Navigating to project ID:", id);
        navigate(`/projects/${id}`);
    };

    return (
        <div className="project-cards" onClick={handleClick}>
            <div className="project-image">
                <img src={image} alt={title}/>
            </div>
            <div className="project-content">
                <h3>{title}</h3>
                <p className="clamp-3-lines">{description}</p>
                <div className="project-tags">
                    {tags.map((tag, index) => (
                        <ProjectTags key={index} tag={tag} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProjectCard;