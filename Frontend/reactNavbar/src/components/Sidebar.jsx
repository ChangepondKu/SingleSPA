import React from 'react';
import '../styles/sidebar.css';

function Sidebar() {
  const menuItems = [
    { title: 'Home', icon: '🏠' },
    { title: 'About', icon: 'ℹ️' },
    { title: 'Services', icon: '🛠️' },
    { title: 'Dashboard', icon: '📊' },
  ];

  return (
    <div className="sidebar">
      <div className="logo">
        <h2>My App</h2>
      </div>
      <nav>
        {menuItems.map((item) => (
          <div key={item.title} className="menu-item">
            <span className="icon">{item.icon}</span>
            <span>{item.title}</span>
          </div>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;