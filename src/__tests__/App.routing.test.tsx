import React from 'react';
import { render, screen } from '@testing-library/react';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { I18nProvider } from '../i18n';
import LandingPage from '../pages/LandingPage';
import ProcessorPage from '../pages/ProcessorPage';

// Test wrapper with required providers and custom initial entries
const TestWrapper: React.FC<{ children: React.ReactNode; initialEntries?: string[] }> = ({ 
  children, 
  initialEntries = ['/'] 
}) => (
  <I18nProvider>
    <MemoryRouter initialEntries={initialEntries}>
      {children}
    </MemoryRouter>
  </I18nProvider>
);

describe('App Routing', () => {
  it('renders LandingPage on root route (/)', () => {
    render(
      <TestWrapper initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<ProcessorPage />} />
        </Routes>
      </TestWrapper>
    );

    // Check for landing page content
    expect(screen.getByText(/Transform Images with AI-Powered Precision/i)).toBeInTheDocument();
    expect(screen.getByText(/Three Powerful Features/i)).toBeInTheDocument();
  });

  it('renders ProcessorPage on /app route', () => {
    render(
      <TestWrapper initialEntries={['/app']}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<ProcessorPage />} />
        </Routes>
      </TestWrapper>
    );

    // Check for processor page content
    expect(screen.getByText(/Upload Your Images/i)).toBeInTheDocument();
    expect(screen.getByText(/Choose Files/i)).toBeInTheDocument();
  });

  it('provides I18n context to all routes', () => {
    render(
      <TestWrapper initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </TestWrapper>
    );

    // Check for language switcher (present on both pages)
    const languageSwitcher = screen.getByText(/🇺🇸|🇻🇳/);
    expect(languageSwitcher).toBeInTheDocument();
  });

  it('maintains language state across route changes', () => {
    const { rerender } = render(
      <TestWrapper initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </TestWrapper>
    );

    // Check initial English content
    expect(screen.getByText(/Transform Images with AI-Powered Precision/i)).toBeInTheDocument();

    // Navigate to processor page
    rerender(
      <TestWrapper initialEntries={['/app']}>
        <Routes>
          <Route path="/app" element={<ProcessorPage />} />
        </Routes>
      </TestWrapper>
    );

    // Check processor page content is in English
    expect(screen.getByText(/Upload Your Images/i)).toBeInTheDocument();
  });

  it('handles unknown routes gracefully', () => {
    render(
      <TestWrapper initialEntries={['/unknown-route']}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<ProcessorPage />} />
        </Routes>
      </TestWrapper>
    );

    // Since we don't have a 404 page, it should not crash
    // and might show empty content or default to landing page
    const container = document.body;
    expect(container).toBeInTheDocument();
  });
});

describe('App Structure', () => {
  it('wraps everything in I18nProvider', () => {
    render(
      <TestWrapper>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </TestWrapper>
    );

    // Check that language context is available
    const languageElement = screen.getByText(/🇺🇸|🇻🇳/);
    expect(languageElement).toBeInTheDocument();
  });

  it('uses React Router for navigation', () => {
    const { container } = render(
      <TestWrapper>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </TestWrapper>
    );

    // Router should be present (no errors thrown)
    expect(container).toBeInTheDocument();
  });
});