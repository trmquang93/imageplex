/**
 * Prompt generation utilities for ImagePlex AI processing
 * Shared logic for both development (direct FAL calls) and production (API routes)
 */

import type { LineArtConfig, ColoringConfig, ResizeConfig } from '../types/processing';

/**
 * Generate line art conversion prompt based on configuration
 */
export const generateLineArtPrompt = (config: LineArtConfig): string => {
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

/**
 * Generate AI coloring prompt based on configuration
 */
export const generateColoringPrompt = (config: ColoringConfig): string => {
  const styleMap: Record<string, string> = {
    'digital': 'realistic digital colors and natural lighting',
    'watercolor': 'soft watercolor style with flowing colors',
    'oil-paint': 'rich oil paint texture with vibrant colors',
    'anime': 'anime-style bright and saturated colors',
    'crayon': 'crayon-like textured coloring'
  };

  const paletteMap: Record<string, string> = {
    'vibrant': 'vibrant, saturated colors with high contrast',
    'pastel': 'soft pastel colors with gentle transitions',
    'monochrome': 'monochromatic color scheme with subtle variations',
    'earth-tones': 'warm earth tone colors with natural palette'
  };

  const intensityLevel = Math.floor(config.saturation / 25) * 25;
  const intensityMap: Record<number, string> = {
    0: 'very subtle and muted coloring',
    25: 'light coloring with soft tones',
    50: 'moderate color intensity',
    75: 'strong, bold coloring',
    100: 'maximum color saturation and intensity'
  };

  const stylePrompt = styleMap[config.style] || styleMap['digital'];
  const palettePrompt = paletteMap[config.colorPalette] || paletteMap['vibrant'];
  const intensityPrompt = intensityMap[intensityLevel] || intensityMap[50];

  let prompt = `Add beautiful colors using ${stylePrompt} with ${palettePrompt} and ${intensityPrompt}.`;
  
  return prompt;
};

/**
 * Generate intelligent resize prompt and configuration
 */
export const generateResizeConfig = (config: ResizeConfig) => {
  // Convert image size to actual dimensions
  const getImageDimensions = (imageSize: any): { width: number; height: number } => {
    if (typeof imageSize === 'object' && imageSize.width && imageSize.height) {
      // Custom dimensions
      return { width: imageSize.width, height: imageSize.height };
    }
    
    // Size presets
    const sizePresets: Record<string, { width: number; height: number }> = {
      'square': { width: 512, height: 512 },
      'square_hd': { width: 1024, height: 1024 },
      'portrait_4_3': { width: 768, height: 1024 },
      'portrait_16_9': { width: 576, height: 1024 },
      'landscape_4_3': { width: 1024, height: 768 },
      'landscape_16_9': { width: 1024, height: 576 },
      'a4': { width: 595, height: 842 }
    };

    return sizePresets[imageSize as string] || sizePresets['square'];
  };

  // Determine target dimensions from image_size
  const targetDimensions = getImageDimensions(config.image_size || 'square');

  // Generate processing parameters  
  let processingParams = {
    ...targetDimensions
  };

  // Create simple resize prompt
  const prompt = `Resize image to ${targetDimensions.width}x${targetDimensions.height} pixels. Use intelligent content-aware resizing to preserve important subjects and details. Maintain high image quality and sharpness.`;

  return {
    prompt,
    dimensions: targetDimensions,
    parameters: processingParams
  };
};

/**
 * Generate FAL.AI API parameters for different operations
 */
export const getFalApiParams = {
  lineArt: (imageInput: string, config: LineArtConfig) => {
    // Handle both data URLs (dev) and regular URLs (prod)
    const isDataUrl = imageInput.startsWith('data:');
    return {
      ...(isDataUrl ? { image: imageInput } : { image_urls: [imageInput] }),
      prompt: generateLineArtPrompt(config),
      num_inference_steps: 28,
      guidance_scale: 3.5,
      num_images: 1
    };
  },

  coloring: (imageInput: string, config: ColoringConfig) => {
    // Handle both data URLs (dev) and regular URLs (prod) 
    const isDataUrl = imageInput.startsWith('data:');
    return {
      ...(isDataUrl ? { image: imageInput } : { image_urls: [imageInput] }),
      prompt: generateColoringPrompt(config),
      num_inference_steps: 30,
      guidance_scale: 4.0,
      num_images: 1
    };
  },

  resize: (imageInput: string, config: ResizeConfig) => {
    const { prompt, dimensions, parameters } = generateResizeConfig(config);
    // Handle both data URLs (dev) and regular URLs (prod)
    const isDataUrl = imageInput.startsWith('data:');
    return {
      ...(isDataUrl ? { image: imageInput } : { image_urls: [imageInput] }),
      prompt: prompt,
      width: dimensions.width,
      height: dimensions.height,
      num_inference_steps: 25,
      guidance_scale: 3.0,
      num_images: 1,
      ...parameters
    };
  }
};