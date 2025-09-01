import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { I18nProvider } from '../i18n';
import LandingPage from '../pages/LandingPage';

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

describe('LandingPage', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders all main sections', () => {
    render(
      <TestWrapper>
        <LandingPage />
      </TestWrapper>
    );

    // Check for main headline
    expect(screen.getByText(/Transform Images with AI-Powered Precision/i)).toBeInTheDocument();

    // Check for features section
    expect(screen.getByText(/Three Powerful Features/i)).toBeInTheDocument();

    // Check for how it works section
    expect(screen.getByText(/How It Works/i)).toBeInTheDocument();

    // Check for CTA section
    expect(screen.getByText(/Ready to Transform Your Images/i)).toBeInTheDocument();

    // Check for footer
    expect(screen.getByText(/Built with precision for creators worldwide/i)).toBeInTheDocument();
  });

  it('displays all three feature cards', () => {
    render(
      <TestWrapper>
        <LandingPage />
      </TestWrapper>
    );

    // Check for feature titles
    expect(screen.getByText(/Intelligent Resize/i)).toBeInTheDocument();
    expect(screen.getByText(/AI Image Coloring/i)).toBeInTheDocument();
    expect(screen.getByText(/Line Art Conversion/i)).toBeInTheDocument();
  });

  it('navigates to app when CTA buttons are clicked', () => {
    render(
      <TestWrapper>
        <LandingPage />
      </TestWrapper>
    );

    // Find and click the main CTA button
    const ctaButtons = screen.getAllByText(/Try ImagePlex Now|Start Processing Now/i);
    expect(ctaButtons.length).toBeGreaterThan(0);

    fireEvent.click(ctaButtons[0]);
    expect(mockNavigate).toHaveBeenCalledWith('/app');
  });

  it('displays step-by-step process', () => {
    render(
      <TestWrapper>
        <LandingPage />
      </TestWrapper>
    );

    // Check for all three steps
    expect(screen.getByText('Upload')).toBeInTheDocument();
    expect(screen.getByText('Choose Features')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();

    // Check for step descriptions
    expect(screen.getByText(/Drop your image or browse from your device/i)).toBeInTheDocument();
    expect(screen.getByText(/Select from resize, coloring, or line art conversion/i)).toBeInTheDocument();
    expect(screen.getByText(/Get your professionally processed image/i)).toBeInTheDocument();
  });

  it('includes language switcher in footer', () => {
    render(
      <TestWrapper>
        <LandingPage />
      </TestWrapper>
    );

    // Check for language switcher (should have English/Vietnamese flags)
    const languageSwitcher = screen.getByText(/🇺🇸|🇻🇳/);
    expect(languageSwitcher).toBeInTheDocument();
  });

  it('displays feature benefits correctly', () => {
    render(
      <TestWrapper>
        <LandingPage />
      </TestWrapper>
    );

    // Check for feature benefits
    expect(screen.getByText(/Square, Portrait, Landscape formats/i)).toBeInTheDocument();
    expect(screen.getByText(/Multiple artistic styles/i)).toBeInTheDocument();
    expect(screen.getByText(/Clean line extraction/i)).toBeInTheDocument();
  });

  it('has proper glassmorphism styling structure', () => {
    const { container } = render(
      <TestWrapper>
        <LandingPage />
      </TestWrapper>
    );

    // Check that elements with glassmorphism styling exist
    const glassElements = container.querySelectorAll('[style*="backdrop-filter"]');
    expect(glassElements.length).toBeGreaterThan(0);
  });

  it('includes trust indicators in CTA section', () => {
    render(
      <TestWrapper>
        <LandingPage />
      </TestWrapper>
    );

    // Check for trust indicators
    expect(screen.getByText(/Fast Processing/i)).toBeInTheDocument();
    expect(screen.getByText(/Secure & Private/i)).toBeInTheDocument();
    expect(screen.getByText(/Premium Quality/i)).toBeInTheDocument();
  });
});

describe('LandingPage - Vietnamese Language', () => {
  it('displays Vietnamese content when language is switched', async () => {
    render(
      <TestWrapper>
        <LandingPage />
      </TestWrapper>
    );

    // Find and click Vietnamese language option
    const vietnameseFlag = screen.getByText('🇻🇳');
    fireEvent.click(vietnameseFlag);

    // Check for Vietnamese content (async to allow for language change)
    await screen.findByText(/Biến Đổi Hình Ảnh Với Độ Chính Xác AI/i);
    expect(screen.getByText(/Ba Tính Năng Mạnh Mẽ/i)).toBeInTheDocument();
    expect(screen.getByText(/Cách Hoạt Động/i)).toBeInTheDocument();
  });
});