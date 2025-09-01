import React from 'react';
import { useTranslation } from '../../i18n';

interface CTASectionProps {
  onGetStarted: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onGetStarted }) => {
  const { t } = useTranslation();

  return (
    <section style={{
      padding: '120px 20px',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d3748 50%, #4a5568 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background effects */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        background: 'radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)',
        zIndex: 0
      }} />

      {/* Animated background particles */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundImage: `
          radial-gradient(2px 2px at 20% 30%, rgba(255, 255, 255, 0.3), transparent),
          radial-gradient(2px 2px at 40% 70%, rgba(59, 130, 246, 0.4), transparent),
          radial-gradient(1px 1px at 60% 10%, rgba(139, 92, 246, 0.4), transparent),
          radial-gradient(1px 1px at 80% 50%, rgba(255, 255, 255, 0.3), transparent),
          radial-gradient(2px 2px at 90% 80%, rgba(6, 182, 212, 0.4), transparent)
        `,
        backgroundSize: '200px 200px',
        animation: 'sparkle 8s linear infinite',
        zIndex: 1
      }} />

      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Main headline */}
        <h2 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: '700',
          color: 'white',
          marginBottom: '20px',
          lineHeight: '1.1',
          textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
        }}>
          {t('landing.cta.headline')}
        </h2>

        {/* Subheadline */}
        <p style={{
          fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
          color: '#cbd5e1',
          marginBottom: '50px',
          lineHeight: '1.6',
          maxWidth: '600px',
          margin: '0 auto 50px',
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
        }}>
          {t('landing.cta.subheadline')}
        </p>

        {/* CTA Button */}
        <div style={{
          marginBottom: '60px'
        }}>
          <button
            onClick={onGetStarted}
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '20px',
              padding: '20px 50px',
              fontSize: '1.2rem',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.4s ease',
              boxShadow: '0 12px 48px rgba(59, 130, 246, 0.4)',
              transform: 'translateY(0)',
              fontFamily: 'inherit',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(59, 130, 246, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 12px 48px rgba(59, 130, 246, 0.4)';
            }}
          >
            <span style={{ position: 'relative', zIndex: 1 }}>
              {t('landing.cta.button')}
            </span>
            
            {/* Button shine effect */}
            <div style={{
              position: 'absolute',
              top: '0',
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
              transition: 'left 0.6s ease',
              zIndex: 0
            }} />
          </button>
        </div>

        {/* Trust indicators */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '30px',
          marginBottom: '40px'
        }}>
          {[
            { icon: '🚀', label: 'Fast Processing', value: '< 30 seconds' },
            { icon: '🔒', label: 'Secure & Private', value: 'No data stored' },
            { icon: '💎', label: 'Premium Quality', value: 'Professional results' }
          ].map((item, index) => (
            <div key={index} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div style={{
                fontSize: '1.5rem',
                marginBottom: '4px'
              }}>
                {item.icon}
              </div>
              <div style={{
                fontSize: '0.9rem',
                color: '#94a3b8',
                fontWeight: '600'
              }}>
                {item.label}
              </div>
              <div style={{
                fontSize: '0.8rem',
                color: '#cbd5e1'
              }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* Final tagline */}
        <div style={{
          padding: '30px',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <p style={{
            color: '#e2e8f0',
            fontSize: '1rem',
            margin: '0',
            fontStyle: 'italic'
          }}>
            "Transform your creative workflow with AI-powered precision"
          </p>
        </div>
      </div>

      <style>
        {`
          @keyframes sparkle {
            from { transform: translateY(0px) rotate(0deg); }
            to { transform: translateY(-100px) rotate(360deg); }
          }
        `}
      </style>
    </section>
  );
};

export default CTASection;