import React from 'react';
import { useTranslation } from '../../i18n';

const FeaturesSection: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      key: 'resize',
      icon: '📐',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
      shadowColor: 'rgba(59, 130, 246, 0.3)'
    },
    {
      key: 'coloring',
      icon: '🎨',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      shadowColor: 'rgba(139, 92, 246, 0.3)'
    },
    {
      key: 'lineArt',
      icon: '✏️',
      gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
      shadowColor: 'rgba(6, 182, 212, 0.3)'
    }
  ];

  return (
    <section style={{
      padding: '120px 20px',
      backgroundColor: 'white',
      position: 'relative'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Section header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '80px'
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '700',
            color: '#1a1a1a',
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #1a1a1a 0%, #4a5568 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            {t('landing.features.headline')}
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#64748b',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            {t('landing.features.subheadline')}
          </p>
        </div>

        {/* Features grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '40px',
          marginBottom: '80px'
        }}>
          {features.map((feature) => (
            <div
              key={feature.key}
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '24px',
                padding: '40px',
                transition: 'all 0.4s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = `0 20px 60px ${feature.shadowColor}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Background decoration */}
              <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-50%',
                width: '100%',
                height: '100%',
                background: feature.gradient,
                opacity: '0.05',
                borderRadius: '50%',
                transition: 'all 0.4s ease'
              }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Icon */}
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: feature.gradient,
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px',
                  fontSize: '2rem',
                  boxShadow: `0 8px 32px ${feature.shadowColor}`
                }}>
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#1a1a1a',
                  marginBottom: '16px',
                  lineHeight: '1.3'
                }}>
                  {t(`features.${feature.key}.title`)}
                </h3>

                {/* Description */}
                <p style={{
                  fontSize: '1rem',
                  color: '#64748b',
                  lineHeight: '1.6',
                  marginBottom: '24px'
                }}>
                  {t(`features.${feature.key}.description`)}
                </p>

                {/* Feature list */}
                <ul style={{
                  listStyle: 'none',
                  padding: '0',
                  margin: '0'
                }}>
                  {(t(`features.${feature.key}.features`, { returnObjects: true }) as string[]).map((item, index) => (
                    <li key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '12px',
                      fontSize: '0.95rem',
                      color: '#4a5568'
                    }}>
                      <div style={{
                        width: '6px',
                        height: '6px',
                        background: feature.gradient,
                        borderRadius: '50%',
                        marginRight: '12px'
                      }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{
          textAlign: 'center',
          padding: '60px 40px',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#1a1a1a',
            marginBottom: '16px'
          }}>
            Ready to experience these features?
          </h3>
          <p style={{
            fontSize: '1rem',
            color: '#64748b',
            marginBottom: '32px',
            maxWidth: '400px',
            margin: '0 auto 32px'
          }}>
            Try all three processing capabilities with your own images
          </p>
          <button style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '14px 28px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 16px rgba(59, 130, 246, 0.3)'
          }}>
            Start Processing Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;