import Bug from '../models/Bug.js';
import Project from '../models/Project.js';
import { generateBugId } from '../utils/bugIdGenerator.js';
import { calculateRisk } from '../utils/riskCalculator.js';

// Create bug report (Tester)
export const createBug = async (req, res) => {
  try {
    const { bugTitle, description, severity, relatedProject, reportedBy } = req.body;

    if (!bugTitle || !description || !severity || !relatedProject || !reportedBy) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!['low', 'medium', 'high', 'critical'].includes(severity)) {
      return res.status(400).json({ message: 'Invalid severity level' });
    }

    // Generate bug ID
    const bugId = await generateBugId();

    // Calculate risk (placeholder for now)
    const riskScore = calculateRisk(severity, null, null);

    // Create bug
    const bug = await Bug.create({
      bugId,
      bugTitle,
      description,
      severity,
      relatedProject,
      reportedBy,
      riskScore
    });

    res.status(201).json({
      message: 'Bug reported successfully',
      bug
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all bugs
export const getBugs = async (req, res) => {
  try {
    const bugs = await Bug.find().sort({ createdAt: -1 });
    res.status(200).json(bugs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get bugs by developer (assigned projects)
export const getBugsByDeveloper = async (req, res) => {
  try {
    const { developerId } = req.params;
    // Get projects assigned to this developer
    const projects = await Project.find({ developerId });
    const projectIds = projects.map(p => p.projectId);
    
    // Get bugs for these projects
    const bugs = await Bug.find({ relatedProject: { $in: projectIds } });
    res.status(200).json(bugs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

