import express from 'express';
import {
    getProfile,
    createProfile,
    updateProfile
} from '../controllers/profilecontroller.js';

const router = express.Router();

// Profile routes - explicit path
router.get('/profile', getProfile);
router.post('/profile', createProfile);
router.put('/profile', updateProfile);

export default router;      
