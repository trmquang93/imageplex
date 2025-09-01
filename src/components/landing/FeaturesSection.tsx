import React from 'react';
import { useTranslation } from '../../i18n';
import { tokens, styles } from '../../design-system';

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
      padding: `clamp(${tokens.spacing[16]}, 12vw, ${tokens.spacing[32]}) clamp(${tokens.spacing[4]}, 4vw, ${tokens.spacing[5]})`,
      backgroundColor: tokens.colors.background.primary,
      position: 'relative'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Section header */}
        <div style={{
          textAlign: 'center',
          marginBottom: `clamp(${tokens.spacing[10]}, 8vw, ${tokens.spacing[20]})`
        }}>
          <h2 style={{
            ...styles.typography.heading(2),
            color: tokens.colors.text.primary,
            marginBottom: tokens.spacing[4],
            background: `linear-gradient(135deg, ${tokens.colors.text.primary} 0%, ${tokens.colors.text.secondary} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            {t('landing.features.headline')}
          </h2>
          <p style={{
            ...styles.typography.body('lg'),
            color: tokens.colors.text.secondary,
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: tokens.typography.lineHeight.relaxed
          }}>
            {t('landing.features.subheadline')}
          </p>
        </div>

        {/* Features grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
          gap: `clamp(${tokens.spacing[5]}, 4vw, ${tokens.spacing[10]})`,
          marginBottom: `clamp(${tokens.spacing[10]}, 8vw, ${tokens.spacing[20]})`
        }}>
          {features.map((feature) => (
            <div
              key={feature.key}
              style={{
                background: tokens.colors.background.primary,
                backdropFilter: 'blur(20px)',
                border: `1px solid ${tokens.colors.border.light}`,
                borderRadius: tokens.borderRadius['3xl'],
                padding: `clamp(${tokens.spacing[6]}, 6vw, ${tokens.spacing[10]})`,
                transition: `all ${tokens.transition.duration.slow} ${tokens.transition.timing.smooth}`,
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
                  width: tokens.spacing[20],
                  height: tokens.spacing[20],
                  background: feature.gradient,
                  borderRadius: tokens.borderRadius.xl,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: tokens.spacing[6],
                  fontSize: tokens.typography.fontSize['3xl'],
                  boxShadow: `0 8px 32px ${feature.shadowColor}`
                }}>
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 style={{
                  ...styles.typography.heading(3),
                  color: tokens.colors.text.primary,
                  marginBottom: tokens.spacing[4],
                  lineHeight: tokens.typography.lineHeight.tight
                }}>
                  {t(`features.${feature.key}.title`)}
                </h3>

                {/* Description */}
                <p style={{
                  ...styles.typography.body(),
                  color: tokens.colors.text.secondary,
                  lineHeight: tokens.typography.lineHeight.relaxed,
                  marginBottom: tokens.spacing[6]
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
                      marginBottom: tokens.spacing[3],
                      ...styles.typography.body('sm'),
                      color: tokens.colors.text.secondary
                    }}>
                      <div style={{
                        width: tokens.spacing[2],
                        height: tokens.spacing[2],
                        background: feature.gradient,
                        borderRadius: tokens.borderRadius.full,
                        marginRight: tokens.spacing[3]
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
          padding: `clamp(${tokens.spacing[10]}, 8vw, ${tokens.spacing[16]}) clamp(${tokens.spacing[6]}, 6vw, ${tokens.spacing[10]})`,
          background: `linear-gradient(135deg, ${tokens.colors.state.hover} 0%, ${tokens.colors.state.active} 100%)`,
          borderRadius: `clamp(${tokens.borderRadius.xl}, 4vw, ${tokens.borderRadius['3xl']})`,
          border: `1px solid ${tokens.colors.border.light}`
        }}>
          <h3 style={{
            ...styles.typography.heading(3),
            color: tokens.colors.text.primary,
            marginBottom: tokens.spacing[4]
          }}>
            Ready to experience these features?
          </h3>
          <p style={{
            ...styles.typography.body(),
            color: tokens.colors.text.secondary,
            marginBottom: tokens.spacing[8],
            maxWidth: '400px',
            margin: `0 auto ${tokens.spacing[8]}`
          }}>
            Try all three processing capabilities with your own images
          </p>
          <button style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            color: 'white',
            border: 'none',
            borderRadius: 'clamp(12px, 3vw, 16px)',
            padding: 'clamp(16px, 4vw, 18px) clamp(32px, 8vw, 40px)',
            fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 16px rgba(59, 130, 246, 0.3)',
            minHeight: '44px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            Start Processing Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;