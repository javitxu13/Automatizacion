import React from 'react';
import Navbar from './Navbar'; // Adjust the import path as needed
import Home from '../page/Home'; // Adjust the import path as needed

function Dashboard() {
    return (
        <div>
            <Navbar />
            <Home />

            <div className="dashboard-content">
                <h1>Dashboard</h1>
                <p>Welcome to your dashboard.</p>
            </div>
        </div>
    );
}

export default Dashboard;
