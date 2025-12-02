import Education from '../models/education.js';
import Profile from '../models/profile.js';

/**
 * Get all education entries for the single profile
 */
export const getAllEducation = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found. Create a profile first.'
      });
    }
    
    const educations = await Education.find({ profile: profile._id })
      .populate('profile', 'firstname lastname email')
      .sort({ startDate: -1 });
    
    res.status(200).json({
      success: true,
      count: educations.length,
      data: educations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Get single education entry by ID
 */
export const getEducationById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const education = await Education.findById(id)
      .populate('profile', 'firstname lastname email');
    
    if (!education) {
      return res.status(404).json({
        success: false,
        error: 'Education entry not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: education
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Add new education entry
 */
export const addEducation = async (req, res) => {
  try {
    const { school, degree, fieldOfStudy, startDate, endDate, description } = req.body;
    
    // Validate required fields
    if (!school || !degree || !fieldOfStudy) {
      return res.status(400).json({
        success: false,
        error: 'School, degree, and field of study are required'
      });
    }
    
    // Get the single profile
    const profile = await Profile.findOne().select('_id firstname lastname email');
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found. Create a profile first.'
      });
    }
    
    // Validate dates if provided
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      return res.status(400).json({
        success: false,
        error: 'Start date cannot be after end date'
      });
    }
    
    // Create education entry
    const education = await Education.create({
      school: school.trim(),
      degree: degree.trim(),
      fieldOfStudy: fieldOfStudy.trim(),
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      description: description ? description.trim() : undefined,
      profile: profile._id
    });
    
    await education.populate('profile', 'firstname lastname email');
    
    res.status(201).json({
      success: true,
      message: 'Education entry added successfully',
      data: education
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Update education entry
 */
export const updateEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const { school, degree, fieldOfStudy, startDate, endDate, description } = req.body;
    
    let education = await Education.findById(id);
    
    if (!education) {
      return res.status(404).json({
        success: false,
        error: 'Education entry not found'
      });
    }
    
    // Validate dates if provided
    const checkStartDate = startDate ? new Date(startDate) : education.startDate;
    const checkEndDate = endDate ? new Date(endDate) : education.endDate;
    
    if (checkStartDate && checkEndDate && checkStartDate > checkEndDate) {
      return res.status(400).json({
        success: false,
        error: 'Start date cannot be after end date'
      });
    }
    
    // Update fields if provided
    if (school) education.school = school.trim();
    if (degree) education.degree = degree.trim();
    if (fieldOfStudy) education.fieldOfStudy = fieldOfStudy.trim();
    if (startDate) education.startDate = new Date(startDate);
    if (endDate) education.endDate = new Date(endDate);
    if (description) education.description = description.trim();
    
    await education.save();
    await education.populate('profile', 'firstname lastname email');
    
    res.status(200).json({
      success: true,
      message: 'Education entry updated successfully',
      data: education
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Delete education entry
 */
export const deleteEducation = async (req, res) => {
  try {
    const { id } = req.params;
    
    const education = await Education.findByIdAndDelete(id);
    
    if (!education) {
      return res.status(404).json({
        success: false,
        error: 'Education entry not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Education entry deleted successfully',
      data: education
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
