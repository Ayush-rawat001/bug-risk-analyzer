import Project from '../models/Project.js';
import { generateProjectId } from '../utils/projectIdGenerator.js';

// Create project (Manager only)
export const createProject = async (req, res) => {
  try {
    const { projectName, description, deadline, developer, tester } = req.body;

    if (!projectName || !description || !deadline || !developer || !tester) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Generate project ID
    const projectId = await generateProjectId();

    // Create project
    const project = await Project.create({
      projectId,
      projectName,
      description,
      deadline: new Date(deadline),
      developerId: developer,
      testerId: tester,
      status: 'active'
    });

    res.status(201).json({
      message: 'Project created successfully',
      project
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get projects by developer
export const getProjectsByDeveloper = async (req, res) => {
  try {
    const { developerId } = req.params;
    const projects = await Project.find({ developerId });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get projects by tester
export const getProjectsByTester = async (req, res) => {
  try {
    const { testerId } = req.params;
    const projects = await Project.find({ testerId });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

