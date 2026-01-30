import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  getStudentProfile,
  updateStudentProfile,
  getAllStudents
} from '../controllers/studentController.js';

const router = express.Router();

// Get student profile (protected route)
router.get('/profile', protect, getStudentProfile);

// Update student profile (protected route)
router.put('/profile', protect, updateStudentProfile);

// Get all students (admin only)
router.get('/all', protect, getAllStudents);

export default router;
