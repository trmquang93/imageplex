import React from 'react';
import { tokens, styles, ds, utils } from '../design-system';

export interface LoadingOverlayProps {
  isVisible: boolean;
  progress: number;
  selectedStepsCount: number;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isVisible,
  progress,
  selectedStepsCount
}) => {
  if (!isVisible) return null;

  return (
    <div style={utils.combine(
      styles.effects.backdrop(),
      styles.layout.flexCenter(),
      { flexDirection: 'column' }
    )}>
      <div style={{ position: 'relative', width: '12rem', height: '12rem' }}>
        {/* Outer Ring */}
        <div style={utils.combine(
          ds.absolute('0', '0', '0', '0'),
          ds.rounded('full'),
          ds.bg(tokens.colors.brand.primary),
          { 
            opacity: 0.8,
            animation: 'spin 2s linear infinite'
          }
        )} />
        
        {/* Inner Ring */}
        <div style={utils.combine(
          ds.absolute('1rem', '1rem', '1rem', '1rem'),
          ds.rounded('full'),
          ds.bg(tokens.colors.brand.info),
          { 
            opacity: 0.6,
            animation: 'spin 3s linear infinite reverse'
          }
        )} />
        
        {/* Center */}
        <div style={utils.combine(
          ds.absolute('2rem', '2rem', '2rem', '2rem'),
          ds.rounded('full'),
          ds.bg(tokens.colors.background.secondary),
          styles.layout.flexCenter(),
          { flexDirection: 'column' },
          ds.text('2xl'),
          { gap: tokens.spacing[2] }
        )}>
          <span>✨</span>
          <div style={utils.combine(
            ds.text('sm', 'semibold'),
            { opacity: 0.9 }
          )}>
            {progress}%
          </div>
        </div>
      </div>
      
      <div style={utils.combine(
        { textAlign: 'center', maxWidth: '400px' },
        ds.mt(8)
      )}>
        <h3 style={utils.combine(
          ds.text('xl', 'bold'),
          ds.mb(2),
          ds.color(tokens.colors.text.primary)
        )}>
          Transforming Your Image
        </h3>
        <p style={utils.combine(
          { opacity: 0.8 },
          ds.text('base')
        )}>
          Applying {selectedStepsCount} processing step{selectedStepsCount > 1 ? 's' : ''}...
        </p>
      </div>
    </div>
  );
};

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = tokens.colors.brand.primary
}) => {
  const sizeMap = {
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem'
  };

  return (
    <div style={utils.combine(
      ds.size(sizeMap[size]),
      styles.animation.spin('1s'),
      {
        border: '2px solid transparent',
        borderTop: `2px solid ${color}`,
        borderRadius: tokens.borderRadius.full,
      }
    )} />
  );
};

export default LoadingOverlay;