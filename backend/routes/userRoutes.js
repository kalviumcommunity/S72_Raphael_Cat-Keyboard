import express from 'express';
import {
  register,
  login,
  getProfile,
  updateProfile,
  deleteProfile,
  getAllUsers,
  searchUsersByQuery
} from '../controllers/userController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes (require authentication)
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);
router.delete('/profile', authenticateToken, deleteProfile);
router.get('/', authenticateToken, getAllUsers);
router.get('/search', authenticateToken, searchUsersByQuery);

export default router;