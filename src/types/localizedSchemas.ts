import type { ConfigSchema } from './processing';

export const createLocalizedLineArtConfigSchema = (t: (key: string) => string): ConfigSchema => ({
  dropdowns: [
    {
      key: 'lineStyle',
      label: t('options.lineStyle'),
      options: [
        { value: 'black-on-white', label: t('options.blackOnWhite') },
        { value: 'white-on-black', label: t('options.whiteOnBlack') },
        { value: 'colored', label: t('options.colored') }
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
});

export const createLocalizedColoringConfigSchema = (t: (key: string) => string): ConfigSchema => ({
  dropdowns: [
    {
      key: 'style',
      label: t('options.coloringStyle'),
      options: [
        { value: 'crayon', label: t('options.crayon') },
        { value: 'watercolor', label: t('options.watercolor') },
        { value: 'digital', label: t('options.digital') },
        { value: 'realistic', label: t('options.realistic') }
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
});

export const createLocalizedResizeConfigSchema = (t: (key: string) => string): ConfigSchema => ({
  dropdowns: [
    {
      key: 'image_size',
      label: t('options.aspectRatio'),
      options: [
        { value: 'square', label: t('options.square') },
        { value: 'portrait_4_3', label: t('options.portrait') },
        { value: 'landscape_4_3', label: t('options.landscape') },
        { value: 'landscape_16_9', label: t('options.widescreen') },
        { value: 'portrait_16_9', label: t('options.mobile') },
        { value: 'a4', label: t('options.a4') },
        { value: 'a4_landscape', label: t('options.a4Landscape') },
        { value: 'instagram_story', label: t('options.instagramStory') },
        { value: 'facebook_cover', label: t('options.facebookCover') },
        { value: 'twitter_header', label: t('options.twitterHeader') },
        { value: 'youtube_thumbnail', label: t('options.youtubeThumbnail') },
        { value: 'pinterest_pin', label: t('options.pinterestPin') },
        { value: 'linkedin_banner', label: t('options.linkedinBanner') },
        { value: 'tiktok_vertical', label: t('options.tiktokVertical') }
      ]
    }
  ],
  sliders: []
});

export const createLocalizedLineThinnessConfigSchema = (t: (key: string) => string): ConfigSchema => ({
  dropdowns: [
    {
      key: 'outputStyle',
      label: 'Output Style',
      options: [
        { value: 'black-on-white', label: t('options.blackOnWhite') },
        { value: 'white-on-black', label: t('options.whiteOnBlack') }
      ]
    }
  ],
  sliders: [
    {
      key: 'iterations',
      label: 'Thinning Intensity',
      min: 1,
      max: 20,
      step: 1,
      leftLabel: 'Gentle',
      rightLabel: 'Aggressive'
    }
  ]
});