/**
 * Development API Server for ImagePlex
 * 
 * This Express server mirrors the Vercel API functions for local development.
 * It handles file uploads and AI processing without CORS issues.
 */

import express from 'express';
import cors from 'cors';
import { fal } from '@fal-ai/client';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// ES module __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from local directory first, then parent directory
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = express();
const PORT = 3001; // Different from Vite's port 3000

// Configure FAL.AI client
const initializeFalClient = () => {
  const apiKey = process.env.VITE_FAL_API_KEY;
  if (!apiKey) {
    throw new Error('VITE_FAL_API_KEY environment variable is not configured');
  }
  
  fal.config({
    credentials: apiKey
  });
  
  console.log('✅ FAL.AI client initialized for development');
};

// Initialize FAL client on startup
initializeFalClient();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    server: 'ImagePlex Development API',
    timestamp: new Date().toISOString(),
    falConfigured: !!process.env.VITE_FAL_API_KEY
  });
});

// Import route handlers
import uploadRoute from './routes/upload.js';
import lineArtRoute from './routes/lineArt.js';
import coloringRoute from './routes/coloring.js';
import resizeRoute from './routes/resize.js';
import lineThinnerRoute from './routes/lineThinner.js';

// Mount API routes with proper middleware
app.use('/api', uploadRoute);
app.use('/api', lineArtRoute);
app.use('/api', coloringRoute);
app.use('/api', resizeRoute);
app.use('/api', lineThinnerRoute);

// 404 handler for API routes
app.use('/api', (req, res) => {
  res.status(404).json({ 
    error: 'API endpoint not found', 
    path: req.path,
    method: req.method 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Development API Server running on http://localhost:${PORT}`);
  console.log(`📁 Serving API routes for ImagePlex development`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🎯 FAL.AI configured: ${!!process.env.VITE_FAL_API_KEY}`);
});

export default app;