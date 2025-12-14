// routes/testimonialRouter.js
import express from 'express';
import {
  getAllTestimonials,
  getAllTestimonialsAdmin,
  getTestimonialById,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
  permanentlyDeleteTestimonial,
  getVerifiedTestimonials,
  getTestimonialsByRating
} from '../controllers/testimonialcontroller.js';

const router = express.Router();

// Public routes
router.get('/testimonials', getAllTestimonials);
router.get('/testimonials/verified', getVerifiedTestimonials);
router.get('/testimonials/rating', getTestimonialsByRating);
router.get('/testimonials/:id', getTestimonialById);

// Admin routes
router.post('/testimonials', addTestimonial);
router.put('/testimonials/:id', updateTestimonial);
router.delete('/testimonials/:id', deleteTestimonial);
router.delete('/testimonials/:id/permanent', permanentlyDeleteTestimonial);
router.get('/admin/testimonials', getAllTestimonialsAdmin);

export default router;