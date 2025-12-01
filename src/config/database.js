import mongoose from 'mongoose';

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 30000,
    });
    return true;
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
    throw err;
  }
};

export default connectDB;
