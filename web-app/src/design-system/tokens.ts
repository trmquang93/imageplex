// Design System Tokens
// Foundation tokens for colors, spacing, typography, and more

export const tokens = {
  // Color Palette
  colors: {
    // Brand Colors
    brand: {
      primary: '#8b5cf6',    // Purple
      secondary: '#6366f1',  // Indigo
      accent: '#ec4899',     // Pink
      success: '#10b981',    // Green
      warning: '#f59e0b',    // Amber
      error: '#ef4444',      // Red
      info: '#4facfe',       // Blue
    },
    
    // Neutral Colors
    neutral: {
      white: '#ffffff',
      gray50: '#f8fafc',
      gray100: '#f1f5f9',
      gray200: '#e2e8f0',
      gray300: '#cbd5e1',
      gray400: '#94a3b8',
      gray500: '#64748b',
      gray600: '#475569',
      gray700: '#334155',
      gray800: '#1e293b',
      gray900: '#1a202c',
      black: '#000000',
    },
    
    // Semantic Colors (mapped from brand/neutral)
    background: {
      primary: '#ffffff',
      secondary: '#f8fafc',
      tertiary: '#f1f5f9',
      overlay: 'rgba(255, 255, 255, 0.9)',
    },
    
    text: {
      primary: '#1a202c',
      secondary: '#475569',
      tertiary: '#64748b',
      inverse: '#ffffff',
      accent: '#8b5cf6',
    },
    
    border: {
      light: '#e2e8f0',
      medium: '#cbd5e1',
      dark: '#94a3b8',
    },
    
    // State Colors
    state: {
      hover: 'rgba(139, 92, 246, 0.08)',
      active: 'rgba(139, 92, 246, 0.12)',
      focus: 'rgba(139, 92, 246, 0.2)',
      disabled: 'rgba(148, 163, 184, 0.5)',
    }
  },

  // Typography Scale
  typography: {
    fontFamily: {
      sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"Segoe UI"', 'Roboto', 'sans-serif'],
      mono: ['SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'monospace'],
    },
    
    fontSize: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem',      // 48px
      '6xl': '3.75rem',   // 60px
      '7xl': '4.5rem',    // 72px
    },
    
    fontWeight: {
      thin: '100',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    
    lineHeight: {
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
    
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },

  // Spacing Scale
  spacing: {
    px: '1px',
    0: '0',
    1: '0.25rem',    // 4px
    2: '0.5rem',     // 8px
    3: '0.75rem',    // 12px
    4: '1rem',       // 16px
    5: '1.25rem',    // 20px
    6: '1.5rem',     // 24px
    7: '1.75rem',    // 28px
    8: '2rem',       // 32px
    10: '2.5rem',    // 40px
    12: '3rem',      // 48px
    16: '4rem',      // 64px
    20: '5rem',      // 80px
    24: '6rem',      // 96px
    32: '8rem',      // 128px
    40: '10rem',     // 160px
    48: '12rem',     // 192px
    56: '14rem',     // 224px
    64: '16rem',     // 256px
  },

  // Border Radius
  borderRadius: {
    none: '0',
    sm: '0.125rem',    // 2px
    base: '0.25rem',   // 4px
    md: '0.375rem',    // 6px
    lg: '0.5rem',      // 8px
    xl: '0.75rem',     // 12px
    '2xl': '1rem',     // 16px
    '3xl': '1.5rem',   // 24px
    full: '9999px',
  },

  // Box Shadows
  boxShadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    none: '0 0 #0000',
    
    // Custom shadows for glassmorphism
    glass: '0 8px 32px rgba(0, 0, 0, 0.1)',
    'glass-lg': '0 12px 40px rgba(0, 0, 0, 0.15)',
    
    // Brand-specific shadows
    brand: '0 4px 12px rgba(139, 92, 246, 0.4)',
    'brand-lg': '0 8px 25px rgba(139, 92, 246, 0.4), 0 2px 6px rgba(0, 0, 0, 0.3)',
  },

  // Transitions & Animations
  transition: {
    duration: {
      fast: '150ms',
      base: '200ms',
      slow: '300ms',
      slower: '500ms',
    },
    
    timing: {
      ease: 'ease',
      'ease-in': 'ease-in',
      'ease-out': 'ease-out',
      'ease-in-out': 'ease-in-out',
      linear: 'linear',
      'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  // Z-Index Scale
  zIndex: {
    hide: '-1',
    auto: 'auto',
    base: '0',
    docked: '10',
    dropdown: '1000',
    sticky: '1100',
    banner: '1200',
    overlay: '1300',
    modal: '1400',
    popover: '1500',
    skipLink: '1600',
    toast: '1700',
    tooltip: '1800',
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const;

// Type definitions for better TypeScript support
export type ColorToken = keyof typeof tokens.colors;
export type SpacingToken = keyof typeof tokens.spacing;
export type FontSizeToken = keyof typeof tokens.typography.fontSize;
export type FontWeightToken = keyof typeof tokens.typography.fontWeight;
export type BorderRadiusToken = keyof typeof tokens.borderRadius;
export type BoxShadowToken = keyof typeof tokens.boxShadow;