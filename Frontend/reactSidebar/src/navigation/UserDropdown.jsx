import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

const UserDropdown = ({ username, isCollapsed }) => {
  const dropdownRef = useRef(null);

  return (
    <div className="user-section dropdown">
      <button
        className="dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        ref={dropdownRef}
      >
        <FaUser className="icon" />
        {!isCollapsed && <span className="username">{username}</span>}
      </button>
      <ul className="dropdown-menu">
        <li>
          <Link to="/profile" className="dropdown-item">
            Profile
          </Link>
        </li>
        <li>
          <Link to="/logout" className="dropdown-item">
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UserDropdown;