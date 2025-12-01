import  express from 'express';
import  {
    getProfile,
    createProfile,
    updateProfile
} from '../controllers/profilecontroller.js';

const router = express.Router();

// Route to get the profile
router.get('/profile', getProfile);

// Route to create the profile (only once)
router.post('/profile', createProfile);

// Route to update the profile
router.put('/profile', updateProfile);

export default router;      
