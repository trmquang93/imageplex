import { VercelRequest, VercelResponse } from '@vercel/node';
import { fal } from "@fal-ai/client";
import type { ResizeConfig } from '../src/types/processing';

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

// Generate intelligent resize prompt based on configuration
const generateResizePrompt = (config: ResizeConfig): string => {
  const aspectRatioMap: Record<string, string> = {
    'square': 'Resize to square format (1:1) while keeping the main subject centered and preserving important details',
    'portrait': 'Resize to portrait format (3:4) maintaining composition balance and key visual elements',
    'landscape': 'Resize to landscape format (4:3) preserving the scene\'s natural flow and important objects',
    'wide': 'Resize to widescreen format (16:9) extending background naturally while keeping subjects prominent',
    'custom': 'Intelligently resize while preserving the most important visual elements'
  };

  const methodMap: Record<string, string> = {
    'smart-crop': 'using smart cropping to maintain focus on the main subject',
    'content-aware': 'with content-aware scaling that preserves natural proportions',
    'center-crop': 'by center cropping while keeping the composition balanced',
    'fit': 'by fitting the image with appropriate background extension'
  };

  const basePrompt = aspectRatioMap[config.aspectRatio] || aspectRatioMap['square'];
  const methodPrompt = methodMap[config.resizeMethod] || methodMap['smart-crop'];

  return `${basePrompt} ${methodPrompt}, with maximum quality and detail preservation. Maintain natural lighting and color balance.`;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
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

    // Generate prompt based on configuration
    const prompt = generateResizePrompt(config);
    
    // Prepare API input
    const apiInput: any = {
      image_url: imageUrl,
      prompt: prompt,
      output_format: 'jpeg',
      num_images: 1
    };
    
    // Add image_size parameter if specified
    if (config.image_size) {
      apiInput.image_size = config.image_size;
    }
    
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
    console.error('Resize error:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Resize processing failed'
    });
  }
}