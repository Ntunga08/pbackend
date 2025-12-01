import express from 'express';
import profileRoutes from './profile.js';
import skillRoutes from './skills.js';
import testimonialRoutes from './testimonials.js';

const router = express.Router();

// Use profile routes
router.use('/', profileRoutes);

// Use skill routes
router.use('/', skillRoutes);

// Use testimonial routes
router.use('/', testimonialRoutes);

export default router;  

