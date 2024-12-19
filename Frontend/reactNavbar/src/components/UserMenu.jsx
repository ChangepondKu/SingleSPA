import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { User, Settings, LogOut } from 'lucide-react';
import { navigateToUrl } from 'single-spa';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';



const UserMenu = ({ username }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleProfileClick = () => {
    navigateToUrl('/profile');
    setShow(false);
  };

  const handleLogout = () => {
    // Handle logout logic here
    navigateToUrl('/auth/signin');
    sessionStorage.clear();
    // Assuming you have a key named 'isAuthenticated' in localStorage
    localStorage.removeItem('isAuthenticated');

    // localStorage.clear();
    Cookies.remove("authToken");
    dispatch({
      type: 'user/logout'
    });
    setShow(false);
  };

  return (
    <Dropdown show={show} onToggle={(isOpen) => setShow(isOpen)} align="end">
      <Dropdown.Toggle
        variant="link"
        className="nav-link text-white text-decoration-none d-flex align-items-center gap-2"
        id="user-menu-dropdown"
      >
        <div className="d-flex align-items-center">
          <User size={20} className="text-white me-2" />
          <span className="d-none d-md-inline text-white">{username}</span>
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={handleProfileClick}>
          <User size={18} className="me-2" />
          Profile
        </Dropdown.Item>
        <Dropdown.Item onClick={handleLogout}>
          <LogOut size={18} className="me-2" />
          Sign Out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserMenu;