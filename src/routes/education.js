import express from 'express';
import {
  getAllEducation,
  getEducationById,
  addEducation,
  updateEducation,
  deleteEducation
} from '../controllers/educationcontroller.js';

const router = express.Router();

/**
 * Education Routes
 */

// Get all education entries
router.get('/education', getAllEducation);

// Get single education entry by ID
router.get('/education/:id', getEducationById);

// Add new education entry
router.post('/education', addEducation);

// Update education entry
router.put('/education/:id', updateEducation);

// Delete education entry
router.delete('/education/:id', deleteEducation);

export default router;
