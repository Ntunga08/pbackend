import Profile from '../models/profile.js';

// Get the single portfolio profile
export const getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Create profile (only once)
export const createProfile = async (req, res) => {
  try {
    // Check if profile already exists
    const existingProfile = await Profile.findOne();
    if (existingProfile) {
      return res.status(400).json({
        success: false,
        error: 'Profile already exists. Use update instead.'
      });
    }
    
    const profile = await Profile.create(req.body);
    res.status(201).json({
      success: true,
      data: profile
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Update the single profile
export const updateProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found. Create one first.'
      });
    }
    
    profile = await Profile.findByIdAndUpdate(
      profile._id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};