import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ManagerSidebar from '../components/ManagerSidebar';
import { getUser, removeUser } from '../utils/auth';
import { getProjects, getUsersByRole } from '../utils/api';
import './Dashboard.css';

function ManagerDashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    teamMembers: 0,
    pendingTasks: 0
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getUser();
    if (!currentUser || currentUser.role !== 'manager') {
      navigate('/login');
    } else {
      setUser(currentUser);
      fetchStats();
    }
  }, [navigate]);

  const fetchStats = async () => {
    try {
      const [projectsRes, developersRes, testersRes] = await Promise.all([
        getProjects(),
        getUsersByRole('developer'),
        getUsersByRole('tester')
      ]);

      const projects = projectsRes.data;
      const totalProjects = projects.length;
      const activeProjects = projects.filter(p => p.status === 'active').length;
      const teamMembers = developersRes.data.length + testersRes.data.length;

      setStats({
        totalProjects,
        activeProjects,
        teamMembers,
        pendingTasks: 0 // Placeholder for now
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
      <ManagerSidebar />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Manager Dashboard</h1>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
        <div className="dashboard-body">
          <div className="welcome-section">
            <h2>Welcome, {user.name}!</h2>
            <p className="profile-id">Profile ID: {user.profileId}</p>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Projects</h3>
              <p className="stat-number">{stats.totalProjects}</p>
            </div>
            <div className="stat-card">
              <h3>Active Projects</h3>
              <p className="stat-number">{stats.activeProjects}</p>
            </div>
            <div className="stat-card">
              <h3>Team Members</h3>
              <p className="stat-number">{stats.teamMembers}</p>
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

export default ManagerDashboard;

