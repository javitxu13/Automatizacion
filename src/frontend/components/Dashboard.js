import React from 'react';
import Navbar from './Navbar'; // Adjust the import path as needed
import Home from '../page/Home'; // Adjust the import path as needed

function Dashboard() {
    return (
        <div>
            <Navbar />
            <Home />

            <div className="dashboard-content">
              
            </div>
        </div>
    );
}

export default Dashboard;
