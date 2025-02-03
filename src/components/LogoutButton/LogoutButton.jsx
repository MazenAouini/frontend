import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import './LogoutButton.css';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/adminlogin');
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      <FaSignOutAlt /> Logout
    </button>
  );
};

export default LogoutButton; 