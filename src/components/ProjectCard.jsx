import React, { useState, useEffect } from 'react';
import '../styles/ProjectCard.css';
import { useNavigate } from 'react-router-dom';

function ProjectTags({tag}) {
    return (
        <div className="tag">{tag}</div>
    )
}

function ProjectCard({title, description, image, tags}) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/projects/${id}');
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