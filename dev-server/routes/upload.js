/**
 * Upload API Route for Development Server
 * Mirrors the functionality of api/upload.ts
 */

import express from 'express';
import multer from 'multer';
import { fal } from '@fal-ai/client';
import { parseUploadedFile, createFalBlob, validateParsedFile, createFileParsingError } from '../utils/fileParser.js';

const router = express.Router();

// Configure multer for file uploads
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit - increased for development
  }
});

// Upload endpoint - mirrors api/upload.ts
router.post('/upload', (req, res) => {
  // Handle multer upload with error handling
  upload.single('file')(req, res, async (err) => {
    // Handle Multer errors
    if (err) {
      console.error('=== MULTER ERROR ===');
      console.error('Error type:', err.code);
      console.error('Error message:', err.message);
      
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          error: 'File too large. Maximum size allowed is 50MB.',
          errorType: 'FILE_TOO_LARGE'
        });
      }
      
      return res.status(400).json({
        success: false,
        error: err.message || 'File upload error',
        errorType: err.code || 'UPLOAD_ERROR'
      });
    }

    // Handle the uploaded file using unified parser
    try {
      console.log('=== DEV UPLOAD API CALLED ===');
      console.log('Method:', req.method);
      console.log('Content-Type:', req.headers['content-type']);
      console.log('File present:', !!req.file);

      // Parse the uploaded file using unified parser
      const parsedFile = parseUploadedFile(req);

      console.log('File parsed successfully:', { 
        originalName: parsedFile.filename, 
        mimeType: parsedFile.mimetype, 
        size: parsedFile.size,
        bufferLength: parsedFile.buffer?.length
      });

      // Validate the parsed file
      validateParsedFile(parsedFile);

      // Create a Blob from the parsed file using unified approach
      const fileBlob = createFalBlob(parsedFile);
      
      console.log('Blob created:', {
        blobSize: fileBlob.size,
        blobType: fileBlob.type
      });
      
      console.log('Attempting FAL.AI upload...');
      
      // Upload the blob to FAL.AI storage
      const uploadUrl = await fal.storage.upload(fileBlob);
      
      console.log('Upload successful!', { uploadUrl });
      
      return res.status(200).json({ 
        success: true, 
        uploadUrl 
      });
      
    } catch (error) {
      console.error('=== DEV UPLOAD ERROR ===');
      console.error('Error type:', typeof error);
      console.error('Error name:', error?.name);
      console.error('Error message:', error?.message);
      console.error('Error stack:', error?.stack);
      console.error('=== END ERROR ===');
      
      // Use unified error handling for file parsing errors
      const finalError = error instanceof Error ? error : createFileParsingError(error, 'development upload');
      
      return res.status(500).json({
        success: false,
        error: finalError.message,
        errorType: error?.name || 'Unknown',
        timestamp: new Date().toISOString()
      });
    }
  });
});

export default router;