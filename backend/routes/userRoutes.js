import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Get all users by role (for dropdowns)
router.get('/role/:role', async (req, res) => {
  try {
    const { role } = req.params;
    const users = await User.find({ role }).select('name email profileId');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

