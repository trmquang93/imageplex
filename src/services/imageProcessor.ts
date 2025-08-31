import type { LineArtConfig, ColoringConfig, ResizeConfig } from '../types/processing';

// Removed direct FAL.AI client usage - now using secure API proxy routes

export interface ProcessingResult {
  success: boolean;
  imageUrl?: string;
  imageBlob?: Blob;
  error?: string;
  variations?: string[]; // Multiple output variations
}

export class ImageProcessor {
  
  /**
   * Convert ImageSize to dimensions object for API (if needed for future features)
   * Currently unused as the API accepts image_size parameter directly
   */
  // private static getImageDimensions(imageSize: ImageSize): CustomDimensions {
  //   if (typeof imageSize === 'object') {
  //     // Custom dimensions object
  //     return imageSize;
  //   }
  //   
  //   // Enum values mapped to standard dimensions
  //   const dimensionsMap: Record<ImageSizeEnum, CustomDimensions> = {
  //     'square': { width: 512, height: 512 },
  //     'square_hd': { width: 1024, height: 1024 },
  //     'portrait_4_3': { width: 768, height: 1024 },
  //     'portrait_16_9': { width: 576, height: 1024 },
  //     'landscape_4_3': { width: 1024, height: 768 },
  //     'landscape_16_9': { width: 1024, height: 576 },
  //     'a4': { width: 595, height: 842 } // A4 at 72 DPI
  //   };
  //   
  //   return dimensionsMap[imageSize] || { width: 512, height: 512 };
  // }
  
  /**
   * Upload file via secure API proxy and return public URL
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
        body: formData // Send as FormData instead of JSON
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
   * Intelligent Resize via secure API proxy
   */
  static async intelligentResize(
    imageFile: File, 
    config: ResizeConfig
  ): Promise<ProcessingResult> {
    try {
      // Step 1: Upload file to get public URL
      const uploadedImageUrl = await this.uploadFile(imageFile);
      
      // Step 2: Call secure resize API
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
   * AI Image Coloring via secure API proxy
   */
  static async aiColoring(
    imageFile: File, 
    config: ColoringConfig
  ): Promise<ProcessingResult> {
    try {
      // Step 1: Upload file to get public URL
      const uploadedImageUrl = await this.uploadFile(imageFile);
      
      // Step 2: Call secure coloring API
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
   * Line Art Conversion via secure API proxy
   */
  static async lineArtConversion(
    imageFile: File, 
    config: LineArtConfig
  ): Promise<ProcessingResult> {
    try {
      // Step 1: Upload file to get public URL
      const uploadedImageUrl = await this.uploadFile(imageFile);
      
      // Step 2: Call secure line art API
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

  // Note: Prompt generation methods moved to secure API routes
  // This keeps the business logic server-side and secure

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