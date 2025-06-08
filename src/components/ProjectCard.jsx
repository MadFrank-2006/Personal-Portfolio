import React, { useState, useEffect } from 'react';

function ProjectTags({tag}) {
    return (
        <div className="tag">{tag}</div>
    )
}

function ProjectCard({title, description, image, tags}) {
    return (
        <div className="project-card">
            <div className="project-image">
                <img src={image} alt={title}/>
            </div>
            <div className="project-content">
                <h1>{title}</h1>
                <p>{description}</p>
                <div className="project-tags">
                    {tags.map((tag, index) => (
                        <ProjectTags key={index} tag={tag} />
                    ))}
                </div>
            </div>
        </div>
    )
}