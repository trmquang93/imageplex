import { describe, it, expect, vi, beforeEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { I18nProvider, useI18n, useTranslation } from '../index';
import { mockStorage } from '../../test/i18n-test-utils';
import type { Language } from '../types';

// Mock localStorage
vi.stubGlobal('localStorage', mockStorage);

describe('I18n System', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset navigator.language
    Object.defineProperty(navigator, 'language', {
      writable: true,
      configurable: true,
      value: 'en-US',
    });
  });

  describe('I18nProvider', () => {
    it('should provide default English language', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <I18nProvider>{children}</I18nProvider>
      );

      const { result } = renderHook(() => useI18n(), { wrapper });

      expect(result.current.language).toBe('en');
    });

    it('should detect Vietnamese from browser language', () => {
      Object.defineProperty(navigator, 'language', {
        writable: true,
        configurable: true,
        value: 'vi-VN',
      });

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <I18nProvider>{children}</I18nProvider>
      );

      const { result } = renderHook(() => useI18n(), { wrapper });

      expect(result.current.language).toBe('vi');
    });

    it('should use saved language from localStorage', () => {
      mockStorage.getItem.mockReturnValue('vi');

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <I18nProvider>{children}</I18nProvider>
      );

      const { result } = renderHook(() => useI18n(), { wrapper });

      expect(result.current.language).toBe('vi');
      expect(mockStorage.getItem).toHaveBeenCalledWith('imageplex-language');
    });

    it('should save language changes to localStorage', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <I18nProvider>{children}</I18nProvider>
      );

      const { result } = renderHook(() => useI18n(), { wrapper });

      act(() => {
        result.current.setLanguage('vi');
      });

      expect(mockStorage.setItem).toHaveBeenCalledWith('imageplex-language', 'vi');
      expect(result.current.language).toBe('vi');
    });
  });

  describe('Translation Function', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <I18nProvider>{children}</I18nProvider>
    );

    it('should translate basic keys', () => {
      const { result } = renderHook(() => useTranslation(), { wrapper });

      expect(result.current.t('upload.title')).toBe('Upload Your Images');
      expect(result.current.t('common.loading')).toBe('Loading...');
    });

    it('should handle nested keys', () => {
      const { result } = renderHook(() => useTranslation(), { wrapper });

      expect(result.current.t('features.resize.title')).toBe('Intelligent Resize');
      expect(result.current.t('options.square')).toBe('Square (1:1)');
    });

    it('should handle array access', () => {
      const { result } = renderHook(() => useTranslation(), { wrapper });

      expect(result.current.t('features.resize.features.0')).toBe('Square, Portrait, Landscape formats');
      expect(result.current.t('features.resize.features.1')).toBe('Complete artwork redrawing');
    });

    it('should return key as fallback for missing translations', () => {
      const { result } = renderHook(() => useTranslation(), { wrapper });

      expect(result.current.t('nonexistent.key')).toBe('nonexistent.key');
    });

    it('should switch to Vietnamese translations', () => {
      const { result } = renderHook(() => useI18n(), { wrapper });

      act(() => {
        result.current.setLanguage('vi');
      });

      expect(result.current.t('upload.title')).toBe('Tải Lên Hình Ảnh');
      expect(result.current.t('common.loading')).toBe('Đang tải...');
      expect(result.current.t('features.resize.title')).toBe('Thay Đổi Kích Thước Thông Minh');
    });

    it('should handle Vietnamese array translations', () => {
      const { result } = renderHook(() => useI18n(), { wrapper });

      act(() => {
        result.current.setLanguage('vi');
      });

      expect(result.current.t('features.resize.features.0')).toBe('Định dạng Vuông, Dọc, Ngang');
      expect(result.current.t('features.resize.features.1')).toBe('Tái vẽ tác phẩm hoàn chỉnh');
    });
  });

  describe('Error Handling', () => {
    it('should throw error when useI18n is used outside provider', () => {
      expect(() => {
        renderHook(() => useI18n());
      }).toThrow('useI18n must be used within an I18nProvider');
    });

    it('should handle localStorage errors gracefully', () => {
      mockStorage.getItem.mockImplementation(() => {
        throw new Error('localStorage not available');
      });

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <I18nProvider>{children}</I18nProvider>
      );

      const { result } = renderHook(() => useI18n(), { wrapper });

      // Should fall back to browser language detection
      expect(result.current.language).toBe('en');
    });
  });

  describe('Language Validation', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <I18nProvider>{children}</I18nProvider>
    );

    it('should only accept valid language codes', () => {
      const { result } = renderHook(() => useI18n(), { wrapper });

      // Valid languages
      act(() => {
        result.current.setLanguage('vi' as Language);
      });
      expect(result.current.language).toBe('vi');

      act(() => {
        result.current.setLanguage('en' as Language);
      });
      expect(result.current.language).toBe('en');
    });

    it('should ignore invalid languages in localStorage', () => {
      mockStorage.getItem.mockReturnValue('invalid-lang');

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <I18nProvider>{children}</I18nProvider>
      );

      const { result } = renderHook(() => useI18n(), { wrapper });

      // Should fall back to browser detection
      expect(result.current.language).toBe('en');
    });
  });
});