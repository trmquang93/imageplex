import { VercelRequest, VercelResponse } from '@vercel/node';
import { createCanvas, loadImage, Canvas, Image } from 'canvas';
import formidable from 'formidable';
import type { LineThinnessConfig } from '../types/processing';

// Zhang-Suen morphological thinning algorithm implementation
class ImageThinning {
  constructor() {}

  // Convert image to binary (0 = background, 1 = foreground)
  private toBinary(data: Uint8ClampedArray, width: number, height: number): number[][] {
    const binary: number[][] = [];
    
    for (let y = 0; y < height; y++) {
      binary[y] = [];
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        // Convert to grayscale and threshold
        const gray = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
        // Assume dark pixels (lines) are foreground
        binary[y][x] = gray < 128 ? 1 : 0;
      }
    }
    
    return binary;
  }

  // Convert binary back to RGBA image data
  private fromBinary(binary: number[][], outputStyle: 'black-on-white' | 'white-on-black'): Uint8ClampedArray {
    const width = binary[0].length;
    const height = binary.length;
    const data = new Uint8ClampedArray(width * height * 4);
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        
        if (outputStyle === 'black-on-white') {
          // Foreground (1) = black, background (0) = white
          const color = binary[y][x] === 1 ? 0 : 255;
          data[idx] = color;     // R
          data[idx + 1] = color; // G
          data[idx + 2] = color; // B
          data[idx + 3] = 255;   // A
        } else {
          // Foreground (1) = white, background (0) = black
          const color = binary[y][x] === 1 ? 255 : 0;
          data[idx] = color;     // R
          data[idx + 1] = color; // G
          data[idx + 2] = color; // B
          data[idx + 3] = 255;   // A
        }
      }
    }
    
    return data;
  }

  // Count transitions from 0 to 1 in 8-connected neighbors (clockwise)
  private countTransitions(binary: number[][], x: number, y: number): number {
    const height = binary.length;
    const width = binary[0].length;
    
    // 8-connected neighbors in clockwise order starting from top
    const neighbors = [
      [y-1, x], [y-1, x+1], [y, x+1], [y+1, x+1],
      [y+1, x], [y+1, x-1], [y, x-1], [y-1, x-1]
    ];
    
    let transitions = 0;
    for (let i = 0; i < 8; i++) {
      const [cy, cx] = neighbors[i];
      const [ny, nx] = neighbors[(i + 1) % 8];
      
      const current = (cy >= 0 && cy < height && cx >= 0 && cx < width) ? binary[cy][cx] : 0;
      const next = (ny >= 0 && ny < height && nx >= 0 && nx < width) ? binary[ny][nx] : 0;
      
      if (current === 0 && next === 1) {
        transitions++;
      }
    }
    
    return transitions;
  }

  // Count the number of 1-valued neighbors
  private countNeighbors(binary: number[][], x: number, y: number): number {
    const height = binary.length;
    const width = binary[0].length;
    
    let count = 0;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue; // Skip center pixel
        
        const ny = y + dy;
        const nx = x + dx;
        
        if (ny >= 0 && ny < height && nx >= 0 && nx < width) {
          count += binary[ny][nx];
        }
      }
    }
    
    return count;
  }

  // Get specific neighbors for Zhang-Suen algorithm
  private getNeighborValue(binary: number[][], x: number, y: number, dir: string): number {
    const height = binary.length;
    const width = binary[0].length;
    
    let ny = y, nx = x;
    
    switch (dir) {
      case 'N': ny = y - 1; break;
      case 'NE': ny = y - 1; nx = x + 1; break;
      case 'E': nx = x + 1; break;
      case 'SE': ny = y + 1; nx = x + 1; break;
      case 'S': ny = y + 1; break;
      case 'SW': ny = y + 1; nx = x - 1; break;
      case 'W': nx = x - 1; break;
      case 'NW': ny = y - 1; nx = x - 1; break;
    }
    
    if (ny >= 0 && ny < height && nx >= 0 && nx < width) {
      return binary[ny][nx];
    }
    
    return 0;
  }

  // Zhang-Suen thinning algorithm
  private zhangSuenThinning(binary: number[][], preserveEndpoints: boolean): number[][] {
    const height = binary.length;
    const width = binary[0].length;
    let hasChanged = true;
    
    // Create a copy to work with
    let current = binary.map(row => [...row]);
    
    while (hasChanged) {
      hasChanged = false;
      
      // Phase 1
      const toRemove1: [number, number][] = [];
      
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          if (current[y][x] === 1) {
            const neighbors = this.countNeighbors(current, x, y);
            const transitions = this.countTransitions(current, x, y);
            
            const N = this.getNeighborValue(current, x, y, 'N');
            const E = this.getNeighborValue(current, x, y, 'E');
            const S = this.getNeighborValue(current, x, y, 'S');
            const W = this.getNeighborValue(current, x, y, 'W');
            
            // Zhang-Suen Phase 1 conditions
            if (neighbors >= 2 && neighbors <= 6 &&
                transitions === 1 &&
                (N * E * S) === 0 &&
                (E * S * W) === 0) {
              
              // Optional: preserve endpoints
              if (preserveEndpoints && neighbors === 1) {
                continue;
              }
              
              toRemove1.push([y, x]);
            }
          }
        }
      }
      
      // Apply removals from Phase 1
      for (const [y, x] of toRemove1) {
        current[y][x] = 0;
        hasChanged = true;
      }
      
      // Phase 2
      const toRemove2: [number, number][] = [];
      
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          if (current[y][x] === 1) {
            const neighbors = this.countNeighbors(current, x, y);
            const transitions = this.countTransitions(current, x, y);
            
            const N = this.getNeighborValue(current, x, y, 'N');
            const E = this.getNeighborValue(current, x, y, 'E');
            const S = this.getNeighborValue(current, x, y, 'S');
            const W = this.getNeighborValue(current, x, y, 'W');
            
            // Zhang-Suen Phase 2 conditions
            if (neighbors >= 2 && neighbors <= 6 &&
                transitions === 1 &&
                (N * E * W) === 0 &&
                (N * S * W) === 0) {
              
              // Optional: preserve endpoints
              if (preserveEndpoints && neighbors === 1) {
                continue;
              }
              
              toRemove2.push([y, x]);
            }
          }
        }
      }
      
      // Apply removals from Phase 2
      for (const [y, x] of toRemove2) {
        current[y][x] = 0;
        hasChanged = true;
      }
    }
    
    return current;
  }

  // Main thinning function using Canvas
  public async thinImage(
    imageBuffer: Buffer, 
    config: LineThinnessConfig
  ): Promise<{ success: boolean; processedImageBuffer?: Buffer; width?: number; height?: number; error?: string }> {
    try {
      // Load image using Canvas
      const image = await loadImage(imageBuffer);
      const canvas = createCanvas(image.width, image.height);
      const ctx = canvas.getContext('2d');
      
      // Draw image to canvas
      ctx.drawImage(image, 0, 0);
      
      // Get image data
      const imageData = ctx.getImageData(0, 0, image.width, image.height);
      
      // Convert to binary
      let binary = this.toBinary(imageData.data, image.width, image.height);
      
      // Apply Zhang-Suen thinning for specified iterations
      for (let i = 0; i < config.iterations; i++) {
        binary = this.zhangSuenThinning(binary, config.preserveEndpoints || false);
      }
      
      // Convert back to image data
      const processedData = this.fromBinary(binary, config.outputStyle);
      
      // Create new canvas with processed data
      const outputCanvas = createCanvas(image.width, image.height);
      const outputCtx = outputCanvas.getContext('2d');
      const outputImageData = outputCtx.createImageData(image.width, image.height);
      
      // Copy processed data to output image data
      outputImageData.data.set(processedData);
      outputCtx.putImageData(outputImageData, 0, 0);
      
      // Convert canvas to buffer
      const processedBuffer = outputCanvas.toBuffer('image/png');
      
      return {
        success: true,
        processedImageBuffer: processedBuffer,
        width: image.width,
        height: image.height
      };
      
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error during thinning'
      };
    }
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse FormData using formidable
    const form = formidable({
      maxFileSize: 50 * 1024 * 1024, // 50MB limit
    });

    const [fields, files] = await form.parse(req);
    
    console.log('=== PRODUCTION LINE THINNING API CALLED ===');
    console.log('Parsed FormData:', {
      fieldsKeys: Object.keys(fields || {}),
      filesKeys: Object.keys(files || {}),
      hasImageFile: !!(files.image && files.image[0]),
      hasConfig: !!(fields.config && fields.config[0])
    });
    
    // Get image file and config
    const imageFile = files.image?.[0];
    const configString = fields.config?.[0];
    
    if (!imageFile || !configString) {
      return res.status(400).json({ 
        error: 'Missing required fields: image file and config' 
      });
    }

    // Parse config
    let config: LineThinnessConfig;
    try {
      config = JSON.parse(configString);
    } catch {
      return res.status(400).json({
        error: 'Invalid config JSON'
      });
    }

    // Validate config
    if (!['black-on-white', 'white-on-black'].includes(config.outputStyle)) {
      return res.status(400).json({
        error: 'Invalid outputStyle. Must be "black-on-white" or "white-on-black"'
      });
    }

    if (config.iterations < 1 || config.iterations > 20) {
      return res.status(400).json({
        error: 'Invalid iterations. Must be between 1 and 20'
      });
    }

    // Read image file to buffer
    const fs = await import('fs');
    const imageBuffer = await fs.promises.readFile(imageFile.filepath);
    
    // Process image with Zhang-Suen algorithm
    const thinning = new ImageThinning();
    const result = await thinning.thinImage(imageBuffer, config);
    
    if (!result.success || !result.processedImageBuffer) {
      return res.status(500).json({
        error: result.error || 'Failed to process image'
      });
    }
    
    // Return processed image as PNG
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Length', result.processedImageBuffer.length);
    return res.status(200).send(result.processedImageBuffer);
    
  } catch (error) {
    console.error('Line thinning error:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Line thinning processing failed'
    });
  }
}