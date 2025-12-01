import Skill from '../models/skill.js';
import Profile from '../models/profile.js';

// Get all skills (for the single profile)
export const getAllSkills = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found. Create a profile first.'
      });
    }
    
    const skills = await Skill.find({ profile: profile._id }).populate('profile', 'firstname lastname email');
    
    res.status(200).json({
      success: true,
      count: skills.length,
      data: skills
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Add a new skill (to the single profile)
export const addSkill = async (req, res) => {
  try {
    const { name, proficiency, yearsOfExperience } = req.body;
    
    console.log('Adding skill - Request body:', req.body);
    
    // Validate required fields
    if (!name || name.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Skill name is required and must not be empty'
      });
    }
    
    // Get the single profile - with better error handling
    let profile;
    try {
      profile = await Profile.findOne().select('_id firstname lastname email');
      console.log('Profile lookup result:', profile);
    } catch (profileError) {
      console.error('Error finding profile:', profileError);
      throw new Error(`Failed to fetch profile: ${profileError.message}`);
    }
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found. Create a profile first.'
      });
    }
    
    console.log('Using profile ID:', profile._id);
    
    // Check if skill already exists for this profile
    const existingSkill = await Skill.findOne({ 
      name: name.trim(), 
      profile: profile._id 
    });
    
    if (existingSkill) {
      return res.status(400).json({
        success: false,
        error: 'This skill already exists'
      });
    }
    
    console.log('Creating skill with:', { name, proficiency, yearsOfExperience, profileId: profile._id });
    
    const skill = await Skill.create({
      name: name.trim(),
      proficiency: proficiency || 'Intermediate',
      yearsOfExperience: yearsOfExperience || 0,
      profile: profile._id
    });
    
    console.log('Skill created successfully:', skill._id);
    
    await skill.populate('profile', 'firstname lastname email');
    
    res.status(201).json({
      success: true,
      message: 'Skill added successfully',
      data: skill
    });
  } catch (error) {
    console.error('Error adding skill:', error.message);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Update a skill
export const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, proficiency, yearsOfExperience } = req.body;
    
    let skill = await Skill.findById(id);
    
    if (!skill) {
      return res.status(404).json({
        success: false,
        error: 'Skill not found'
      });
    }
    
    // Update fields if provided
    if (name) skill.name = name;
    if (proficiency) skill.proficiency = proficiency;
    if (yearsOfExperience !== undefined) skill.yearsOfExperience = yearsOfExperience;
    
    await skill.save();
    await skill.populate('profile', 'firstname lastname email');
    
    res.status(200).json({
      success: true,
      message: 'Skill updated successfully',
      data: skill
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Delete a skill
export const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    
    const skill = await Skill.findByIdAndDelete(id);
    
    if (!skill) {
      return res.status(404).json({
        success: false,
        error: 'Skill not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Skill deleted successfully',
      data: skill
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
