import type { LineArtConfig, ColoringConfig, ResizeConfig } from '../types/processing';

// All API calls now go through proxy routes in both development and production
// Development: Vite proxies to local Express server (localhost:3001)
// Production: Direct Vercel serverless functions

export interface ProcessingResult {
  success: boolean;
  imageUrl?: string;
  imageBlob?: Blob;
  error?: string;
  variations?: string[]; // Multiple output variations
}

export class ImageProcessor {
  
  /**
   * Upload file via API proxy (works in both dev and prod)
   */
  static async uploadFile(file: File): Promise<string> {
    try {
      // Use FormData to send the file directly
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', file.name);
      formData.append('fileType', file.type);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData // Send as FormData
      });
      
      const result = await response.json();
      
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Upload failed');
      }
      
      return result.uploadUrl;
    } catch (error) {
      console.error('File upload error:', error);
      throw new Error(`File upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Note: fileToBase64 method removed - now using FormData for direct file upload
  
  /**
   * Intelligent Resize via API proxy (works in both dev and prod)
   */
  static async intelligentResize(
    imageFile: File, 
    config: ResizeConfig
  ): Promise<ProcessingResult> {
    try {
      // Step 1: Upload file to get public URL
      const uploadedImageUrl = await this.uploadFile(imageFile);
      
      // Step 2: Call resize API (proxied to dev server in dev, Vercel in prod)
      const response = await fetch('/api/resize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl: uploadedImageUrl,
          config: config
        })
      });
      
      const result = await response.json();
      
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Resize processing failed');
      }
      
      // Download the processed image and convert to blob
      const imageResponse = await fetch(result.imageUrl);
      const imageBlob = await imageResponse.blob();
      
      return {
        success: true,
        imageUrl: result.imageUrl,
        imageBlob: imageBlob,
        variations: result.variations
      };
    } catch (error) {
      console.error('Intelligent resize error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Resize processing failed'
      };
    }
  }

  /**
   * AI Image Coloring via API proxy (works in both dev and prod)
   */
  static async aiColoring(
    imageFile: File, 
    config: ColoringConfig
  ): Promise<ProcessingResult> {
    try {
      // Step 1: Upload file to get public URL
      const uploadedImageUrl = await this.uploadFile(imageFile);
      
      // Step 2: Call coloring API (proxied to dev server in dev, Vercel in prod)
      const response = await fetch('/api/coloring', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl: uploadedImageUrl,
          config: config
        })
      });
      
      const result = await response.json();
      
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Coloring processing failed');
      }
      
      // Download the processed image and convert to blob
      const imageResponse = await fetch(result.imageUrl);
      const imageBlob = await imageResponse.blob();
      
      return {
        success: true,
        imageUrl: result.imageUrl,
        imageBlob: imageBlob,
        variations: result.variations
      };
    } catch (error) {
      console.error('AI coloring error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Coloring processing failed'
      };
    }
  }

  /**
   * Line Art Conversion via API proxy (works in both dev and prod)
   */
  static async lineArtConversion(
    imageFile: File, 
    config: LineArtConfig
  ): Promise<ProcessingResult> {
    try {
      // Step 1: Upload file to get public URL
      const uploadedImageUrl = await this.uploadFile(imageFile);
      
      // Step 2: Call line art API (proxied to dev server in dev, Vercel in prod)
      const response = await fetch('/api/lineArt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl: uploadedImageUrl,
          config: config
        })
      });
      
      const result = await response.json();
      
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Line art conversion failed');
      }
      
      // Download the processed image and convert to blob
      const imageResponse = await fetch(result.imageUrl);
      const imageBlob = await imageResponse.blob();
      
      return {
        success: true,
        imageUrl: result.imageUrl,
        imageBlob: imageBlob,
        variations: result.variations
      };
    } catch (error) {
      console.error('Line art conversion error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Line art conversion failed'
      };
    }
  }

  // Note: All processing now uses API proxy routes for consistency
  // Development: Vite proxies to Express server (localhost:3001)  
  // Production: Direct Vercel serverless functions

  /**
   * Process image with multiple operations in sequence
   */
  static async processImage(
    imageFile: File,
    operations: Array<{
      type: 'resize' | 'coloring' | 'lineArt';
      config: ResizeConfig | ColoringConfig | LineArtConfig;
    }>
  ): Promise<ProcessingResult> {
    let currentFile = imageFile;
    
    for (const operation of operations) {
      let result: ProcessingResult;
      
      switch (operation.type) {
        case 'resize':
          result = await this.intelligentResize(currentFile, operation.config as ResizeConfig);
          break;
        case 'coloring':
          result = await this.aiColoring(currentFile, operation.config as ColoringConfig);
          break;
        case 'lineArt':
          result = await this.lineArtConversion(currentFile, operation.config as LineArtConfig);
          break;
        default:
          return { success: false, error: `Unknown operation type: ${operation.type}` };
      }
      
      if (!result.success) {
        return result;
      }
      
      // Convert the result to a File for the next operation
      if (result.imageBlob) {
        currentFile = new File([result.imageBlob], `processed_${Date.now()}.jpg`, {
          type: result.imageBlob.type
        });
      }
    }
    
    // Return the final result - currentFile is already a File/Blob
    // Create data URL for display purposes
    const finalImageUrl = URL.createObjectURL(currentFile);
    return {
      success: true,
      imageUrl: finalImageUrl,
      imageBlob: currentFile
    };
  }
}