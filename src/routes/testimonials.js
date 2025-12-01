import express from 'express';
import {
  getAllTestimonials,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getTestmonialById
} from '../controllers/testmonialcontroller.js';

const router = express.Router();

// Testimonials routes - explicit path
router.get('/testimonials', getAllTestimonials);
router.get('/testimonials/:id', getTestmonialById);
router.post('/testimonials', addTestimonial);
router.put('/testimonials/:id', updateTestimonial);
router.delete('/testimonials/:id', deleteTestimonial);

export default router;
