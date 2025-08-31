import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Language, I18nContextType, TranslationKeys } from './types';

// Import translation files
import enTranslations from './translations/en.json';
import viTranslations from './translations/vi.json';

const translations: Record<Language, TranslationKeys> = {
  en: enTranslations as TranslationKeys,
  vi: viTranslations as TranslationKeys
};

// Create context
const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Helper function to get nested value from object using dot notation
const getNestedValue = (obj: any, path: string): string => {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : path;
  }, obj);
};

// Provider component
export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Check localStorage first
    const saved = localStorage.getItem('imageplex-language');
    if (saved && (saved === 'en' || saved === 'vi')) {
      return saved as Language;
    }
    
    // Fall back to browser language detection
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('vi')) {
      return 'vi';
    }
    
    return 'en'; // Default fallback
  });

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('imageplex-language', language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    const currentTranslations = translations[language];
    
    // Handle array access (e.g., "features.resize.features.0")
    if (key.includes('.') && /\.\d+$/.test(key)) {
      const parts = key.split('.');
      const arrayIndex = parseInt(parts.pop()!);
      const arrayPath = parts.join('.');
      const array = getNestedValue(currentTranslations, arrayPath);
      
      if (Array.isArray(array) && array[arrayIndex] !== undefined) {
        return array[arrayIndex];
      }
    }
    
    // Handle regular nested keys
    const value = getNestedValue(currentTranslations, key);
    
    // If translation not found, return the key as fallback
    if (typeof value !== 'string') {
      console.warn(`Translation missing for key: ${key} in language: ${language}`);
      return key;
    }
    
    return value;
  };

  const value: I18nContextType = {
    language,
    setLanguage,
    t
  };

  return React.createElement(I18nContext.Provider, { value }, children);
};

// Custom hook to use i18n
export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

// Utility hook for translations only
export const useTranslation = () => {
  const { t } = useI18n();
  return { t };
};

// Export types
export type { Language, TranslationKeys, I18nContextType };