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

        let data = {
            title: formData.title.trim(),
            description: formData.description.trim(),
            tags: formData.tags.split(",").map(tag => tag.trim()).filter(Boolean),
            url: formData.url.trim(),
            featured: formData.featured
        };

        try {
            if (isEditing) {
                await updateProject(editId, data);
                setProjects(prev =>
                    prev.map(p => p.id === editId ? {...p, ...data} : p)
                );
                alert("Project updated");
            } else {
                const newId = await createProject(data);
                setProjects(prev => [...prev, {id: newId, ...data}]);
                alert("Project created");
            }
        } catch (err) {
            console.error("Error saving project:", err);
            alert("Something went wrong.");
        }

        setFormData({
            title: "",
            description: "",
            tags: "",
            url: "",
            featured: false,
            image: ""
        });

        setFile(null);
        setIsEditing(false);
        setEditId(null);
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
        setFormData({
            title: proj.title || "",
            description: proj.description || "",
            tags: proj.tags?.join(", ") || "",
            url: proj.url || "",
            featured: proj.featured || false,
            image: proj.image || ""
        });

        setEditId(proj.id);
        setIsEditing(true);
    }

    const handleLogout = () => {
        signOut(auth)
        .then(() => {
            console.log("Logged out successfully");
        })
        .catch((error) => {
            console.error("Error logging out: ", error);
        });
    }

    const [ formData, setFormData ] = useState({
        title: "",
        description: "",
        tags: "",
        url: "",
        featured: false,
        image: ""
    });

    const [isEditing, setIsEditing] = useState(false);

    const [file, setFile] = useState(null);

    const [editId, setEditId] = useState(null);


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
                    <h2>{isEditing ? "Edit Project" : "Add Project"}</h2>
                    <input 
                        name="title" 
                        placeholder="Title" 
                        value={formData.title} 
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <input
                        name="tags"
                        placeholder="Comma-separated tags"
                        value={formData.tags}
                        onChange={handleChange}
                    />
                    <input
                        name="url"
                        placeholder="Url to project if applicable"
                        value={formData.url}
                        onChange={handleChange}
                    />
                    <input 
                        type="file"
                        accept="image/*"
                        onChange={e => setFile(e.target.files?.[0] || null)}
                    />
                    <label>
                        <input
                            type="checkbox"
                            name="featured"
                            checked={formData.featured}
                            onChange={handleChange}
                        />
                    </label>

                    <div className="submitButton">
                        <button type ="submit">{isEditing ? "Save Changes" : "Create Project"}</button>
                    </div>
                </form>
            </div>
            <div className="project-list">
                <h2>All Projects</h2>
                {projects.length === 0 ? (
                    <p>No projects yet.</p>
                ) : (
                    projects.map(p => (
                        <div key={p.id} className="project-item">
                            <h3>{p.title} {p.featured && <span>(Featured)</span>}</h3>
                            <p>{p.description}</p>
                            
                            {p.tags && (
                                <p><strong>Tags:</strong> {p.tags.join(", ")}</p>
                            )}

                            {p.image && (
                                <img 
                                    src={p.image} 
                                    alt={p.title} 
                                    style={{ width: "150px", height: "auto" }}
                                />
                            )}
                            
                            <div className="actions">
                                <button onClick={() => handleEdit(p)}>Edit</button>
                                <button onClick={() => handleDelete(p.id)}>Delete</button>
                                <button 
                                    onClick={() => handleSetFeatured(p.id)}
                                    disabled={pendingId === p.id}
                                >
                                    {p.featured ? "Unset Featured" : "Set Featured"}
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;