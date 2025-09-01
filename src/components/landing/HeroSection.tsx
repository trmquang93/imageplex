import React from 'react';
import { useTranslation } from '../../i18n';

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
      padding: '0 20px',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
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
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: '700',
          color: '#1a1a1a',
          marginBottom: '20px',
          lineHeight: '1.1',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #4a5568 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          {t('landing.hero.headline')}
        </h1>

        {/* Subheadline */}
        <p style={{
          fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
          color: '#64748b',
          marginBottom: '40px',
          lineHeight: '1.6',
          maxWidth: '600px',
          margin: '0 auto 40px'
        }}>
          {t('landing.hero.subheadline')}
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}>
          <button
            onClick={onGetStarted}
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '16px',
              padding: '18px 40px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 32px rgba(59, 130, 246, 0.3)',
              backdropFilter: 'blur(10px)',
              transform: 'translateY(0)',
              fontFamily: 'inherit'
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
            color: '#94a3b8',
            fontSize: '0.9rem',
            margin: '0'
          }}>
            {t('landing.hero.ctaSecondary')}
          </p>
        </div>
      </div>

      {/* Feature preview cards */}
      <div style={{
        marginTop: '80px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
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
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '16px',
              padding: '24px 20px',
              textAlign: 'center',
              transition: 'all 0.3s ease',
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
              fontSize: '2rem',
              marginBottom: '12px'
            }}>
              {feature.icon}
            </div>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: feature.color,
              margin: '0 0 8px 0'
            }}>
              {t(`features.${feature.key}.title`)}
            </h3>
            <p style={{
              fontSize: '0.85rem',
              color: '#64748b',
              margin: '0',
              lineHeight: '1.4'
            }}>
              {t(`features.${feature.key}.description`).substring(0, 80)}...
            </p>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: '#94a3b8',
        fontSize: '0.9rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        animation: 'bounce 2s infinite'
      }}>
        <span>Scroll to explore</span>
        <div style={{
          width: '2px',
          height: '20px',
          background: 'linear-gradient(to bottom, #94a3b8, transparent)',
          borderRadius: '1px'
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