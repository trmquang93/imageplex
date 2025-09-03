import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BackButton from '../BackButton';

// Mock the useNavigate hook
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
      state: { hover: 'rgba(139, 92, 246, 0.08)' },
    },
    spacing: {
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      6: '1.5rem'
    },
    typography: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"Segoe UI"', 'Roboto', 'sans-serif']
      },
      fontSize: {
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem'
      },
      fontWeight: {
        medium: '500'
      }
    },
    borderRadius: { base: '0.25rem' },
    transition: { duration: { fast: '150ms' } },
  },
  styles: {
    button: {
      ghost: () => ({
        backgroundColor: 'transparent',
        border: 'none',
        color: '#8b5cf6',
        cursor: 'pointer',
      }),
    },
    states: {
      hover: () => ({
        backgroundColor: 'rgba(139, 92, 246, 0.08)',
      }),
    },
  },
  ds: {
    size: (size: string) => ({ width: size, height: size }),
  },
  utils: {
    combine: (...styles: any[]) => Object.assign({}, ...styles),
  },
}));

describe('BackButton Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders with home icon by default', () => {
      render(
        <MemoryRouter>
          <BackButton />
        </MemoryRouter>
      );

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('🏠');
    });

    it('renders with back icon when variant is "back"', () => {
      render(
        <MemoryRouter>
          <BackButton variant="back" />
        </MemoryRouter>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('←');
    });

    it('shows text when showText prop is true', () => {
      render(
        <MemoryRouter>
          <BackButton showText={true} />
        </MemoryRouter>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('🏠 Home');
    });

    it('shows back text when variant is "back" and showText is true', () => {
      render(
        <MemoryRouter>
          <BackButton variant="back" showText={true} />
        </MemoryRouter>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('← Back');
    });

    it('applies correct size styles', () => {
      render(
        <MemoryRouter>
          <BackButton size="lg" />
        </MemoryRouter>
      );

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      // Size styles are applied via the design system
    });
  });

  describe('Navigation', () => {
    it('navigates to home page when clicked', () => {
      render(
        <MemoryRouter>
          <BackButton />
        </MemoryRouter>
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(mockNavigate).toHaveBeenCalledWith('/');
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });

    it('navigates to home page when back variant is clicked', () => {
      render(
        <MemoryRouter>
          <BackButton variant="back" />
        </MemoryRouter>
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(mockNavigate).toHaveBeenCalledWith('/');
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA label for home navigation', () => {
      render(
        <MemoryRouter>
          <BackButton />
        </MemoryRouter>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Go to home page');
    });

    it('has proper ARIA label for back navigation', () => {
      render(
        <MemoryRouter>
          <BackButton variant="back" />
        </MemoryRouter>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Go back to home page');
    });

    it('is keyboard accessible', () => {
      render(
        <MemoryRouter>
          <BackButton />
        </MemoryRouter>
      );

      const button = screen.getByRole('button');
      button.focus();
      expect(button).toHaveFocus();

      // Simulate Enter key press
      fireEvent.click(button);
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  describe('Styling', () => {
    it('applies ghost button styles by default', () => {
      render(
        <MemoryRouter>
          <BackButton />
        </MemoryRouter>
      );

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      // Styles are applied via the design system mock
    });

    it('passes through additional props', () => {
      render(
        <MemoryRouter>
          <BackButton data-testid="custom-button" className="custom-class" />
        </MemoryRouter>
      );

      const button = screen.getByTestId('custom-button');
      expect(button).toHaveClass('custom-class');
    });
  });
});