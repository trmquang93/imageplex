import React from 'react';
import { tokens, styles, ds, utils } from '../design-system';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'base' | 'glass' | 'elevated';
  padding?: keyof typeof tokens.spacing;
  className?: string;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'glass',
  padding = 10,
  className,
  style,
  ...props
}) => {
  const cardStyle = utils.combine(
    variant === 'base' ? styles.card.base() :
    variant === 'elevated' ? styles.card.elevated() :
    styles.card.glass(),
    ds.p(padding),
    style
  );

  return (
    <div 
      className={className}
      style={cardStyle}
      {...props}
    >
      {children}
    </div>
  );
};

export interface SectionHeaderProps {
  icon: string;
  title: string;
  subtitle?: string;
  iconColor?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  icon,
  title,
  subtitle,
  iconColor = tokens.colors.brand.secondary
}) => {
  return (
    <div style={utils.combine(
      styles.layout.flexCenter(),
      { justifyContent: 'flex-start' },
      ds.mb(8),
      { gap: tokens.spacing[3] }
    )}>
      <div style={utils.combine(
        styles.layout.flexCenter(),
        ds.size('3rem'),
        ds.rounded('xl'),
        ds.bg(iconColor),
        ds.shadow('brand'),
        ds.text('xl')
      )}>
        {icon}
      </div>
      <div>
        <h3 style={utils.combine(
          styles.typography.heading(3),
          ds.text('xl', 'bold'),
          ds.color(tokens.colors.text.primary)
        )}>
          {title}
        </h3>
        {subtitle && (
          <p style={utils.combine(
            styles.typography.caption(),
            { opacity: 0.7 }
          )}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default Card;