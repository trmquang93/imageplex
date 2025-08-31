import React from 'react';
import { tokens, styles, ds, utils } from '../design-system';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: string;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'secondary',
  size = 'md',
  isLoading = false,
  icon,
  fullWidth = false,
  disabled,
  style,
  ...props
}) => {
  const sizeStyles = {
    sm: { 
      padding: `${tokens.spacing[3]} ${tokens.spacing[4]}`,
      fontSize: tokens.typography.fontSize.sm 
    },
    md: { 
      padding: `${tokens.spacing[4]} ${tokens.spacing[6]}`,
      fontSize: tokens.typography.fontSize.base 
    },
    lg: { 
      padding: `${tokens.spacing[5]} ${tokens.spacing[8]}`,
      fontSize: tokens.typography.fontSize.lg 
    }
  };

  const buttonStyle = utils.combine(
    variant === 'primary' ? styles.button.primary() :
    variant === 'ghost' ? styles.button.ghost() :
    styles.button.secondary(),
    sizeStyles[size],
    fullWidth ? { width: '100%' } : {},
    (disabled || isLoading) ? styles.states.disabled() : {},
    style
  );

  return (
    <button
      style={buttonStyle}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <div style={utils.combine(
          ds.size('1rem'),
          styles.animation.spin('1s'),
          {
            border: '2px solid transparent',
            borderTop: `2px solid ${variant === 'primary' ? 'white' : tokens.colors.brand.primary}`,
            borderRadius: tokens.borderRadius.full,
          }
        )} />
      )}
      {icon && !isLoading && (
        <span style={{ fontSize: '1.25rem' }}>{icon}</span>
      )}
      {children}
    </button>
  );
};

export interface ProcessingButtonProps extends Omit<ButtonProps, 'variant'> {
  isProcessing: boolean;
  progress?: number;
  canProcess: boolean;
}

export const ProcessingButton: React.FC<ProcessingButtonProps> = ({
  isProcessing,
  progress = 0,
  canProcess,
  children,
  ...props
}) => {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <Button
        variant="primary"
        size="lg"
        fullWidth
        disabled={!canProcess || isProcessing}
        isLoading={isProcessing}
        style={{
          background: canProcess && !isProcessing
            ? tokens.colors.brand.primary
            : tokens.colors.state.hover,
          boxShadow: canProcess && !isProcessing ? tokens.boxShadow.brand : 'none',
          position: 'relative',
          overflow: 'hidden'
        }}
        {...props}
      >
        {/* Shimmer effect for active state */}
        {canProcess && !isProcessing && (
          <div style={utils.combine(
            styles.effects.shimmer(),
            { zIndex: 1 }
          )} />
        )}
        
        <div style={utils.combine(
          styles.layout.flexCenter(),
          { gap: tokens.spacing[3], position: 'relative', zIndex: 2 }
        )}>
          <span style={{ fontSize: '1.25rem' }}>
            {isProcessing ? '⚙️' : canProcess ? '✨' : '⏸️'}
          </span>
          <span>
            {isProcessing ? `Processing (${progress}%)` : 
             canProcess ? 'Transform Image' : 
             'Select Processing Steps'}
          </span>
        </div>
      </Button>
      
      {/* Progress bar */}
      {isProcessing && (
        <div style={utils.combine(
          ds.absolute(undefined, '0', '0', '0'),
          {
            width: `${progress}%`,
            height: '4px',
            background: tokens.colors.brand.success,
            borderRadius: `0 0 ${tokens.borderRadius['2xl']} ${tokens.borderRadius['2xl']}`,
            transition: 'width 0.3s ease'
          }
        )} />
      )}
    </div>
  );
};

export default Button;