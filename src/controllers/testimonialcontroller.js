import Testimonial from '../models/testimonial.js';
import Profile from '../models/profile.js';

// Get all active testimonials (for public display)
export const getAllTestimonials = async (req, res) => {
  try {
    // Public view: only show testimonials that are active AND verified
    const testimonials = await Testimonial.find({ isActive: true, isVerified: true })
      .sort({ createdAt: -1 });
    
    console.log(`Public testimonials endpoint: Found ${testimonials.length} verified testimonials`);
    
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

// Get all testimonials including inactive (for admin)
export const getAllTestimonialsAdmin = async (req, res) => {
  try {
    const testimonials = await Testimonial.find()
      .sort({ createdAt: -1 });
    
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

// Get single testimonial by ID
export const getTestimonialById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const testimonial = await Testimonial.findById(id);

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

// Add a new testimonial
export const addTestimonial = async (req, res) => {
  try {
    const { name, position, company, email, message, rating, image, projectTitle, linkedIn, website } = req.body;
    
    console.log('Adding testimonial - Request body:', req.body);
    
    // Validate required fields
    if (!name || !position || !company || !email || !message || !rating) {
      return res.status(400).json({
        success: false,
        error: 'Name, position, company, email, message, and rating are required'
      });
    }

    // Validate message length
    if (message.trim().length < 20 || message.trim().length > 500) {
      return res.status(400).json({
        success: false,
        error: 'Message must be between 20 and 500 characters'
      });
    }
    
    // Validate rating
    if (rating < 1 || rating > 5 || !Number.isInteger(rating)) {
      return res.status(400).json({
        success: false,
        error: 'Rating must be an integer between 1 and 5'
      });
    }

    // Validate email format
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email'
      });
    }
    
    console.log('Creating testimonial with:', { name, position, company, email, message, rating });
    
    // Create testimonial
    const testimonial = await Testimonial.create({
      name: name.trim(),
      position: position.trim(),
      company: company.trim(),
      email: email.toLowerCase().trim(),
      message: message.trim(),
      rating,
      image: image || null,
      projectTitle: projectTitle ? projectTitle.trim() : null,
      linkedIn: linkedIn ? linkedIn.trim() : null,
      website: website ? website.trim() : null,
      isActive: true,
      isVerified: false
    });
    
    console.log('Testimonial created successfully:', testimonial._id);
    
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
    const { name, position, company, email, message, rating, image, projectTitle, linkedIn, website, isActive, isVerified, adminNotes } = req.body;
    
    let testimonial = await Testimonial.findById(id);
    
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        error: 'Testimonial not found'
      });
    }

    // Validate rating if provided
    if (rating !== undefined) {
      if (rating < 1 || rating > 5 || !Number.isInteger(rating)) {
        return res.status(400).json({
          success: false,
          error: 'Rating must be an integer between 1 and 5'
        });
      }
      testimonial.rating = rating;
    }

    // Validate message length if provided
    if (message !== undefined) {
      const msgTrimmed = message.trim();
      if (msgTrimmed.length < 20 || msgTrimmed.length > 500) {
        return res.status(400).json({
          success: false,
          error: 'Message must be between 20 and 500 characters'
        });
      }
      testimonial.message = msgTrimmed;
    }

    // Validate email if provided
    if (email !== undefined) {
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          error: 'Please provide a valid email'
        });
      }
      testimonial.email = email.toLowerCase().trim();
    }
    
    // Update fields if provided
    if (name !== undefined) testimonial.name = name.trim();
    if (position !== undefined) testimonial.position = position.trim();
    if (company !== undefined) testimonial.company = company.trim();
    if (image !== undefined) testimonial.image = image;
    if (projectTitle !== undefined) testimonial.projectTitle = projectTitle ? projectTitle.trim() : null;
    if (linkedIn !== undefined) testimonial.linkedIn = linkedIn ? linkedIn.trim() : null;
    if (website !== undefined) testimonial.website = website ? website.trim() : null;
    if (isActive !== undefined) testimonial.isActive = isActive;
    if (isVerified !== undefined) {
      testimonial.isVerified = isVerified;
      // When verifying, ensure testimonial is also active
      if (isVerified && !testimonial.isActive) {
        testimonial.isActive = true;
      }
    }
    if (adminNotes !== undefined) testimonial.adminNotes = adminNotes ? adminNotes.trim() : null;
    
    console.log(`Updating testimonial ${id}: isActive=${testimonial.isActive}, isVerified=${testimonial.isVerified}`);
    await testimonial.save();
    
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

// Soft delete testimonial (set isActive to false)
export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    
    const testimonial = await Testimonial.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
    
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

// Permanently delete testimonial (admin only)
export const permanentlyDeleteTestimonial = async (req, res) => {
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
      message: 'Testimonial permanently deleted',
      data: testimonial
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get verified testimonials only
export const getVerifiedTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ 
      isActive: true, 
      isVerified: true 
    }).sort({ createdAt: -1 });
    
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

// Get testimonials by rating
export const getTestimonialsByRating = async (req, res) => {
  try {
    const { minRating = 1, maxRating = 5 } = req.query;

    if (minRating < 1 || maxRating > 5 || minRating > maxRating) {
      return res.status(400).json({
        success: false,
        error: 'Invalid rating range'
      });
    }

    const testimonials = await Testimonial.find({
      isActive: true,
      isVerified: true,
      rating: { $gte: minRating, $lte: maxRating }
    }).sort({ rating: -1, createdAt: -1 });
    
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