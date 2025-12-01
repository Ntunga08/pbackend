import Testimonial from '../models/testimonial.js';
import Profile from '../models/profile.js';

// Get all testimonials for the single profile
export const getAllTestimonials = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found. Create a profile first.'
      });
    }
    
    const testimonials = await Testimonial.find({ profile: profile._id })
      .populate('profile', 'firstname lastname email');
    
    res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Add a new testimonial
export const addTestimonial = async (req, res) => {
  try {
    const { name, title, company, message, rating, image } = req.body;
    
    console.log('Adding testimonial - Request body:', req.body);
    
    // Validate required fields
    if (!name || !message) {
      return res.status(400).json({
        success: false,
        error: 'Name and message are required'
      });
    }
    
    // Validate rating if provided
    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({
        success: false,
        error: 'Rating must be between 1 and 5'
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
    
    // Create testimonial
    const testimonial = await Testimonial.create({
      name: name.trim(),
      title: title ? title.trim() : undefined,
      company: company ? company.trim() : undefined,
      message: message.trim(),
      rating: rating || undefined,
      image,
      profile: profile._id
    });
    
    console.log('Testimonial created successfully:', testimonial._id);
    
    await testimonial.populate('profile', 'firstname lastname email');
    
    res.status(201).json({
      success: true,
      message: 'Testimonial added successfully',
      data: testimonial
    });
  } catch (error) {
    console.error('Error adding testimonial:', error.message);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Update a testimonial
export const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, title, company, message, rating, image } = req.body;
    
    let testimonial = await Testimonial.findById(id);
    
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        error: 'Testimonial not found'
      });
    }
    
    // Validate rating if provided
    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({
        success: false,
        error: 'Rating must be between 1 and 5'
      });
    }
    
    // Update fields if provided
    if (name) testimonial.name = name.trim();
    if (title) testimonial.title = title.trim();
    if (company) testimonial.company = company.trim();
    if (message) testimonial.message = message.trim();
    if (rating !== undefined) testimonial.rating = rating;
    if (image) testimonial.image = image;
    
    await testimonial.save();
    await testimonial.populate('profile', 'firstname lastname email');
    
    res.status(200).json({
      success: true,
      message: 'Testimonial updated successfully',
      data: testimonial
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Delete a testimonial
export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    
    const testimonial = await Testimonial.findByIdAndDelete(id);
    
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        error: 'Testimonial not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Testimonial deleted successfully',
      data: testimonial
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Keep old functions for backwards compatibility
export const getTestmonials = getAllTestimonials;
export const createTestmonial = addTestimonial;
export const getTestmonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id)
      .populate('profile', 'firstname lastname email');

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        error: 'Testimonial not found'
      });
    }

    res.status(200).json({
      success: true,
      data: testimonial
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

