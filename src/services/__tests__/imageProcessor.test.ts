/**
 * Tests for ImageProcessor service
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ImageProcessor, ProcessingResult } from '../imageProcessor';
import type { LineArtConfig, ColoringConfig, ResizeConfig } from '../../types/processing';

// Mock the FAL.AI client
const mockFalSubscribe = vi.fn();
vi.mock('@fal-ai/client', () => ({
  fal: {
    config: vi.fn(),
    subscribe: mockFalSubscribe
  }
}));

// Mock environment utilities
vi.mock('../../utils/environment', () => ({
  isDevelopment: vi.fn(),
  getFalApiKey: vi.fn(() => 'mock-api-key')
}));

// Mock fetch
global.fetch = vi.fn();

// Mock URL.createObjectURL
global.URL.createObjectURL = vi.fn(() => 'mock-blob-url');

describe('ImageProcessor', () => {
  let mockFile: File;
  
  beforeEach(() => {
    // Create a mock file
    mockFile = new File(['mock image data'], 'test.jpg', { type: 'image/jpeg' });
    
    // Reset all mocks
    vi.clearAllMocks();
    
    // Default to development environment
    const { isDevelopment } = require('../../utils/environment');
    isDevelopment.mockReturnValue(true);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('uploadFile()', () => {
    it('should upload file successfully', async () => {
      // Mock successful upload response
      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          uploadUrl: 'https://example.com/uploaded-image.jpg'
        })
      });

      const result = await ImageProcessor.uploadFile(mockFile);

      expect(result).toBe('https://example.com/uploaded-image.jpg');
      expect(fetch).toHaveBeenCalledWith('/api/upload', {
        method: 'POST',
        body: expect.any(FormData)
      });
    });

    it('should handle upload failure', async () => {
      // Mock upload failure
      (fetch as any).mockResolvedValueOnce({
        ok: false,
        json: async () => ({
          success: false,
          error: 'Upload failed'
        })
      });

      await expect(ImageProcessor.uploadFile(mockFile))
        .rejects.toThrow('Upload failed');
    });

    it('should handle network errors', async () => {
      // Mock network error
      (fetch as any).mockRejectedValueOnce(new Error('Network error'));

      await expect(ImageProcessor.uploadFile(mockFile))
        .rejects.toThrow('File upload failed: Network error');
    });
  });

  describe('lineArtConversion() - Development Mode', () => {
    beforeEach(() => {
      const { isDevelopment } = require('../../utils/environment');
      isDevelopment.mockReturnValue(true);
    });

    it('should process line art in development mode', async () => {
      // Mock successful upload
      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          uploadUrl: 'https://example.com/uploaded.jpg'
        })
      });

      // Mock FAL.AI response
      mockFalSubscribe.mockResolvedValueOnce({
        data: {
          images: [
            { url: 'https://example.com/processed.jpg' }
          ]
        }
      });

      // Mock image download
      (fetch as any).mockResolvedValueOnce({
        blob: async () => new Blob(['processed image'], { type: 'image/jpeg' })
      });

      const config: LineArtConfig = {
        lineStyle: 'clean',
        lineWeight: 50,
        detailLevel: 75
      };

      const result = await ImageProcessor.lineArtConversion(mockFile, config);

      expect(result.success).toBe(true);
      expect(result.imageUrl).toBe('https://example.com/processed.jpg');
      expect(result.imageBlob).toBeInstanceOf(Blob);
      expect(mockFalSubscribe).toHaveBeenCalledWith('fal-ai/nano-banana/edit', {
        input: expect.objectContaining({
          image_urls: ['https://example.com/uploaded.jpg'],
          prompt: expect.stringContaining('precise clean line art'),
          num_inference_steps: 28,
          guidance_scale: 3.5,
          num_images: 1
        })
      });
    });

    it('should handle FAL.AI API errors in development', async () => {
      // Mock successful upload
      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          uploadUrl: 'https://example.com/uploaded.jpg'
        })
      });

      // Mock FAL.AI error
      mockFalSubscribe.mockRejectedValueOnce(new Error('FAL.AI API error'));

      const config: LineArtConfig = {
        lineStyle: 'black-on-white',
        lineWeight: 50,
        detailLevel: 50
      };

      const result = await ImageProcessor.lineArtConversion(mockFile, config);

      expect(result.success).toBe(false);
      expect(result.error).toBe('FAL.AI API error');
    });

    it('should handle empty FAL.AI response', async () => {
      // Mock successful upload
      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          uploadUrl: 'https://example.com/uploaded.jpg'
        })
      });

      // Mock empty FAL.AI response
      mockFalSubscribe.mockResolvedValueOnce({
        data: { images: [] }
      });

      const config: LineArtConfig = {
        lineStyle: 'sketchy',
        lineWeight: 25,
        detailLevel: 25
      };

      const result = await ImageProcessor.lineArtConversion(mockFile, config);

      expect(result.success).toBe(false);
      expect(result.error).toBe('No processed image returned from API');
    });
  });

  describe('lineArtConversion() - Production Mode', () => {
    beforeEach(() => {
      const { isDevelopment } = require('../../utils/environment');
      isDevelopment.mockReturnValue(false);
    });

    it('should process line art in production mode', async () => {
      // Mock successful upload
      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          uploadUrl: 'https://example.com/uploaded.jpg'
        })
      });

      // Mock successful API response
      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          imageUrl: 'https://example.com/processed.jpg',
          variations: ['https://example.com/processed.jpg']
        })
      });

      // Mock image download
      (fetch as any).mockResolvedValueOnce({
        blob: async () => new Blob(['processed image'], { type: 'image/jpeg' })
      });

      const config: LineArtConfig = {
        lineStyle: 'white-on-black',
        lineWeight: 100,
        detailLevel: 100
      };

      const result = await ImageProcessor.lineArtConversion(mockFile, config);

      expect(result.success).toBe(true);
      expect(result.imageUrl).toBe('https://example.com/processed.jpg');
      expect(fetch).toHaveBeenCalledWith('/api/lineArt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: 'https://example.com/uploaded.jpg',
          config: config
        })
      });
      expect(mockFalSubscribe).not.toHaveBeenCalled();
    });
  });

  describe('aiColoring() - Development Mode', () => {
    beforeEach(() => {
      const { isDevelopment } = require('../../utils/environment');
      isDevelopment.mockReturnValue(true);
    });

    it('should process coloring in development mode', async () => {
      // Mock successful upload
      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          uploadUrl: 'https://example.com/uploaded.jpg'
        })
      });

      // Mock FAL.AI response
      mockFalSubscribe.mockResolvedValueOnce({
        data: {
          images: [
            { url: 'https://example.com/colored.jpg' },
            { url: 'https://example.com/colored-alt.jpg' }
          ]
        }
      });

      // Mock image download
      (fetch as any).mockResolvedValueOnce({
        blob: async () => new Blob(['colored image'], { type: 'image/jpeg' })
      });

      const config: ColoringConfig = {
        colorStyle: 'vibrant',
        colorIntensity: 75,
        preserveLines: true,
        colorPalette: ['red', 'blue', 'green']
      };

      const result = await ImageProcessor.aiColoring(mockFile, config);

      expect(result.success).toBe(true);
      expect(result.imageUrl).toBe('https://example.com/colored.jpg');
      expect(result.variations).toEqual([
        'https://example.com/colored.jpg',
        'https://example.com/colored-alt.jpg'
      ]);
      expect(mockFalSubscribe).toHaveBeenCalledWith('fal-ai/nano-banana/edit', {
        input: expect.objectContaining({
          image_urls: ['https://example.com/uploaded.jpg'],
          prompt: expect.stringContaining('vibrant, saturated colors'),
          num_inference_steps: 30,
          guidance_scale: 4.0,
          num_images: 1
        })
      });
    });
  });

  describe('intelligentResize() - Development Mode', () => {
    beforeEach(() => {
      const { isDevelopment } = require('../../utils/environment');
      isDevelopment.mockReturnValue(true);
    });

    it('should process resize in development mode', async () => {
      // Mock successful upload
      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          uploadUrl: 'https://example.com/uploaded.jpg'
        })
      });

      // Mock FAL.AI response
      mockFalSubscribe.mockResolvedValueOnce({
        data: {
          images: [
            { url: 'https://example.com/resized.jpg' }
          ]
        }
      });

      // Mock image download
      (fetch as any).mockResolvedValueOnce({
        blob: async () => new Blob(['resized image'], { type: 'image/jpeg' })
      });

      const config: ResizeConfig = {
        sizePreset: 'large',
        resizeMethod: 'smart',
        maintainQuality: true
      };

      const result = await ImageProcessor.intelligentResize(mockFile, config);

      expect(result.success).toBe(true);
      expect(result.imageUrl).toBe('https://example.com/resized.jpg');
      expect(mockFalSubscribe).toHaveBeenCalledWith('fal-ai/nano-banana/edit', {
        input: expect.objectContaining({
          image_urls: ['https://example.com/uploaded.jpg'],
          prompt: expect.stringContaining('1200x900 pixels'),
          width: 1200,
          height: 900,
          num_inference_steps: 25,
          guidance_scale: 3.0,
          num_images: 1
        })
      });
    });
  });

  describe('processImage() - Multi-step Processing', () => {
    beforeEach(() => {
      const { isDevelopment } = require('../../utils/environment');
      isDevelopment.mockReturnValue(true);
    });

    it('should process multiple operations in sequence', async () => {
      // Mock upload for initial file
      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          uploadUrl: 'https://example.com/uploaded.jpg'
        })
      });

      // Mock first operation (resize)
      mockFalSubscribe.mockResolvedValueOnce({
        data: {
          images: [{ url: 'https://example.com/resized.jpg' }]
        }
      });

      (fetch as any).mockResolvedValueOnce({
        blob: async () => new Blob(['resized'], { type: 'image/jpeg' })
      });

      // Mock upload for second operation
      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          uploadUrl: 'https://example.com/resized-uploaded.jpg'
        })
      });

      // Mock second operation (line art)
      mockFalSubscribe.mockResolvedValueOnce({
        data: {
          images: [{ url: 'https://example.com/final.jpg' }]
        }
      });

      (fetch as any).mockResolvedValueOnce({
        blob: async () => new Blob(['final'], { type: 'image/jpeg' })
      });

      const operations = [
        {
          type: 'resize' as const,
          config: { sizePreset: 'medium', resizeMethod: 'smart', maintainQuality: true } as ResizeConfig
        },
        {
          type: 'lineArt' as const,
          config: { lineStyle: 'clean', lineWeight: 50, detailLevel: 50 } as LineArtConfig
        }
      ];

      const result = await ImageProcessor.processImage(mockFile, operations);

      expect(result.success).toBe(true);
      expect(mockFalSubscribe).toHaveBeenCalledTimes(2);
      expect(result.imageUrl).toBeTruthy();
      expect(result.imageBlob).toBeInstanceOf(File);
    });

    it('should stop processing on first operation failure', async () => {
      // Mock upload for initial file
      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          uploadUrl: 'https://example.com/uploaded.jpg'
        })
      });

      // Mock first operation failure
      mockFalSubscribe.mockRejectedValueOnce(new Error('Processing failed'));

      const operations = [
        {
          type: 'resize' as const,
          config: { sizePreset: 'medium', resizeMethod: 'smart', maintainQuality: true } as ResizeConfig
        },
        {
          type: 'lineArt' as const,
          config: { lineStyle: 'clean', lineWeight: 50, detailLevel: 50 } as LineArtConfig
        }
      ];

      const result = await ImageProcessor.processImage(mockFile, operations);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Processing failed');
      expect(mockFalSubscribe).toHaveBeenCalledTimes(1);
    });

    it('should handle unknown operation types', async () => {
      const operations = [
        {
          type: 'unknown' as any,
          config: {} as any
        }
      ];

      const result = await ImageProcessor.processImage(mockFile, operations);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Unknown operation type: unknown');
    });
  });
});