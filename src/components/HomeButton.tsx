import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tokens, styles, utils } from '../design-system';
import { useTranslation } from '../i18n';

export interface HomeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'home' | 'back';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  contextualLabel?: boolean;
  glowEffect?: boolean;
}

// Professional SVG Icons
const HomeIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9,22 9,12 15,12 15,22" />
  </svg>
);

const ArrowLeftIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 12H5" />
    <path d="M12 19l-7-7 7-7" />
  </svg>
);

export const HomeButton: React.FC<HomeButtonProps> = ({
  variant = 'home',
  size = 'md',
  showText = true,
  contextualLabel = true,
  glowEffect = true,
  style,
  ...props
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    navigate('/');
  };

  const sizeConfig = {
    sm: {
      padding: `${tokens.spacing[2]} ${tokens.spacing[3]}`,
      fontSize: tokens.typography.fontSize.sm,
      iconSize: 16,
      height: '40px',
      minWidth: showText ? '80px' : '40px'
    },
    md: {
      padding: `${tokens.spacing[3]} ${tokens.spacing[4]}`,
      fontSize: tokens.typography.fontSize.base,
      iconSize: 20,
      height: '48px',
      minWidth: showText ? '100px' : '48px'
    },
    lg: {
      padding: `${tokens.spacing[4]} ${tokens.spacing[6]}`,
      fontSize: tokens.typography.fontSize.lg,
      iconSize: 24,
      height: '56px',
      minWidth: showText ? '120px' : '56px'
    }
  };

  const config = sizeConfig[size];

  // Dynamic text based on context and language
  const getButtonText = () => {
    if (!showText) return '';
    
    if (contextualLabel) {
      return variant === 'back' 
        ? t('navigation.backToHome') 
        : t('navigation.returnToHome');
    }
    
    return variant === 'back' ? t('navigation.back') : t('navigation.home');
  };

  const getAriaLabel = () => {
    return variant === 'back' 
      ? t('navigation.backToHomeAria') 
      : t('navigation.goToHomeAria');
  };

  // Enhanced glassmorphism button style with premium micro-interactions
  const buttonStyle = utils.combine(
    {
      // Base glassmorphism style
      background: `linear-gradient(135deg, 
        ${tokens.colors.background.overlay} 0%, 
        rgba(255, 255, 255, 0.7) 100%
      )`,
      backdropFilter: 'blur(20px)',
      border: `1px solid rgba(255, 255, 255, 0.2)`,
      borderRadius: tokens.borderRadius['2xl'],
      boxShadow: glowEffect 
        ? `${tokens.boxShadow.glass}, 0 0 20px rgba(139, 92, 246, ${isHovered ? '0.4' : '0.2'})` 
        : tokens.boxShadow.glass,
      
      // Layout and positioning
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: tokens.spacing[2],
      height: config.height,
      minWidth: config.minWidth,
      padding: config.padding,
      
      // Typography
      fontFamily: tokens.typography.fontFamily.sans.join(', '),
      fontSize: config.fontSize,
      fontWeight: tokens.typography.fontWeight.semibold,
      color: tokens.colors.text.primary,
      
      // Interactive states
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
      
      // Premium animations
      transform: `translateY(${isPressed ? '1px' : '0'}) scale(${isHovered ? '1.05' : '1'})`,
      transition: `all ${tokens.transition.duration.base} ${tokens.transition.timing.smooth}`,
      
      // Focus and accessibility
      outline: 'none',
    },
    
    // Hover state enhancements
    isHovered && {
      background: `linear-gradient(135deg, 
        rgba(255, 255, 255, 0.95) 0%, 
        rgba(255, 255, 255, 0.85) 100%
      )`,
      border: `1px solid rgba(139, 92, 246, 0.3)`,
      filter: 'brightness(1.02)',
    },
    
    style
  );

  // Shimmer effect for premium feel
  const shimmerStyle = {
    position: 'absolute' as const,
    top: 0,
    left: isHovered ? '0%' : '-100%',
    width: '100%',
    height: '100%',
    background: `linear-gradient(90deg, 
      transparent, 
      rgba(255, 255, 255, 0.4), 
      transparent
    )`,
    transition: `left ${tokens.transition.duration.slow} ease`,
    pointerEvents: 'none' as const,
    borderRadius: 'inherit',
  };

  const textStyle = {
    position: 'relative' as const,
    zIndex: 1,
    whiteSpace: 'nowrap' as const,
    opacity: showText ? 1 : 0,
    transform: `translateX(${showText ? '0' : '-10px'})`,
    transition: `all ${tokens.transition.duration.base} ${tokens.transition.timing.smooth}`,
  };

  const iconStyle = {
    position: 'relative' as const,
    zIndex: 1,
    transform: `rotate(${isPressed ? '0deg' : '0deg'}) scale(${isHovered ? '1.1' : '1'})`,
    transition: `all ${tokens.transition.duration.fast} ${tokens.transition.timing.smooth}`,
    color: tokens.colors.brand.primary,
  };

  return (
    <button
      style={buttonStyle}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      aria-label={getAriaLabel()}
      {...props}
    >
      {/* Shimmer effect */}
      <div style={shimmerStyle} />
      
      {/* Icon */}
      <div style={iconStyle}>
        {variant === 'back' ? (
          <ArrowLeftIcon size={config.iconSize} />
        ) : (
          <HomeIcon size={config.iconSize} />
        )}
      </div>
      
      {/* Text */}
      {showText && (
        <span style={textStyle}>
          {getButtonText()}
        </span>
      )}
    </button>
  );
};

export default HomeButton;