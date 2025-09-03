import { VercelRequest, VercelResponse } from '@vercel/node';
import { fal } from "@fal-ai/client";
import { parseUploadedFile, createFalBlob, validateParsedFile, createFileParsingError } from '../utils/fileParser';

// Configure FAL.AI client with server-side credentials
const initializeFalClient = () => {
  const apiKey = process.env.FAL_API_KEY;
  if (!apiKey) {
    throw new Error('FAL_API_KEY environment variable is not configured');
  }
  
  fal.config({
    credentials: apiKey
  });
};

// Configure to handle file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('=== UPLOAD API CALLED ===');
    console.log('Method:', req.method);
    console.log('Headers:', req.headers);
    console.log('Environment check - FAL_API_KEY exists:', !!process.env.FAL_API_KEY);
    
    // Initialize FAL client
    initializeFalClient();
    console.log('FAL client initialized successfully');
    
    // Parse the uploaded file using unified parser
    const parsedFile = await parseUploadedFile(req);
    
    console.log('File parsed successfully:', { 
      fileName: parsedFile.filename, 
      fileType: parsedFile.mimetype, 
      size: parsedFile.size,
      bufferSize: parsedFile.buffer.length
    });

    // Validate the parsed file
    validateParsedFile(parsedFile);
    
    // Create a Blob from the parsed file using unified approach
    const blob = createFalBlob(parsedFile);
    
    console.log('Blob created:', {
      blobSize: blob.size,
      blobType: blob.type
    });
    
    console.log('Attempting FAL.AI upload...');
    
    // Upload the blob to FAL.AI storage
    const uploadUrl = await fal.storage.upload(blob);
    
    console.log('Upload successful!', { uploadUrl });
    
    return res.status(200).json({ 
      success: true, 
      uploadUrl 
    });
    
  } catch (error) {
    console.error('=== UPLOAD ERROR DETAILS ===');
    console.error('Error type:', typeof error);
    console.error('Error name:', error?.name);
    console.error('Error message:', error?.message);
    console.error('Error stack:', error?.stack);
    console.error('Full error object:', error);
    console.error('=== END ERROR DETAILS ===');
    
    // Ensure we always return JSON, not HTML
    res.setHeader('Content-Type', 'application/json');
    
    // Use unified error handling for file parsing errors
    const finalError = error instanceof Error ? error : createFileParsingError(error, 'production upload');
    
    return res.status(500).json({
      success: false,
      error: finalError.message,
      errorType: error?.name || 'Unknown',
      timestamp: new Date().toISOString(),
      details: String(error)
    });
  }
}