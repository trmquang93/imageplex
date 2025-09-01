/**
 * Resize API Route for Development Server
 * Mirrors the functionality of api/resize.ts
 */

import express from 'express';
import { fal } from '@fal-ai/client';
import { getFalApiParams } from '../utils/promptGenerators.js';

const router = express.Router();

// Intelligent Resize endpoint - mirrors api/resize.ts
router.post('/resize', async (req, res) => {
  try {
    console.log('=== DEV RESIZE API CALLED ===');
    
    const { imageUrl, config } = req.body;
    
    if (!imageUrl || !config) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields: imageUrl, config' 
      });
    }

    console.log('Processing resize with config:', config);
    console.log('Image URL length:', imageUrl.length);

    // Generate API parameters using shared utility
    const apiParams = getFalApiParams.resize(imageUrl, config);
    
    console.log('FAL.AI parameters prepared:', {
      hasImage: !!apiParams.image || !!apiParams.image_urls,
      prompt: apiParams.prompt,
      dimensions: `${apiParams.width}x${apiParams.height}`,
      steps: apiParams.num_inference_steps
    });
    
    // Call FAL.AI API
    const result = await fal.subscribe("fal-ai/nano-banana/edit", {
      input: apiParams
    });
    
    console.log('FAL.AI response received:', {
      hasData: !!result.data,
      imageCount: result.data?.images?.length || 0
    });
    
    if (result.data?.images && result.data.images.length > 0) {
      const processedImageUrl = result.data.images[0].url;
      
      return res.status(200).json({
        success: true,
        imageUrl: processedImageUrl,
        variations: result.data.images.map((img) => img.url)
      });
    } else {
      throw new Error('No processed image returned from API');
    }
    
  } catch (error) {
    console.error('=== DEV RESIZE ERROR ===');
    console.error('Error:', error?.message);
    console.error('Stack:', error?.stack);
    console.error('=== END ERROR ===');
    
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Resize processing failed',
      timestamp: new Date().toISOString()
    });
  }
});

export default router;