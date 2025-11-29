import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import express from 'express';

const app = express();

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;