import React from 'react';
import { useTranslation } from '../../i18n';
import { tokens, styles } from '../../design-system';

const HowItWorksSection: React.FC = () => {
  const { t } = useTranslation();

  const steps = [
    {
      number: 1,
      icon: '📤',
      key: 'step1',
      color: '#3b82f6'
    },
    {
      number: 2,
      icon: '⚙️',
      key: 'step2',
      color: '#8b5cf6'
    },
    {
      number: 3,
      icon: '📥',
      key: 'step3',
      color: '#06b6d4'
    }
  ];

  return (
    <section style={{
      padding: `${tokens.spacing[32]} ${tokens.spacing[5]}`,
      background: `linear-gradient(135deg, ${tokens.colors.neutral.gray50} 0%, ${tokens.colors.neutral.gray100} 100%)`,
      position: 'relative'
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        background: 'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
        zIndex: 0
      }} />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Section header */}
        <div style={{
          textAlign: 'center',
          marginBottom: tokens.spacing[20]
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
            {t('landing.howItWorks.headline')}
          </h2>
        </div>

        {/* Steps */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
          gap: tokens.spacing[10],
          marginBottom: tokens.spacing[16]
        }}>
          {steps.map((step, index) => (
            <div
              key={step.key}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              {/* Connection line (desktop only) */}
              {index < steps.length - 1 && (
                <div
                  className="connection-line"
                  style={{
                    position: 'absolute',
                    top: '40px',
                    left: 'calc(100% - 20px)',
                    width: 'calc(100% - 60px)',
                    height: '2px',
                    background: `linear-gradient(to right, ${step.color}, ${steps[index + 1].color})`,
                    zIndex: 0,
                    opacity: 0.3
                  }}
                />
              )}

              {/* Step circle */}
              <div style={{
                width: tokens.spacing[20],
                height: tokens.spacing[20],
                background: `linear-gradient(135deg, ${step.color} 0%, ${step.color}dd 100%)`,
                borderRadius: tokens.borderRadius.full,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: tokens.spacing[6],
                fontSize: tokens.typography.fontSize['3xl'],
                color: tokens.colors.text.inverse,
                boxShadow: `0 8px 32px ${step.color}40`,
                position: 'relative',
                zIndex: 2,
                transition: `all ${tokens.transition.duration.base} ${tokens.transition.timing.smooth}`
              }}>
                {step.icon}
                
                {/* Step number */}
                <div style={{
                  position: 'absolute',
                  top: `-${tokens.spacing[2]}`,
                  right: `-${tokens.spacing[2]}`,
                  width: tokens.spacing[6],
                  height: tokens.spacing[6],
                  backgroundColor: tokens.colors.text.primary,
                  borderRadius: tokens.borderRadius.full,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  ...styles.typography.caption(),
                  fontWeight: tokens.typography.fontWeight.bold,
                  color: tokens.colors.text.inverse
                }}>
                  {step.number}
                </div>
              </div>

              {/* Step content */}
              <div style={{
                maxWidth: '280px'
              }}>
                <h3 style={{
                  ...styles.typography.heading(3),
                  color: tokens.colors.text.primary,
                  marginBottom: tokens.spacing[3]
                }}>
                  {t(`landing.howItWorks.${step.key}.title`)}
                </h3>
                <p style={{
                  ...styles.typography.body(),
                  color: tokens.colors.text.secondary,
                  lineHeight: tokens.typography.lineHeight.relaxed,
                  margin: '0'
                }}>
                  {t(`landing.howItWorks.${step.key}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom illustration/demo */}
        <div style={{
          background: tokens.colors.background.primary,
          backdropFilter: 'blur(20px)',
          borderRadius: tokens.borderRadius['3xl'],
          border: `1px solid ${tokens.colors.border.light}`,
          padding: `${tokens.spacing[16]} ${tokens.spacing[10]}`,
          textAlign: 'center',
          boxShadow: tokens.boxShadow.glass
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: tokens.spacing[10],
            flexWrap: 'wrap',
            marginBottom: tokens.spacing[10]
          }}>
            {/* Upload visualization */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: tokens.spacing[3]
            }}>
              <div style={{
                width: tokens.spacing[16],
                height: tokens.spacing[16],
                background: `linear-gradient(135deg, ${tokens.colors.neutral.gray200} 0%, ${tokens.colors.neutral.gray300} 100%)`,
                borderRadius: tokens.borderRadius.lg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: tokens.typography.fontSize['2xl']
              }}>
                🖼️
              </div>
              <span style={{ ...styles.typography.caption(), color: tokens.colors.text.secondary }}>Your Image</span>
            </div>

            {/* Arrow */}
            <div style={{ color: tokens.colors.text.tertiary, fontSize: tokens.typography.fontSize['2xl'] }}>→</div>

            {/* Processing visualization */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: tokens.spacing[3]
            }}>
              <div style={{
                width: tokens.spacing[16],
                height: tokens.spacing[16],
                background: `linear-gradient(135deg, ${tokens.colors.brand.primary} 0%, ${tokens.colors.brand.secondary} 100%)`,
                borderRadius: tokens.borderRadius.lg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: tokens.typography.fontSize['2xl'],
                color: tokens.colors.text.inverse
              }}>
                ⚡
              </div>
              <span style={{ ...styles.typography.caption(), color: tokens.colors.text.secondary }}>AI Processing</span>
            </div>

            {/* Arrow */}
            <div style={{ color: tokens.colors.text.tertiary, fontSize: tokens.typography.fontSize['2xl'] }}>→</div>

            {/* Result visualization */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: tokens.spacing[3]
            }}>
              <div style={{
                width: tokens.spacing[16],
                height: tokens.spacing[16],
                background: `linear-gradient(135deg, ${tokens.colors.brand.success} 0%, #059669 100%)`,
                borderRadius: tokens.borderRadius.lg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: tokens.typography.fontSize['2xl'],
                color: tokens.colors.text.inverse
              }}>
                ✨
              </div>
              <span style={{ ...styles.typography.caption(), color: tokens.colors.text.secondary }}>Perfect Result</span>
            </div>
          </div>

          <p style={{
            ...styles.typography.body('lg'),
            color: tokens.colors.text.secondary,
            margin: '0',
            fontWeight: tokens.typography.fontWeight.medium
          }}>
            Professional image processing in seconds, not hours
          </p>
        </div>
      </div>

      <style>
        {`
          .connection-line {
            display: none;
          }

          @media (min-width: 769px) {
            .connection-line {
              display: block;
            }
          }
        `}
      </style>
    </section>
  );
};

export default HowItWorksSection;