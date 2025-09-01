/**
 * Tests for prompt generation utilities
 */

import { describe, it, expect } from 'vitest';
import { 
  generateLineArtPrompt, 
  generateColoringPrompt, 
  generateResizeConfig, 
  getFalApiParams 
} from '../promptGenerators';
import type { LineArtConfig, ColoringConfig, ResizeConfig } from '../../types/processing';

describe('Prompt Generators', () => {
  describe('generateLineArtPrompt()', () => {
    it('should generate prompt with default settings', () => {
      const config: LineArtConfig = {
        lineStyle: 'black-on-white',
        lineWeight: 50,
        detailLevel: 50
      };

      const prompt = generateLineArtPrompt(config);

      expect(prompt).toBe(
        'Convert to clean black line art on white background using medium weight lines with moderate detail level. Create clean, printable line art suitable for coloring.'
      );
    });

    it('should handle different line styles', () => {
      const configs: LineArtConfig[] = [
        { lineStyle: 'white-on-black', lineWeight: 25, detailLevel: 25 },
        { lineStyle: 'sketchy', lineWeight: 75, detailLevel: 75 },
        { lineStyle: 'clean', lineWeight: 100, detailLevel: 100 }
      ];

      const prompts = configs.map(generateLineArtPrompt);

      expect(prompts[0]).toContain('white line art on black background');
      expect(prompts[0]).toContain('thin lines');
      expect(prompts[0]).toContain('low detail with basic shapes');

      expect(prompts[1]).toContain('sketchy hand-drawn line art style');
      expect(prompts[1]).toContain('bold lines');
      expect(prompts[1]).toContain('high detail with fine features');

      expect(prompts[2]).toContain('precise clean line art with smooth lines');
      expect(prompts[2]).toContain('very thick and prominent lines');
      expect(prompts[2]).toContain('maximum detail with intricate line work');
    });

    it('should handle edge cases with extreme values', () => {
      const config: LineArtConfig = {
        lineStyle: 'black-on-white',
        lineWeight: 0,
        detailLevel: 0
      };

      const prompt = generateLineArtPrompt(config);

      expect(prompt).toContain('very thin and delicate lines');
      expect(prompt).toContain('minimal detail, simple outlines only');
    });

    it('should handle invalid line styles by falling back to default', () => {
      const config: LineArtConfig = {
        lineStyle: 'invalid-style' as any,
        lineWeight: 50,
        detailLevel: 50
      };

      const prompt = generateLineArtPrompt(config);

      expect(prompt).toContain('clean black line art on white background');
    });

    it('should normalize line weight values to quarters', () => {
      const config: LineArtConfig = {
        lineStyle: 'black-on-white',
        lineWeight: 37, // Should be normalized to 25
        detailLevel: 63  // Should be normalized to 50
      };

      const prompt = generateLineArtPrompt(config);

      expect(prompt).toContain('thin lines'); // 25
      expect(prompt).toContain('moderate detail level'); // 50
    });
  });

  describe('generateColoringPrompt()', () => {
    it('should generate prompt with basic configuration', () => {
      const config: ColoringConfig = {
        colorStyle: 'realistic',
        colorIntensity: 50,
        preserveLines: false,
        colorPalette: []
      };

      const prompt = generateColoringPrompt(config);

      expect(prompt).toBe('Add beautiful colors using realistic colors and natural lighting with moderate color intensity.');
    });

    it('should include line preservation instruction', () => {
      const config: ColoringConfig = {
        colorStyle: 'vibrant',
        colorIntensity: 75,
        preserveLines: true,
        colorPalette: []
      };

      const prompt = generateColoringPrompt(config);

      expect(prompt).toContain('strong, bold coloring');
      expect(prompt).toContain('Preserve the original line art structure and outlines.');
    });

    it('should include color palette when provided', () => {
      const config: ColoringConfig = {
        colorStyle: 'pastel',
        colorIntensity: 25,
        preserveLines: false,
        colorPalette: ['blue', 'green', 'yellow']
      };

      const prompt = generateColoringPrompt(config);

      expect(prompt).toContain('soft pastel colors with gentle transitions');
      expect(prompt).toContain('light coloring with soft tones');
      expect(prompt).toContain('Use these colors in the palette: blue, green, yellow.');
    });

    it('should handle all color styles', () => {
      const styles: ColoringConfig['colorStyle'][] = ['realistic', 'vibrant', 'pastel', 'monochromatic'];
      
      styles.forEach(style => {
        const config: ColoringConfig = {
          colorStyle: style,
          colorIntensity: 50,
          preserveLines: false,
          colorPalette: []
        };

        const prompt = generateColoringPrompt(config);
        expect(prompt).toBeTruthy();
        expect(prompt.length).toBeGreaterThan(20);
      });
    });

    it('should combine all options correctly', () => {
      const config: ColoringConfig = {
        colorStyle: 'monochromatic',
        colorIntensity: 100,
        preserveLines: true,
        colorPalette: ['red', 'crimson', 'burgundy']
      };

      const prompt = generateColoringPrompt(config);

      expect(prompt).toContain('monochromatic color scheme');
      expect(prompt).toContain('maximum color saturation and intensity');
      expect(prompt).toContain('Preserve the original line art structure');
      expect(prompt).toContain('red, crimson, burgundy');
    });
  });

  describe('generateResizeConfig()', () => {
    it('should handle size presets', () => {
      const config: ResizeConfig = {
        sizePreset: 'medium',
        resizeMethod: 'smart',
        maintainQuality: true
      };

      const result = generateResizeConfig(config);

      expect(result.dimensions).toEqual({ width: 800, height: 600 });
      expect(result.prompt).toContain('Resize image to 800x600 pixels');
      expect(result.prompt).toContain('intelligent content-aware resizing');
      expect(result.prompt).toContain('Maintain high image quality');
    });

    it('should handle custom dimensions', () => {
      const config: ResizeConfig = {
        customWidth: 1024,
        customHeight: 768,
        resizeMethod: 'crop',
        maintainQuality: false
      };

      const result = generateResizeConfig(config);

      expect(result.dimensions).toEqual({ width: 1024, height: 768 });
      expect(result.prompt).toContain('Resize image to 1024x768 pixels');
      expect(result.prompt).toContain('Crop to fit the target dimensions');
      expect(result.prompt).toContain('Resize efficiently while preserving');
    });

    it('should handle A4 size preset', () => {
      const config: ResizeConfig = {
        sizePreset: 'a4',
        resizeMethod: 'pad',
        maintainQuality: true
      };

      const result = generateResizeConfig(config);

      expect(result.dimensions).toEqual({ width: 595, height: 842 });
      expect(result.prompt).toContain('Add padding or background');
    });

    it('should handle all resize methods', () => {
      const methods: ResizeConfig['resizeMethod'][] = ['smart', 'crop', 'stretch', 'pad'];
      
      methods.forEach(method => {
        const config: ResizeConfig = {
          sizePreset: 'medium',
          resizeMethod: method,
          maintainQuality: false
        };

        const result = generateResizeConfig(config);
        expect(result.prompt).toBeTruthy();
        expect(result.parameters.method).toBe(method);
      });
    });

    it('should fall back to medium size when no dimensions provided', () => {
      const config: ResizeConfig = {
        resizeMethod: 'smart',
        maintainQuality: true
      };

      const result = generateResizeConfig(config);

      expect(result.dimensions).toEqual({ width: 800, height: 600 });
    });
  });

  describe('getFalApiParams', () => {
    it('should generate correct parameters for line art', () => {
      const config: LineArtConfig = {
        lineStyle: 'clean',
        lineWeight: 75,
        detailLevel: 50
      };

      const params = getFalApiParams.lineArt('test-image-url', config);

      expect(params).toEqual({
        image_urls: ['test-image-url'],
        prompt: expect.stringContaining('precise clean line art'),
        num_inference_steps: 28,
        guidance_scale: 3.5,
        num_images: 1
      });
    });

    it('should generate correct parameters for coloring', () => {
      const config: ColoringConfig = {
        colorStyle: 'vibrant',
        colorIntensity: 75,
        preserveLines: true,
        colorPalette: ['red', 'blue']
      };

      const params = getFalApiParams.coloring('test-image-url', config);

      expect(params).toEqual({
        image_urls: ['test-image-url'],
        prompt: expect.stringContaining('vibrant, saturated colors'),
        num_inference_steps: 30,
        guidance_scale: 4.0,
        num_images: 1
      });
    });

    it('should generate correct parameters for resize', () => {
      const config: ResizeConfig = {
        sizePreset: 'large',
        resizeMethod: 'smart',
        maintainQuality: true
      };

      const params = getFalApiParams.resize('test-image-url', config);

      expect(params).toEqual(expect.objectContaining({
        image_urls: ['test-image-url'],
        prompt: expect.stringContaining('1200x900 pixels'),
        width: 1200,
        height: 900,
        num_inference_steps: 25,
        guidance_scale: 3.0,
        num_images: 1,
        method: 'smart',
        quality: 'high'
      }));
    });
  });
});