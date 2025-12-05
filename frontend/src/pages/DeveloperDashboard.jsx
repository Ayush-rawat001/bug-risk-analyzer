import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeveloperSidebar from '../components/DeveloperSidebar';
import { getUser, removeUser } from '../utils/auth';
import './Dashboard.css';

function DeveloperDashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getUser();
    if (!currentUser || currentUser.role !== 'developer') {
      navigate('/login');
    } else {
      setUser(currentUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    removeUser();
    navigate('/login');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="dashboard-container">
      <DeveloperSidebar />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Developer Dashboard</h1>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
        <div className="dashboard-body">
          <div className="welcome-section">
            <h2>Welcome, {user.name}!</h2>
            <p className="profile-id">Profile ID: {user.profileId}</p>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Assigned Bugs</h3>
              <p className="stat-number">-</p>
            </div>
            <div className="stat-card">
              <h3>Resolved Bugs</h3>
              <p className="stat-number">-</p>
            </div>
            <div className="stat-card">
              <h3>Active Projects</h3>
              <p className="stat-number">-</p>
            </div>
            <div className="stat-card">
              <h3>Pending Tasks</h3>
              <p className="stat-number">-</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeveloperDashboard;

