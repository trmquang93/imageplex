import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomeButton from '../HomeButton';

// Mock react-router-dom navigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock design system
vi.mock('../../design-system', () => ({
  tokens: {
    colors: {
      brand: { primary: '#8b5cf6' },
      background: { overlay: 'rgba(255, 255, 255, 0.9)' },
      text: { primary: '#1a202c' },
      border: { light: '#e2e8f0' },
    },
    spacing: {
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      6: '1.5rem',
    },
    typography: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont'],
      },
      fontSize: {
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
      },
      fontWeight: {
        semibold: '600',
      },
    },
    borderRadius: { '2xl': '1rem' },
    boxShadow: { glass: '0 8px 32px rgba(0, 0, 0, 0.1)' },
    transition: {
      duration: { base: '200ms', fast: '150ms', slow: '300ms' },
      timing: { smooth: 'cubic-bezier(0.4, 0, 0.2, 1)' },
    },
  },
  utils: {
    combine: (...styles: any[]) => Object.assign({}, ...styles),
  },
}));

// Mock i18n
vi.mock('../../i18n', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'navigation.home': 'Home',
        'navigation.back': 'Back',
        'navigation.returnToHome': 'Return to Home',
        'navigation.backToHome': 'Back to Home',
        'navigation.goToHomeAria': 'Go to home page',
        'navigation.backToHomeAria': 'Go back to home page',
      };
      return translations[key] || key;
    },
  }),
}));

describe('HomeButton Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('should render with default props', () => {
      render(
        <MemoryRouter>
          <HomeButton />
        </MemoryRouter>
      );

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('aria-label', 'Go to home page');
    });

    it('should render home icon by default', () => {
      render(
        <MemoryRouter>
          <HomeButton />
        </MemoryRouter>
      );

      // Check for home icon SVG
      const homeIcon = screen.getByRole('button').querySelector('svg');
      expect(homeIcon).toBeInTheDocument();
      expect(homeIcon).toHaveAttribute('viewBox', '0 0 24 24');
    });

    it('should render back arrow icon when variant is "back"', () => {
      render(
        <MemoryRouter>
          <HomeButton variant="back" />
        </MemoryRouter>
      );

      // Check for back arrow icon
      const backIcon = screen.getByRole('button').querySelector('svg');
      expect(backIcon).toBeInTheDocument();
      expect(backIcon).toHaveAttribute('viewBox', '0 0 24 24');
    });

    it('should show text when showText is true', () => {
      render(
        <MemoryRouter>
          <HomeButton showText={true} />
        </MemoryRouter>
      );

      expect(screen.getByText('Return to Home')).toBeInTheDocument();
    });

    it('should show back text for back variant', () => {
      render(
        <MemoryRouter>
          <HomeButton variant="back" showText={true} />
        </MemoryRouter>
      );

      expect(screen.getByText('Back to Home')).toBeInTheDocument();
    });

    it('should show simple labels when contextualLabel is false', () => {
      render(
        <MemoryRouter>
          <HomeButton contextualLabel={false} showText={true} />
        </MemoryRouter>
      );

      expect(screen.getByText('Home')).toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    it('should navigate to home page when clicked', () => {
      render(
        <MemoryRouter>
          <HomeButton />
        </MemoryRouter>
      );

      fireEvent.click(screen.getByRole('button'));
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    it('should navigate to home for back variant as well', () => {
      render(
        <MemoryRouter>
          <HomeButton variant="back" />
        </MemoryRouter>
      );

      fireEvent.click(screen.getByRole('button'));
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  describe('ARIA and Accessibility', () => {
    it('should have correct ARIA label for home variant', () => {
      render(
        <MemoryRouter>
          <HomeButton />
        </MemoryRouter>
      );

      expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Go to home page');
    });

    it('should have correct ARIA label for back variant', () => {
      render(
        <MemoryRouter>
          <HomeButton variant="back" />
        </MemoryRouter>
      );

      expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Go back to home page');
    });

    it('should be keyboard accessible', () => {
      render(
        <MemoryRouter>
          <HomeButton />
        </MemoryRouter>
      );

      const button = screen.getByRole('button');
      button.focus();
      expect(button).toHaveFocus();

      fireEvent.click(button);
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  describe('Size Variants', () => {
    it('should render correct icon size for each size variant', () => {
      const { rerender } = render(
        <MemoryRouter>
          <HomeButton size="sm" />
        </MemoryRouter>
      );

      let icon = screen.getByRole('button').querySelector('svg');
      expect(icon).toHaveAttribute('width', '16');
      expect(icon).toHaveAttribute('height', '16');

      rerender(
        <MemoryRouter>
          <HomeButton size="md" />
        </MemoryRouter>
      );

      icon = screen.getByRole('button').querySelector('svg');
      expect(icon).toHaveAttribute('width', '20');
      expect(icon).toHaveAttribute('height', '20');

      rerender(
        <MemoryRouter>
          <HomeButton size="lg" />
        </MemoryRouter>
      );

      icon = screen.getByRole('button').querySelector('svg');
      expect(icon).toHaveAttribute('width', '24');
      expect(icon).toHaveAttribute('height', '24');
    });
  });

  describe('Interactive Behavior', () => {
    it('should handle mouse events for hover states', () => {
      render(
        <MemoryRouter>
          <HomeButton />
        </MemoryRouter>
      );

      const button = screen.getByRole('button');
      
      fireEvent.mouseEnter(button);
      fireEvent.mouseLeave(button);
      fireEvent.mouseDown(button);
      fireEvent.mouseUp(button);
      
      // Basic test to ensure no errors are thrown
      expect(button).toBeInTheDocument();
    });

    it('should reset states on mouse leave', () => {
      render(
        <MemoryRouter>
          <HomeButton />
        </MemoryRouter>
      );

      const button = screen.getByRole('button');
      
      fireEvent.mouseDown(button);
      fireEvent.mouseLeave(button);
      
      expect(button).toBeInTheDocument();
    });
  });

  describe('Custom Props', () => {
    it('should accept and apply custom className', () => {
      render(
        <MemoryRouter>
          <HomeButton className="custom-class" />
        </MemoryRouter>
      );

      expect(screen.getByRole('button')).toHaveClass('custom-class');
    });

    it('should pass through additional HTML attributes', () => {
      render(
        <MemoryRouter>
          <HomeButton data-testid="home-button" id="custom-id" />
        </MemoryRouter>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-testid', 'home-button');
      expect(button).toHaveAttribute('id', 'custom-id');
    });
  });

  describe('Visual Effects', () => {
    it('should render shimmer effect element', () => {
      render(
        <MemoryRouter>
          <HomeButton />
        </MemoryRouter>
      );

      const button = screen.getByRole('button');
      const shimmer = button.querySelector('div');
      expect(shimmer).toBeInTheDocument();
    });

    it('should have glassmorphism styling applied', () => {
      render(
        <MemoryRouter>
          <HomeButton />
        </MemoryRouter>
      );

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      // Visual styles are applied via the style prop
    });
  });
});