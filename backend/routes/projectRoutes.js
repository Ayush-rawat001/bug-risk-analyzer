import express from 'express';
import {
  createProject,
  getProjects,
  getProjectsByDeveloper,
  getProjectsByTester
} from '../controllers/projectController.js';

const router = express.Router();

router.post('/create', createProject);
router.get('/', getProjects);
router.get('/developer/:developerId', getProjectsByDeveloper);
router.get('/tester/:testerId', getProjectsByTester);

export default router;

