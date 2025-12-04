const express = require('express');
const {
  getAllExperience,
  addExperience,
  updateExperience,
  deleteExperience,
  getExperienceById
} = require('../controllers/experiencecontroller.js');

const router = express.Router();

router.get('/experience', getAllExperience);
router.get('/experience/:id', getExperienceById);
router.post('/experience', addExperience);
router.put('/experience/:id', updateExperience);
router.delete('/experience/:id', deleteExperience);

module.exports = router;    