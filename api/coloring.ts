import { VercelRequest, VercelResponse } from '@vercel/node';
import { fal } from "@fal-ai/client";
import type { ColoringConfig } from '../src/types/processing';

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

// Generate AI coloring prompt based on configuration
const generateColoringPrompt = (config: ColoringConfig): string => {
  const paletteMap: Record<string, string> = {
    'vibrant': 'vibrant and bright colors',
    'pastel': 'soft pastel colors',
    'monochrome': 'monochromatic color scheme with subtle variations',
    'earth-tones': 'warm earth tones and natural colors'
  };

  const styleMap: Record<string, string> = {
    'digital': 'clean digital art style',
    'watercolor': 'watercolor painting style with soft blending',
    'oil-paint': 'oil painting style with rich textures',
    'anime': 'anime and manga art style with crisp colors',
    'crayon': 'crayon coloring style with textured waxy appearance and soft blended edges'
  };

  const saturationMap: Record<number, string> = {
    0: 'very subtle and muted',
    25: 'subtle and soft',
    50: 'balanced saturation',
    75: 'rich and bold',
    100: 'highly saturated and vivid'
  };

  const palettePrompt = paletteMap[config.colorPalette] || paletteMap['vibrant'];
  const stylePrompt = styleMap[config.style] || styleMap['digital'];
  const saturationLevel = Math.floor(config.saturation / 25) * 25;
  const saturationPrompt = saturationMap[saturationLevel] || saturationMap[50];

  return `Add colors to this line art using ${palettePrompt} in ${stylePrompt} with ${saturationPrompt} colors. Maintain clean boundaries and natural color application. Fill backgrounds appropriately.`;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Initialize FAL client
    initializeFalClient();
    
    const { imageUrl, config }: { imageUrl: string; config: ColoringConfig } = req.body;
    
    if (!imageUrl || !config) {
      return res.status(400).json({ 
        error: 'Missing required fields: imageUrl, config' 
      });
    }

    // Generate prompt based on configuration
    const prompt = generateColoringPrompt(config);
    
    // Call Nano Banana API
    const result = await fal.subscribe("fal-ai/nano-banana/edit", {
      input: {
        image_urls: [imageUrl], // Nano Banana expects array
        prompt: prompt,
        num_inference_steps: 28,
        guidance_scale: 3.5,
        num_images: 1
      }
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
    console.error('Coloring error:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Coloring processing failed'
    });
  }
}