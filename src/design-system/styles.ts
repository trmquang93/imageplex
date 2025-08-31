import { tokens } from './tokens';
import type { CSSProperties } from 'react';

// Style helper functions and component patterns
export const styles = {
  // Layout Patterns
  layout: {
    container: (): CSSProperties => ({
      maxWidth: '1400px',
      margin: '0 auto',
      position: 'relative',
      zIndex: tokens.zIndex.base,
    }),

    flexCenter: (): CSSProperties => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),

    flexBetween: (): CSSProperties => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }),

    gridResponsive: (minWidth: string = '500px'): CSSProperties => ({
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}, 1fr))`,
      gap: tokens.spacing[8],
    }),

    fullScreen: (): CSSProperties => ({
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
    }),
  },

  // Card Components
  card: {
    base: (): CSSProperties => ({
      background: tokens.colors.background.secondary,
      borderRadius: tokens.borderRadius['3xl'],
      border: `1px solid ${tokens.colors.border.light}`,
      boxShadow: tokens.boxShadow.glass,
      position: 'relative',
      overflow: 'hidden',
    }),

    glass: (): CSSProperties => ({
      background: tokens.colors.background.secondary,
      borderRadius: tokens.borderRadius['3xl'],
      backdropFilter: 'blur(40px)',
      border: `1px solid ${tokens.colors.border.light}`,
      boxShadow: tokens.boxShadow.glass,
      position: 'relative',
      overflow: 'hidden',
    }),

    elevated: (): CSSProperties => ({
      background: tokens.colors.background.secondary,
      borderRadius: tokens.borderRadius['3xl'],
      border: `1px solid ${tokens.colors.border.light}`,
      boxShadow: tokens.boxShadow['glass-lg'],
      position: 'relative',
      overflow: 'hidden',
    }),
  },

  // Button Components
  button: {
    base: (): CSSProperties => ({
      fontFamily: tokens.typography.fontFamily.sans.join(', '),
      fontWeight: tokens.typography.fontWeight.semibold,
      borderRadius: tokens.borderRadius['2xl'],
      border: 'none',
      cursor: 'pointer',
      transition: `all ${tokens.transition.duration.base} ${tokens.transition.timing.smooth}`,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: tokens.spacing[3],
    }),

    primary: (): CSSProperties => ({
      ...styles.button.base(),
      background: tokens.colors.brand.primary,
      color: tokens.colors.text.inverse,
      padding: `${tokens.spacing[5]} ${tokens.spacing[8]}`,
      fontSize: tokens.typography.fontSize.lg,
      boxShadow: tokens.boxShadow.brand,
    }),

    secondary: (): CSSProperties => ({
      ...styles.button.base(),
      background: tokens.colors.state.hover,
      color: tokens.colors.text.primary,
      padding: `${tokens.spacing[4]} ${tokens.spacing[6]}`,
      fontSize: tokens.typography.fontSize.base,
      border: `1px solid ${tokens.colors.border.light}`,
    }),

    ghost: (): CSSProperties => ({
      ...styles.button.base(),
      background: 'transparent',
      color: tokens.colors.text.secondary,
      padding: `${tokens.spacing[3]} ${tokens.spacing[4]}`,
      fontSize: tokens.typography.fontSize.sm,
    }),
  },

  // Input Components
  input: {
    base: (): CSSProperties => ({
      fontFamily: tokens.typography.fontFamily.sans.join(', '),
      fontSize: tokens.typography.fontSize.base,
      padding: `${tokens.spacing[4]} ${tokens.spacing[5]}`,
      borderRadius: tokens.borderRadius.xl,
      border: `1px solid ${tokens.colors.border.light}`,
      background: tokens.colors.background.primary,
      color: tokens.colors.text.primary,
      transition: `all ${tokens.transition.duration.base} ${tokens.transition.timing.smooth}`,
      outline: 'none',
    }),

    file: (): CSSProperties => ({
      position: 'absolute',
      inset: '0',
      opacity: 0,
      cursor: 'pointer',
    }),
  },

  // Typography
  typography: {
    display: (): CSSProperties => ({
      fontFamily: tokens.typography.fontFamily.sans.join(', '),
      fontSize: `clamp(${tokens.typography.fontSize['4xl']}, 8vw, ${tokens.typography.fontSize['6xl']})`,
      fontWeight: tokens.typography.fontWeight.extrabold,
      lineHeight: tokens.typography.lineHeight.tight,
      letterSpacing: tokens.typography.letterSpacing.tight,
      color: tokens.colors.text.primary,
    }),

    heading: (level: 1 | 2 | 3 | 4 = 2): CSSProperties => ({
      fontFamily: tokens.typography.fontFamily.sans.join(', '),
      fontWeight: tokens.typography.fontWeight.bold,
      lineHeight: tokens.typography.lineHeight.tight,
      color: tokens.colors.text.primary,
      margin: 0,
      ...(level === 1 && { fontSize: tokens.typography.fontSize['4xl'] }),
      ...(level === 2 && { fontSize: tokens.typography.fontSize['2xl'] }),
      ...(level === 3 && { fontSize: tokens.typography.fontSize.xl }),
      ...(level === 4 && { fontSize: tokens.typography.fontSize.lg }),
    }),

    body: (size: 'sm' | 'base' | 'lg' = 'base'): CSSProperties => ({
      fontFamily: tokens.typography.fontFamily.sans.join(', '),
      fontSize: tokens.typography.fontSize[size],
      fontWeight: tokens.typography.fontWeight.normal,
      lineHeight: tokens.typography.lineHeight.relaxed,
      color: tokens.colors.text.secondary,
      margin: 0,
    }),

    caption: (): CSSProperties => ({
      fontFamily: tokens.typography.fontFamily.sans.join(', '),
      fontSize: tokens.typography.fontSize.sm,
      fontWeight: tokens.typography.fontWeight.medium,
      lineHeight: tokens.typography.lineHeight.normal,
      color: tokens.colors.text.tertiary,
      margin: 0,
    }),

    badge: (): CSSProperties => ({
      fontFamily: tokens.typography.fontFamily.sans.join(', '),
      fontSize: tokens.typography.fontSize.sm,
      fontWeight: tokens.typography.fontWeight.medium,
      letterSpacing: tokens.typography.letterSpacing.wide,
      textTransform: 'uppercase',
      color: tokens.colors.text.accent,
    }),
  },

  // Special Effects
  effects: {
    floatingOrb: (size: string, color: string): CSSProperties => ({
      position: 'absolute',
      width: size,
      height: size,
      background: color,
      borderRadius: tokens.borderRadius.full,
      filter: 'blur(60px)',
      animation: 'float 6s ease-in-out infinite',
      pointerEvents: 'none',
    }),

    shimmer: (): CSSProperties => ({
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: `rgba(255, 255, 255, 0.3)`,
      animation: 'shimmer 2s infinite',
    }),

    backdrop: (): CSSProperties => ({
      position: 'fixed',
      inset: 0,
      background: tokens.colors.background.overlay,
      backdropFilter: 'blur(20px)',
      zIndex: tokens.zIndex.overlay,
    }),
  },

  // Interactive States
  states: {
    hover: (scale: number = 1.02): CSSProperties => ({
      transform: `translateY(-2px) scale(${scale})`,
      filter: 'brightness(1.05)',
    }),

    active: (): CSSProperties => ({
      transform: 'translateY(0px) scale(1)',
    }),

    focus: (): CSSProperties => ({
      outline: `2px solid ${tokens.colors.state.focus}`,
      outlineOffset: '2px',
    }),

    disabled: (): CSSProperties => ({
      opacity: 0.4,
      cursor: 'not-allowed',
      pointerEvents: 'none',
    }),
  },

  // Animation Helpers
  animation: {
    fadeIn: (duration: string = '300ms'): CSSProperties => ({
      animation: `fadeIn ${duration} ${tokens.transition.timing.smooth}`,
    }),

    slideIn: (direction: 'up' | 'down' | 'left' | 'right' = 'up', duration: string = '300ms'): CSSProperties => ({
      animation: `slideIn${direction.charAt(0).toUpperCase() + direction.slice(1)} ${duration} ${tokens.transition.timing.smooth}`,
    }),

    spin: (duration: string = '1s'): CSSProperties => ({
      animation: `spin ${duration} linear infinite`,
    }),

    pulse: (duration: string = '2s'): CSSProperties => ({
      animation: `pulse ${duration} ${tokens.transition.timing.smooth} infinite`,
    }),
  },

  // Responsive Helpers
  responsive: {
    mobile: (styles: CSSProperties): { '@media (max-width: 768px)': CSSProperties } => ({
      '@media (max-width: 768px)': styles,
    }),

    tablet: (styles: CSSProperties): { '@media (min-width: 769px) and (max-width: 1024px)': CSSProperties } => ({
      '@media (min-width: 769px) and (max-width: 1024px)': styles,
    }),

    desktop: (styles: CSSProperties): { '@media (min-width: 1025px)': CSSProperties } => ({
      '@media (min-width: 1025px)': styles,
    }),
  },
} as const;

// Utility functions for common style combinations
export const utils = {
  // Combine multiple style objects
  combine: (...styleObjects: (CSSProperties | undefined)[]): CSSProperties => {
    return styleObjects.reduce<CSSProperties>((acc, styles) => ({ ...acc, ...(styles || {}) }), {});
  },

  // Create style with conditional properties
  conditional: (condition: boolean, trueStyle: CSSProperties, falseStyle: CSSProperties = {}): CSSProperties => {
    return condition ? trueStyle : falseStyle;
  },

  // Create hover styles (Note: pseudo-selectors not supported in CSSProperties)
  withHover: (baseStyle: CSSProperties, _hoverStyle: CSSProperties): CSSProperties => ({
    ...baseStyle,
    // Hover styles would be applied via CSS classes or styled components
  }),

  // Create focus styles (Note: pseudo-selectors not supported in CSSProperties)
  withFocus: (baseStyle: CSSProperties, _focusStyle: CSSProperties = styles.states.focus()): CSSProperties => ({
    ...baseStyle,
    // Focus styles would be applied via CSS classes or styled components
  }),

  // Create active styles (Note: pseudo-selectors not supported in CSSProperties)  
  withActive: (baseStyle: CSSProperties, _activeStyle: CSSProperties = styles.states.active()): CSSProperties => ({
    ...baseStyle,
    // Active styles would be applied via CSS classes or styled components
  }),
};

export default styles;