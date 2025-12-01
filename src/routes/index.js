import express from 'express';
import profileRoutes from './profile.js';
import skillRoutes from './skills.js';

const router = express.Router();

// Use profile routes
router.use('/', profileRoutes);

// Use skill routes
router.use('/', skillRoutes);

export default router;  

