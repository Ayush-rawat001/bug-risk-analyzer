import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeveloperSidebar from '../components/DeveloperSidebar';
import { getUser } from '../utils/auth';
import { getProjectsByDeveloper } from '../utils/api';
import './ViewProjects.css';

function DeveloperProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = getUser();
    if (!user || user.role !== 'developer') {
      navigate('/login');
      return;
    }

    const fetchProjects = async () => {
      try {
        const response = await getProjectsByDeveloper(user.profileId);
        setProjects(response.data);
      } catch (err) {
        console.error('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
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

  return (
    <div className="dashboard-container">
      <DeveloperSidebar />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Assigned Projects</h1>
        </div>
        <div className="projects-container">
          {loading ? (
            <p>Loading projects...</p>
          ) : projects.length === 0 ? (
            <p>No assigned projects found.</p>
          ) : (
            <div className="projects-grid">
              {projects.map((project) => (
                <div key={project._id} className="project-card">
                  <h3>{project.projectName}</h3>
                  <p className="project-id">ID: {project.projectId}</p>
                  <p className="project-description">{project.description}</p>
                  <div className="project-details">
                    <p><strong>Tester:</strong> {project.testerId}</p>
                    <p><strong>Deadline:</strong> {formatDate(project.deadline)}</p>
                    <p><strong>Status:</strong> <span className={`status-badge ${project.status}`}>{project.status}</span></p>
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

export default DeveloperProjects;


