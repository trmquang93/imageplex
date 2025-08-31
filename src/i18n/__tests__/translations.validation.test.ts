import { describe, it, expect } from 'vitest';
import enTranslations from '../translations/en.json';
import viTranslations from '../translations/vi.json';
import { checkTranslationKey, getAllTranslationKeys } from '../../test/i18n-test-utils';

describe('Translation Completeness Validation', () => {
  describe('Translation Structure Integrity', () => {
    it('should have matching structure between English and Vietnamese', () => {
      const enKeys = getAllTranslationKeys(enTranslations);
      const viKeys = getAllTranslationKeys(viTranslations);

      expect(enKeys.sort()).toEqual(viKeys.sort());
    });

    it('should have all required top-level sections', () => {
      const requiredSections = [
        'upload',
        'features',
        'options',
        'processing',
        'results',
        'common'
      ];

      requiredSections.forEach(section => {
        expect(enTranslations).toHaveProperty(section);
        expect(viTranslations).toHaveProperty(section);
      });
    });

    it('should have all required upload translations', () => {
      const uploadKeys = [
        'upload.title',
        'upload.subtitle',
        'upload.dragText',
        'upload.browseText',
        'upload.chooseFiles',
        'upload.maxFileSize',
        'upload.successMessage',
        'upload.processButton'
      ];

      uploadKeys.forEach(key => {
        expect(checkTranslationKey(enTranslations, key)).toBe(true);
        expect(checkTranslationKey(viTranslations, key)).toBe(true);
      });
    });

    it('should have all required feature translations', () => {
      const features = ['resize', 'coloring', 'lineArt'];
      const featureProperties = ['title', 'description', 'features'];

      features.forEach(feature => {
        featureProperties.forEach(prop => {
          const key = `features.${feature}.${prop}`;
          expect(checkTranslationKey(enTranslations, key)).toBe(true);
          expect(checkTranslationKey(viTranslations, key)).toBe(true);
        });

        // Check feature arrays have same length
        const enFeatures = enTranslations.features[feature as keyof typeof enTranslations.features].features;
        const viFeatures = viTranslations.features[feature as keyof typeof viTranslations.features].features;
        expect(enFeatures.length).toBe(viFeatures.length);
      });
    });

    it('should have all required option translations', () => {
      const optionKeys = [
        'options.aspectRatio',
        'options.coloringStyle',
        'options.lineStyle',
        'options.square',
        'options.portrait',
        'options.landscape',
        'options.widescreen',
        'options.mobile',
        'options.crayon',
        'options.watercolor',
        'options.digital',
        'options.realistic',
        'options.blackOnWhite',
        'options.whiteOnBlack',
        'options.colored'
      ];

      optionKeys.forEach(key => {
        expect(checkTranslationKey(enTranslations, key)).toBe(true);
        expect(checkTranslationKey(viTranslations, key)).toBe(true);
      });
    });

    it('should have all required processing status translations', () => {
      const processingKeys = [
        'processing.initializing',
        'processing.preparing',
        'processing.resizing',
        'processing.coloring',
        'processing.lineArt',
        'processing.finalizing',
        'processing.complete',
        'processing.error'
      ];

      processingKeys.forEach(key => {
        expect(checkTranslationKey(enTranslations, key)).toBe(true);
        expect(checkTranslationKey(viTranslations, key)).toBe(true);
      });
    });

    it('should have all required results modal translations', () => {
      const resultsKeys = [
        'results.title',
        'results.original',
        'results.processed',
        'results.download',
        'results.useAsNew',
        'results.close'
      ];

      resultsKeys.forEach(key => {
        expect(checkTranslationKey(enTranslations, key)).toBe(true);
        expect(checkTranslationKey(viTranslations, key)).toBe(true);
      });
    });

    it('should have all required common translations', () => {
      const commonKeys = [
        'common.loading',
        'common.error',
        'common.success',
        'common.cancel',
        'common.confirm',
        'common.language'
      ];

      commonKeys.forEach(key => {
        expect(checkTranslationKey(enTranslations, key)).toBe(true);
        expect(checkTranslationKey(viTranslations, key)).toBe(true);
      });
    });
  });

  describe('Translation Quality Validation', () => {
    it('should not have empty strings in English translations', () => {
      const allKeys = getAllTranslationKeys(enTranslations);
      
      allKeys.forEach(key => {
        const value = key.split('.').reduce((obj: any, k) => obj?.[k], enTranslations);
        if (typeof value === 'string') {
          expect(value.trim()).not.toBe('');
        }
      });
    });

    it('should not have empty strings in Vietnamese translations', () => {
      const allKeys = getAllTranslationKeys(viTranslations);
      
      allKeys.forEach(key => {
        const value = key.split('.').reduce((obj: any, k) => obj?.[k], viTranslations);
        if (typeof value === 'string') {
          expect(value.trim()).not.toBe('');
        }
      });
    });

    it('should not have placeholder text in Vietnamese translations', () => {
      const allKeys = getAllTranslationKeys(viTranslations);
      const forbiddenPatterns = [
        /TODO/i,
        /PLACEHOLDER/i,
        /\[.*\]/,
        /\{.*\}/
      ];
      
      allKeys.forEach(key => {
        const value = key.split('.').reduce((obj: any, k) => obj?.[k], viTranslations);
        if (typeof value === 'string') {
          forbiddenPatterns.forEach(pattern => {
            expect(value).not.toMatch(pattern);
          });
        }
      });
    });

    it('should have different content for English and Vietnamese (not identical)', () => {
      const criticalKeys = [
        'upload.title',
        'features.resize.title',
        'features.coloring.title',
        'features.lineArt.title',
        'processing.initializing',
        'results.download'
      ];

      criticalKeys.forEach(key => {
        const enValue = key.split('.').reduce((obj: any, k) => obj?.[k], enTranslations);
        const viValue = key.split('.').reduce((obj: any, k) => obj?.[k], viTranslations);
        
        expect(enValue).not.toBe(viValue);
      });
    });

    it('should have appropriate Vietnamese diacritics and characters', () => {
      const vietnameseKeys = [
        'upload.title',
        'features.resize.title',
        'common.language'
      ];

      vietnameseKeys.forEach(key => {
        const value = key.split('.').reduce((obj: any, k) => obj?.[k], viTranslations);
        if (typeof value === 'string') {
          // Should contain Vietnamese characters with diacritics
          expect(value).toMatch(/[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i);
        }
      });
    });

    it('should use consistent terminology across translations', () => {
      // Check that "AI" appears in related contexts in Vietnamese
      const aiTerms = [
        viTranslations.features.coloring.title,
        viTranslations.features.coloring.description
      ];

      aiTerms.forEach(term => {
        expect(term.toLowerCase()).toContain('ai');
      });

      // Check that "Hình Ảnh" (Image) is used consistently
      expect(viTranslations.upload.title).toContain('Hình Ảnh');
      expect(viTranslations.features.coloring.title).toContain('Hình Ảnh');
    });
  });

  describe('Array Translation Validation', () => {
    it('should have consistent array lengths for feature descriptions', () => {
      const features = ['resize', 'coloring', 'lineArt'];
      
      features.forEach(feature => {
        const enFeatures = enTranslations.features[feature as keyof typeof enTranslations.features].features;
        const viFeatures = viTranslations.features[feature as keyof typeof viTranslations.features].features;
        
        expect(viFeatures.length).toBe(enFeatures.length);
        
        // Each feature should be translated
        viFeatures.forEach((viFeature, index) => {
          const enFeature = enFeatures[index];
          expect(viFeature).not.toBe(enFeature);
          expect(viFeature.trim()).not.toBe('');
        });
      });
    });
  });

  describe('Special Characters and Formatting', () => {
    it('should preserve special symbols and emojis', () => {
      // Check that success message preserves checkmark
      expect(viTranslations.upload.successMessage).toMatch(/^✓/);
      
      // Check that file size info preserves bullet
      expect(viTranslations.upload.maxFileSize).toContain('•');
    });

    it('should preserve parenthetical information in options', () => {
      const optionsWithParentheses = [
        'options.square',
        'options.portrait',
        'options.landscape',
        'options.widescreen',
        'options.mobile'
      ];

      optionsWithParentheses.forEach(key => {
        const value = key.split('.').reduce((obj: any, k) => obj?.[k], viTranslations);
        expect(value).toMatch(/\([^)]+\)/);
      });
    });

    it('should not contain HTML or markup in translations', () => {
      const allKeys = getAllTranslationKeys(viTranslations);
      const htmlPattern = /<[^>]*>/;
      
      allKeys.forEach(key => {
        const value = key.split('.').reduce((obj: any, k) => obj?.[k], viTranslations);
        if (typeof value === 'string') {
          expect(value).not.toMatch(htmlPattern);
        }
      });
    });
  });
});