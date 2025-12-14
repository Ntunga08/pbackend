import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    // Basic Info
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters']
    },
    position: {
      type: String,
      required: [true, 'Position/title is required'],
      trim: true,
      minlength: [2, 'Position must be at least 2 characters']
    },
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
      minlength: [2, 'Company must be at least 2 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email'
      ],
      lowercase: true
    },
    // Testimonial Content
    message: {
      type: String,
      required: [true, 'Testimonial message is required'],
      trim: true,
      minlength: [20, 'Message must be at least 20 characters'],
      maxlength: [500, 'Message cannot exceed 500 characters']
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
      enum: [1, 2, 3, 4, 5]
    },
    // Profile Image
    image: {
      type: String,
      default: null
    },
    // Project/Context
    projectTitle: {
      type: String,
      trim: true
    },
    linkedIn: {
      type: String,
      trim: true
    },
    website: {
      type: String,
      trim: true
    },
    // Status & Visibility
    isActive: {
      type: Boolean,
      default: true
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    // Admin Notes
    adminNotes: {
      type: String,
      trim: true
    },
    // Metadata
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// Index for faster queries
testimonialSchema.index({ isActive: 1, rating: -1 });
testimonialSchema.index({ createdAt: -1 });

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;