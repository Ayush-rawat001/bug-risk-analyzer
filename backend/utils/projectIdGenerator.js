// Generate project IDs like PROJ001, PROJ002, etc.
import Project from '../models/Project.js';

export const generateProjectId = async () => {
  const projects = await Project.find();
  const numbers = projects
    .map(project => {
      const match = project.projectId.match(/\d+/);
      return match ? parseInt(match[0]) : 0;
    })
    .filter(num => num > 0);
  
  const maxNum = numbers.length > 0 ? Math.max(...numbers) : 0;
  const nextNum = maxNum + 1;
  
  return `PROJ${nextNum.toString().padStart(3, '0')}`;
};

