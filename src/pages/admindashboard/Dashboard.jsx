import React, { useState, useEffect } from "react";
import {  FaBox, FaChartLine, FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
import "./Dashboard.css";
import ProductList from '../../components/admin/ProductList';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('No authentication token found');
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const [statsResponse, activityResponse] = await Promise.all([
          axios.get('http://localhost:7000/api/admin/stats', config),
          axios.get('http://localhost:7000/api/admin/recent-activity', config)
        ]);

        setStats(statsResponse.data);
        setRecentActivity(activityResponse.data);
      } catch (error) {
        console.error('Dashboard Error:', error);
        setError(
          error.response?.data?.message || 
          error.message || 
          'Failed to fetch dashboard data'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon products">
                <FaBox />
              </div>
              <div className="stat-details">
                <h3>Products</h3>
                <p>{stats.totalProducts}</p>
                <span className="stat-label">In stock</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon orders">
                <FaShoppingCart />
              </div>
              <div className="stat-details">
                <h3>Orders</h3>
                <p>{stats.totalOrders}</p>
                <span className="stat-label">Last 30 days</span>
              </div>
            </div>
          </div>
        );
      case 'Products':
        return (
          <div>
            <ProductList />
          </div>
        );
      case 'orders':
        return <div></div>;
      default:
        return <div>Select a tab</div>;
    }
  };

  const getHeaderText = (tab) => {
    switch (tab) {
      case 'overview':
        return 'Dashboard Overview';
      case 'products':
        return 'Product Management';
      case 'orders':
        return 'Order Management';
      default:
        return 'Dashboard';
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <ErrorBoundary>
      <div className="admin-dashboard">
        <div className="dashboard-sidebar">
          <div className="sidebar-header">
            <h2>Admin Panel</h2>
          </div>
          <nav className="sidebar-nav">
            <button
              className={`nav-item ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              <FaChartLine /> Overview
            </button>
            <button
              className={`nav-item ${activeTab === "Products" ? "active" : ""}`}
              onClick={() => setActiveTab("Products")}
            >
              <FaBox /> Products
            </button>
            <button
              className={`nav-item ${activeTab === "orders" ? "active" : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              <FaShoppingCart /> Orders
            </button>
          </nav>
        </div>

        <div className="dashboard-main">
          <header className="dashboard-header">
            <h1>{getHeaderText(activeTab)}</h1>
            <div className="header-actions">
              <span className="date">{new Date().toLocaleDateString()}</span>
              <LogoutButton />
            </div>
          </header>

          <div className="dashboard-content">
            {renderContent()}

            <div className="recent-activity">
              <h2>Recent Activity</h2>
              <div className="activity-list">
                {recentActivity.map((activity) => (
                  <div key={activity.timestamp} className="activity-item">
                    <span className="activity-time">
                      {new Date(activity.timestamp).toLocaleString()}
                    </span>
                    <p>{activity.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Dashboard;