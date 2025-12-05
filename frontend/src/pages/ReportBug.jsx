import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TesterSidebar from '../components/TesterSidebar';
import { getUser } from '../utils/auth';
import { createBug, getProjectsByTester } from '../utils/api';
import './Form.css';

function ReportBug() {
  const [formData, setFormData] = useState({
    bugTitle: '',
    description: '',
    severity: 'low',
    relatedProject: ''
  });
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = getUser();
    if (!user || user.role !== 'tester') {
      navigate('/login');
      return;
    }

    // Fetch assigned projects
    const fetchProjects = async () => {
      try {
        const response = await getProjectsByTester(user.profileId);
        setProjects(response.data);
      } catch (err) {
        setError('Failed to load projects');
      }
    };

    fetchProjects();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const user = getUser();

    try {
      await createBug({
        ...formData,
        reportedBy: user.profileId
      });
      setSuccess('Bug reported successfully!');
      setFormData({
        bugTitle: '',
        description: '',
        severity: 'low',
        relatedProject: ''
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to report bug');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <TesterSidebar />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Report Bug</h1>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Bug Title</label>
              <input
                type="text"
                name="bugTitle"
                value={formData.bugTitle}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                required
              />
            </div>
            <div className="form-group">
              <label>Severity</label>
              <select
                name="severity"
                value={formData.severity}
                onChange={handleChange}
                required
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            <div className="form-group">
              <label>Related Project</label>
              <select
                name="relatedProject"
                value={formData.relatedProject}
                onChange={handleChange}
                required
              >
                <option value="">Select Project</option>
                {projects.map((project) => (
                  <option key={project._id} value={project.projectId}>
                    {project.projectId} - {project.projectName}
                  </option>
                ))}
              </select>
            </div>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            <button type="submit" disabled={loading} className="submit-button">
              {loading ? 'Reporting...' : 'Report Bug'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReportBug;

