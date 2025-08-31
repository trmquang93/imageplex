import { VercelRequest, VercelResponse } from '@vercel/node';
import { fal } from "@fal-ai/client";
import type { LineArtConfig } from '../src/types/processing';

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

// Generate line art conversion prompt based on configuration
const generateLineArtPrompt = (config: LineArtConfig): string => {
  const styleMap: Record<string, string> = {
    'black-on-white': 'clean black line art on white background',
    'white-on-black': 'white line art on black background',
    'sketchy': 'sketchy hand-drawn line art style',
    'clean': 'precise clean line art with smooth lines'
  };

  const weightMap: Record<number, string> = {
    0: 'very thin and delicate lines',
    25: 'thin lines',
    50: 'medium weight lines',
    75: 'bold lines',
    100: 'very thick and prominent lines'
  };

  const detailMap: Record<number, string> = {
    0: 'minimal detail, simple outlines only',
    25: 'low detail with basic shapes',
    50: 'moderate detail level',
    75: 'high detail with fine features',
    100: 'maximum detail with intricate line work'
  };

  const stylePrompt = styleMap[config.lineStyle] || styleMap['black-on-white'];
  const weightLevel = Math.floor(config.lineWeight / 25) * 25;
  const weightPrompt = weightMap[weightLevel] || weightMap[50];
  const detailLevel = Math.floor(config.detailLevel / 25) * 25;
  const detailPrompt = detailMap[detailLevel] || detailMap[50];

  return `Convert to ${stylePrompt} using ${weightPrompt} with ${detailPrompt}. Create clean, printable line art suitable for coloring.`;
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

    // Generate prompt based on configuration
    const prompt = generateLineArtPrompt(config);
    
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
    console.error('Line art error:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Line art conversion failed'
    });
  }
}