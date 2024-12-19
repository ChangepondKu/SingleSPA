import { Link } from 'react-router-dom';

const NavItem = ({ path, icon, label, isCollapsed, onClick }) => {
  return (
    <Link
      to={path}
      className="nav-item d-flex align-items-center"
      title={isCollapsed ? label : ''}
      onClick={onClick}
    >
      <span className="icon">{icon}</span>
      <span className={`label ms-2 ${isCollapsed ? 'd-none' : 'd-block'}`}>
        {label}
      </span>
    </Link>
  );
};

export default NavItem;