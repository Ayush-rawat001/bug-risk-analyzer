import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

function TesterSidebar() {
  const location = useLocation();

  const menuItems = [
    { path: '/tester/dashboard', label: 'Dashboard' },
    { path: '/tester/projects', label: 'View Assigned Projects' },
    { path: '/tester/report-bug', label: 'Report Bug' },
    { path: '/tester/profile', label: 'Profile' }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>BRAT</h3>
        <p className="role-badge">Tester</p>
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

export default TesterSidebar;

