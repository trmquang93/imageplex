import React from 'react';
import { useNavigate } from 'react-router-dom';
import { tokens, styles, ds, utils } from '../design-system';

export interface BackButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'home' | 'back';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const BackButton: React.FC<BackButtonProps> = ({
  variant = 'home',
  size = 'md',
  showText = false,
  style,
  ...props
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  const sizeStyles = {
    sm: {
      padding: `${tokens.spacing[2]} ${tokens.spacing[3]}`,
      fontSize: tokens.typography.fontSize.sm
    },
    md: {
      padding: `${tokens.spacing[3]} ${tokens.spacing[4]}`,
      fontSize: tokens.typography.fontSize.base
    },
    lg: {
      padding: `${tokens.spacing[4]} ${tokens.spacing[6]}`,
      fontSize: tokens.typography.fontSize.lg
    }
  };

  const icon = variant === 'back' ? '←' : '🏠';
  const text = variant === 'back' ? 'Back' : 'Home';
  const displayText = showText ? ` ${text}` : '';
  const ariaLabel = variant === 'back' ? 'Go back to home page' : 'Go to home page';

  const buttonStyle = utils.combine(
    styles.button.ghost(),
    sizeStyles[size],
    {
      display: 'flex',
      alignItems: 'center',
      gap: tokens.spacing[2],
      borderRadius: tokens.borderRadius.base,
      transition: `all ${tokens.transition.duration.fast} ease`,
      fontFamily: tokens.typography.fontFamily.sans.join(', '),
      fontWeight: tokens.typography.fontWeight.medium,
    },
    style
  );

  return (
    <button
      style={buttonStyle}
      onClick={handleClick}
      aria-label={ariaLabel}
      {...props}
    >
      <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>
        {icon}{displayText}
      </span>
    </button>
  );
};

export default BackButton;