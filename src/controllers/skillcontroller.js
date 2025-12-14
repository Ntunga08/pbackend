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
    
    const skills = await Skill.find({ profile: profile._id, isActive: true })
      .populate('profile', 'firstname lastname email')
      .sort({ createdAt: -1 });
    
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
    const { name, category, description, proficiency, yearsOfExperience, technologies } = req.body;
    
    console.log('Adding skill - Request body:', req.body);
    
    // Validate required fields
    if (!name || name.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Skill name is required and must not be empty'
      });
    }

    if (!category || !['backend', 'frontend', 'mobile', 'system', 'design'].includes(category)) {
      return res.status(400).json({
        success: false,
        error: 'Valid category is required (backend, frontend, mobile, system, design)'
      });
    }

    if (!description || description.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Description is required'
      });
    }

    if (proficiency === undefined || proficiency < 0 || proficiency > 100) {
      return res.status(400).json({
        success: false,
        error: 'Proficiency must be a number between 0 and 100'
      });
    }

    if (yearsOfExperience === undefined || yearsOfExperience < 0) {
      return res.status(400).json({
        success: false,
        error: 'Years of experience must be a non-negative number'
      });
    }

    if (!Array.isArray(technologies) || technologies.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'At least one technology is required'
      });
    }
    
    // Get the single profile
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
    
    console.log('Creating skill with:', { name, category, description, proficiency, yearsOfExperience, technologies, profileId: profile._id });
    
    const skill = await Skill.create({
      name: name.trim(),
      category,
      description: description.trim(),
      proficiency,
      yearsOfExperience,
      technologies,
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
    const { name, category, description, proficiency, yearsOfExperience, technologies, isActive } = req.body;
    
    let skill = await Skill.findById(id);
    
    if (!skill) {
      return res.status(404).json({
        success: false,
        error: 'Skill not found'
      });
    }

    // Validate fields if provided
    if (name !== undefined) {
      if (name.trim() === '') {
        return res.status(400).json({
          success: false,
          error: 'Skill name cannot be empty'
        });
      }
      skill.name = name.trim();
    }

    if (category !== undefined) {
      if (!['backend', 'frontend', 'mobile', 'system', 'design'].includes(category)) {
        return res.status(400).json({
          success: false,
          error: 'Valid category is required (backend, frontend, mobile, system, design)'
        });
      }
      skill.category = category;
    }

    if (description !== undefined) {
      if (description.trim() === '') {
        return res.status(400).json({
          success: false,
          error: 'Description cannot be empty'
        });
      }
      skill.description = description.trim();
    }

    if (proficiency !== undefined) {
      if (proficiency < 0 || proficiency > 100) {
        return res.status(400).json({
          success: false,
          error: 'Proficiency must be between 0 and 100'
        });
      }
      skill.proficiency = proficiency;
    }

    if (yearsOfExperience !== undefined) {
      if (yearsOfExperience < 0) {
        return res.status(400).json({
          success: false,
          error: 'Years of experience cannot be negative'
        });
      }
      skill.yearsOfExperience = yearsOfExperience;
    }

    if (technologies !== undefined) {
      if (!Array.isArray(technologies) || technologies.length === 0) {
        return res.status(400).json({
          success: false,
          error: 'At least one technology is required'
        });
      }
      skill.technologies = technologies;
    }

    if (isActive !== undefined) {
      skill.isActive = isActive;
    }
    
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

// Delete a skill (soft delete using isActive flag)
export const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    
    const skill = await Skill.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
    
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

// Permanently delete a skill
export const permanentlyDeleteSkill = async (req, res) => {
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
      message: 'Skill permanently deleted',
      data: skill
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};