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
        { value: 'portrait_16_9', label: t('options.mobile') }
      ]
    }
  ],
  sliders: []
});