import '@testing-library/jest-dom';
import { beforeEach, vi } from 'vitest';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

// Mock navigator.language
Object.defineProperty(navigator, 'language', {
  writable: true,
  configurable: true,
  value: 'en-US',
});

beforeEach(() => {
  // Clear localStorage mock
  localStorageMock.getItem.mockClear();
  localStorageMock.setItem.mockClear();
  localStorageMock.removeItem.mockClear();
  localStorageMock.clear.mockClear();
  
  // Reset navigator.language
  Object.defineProperty(navigator, 'language', {
    writable: true,
    configurable: true,
    value: 'en-US',
  });
  
  // Ensure localStorage is available
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });
});