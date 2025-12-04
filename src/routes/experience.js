import express from 'express';
import {
  getAllExperience,
  addExperience,
  updateExperience,
  deleteExperienceById,
  deleteExperience,
  getExperienceById
} from '../controllers/experiencecontroller.js';

const router = express.Router();

router.get('/experience', getAllExperience);
router.get('/experience/:id', getExperienceById);
router.post('/experience', addExperience);
router.put('/experience/:id', updateExperience);
router.delete('/experience/:id', deleteExperienceById);
router.delete('/experience', deleteExperience);

export default router;