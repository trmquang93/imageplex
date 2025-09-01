/**
 * Line Art API Route for Development Server
 * Mirrors the functionality of api/lineArt.ts
 */

import express from 'express';
import { fal } from '@fal-ai/client';
import { getFalApiParams } from '../utils/promptGenerators.js';

const router = express.Router();

// Line Art endpoint - mirrors api/lineArt.ts
router.post('/lineArt', async (req, res) => {
  try {
    console.log('=== DEV LINE ART API CALLED ===');
    
    const { imageUrl, config } = req.body;
    
    if (!imageUrl || !config) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields: imageUrl, config' 
      });
    }

    console.log('Processing line art with config:', config);
    console.log('Image URL length:', imageUrl.length);

    // Generate API parameters using shared utility
    const apiParams = getFalApiParams.lineArt(imageUrl, config);
    
    console.log('FAL.AI parameters prepared:', {
      hasImage: !!apiParams.image || !!apiParams.image_urls,
      prompt: apiParams.prompt,
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
    console.error('=== DEV LINE ART ERROR ===');
    console.error('Error:', error?.message);
    console.error('Stack:', error?.stack);
    console.error('=== END ERROR ===');
    
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Line art conversion failed',
      timestamp: new Date().toISOString()
    });
  }
});

export default router;