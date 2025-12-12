import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
  {
    titlhe: {
      type: String,
      required: true
    },
    company: {
      type: String,
      required: true
    },
    location: String,
    description: String,
    startDate: Date,
    endDate: Date,
    currentlyWorking: {
      type: Boolean,
      default: false
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile'
    }
  },
  { timestamps: true }
);

const Experience = mongoose.model('Experience', experienceSchema);
export default Experience;