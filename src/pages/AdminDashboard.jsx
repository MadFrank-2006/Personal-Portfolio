import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjects, createProject, updateProject, deleteProject, setFeatured } from "../data/api";
import { getAuth, signOut } from "firebase/auth";
import "../styles/Admin.css";

function AdminDashboard() {
    const auth = getAuth();
    const [projects, setProjects] = useState([]);
    const [pendingId, setPendingId] = useState(null);

    useEffect(() => {
        (async () => setProjects(await getProjects()))();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!formData.title.trim()) {
            alert("Title is required");
            return;
        }

        
    }

    const handleSetFeatured = async (id) => {
        try {
            setPendingId(id);
            await setFeatured(id);
            setProjects(prev => prev.map(p => p.id === id ? { ...p, featured: p.id === id } : p));
        } finally {
            setPendingId(null);
        }
    }

    const handleDelete = async (id) => {
        if (!confirm("Delete this project?")) return;
        try {
            setPendingId(id);
            await deleteProject(id);
            setProjects(prev => prev.filter(p => p.id !== id));
        } finally {
            setPendingId(null);
        }
    }

    const handleEdit = (proj) => {

    }

    const handleLogout = () => {
        signOut(auth)
        .then(() => {
            console.log("Logged out successfully");
        })
        .catch((error) => {
            console.error("Error logging out: ", error);
        });
    };

    const [ formData, setFormData ] = useState({
        title: "",
        description: "",
        tags: "",
        url: "",
        featured: false,
        image: ""
    });

    const isEditing = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    }



    return (
        <div>
            <div className="admin-header">
                <h1>Admin Dashboard</h1>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
            <div className="admin-form">
                <form onSubmit={handleSubmit}>

                </form>
            </div>
        </div>
    );
}

export default AdminDashboard;