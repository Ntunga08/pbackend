import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//logging middleware
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.originalUrl} - ${new Date().toLocaleString()}`);
  next();
});

// ROUTES
app.use('/api', routes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: '🚀 Portfolio API running' });
});

// 404 Error handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Something went wrong'
  });
});

export default app;