import express from 'express';
import {
  createBug,
  getBugs,
  getBugsByDeveloper
} from '../controllers/bugController.js';

const router = express.Router();

router.post('/create', createBug);
router.get('/', getBugs);
router.get('/developer/:developerId', getBugsByDeveloper);

export default router;

