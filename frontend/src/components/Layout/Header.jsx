import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          Appointment Booking
        </div>
        {user && (
          <div className="user-info">
            <span>Welcome, {user.name}</span>
            <span className="badge">{user.role}</span>
            <button onClick={logout} className="btn btn-secondary">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
