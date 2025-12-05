import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeveloperSidebar from '../components/DeveloperSidebar';
import { getUser } from '../utils/auth';
import { getBugsByDeveloper } from '../utils/api';
import './ViewBugs.css';

function DeveloperBugs() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = getUser();
    if (!user || user.role !== 'developer') {
      navigate('/login');
      return;
    }

    const fetchBugs = async () => {
      try {
        const response = await getBugsByDeveloper(user.profileId);
        setBugs(response.data);
      } catch (err) {
        console.error('Failed to load bugs');
      } finally {
        setLoading(false);
      }
    };

    fetchBugs();
  }, [navigate]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getSeverityColor = (severity) => {
    const colors = {
      low: '#28a745',
      medium: '#ffc107',
      high: '#fd7e14',
      critical: '#dc3545'
    };
    return colors[severity] || '#6c757d';
  };

  return (
    <div className="dashboard-container">
      <DeveloperSidebar />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Assigned Bugs</h1>
        </div>
        <div className="bugs-container">
          {loading ? (
            <p>Loading bugs...</p>
          ) : bugs.length === 0 ? (
            <p>No assigned bugs found.</p>
          ) : (
            <div className="bugs-grid">
              {bugs.map((bug) => (
                <div key={bug._id} className="bug-card">
                  <h3>{bug.bugTitle}</h3>
                  <p className="bug-id">ID: {bug.bugId}</p>
                  <p className="bug-description">{bug.description}</p>
                  <div className="bug-details">
                    <p>
                      <strong>Severity:</strong>{' '}
                      <span className="severity-badge" style={{ backgroundColor: getSeverityColor(bug.severity) }}>
                        {bug.severity.toUpperCase()}
                      </span>
                    </p>
                    <p><strong>Project:</strong> {bug.relatedProject}</p>
                    <p><strong>Reported By:</strong> {bug.reportedBy}</p>
                    <p><strong>Risk Score:</strong> {bug.riskScore || 'N/A'}</p>
                    <p><strong>Created:</strong> {formatDate(bug.createdAt)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DeveloperBugs;

