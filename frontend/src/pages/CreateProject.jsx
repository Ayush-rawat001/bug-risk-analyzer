import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ManagerSidebar from '../components/ManagerSidebar';
import { getUser } from '../utils/auth';
import { createProject, getUsersByRole } from '../utils/api';
import './Form.css';

function CreateProject() {
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    deadline: '',
    developer: '',
    tester: ''
  });
  const [developers, setDevelopers] = useState([]);
  const [testers, setTesters] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = getUser();
    if (!user || user.role !== 'manager') {
      navigate('/login');
      return;
    }

    // Fetch developers and testers
    const fetchUsers = async () => {
      try {
        const [devsRes, testersRes] = await Promise.all([
          getUsersByRole('developer'),
          getUsersByRole('tester')
        ]);
        setDevelopers(devsRes.data);
        setTesters(testersRes.data);
      } catch (err) {
        setError('Failed to load users');
      }
    };

    fetchUsers();
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

    try {
      await createProject(formData);
      setSuccess('Project created successfully!');
      setFormData({
        projectName: '',
        description: '',
        deadline: '',
        developer: '',
        tester: ''
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <ManagerSidebar />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Create Project</h1>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Project Name</label>
              <input
                type="text"
                name="projectName"
                value={formData.projectName}
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
              <label>Deadline</label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Developer</label>
              <select
                name="developer"
                value={formData.developer}
                onChange={handleChange}
                required
              >
                <option value="">Select Developer</option>
                {developers.map((dev) => (
                  <option key={dev._id} value={dev.profileId}>
                    {dev.profileId} - {dev.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Tester</label>
              <select
                name="tester"
                value={formData.tester}
                onChange={handleChange}
                required
              >
                <option value="">Select Tester</option>
                {testers.map((tester) => (
                  <option key={tester._id} value={tester.profileId}>
                    {tester.profileId} - {tester.name}
                  </option>
                ))}
              </select>
            </div>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            <button type="submit" disabled={loading} className="submit-button">
              {loading ? 'Creating...' : 'Create Project'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateProject;

