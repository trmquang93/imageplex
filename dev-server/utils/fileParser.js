/**
 * Unified file parsing interface for development environment
 * JavaScript version of the TypeScript fileParser
 */

/**
 * Parse multer file (development environment)
 * @param {any} multerFile - The multer file object
 * @returns {Object} ParsedFile object
 */
function parseMulterFile(multerFile) {
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
 * Create a Blob from ParsedFile for FAL.AI upload
 * Uses the working pattern from development environment
 * @param {Object} file - ParsedFile object
 * @returns {Blob} Blob for FAL.AI upload
 */
export function createFalBlob(file) {
  return new Blob([file.buffer], { 
    type: file.mimetype || 'application/octet-stream' 
  });
}

/**
 * Unified error handling for file parsing
 * @param {any} error - The error to wrap
 * @param {string} context - Context string for debugging
 * @returns {Error} Wrapped error
 */
export function createFileParsingError(error, context) {
  const message = error instanceof Error ? error.message : String(error);
  return new Error(`File parsing failed (${context}): ${message}`);
}

/**
 * Validate parsed file meets requirements
 * @param {Object} file - ParsedFile object
 * @param {number} maxSizeBytes - Maximum allowed file size in bytes
 */
export function validateParsedFile(file, maxSizeBytes = 50 * 1024 * 1024) {
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

/**
 * Parse uploaded file for development environment (multer only)
 * @param {any} req - Express request object with multer file
 * @returns {Object} ParsedFile object
 */
export function parseUploadedFile(req) {
  // Development environment uses multer
  if (req.file && req.file.buffer) {
    return parseMulterFile(req.file);
  } else if (req.files && req.files.image) {
    // Handle cases where file is in req.files.image instead of req.file
    return parseMulterFile(req.files.image);
  } else {
    throw new Error('No file found in multer request');
  }
}