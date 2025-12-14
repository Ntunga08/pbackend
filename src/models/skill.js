import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      enum: ['backend', 'frontend', 'mobile', 'system', 'design'],
      required: true
    },
    description: {
      type: String,
      required: true
    },
    proficiency: {
      type: Number,
      min: 0,
      max: 100,
      required: true
    },
    yearsOfExperience: {
      type: Number,
      required: true,
      min: 0
    },
    technologies: {
      type: [String],
      required: true,
      default: []
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

const Skill = mongoose.model('Skill', skillSchema);
export default Skill;