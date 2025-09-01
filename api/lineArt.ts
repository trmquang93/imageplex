import { VercelRequest, VercelResponse } from '@vercel/node';
import { fal } from "@fal-ai/client";
import type { LineArtConfig } from '../types/processing';
import { getFalApiParams } from '../src/utils/promptGenerators';

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Initialize FAL client
    initializeFalClient();
    
    const { imageUrl, config }: { imageUrl: string; config: LineArtConfig } = req.body;
    
    if (!imageUrl || !config) {
      return res.status(400).json({ 
        error: 'Missing required fields: imageUrl, config' 
      });
    }

    // Generate API parameters using shared utility
    const apiParams = getFalApiParams.lineArt(imageUrl, config);
    
    // Call Nano Banana API
    const result = await fal.subscribe("fal-ai/nano-banana/edit", {
      input: apiParams
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
    console.error('Line art error:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Line art conversion failed'
    });
  }
}