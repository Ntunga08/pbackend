import express from 'express';
import {
  getAllSkills,
  addSkill,
  updateSkill,
  deleteSkill,
  permanentlyDeleteSkill
} from '../controllers/skillcontroller.js';

const router = express.Router();

// Skills routes
router.get('/skills', getAllSkills);                    // Get all active skills
router.post('/skills', addSkill);                       // Create new skill
router.put('/skills/:id', updateSkill);                // Update skill
router.delete('/skills/:id', deleteSkill);             // Soft delete (hide skill)
router.delete('/skills/:id/permanent', permanentlyDeleteSkill); // Hard delete (permanent)

export default router;
