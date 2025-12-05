import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../utils/auth';
import ManagerSidebar from '../components/ManagerSidebar';
import TesterSidebar from '../components/TesterSidebar';
import DeveloperSidebar from '../components/DeveloperSidebar';
import './Profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getUser();
    if (!currentUser) {
      navigate('/login');
    } else {
      setUser(currentUser);
    }
  }, [navigate]);

  const getSidebar = () => {
    if (!user) return null;
    if (user.role === 'manager') return <ManagerSidebar />;
    if (user.role === 'tester') return <TesterSidebar />;
    if (user.role === 'developer') return <DeveloperSidebar />;
    return null;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="dashboard-container">
      {getSidebar()}
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Profile</h1>
        </div>
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-avatar">
              <span>{user.name.charAt(0).toUpperCase()}</span>
            </div>
            <h2>{user.name}</h2>
            <p className="profile-role">{user.role.toUpperCase()}</p>
          </div>
          <div className="profile-info">
            <div className="info-item">
              <label>Name</label>
              <p>{user.name}</p>
            </div>
            <div className="info-item">
              <label>Email</label>
              <p>{user.email}</p>
            </div>
            <div className="info-item">
              <label>Role</label>
              <p>{user.role}</p>
            </div>
            <div className="info-item">
              <label>Profile ID</label>
              <p>{user.profileId}</p>
            </div>
            <div className="info-item">
              <label>Joined Date</label>
              <p>{formatDate(user.createdAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

