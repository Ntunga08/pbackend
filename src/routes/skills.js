import express from 'express';
import {
  getAllSkills,
  addSkill,
  updateSkill,
  deleteSkill
} from '../controllers/skillcontroller.js';

const router = express.Router();

// Skills routes - explicit path
router.get('/skills', getAllSkills);
router.post('/skills', addSkill);
router.put('/skills/:id', updateSkill);
router.delete('/skills/:id', deleteSkill);

export default router;

