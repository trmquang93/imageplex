import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { I18nProvider } from '../i18n';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';

// Mock the useNavigate hook
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

// Test wrapper with required providers
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <I18nProvider>
    <BrowserRouter>
      {children}
    </BrowserRouter>
  </I18nProvider>
);

describe('Landing Page Components', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  describe('HeroSection', () => {
    it('renders hero content correctly', () => {
      const mockGetStarted = vi.fn();
      
      render(
        <TestWrapper>
          <HeroSection onGetStarted={mockGetStarted} />
        </TestWrapper>
      );

      // Check for main headline
      expect(screen.getByText(/Transform Images with AI-Powered Precision/i)).toBeInTheDocument();
      
      // Check for CTA button
      const ctaButton = screen.getByText(/Try ImagePlex Now/i);
      expect(ctaButton).toBeInTheDocument();
      
      // Test button click
      fireEvent.click(ctaButton);
      expect(mockGetStarted).toHaveBeenCalledTimes(1);
    });

    it('displays feature preview cards', () => {
      const mockGetStarted = vi.fn();
      
      render(
        <TestWrapper>
          <HeroSection onGetStarted={mockGetStarted} />
        </TestWrapper>
      );

      // Check for feature emojis in preview cards
      expect(screen.getByText('📐')).toBeInTheDocument();
      expect(screen.getByText('🎨')).toBeInTheDocument();
      expect(screen.getByText('✏️')).toBeInTheDocument();
    });
  });

  describe('FeaturesSection', () => {
    it('renders features section header', () => {
      render(
        <TestWrapper>
          <FeaturesSection />
        </TestWrapper>
      );

      expect(screen.getByText(/Three Powerful Features/i)).toBeInTheDocument();
    });

    it('displays feature icons', () => {
      render(
        <TestWrapper>
          <FeaturesSection />
        </TestWrapper>
      );

      // Check for feature icons
      expect(screen.getByText('📐')).toBeInTheDocument();
      expect(screen.getByText('🎨')).toBeInTheDocument();
      expect(screen.getByText('✏️')).toBeInTheDocument();
    });

    it('shows feature titles', () => {
      render(
        <TestWrapper>
          <FeaturesSection />
        </TestWrapper>
      );

      expect(screen.getByText(/Intelligent Resize/i)).toBeInTheDocument();
      expect(screen.getByText(/AI Image Coloring/i)).toBeInTheDocument();
      expect(screen.getByText(/Line Art Conversion/i)).toBeInTheDocument();
    });
  });
});

describe('Landing Page i18n Integration', () => {
  it('uses translation context correctly', () => {
    const mockGetStarted = vi.fn();
    
    render(
      <TestWrapper>
        <HeroSection onGetStarted={mockGetStarted} />
      </TestWrapper>
    );

    // Should render English content by default
    expect(screen.getByText(/Transform Images with AI-Powered Precision/i)).toBeInTheDocument();
    expect(screen.getByText(/Try ImagePlex Now/i)).toBeInTheDocument();
  });
});