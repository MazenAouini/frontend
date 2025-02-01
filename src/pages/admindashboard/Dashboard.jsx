import './Dashboard.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBox, FaShoppingCart, FaUsers, FaCog, FaChartLine, FaSignOutAlt } from 'react-icons/fa';
import api from '../../utils/axios';

const Dashboard = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    // Remove auth header
    delete api.defaults.headers.common['Authorization'];
    navigate('/adminlogin');
  };

  return (
    <div className="dashboard-container">
      <header className="header">
        <h1>Dashboard</h1>
        <nav>
          <button onClick={handleLogout} className="logout-button">
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </header>

      <aside className="sidebar">
        <ul>
          <li><a href="/dashboard/products"><FaBox /> Products</a></li>
          <li><a href="/dashboard/orders"><FaShoppingCart /> Orders</a></li>
          <li><a href="/dashboard/subscribers"><FaUsers /> Subscribers</a></li>
          <li><a href="/dashboard/analytics"><FaChartLine /> Analytics</a></li>
          <li><a href="/dashboard/settings"><FaCog /> Settings</a></li>
        </ul>
      </aside>

      <main className="main-content">
        <h2>Dashboard Overview</h2>
        <div className="cards">
          <div className="stats-card">
            <div className="stats-info">
              <h3>2,451</h3>
              <p>Total Products</p>
            </div>
            <FaBox size={24} color="#007bff" />
          </div>

          <div className="stats-card">
            <div className="stats-info">
              <h3>$12,345</h3>
              <p>Total Revenue</p>
            </div>
            <FaChartLine size={24} color="#28a745" />
          </div>

          <div className="stats-card">
            <div className="stats-info">
              <h3>845</h3>
              <p>New Orders</p>
            </div>
            <FaShoppingCart size={24} color="#ffc107" />
          </div>

          <div className="stats-card">
            <div className="stats-info">
              <h3>1,287</h3>
              <p>Active Subscribers</p>
            </div>
            <FaUsers size={24} color="#dc3545" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
