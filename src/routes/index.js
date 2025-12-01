import express from 'express';
import profileRoutes from './profile.js';

const router = express.Router();

// Use profile routes
router.use('/', profileRoutes);

export default router;  

