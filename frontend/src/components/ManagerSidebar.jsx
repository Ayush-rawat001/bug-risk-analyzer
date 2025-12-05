import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

function ManagerSidebar() {
  const location = useLocation();

  const menuItems = [
    { path: '/manager/dashboard', label: 'Dashboard' },
    { path: '/manager/create-project', label: 'Create Project' },
    { path: '/manager/projects', label: 'View Projects' },
    { path: '/manager/profile', label: 'Profile' }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>BRAT</h3>
        <p className="role-badge">Manager</p>
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

export default ManagerSidebar;

