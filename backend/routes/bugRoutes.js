import express from 'express';
import {
  createBug,
  getBugs,
  getBugsByDeveloper,
  getBugsByTester
} from '../controllers/bugController.js';

const router = express.Router();

router.post('/create', createBug);
router.get('/', getBugs);
router.get('/developer/:developerId', getBugsByDeveloper);
router.get('/tester/:testerId', getBugsByTester);

export default router;

