import formidable from 'formidable';
import fs from 'fs';

/**
 * Unified file parsing interface for both development and production environments
 */
export interface ParsedFile {
  buffer: Buffer;
  mimetype: string;
  filename: string;
  size: number;
}

/**
 * Unified file parser that works across development (multer) and production (formidable/Vercel) environments
 */
export async function parseUploadedFile(req: any): Promise<ParsedFile> {
  // Detect environment based on request structure
  const isMulterRequest = req.file && req.file.buffer;
  const isFormidableRequest = !isMulterRequest && req.body !== undefined;
  
  if (isMulterRequest) {
    // Development environment using multer
    return parseMulterFile(req.file);
  } else if (isFormidableRequest) {
    // Production environment using formidable
    return await parseFormidableFile(req);
  } else {
    throw new Error('Unsupported request format for file parsing');
  }
}

/**
 * Parse multer file (development environment)
 */
function parseMulterFile(multerFile: any): ParsedFile {
  if (!multerFile || !multerFile.buffer) {
    throw new Error('No file found in multer request');
  }
  
  return {
    buffer: multerFile.buffer,
    mimetype: multerFile.mimetype || 'application/octet-stream',
    filename: multerFile.originalname || 'unknown',
    size: multerFile.size || multerFile.buffer.length
  };
}

/**
 * Parse formidable file (production environment)
 */
async function parseFormidableFile(req: any): Promise<ParsedFile> {
  const form = formidable({
    maxFileSize: 50 * 1024 * 1024, // 50MB limit
  });
  const [fields, files] = await form.parse(req);
  
  const file = Array.isArray(files.file) ? files.file[0] : files.file;
  
  if (!file) {
    // Try other common field names
    const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
    if (imageFile) {
      return parseFormidableFileObject(imageFile);
    }
    throw new Error('No file found in formidable request');
  }
  
  return parseFormidableFileObject(file);
}

/**
 * Parse formidable with additional fields (for lineThinner and similar endpoints)
 */
export async function parseFormidableWithFields(req: any): Promise<{ file: ParsedFile; fields: any }> {
  const form = formidable({
    maxFileSize: 50 * 1024 * 1024, // 50MB limit
  });
  const [fields, files] = await form.parse(req);
  
  const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
  
  if (!imageFile) {
    throw new Error('No image file found in formidable request');
  }
  
  const parsedFile = parseFormidableFileObject(imageFile);
  
  return {
    file: parsedFile,
    fields: fields
  };
}

/**
 * Convert formidable file object to ParsedFile
 */
function parseFormidableFileObject(file: any): ParsedFile {
  if (!file.filepath) {
    throw new Error('Formidable file missing filepath');
  }
  
  // Read file from disk (as in original production code)
  const fileBuffer = fs.readFileSync(file.filepath);
  
  return {
    buffer: fileBuffer,
    mimetype: file.mimetype || 'application/octet-stream',
    filename: file.originalFilename || 'unknown',
    size: file.size || fileBuffer.length
  };
}

/**
 * Create a Blob from ParsedFile for FAL.AI upload
 * Uses the working pattern from development environment
 */
export function createFalBlob(file: ParsedFile): Blob {
  return new Blob([file.buffer], { 
    type: file.mimetype || 'application/octet-stream' 
  });
}

/**
 * Unified error handling for file parsing
 */
export function createFileParsingError(error: any, context: string): Error {
  const message = error instanceof Error ? error.message : String(error);
  return new Error(`File parsing failed (${context}): ${message}`);
}

/**
 * Validate parsed file meets requirements
 */
export function validateParsedFile(file: ParsedFile, maxSizeBytes: number = 50 * 1024 * 1024): void {
  if (!file.buffer || file.buffer.length === 0) {
    throw new Error('File buffer is empty');
  }
  
  if (file.size > maxSizeBytes) {
    throw new Error(`File too large. Maximum size allowed is ${Math.round(maxSizeBytes / (1024 * 1024))}MB`);
  }
  
  if (!file.mimetype || !file.mimetype.startsWith('image/')) {
    throw new Error('File must be an image');
  }
}