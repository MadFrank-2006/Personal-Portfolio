import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjects } from "../data/api";
import { getAuth, signOut } from "firebase/auth";

function AdminDashboard() {
    const auth = getAuth();

    const handleLogout = () => {
        signOut(auth)
        .then(() => {
            console.log("Logged out successfully");
        })
        .catch((error) => {
            console.error("Error logging out: ", error);
        });
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
    );
}

export default AdminDashboard;