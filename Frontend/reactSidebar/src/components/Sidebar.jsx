import { useEffect, useRef } from 'react';
import { FaHome, FaTachometerAlt, FaCogs, FaBars } from 'react-icons/fa';
import NavItem from '../navigation/NavItem';
// import UserDropdown from '../navigation/UserDropdown';
import '../styles/sidebar.css'

const Sidebar = ({ isCollapsed, toggleSidebar, isLargeScreen }) => {
  const sidebarRef = useRef(null);

  const navItems = [
    { path: '/', icon: <FaHome />, label: 'Home' },
    { path: '/dashboard', icon: <FaTachometerAlt />, label: 'Dashboard' },
    { path: '/services', icon: <FaCogs />, label: 'Services' },
  ];

  // Handle clicks outside sidebar on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!isLargeScreen && 
          sidebarRef.current && 
          !sidebarRef.current.contains(event.target) && 
          !isCollapsed) {
        toggleSidebar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isLargeScreen, isCollapsed, toggleSidebar]);

  return (
    <div 
      ref={sidebarRef}
      className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isLargeScreen ? 'sidebar-desktop' : 'sidebar-mobile'}`}
    >
      <div className="sidebar-header">
        <button 
          className="toggle-btn d-flex align-items-center justify-content-center"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <FaBars />
        </button>
        <span className={`sidebar-title ${isCollapsed ? 'd-none' : 'd-block'}`}>
          App Name
        </span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavItem 
            key={item.path} 
            {...item} 
            isCollapsed={isCollapsed}
            onClick={() => !isLargeScreen && !isCollapsed && toggleSidebar()}
          />
        ))}
      </nav>

      {/* {user && (
        <UserDropdown 
          username={user.username} 
          isCollapsed={isCollapsed}
        />
      )} */}
    </div>
  );
};

export default Sidebar;