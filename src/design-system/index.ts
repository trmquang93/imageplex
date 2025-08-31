// Design System Export
// Central export point for all design system components and utilities

export { tokens } from './tokens';
export { styles, utils } from './styles';
export type {
  ColorToken,
  SpacingToken,
  FontSizeToken,
  FontWeightToken,
  BorderRadiusToken,
  BoxShadowToken,
} from './tokens';

// Import animations CSS (this will be included in the bundle)
import './animations.css';

// Import tokens for ds utilities
import { tokens } from './tokens';

// Design system utilities for common use cases
export const ds = {
  // Quick style builders
  flex: (direction: 'row' | 'column' = 'row', align: 'start' | 'center' | 'end' = 'center', justify: 'start' | 'center' | 'end' | 'between' = 'start') => ({
    display: 'flex',
    flexDirection: direction,
    alignItems: align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : 'center',
    justifyContent: justify === 'start' ? 'flex-start' : justify === 'end' ? 'flex-end' : justify === 'between' ? 'space-between' : 'center',
  }),
  
  // Spacing utilities
  p: (size: keyof typeof tokens.spacing) => ({ padding: tokens.spacing[size] }),
  px: (size: keyof typeof tokens.spacing) => ({ paddingLeft: tokens.spacing[size], paddingRight: tokens.spacing[size] }),
  py: (size: keyof typeof tokens.spacing) => ({ paddingTop: tokens.spacing[size], paddingBottom: tokens.spacing[size] }),
  pt: (size: keyof typeof tokens.spacing) => ({ paddingTop: tokens.spacing[size] }),
  pb: (size: keyof typeof tokens.spacing) => ({ paddingBottom: tokens.spacing[size] }),
  pl: (size: keyof typeof tokens.spacing) => ({ paddingLeft: tokens.spacing[size] }),
  pr: (size: keyof typeof tokens.spacing) => ({ paddingRight: tokens.spacing[size] }),
  
  m: (size: keyof typeof tokens.spacing) => ({ margin: tokens.spacing[size] }),
  mx: (size: keyof typeof tokens.spacing) => ({ marginLeft: tokens.spacing[size], marginRight: tokens.spacing[size] }),
  my: (size: keyof typeof tokens.spacing) => ({ marginTop: tokens.spacing[size], marginBottom: tokens.spacing[size] }),
  mt: (size: keyof typeof tokens.spacing) => ({ marginTop: tokens.spacing[size] }),
  mb: (size: keyof typeof tokens.spacing) => ({ marginBottom: tokens.spacing[size] }),
  ml: (size: keyof typeof tokens.spacing) => ({ marginLeft: tokens.spacing[size] }),
  mr: (size: keyof typeof tokens.spacing) => ({ marginRight: tokens.spacing[size] }),
  
  // Typography utilities
  text: (size: keyof typeof tokens.typography.fontSize, weight?: keyof typeof tokens.typography.fontWeight, color?: string) => ({
    fontSize: tokens.typography.fontSize[size],
    ...(weight && { fontWeight: tokens.typography.fontWeight[weight] }),
    ...(color && { color }),
  }),
  
  // Border utilities
  border: (side?: 'top' | 'bottom' | 'left' | 'right', color: string = tokens.colors.border.light) => ({
    ...(side ? { [`border${side.charAt(0).toUpperCase() + side.slice(1)}`]: `1px solid ${color}` } : { border: `1px solid ${color}` }),
  }),
  
  rounded: (size: keyof typeof tokens.borderRadius) => ({ borderRadius: tokens.borderRadius[size] }),
  
  // Shadow utilities
  shadow: (size: keyof typeof tokens.boxShadow) => ({ boxShadow: tokens.boxShadow[size] }),
  
  // Color utilities
  bg: (color: string) => ({ background: color }),
  color: (color: string) => ({ color }),
  
  // Position utilities
  absolute: (top?: string, right?: string, bottom?: string, left?: string) => ({
    position: 'absolute' as const,
    ...(top !== undefined && { top }),
    ...(right !== undefined && { right }),
    ...(bottom !== undefined && { bottom }),
    ...(left !== undefined && { left }),
  }),
  
  relative: () => ({ position: 'relative' as const }),
  fixed: () => ({ position: 'fixed' as const }),
  
  // Size utilities
  w: (width: string) => ({ width }),
  h: (height: string) => ({ height }),
  size: (size: string) => ({ width: size, height: size }),
  
  // Transition utilities
  transition: (property: string = 'all', duration: keyof typeof tokens.transition.duration = 'base', timing: keyof typeof tokens.transition.timing = 'smooth') => ({
    transition: `${property} ${tokens.transition.duration[duration]} ${tokens.transition.timing[timing]}`,
  }),
} as const;