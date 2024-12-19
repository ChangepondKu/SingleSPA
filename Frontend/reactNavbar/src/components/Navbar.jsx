import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';
import { User } from 'lucide-react';
import UserMenu from './UserMenu';

const Navbar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  // const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated')) ?? false;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get user data from Redux store
  const user = useSelector((state) => state?.user);
  const name = user?.name || '';

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const handleLogout = () => {
    dispatch({ type: 'user/logout' });
    navigate('/auth/signin');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <span className="brand-text">NewTech</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/home" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/services" className="nav-link">
                Services
              </Link>
            </li>
            {/* {
              isAuthenticated ? */}
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link">
                    Dashboard
                  </Link>
                </li>
                {/* :
                null
            } */}
            <li className="nav-item">
              {user?.name ? (
                <UserMenu username={name} />
              ) : (
                <button
                  className="btn btn-outline-light ms-2"
                  onClick={() => navigate('/auth/signin')}
                >
                  Login
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
