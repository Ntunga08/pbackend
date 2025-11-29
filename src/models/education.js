import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema(
  {
    school: {
      type: String,
      required: true
    },
    degree: {
      type: String,
      required: true
    },
    fieldOfStudy: {
      type: String,
      required: true
    },
    startDate: Date,
    endDate: Date,
    description: String,
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile'
    }
  },
  { timestamps: true }
);

const Education = mongoose.model('Education', educationSchema);
export default Education;