// Configuration types for each processing feature

// Image size types for resize feature
export type ImageSizeEnum = 'square_hd' | 'square' | 'portrait_4_3' | 'portrait_16_9' | 'landscape_4_3' | 'landscape_16_9' | 'a4' | 'a4_landscape' | 'instagram_story' | 'facebook_cover' | 'twitter_header' | 'youtube_thumbnail' | 'pinterest_pin' | 'linkedin_banner' | 'tiktok_vertical';

export type ImageSize = ImageSizeEnum;

export interface LineArtConfig {
  lineStyle: string;
  lineWeight: number;
  detailLevel: number;
}

export interface ColoringConfig {
  colorPalette: string;
  saturation: number;
  style: string;
}

export interface ResizeConfig {
  aspectRatio: string;
  image_size?: ImageSize; // Parameter for precise size control
}

export type FeatureConfig = LineArtConfig | ColoringConfig | ResizeConfig;

export interface ProcessingFeature {
  key: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  backgroundColor: string;
  selectedColor: string;
  defaultConfig: FeatureConfig;
  configSchema: ConfigSchema;
}

export interface ConfigSchema {
  dropdowns: {
    key: string;
    label: string;
    options: Array<{ value: string; label: string }>;
  }[];
  sliders: {
    key: string;
    label: string;
    min: number;
    max: number;
    step: number;
    leftLabel: string;
    rightLabel: string;
  }[];
}

// Default configurations
export const defaultLineArtConfig: LineArtConfig = {
  lineStyle: 'black-on-white',
  lineWeight: 50,
  detailLevel: 50
};

export const defaultColoringConfig: ColoringConfig = {
  colorPalette: 'vibrant',
  saturation: 70,
  style: 'digital'
};

export const defaultResizeConfig: ResizeConfig = {
  aspectRatio: 'square',
  image_size: 'square' // Default to square preset
};

// Configuration schemas for each feature
export const lineArtConfigSchema: ConfigSchema = {
  dropdowns: [
    {
      key: 'lineStyle',
      label: 'Line Style',
      options: [
        { value: 'black-on-white', label: 'Black lines on white' },
        { value: 'white-on-black', label: 'White lines on black' },
        { value: 'sketchy', label: 'Sketchy style' },
        { value: 'clean', label: 'Clean lines' }
      ]
    }
  ],
  sliders: [
    {
      key: 'lineWeight',
      label: 'Line Weight',
      min: 0,
      max: 100,
      step: 1,
      leftLabel: 'Thin',
      rightLabel: 'Thick'
    },
    {
      key: 'detailLevel',
      label: 'Detail Level',
      min: 0,
      max: 100,
      step: 1,
      leftLabel: 'Simple',
      rightLabel: 'Detailed'
    }
  ]
};

export const coloringConfigSchema: ConfigSchema = {
  dropdowns: [
    {
      key: 'colorPalette',
      label: 'Color Palette',
      options: [
        { value: 'vibrant', label: 'Vibrant' },
        { value: 'pastel', label: 'Pastel' },
        { value: 'monochrome', label: 'Monochrome' },
        { value: 'earth-tones', label: 'Earth Tones' }
      ]
    },
    {
      key: 'style',
      label: 'Art Style',
      options: [
        { value: 'digital', label: 'Digital Art' },
        { value: 'watercolor', label: 'Watercolor' },
        { value: 'oil-paint', label: 'Oil Paint' },
        { value: 'anime', label: 'Anime Style' },
        { value: 'crayon', label: 'Crayon' }
      ]
    }
  ],
  sliders: [
    {
      key: 'saturation',
      label: 'Color Intensity',
      min: 0,
      max: 100,
      step: 1,
      leftLabel: 'Subtle',
      rightLabel: 'Bold'
    }
  ]
};

export const resizeConfigSchema: ConfigSchema = {
  dropdowns: [
    {
      key: 'image_size',
      label: 'Image Size',
      options: [
        { value: 'square', label: 'Square (1:1)' },
        { value: 'square_hd', label: 'Square HD' },
        { value: 'portrait_4_3', label: 'Portrait (4:3)' },
        { value: 'portrait_16_9', label: 'Portrait (16:9)' },
        { value: 'landscape_4_3', label: 'Landscape (4:3)' },
        { value: 'landscape_16_9', label: 'Landscape (16:9)' },
        { value: 'a4', label: 'A4 Portrait' },
        { value: 'a4_landscape', label: 'A4 Landscape' }
      ]
    }
  ],
  sliders: []
};