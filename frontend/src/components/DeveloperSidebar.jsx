import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

function DeveloperSidebar() {
  const location = useLocation();

  const menuItems = [
    { path: '/developer/dashboard', label: 'Dashboard' },
    { path: '/developer/projects', label: 'View Assigned Projects' },
    { path: '/developer/bugs', label: 'View Assigned Bugs' },
    { path: '/developer/profile', label: 'Profile' }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>BRAT</h3>
        <p className="role-badge">Developer</p>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={location.pathname === item.path ? 'active' : ''}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default DeveloperSidebar;

