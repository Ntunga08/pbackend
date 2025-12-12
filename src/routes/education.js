import express from 'express';
import {
  getAllEducation,
  getEducationById,
  addEducation,
  updateEducation,
  deleteEducation
} from '../controllers/educationcontroller.js';

const router = express.Router();

router.get('/education', getAllEducation);
router.get('/education/:id', getEducationById);
router.post('/education', addEducation);
router.put('/education/:id', updateEducation);
router.delete('/education/:id', deleteEducation);

export default router;
