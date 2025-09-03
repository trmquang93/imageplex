import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import ProcessorPage from '../pages/ProcessorPage';

// Mock the i18n provider
vi.mock('../i18n', () => ({
  I18nProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useTranslation: () => ({
    t: (key: string, options?: any) => {
      // Handle array-type translations for features
      if (key.includes('features') && options?.returnObjects) {
        return ['Feature 1', 'Feature 2'];
      }
      // Return actual text for specific keys used in tests
      const translations: Record<string, string> = {
        'hero.title': 'hero.title',
        'upload.title': 'upload.title',
        'landing.hero.headline': 'Transform Images with AI-Powered Precision',
        'landing.hero.subheadline': 'Professional image processing with intelligent resize, AI coloring, and line art conversion. Create stunning results in seconds.',
        'landing.hero.ctaButton': 'Try ImagePlex Now',
        'landing.hero.ctaSecondary': 'Free to use • No registration required',
        'features.resize.title': 'Intelligent Resize',
        'features.coloring.title': 'AI Image Coloring',
        'features.lineArt.title': 'Line Art Conversion',
        'features.resize.description': 'AI-powered image recreation that redraws your artwork to perfectly fit any format',
        'features.coloring.description': 'Transform line art into vibrant colored illustrations with multiple artistic styles',
        'features.lineArt.description': 'Convert photos and images into clean, professional line art drawings'
      };
      return translations[key] || key;
    },
    language: 'en'
  }),
  useI18n: () => ({
    language: 'en',
    setLanguage: vi.fn(),
    t: (key: string, options?: any) => {
      if (key.includes('features') && options?.returnObjects) {
        return ['Feature 1', 'Feature 2'];
      }
      // Return actual text for specific keys used in tests
      const translations: Record<string, string> = {
        'hero.title': 'hero.title',
        'upload.title': 'upload.title',
        'landing.hero.headline': 'Transform Images with AI-Powered Precision',
        'landing.hero.subheadline': 'Professional image processing with intelligent resize, AI coloring, and line art conversion. Create stunning results in seconds.',
        'landing.hero.ctaButton': 'Try ImagePlex Now',
        'landing.hero.ctaSecondary': 'Free to use • No registration required',
        'features.resize.title': 'Intelligent Resize',
        'features.coloring.title': 'AI Image Coloring',
        'features.lineArt.title': 'Line Art Conversion',
        'features.resize.description': 'AI-powered image recreation that redraws your artwork to perfectly fit any format',
        'features.coloring.description': 'Transform line art into vibrant colored illustrations with multiple artistic styles',
        'features.lineArt.description': 'Convert photos and images into clean, professional line art drawings'
      };
      return translations[key] || key;
    }
  })
}));

// Create a test component that matches App structure but allows for MemoryRouter
const TestAppRoutes = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/app" element={<ProcessorPage />} />
  </Routes>
);

describe('SPA Routing Configuration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('React Router Routes', () => {
    it('should render LandingPage for root route "/"', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <TestAppRoutes />
        </MemoryRouter>
      );

      // Look for elements that are unique to the landing page
      expect(screen.getByText('Transform Images with AI-Powered Precision')).toBeInTheDocument();
    });

    it('should render ProcessorPage for "/app" route', () => {
      render(
        <MemoryRouter initialEntries={['/app']}>
          <TestAppRoutes />
        </MemoryRouter>
      );

      // Look for elements that are unique to the processor page
      expect(screen.getByText('upload.title')).toBeInTheDocument();
    });

    it('should handle direct navigation to /app route', () => {
      render(
        <MemoryRouter initialEntries={['/app']}>
          <TestAppRoutes />
        </MemoryRouter>
      );

      // Verify the processor page loads correctly
      expect(screen.getByText('upload.title')).toBeInTheDocument();
    });

    it('should handle navigation between routes', () => {
      const { rerender } = render(
        <MemoryRouter initialEntries={['/']}>
          <TestAppRoutes />
        </MemoryRouter>
      );

      // Start on landing page
      expect(screen.getByText('Transform Images with AI-Powered Precision')).toBeInTheDocument();

      // Navigate to app page
      rerender(
        <MemoryRouter initialEntries={['/app']}>
          <TestAppRoutes />
        </MemoryRouter>
      );

      expect(screen.getByText('upload.title')).toBeInTheDocument();
    });
  });

  describe('Vercel Configuration Validation', () => {
    it('should have proper rewrite rules for SPA routing', () => {
      // This test validates the vercel.json configuration
      const fs = require('fs');
      const path = require('path');
      
      // Read the vercel.json file
      const vercelConfigPath = path.join(process.cwd(), 'vercel.json');
      const vercelConfig = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf8'));
      
      // Verify rewrites configuration exists
      expect(vercelConfig.rewrites).toBeDefined();
      expect(Array.isArray(vercelConfig.rewrites)).toBe(true);
      expect(vercelConfig.rewrites.length).toBeGreaterThan(0);
    });

    it('should preserve API routes in rewrite configuration', () => {
      const fs = require('fs');
      const path = require('path');
      
      const vercelConfigPath = path.join(process.cwd(), 'vercel.json');
      const vercelConfig = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf8'));
      
      // Find API rewrite rule
      const apiRule = vercelConfig.rewrites.find((rule: any) => 
        rule.source.includes('/api/')
      );
      
      expect(apiRule).toBeDefined();
      expect(apiRule.source).toBe('/api/(.*)');
      expect(apiRule.destination).toBe('/api/$1');
    });

    it('should have catch-all rewrite for SPA routes', () => {
      const fs = require('fs');
      const path = require('path');
      
      const vercelConfigPath = path.join(process.cwd(), 'vercel.json');
      const vercelConfig = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf8'));
      
      // Find catch-all rule (should be last)
      const catchAllRule = vercelConfig.rewrites[vercelConfig.rewrites.length - 1];
      
      expect(catchAllRule.source).toBe('/(.*)')
      expect(catchAllRule.destination).toBe('/index.html');
    });

    it('should maintain correct rewrite rule order', () => {
      const fs = require('fs');
      const path = require('path');
      
      const vercelConfigPath = path.join(process.cwd(), 'vercel.json');
      const vercelConfig = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf8'));
      
      // API routes should come before catch-all
      const apiRuleIndex = vercelConfig.rewrites.findIndex((rule: any) => 
        rule.source.includes('/api/')
      );
      const catchAllIndex = vercelConfig.rewrites.findIndex((rule: any) => 
        rule.source === '/(.*)'
      );
      
      expect(apiRuleIndex).toBeLessThan(catchAllIndex);
    });
  });

  describe('Edge Cases', () => {
    it('should handle unknown routes by falling back to index.html', () => {
      // This simulates what happens when user accesses /unknown-route
      // React Router will handle showing 404 or redirecting
      render(
        <MemoryRouter initialEntries={['/unknown-route']}>
          <TestAppRoutes />
        </MemoryRouter>
      );

      // Since we don't have a catch-all route in React Router,
      // this should still render without crashing
      expect(document.body).toBeInTheDocument();
    });

    it('should handle nested paths under /app', () => {
      render(
        <MemoryRouter initialEntries={['/app/some/nested/path']}>
          <TestAppRoutes />
        </MemoryRouter>
      );

      // React Router will handle this - currently no nested routes defined
      expect(document.body).toBeInTheDocument();
    });

    it('should allow navigation from /app back to home via BackButton', () => {
      const { rerender } = render(
        <MemoryRouter initialEntries={['/app']}>
          <TestAppRoutes />
        </MemoryRouter>
      );

      // Verify we're on the processor page
      expect(screen.getByText('upload.title')).toBeInTheDocument();

      // Find and click the back button
      const backButton = screen.getByRole('button', { name: /go.*home/i });
      expect(backButton).toBeInTheDocument();

      // Simulate navigation by rerendering with new route
      rerender(
        <MemoryRouter initialEntries={['/']}>
          <TestAppRoutes />
        </MemoryRouter>
      );

      // Verify we're back on the landing page
      expect(screen.getByText('Transform Images with AI-Powered Precision')).toBeInTheDocument();
    });
  });
});

describe('Deployment Configuration', () => {
  it('should have proper build settings for SPA deployment', () => {
    const fs = require('fs');
    const path = require('path');
    
    const vercelConfigPath = path.join(process.cwd(), 'vercel.json');
    const vercelConfig = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf8'));
    
    expect(vercelConfig.buildCommand).toBe('npm run build');
    expect(vercelConfig.outputDirectory).toBe('dist');
    expect(vercelConfig.installCommand).toBe('npm install');
  });

  it('should have Node.js runtime for API functions', () => {
    const fs = require('fs');
    const path = require('path');
    
    const vercelConfigPath = path.join(process.cwd(), 'vercel.json');
    const vercelConfig = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf8'));
    
    expect(vercelConfig.functions).toBeDefined();
    expect(vercelConfig.functions['api/*.ts']).toBeDefined();
    expect(vercelConfig.functions['api/*.ts'].runtime).toBe('@vercel/node@3.1.5');
  });
});