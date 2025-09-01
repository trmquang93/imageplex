/**
 * Environment detection utilities for ImagePlex
 * Determines whether we're running in development or production
 */

export const isDevelopment = (): boolean => {
  // Check if we're in development mode
  return (
    process.env.NODE_ENV === 'development' ||
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.port === '3000' ||
    window.location.port === '5173' // Vite default port
  );
};

export const isProduction = (): boolean => {
  return !isDevelopment();
};

export const getApiBaseUrl = (): string => {
  if (isDevelopment()) {
    // In development, we'll call FAL.AI directly, so no base URL needed
    return '';
  }
  
  // In production, use the current origin for API routes
  return window.location.origin;
};

export const getFalApiKey = (): string => {
  // In development, use the Vite environment variable
  if (isDevelopment()) {
    const apiKey = import.meta.env.VITE_FAL_API_KEY;
    if (!apiKey) {
      throw new Error('VITE_FAL_API_KEY environment variable is not configured for development');
    }
    return apiKey;
  }
  
  // In production, API key is handled server-side, so we don't need it client-side
  return '';
};

export const getEnvironmentInfo = () => {
  return {
    isDevelopment: isDevelopment(),
    isProduction: isProduction(),
    hostname: window.location.hostname,
    port: window.location.port,
    nodeEnv: process.env.NODE_ENV,
    apiBaseUrl: getApiBaseUrl(),
    hasFalApiKey: isDevelopment() ? !!import.meta.env.VITE_FAL_API_KEY : true
  };
};