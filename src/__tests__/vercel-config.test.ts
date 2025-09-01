import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('Vercel Configuration for SPA Routing', () => {
  let vercelConfig: any;

  beforeAll(() => {
    const vercelConfigPath = join(process.cwd(), 'vercel.json');
    vercelConfig = JSON.parse(readFileSync(vercelConfigPath, 'utf8'));
  });

  describe('SPA Routing Configuration', () => {
    it('should have rewrites configuration', () => {
      expect(vercelConfig.rewrites).toBeDefined();
      expect(Array.isArray(vercelConfig.rewrites)).toBe(true);
      expect(vercelConfig.rewrites.length).toBeGreaterThan(0);
    });

    it('should preserve API routes in rewrite configuration', () => {
      const apiRule = vercelConfig.rewrites.find((rule: any) => 
        rule.source.includes('/api/')
      );
      
      expect(apiRule).toBeDefined();
      expect(apiRule.source).toBe('/api/(.*)');
      expect(apiRule.destination).toBe('/api/$1');
    });

    it('should have catch-all rewrite for SPA routes', () => {
      const catchAllRule = vercelConfig.rewrites.find((rule: any) => 
        rule.source === '/(.*)'
      );
      
      expect(catchAllRule).toBeDefined();
      expect(catchAllRule.destination).toBe('/index.html');
    });

    it('should maintain correct rewrite rule order (API before catch-all)', () => {
      const apiRuleIndex = vercelConfig.rewrites.findIndex((rule: any) => 
        rule.source.includes('/api/')
      );
      const catchAllIndex = vercelConfig.rewrites.findIndex((rule: any) => 
        rule.source === '/(.*)'
      );
      
      expect(apiRuleIndex).toBeGreaterThanOrEqual(0);
      expect(catchAllIndex).toBeGreaterThanOrEqual(0);
      expect(apiRuleIndex).toBeLessThan(catchAllIndex);
    });
  });

  describe('Build Configuration', () => {
    it('should have proper build settings for SPA deployment', () => {
      expect(vercelConfig.buildCommand).toBe('npm run build');
      expect(vercelConfig.outputDirectory).toBe('dist');
      expect(vercelConfig.installCommand).toBe('npm install');
    });

    it('should have Node.js runtime for API functions', () => {
      expect(vercelConfig.functions).toBeDefined();
      expect(vercelConfig.functions['api/*.ts']).toBeDefined();
      expect(vercelConfig.functions['api/*.ts'].runtime).toBe('@vercel/node@3.1.5');
    });
  });

  describe('SPA Routing Logic Validation', () => {
    it('should route all non-API requests to index.html', () => {
      const rewrites = vercelConfig.rewrites;
      
      // Should have exactly 2 rewrite rules
      expect(rewrites).toHaveLength(2);
      
      // First rule: Preserve API routes
      expect(rewrites[0].source).toBe('/api/(.*)');
      expect(rewrites[0].destination).toBe('/api/$1');
      
      // Second rule: Catch-all for SPA
      expect(rewrites[1].source).toBe('/(.*)')
      expect(rewrites[1].destination).toBe('/index.html');
    });

    it('should handle direct app route access (/app)', () => {
      // This test validates the configuration would work for /app route
      const catchAllRule = vercelConfig.rewrites.find((rule: any) => 
        rule.source === '/(.*)'
      );
      
      expect(catchAllRule).toBeDefined();
      // The pattern /(.*) should match /app and route it to /index.html
      expect('/app').toMatch(/^\/(.*)$/);
    });

    it('should handle nested app routes (/app/settings)', () => {
      const catchAllRule = vercelConfig.rewrites.find((rule: any) => 
        rule.source === '/(.*)'
      );
      
      expect(catchAllRule).toBeDefined();
      // The pattern /(.*) should match nested routes
      expect('/app/settings').toMatch(/^\/(.*)$/);
    });
  });
});