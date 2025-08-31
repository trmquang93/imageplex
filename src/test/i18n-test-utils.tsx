import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { I18nProvider } from '../i18n';
import type { Language } from '../i18n/types';

// Mock localStorage for testing
const mockStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
};

Object.defineProperty(window, 'localStorage', {
  value: mockStorage
});

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialLanguage?: Language;
  mockNavigatorLanguage?: string;
}

// Custom render function with I18nProvider wrapper
const customRender = (
  ui: ReactElement,
  {
    initialLanguage,
    mockNavigatorLanguage = 'en-US',
    ...renderOptions
  }: CustomRenderOptions = {}
) => {
  // Mock navigator.language
  Object.defineProperty(navigator, 'language', {
    writable: true,
    configurable: true,
    value: mockNavigatorLanguage,
  });

  // Mock localStorage
  mockStorage.getItem.mockImplementation((key: string) => {
    if (key === 'imageplex-language' && initialLanguage) {
      return initialLanguage;
    }
    return null;
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return <I18nProvider>{children}</I18nProvider>;
  };

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

// Helper to test translation keys exist
export const checkTranslationKey = (translations: any, key: string): boolean => {
  const keys = key.split('.');
  let current = translations;
  
  for (const k of keys) {
    if (current && typeof current === 'object' && k in current) {
      current = current[k];
    } else {
      return false;
    }
  }
  
  return typeof current === 'string' || Array.isArray(current);
};

// Helper to get all translation keys from an object
export const getAllTranslationKeys = (obj: any, prefix = ''): string[] => {
  let keys: string[] = [];
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        keys = keys.concat(getAllTranslationKeys(obj[key], fullKey));
      } else {
        keys.push(fullKey);
      }
    }
  }
  
  return keys;
};

// Re-export everything from @testing-library/react
export * from '@testing-library/react';
export { customRender as render };
export { mockStorage };