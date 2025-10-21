import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaLock } from 'react-icons/fa';
import '../styles/Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="nav-title">
                <Link to="/" className="nav-link">
                    <img src="/mdf-horizontal-logo.svg" alt="mdf horizontal logo" className="nav-logo" />
                </Link>
            </div>
            <div className="nav-right">
                <Link to="/">Home</Link>
                <Link to="/projects">Projects</Link>
                <div className="social-links">
                    <a href="https://www.linkedin.com/in/maddox-franklin-781096342/" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin />
                    </a>
                    <a href="https://github.com/MadFrank-2006" target="_blank" rel="noopener noreferrer">
                        <FaGithub />
                    </a>
                    <Link to="/admin" className="admin-button">
                        <FaLock />
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;