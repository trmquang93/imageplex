import { VercelRequest, VercelResponse } from '@vercel/node';
import { fal } from "@fal-ai/client";
import type { ResizeConfig } from '../types/processing';

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

// Convert image size to dimensions for custom sizes
const getImageDimensions = (imageSize: string | object): object | string => {
  if (typeof imageSize === 'object') {
    return imageSize; // Already custom dimensions
  }
  
  // Map special sizes to custom dimensions
  const dimensionsMap: Record<string, { width: number; height: number }> = {
    'a4': { width: 595, height: 842 }, // A4 at 72 DPI
    'custom': { width: 512, height: 512 } // Default for custom
  };
  
  return dimensionsMap[imageSize] || imageSize; // Return as-is if valid enum
};

// Generate intelligent resize prompt based on image size
const generateResizePrompt = (config: ResizeConfig): string => {
  // Map image_size to format descriptions
  const sizeFormatMap: Record<string, string> = {
    'square': 'square format (1:1)',
    'square_hd': 'high-definition square format',
    'portrait_4_3': 'portrait format (4:3)',
    'portrait_16_9': 'tall portrait format (16:9)',
    'landscape_4_3': 'landscape format (4:3)',
    'landscape_16_9': 'widescreen landscape format (16:9)',
    'a4': 'A4 portrait format',
    'custom': 'the specified dimensions'
  };

  const methodMap: Record<string, string> = {
    'smart-crop': 'intelligently crop and extend the background',
    'content-aware': 'extend the background naturally while preserving main content',
    'center-crop': 'center the composition and extend edges naturally',
    'fit': 'expand the canvas with seamless background extension'
  };

  // Use image_size for format, fallback to aspectRatio
  const formatKey = (config.image_size as string) || config.aspectRatio || 'square';
  const format = sizeFormatMap[formatKey] || sizeFormatMap['square'];
  const method = methodMap[config.resizeMethod] || methodMap['smart-crop'];

  return `Extend the background and recompose the image to fit ${format}. ${method} while maintaining the main subject prominently and preserving natural composition, lighting, and color balance.`;
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
    // Initialize FAL client
    initializeFalClient();
    
    const { imageUrl, config }: { imageUrl: string; config: ResizeConfig } = req.body;
    
    if (!imageUrl || !config) {
      return res.status(400).json({ 
        error: 'Missing required fields: imageUrl, config' 
      });
    }

    // Log the incoming request for debugging
    console.log('=== RESIZE API REQUEST ===');
    console.log('Image URL:', imageUrl);
    console.log('Config:', JSON.stringify(config, null, 2));
    
    // Generate prompt based on configuration
    const prompt = generateResizePrompt(config);
    console.log('Generated prompt:', prompt);
    
    // Prepare API input
    const apiInput: any = {
      image_url: imageUrl,
      prompt: prompt,
      output_format: 'jpeg',
      num_images: 1
    };
    
    // Add image_size parameter with proper formatting
    if (config.image_size) {
      const processedImageSize = getImageDimensions(config.image_size);
      apiInput.image_size = processedImageSize;
      console.log('Processed image_size:', JSON.stringify(processedImageSize, null, 2));
    }
    
    console.log('Final API input:', JSON.stringify(apiInput, null, 2));
    
    // Call Qwen Image Edit API
    const result = await fal.subscribe("fal-ai/qwen-image-edit", {
      input: apiInput
    });
    
    if (result.data?.images && result.data.images.length > 0) {
      const processedImageUrl = result.data.images[0].url;
      
      return res.status(200).json({
        success: true,
        imageUrl: processedImageUrl,
        variations: result.data.images.map((img: any) => img.url)
      });
    } else {
      throw new Error('No processed image returned from API');
    }
    
  } catch (error) {
    console.error('=== RESIZE ERROR DETAILS ===');
    console.error('Error type:', typeof error);
    console.error('Error name:', error?.name);
    console.error('Error message:', error?.message);
    console.error('Error stack:', error?.stack);
    console.error('Full error object:', error);
    
    // Check for FAL API specific errors
    if (error?.response) {
      console.error('FAL API Response:', error.response);
    }
    if (error?.status) {
      console.error('HTTP Status:', error.status);
    }
    console.error('=== END ERROR DETAILS ===');
    
    // Ensure we always return JSON, not HTML
    res.setHeader('Content-Type', 'application/json');
    
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Resize processing failed',
      errorType: error?.name || 'Unknown',
      timestamp: new Date().toISOString(),
      details: String(error)
    });
  }
}