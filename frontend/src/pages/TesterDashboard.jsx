import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TesterSidebar from '../components/TesterSidebar';
import { getUser, removeUser } from '../utils/auth';
import './Dashboard.css';

function TesterDashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getUser();
    if (!currentUser || currentUser.role !== 'tester') {
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
      <TesterSidebar />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Tester Dashboard</h1>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
        <div className="dashboard-body">
          <div className="welcome-section">
            <h2>Welcome, {user.name}!</h2>
            <p className="profile-id">Profile ID: {user.profileId}</p>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Assigned Projects</h3>
              <p className="stat-number">-</p>
            </div>
            <div className="stat-card">
              <h3>Bugs Reported</h3>
              <p className="stat-number">-</p>
            </div>
            <div className="stat-card">
              <h3>Pending Reviews</h3>
              <p className="stat-number">-</p>
            </div>
            <div className="stat-card">
              <h3>Critical Bugs</h3>
              <p className="stat-number">-</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TesterDashboard;

