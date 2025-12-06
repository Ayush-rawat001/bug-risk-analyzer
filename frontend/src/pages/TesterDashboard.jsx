import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TesterSidebar from '../components/TesterSidebar';
import { getUser, removeUser } from '../utils/auth';
import { getProjectsByTester, getBugsByTester } from '../utils/api';
import './Dashboard.css';

function TesterDashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    assignedProjects: 0,
    bugsReported: 0,
    pendingReviews: 0,
    criticalBugs: 0
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getUser();
    if (!currentUser || currentUser.role !== 'tester') {
      navigate('/login');
    } else {
      setUser(currentUser);
      fetchStats(currentUser.profileId);
    }
  }, [navigate]);

  const fetchStats = async (testerId) => {
    try {
      const [projectsRes, bugsRes] = await Promise.all([
        getProjectsByTester(testerId),
        getBugsByTester(testerId)
      ]);

      const projects = projectsRes.data;
      const bugs = bugsRes.data;
      
      const assignedProjects = projects.length;
      const bugsReported = bugs.length;
      const criticalBugs = bugs.filter(bug => bug.severity === 'critical').length;
      const pendingReviews = 0; // Placeholder for now

      setStats({
        assignedProjects,
        bugsReported,
        pendingReviews,
        criticalBugs
      });
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    removeUser();
    navigate('/login');
  };

  if (!user || loading) return <div>Loading...</div>;

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
              <p className="stat-number">{stats.assignedProjects}</p>
            </div>
            <div className="stat-card">
              <h3>Bugs Reported</h3>
              <p className="stat-number">{stats.bugsReported}</p>
            </div>
            <div className="stat-card">
              <h3>Pending Reviews</h3>
              <p className="stat-number">{stats.pendingReviews}</p>
            </div>
            <div className="stat-card">
              <h3>Critical Bugs</h3>
              <p className="stat-number">{stats.criticalBugs}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TesterDashboard;

