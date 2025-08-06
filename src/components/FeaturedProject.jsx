import React, { useState, useEffect } from 'react';
import ProjectTags from "./ProjectTags";
import { useNavigate, useParams } from 'react-router-dom';

function FeaturedProject({ title, description, image, tags, id }) {
    console.log("tags prop:", tags);

    const navigate = useNavigate();

    const handleClick = () => {
        console.log("Navigating to project ID:", id);
        navigate(`/projects/${id}`);
    };

    return (
        <div className="project-card" onClick={handleClick}>
                <img src={image} alt="RE3 Cover" className="featured-image" />
                <div className="project-details">
                    <h3>{title}</h3>
                    <p>{description}
                    </p>
                    <div className="project-tags">
                        {tags && tags.map((tag, index) => (
                            <ProjectTags key={index} tag={tag} />
                        ))}
                    </div>
                </div>
            </div>
    )
}

export default FeaturedProject;