import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth APIs
export const registerUser = (userData) => api.post('/auth/register', userData);
export const loginUser = (credentials) => api.post('/auth/login', credentials);

// Project APIs
export const createProject = (projectData) => api.post('/projects/create', projectData);
export const getProjects = () => api.get('/projects');
export const getProjectsByDeveloper = (developerId) => api.get(`/projects/developer/${developerId}`);
export const getProjectsByTester = (testerId) => api.get(`/projects/tester/${testerId}`);

// Bug APIs
export const createBug = (bugData) => api.post('/bugs/create', bugData);
export const getBugs = () => api.get('/bugs');
export const getBugsByDeveloper = (developerId) => api.get(`/bugs/developer/${developerId}`);
export const getBugsByTester = (testerId) => api.get(`/bugs/tester/${testerId}`);

// User APIs
export const getUsersByRole = (role) => api.get(`/users/role/${role}`);
export const getUserById = (id) => api.get(`/users/${id}`);

export default api;

