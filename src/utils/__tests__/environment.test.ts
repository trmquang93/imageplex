/**
 * Tests for environment detection utilities
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { 
  isDevelopment, 
  isProduction, 
  getApiBaseUrl, 
  getFalApiKey, 
  getEnvironmentInfo 
} from '../environment';

// Mock window.location
const mockLocation = (overrides: Partial<Location> = {}) => {
  const location = {
    hostname: 'localhost',
    port: '3000',
    origin: 'http://localhost:3000',
    ...overrides
  };
  Object.defineProperty(window, 'location', {
    value: location,
    writable: true
  });
};

// Mock import.meta.env
const mockImportMeta = (env: Record<string, any> = {}) => {
  Object.defineProperty(import.meta, 'env', {
    value: {
      NODE_ENV: 'development',
      VITE_FAL_API_KEY: 'test-api-key',
      ...env
    },
    writable: true,
    configurable: true
  });
};

describe('Environment Detection', () => {
  beforeEach(() => {
    // Reset process.env for each test
    vi.stubGlobal('process', {
      env: {
        NODE_ENV: 'development'
      }
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('isDevelopment()', () => {
    it('should return true when NODE_ENV is development', () => {
      vi.stubGlobal('process', { env: { NODE_ENV: 'development' } });
      mockLocation({ hostname: 'example.com', port: '443' });
      
      expect(isDevelopment()).toBe(true);
    });

    it('should return true when hostname is localhost', () => {
      vi.stubGlobal('process', { env: { NODE_ENV: 'production' } });
      mockLocation({ hostname: 'localhost', port: '443' });
      
      expect(isDevelopment()).toBe(true);
    });

    it('should return true when hostname is 127.0.0.1', () => {
      vi.stubGlobal('process', { env: { NODE_ENV: 'production' } });
      mockLocation({ hostname: '127.0.0.1', port: '443' });
      
      expect(isDevelopment()).toBe(true);
    });

    it('should return true when port is 3000', () => {
      vi.stubGlobal('process', { env: { NODE_ENV: 'production' } });
      mockLocation({ hostname: 'example.com', port: '3000' });
      
      expect(isDevelopment()).toBe(true);
    });

    it('should return true when port is 5173 (Vite default)', () => {
      vi.stubGlobal('process', { env: { NODE_ENV: 'production' } });
      mockLocation({ hostname: 'example.com', port: '5173' });
      
      expect(isDevelopment()).toBe(true);
    });

    it('should return false in production environment', () => {
      vi.stubGlobal('process', { env: { NODE_ENV: 'production' } });
      mockLocation({ hostname: 'imageplex.vercel.app', port: '443' });
      
      expect(isDevelopment()).toBe(false);
    });
  });

  describe('isProduction()', () => {
    it('should return opposite of isDevelopment', () => {
      vi.stubGlobal('process', { env: { NODE_ENV: 'development' } });
      mockLocation({ hostname: 'localhost', port: '3000' });
      
      expect(isProduction()).toBe(false);
      expect(isProduction()).toBe(!isDevelopment());
    });

    it('should return true in production environment', () => {
      vi.stubGlobal('process', { env: { NODE_ENV: 'production' } });
      mockLocation({ hostname: 'imageplex.vercel.app', port: '443' });
      
      expect(isProduction()).toBe(true);
    });
  });

  describe('getApiBaseUrl()', () => {
    it('should return empty string in development', () => {
      vi.stubGlobal('process', { env: { NODE_ENV: 'development' } });
      mockLocation({ hostname: 'localhost', port: '3000', origin: 'http://localhost:3000' });
      
      expect(getApiBaseUrl()).toBe('');
    });

    it('should return window origin in production', () => {
      vi.stubGlobal('process', { env: { NODE_ENV: 'production' } });
      mockLocation({ 
        hostname: 'imageplex.vercel.app', 
        port: '443', 
        origin: 'https://imageplex.vercel.app' 
      });
      
      expect(getApiBaseUrl()).toBe('https://imageplex.vercel.app');
    });
  });

  describe('getFalApiKey()', () => {
    it('should return API key from Vite environment in development', () => {
      vi.stubGlobal('process', { env: { NODE_ENV: 'development' } });
      mockLocation({ hostname: 'localhost', port: '3000' });
      mockImportMeta({ VITE_FAL_API_KEY: 'test-dev-api-key' });
      
      expect(getFalApiKey()).toBe('test-dev-api-key');
    });

    it('should throw error if API key is missing in development', () => {
      vi.stubGlobal('process', { env: { NODE_ENV: 'development' } });
      mockLocation({ hostname: 'localhost', port: '3000' });
      mockImportMeta({ VITE_FAL_API_KEY: undefined });
      
      expect(() => getFalApiKey()).toThrow('VITE_FAL_API_KEY environment variable is not configured for development');
    });

    it('should return empty string in production', () => {
      vi.stubGlobal('process', { env: { NODE_ENV: 'production' } });
      mockLocation({ hostname: 'imageplex.vercel.app', port: '443' });
      
      expect(getFalApiKey()).toBe('');
    });
  });

  describe('getEnvironmentInfo()', () => {
    it('should return complete environment information in development', () => {
      vi.stubGlobal('process', { env: { NODE_ENV: 'development' } });
      mockLocation({ 
        hostname: 'localhost', 
        port: '3000', 
        origin: 'http://localhost:3000' 
      });
      mockImportMeta({ VITE_FAL_API_KEY: 'test-key' });
      
      const info = getEnvironmentInfo();
      
      expect(info).toEqual({
        isDevelopment: true,
        isProduction: false,
        hostname: 'localhost',
        port: '3000',
        nodeEnv: 'development',
        apiBaseUrl: '',
        hasFalApiKey: true
      });
    });

    it('should return complete environment information in production', () => {
      vi.stubGlobal('process', { env: { NODE_ENV: 'production' } });
      mockLocation({ 
        hostname: 'imageplex.vercel.app', 
        port: '443', 
        origin: 'https://imageplex.vercel.app' 
      });
      
      const info = getEnvironmentInfo();
      
      expect(info).toEqual({
        isDevelopment: false,
        isProduction: true,
        hostname: 'imageplex.vercel.app',
        port: '443',
        nodeEnv: 'production',
        apiBaseUrl: 'https://imageplex.vercel.app',
        hasFalApiKey: true
      });
    });

    it('should indicate missing API key in development', () => {
      vi.stubGlobal('process', { env: { NODE_ENV: 'development' } });
      mockLocation({ hostname: 'localhost', port: '3000' });
      mockImportMeta({ VITE_FAL_API_KEY: '' });
      
      const info = getEnvironmentInfo();
      
      expect(info.hasFalApiKey).toBe(false);
    });
  });
});