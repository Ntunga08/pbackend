import express from 'express';
import profileRoutes from './profile.js';
import skillRoutes from './skills.js';
import testimonialRoutes from './testimonials.js';
import educationRoutes from './education.js';
import experienceRoutes from './experience.js';
import contactRoutes from './contact.js';

const router = express.Router();
router.use('/', profileRoutes);
router.use('/', skillRoutes);
router.use('/', testimonialRoutes);
router.use('/', educationRoutes);
router.use('/', experienceRoutes);
router.use('/', contactRoutes);
export default router;  

                            