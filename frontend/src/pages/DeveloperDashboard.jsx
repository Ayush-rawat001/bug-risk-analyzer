import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeveloperSidebar from '../components/DeveloperSidebar';
import { getUser, removeUser } from '../utils/auth';
import { getBugsByDeveloper, getProjectsByDeveloper } from '../utils/api';
import './Dashboard.css';

function DeveloperDashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    assignedBugs: 0,
    resolvedBugs: 0,
    activeProjects: 0,
    pendingTasks: 0
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getUser();
    if (!currentUser || currentUser.role !== 'developer') {
      navigate('/login');
    } else {
      setUser(currentUser);
      fetchStats(currentUser.profileId);
    }
  }, [navigate]);

  const fetchStats = async (developerId) => {
    try {
      const [bugsRes, projectsRes] = await Promise.all([
        getBugsByDeveloper(developerId),
        getProjectsByDeveloper(developerId)
      ]);

      const bugs = bugsRes.data;
      const projects = projectsRes.data;
      
      const assignedBugs = bugs.length;
      const resolvedBugs = 0; // Placeholder - no status field yet
      const activeProjects = projects.filter(p => p.status === 'active').length;

      setStats({
        assignedBugs,
        resolvedBugs,
        activeProjects,
        pendingTasks: assignedBugs // Using assigned bugs as pending tasks for now
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
              <p className="stat-number">{stats.assignedBugs}</p>
            </div>
            <div className="stat-card">
              <h3>Resolved Bugs</h3>
              <p className="stat-number">{stats.resolvedBugs}</p>
            </div>
            <div className="stat-card">
              <h3>Active Projects</h3>
              <p className="stat-number">{stats.activeProjects}</p>
            </div>
            <div className="stat-card">
              <h3>Pending Tasks</h3>
              <p className="stat-number">{stats.pendingTasks}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeveloperDashboard;

