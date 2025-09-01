import React from 'react';
import { useTranslation } from '../../i18n';
import { tokens, styles } from '../../design-system';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  const { t } = useTranslation();

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: `0 clamp(${tokens.spacing[4]}, 5vw, ${tokens.spacing[5]})`,
      background: `linear-gradient(135deg, ${tokens.colors.neutral.gray50} 0%, ${tokens.colors.neutral.gray100} 100%)`,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '-10%',
        width: '120%',
        height: '120%',
        background: 'radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
        zIndex: 0
      }} />

      <div style={{
        maxWidth: '800px',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Main headline */}
        <h1 style={{
          ...styles.typography.display(),
          color: tokens.colors.text.primary,
          marginBottom: tokens.spacing[5],
          background: `linear-gradient(135deg, ${tokens.colors.text.primary} 0%, ${tokens.colors.text.secondary} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          {t('landing.hero.headline')}
        </h1>

        {/* Subheadline */}
        <p style={{
          ...styles.typography.body('lg'),
          color: tokens.colors.text.secondary,
          marginBottom: tokens.spacing[10],
          maxWidth: '600px',
          margin: `0 auto ${tokens.spacing[10]}`
        }}>
          {t('landing.hero.subheadline')}
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: tokens.spacing[5]
        }}>
          <button
            onClick={onGetStarted}
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              color: 'white',
              border: 'none',
              borderRadius: 'clamp(16px, 4vw, 20px)',
              padding: 'clamp(18px, 4.5vw, 20px) clamp(40px, 10vw, 48px)',
              fontSize: 'clamp(1.1rem, 2.8vw, 1.2rem)',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 32px rgba(59, 130, 246, 0.3)',
              backdropFilter: 'blur(10px)',
              transform: 'translateY(0)',
              fontFamily: 'inherit',
              minHeight: '48px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(59, 130, 246, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(59, 130, 246, 0.3)';
            }}
          >
            {t('landing.hero.ctaButton')}
          </button>

          <p style={{
            color: tokens.colors.text.tertiary,
            ...styles.typography.caption(),
            margin: '0'
          }}>
            {t('landing.hero.ctaSecondary')}
          </p>
        </div>
      </div>

      {/* Feature preview cards */}
      <div style={{
        marginTop: `clamp(${tokens.spacing[10]}, 8vw, ${tokens.spacing[20]})`,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(180px, 100%), 1fr))',
        gap: `clamp(${tokens.spacing[4]}, 3vw, ${tokens.spacing[5]})`,
        maxWidth: '800px',
        width: '100%',
        position: 'relative',
        zIndex: 1
      }}>
        {[
          { key: 'resize', icon: '📐', color: '#3b82f6' },
          { key: 'coloring', icon: '🎨', color: '#8b5cf6' },
          { key: 'lineArt', icon: '✏️', color: '#06b6d4' }
        ].map((feature) => (
          <div
            key={feature.key}
            style={{
              background: tokens.colors.background.primary,
              backdropFilter: 'blur(10px)',
              border: `1px solid ${tokens.colors.border.light}`,
              borderRadius: tokens.borderRadius.xl,
              padding: `clamp(${tokens.spacing[5]}, 5vw, ${tokens.spacing[6]}) clamp(${tokens.spacing[4]}, 4vw, ${tokens.spacing[5]})`,
              textAlign: 'center',
              transition: `all ${tokens.transition.duration.base} ${tokens.transition.timing.smooth}`,
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{
              fontSize: `clamp(${tokens.typography.fontSize['3xl']}, 5vw, ${tokens.typography.fontSize['4xl']})`,
              marginBottom: tokens.spacing[3]
            }}>
              {feature.icon}
            </div>
            <h3 style={{
              ...styles.typography.heading(4),
              color: feature.color,
              margin: `0 0 ${tokens.spacing[2]} 0`
            }}>
              {t(`features.${feature.key}.title`)}
            </h3>
            <p style={{
              ...styles.typography.caption(),
              color: tokens.colors.text.secondary,
              margin: '0',
              lineHeight: tokens.typography.lineHeight.snug
            }}>
              {t(`features.${feature.key}.description`).substring(0, 80)}...
            </p>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: tokens.spacing[10],
        left: '50%',
        transform: 'translateX(-50%)',
        color: tokens.colors.text.tertiary,
        ...styles.typography.caption(),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: tokens.spacing[2],
        animation: 'bounce 2s infinite'
      }}>
        <span>Scroll to explore</span>
        <div style={{
          width: '2px',
          height: tokens.spacing[5],
          background: `linear-gradient(to bottom, ${tokens.colors.text.tertiary}, transparent)`,
          borderRadius: tokens.borderRadius.sm
        }} />
      </div>

      <style>
        {`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateX(-50%) translateY(0);
            }
            40% {
              transform: translateX(-50%) translateY(-6px);
            }
            60% {
              transform: translateX(-50%) translateY(-3px);
            }
          }
        `}
      </style>
    </section>
  );
};

export default HeroSection;