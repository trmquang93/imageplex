# ImagePlex Design System

A comprehensive design system built for modern, accessible, and maintainable user interfaces. This system provides a complete foundation for building consistent, beautiful web applications.

## Overview

The design system consists of:

- **Design Tokens**: Colors, typography, spacing, and other foundational values
- **Component Styles**: Pre-built style patterns for common UI components
- **Utility Functions**: Helper functions for composing styles
- **Animations**: Consistent motion design patterns
- **Responsive Utilities**: Mobile-first responsive design helpers

## Quick Start

```typescript
import { tokens, styles, ds, utils } from './design-system';

// Use design tokens directly
const primaryColor = tokens.colors.brand.primary;

// Apply component styles
const cardStyle = styles.card.glass();

// Compose styles with utilities
const combinedStyle = utils.combine(
  styles.button.primary(),
  ds.p(4),
  ds.rounded('xl')
);
```

## Design Tokens

### Colors

```typescript
// Brand Colors
tokens.colors.brand.primary     // #8b5cf6 (Purple)
tokens.colors.brand.secondary   // #6366f1 (Indigo)
tokens.colors.brand.accent      // #ec4899 (Pink)

// Semantic Colors
tokens.colors.background.primary    // #ffffff
tokens.colors.text.primary         // #1a202c
tokens.colors.border.light         // #e2e8f0
```

### Typography

```typescript
// Font sizes (responsive)
tokens.typography.fontSize.sm       // 0.875rem
tokens.typography.fontSize.base     // 1rem
tokens.typography.fontSize.xl       // 1.25rem

// Font weights
tokens.typography.fontWeight.normal    // 400
tokens.typography.fontWeight.semibold  // 600
tokens.typography.fontWeight.bold      // 700
```

### Spacing

```typescript
// Spacing scale (based on 0.25rem = 4px)
tokens.spacing[1]    // 0.25rem (4px)
tokens.spacing[4]    // 1rem (16px)
tokens.spacing[8]    // 2rem (32px)
tokens.spacing[16]   // 4rem (64px)
```

## Component Styles

### Layout

```typescript
// Container
styles.layout.container()           // Max-width container with auto margins
styles.layout.flexCenter()          // Flex with center alignment
styles.layout.gridResponsive()      // Responsive grid layout

// Usage
<div style={styles.layout.container()}>
  Content
</div>
```

### Cards

```typescript
// Card variations
styles.card.base()                  // Basic card with subtle shadow
styles.card.glass()                 // Glassmorphism effect card
styles.card.elevated()              // Card with prominent shadow

// Usage
<div style={styles.card.glass()}>
  Card content
</div>
```

### Buttons

```typescript
// Button variations
styles.button.primary()             // Primary action button
styles.button.secondary()           // Secondary button
styles.button.ghost()               // Minimal ghost button

// Usage
<button style={styles.button.primary()}>
  Click me
</button>
```

### Typography

```typescript
// Typography styles
styles.typography.display()         // Large display text
styles.typography.heading(2)        // Heading levels 1-4
styles.typography.body()            // Body text
styles.typography.caption()         // Small caption text

// Usage
<h1 style={styles.typography.display()}>
  Main Heading
</h1>
```

## Utility Functions

### Design System Shortcuts (ds)

```typescript
// Spacing utilities
ds.p(4)                     // padding: 1rem
ds.px(6)                    // padding-left: 1.5rem; padding-right: 1.5rem
ds.mt(8)                    // margin-top: 2rem

// Typography utilities
ds.text('lg', 'semibold')   // fontSize + fontWeight
ds.color('#8b5cf6')         // color property

// Layout utilities
ds.flex('row', 'center', 'between')  // Flex with alignment
ds.rounded('xl')                     // border-radius
ds.shadow('md')                      // box-shadow
```

### Style Composition

```typescript
// Combine multiple style objects
utils.combine(
  styles.card.base(),
  ds.p(6),
  ds.rounded('2xl'),
  { backgroundColor: tokens.colors.brand.primary }
)

// Conditional styles
utils.conditional(
  isActive,
  { backgroundColor: tokens.colors.brand.primary },
  { backgroundColor: tokens.colors.neutral.gray100 }
)

// Interactive states
utils.withHover(
  baseStyle,
  { transform: 'translateY(-2px)' }
)
```

## Animations

### Available Animations

- `float` - Gentle floating motion
- `pulse` - Pulsing opacity effect
- `shimmer` - Loading shimmer effect
- `spin` - Rotation animation
- `fadeIn/fadeOut` - Fade transitions
- `slideIn*` - Slide transitions from any direction

### Usage

```typescript
// Apply animations
styles.animation.fadeIn('300ms')
styles.animation.spin('2s')

// Custom animation timing
{
  animation: `float ${tokens.transition.duration.slow} ${tokens.transition.timing.smooth} infinite`
}
```

## Responsive Design

### Breakpoints

```typescript
tokens.breakpoints.sm     // 640px
tokens.breakpoints.md     // 768px  
tokens.breakpoints.lg     // 1024px
tokens.breakpoints.xl     // 1280px
```

### Responsive Utilities

```typescript
// Apply styles for specific screen sizes
styles.responsive.mobile({
  fontSize: tokens.typography.fontSize.sm
})

styles.responsive.desktop({
  padding: tokens.spacing[8]
})
```

## Accessibility

The design system includes built-in accessibility features:

- **Focus States**: Enhanced focus rings that meet WCAG guidelines
- **Color Contrast**: All color combinations meet WCAG AA standards
- **Reduced Motion**: Respects `prefers-reduced-motion` settings
- **Keyboard Navigation**: Proper focus management and keyboard support

## Best Practices

### 1. Use Design Tokens

❌ **Don't do this:**
```typescript
const style = { color: '#8b5cf6' }
```

✅ **Do this:**
```typescript
const style = { color: tokens.colors.brand.primary }
```

### 2. Compose Styles

❌ **Don't do this:**
```typescript
const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem',
  borderRadius: '0.5rem',
  backgroundColor: '#f8fafc'
}
```

✅ **Do this:**
```typescript
const style = utils.combine(
  styles.layout.flexCenter(),
  ds.p(4),
  ds.rounded('lg'),
  ds.bg(tokens.colors.background.secondary)
)
```

### 3. Use Semantic Color Names

❌ **Don't do this:**
```typescript
const style = { color: tokens.colors.neutral.gray800 }
```

✅ **Do this:**
```typescript
const style = { color: tokens.colors.text.primary }
```

### 4. Leverage Component Patterns

❌ **Don't do this:**
```typescript
const buttonStyle = {
  padding: '0.75rem 1.5rem',
  borderRadius: '0.5rem',
  backgroundColor: '#8b5cf6',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  // ... more styles
}
```

✅ **Do this:**
```typescript
const buttonStyle = styles.button.primary()
```

## Advanced Usage

### Creating Custom Component Patterns

```typescript
// Create reusable component patterns
const customCard = () => utils.combine(
  styles.card.glass(),
  ds.p(6),
  ds.rounded('2xl'),
  {
    border: `2px solid ${tokens.colors.brand.primary}`,
    transform: 'translateY(0)',
    transition: `all ${tokens.transition.duration.base} ${tokens.transition.timing.smooth}`
  }
)

// Use with hover effects
const interactiveCard = () => utils.withHover(
  customCard(),
  { transform: 'translateY(-4px)' }
)
```

### Theme Customization

```typescript
// Extend the theme with custom values
const customTheme = {
  ...tokens,
  colors: {
    ...tokens.colors,
    brand: {
      ...tokens.colors.brand,
      primary: '#your-custom-color'
    }
  }
}
```

## File Structure

```
src/design-system/
├── index.ts          # Main export file
├── tokens.ts         # Design tokens (colors, spacing, typography)
├── styles.ts         # Component styles and utilities  
├── animations.css    # CSS animations and global styles
└── README.md         # This documentation
```

## Migration Guide

When migrating from inline styles to the design system:

1. **Replace hardcoded values** with design tokens
2. **Use component style patterns** instead of custom CSS
3. **Leverage utility functions** for style composition
4. **Apply consistent spacing** using the spacing scale
5. **Use semantic color names** for better maintainability

This design system ensures consistency, maintainability, and accessibility across your entire application while providing the flexibility to create unique and beautiful user interfaces.