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
    'realistic': 'realistic colors and natural lighting',
    'vibrant': 'vibrant, saturated colors with high contrast',
    'pastel': 'soft pastel colors with gentle transitions',
    'monochromatic': 'monochromatic color scheme with subtle variations'
  };

  const intensityMap: Record<number, string> = {
    0: 'very subtle and muted coloring',
    25: 'light coloring with soft tones',
    50: 'moderate color intensity',
    75: 'strong, bold coloring',
    100: 'maximum color saturation and intensity'
  };

  const stylePrompt = styleMap[config.colorStyle] || styleMap['realistic'];
  const intensityLevel = Math.floor(config.colorIntensity / 25) * 25;
  const intensityPrompt = intensityMap[intensityLevel] || intensityMap[50];

  let prompt = `Add beautiful colors using ${stylePrompt} with ${intensityPrompt}.`;
  
  if (config.preserveLines) {
    prompt += ' Preserve the original line art structure and outlines.';
  }
  
  if (config.colorPalette && config.colorPalette.length > 0) {
    const paletteDescription = config.colorPalette.join(', ');
    prompt += ` Use these colors in the palette: ${paletteDescription}.`;
  }

  return prompt;
};

/**
 * Generate intelligent resize prompt and configuration
 */
export const generateResizeConfig = (config: ResizeConfig) => {
  // Convert size presets to actual dimensions
  const sizePresets: Record<string, { width: number; height: number }> = {
    'thumbnail': { width: 150, height: 150 },
    'small': { width: 400, height: 300 },
    'medium': { width: 800, height: 600 },
    'large': { width: 1200, height: 900 },
    'xl': { width: 1920, height: 1080 },
    'a4': { width: 595, height: 842 }, // A4 in points (72 DPI)
    'square-sm': { width: 300, height: 300 },
    'square-md': { width: 600, height: 600 },
    'square-lg': { width: 1000, height: 1000 }
  };

  // Determine target dimensions
  let targetDimensions: { width: number; height: number };
  
  if (config.sizePreset && sizePresets[config.sizePreset]) {
    targetDimensions = sizePresets[config.sizePreset];
  } else if (config.customWidth && config.customHeight) {
    targetDimensions = {
      width: config.customWidth,
      height: config.customHeight
    };
  } else {
    // Default to medium size
    targetDimensions = sizePresets['medium'];
  }

  // Generate processing parameters based on resize method
  let processingParams = {
    ...targetDimensions,
    method: config.resizeMethod || 'smart',
    quality: config.maintainQuality ? 'high' : 'standard'
  };

  // Create prompt for AI-enhanced resizing
  const qualityPrompt = config.maintainQuality 
    ? 'Maintain high image quality and sharpness. Enhance details and reduce artifacts.'
    : 'Resize efficiently while preserving important features.';

  const methodPrompt = (() => {
    switch (config.resizeMethod) {
      case 'smart':
        return 'Use intelligent content-aware resizing to preserve important subjects and details.';
      case 'crop':
        return 'Crop to fit the target dimensions, focusing on the most important parts of the image.';
      case 'stretch':
        return 'Stretch to fit exact dimensions, adjusting aspect ratio as needed.';
      case 'pad':
        return 'Add padding or background to maintain aspect ratio while fitting target dimensions.';
      default:
        return 'Use smart resizing to optimize the image for the target size.';
    }
  })();

  const prompt = `Resize image to ${targetDimensions.width}x${targetDimensions.height} pixels. ${methodPrompt} ${qualityPrompt}`;

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