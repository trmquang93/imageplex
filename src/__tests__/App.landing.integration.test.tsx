import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { I18nProvider } from '../i18n';
import LandingPage from '../pages/LandingPage';
import ProcessorPage from '../pages/ProcessorPage';

// Test wrapper with required providers and routing
const TestApp: React.FC<{ initialEntries?: string[] }> = ({ initialEntries = ['/'] }) => (
  <I18nProvider>
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<ProcessorPage />} />
      </Routes>
    </MemoryRouter>
  </I18nProvider>
);

describe('Landing Page to App Integration', () => {
  it('renders landing page on root route', () => {
    render(<TestApp />);

    // Should show landing page content
    expect(screen.getByText(/Transform Images with AI-Powered Precision/i)).toBeInTheDocument();
    expect(screen.getByText(/Three Powerful Features/i)).toBeInTheDocument();
    expect(screen.getByText(/How It Works/i)).toBeInTheDocument();
  });

  it('shows processor page on /app route', () => {
    render(<TestApp initialEntries={['/app']} />);

    // Should show processor page content
    expect(screen.getByText(/Upload Your Images/i)).toBeInTheDocument();
    expect(screen.getByText(/Choose Files/i)).toBeInTheDocument();
  });

  it('includes language switcher on both pages', () => {
    const { rerender } = render(<TestApp />);

    // Landing page should have language switcher
    expect(screen.getByText(/🇺🇸/)).toBeInTheDocument();

    // Processor page should also have language switcher
    rerender(<TestApp initialEntries={['/app']} />);
    expect(screen.getByText(/🇺🇸/)).toBeInTheDocument();
  });

  it('displays all landing page sections correctly', () => {
    render(<TestApp />);

    // Hero section
    expect(screen.getByText(/Try ImagePlex Now/i)).toBeInTheDocument();
    
    // Features section (use getAllByText since features appear in multiple places)
    expect(screen.getAllByText(/Intelligent Resize/i)).toHaveLength(3); // Hero, Features, Footer
    expect(screen.getAllByText(/AI Image Coloring/i)).toHaveLength(1);   // Only in Features
    expect(screen.getAllByText(/Line Art Conversion/i)).toHaveLength(1); // Only in Features

    // How it works section
    expect(screen.getByText('Upload')).toBeInTheDocument();
    expect(screen.getByText('Choose Features')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();

    // CTA section
    expect(screen.getByText(/Ready to Transform Your Images/i)).toBeInTheDocument();

    // Footer
    expect(screen.getByText(/Built with precision for creators worldwide/i)).toBeInTheDocument();
  });

  it('applies glassmorphism styling correctly', () => {
    const { container } = render(<TestApp />);

    // Should have elements with backdrop-filter (glassmorphism effect)
    const elementsWithBackdropFilter = container.querySelectorAll('[style*="backdrop-filter"]');
    expect(elementsWithBackdropFilter.length).toBeGreaterThan(0);
    
    // Should have elements with glass-like transparency
    const elementsWithTransparency = container.querySelectorAll('[style*="rgba"]');
    expect(elementsWithTransparency.length).toBeGreaterThan(0);
  });

  it('renders premium design elements', () => {
    const { container } = render(<TestApp />);

    // Should have gradient backgrounds
    const elementsWithGradients = container.querySelectorAll('[style*="linear-gradient"]');
    expect(elementsWithGradients.length).toBeGreaterThan(0);
    
    // Should have box shadows for depth
    const elementsWithShadows = container.querySelectorAll('[style*="box-shadow"], [style*="boxShadow"]');
    expect(elementsWithShadows.length).toBeGreaterThan(0);
  });

  it('displays feature icons and emojis', () => {
    render(<TestApp />);

    // Feature icons in multiple places (Hero preview + Features section)
    expect(screen.getAllByText('📐').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('🎨').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('✏️').length).toBeGreaterThanOrEqual(1);

    // Step icons in How It Works
    expect(screen.getByText('📤')).toBeInTheDocument(); // Upload
    expect(screen.getByText('⚙️')).toBeInTheDocument(); // Process
    expect(screen.getByText('📥')).toBeInTheDocument(); // Download
  });

  it('handles responsive design elements', () => {
    const { container } = render(<TestApp />);

    // Should have responsive grid layouts
    const elementsWithGrid = container.querySelectorAll('[style*="grid-template-columns"]');
    expect(elementsWithGrid.length).toBeGreaterThan(0);

    // Should have responsive text sizing
    const elementsWithClamp = container.querySelectorAll('[style*="clamp"]');
    expect(elementsWithClamp.length).toBeGreaterThan(0);
  });
});

describe('Landing Page Vietnamese Support', () => {
  it('supports Vietnamese language switching', async () => {
    render(<TestApp />);

    // Find and click Vietnamese flag
    const vietnameseFlag = screen.getByText('🇻🇳');
    fireEvent.click(vietnameseFlag);

    // Should show Vietnamese content
    await screen.findByText(/Biến Đổi Hình Ảnh Với Độ Chính Xác AI/i);
    expect(screen.getByText(/Ba Tính Năng Mạnh Mẽ/i)).toBeInTheDocument();
  });
});